
import React, { useEffect, useState } from "react";
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

interface Server {
  id: string;
  name: string;
  identifier: string;
  status: string;
  node: string;
  cpu_limit: number;
  memory_limit: number;
  disk_limit: number;
  created_at: string;
}

export function ServersList() {
  const [servers, setServers] = useState<Server[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchServers();
  }, []);

  const fetchServers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("servers")
        .select("*")
        .order("name");

      if (error) {
        throw error;
      }

      setServers(data || []);
    } catch (error) {
      console.error("Error fetching servers:", error);
      toast({
        title: "Error",
        description: "Failed to load servers. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusClass = (status: string) => {
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

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Your Servers</h2>
        <button
          onClick={fetchServers}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          disabled={loading}
        >
          {loading ? "Loading..." : "Refresh"}
        </button>
      </div>

      {servers.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No servers found.</p>
        </div>
      ) : (
        <Table>
          <TableCaption>A list of your Pterodactyl servers.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Identifier</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Node</TableHead>
              <TableHead className="text-right">CPU</TableHead>
              <TableHead className="text-right">Memory (MB)</TableHead>
              <TableHead className="text-right">Disk (MB)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {servers.map((server) => (
              <TableRow key={server.id}>
                <TableCell className="font-medium">{server.name}</TableCell>
                <TableCell>{server.identifier || "N/A"}</TableCell>
                <TableCell className={getStatusClass(server.status)}>
                  {server.status || "Unknown"}
                </TableCell>
                <TableCell>{server.node || "N/A"}</TableCell>
                <TableCell className="text-right">{server.cpu_limit || "∞"}</TableCell>
                <TableCell className="text-right">{server.memory_limit || "∞"}</TableCell>
                <TableCell className="text-right">{server.disk_limit || "∞"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
