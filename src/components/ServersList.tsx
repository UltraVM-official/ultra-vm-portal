
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
import { Loader2 } from "lucide-react";

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

      return data as Server[];
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
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Your Servers</h2>
      </div>

      {!servers || servers.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No servers found.</p>
        </div>
      ) : (
        <Table>
          <TableCaption>A list of your servers.</TableCaption>
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

