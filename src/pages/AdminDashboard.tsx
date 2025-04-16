import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard,
  Users,
  Server,
  Settings,
  CreditCard,
  Package,
  Plus,
  Edit,
  Trash,
  X,
  Save,
  AlertTriangle,
  RefreshCw,
  Power,
  PowerOff
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";

const initialPlans = [
  {
    id: 1,
    name: "Starter",
    price: 9.99,
    cpu: 1,
    ram: 2,
    storage: 20,
    bandwidth: 1000,
    isPopular: false,
    features: [
      "1 CPU Core",
      "2 GB RAM",
      "20 GB SSD Storage",
      "1 TB Bandwidth",
      "24/7 Support"
    ]
  },
  {
    id: 2,
    name: "Professional",
    price: 19.99,
    cpu: 2,
    ram: 4,
    storage: 50,
    bandwidth: 2000,
    isPopular: true,
    features: [
      "2 CPU Cores",
      "4 GB RAM",
      "50 GB SSD Storage",
      "2 TB Bandwidth",
      "24/7 Priority Support",
      "Free Domain"
    ]
  },
  {
    id: 3,
    name: "Business",
    price: 39.99,
    cpu: 4,
    ram: 8,
    storage: 100,
    bandwidth: 4000,
    isPopular: false,
    features: [
      "4 CPU Cores",
      "8 GB RAM",
      "100 GB SSD Storage",
      "4 TB Bandwidth",
      "24/7 Priority Support",
      "Free Domain",
      "DDoS Protection"
    ]
  }
];

const initialPromotions = [
  {
    id: 1,
    name: "Summer Sale",
    code: "SUMMER2023",
    discount: 20,
    validUntil: "2023-08-31",
    isActive: true
  },
  {
    id: 2,
    name: "New User Discount",
    code: "WELCOME",
    discount: 15,
    validUntil: "2023-12-31",
    isActive: true
  }
];

const initialServers = [
  {
    id: 1,
    name: "Game Server 1",
    status: "running",
    owner: "user@example.com",
    plan: "Professional",
    node: "Node 1",
    ip: "192.168.1.1",
    port: 25565
  },
  {
    id: 2,
    name: "Discord Bot",
    status: "stopped",
    owner: "another@example.com",
    plan: "Starter",
    node: "Node 2",
    ip: "192.168.1.2",
    port: 8080
  },
  {
    id: 3,
    name: "Web Hosting",
    status: "running",
    owner: "third@example.com",
    plan: "Business",
    node: "Node 1",
    ip: "192.168.1.3",
    port: 80
  }
];

