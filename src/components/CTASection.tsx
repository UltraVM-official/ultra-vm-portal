
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <div className="py-16 bg-ultravm-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to get started?</span>
            <span className="block text-white/90">Launch your server in minutes.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0 gap-4">
            <Link to="/signup">
              <Button className="px-6 py-6 text-base font-medium bg-white text-ultravm-primary hover:bg-gray-50 flex items-center space-x-2">
                <span>Get Started</span>
                <ArrowRight size={16} />
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" className="px-6 py-6 text-base font-medium border-white text-white hover:bg-white/10">
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTASection;
