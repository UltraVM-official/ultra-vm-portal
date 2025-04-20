
import { Button } from "@/components/ui/button";

interface PterodactylInfoProps {
  pterodactylId: number | null;
  lastSync: string | null;
  onConnect: () => void;
  syncing: boolean;
}

export function PterodactylInfo({ 
  pterodactylId, 
  lastSync, 
  onConnect, 
  syncing 
}: PterodactylInfoProps) {
  return (
    <div>
      <h3 className="text-lg font-medium">Pterodactyl Integration</h3>
      <div className="mt-2">
        <div className="mb-2">
          <p className="text-sm text-gray-500">Status</p>
          <div className="flex items-center mt-1">
            <span 
              className={`inline-block w-3 h-3 rounded-full mr-2 ${
                pterodactylId ? 'bg-green-500' : 'bg-red-500'
              }`}
            ></span>
            <p>
              {pterodactylId 
                ? 'Connected to Pterodactyl' 
                : 'Not connected to Pterodactyl'}
            </p>
          </div>
        </div>
        
        {pterodactylId && (
          <div>
            <p className="text-sm text-gray-500">Pterodactyl ID</p>
            <p>{pterodactylId}</p>
          </div>
        )}
        
        {lastSync && (
          <div className="mt-2">
            <p className="text-sm text-gray-500">Last Synchronized</p>
            <p>{new Date(lastSync).toLocaleString()}</p>
          </div>
        )}
        
        {!pterodactylId && (
          <Button 
            className="mt-4"
            onClick={onConnect}
            disabled={syncing}
          >
            {syncing ? 'Connecting...' : 'Connect to Pterodactyl'}
          </Button>
        )}
      </div>
    </div>
  );
}
