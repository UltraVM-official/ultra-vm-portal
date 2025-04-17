
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Function to synchronize users from Pterodactyl to the website
async function syncUsers(apiKey: string, url: string) {
  const apiUrl = `${url}/api/application/users`;
  const response = await fetch(apiUrl, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    }
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch users: ${response.statusText}`);
  }

  return await response.json();
}

// Function to synchronize servers from Pterodactyl to the website
async function syncServers(apiKey: string, url: string) {
  const apiUrl = `${url}/api/application/servers`;
  const response = await fetch(apiUrl, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    }
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch servers: ${response.statusText}`);
  }

  return await response.json();
}

// Function to create a user in Pterodactyl
async function createUser(apiKey: string, url: string, userData: any) {
  const apiUrl = `${url}/api/application/users`;
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify(userData)
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Failed to create user: ${JSON.stringify(errorData)}`);
  }

  return await response.json();
}

// Function to get user details from Pterodactyl
async function getUserDetails(apiKey: string, url: string, userId: number) {
  const apiUrl = `${url}/api/application/users/${userId}`;
  const response = await fetch(apiUrl, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    }
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch user details: ${response.statusText}`);
  }

  return await response.json();
}

// Function to get server details from Pterodactyl
async function getServerDetails(apiKey: string, url: string, serverId: string) {
  const apiUrl = `${url}/api/application/servers/${serverId}`;
  const response = await fetch(apiUrl, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    }
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch server details: ${response.statusText}`);
  }

  return await response.json();
}

// Main request handler
serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, apiKey, url, data } = await req.json();
    let result;

    switch (action) {
      case 'sync-users':
        result = await syncUsers(apiKey, url);
        break;
      case 'sync-servers':
        result = await syncServers(apiKey, url);
        break;
      case 'create-user':
        result = await createUser(apiKey, url, data);
        break;
      case 'get-user-details':
        if (!data.userId) throw new Error('User ID is required');
        result = await getUserDetails(apiKey, url, data.userId);
        break;
      case 'get-server-details':
        if (!data.serverId) throw new Error('Server ID is required');
        result = await getServerDetails(apiKey, url, data.serverId);
        break;
      default:
        throw new Error(`Unknown action: ${action}`);
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200
    });
  } catch (error) {
    console.error('Error in Pterodactyl API function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
