
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FeaturesSection from "@/components/FeaturesSection";
import CTASection from "@/components/CTASection";
import { CheckCircle2 } from "lucide-react";

const FeaturesPage = () => {
  return (
    <>
      <Navbar />
      <div className="pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
              Powerful <span className="text-ultravm-primary">Features</span>
            </h1>
            <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500 dark:text-gray-300">
              Discover the powerful features that make UltraVM the perfect choice for your server needs.
            </p>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Enterprise-Grade Infrastructure
              </h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                Our servers are built on top-tier hardware with the latest generation processors, NVMe SSDs, and high-speed networking to ensure maximum performance.
              </p>
              
              <ul className="mt-8 space-y-4">
                {[
                  'Latest Generation AMD EPYC & Intel Xeon CPUs',
                  'NVMe SSDs for lightning-fast storage',
                  '10Gbps Network Connectivity',
                  'RAID Configuration for data redundancy',
                  'Enterprise-grade security features',
                ].map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle2 className="h-6 w-6 text-ultravm-primary mr-2 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="relative">
              <div className="bg-white dark:bg-ultravm-dark rounded-lg border border-gray-200 dark:border-gray-800 p-6 card-shadow h-64 flex items-center justify-center">
                <div className="w-16 h-16 bg-ultravm-primary/10 rounded-full flex items-center justify-center">
                  <div className="w-12 h-12 bg-ultravm-primary/20 rounded-full flex items-center justify-center">
                    <div className="w-8 h-8 bg-ultravm-primary/30 rounded-full flex items-center justify-center">
                      <div className="w-4 h-4 bg-ultravm-primary rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-ultravm-primary/10 rounded-full z-[-1]"></div>
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-ultravm-blue/10 rounded-full z-[-1]"></div>
            </div>
          </div>
        </div>
        
        <FeaturesSection />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 relative">
              <div className="bg-white dark:bg-ultravm-dark rounded-lg border border-gray-200 dark:border-gray-800 p-6 card-shadow h-64 flex items-center justify-center">
                {/* Placeholder for a feature visual */}
                <div className="grid grid-cols-2 gap-4 w-full h-full p-4">
                  <div className="bg-ultravm-primary/10 rounded-lg"></div>
                  <div className="bg-ultravm-primary/5 rounded-lg"></div>
                  <div className="bg-ultravm-primary/5 rounded-lg"></div>
                  <div className="bg-ultravm-primary/10 rounded-lg"></div>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-ultravm-blue/10 rounded-full z-[-1]"></div>
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-ultravm-primary/10 rounded-full z-[-1]"></div>
            </div>
            
            <div className="order-1 md:order-2">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Seamless Control Panel
              </h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                Our intuitive control panel makes managing your servers effortless. Monitor performance, manage resources, and scale your infrastructure with just a few clicks.
              </p>
              
              <ul className="mt-8 space-y-4">
                {[
                  'Real-time resource monitoring',
                  'One-click scaling options',
                  'Instant server deployment',
                  'Automatic backups and snapshots',
                  'User management and access control',
                ].map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle2 className="h-6 w-6 text-ultravm-primary mr-2 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        <CTASection />
      </div>
      <Footer />
    </>
  );
};

export default FeaturesPage;
