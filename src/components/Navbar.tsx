
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Menu, 
  X, 
  ChevronDown, 
  Sun, 
  Moon 
} from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  
  return (
    <nav className="bg-white/90 dark:bg-ultravm-dark/90 backdrop-blur-sm fixed top-0 left-0 right-0 z-50 border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-ultravm-primary hover:scale-105 transition-transform">Ultra<span className="text-ultravm-secondary">VM</span></span>
            </Link>
            <div className="hidden md:ml-10 md:flex md:space-x-8">
              <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-ultravm-primary dark:hover:text-ultravm-primary px-3 py-2 text-sm font-medium transition-colors duration-200 hover:scale-105">
                Home
              </Link>
              <Link to="/pricing" className="text-gray-700 dark:text-gray-300 hover:text-ultravm-primary dark:hover:text-ultravm-primary px-3 py-2 text-sm font-medium transition-colors duration-200 hover:scale-105">
                Pricing
              </Link>
              <Link to="/features" className="text-gray-700 dark:text-gray-300 hover:text-ultravm-primary dark:hover:text-ultravm-primary px-3 py-2 text-sm font-medium transition-colors duration-200 hover:scale-105">
                Features
              </Link>
              <Link to="/about" className="text-gray-700 dark:text-gray-300 hover:text-ultravm-primary dark:hover:text-ultravm-primary px-3 py-2 text-sm font-medium transition-colors duration-200 hover:scale-105">
                About Us
              </Link>
              <Link to="/news" className="text-gray-700 dark:text-gray-300 hover:text-ultravm-primary dark:hover:text-ultravm-primary px-3 py-2 text-sm font-medium transition-colors duration-200 hover:scale-105">
                News
              </Link>
              <Link to="/faq" className="text-gray-700 dark:text-gray-300 hover:text-ultravm-primary dark:hover:text-ultravm-primary px-3 py-2 text-sm font-medium transition-colors duration-200 hover:scale-105">
                FAQ
              </Link>
              <Link to="/contact" className="text-gray-700 dark:text-gray-300 hover:text-ultravm-primary dark:hover:text-ultravm-primary px-3 py-2 text-sm font-medium transition-colors duration-200 hover:scale-105">
                Contact
              </Link>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="hover:scale-110 transition-transform"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5 text-ultravm-primary" />
              ) : (
                <Moon className="h-5 w-5 text-ultravm-primary" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
            <Link to="/login">
              <Button 
                variant="outline" 
                className="border-ultravm-primary text-ultravm-primary hover:bg-ultravm-primary/10 transition-all duration-200 hover:scale-105 active:scale-95"
              >
                Log in
              </Button>
            </Link>
            <Link to="/signup">
              <Button 
                className="bg-ultravm-primary hover:bg-ultravm-secondary text-white transition-all duration-200 hover:scale-105 active:scale-95"
              >
                Sign up
              </Button>
            </Link>
          </div>
          <div className="flex items-center md:hidden">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="mr-2"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5 text-ultravm-primary" />
              ) : (
                <Moon className="h-5 w-5 text-ultravm-primary" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-ultravm-primary hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="pt-2 pb-3 space-y-1 px-4 sm:px-6">
          <Link 
            to="/" 
            className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-ultravm-primary dark:hover:text-ultravm-primary hover:translate-x-1 transition-transform"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/pricing" 
            className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-ultravm-primary dark:hover:text-ultravm-primary hover:translate-x-1 transition-transform"
            onClick={() => setIsMenuOpen(false)}
          >
            Pricing
          </Link>
          <Link 
            to="/features" 
            className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-ultravm-primary dark:hover:text-ultravm-primary hover:translate-x-1 transition-transform"
            onClick={() => setIsMenuOpen(false)}
          >
            Features
          </Link>
          <Link 
            to="/about" 
            className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-ultravm-primary dark:hover:text-ultravm-primary hover:translate-x-1 transition-transform"
            onClick={() => setIsMenuOpen(false)}
          >
            About Us
          </Link>
          <Link 
            to="/news" 
            className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-ultravm-primary dark:hover:text-ultravm-primary hover:translate-x-1 transition-transform"
            onClick={() => setIsMenuOpen(false)}
          >
            News
          </Link>
          <Link 
            to="/faq" 
            className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-ultravm-primary dark:hover:text-ultravm-primary hover:translate-x-1 transition-transform"
            onClick={() => setIsMenuOpen(false)}
          >
            FAQ
          </Link>
          <Link 
            to="/contact" 
            className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-ultravm-primary dark:hover:text-ultravm-primary hover:translate-x-1 transition-transform"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </Link>
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700 px-4 sm:px-6">
          <div className="flex items-center space-x-3">
            <Link 
              to="/login" 
              className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-ultravm-primary dark:hover:text-ultravm-primary hover:translate-x-1 transition-transform"
              onClick={() => setIsMenuOpen(false)}
            >
              Log in
            </Link>
            <Link 
              to="/signup" 
              className="block px-3 py-2 font-medium text-white bg-ultravm-primary hover:bg-ultravm-secondary rounded-md transition-colors hover:translate-x-1 transition-transform"
              onClick={() => setIsMenuOpen(false)}
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
