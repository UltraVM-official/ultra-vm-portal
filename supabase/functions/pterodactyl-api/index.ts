
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

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
        const createUserUrl = `${url}/api/application/users`;
        const createUserResponse = await fetch(createUserUrl, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify(data)
        });
        result = await createUserResponse.json();
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
