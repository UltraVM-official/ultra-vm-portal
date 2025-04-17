
import { supabase } from "@/integrations/supabase/client";

// Function to sync a new user with Pterodactyl when they register on the website
export async function syncUserToPterodactyl(email: string, password: string, firstName: string = "", lastName: string = "") {
  try {
    // Get the API key and panel URL from the config
    const { data: config, error: configError } = await supabase
      .from('pterodactyl_config')
      .select('*')
      .single();
    
    if (configError) {
      throw new Error('Could not retrieve Pterodactyl configuration');
    }
    
    // Create the user in Pterodactyl
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        firstName,
        lastName
      })
    });
    
    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.error || 'Failed to create user in Pterodactyl');
    }
    
    // Update the user profile with the Pterodactyl ID
    const { data: session } = await supabase.auth.getSession();
    if (session?.user) {
      await supabase
        .from('user_profiles')
        .update({
          pterodactyl_id: result.pterodactylId,
          last_sync: new Date().toISOString()
        })
        .eq('id', session.user.id);
    }
    
    return result;
  } catch (error) {
    console.error('Error syncing user to Pterodactyl:', error);
    throw error;
  }
}

// Function to get server details for a specific user
export async function getUserServers() {
  try {
    const { data: servers, error } = await supabase
      .from('servers')
      .select('*')
      .order('name');
    
    if (error) {
      throw error;
    }
    
    return servers || [];
  } catch (error) {
    console.error('Error fetching user servers:', error);
    throw error;
  }
}

// Function to trigger a full sync from the admin dashboard
export async function triggerFullSync() {
  try {
    const response = await fetch('/api/sync', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.error || 'Failed to trigger synchronization');
    }
    
    return result;
  } catch (error) {
    console.error('Error triggering sync:', error);
    throw error;
  }
}
