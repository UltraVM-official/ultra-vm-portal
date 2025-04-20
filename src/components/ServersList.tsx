import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Card,
  CardContent,
  CardDescription,
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
  name: string;
  identifier: string | null;
  status: string | null;
  node: string | null;
  cpu_limit: number | null;
  memory_limit: number | null;
  disk_limit: number | null;
}

interface ServerWithUsage extends Server {
  usage: {
    cpu: number;
    memory: number;
    disk: number;
  }
}

export function ServersList() {
  const { toast } = useToast();

  const { data: servers, isLoading } = useQuery({
    queryKey: ['servers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("servers")
        .select("*")
        .order("name");

      if (error) {
        toast({
          title: "Error",
          description: "Failed to load servers. Please try again.",
          variant: "destructive",
        });
        throw error;
      }

      const serversWithUsage: ServerWithUsage[] = await Promise.all(
        (data as Server[]).map(async (server) => {
          try {
            const response = await fetch(`/api/pterodactyl/servers/${server.identifier}/resources`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            });

            if (!response.ok) {
              console.error(`Failed to fetch usage for server ${server.name}`);
              return {
                ...server,
                usage: { cpu: 0, memory: 0, disk: 0 }
              };
            }

            const usageData = await response.json();
            return {
              ...server,
              usage: {
                cpu: usageData.cpu_absolute || 0,
                memory: (usageData.memory_bytes / (1024 * 1024)) || 0,
                disk: (usageData.disk_bytes / (1024 * 1024)) || 0
              }
            };
          } catch (error) {
            console.error(`Error fetching usage for server ${server.name}:`, error);
            return {
              ...server,
              usage: { cpu: 0, memory: 0, disk: 0 }
            };
          }
        })
      );

      return serversWithUsage;
    }
  });

  const getStatusClass = (status: string | null) => {
    switch (status?.toLowerCase()) {
      case "running":
        return "text-green-600";
      case "stopped":
        return "text-red-600";
      case "suspended":
        return "text-amber-600";
      default:
        return "text-gray-600";
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      className="container mx-auto p-4"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
        variants={container}
      >
        {servers?.map((server) => (
          <motion.div key={server.id} variants={item} className="card-pop">
            <Card className="overflow-hidden bg-gradient-to-br from-gray-900/50 to-gray-800/50 border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
              <CardHeader className="space-y-1 bg-black/20">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl text-purple-100">{server.name}</CardTitle>
                  <span 
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      getStatusClass(server.status)
                    }`}
                  >
                    {server.status || "Unknown"}
                  </span>
                </div>
                <CardDescription className="text-purple-200/70">
                  ID: {server.identifier || "N/A"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 mt-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center text-purple-100">
                      <Cpu className="w-4 h-4 mr-2" />
                      CPU Usage
                    </span>
                    <span>{server.usage.cpu}%</span>
                  </div>
                  <Progress value={server.usage.cpu} className="h-2 bg-purple-900/20" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center text-purple-100">
                      <Monitor className="w-4 h-4 mr-2" />
                      Memory
                    </span>
                    <span>
                      {Math.round(server.usage.memory)} / {server.memory_limit || "∞"} MB
                    </span>
                  </div>
                  <Progress 
                    value={server.memory_limit ? (server.usage.memory / server.memory_limit * 100) : 0} 
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
                      {Math.round(server.usage.disk)} / {server.disk_limit || "∞"} MB
                    </span>
                  </div>
                  <Progress 
                    value={server.disk_limit ? (server.usage.disk / server.disk_limit * 100) : 0} 
                    className="h-2 bg-purple-900/20" 
                  />
                </div>

                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex justify-between mt-4"
                >
                  <Button 
                    variant="outline" 
                    className="w-full bg-purple-500/10 border-purple-500/30 hover:bg-purple-500/20 text-purple-100"
                  >
                    <Power className="w-4 h-4 mr-2" />
                    Power
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {(!servers || servers.length === 0) && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-8"
        >
          <p className="text-purple-200/70">No servers found.</p>
        </motion.div>
      )}
    </motion.div>
  );
}
