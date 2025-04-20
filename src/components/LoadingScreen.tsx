
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export const LoadingScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gradient-to-br from-ultravm-dark via-ultravm-secondary to-ultravm-primary/30 flex items-center justify-center z-50"
    >
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative"
      >
        <div className="absolute inset-0 bg-ultravm-primary/20 rounded-full blur-xl animate-pulse" />
        <Loader2 className="w-16 h-16 text-ultravm-primary animate-spin" />
      </motion.div>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute mt-24 text-white/80 text-xl font-light"
      >
        Loading your experience...
      </motion.p>
    </motion.div>
  );
};
