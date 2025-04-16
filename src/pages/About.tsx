
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Shield, Server, Cloud, Users, Award, Zap } from "lucide-react";

const About = () => {
  return (
    <>
      <Navbar />
      <div className="pt-20 pb-10 bg-gradient-to-b from-white to-gray-100 dark:from-ultravm-dark dark:to-black">
        <motion.div 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-16">
            <motion.h1 
              className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              About <span className="text-ultravm-primary">UltraVM</span>
            </motion.h1>
            <motion.p 
              className="max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Delivering high-performance hosting solutions since 2023
            </motion.p>
          </div>

          <motion.div 
            className="grid md:grid-cols-2 gap-12 mb-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="bg-white dark:bg-ultravm-dark/40 rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Story</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  UltraVM was founded with a simple mission: to provide enterprise-grade hosting solutions at prices everyone can afford. Our team of hosting veterans identified a gap in the market for quality servers that don't break the bank.
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  What started as a small operation has grown into a trusted hosting provider serving thousands of clients worldwide, from individual developers to growing businesses.
                </p>
              </div>
            </div>
            
            <div className="bg-white dark:bg-ultravm-dark/40 rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Mission</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  We believe that everyone deserves access to reliable, high-performance hosting without compromise. Our mission is to democratize access to premium server infrastructure through transparent pricing and exceptional service.
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  We're committed to continuous innovation, ensuring our clients always have access to the latest technologies and best practices in server hosting.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-10">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-ultravm-dark/40 p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 hover:bg-gray-50 dark:hover:bg-ultravm-dark/60">
                <Shield className="h-10 w-10 text-ultravm-primary mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Reliability</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Our infrastructure is built for 99.9% uptime, ensuring your services stay online when you need them most.
                </p>
              </div>
              
              <div className="bg-white dark:bg-ultravm-dark/40 p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 hover:bg-gray-50 dark:hover:bg-ultravm-dark/60">
                <Users className="h-10 w-10 text-ultravm-primary mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Customer Focus</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We prioritize your experience, offering responsive support and continuously improving our services based on your feedback.
                </p>
              </div>
              
              <div className="bg-white dark:bg-ultravm-dark/40 p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 hover:bg-gray-50 dark:hover:bg-ultravm-dark/60">
                <Award className="h-10 w-10 text-ultravm-primary mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Quality</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We never compromise on the quality of our hardware, software, or support to ensure you get the best performance possible.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="bg-ultravm-primary/10 rounded-2xl p-8 md:p-12 mb-20"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-10">Our Technology</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex items-start">
                <Server className="h-8 w-8 text-ultravm-primary mr-4 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Enterprise Hardware</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    We use only enterprise-grade hardware from trusted manufacturers to ensure reliability and performance.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Cloud className="h-8 w-8 text-ultravm-primary mr-4 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Global Network</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Our servers are strategically located in data centers around the world to provide low-latency access from anywhere.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Shield className="h-8 w-8 text-ultravm-primary mr-4 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Advanced Security</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    We implement multiple layers of security, from physical data center security to network protection.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Zap className="h-8 w-8 text-ultravm-primary mr-4 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Optimized Performance</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Our servers are optimized for maximum performance, with SSD storage and high-bandwidth connections.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Ready to get started?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust UltraVM for their hosting needs.
            </p>
            <div className="flex justify-center gap-4">
              <motion.a 
                href="/signup" 
                className="bg-ultravm-primary hover:bg-ultravm-secondary text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
              </motion.a>
              <motion.a 
                href="/contact" 
                className="bg-white dark:bg-ultravm-dark border border-ultravm-primary text-ultravm-primary font-bold py-3 px-8 rounded-lg hover:bg-ultravm-primary/10 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Sales
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default About;
