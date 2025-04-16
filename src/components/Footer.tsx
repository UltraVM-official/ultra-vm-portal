
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Github, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-ultravm-dark border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-ultravm-primary">Ultra<span className="text-ultravm-secondary">VM</span></span>
            </Link>
            <p className="mt-4 text-gray-600 dark:text-gray-400 text-sm">
              Providing best quality servers at affordable prices. Your reliable partner for all your hosting needs.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-500 hover:text-ultravm-primary">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-ultravm-primary">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-ultravm-primary">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-ultravm-primary">
                <Github size={20} />
              </a>
            </div>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
              Company
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/about" className="text-gray-600 dark:text-gray-400 hover:text-ultravm-primary dark:hover:text-ultravm-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 dark:text-gray-400 hover:text-ultravm-primary dark:hover:text-ultravm-primary">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-600 dark:text-gray-400 hover:text-ultravm-primary dark:hover:text-ultravm-primary">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-600 dark:text-gray-400 hover:text-ultravm-primary dark:hover:text-ultravm-primary">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
              Services
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/pricing" className="text-gray-600 dark:text-gray-400 hover:text-ultravm-primary dark:hover:text-ultravm-primary">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/features" className="text-gray-600 dark:text-gray-400 hover:text-ultravm-primary dark:hover:text-ultravm-primary">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/documentation" className="text-gray-600 dark:text-gray-400 hover:text-ultravm-primary dark:hover:text-ultravm-primary">
                  Documentation
                </Link>
              </li>
              <li>
                <Link to="/status" className="text-gray-600 dark:text-gray-400 hover:text-ultravm-primary dark:hover:text-ultravm-primary">
                  Status
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
              Legal
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-ultravm-primary dark:hover:text-ultravm-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 dark:text-gray-400 hover:text-ultravm-primary dark:hover:text-ultravm-primary">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/sla" className="text-gray-600 dark:text-gray-400 hover:text-ultravm-primary dark:hover:text-ultravm-primary">
                  SLA
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-gray-600 dark:text-gray-400 hover:text-ultravm-primary dark:hover:text-ultravm-primary">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-8">
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
            &copy; {new Date().getFullYear()} UltraVM. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
