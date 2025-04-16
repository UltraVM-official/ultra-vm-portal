
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PricingSection from "@/components/PricingSection";
import CTASection from "@/components/CTASection";

const Pricing = () => {
  return (
    <>
      <Navbar />
      <div className="pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
              Transparent Pricing, <span className="text-ultravm-primary">No Surprises</span>
            </h1>
            <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500 dark:text-gray-300">
              Choose the perfect plan for your needs. All plans include high-performance servers, 24/7 support, and a 99.9% uptime guarantee.
            </p>
          </div>
        </div>
        <PricingSection />
        <CTASection />
      </div>
      <Footer />
    </>
  );
};

export default Pricing;
