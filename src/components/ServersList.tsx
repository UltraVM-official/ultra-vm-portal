
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2, Power, Cpu, HardDrive, Memory } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

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
  usage?: {
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

      // Fetch server usage data from Pterodactyl for each server
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
                cpu: usageData.cpu_absolute ?? 0,
                memory: (usageData.memory_bytes / (1024 * 1024)) ?? 0, // Convert to MB
                disk: (usageData.disk_bytes / (1024 * 1024)) ?? 0 // Convert to MB
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
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-ultravm-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {servers?.map((server) => (
          <Card key={server.id} className="overflow-hidden">
            <CardHeader className="space-y-1">
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl">{server.name}</CardTitle>
                <span 
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    getStatusClass(server.status)
                  }`}
                >
                  {server.status || "Unknown"}
                </span>
              </div>
              <CardDescription>
                ID: {server.identifier || "N/A"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center">
                    <Cpu className="w-4 h-4 mr-2" />
                    CPU Usage
                  </span>
                  <span>{server.usage?.cpu ?? 0}%</span>
                </div>
                <Progress value={server.usage?.cpu ?? 0} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center">
                    <Memory className="w-4 h-4 mr-2" />
                    Memory
                  </span>
                  <span>
                    {Math.round(server.usage?.memory ?? 0)} / {server.memory_limit || "∞"} MB
                  </span>
                </div>
                <Progress 
                  value={server.memory_limit ? (server.usage?.memory ?? 0) / server.memory_limit * 100 : 0} 
                  className="h-2" 
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center">
                    <HardDrive className="w-4 h-4 mr-2" />
                    Disk
                  </span>
                  <span>
                    {Math.round(server.usage?.disk ?? 0)} / {server.disk_limit || "∞"} MB
                  </span>
                </div>
                <Progress 
                  value={server.disk_limit ? (server.usage?.disk ?? 0) / server.disk_limit * 100 : 0} 
                  className="h-2" 
                />
              </div>

              <div className="flex justify-between mt-4">
                <Button variant="outline" className="w-full">
                  <Power className="w-4 h-4 mr-2" />
                  Power
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {(!servers || servers.length === 0) && (
        <div className="text-center py-8">
          <p className="text-gray-500">No servers found.</p>
        </div>
      )}
    </div>
  );
}
