
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, User, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

// Example news data (in a real app, this would come from an API)
const newsItems = [
  {
    id: 1,
    title: "New Server Locations in Asia Pacific",
    excerpt: "We're excited to announce the launch of new server locations in Tokyo and Singapore to better serve our Asia Pacific customers.",
    date: "2023-04-15",
    author: "Alex Johnson",
    category: "Expansion",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80"
  },
  {
    id: 2,
    title: "Introducing High-Performance NVMe Servers",
    excerpt: "Our newest server lineup features blazing-fast NVMe storage, delivering up to 10x the performance of traditional SSD servers.",
    date: "2023-04-02",
    author: "Maya Rodriguez",
    category: "Product",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80"
  },
  {
    id: 3,
    title: "Enhanced DDoS Protection Now Available",
    excerpt: "We've upgraded our DDoS protection system to handle larger attacks and provide more comprehensive security for all customers.",
    date: "2023-03-18",
    author: "Jamal Thompson",
    category: "Security",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80"
  },
  {
    id: 4,
    title: "UltraVM Launches Expanded API",
    excerpt: "Our new API offers more endpoints and capabilities, making it easier to integrate and automate your server management workflows.",
    date: "2023-03-05",
    author: "Sarah Chen",
    category: "Development",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80"
  },
  {
    id: 5,
    title: "Customer Spotlight: How TechStart Scaled with UltraVM",
    excerpt: "Learn how TechStart, a fast-growing SaaS company, used UltraVM's infrastructure to scale from 100 to 100,000 users without breaking a sweat.",
    date: "2023-02-20",
    author: "Michael Wilson",
    category: "Case Study",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80"
  }
];

const News = () => {
  return (
    <>
      <Navbar />
      <div className="pt-24 pb-16 bg-gradient-to-b from-white to-gray-100 dark:from-ultravm-dark dark:to-black min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">
              Latest News & Updates
            </h1>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
              Stay informed about our newest features, locations, and company announcements
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {newsItems.map((news, index) => (
              <motion.div 
                key={news.id}
                className="bg-white dark:bg-ultravm-dark/30 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={news.image} 
                    alt={news.title} 
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-6 flex-grow">
                  <span className="inline-block px-3 py-1 text-xs font-medium bg-ultravm-primary/10 text-ultravm-primary rounded-full mb-3">
                    {news.category}
                  </span>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {news.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {news.excerpt}
                  </p>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <div className="flex items-center mr-4">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{new Date(news.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      <span>{news.author}</span>
                    </div>
                  </div>
                </div>
                <div className="px-6 pb-6 mt-auto">
                  <Link 
                    to={`/news/${news.id}`} 
                    className="flex items-center text-ultravm-primary hover:text-ultravm-secondary font-medium transition-colors"
                  >
                    <span>Read more</span>
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <button className="bg-ultravm-primary hover:bg-ultravm-secondary text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300">
              Load More Updates
            </button>
          </motion.div>
          
          <motion.div 
            className="mt-20 bg-ultravm-primary/10 rounded-xl p-8 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Get the latest UltraVM news, product updates, and offers delivered right to your inbox.
            </p>
            <div className="max-w-md mx-auto flex gap-2">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-grow px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-ultravm-dark/50 focus:outline-none focus:ring-2 focus:ring-ultravm-primary"
              />
              <button className="bg-ultravm-primary hover:bg-ultravm-secondary text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default News;
