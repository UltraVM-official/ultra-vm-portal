
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useState, useEffect } from "react";

export const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(oldProgress => {
        if (oldProgress === 100) return 100;
        return Math.min(oldProgress + 10, 100);
      });
    }, 500);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gradient-to-br from-ultravm-dark via-ultravm-secondary to-ultravm-primary/30 flex items-center justify-center z-50"
    >
      <div className="w-full max-w-md px-8">
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
          className="relative mb-8"
        >
          <div className="absolute inset-0 bg-ultravm-primary/20 rounded-full blur-xl animate-pulse" />
          <Loader2 className="w-16 h-16 text-ultravm-primary animate-spin mx-auto" />
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <Progress value={progress} className="h-2 bg-white/10" />
          <p className="text-white/80 text-xl font-light text-center">
            Loading your experience... {progress}%
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};
