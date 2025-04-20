import { Star } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Sarah Johnson",
    title: "CTO at TechStart",
    content: "We've been using UltraVM for over a year now and the performance has been exceptional. Their servers are reliable and the customer support is top-notch.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    title: "Game Developer",
    content: "As a game developer, I need reliable and fast servers for my game hosting. UltraVM delivers on all fronts with their high-performance servers.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    title: "E-commerce Manager",
    content: "Our online store has seen a significant improvement in load times since switching to UltraVM. The pricing is competitive and the service is excellent.",
    rating: 4,
  },
  {
    name: "David Smith",
    title: "DevOps Engineer",
    content: "The control panel is intuitive and the API makes automation a breeze. Plus, their servers have been rock solid in terms of uptime.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <div className="py-24 bg-gray-50 dark:bg-ultravm-dark/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            What Our Customers Say
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
            Don't just take our word for it. Here's what our customers have to say about UltraVM.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="bg-white dark:bg-ultravm-dark rounded-lg border border-gray-200 dark:border-gray-800 p-6 card-shadow hover:shadow-lg hover:shadow-ultravm-primary/20 transition-all duration-300">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                  {[...Array(5 - testimonial.rating)].map((_, i) => (
                    <Star key={i + testimonial.rating} className="h-4 w-4 text-gray-300 dark:text-gray-600" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  "{testimonial.content}"
                </p>
                <div className="mt-6">
                  <p className="font-medium text-gray-900 dark:text-white">{testimonial.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
