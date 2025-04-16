
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PricingSection from "@/components/PricingSection";
import CTASection from "@/components/CTASection";

const Pricing = () => {
  return (
    <>
      <Navbar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="pt-16 pb-8"
      >
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="text-center">
            <motion.h1
              className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl sm:tracking-tight lg:text-6xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Transparent Pricing, <span className="text-ultravm-primary animate-glow">No Surprises</span>
            </motion.h1>
            <motion.p
              className="mt-5 max-w-xl mx-auto text-xl text-gray-500 dark:text-gray-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Choose the perfect plan for your needs. All plans include high-performance servers, 24/7 support, and a 99.9% uptime guarantee.
            </motion.p>
          </div>
        </motion.div>
        <PricingSection />
        <CTASection />
      </motion.div>
      <Footer />
    </>
  );
};

export default Pricing;
