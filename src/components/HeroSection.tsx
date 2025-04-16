
import { ArrowRight, Server, Shield, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="relative pt-20 pb-20 overflow-hidden">
      <div className="absolute inset-0 hero-gradient"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <div className="mt-12 sm:mt-16 lg:mt-24">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                <span className="block">High Performance</span>
                <span className="block text-ultravm-primary">Virtual Servers</span>
              </h1>
              <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-xl">
                Best quality servers at affordable prices. Experience lightning-fast performance, 99.9% uptime, and 24/7 customer support.
              </p>
              <div className="mt-8 sm:flex">
                <div className="rounded-md shadow">
                  <Link to="/signup">
                    <Button className="w-full px-6 py-6 text-base font-medium bg-ultravm-primary hover:bg-ultravm-secondary text-white flex items-center justify-center space-x-2">
                      <span>Get Started</span>
                      <ArrowRight size={16} />
                    </Button>
                  </Link>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Link to="/pricing">
                    <Button variant="outline" className="w-full px-6 py-6 text-base font-medium border-ultravm-primary text-ultravm-primary hover:bg-ultravm-primary/10">
                      View Plans
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="mt-8 flex items-center space-x-6">
                <div className="flex items-center">
                  <Server className="h-5 w-5 text-ultravm-primary" />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">SSD Storage</span>
                </div>
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-ultravm-primary" />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">DDoS Protection</span>
                </div>
                <div className="flex items-center">
                  <Database className="h-5 w-5 text-ultravm-primary" />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">99.9% Uptime</span>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-6 mt-12 lg:mt-24">
            <div className="relative mx-auto w-full rounded-lg shadow-lg overflow-hidden">
              <div className="relative bg-white dark:bg-ultravm-dark rounded-lg border border-gray-200 dark:border-gray-800 p-6 card-shadow">
                <div className="absolute right-4 top-4 animate-float">
                  <Server className="h-32 w-32 text-ultravm-primary opacity-10" />
                </div>
                <div className="space-y-6">
                  <div className="h-2 bg-ultravm-primary/30 rounded w-1/3"></div>
                  <div className="space-y-2">
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-3/6"></div>
                  </div>
                  <div className="h-2 bg-ultravm-primary/30 rounded w-1/4"></div>
                  <div className="h-8 bg-ultravm-primary/20 rounded-lg w-1/2"></div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-ultravm-primary/10 rounded-full"></div>
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-ultravm-blue/10 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
