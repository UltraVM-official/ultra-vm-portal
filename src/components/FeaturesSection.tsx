
import { Cpu, Shield, Clock, Server, Zap, Activity, LifeBuoy, Lock } from "lucide-react";

const features = [
  {
    name: 'High Performance',
    description: 'Blazing fast servers with the latest gen CPUs, optimized for maximum performance.',
    icon: Cpu,
  },
  {
    name: 'DDoS Protection',
    description: 'Advanced protection against DDoS attacks to keep your services online 24/7.',
    icon: Shield,
  },
  {
    name: '99.9% Uptime',
    description: 'We guarantee 99.9% uptime for all our servers, backed by our SLA.',
    icon: Clock,
  },
  {
    name: 'SSD Storage',
    description: 'All servers come with high-speed SSD storage for the fastest read/write speeds.',
    icon: Server,
  },
  {
    name: 'Instant Deployment',
    description: 'Deploy your new server in seconds, not minutes or hours.',
    icon: Zap,
  },
  {
    name: 'Real-time Monitoring',
    description: 'Monitor your server performance and resource usage in real-time.',
    icon: Activity,
  },
  {
    name: '24/7 Support',
    description: 'Our team is available 24/7 to help you with any issues or questions.',
    icon: LifeBuoy,
  },
  {
    name: 'Secure Infrastructure',
    description: 'Enterprise-grade security to keep your data and applications safe.',
    icon: Lock,
  },
];

const FeaturesSection = () => {
  return (
    <div className="py-24 bg-gray-50 dark:bg-ultravm-dark/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Why Choose <span className="text-ultravm-primary">UltraVM</span>?
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
            Our servers are designed for performance, reliability, and security. Here's what sets us apart.
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.name} className="relative bg-white dark:bg-ultravm-dark rounded-lg border border-gray-200 dark:border-gray-800 p-6 card-shadow hover:border-ultravm-primary transition-colors duration-300">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-ultravm-primary text-white">
                  <feature.icon className="h-6 w-6" />
                </div>
                <div className="mt-5">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">{feature.name}</h3>
                  <p className="mt-2 text-base text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
