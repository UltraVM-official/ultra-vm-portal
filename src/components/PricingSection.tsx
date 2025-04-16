
import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const PricingSection = () => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
  
  const pricingPlans = [
    {
      name: 'Starter',
      description: 'Perfect for small projects and testing.',
      monthlyPrice: 5.99,
      yearlyPrice: 59.9,
      features: [
        '1 vCPU',
        '2GB RAM',
        '20GB SSD Storage',
        '1TB Bandwidth',
        'Basic Support',
        'Shared Resources',
      ],
      highlight: false,
    },
    {
      name: 'Standard',
      description: 'Ideal for medium-sized applications.',
      monthlyPrice: 12.99,
      yearlyPrice: 129.9,
      features: [
        '2 vCPU',
        '4GB RAM',
        '50GB SSD Storage',
        '2TB Bandwidth',
        'Priority Support',
        'Dedicated Resources',
        'Free Domain',
      ],
      highlight: true,
    },
    {
      name: 'Professional',
      description: 'For high-traffic websites and applications.',
      monthlyPrice: 24.99,
      yearlyPrice: 249.9,
      features: [
        '4 vCPU',
        '8GB RAM',
        '100GB SSD Storage',
        '5TB Bandwidth',
        'Premium Support',
        'Dedicated Resources',
        'Free Domain',
        'DDoS Protection',
      ],
      highlight: false,
    },
    {
      name: 'Enterprise',
      description: 'For large-scale business applications.',
      monthlyPrice: 49.99,
      yearlyPrice: 499.9,
      features: [
        '8 vCPU',
        '16GB RAM',
        '200GB SSD Storage',
        '10TB Bandwidth',
        '24/7 Premium Support',
        'Dedicated Resources',
        'Free Domain',
        'DDoS Protection',
        'Daily Backups',
        'Load Balancing',
      ],
      highlight: false,
    },
  ];

  return (
    <div className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
            No hidden fees. No surprise charges. Just great servers at affordable prices.
          </p>
          
          <div className="mt-12 flex justify-center items-center space-x-4">
            <Label htmlFor="billing-toggle" className={`text-sm ${billingPeriod === 'monthly' ? 'font-medium text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
              Monthly
            </Label>
            <Switch
              id="billing-toggle"
              checked={billingPeriod === 'yearly'}
              onCheckedChange={() => setBillingPeriod(billingPeriod === 'monthly' ? 'yearly' : 'monthly')}
              className="data-[state=checked]:bg-ultravm-primary"
            />
            <Label htmlFor="billing-toggle" className={`text-sm ${billingPeriod === 'yearly' ? 'font-medium text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
              Yearly 
              <span className="ml-1.5 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                Save 17%
              </span>
            </Label>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pricingPlans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-lg shadow-sm divide-y divide-gray-200 dark:divide-gray-700 overflow-hidden ${
                plan.highlight 
                  ? 'ring-2 ring-ultravm-primary pricing-highlight transform scale-105 z-10' 
                  : 'bg-white dark:bg-ultravm-dark border border-gray-200 dark:border-gray-800'
              }`}
            >
              <div className="p-6">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">{plan.name}</h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{plan.description}</p>
                <p className="mt-8">
                  <span className="text-4xl font-extrabold text-gray-900 dark:text-white">
                    ${billingPeriod === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice}
                  </span>
                  <span className="text-base font-medium text-gray-500 dark:text-gray-400">
                    /{billingPeriod === 'monthly' ? 'mo' : 'year'}
                  </span>
                </p>
                <Link to="/signup">
                  <Button
                    className={`mt-8 w-full ${
                      plan.highlight
                        ? 'bg-ultravm-primary hover:bg-ultravm-secondary'
                        : 'bg-ultravm-primary/90 hover:bg-ultravm-primary'
                    } text-white`}
                  >
                    Get started
                  </Button>
                </Link>
              </div>
              <div className="px-6 pt-6 pb-8">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white tracking-wide uppercase">
                  What's included
                </h4>
                <ul className="mt-6 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <div className="flex-shrink-0">
                        <Check className="h-5 w-5 text-green-500" />
                      </div>
                      <p className="ml-3 text-sm text-gray-700 dark:text-gray-300">{feature}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingSection;
