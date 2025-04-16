
import { useState, useEffect } from "react";
import { 
  Activity, 
  Server, 
  CreditCard, 
  Clock, 
  ChevronRight, 
  BarChart3,
  Calendar,
  Zap,
  AlertCircle 
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardHeader from "@/components/DashboardHeader";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";

// Placeholder data
const servers = [
  {
    id: 1,
    name: "Web Server",
    status: "Running",
    cpu: 25,
    ram: 40,
    disk: 30,
    renewalDate: "2023-06-15",
  },
  {
    id: 2,
    name: "Database Server",
    status: "Running",
    cpu: 65,
    ram: 70,
    disk: 55,
    renewalDate: "2023-06-20",
  },
  {
    id: 3,
    name: "Dev Environment",
    status: "Offline",
    cpu: 0,
    ram: 0,
    disk: 45,
    renewalDate: "2023-07-05",
  }
];

const Dashboard = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Placeholder for future authentication check
    toast({
      title: "Dashboard Overview",
      description: "This is a demo dashboard. Actual server data integration will be implemented in the next phase.",
    });
  }, [toast]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-ultravm-dark/30">
      <DashboardSidebar isAdmin={isAdmin} />
      
      <div className="md:pl-64">
        <DashboardHeader />
        
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Welcome back! Here's an overview of your servers and resources.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Servers</CardTitle>
                <Server className="h-4 w-4 text-ultravm-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{servers.length}</div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {servers.filter(s => s.status === "Running").length} servers running
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Resource Usage</CardTitle>
                <Activity className="h-4 w-4 text-ultravm-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">56%</div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Average across all servers
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Upcoming Renewals</CardTitle>
                <Clock className="h-4 w-4 text-ultravm-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2</div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  In the next 30 days
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Current Balance</CardTitle>
                <CreditCard className="h-4 w-4 text-ultravm-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$120.00</div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Credits available
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-3 mb-8">
            <Card className="col-span-1 lg:col-span-2">
              <CardHeader>
                <CardTitle>Server Overview</CardTitle>
                <CardDescription>Status and performance of your servers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {servers.map((server) => (
                  <div 
                    key={server.id} 
                    className="border border-gray-200 dark:border-gray-800 rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <Server className="h-5 w-5 mr-2 text-ultravm-primary" />
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white">{server.name}</h3>
                          <div className="flex items-center">
                            <span 
                              className={`h-2 w-2 rounded-full mr-1 ${
                                server.status === "Running" ? "bg-green-500" : "bg-red-500"
                              }`} 
                            />
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {server.status}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Link to={`/dashboard/servers/${server.id}`}>
                        <Button variant="outline" size="sm">
                          Manage
                        </Button>
                      </Link>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-gray-500 dark:text-gray-400">CPU</span>
                          <span className="text-xs font-medium">{server.cpu}%</span>
                        </div>
                        <Progress value={server.cpu} className="h-1" />
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-gray-500 dark:text-gray-400">RAM</span>
                          <span className="text-xs font-medium">{server.ram}%</span>
                        </div>
                        <Progress value={server.ram} className="h-1" />
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-gray-500 dark:text-gray-400">Disk</span>
                          <span className="text-xs font-medium">{server.disk}%</span>
                        </div>
                        <Progress value={server.disk} className="h-1" />
                      </div>
                    </div>
                    
                    <div className="mt-4 text-xs text-gray-500 dark:text-gray-400 flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>Renewal: {new Date(server.renewalDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Link to="/dashboard/servers" className="w-full">
                  <Button variant="outline" className="w-full">
                    View All Servers
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
            
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Link to="/dashboard/servers/create">
                    <Button className="w-full bg-ultravm-primary hover:bg-ultravm-secondary flex items-center justify-center">
                      <Zap className="mr-2 h-4 w-4" />
                      Create New Server
                    </Button>
                  </Link>
                  <Link to="/dashboard/billing">
                    <Button variant="outline" className="w-full">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Manage Billing
                    </Button>
                  </Link>
                  <Link to="/dashboard/support">
                    <Button variant="outline" className="w-full">
                      <AlertCircle className="mr-2 h-4 w-4" />
                      Get Support
                    </Button>
                  </Link>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Resource Usage</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center h-48">
                    <BarChart3 className="h-24 w-24 text-ultravm-primary opacity-50" />
                  </div>
                  <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                    Detailed usage stats coming soon
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
