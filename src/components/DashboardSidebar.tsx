
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  Server, 
  CreditCard, 
  Settings, 
  Users, 
  HelpCircle, 
  Bell, 
  LogOut,
  ChevronDown,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

type SidebarItem = {
  name: string;
  icon: React.ElementType;
  href: string;
  adminOnly?: boolean;
  children?: Omit<SidebarItem, 'children'>[];
};

// Sidebar navigation items
const navigation: SidebarItem[] = [
  { name: 'Dashboard', icon: Home, href: '/dashboard' },
  { 
    name: 'Servers', 
    icon: Server, 
    href: '/dashboard/servers',
    children: [
      { name: 'My Servers', icon: Server, href: '/dashboard/servers' },
      { name: 'Create Server', icon: Server, href: '/dashboard/servers/create' },
    ]
  },
  { name: 'Billing', icon: CreditCard, href: '/dashboard/billing' },
  { name: 'Settings', icon: Settings, href: '/dashboard/settings' },
  { name: 'Support', icon: HelpCircle, href: '/dashboard/support' },
  { name: 'Admin Panel', icon: Users, href: '/dashboard/admin', adminOnly: true },
];

interface DashboardSidebarProps {
  isAdmin?: boolean;
}

const DashboardSidebar = ({ isAdmin = false }: DashboardSidebarProps) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  const toggleExpandItem = (name: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const isCurrentPath = (path: string) => {
    return location.pathname === path;
  };

  const filteredNavigation = navigation.filter(item => !item.adminOnly || (item.adminOnly && isAdmin));

  return (
    <>
      {/* Mobile sidebar toggle button */}
      {isMobile && (
        <Button
          variant="outline"
          size="icon"
          className="fixed top-4 left-4 z-50 md:hidden"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <Server className="h-5 w-5" />
        </Button>
      )}

      {/* Sidebar */}
      <div 
        className={`sidebar fixed inset-y-0 left-0 z-40 w-64 transform bg-white dark:bg-ultravm-dark border-r border-gray-200 dark:border-gray-800 transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-ultravm-primary">Ultra<span className="text-ultravm-secondary">VM</span></span>
            </Link>
          </div>
          {isMobile && (
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => setIsSidebarOpen(false)}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          )}
        </div>

        <div className="py-6 px-4">
          <div className="space-y-1">
            {filteredNavigation.map((item) => (
              <div key={item.name}>
                {item.children ? (
                  <div>
                    <button
                      type="button"
                      className={`group flex w-full items-center px-2 py-2 text-sm font-medium rounded-md ${
                        isCurrentPath(item.href) || expandedItems[item.name]
                          ? 'bg-ultravm-primary/10 text-ultravm-primary'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                      onClick={() => toggleExpandItem(item.name)}
                    >
                      <item.icon
                        className={`mr-3 h-5 w-5 ${
                          isCurrentPath(item.href) || expandedItems[item.name]
                            ? 'text-ultravm-primary'
                            : 'text-gray-500 dark:text-gray-400'
                        }`}
                      />
                      <span className="flex-1">{item.name}</span>
                      {expandedItems[item.name] ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </button>
                    {expandedItems[item.name] && (
                      <div className="ml-8 mt-1 space-y-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            to={child.href}
                            className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                              isCurrentPath(child.href)
                                ? 'bg-ultravm-primary/10 text-ultravm-primary'
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                            }`}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.href}
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                      isCurrentPath(item.href)
                        ? 'bg-ultravm-primary/10 text-ultravm-primary'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <item.icon
                      className={`mr-3 h-5 w-5 ${
                        isCurrentPath(item.href)
                          ? 'text-ultravm-primary'
                          : 'text-gray-500 dark:text-gray-400'
                      }`}
                    />
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200 dark:border-gray-800 p-4">
          <Link
            to="/logout"
            className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <LogOut className="mr-3 h-5 w-5 text-gray-500 dark:text-gray-400" />
            Logout
          </Link>
        </div>
      </div>
    </>
  );
};

export default DashboardSidebar;
