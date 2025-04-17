
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export function AdminSyncPanel() {
  const [syncing, setSyncing] = useState(false);
  const [lastSync, setLastSync] = useState<string | null>(null);
  const { toast } = useToast();

  // Load the last sync time when component mounts
  React.useEffect(() => {
    fetchLastSyncTime();
  }, []);

  const fetchLastSyncTime = async () => {
    try {
      const { data, error } = await supabase
        .from('pterodactyl_config')
        .select('last_sync')
        .single();

      if (error) {
        throw error;
      }

      if (data) {
        setLastSync(new Date(data.last_sync).toLocaleString());
      }
    } catch (error) {
      console.error('Error fetching last sync time:', error);
    }
  };

  const handleSync = async () => {
    try {
      setSyncing(true);
      toast({
        title: "Synchronization Started",
        description: "Syncing data with Pterodactyl Panel...",
      });

      const response = await fetch('/api/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to sync with Pterodactyl');
      }

      toast({
        title: "Synchronization Complete",
        description: `Successfully synchronized ${result.stats?.users || 0} users and ${result.stats?.servers || 0} servers.`,
      });

      // Update the last sync time
      fetchLastSyncTime();
    } catch (error) {
      console.error('Sync error:', error);
      toast({
        title: "Synchronization Failed",
        description: error.message || "An unexpected error occurred during synchronization.",
        variant: "destructive",
      });
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-bold mb-4">Pterodactyl Synchronization</h2>
      
      <div className="mb-4">
        <p className="text-gray-600 mb-2">
          Last synchronized: {lastSync || 'Never'}
        </p>
      </div>
      
      <button
        onClick={handleSync}
        disabled={syncing}
        className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
      >
        {syncing ? 'Synchronizing...' : 'Sync Now'}
      </button>
      
      <p className="mt-4 text-sm text-gray-500">
        This will synchronize all users and servers between your website and the Pterodactyl panel.
      </p>
    </div>
  );
}
