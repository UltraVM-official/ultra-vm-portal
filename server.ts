// server.ts (start at line 1)
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import axios from 'axios';
import bodyParser from 'body-parser';

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

// Synchronization endpoint
app.post('/api/sync', async (req: Request, res: Response) => {
  try {
    // Fetch all users from Pterodactyl
    const { data: pteroUsers } = await pteroApi.get('/users');
    
    // Fetch all servers from Pterodactyl
    const { data: pteroServers } = await pteroApi.get('/servers');
    
    // Process and sync users
    for (const user of pteroUsers.data) {
      // Create or update user in the website database
      // This is handled by the trigger we created
      console.log(`Syncing user: ${user.attributes.email}`);
    }
    
    // Process and sync servers
    for (const server of pteroServers.data) {
      // Create or update server in the website database
      console.log(`Syncing server: ${server.attributes.name}`);
    }
    
    res.json({ success: true, message: 'Synchronization completed' });
  } catch (error) {
    console.error('Sync error:', error);
    res.status(500).json({ error: 'Synchronization failed' });
  }
});

// Example endpoint: User registration synchronization
app.post('/api/register', async (req: Request, res: Response) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    
    // Create user in Pterodactyl
    const { data: pteroUser } = await pteroApi.post('/users', {
      email,
      username: email.split('@')[0],
      first_name: firstName,
      last_name: lastName,
      password,
    });
    
    res.json({ success: true, pterodactylId: pteroUser.attributes.id });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

// Error handling
app.use((err: any, req: Request, res: Response, next: any) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
