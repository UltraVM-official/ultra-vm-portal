import { supabase } from "@/integrations/supabase/client";

// Function to sync a new user with Pterodactyl when they register on the website
export async function syncUserToPterodactyl(email: string, password: string, firstName: string = "", lastName: string = "") {
  try {
    // Create the user in Pterodactyl
    const { data: userData, error: userError } = await supabase.functions.invoke('pterodactyl-api', {
      body: {
        action: 'create-user',
        data: {
          email,
          username: email.split('@')[0],
          first_name: firstName || email.split('@')[0],
          last_name: lastName || '',
          password: password,
          root_admin: false,
        }
      }
    });
    
    if (userError) {
      throw new Error(`Failed to create user in Pterodactyl: ${userError.message}`);
    }
    
    const pterodactylId = userData?.attributes?.id;
    
    if (!pterodactylId) {
      throw new Error('Failed to get Pterodactyl ID from response');
    }
    
    // Update the user profile with the Pterodactyl ID
    const { data } = await supabase.auth.getSession();
    if (data?.session?.user) {
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          pterodactyl_id: pterodactylId,
          first_name: firstName,
          last_name: lastName,
          last_sync: new Date().toISOString()
        })
        .eq('id', data.session.user.id);
        
      if (updateError) {
        throw new Error(`Failed to update user profile: ${updateError.message}`);
      }
    }
    
    return userData;
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
    const { data, error } = await supabase.functions.invoke('pterodactyl-api', {
      body: {
        action: 'sync-users'
      }
    });
    
    if (error) {
      throw new Error(`Failed to trigger synchronization: ${error.message}`);
    }
    
    return data;
  } catch (error) {
    console.error('Error triggering sync:', error);
    throw error;
  }
}

// Function to check if a user exists in Pterodactyl by email
export async function checkPterodactylUser(email: string) {
  try {
    const { data, error } = await supabase.functions.invoke('pterodactyl-api', {
      body: {
        action: 'check-user-by-email',
        data: { email }
      }
    });
    
    if (error) {
      throw new Error(`Failed to check user: ${error.message}`);
    }
    
    return data;
  } catch (error) {
    console.error('Error checking Pterodactyl user:', error);
    throw error;
  }
}

// Update UserProfileData interface to include last_sync
interface UserProfileData {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  pterodactyl_id: number | null;
  is_admin: boolean;
  created_at: string;
  updated_at: string;
  last_sync: string;
}
