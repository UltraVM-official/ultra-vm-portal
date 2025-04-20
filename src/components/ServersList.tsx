import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Loader2, Power, Cpu, HardDrive, Monitor } from "lucide-react";
import { motion } from "framer-motion";
import { LoadingScreen } from "./LoadingScreen";

interface Server {
  id: string;
  pterodactyl_server_id: string;
  name: string;
  description: string | null;
  identifier: string | null;
  status: string | null;
  node: string | null;
  cpu_limit: number | null;
  memory_limit: number | null;
  disk_limit: number | null;
}

interface ServerResources {
  status: string;
  resources: {
    memory_bytes: number;
    cpu_absolute: number;
    disk_bytes: number;
    network_rx_bytes: number;
    network_tx_bytes: number;
  };
}

export function ServersList() {
  const { toast } = useToast();

  const {
    isLoading,
    error,
    data: servers,
    refetch,
  } = useQuery("servers", async () => {
    const { data, error } = await supabase
      .from("servers")
      .select("*")
      .order("name");

    if (error) {
      throw error;
    }

    return data;
  });

  const { data: serverResources, refetch: refetchServerResources } = useQuery(
    "serverResources",
    async () => {
      if (!servers) return {};

      const resources = {};
      for (const server of servers) {
        try {
          const response = await fetch(
            `/api/pterodactyl/servers/${server.identifier}/resources`
          );
          if (!response.ok) {
            console.error(
              `Failed to fetch resources for server ${server.name}: ${response.statusText}`
            );
            continue;
          }
          const data = await response.json();
          resources[server.pterodactyl_server_id] = data;
        } catch (err) {
          console.error(
            `Error fetching resources for server ${server.name}:`,
            err
          );
        }
      }
      return resources;
    },
    {
      refetchInterval: 60000, // Refetch every 60 seconds
    }
  );

  React.useEffect(() => {
    refetchServerResources();
  }, [servers, refetchServerResources]);

  const openPterodactylPanel = (identifier: string | null) => {
    if (identifier) {
      window.open(
        `https://panel.ultravm.xyz/server/${identifier}`,
        "_blank"
      );
    } else {
      toast({
        title: "Error",
        description: "Could not open panel. Server identifier is missing.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <LoadingScreen message="Loading your servers..." />;
  }

  if (error) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500 mb-4">Failed to load servers.</p>
        <Button onClick={() => refetch()}>Try Again</Button>
      </div>
    );
  }

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {servers && servers.length > 0 ? (
        servers.map((server) => (
          <motion.div
            key={server.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.02 }}
          >
            <Card className="overflow-hidden border-purple-800/20 bg-black/40 backdrop-blur-sm hover:bg-black/60 transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-purple-900/50 to-black pb-2">
                <CardTitle className="text-lg text-purple-100 font-bold truncate">
                  {server.name}
                </CardTitle>
                <CardDescription className="text-purple-300 truncate">
                  {server.description || "No description"}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-900/30 text-purple-100 border border-purple-700">
                    {server.status || "Unknown"}
                  </span>
                  <span className="text-xs text-purple-400">
                    {server.node || "Unknown node"}
                  </span>
                </div>

                {serverResources[server.pterodactyl_server_id] ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center text-purple-100">
                          <Cpu className="w-4 h-4 mr-2" />
                          CPU
                        </span>
                        <span>
                          {Math.round(serverResources[server.pterodactyl_server_id].resources.cpu_absolute * 100) / 100}%
                        </span>
                      </div>
                      <Progress 
                        value={serverResources[server.pterodactyl_server_id].resources.cpu_absolute} 
                        max={100} 
                        className="h-2 bg-purple-900/20"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center text-purple-100">
                          <Monitor className="w-4 h-4 mr-2" />
                          Memory
                        </span>
                        <span>
                          {Math.round(serverResources[server.pterodactyl_server_id].resources.memory_bytes / 1024 / 1024)} MB / {server.memory_limit} MB
                        </span>
                      </div>
                      <Progress 
                        value={(serverResources[server.pterodactyl_server_id].resources.memory_bytes / 1024 / 1024)} 
                        max={server.memory_limit || 1} 
                        className="h-2 bg-purple-900/20"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center text-purple-100">
                          <HardDrive className="w-4 h-4 mr-2" />
                          Disk
                        </span>
                        <span>
                          {Math.round(serverResources[server.pterodactyl_server_id].resources.disk_bytes / 1024 / 1024)} MB / {server.disk_limit} MB
                        </span>
                      </div>
                      <Progress 
                        value={(serverResources[server.pterodactyl_server_id].resources.disk_bytes / 1024 / 1024)} 
                        max={server.disk_limit || 1} 
                        className="h-2 bg-purple-900/20"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center py-6">
                    <Loader2 className="h-5 w-5 text-purple-400 mr-2 animate-spin" />
                    <span className="text-purple-300 text-sm">Loading server resources...</span>
                  </div>
                )}
              </CardContent>
              <CardFooter className="bg-purple-900/10 flex justify-between">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="text-purple-100 border-purple-700 hover:bg-purple-800 hover:text-white"
                  onClick={() => openPterodactylPanel(server.identifier)}
                >
                  Manage
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="text-purple-100 border-purple-700 hover:bg-purple-800 hover:text-white"
                >
                  <Power className="h-4 w-4 mr-2" />
                  Power
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))
      ) : (
        <motion.div 
          className="col-span-full flex flex-col items-center justify-center py-12 px-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="bg-gradient-to-r from-purple-900/30 to-black/50 p-8 rounded-lg backdrop-blur-sm border border-purple-800/30 max-w-lg w-full">
            <h3 className="text-xl font-bold text-purple-100 mb-2">No servers found</h3>
            <p className="text-purple-300 mb-6">You don't have any servers configured yet. Create your first server to get started.</p>
            <Button className="bg-purple-800 hover:bg-purple-700 text-white">
              Create Server
            </Button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