const Sidebar = ({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (tab: string) => void }) => {
  return (
    <div className="fixed left-0 top-0 bottom-0 w-64 bg-white dark:bg-ultravm-dark border-r border-gray-200 dark:border-gray-800 p-4 z-30">
      <div className="flex items-center gap-2 mb-8">
        <span className="text-2xl font-bold text-ultravm-primary">Ultra<span className="text-ultravm-secondary">VM</span></span>
        <span className="px-2 py-1 bg-ultravm-primary/20 text-ultravm-primary text-xs font-medium rounded">Admin</span>
      </div>
      
      <nav className="space-y-1">
        <button
          className={`flex items-center w-full px-3 py-2 rounded-lg transition-colors ${
            activeTab === "dashboard" 
              ? "bg-ultravm-primary text-white" 
              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          }`}
          onClick={() => setActiveTab("dashboard")}
        >
          <LayoutDashboard className="h-5 w-5 mr-3" />
          Dashboard
        </button>
        
        <button
          className={`flex items-center w-full px-3 py-2 rounded-lg transition-colors ${
            activeTab === "users" 
              ? "bg-ultravm-primary text-white" 
              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          }`}
          onClick={() => setActiveTab("users")}
        >
          <Users className="h-5 w-5 mr-3" />
          Users
        </button>
        
        <button
          className={`flex items-center w-full px-3 py-2 rounded-lg transition-colors ${
            activeTab === "servers" 
              ? "bg-ultravm-primary text-white" 
              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          }`}
          onClick={() => setActiveTab("servers")}
        >
          <Server className="h-5 w-5 mr-3" />
          Servers
        </button>
        
        <button
          className={`flex items-center w-full px-3 py-2 rounded-lg transition-colors ${
            activeTab === "plans" 
              ? "bg-ultravm-primary text-white" 
              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          }`}
          onClick={() => setActiveTab("plans")}
        >
          <Package className="h-5 w-5 mr-3" />
          Plans
        </button>
        
        <button
          className={`flex items-center w-full px-3 py-2 rounded-lg transition-colors ${
            activeTab === "billing" 
              ? "bg-ultravm-primary text-white" 
              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          }`}
          onClick={() => setActiveTab("billing")}
        >
          <CreditCard className="h-5 w-5 mr-3" />
          Billing
        </button>
        
        <button
          className={`flex items-center w-full px-3 py-2 rounded-lg transition-colors ${
            activeTab === "settings" 
              ? "bg-ultravm-primary text-white" 
              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          }`}
          onClick={() => setActiveTab("settings")}
        >
          <Settings className="h-5 w-5 mr-3" />
          Settings
        </button>
      </nav>
      
      <div className="absolute bottom-4 left-4 right-4">
        <div className="flex items-center space-x-3 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-ultravm-primary text-white">
              A
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
              Admin User
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
              admin@ultravm.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const PlanForm = ({ 
  plan, 
  onSave, 
  onCancel 
}: { 
  plan: any; 
  onSave: (plan: any) => void; 
  onCancel: () => void; 
}) => {
  const [formState, setFormState] = useState(plan);
  const [features, setFeatures] = useState(plan.features.join("\n"));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    const parsedValue = type === "number" ? parseFloat(value) : value;
    setFormState({
      ...formState,
      [name]: parsedValue
    });
  };

  const handleSave = () => {
    const updatedPlan = {
      ...formState,
      features: features.split("\n").filter(f => f.trim() !== "")
    };
    onSave(updatedPlan);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Plan Name</Label>
          <Input
            id="name"
            name="name"
            value={formState.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor="price">Price ($/month)</Label>
          <Input
            id="price"
            name="price"
            type="number"
            step="0.01"
            value={formState.price}
            onChange={handleChange}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="cpu">CPU Cores</Label>
          <Input
            id="cpu"
            name="cpu"
            type="number"
            value={formState.cpu}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor="ram">RAM (GB)</Label>
          <Input
            id="ram"
            name="ram"
            type="number"
            value={formState.ram}
            onChange={handleChange}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="storage">Storage (GB)</Label>
          <Input
            id="storage"
            name="storage"
            type="number"
            value={formState.storage}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor="bandwidth">Bandwidth (GB)</Label>
          <Input
            id="bandwidth"
            name="bandwidth"
            type="number"
            value={formState.bandwidth}
            onChange={handleChange}
          />
        </div>
      </div>
      
      <div>
        <div className="flex items-center justify-between mb-2">
          <Label htmlFor="features">Features (one per line)</Label>
          <div className="flex items-center">
            <Label htmlFor="isPopular" className="mr-2 text-sm">
              Mark as Popular
            </Label>
            <Switch
              id="isPopular"
              checked={formState.isPopular}
              onCheckedChange={(checked) => setFormState({...formState, isPopular: checked})}
            />
          </div>
        </div>
        <textarea
          id="features"
          className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-800 min-h-[120px]"
          value={features}
          onChange={(e) => setFeatures(e.target.value)}
        />
      </div>
      
      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSave}>
          Save Plan
        </Button>
      </div>
    </div>
  );
};

const PromotionForm = ({ 
  promotion, 
  onSave, 
  onCancel 
}: { 
  promotion: any; 
  onSave: (promotion: any) => void; 
  onCancel: () => void; 
}) => {
  const [formState, setFormState] = useState(promotion);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    const parsedValue = type === "number" ? parseInt(value) : value;
    setFormState({
      ...formState,
      [name]: parsedValue
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="name">Promotion Name</Label>
        <Input
          id="name"
          name="name"
          value={formState.name}
          onChange={handleChange}
        />
      </div>
      
      <div>
        <Label htmlFor="code">Promo Code</Label>
        <Input
          id="code"
          name="code"
          value={formState.code}
          onChange={handleChange}
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="discount">Discount (%)</Label>
          <Input
            id="discount"
            name="discount"
            type="number"
            min="1"
            max="100"
            value={formState.discount}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor="validUntil">Valid Until</Label>
          <Input
            id="validUntil"
            name="validUntil"
            type="date"
            value={formState.validUntil}
            onChange={handleChange}
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <Switch
          id="isActive"
          checked={formState.isActive}
          onCheckedChange={(checked) => setFormState({...formState, isActive: checked})}
        />
        <Label htmlFor="isActive">
          Active
        </Label>
      </div>
      
      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={() => onSave(formState)}>
          Save Promotion
        </Button>
      </div>
    </div>
  );
};

const ServersManagement = () => {
  const [servers, setServers] = useState(initialServers);
  const [isLoading, setIsLoading] = useState(false);
  const [syncStatus, setSyncStatus] = useState("");
  const { toast } = useToast();
  
  const handleSync = () => {
    setIsLoading(true);
    setSyncStatus("Syncing with Pterodactyl...");
    
    setTimeout(() => {
      toast({
        title: "Synchronization complete",
        description: "Successfully synced servers with Pterodactyl."
      });
      setIsLoading(false);
      setSyncStatus("");
    }, 2000);
  };
  
  const handleServerAction = (serverId: number, action: string) => {
    setServers(servers.map(server => {
      if (server.id === serverId) {
        let newStatus = server.status;
        if (action === 'start') newStatus = 'running';
        if (action === 'stop') newStatus = 'stopped';
        if (action === 'restart') {
          toast({
            title: "Restarting server",
            description: `${server.name} is restarting...`
          });
        }
        
        return { ...server, status: newStatus };
      }
      return server;
    }));
    
    toast({
      title: `Server ${action}ed`,
      description: `Successfully ${action}ed server.`
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Server Management</h2>
        <div className="space-x-2">
          <Button 
            variant="outline" 
            onClick={handleSync} 
            disabled={isLoading}
            className="transition-all hover:scale-105 active:scale-95"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Sync with Pterodactyl
          </Button>
          <Button className="transition-all hover:scale-105 active:scale-95">
            <Plus className="h-4 w-4 mr-2" />
            New Server
          </Button>
        </div>
      </div>
      
      {syncStatus && (
        <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 p-4 rounded-md flex items-center">
          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
          {syncStatus}
        </div>
      )}
      
      <div className="bg-white dark:bg-ultravm-dark/40 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Server Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Owner
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Plan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Node
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  IP:Port
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {servers.map((server) => (
                <motion.tr 
                  key={server.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800"
                  whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {server.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {server.status === "running" ? (
                      <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full text-xs flex items-center w-fit">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></span>
                        Running
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 rounded-full text-xs flex items-center w-fit">
                        <span className="w-2 h-2 bg-gray-500 rounded-full mr-1"></span>
                        Stopped
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                    {server.owner}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                    {server.plan}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                    {server.node}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                    <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">
                      {server.ip}:{server.port}
                    </code>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                    <div className="flex space-x-1 justify-end">
                      {server.status === "stopped" ? (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleServerAction(server.id, 'start')}
                          className="text-green-500 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 transition-all hover:scale-110 active:scale-95"
                        >
                          <Power className="h-4 w-4" />
                        </Button>
                      ) : (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleServerAction(server.id, 'stop')}
                          className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-all hover:scale-110 active:scale-95"
                        >
                          <PowerOff className="h-4 w-4" />
                        </Button>
                      )}
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleServerAction(server.id, 'restart')}
                        className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-all hover:scale-110 active:scale-95"
                      >
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="transition-all hover:scale-110 active:scale-95"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const PlansManagement = () => {
  const [plans, setPlans] = useState(initialPlans);
  const [promotions, setPromotions] = useState(initialPromotions);
  const [editingPlan, setEditingPlan] = useState<any>(null);
  const [editingPromotion, setEditingPromotion] = useState<any>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{id: number, type: string} | null>(null);
  const { toast } = useToast();
  
  const handleAddPlan = () => {
    const newPlan = {
      id: Date.now(),
      name: "New Plan",
      price: 0,
      cpu: 1,
      ram: 1,
      storage: 10,
      bandwidth: 500,
      isPopular: false,
      features: ["Feature 1", "Feature 2", "Feature 3"]
    };
    setEditingPlan(newPlan);
  };
  
  const handleEditPlan = (plan: any) => {
    setEditingPlan(plan);
  };
  
  const handleSavePlan = (plan: any) => {
    if (plans.find(p => p.id === plan.id)) {
      setPlans(plans.map(p => p.id === plan.id ? plan : p));
      toast({
        title: "Plan updated",
        description: `${plan.name} has been updated successfully.`
      });
    } else {
      setPlans([...plans, plan]);
      toast({
        title: "Plan created",
        description: `${plan.name} has been created successfully.`
      });
    }
    setEditingPlan(null);
  };
  
  const handleAddPromotion = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 30);
    
    const newPromotion = {
      id: Date.now(),
      name: "New Promotion",
      code: "NEW" + Math.floor(Math.random() * 1000),
      discount: 10,
      validUntil: tomorrow.toISOString().split('T')[0],
      isActive: true
    };
    setEditingPromotion(newPromotion);
  };
  
  const handleEditPromotion = (promotion: any) => {
    setEditingPromotion(promotion);
  };
  
  const handleSavePromotion = (promotion: any) => {
    if (promotions.find(p => p.id === promotion.id)) {
      setPromotions(promotions.map(p => p.id === promotion.id ? promotion : p));
      toast({
        title: "Promotion updated",
        description: `${promotion.name} has been updated successfully.`
      });
    } else {
      setPromotions([...promotions, promotion]);
      toast({
        title: "Promotion created",
        description: `${promotion.name} has been created successfully.`
      });
    }
    setEditingPromotion(null);
  };
  
  const handleDelete = () => {
    if (!itemToDelete) return;
    
    if (itemToDelete.type === 'plan') {
      setPlans(plans.filter(p => p.id !== itemToDelete.id));
      toast({
        title: "Plan deleted",
        description: "The plan has been removed from the system."
      });
    } else if (itemToDelete.type === 'promotion') {
      setPromotions(promotions.filter(p => p.id !== itemToDelete.id));
      toast({
        title: "Promotion deleted",
        description: "The promotion has been removed from the system."
      });
    }
    
    setIsDeleteDialogOpen(false);
    setItemToDelete(null);
  };
  
  const confirmDelete = (id: number, type: string) => {
    setItemToDelete({ id, type });
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="plans">
        <TabsList className="mb-4">
          <TabsTrigger value="plans" className="transition-all hover:scale-105 active:scale-95">Service Plans</TabsTrigger>
          <TabsTrigger value="promotions" className="transition-all hover:scale-105 active:scale-95">Special Offers</TabsTrigger>
        </TabsList>
        
        <TabsContent value="plans" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Service Plans</h2>
            <Button onClick={handleAddPlan} className="transition-all hover:scale-105 active:scale-95">
              <Plus className="h-4 w-4 mr-2" />
              Add New Plan
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <motion.div 
                key={plan.id}
                className="bg-white dark:bg-ultravm-dark/40 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden transform transition-all duration-200"
                whileHover={{ y: -7, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {plan.name}
                      </h3>
                      <div className="mt-1 text-2xl font-bold text-ultravm-primary">
                        ${plan.price}<span className="text-sm text-gray-500 dark:text-gray-400 font-normal">/mo</span>
                      </div>
                    </div>
                    {plan.isPopular && (
                      <span className="px-2 py-1 bg-ultravm-primary/20 text-ultravm-primary text-xs font-medium rounded">
                        Popular
                      </span>
                    )}
                  </div>
                  
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <span className="w-24">CPU:</span>
                      <span className="font-medium text-gray-900 dark:text-white">{plan.cpu} Cores</span>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <span className="w-24">RAM:</span>
                      <span className="font-medium text-gray-900 dark:text-white">{plan.ram} GB</span>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <span className="w-24">Storage:</span>
                      <span className="font-medium text-gray-900 dark:text-white">{plan.storage} GB SSD</span>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <span className="w-24">Bandwidth:</span>
                      <span className="font-medium text-gray-900 dark:text-white">{plan.bandwidth} GB</span>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-6">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Features:</h4>
                    <ul className="space-y-2">
                      {plan.features.map((feature: string, idx: number) => (
                        <li key={idx} className="flex items-center text-gray-600 dark:text-gray-300">
                          <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      className="flex-1 transition-all hover:scale-105 active:scale-95"
                      onClick={() => handleEditPlan(plan)}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="icon"
                      className="transition-all hover:scale-105 active:scale-95"
                      onClick={() => confirmDelete(plan.id, 'plan')}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="promotions" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Special Offers</h2>
            <Button onClick={handleAddPromotion} className="transition-all hover:scale-105 active:scale-95">
              <Plus className="h-4 w-4 mr-2" />
              Add New Offer
            </Button>
          </div>
          
          <div className="bg-white dark:bg-ultravm-dark/40 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Code
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Discount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Valid Until
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {promotions.map((promo) => (
                    <motion.tr 
                      key={promo.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {promo.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                        <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">
                          {promo.code}
                        </code>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                        {promo.discount}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                        {new Date(promo.validUntil).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {promo.isActive ? (
                          <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full text-xs">
                            Active
                          </span>
                        ) : (
                          <span className="px-2 py-1 bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 rounded-full text-xs">
                            Inactive
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleEditPromotion(promo)}
                          className="mr-2"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                          onClick={() => confirmDelete(promo.id, 'promotion')}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <Dialog open={!!editingPlan} onOpenChange={(open) => !open && setEditingPlan(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{editingPlan?.id ? `Edit ${editingPlan?.name}` : 'Create New Plan'}</DialogTitle>
            <DialogDescription>
              Configure the server specifications and pricing details for this plan.
            </DialogDescription>
          </DialogHeader>
          
          {editingPlan && (
            <PlanForm 
              plan={editingPlan} 
              onSave={handleSavePlan} 
              onCancel={() => setEditingPlan(null)} 
            />
          )}
        </DialogContent>
      </Dialog>
      
      <Dialog open={!!editingPromotion} onOpenChange={(open) => !open && setEditingPromotion(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{editingPromotion?.id ? `Edit ${editingPromotion?.name}` : 'Create New Promotion'}</DialogTitle>
            <DialogDescription>
              Configure the promotion details and discount settings.
            </DialogDescription>
          </DialogHeader>
          
          {editingPromotion && (
            <PromotionForm 
              promotion={editingPromotion} 
              onSave={handleSavePromotion} 
              onCancel={() => setEditingPromotion(null)} 
            />
          )}
        </DialogContent>
      </Dialog>
      
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="flex items-center text-red-600">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Confirm Deletion
            </DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <p className="text-gray-700 dark:text-gray-300">
              Are you sure you want to delete this {itemToDelete?.type}? This action cannot be undone.
            </p>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("plans");
  const { toast } = useToast();
  
  const handlePterodactylSync = () => {
    toast({
      title: "Pterodactyl Synchronization",
      description: "Starting synchronization with Pterodactyl..."
    });
    
    setTimeout(() => {
      toast({
        title: "Synchronization Complete",
        description: "Successfully synchronized users and servers with Pterodactyl."
      });
    }, 2000);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-ultravm-dark/30">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="pl-64">
        <header className="bg-white dark:bg-ultravm-dark border-b border-gray-200 dark:border-gray-800 py-4 px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {activeTab === "dashboard" && "Admin Dashboard"}
              {activeTab === "users" && "User Management"}
              {activeTab === "servers" && "Server Management"}
              {activeTab === "plans" && "Plan Management"}
              {activeTab === "billing" && "Billing & Payments"}
              {activeTab === "settings" && "System Settings"}
            </h1>
            <div>
              <Button 
                variant="outline"
                onClick={handlePterodactylSync}
                className="transition-all hover:scale-105 active:scale-95"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Sync with Pterodactyl
              </Button>
            </div>
          </div>
        </header>
        
        <main className="py-8 px-8">
          {activeTab === "plans" && <PlansManagement />}
          {activeTab === "servers" && <ServersManagement />}
          {activeTab !== "plans" && activeTab !== "servers" && (
            <div className="bg-white dark:bg-ultravm-dark/40 rounded-xl p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                This section is under development
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                The {activeTab} functionality will be implemented in the next phase.
              </p>
              <Button onClick={() => setActiveTab("plans")} className="transition-all hover:scale-105 active:scale-95">
                Go to Plan Management
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
