
// server.ts (start at line 1)
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import axios from 'axios';
import bodyParser from 'body-parser';
import { supabase } from './src/integrations/supabase/client';

// Load environment variables from .env
dotenv.config();

const app = express();
app.use(bodyParser.json());

// Read keys from environment (keys remain secret in the .env file)
const PTERODACTYL_API_KEY = process.env.PTERODACTYL_API_KEY;
const PTERODACTYL_PANEL_URL = process.env.PTERODACTYL_PANEL_URL;

if (!PTERODACTYL_API_KEY || !PTERODACTYL_PANEL_URL) {
  console.error('Pterodactyl API configuration is missing.');
  process.exit(1);
}

// Create an Axios instance for Pterodactyl API calls
const pteroApi = axios.create({
  baseURL: `${PTERODACTYL_PANEL_URL}/api/application`,
  headers: {
    Authorization: `Bearer ${PTERODACTYL_API_KEY}`,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Middleware to log requests
app.use((req, _res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Synchronization endpoint
app.post('/api/sync', async (req: Request, res: Response) => {
  try {
    console.log('Starting full synchronization process');
    
    // Fetch all users from Pterodactyl
    const { data: pteroUsersResponse } = await pteroApi.get('/users');
    const pteroUsers = pteroUsersResponse.data;
    
    // Fetch all servers from Pterodactyl
    const { data: pteroServersResponse } = await pteroApi.get('/servers');
    const pteroServers = pteroServersResponse.data;
    
    console.log(`Found ${pteroUsers.length} users and ${pteroServers.length} servers in Pterodactyl`);
    
    // Update last sync time in configuration
    await supabase
      .from('pterodactyl_config')
      .update({ last_sync: new Date().toISOString() })
      .eq('id', 1);
    
    // Process and sync users
    for (const user of pteroUsers) {
      const userData = user.attributes;
      
      // Check if user exists in our database by email
      const { data: existingUsers } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('email', userData.email)
        .single();
      
      if (existingUsers) {
        // Update existing user
        await supabase
          .from('user_profiles')
          .update({
            pterodactyl_id: userData.id,
            first_name: userData.first_name,
            last_name: userData.last_name,
            is_admin: userData.root_admin,
            last_sync: new Date().toISOString()
          })
          .eq('email', userData.email);
        
        console.log(`Updated user: ${userData.email}`);
      } else {
        // Create a new auth user
        const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
          email: userData.email,
          password: "TemporaryPassword123!",  // Will need to be reset
          email_confirm: true
        });
        
        if (authError) {
          console.error(`Failed to create auth user for ${userData.email}:`, authError);
          continue;
        }
        
        // User profile is created by trigger
        await supabase
          .from('user_profiles')
          .update({
            pterodactyl_id: userData.id,
            first_name: userData.first_name,
            last_name: userData.last_name,
            is_admin: userData.root_admin,
            last_sync: new Date().toISOString()
          })
          .eq('id', authUser.user.id);
        
        console.log(`Created new user: ${userData.email}`);
      }
      
      // Log sync action
      await supabase.from('sync_logs').insert({
        entity_type: 'user',
        entity_id: userData.id.toString(),
        action: 'sync',
        status: 'success',
        details: userData
      });
    }
    
    // Process and sync servers
    for (const server of pteroServers) {
      const serverData = server.attributes;
      
      // Find user by Pterodactyl ID
      const { data: userProfile } = await supabase
        .from('user_profiles')
        .select('id')
        .eq('pterodactyl_id', serverData.user)
        .single();
      
      if (!userProfile) {
        console.error(`Cannot find user for server ${serverData.name}, Pterodactyl user ID: ${serverData.user}`);
        continue;
      }
      
      // Check if server exists
      const { data: existingServer } = await supabase
        .from('servers')
        .select('*')
        .eq('pterodactyl_server_id', serverData.id)
        .single();
      
      if (existingServer) {
        // Update existing server
        await supabase
          .from('servers')
          .update({
            name: serverData.name,
            description: serverData.description,
            identifier: serverData.identifier,
            status: serverData.status,
            node: serverData.node,
            user_id: userProfile.id,
            cpu_limit: serverData.limits?.cpu,
            memory_limit: serverData.limits?.memory,
            disk_limit: serverData.limits?.disk,
            last_sync: new Date().toISOString()
          })
          .eq('pterodactyl_server_id', serverData.id);
        
        console.log(`Updated server: ${serverData.name}`);
      } else {
        // Create new server
        await supabase
          .from('servers')
          .insert({
            pterodactyl_server_id: serverData.id,
            name: serverData.name,
            description: serverData.description,
            identifier: serverData.identifier,
            status: serverData.status,
            node: serverData.node,
            user_id: userProfile.id,
            cpu_limit: serverData.limits?.cpu,
            memory_limit: serverData.limits?.memory,
            disk_limit: serverData.limits?.disk
          });
        
        console.log(`Created new server: ${serverData.name}`);
      }
      
      // Log sync action
      await supabase.from('sync_logs').insert({
        entity_type: 'server',
        entity_id: serverData.id.toString(),
        action: 'sync',
        status: 'success',
        details: serverData
      });
    }
    
    res.json({ 
      success: true, 
      message: 'Synchronization completed',
      stats: {
        users: pteroUsers.length,
        servers: pteroServers.length
      }
    });
  } catch (error) {
    console.error('Sync error:', error);
    res.status(500).json({ error: 'Synchronization failed', details: error.message });
  }
});

// User registration synchronization
app.post('/api/register', async (req: Request, res: Response) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    
    console.log(`Creating user in Pterodactyl: ${email}`);
    
    // Create user in Pterodactyl
    const { data: pteroUser } = await pteroApi.post('/users', {
      email,
      username: email.split('@')[0],
      first_name: firstName || email.split('@')[0],
      last_name: lastName || '',
      password,
      root_admin: false,
    });
    
    // Log creation action
    await supabase.from('sync_logs').insert({
      entity_type: 'user',
      entity_id: pteroUser.attributes.id.toString(),
      action: 'create',
      status: 'success',
      details: { email, pterodactylId: pteroUser.attributes.id }
    });
    
    res.json({ 
      success: true, 
      pterodactylId: pteroUser.attributes.id,
      message: 'User created successfully in Pterodactyl'
    });
  } catch (error) {
    console.error('Registration error:', error.response?.data || error.message);
    res.status(500).json({ 
      error: 'Registration failed',
      details: error.response?.data || error.message
    });
  }
});

// Get pterodactyl user profile
app.get('/api/pterodactyl/users/:id', async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    
    // Get user details from Pterodactyl
    const { data: pteroUser } = await pteroApi.get(`/users/${userId}`);
    
    res.json({ 
      success: true, 
      user: pteroUser.attributes
    });
  } catch (error) {
    console.error('Error fetching user:', error.response?.data || error.message);
    res.status(500).json({ 
      error: 'Failed to fetch user',
      details: error.response?.data || error.message
    });
  }
});

// Get pterodactyl server details
app.get('/api/pterodactyl/servers/:id', async (req: Request, res: Response) => {
  try {
    const serverId = req.params.id;
    
    // Get server details from Pterodactyl
    const { data: pteroServer } = await pteroApi.get(`/servers/${serverId}`);
    
    res.json({ 
      success: true, 
      server: pteroServer.attributes
    });
  } catch (error) {
    console.error('Error fetching server:', error.response?.data || error.message);
    res.status(500).json({ 
      error: 'Failed to fetch server',
      details: error.response?.data || error.message
    });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Error handling
app.use((err: any, req: Request, res: Response, next: any) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
