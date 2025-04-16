
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  Server, 
  ShieldCheck, 
  CreditCard, 
  Clock, 
  HelpCircle,
  ChevronDown,
  ChevronUp 
} from "lucide-react";

const FAQItem = ({ question, answer, category }: { question: string; answer: string; category: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 dark:border-gray-700 last:border-b-0">
      <button
        className="flex justify-between items-center w-full py-4 text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-medium text-gray-900 dark:text-white">{question}</span>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-ultravm-primary" />
        ) : (
          <ChevronDown className="h-5 w-5 text-ultravm-primary" />
        )}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pb-4 text-gray-600 dark:text-gray-300">
              <p>{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  
  const faqItems = [
    {
      question: "What types of servers do you offer?",
      answer: "We offer a variety of server types including VPS, dedicated servers, and game servers. Each is optimized for different use cases and comes with different resource allocations to suit your needs.",
      category: "servers"
    },
    {
      question: "How powerful are your servers?",
      answer: "Our servers range from entry-level options for small projects to high-performance configurations for resource-intensive applications. All servers use modern CPUs, fast SSD storage, and have generous bandwidth allocations.",
      category: "servers"
    },
    {
      question: "Where are your servers located?",
      answer: "We have server locations across North America, Europe, and Asia to ensure low latency access from anywhere in the world. You can choose the location closest to your target audience when ordering.",
      category: "servers"
    },
    {
      question: "Do you offer managed services?",
      answer: "Yes, we offer both unmanaged and managed server options. With managed services, our team handles server maintenance, security updates, and basic troubleshooting so you can focus on your applications.",
      category: "servers"
    },
    {
      question: "How is server security handled?",
      answer: "We implement multiple layers of security including DDoS protection, firewall configurations, and regular security patches. For managed servers, we also perform regular security audits and hardening.",
      category: "security"
    },
    {
      question: "Do you offer backups?",
      answer: "Yes, we provide automated daily backups with a retention period depending on your plan. These backups are stored in a separate location for added safety. You can also create manual backups at any time.",
      category: "security"
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept credit/debit cards, PayPal, and various cryptocurrencies. All transactions are secure and we never store your complete payment information on our servers.",
      category: "billing"
    },
    {
      question: "What is your refund policy?",
      answer: "We offer a 7-day money-back guarantee for new customers. If you're not satisfied with our service, simply contact our support team within the first 7 days for a full refund.",
      category: "billing"
    },
    {
      question: "Do you offer monthly and annual payment options?",
      answer: "Yes, we offer both monthly and annual billing cycles. Annual payments come with a discount compared to monthly payments, typically saving you two months' worth of service costs.",
      category: "billing"
    },
    {
      question: "How quickly are servers deployed?",
      answer: "Most VPS servers are deployed within minutes of confirmed payment. Dedicated servers may take 24-48 hours as they require physical setup and configuration.",
      category: "support"
    },
    {
      question: "What hours is support available?",
      answer: "Our customer support team is available 24/7/365 through ticket system, live chat, and email. Priority support with phone access is available on higher-tier plans.",
      category: "support"
    },
    {
      question: "Do you have an uptime guarantee?",
      answer: "Yes, we guarantee 99.9% uptime on all our servers. In the rare event that we don't meet this guarantee, you'll receive credits according to our SLA.",
      category: "support"
    }
  ];
  
  const filteredFAQs = activeCategory === "all" 
    ? faqItems 
    : faqItems.filter(item => item.category === activeCategory);
    
  const categories = [
    { id: "all", name: "All Questions", icon: HelpCircle },
    { id: "servers", name: "Servers", icon: Server },
    { id: "security", name: "Security", icon: ShieldCheck },
    { id: "billing", name: "Billing", icon: CreditCard },
    { id: "support", name: "Support", icon: Clock }
  ];

  return (
    <>
      <Navbar />
      <div className="pt-24 pb-16 bg-gradient-to-b from-white to-gray-100 dark:from-ultravm-dark dark:to-black min-h-screen">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">
              Frequently Asked Questions
            </h1>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
              Find answers to common questions about our services
            </p>
          </motion.div>
          
          <motion.div 
            className="mb-10 flex flex-wrap justify-center gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <motion.button
                  key={category.id}
                  className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeCategory === category.id
                      ? 'bg-ultravm-primary text-white'
                      : 'bg-white dark:bg-ultravm-dark/40 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-ultravm-dark/60'
                  }`}
                  onClick={() => setActiveCategory(category.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {category.name}
                </motion.button>
              );
            })}
          </motion.div>
          
          <motion.div 
            className="bg-white dark:bg-ultravm-dark/30 rounded-xl shadow-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="divide-y divide-gray-200 dark:divide-gray-700 px-6 py-2">
              {filteredFAQs.map((item, index) => (
                <FAQItem 
                  key={index} 
                  question={item.question} 
                  answer={item.answer} 
                  category={item.category} 
                />
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Still have questions?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Our support team is ready to help you with any other questions you might have.
            </p>
            <motion.a
              href="/contact"
              className="inline-block bg-ultravm-primary hover:bg-ultravm-secondary text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Support
            </motion.a>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FAQ;
