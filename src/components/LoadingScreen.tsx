
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface LoadingScreenProps {
  isLoading: boolean;
  onLoadingComplete: () => void;
  className?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({
  isLoading,
  onLoadingComplete,
  className,
}) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      // Rapidly finish loading when assets are ready
      const interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + (100 - prev) * 0.1;
          return newProgress >= 99.9 ? 100 : newProgress;
        });
      }, 16);

      return () => clearInterval(interval);
    } else {
      // Simulate gradual loading (for visual effect)
      const interval = setInterval(() => {
        setProgress((prev) => {
          const increment = Math.random() * 3;
          const newProgress = prev + increment;
          // Cap at 80% until actually loaded
          return Math.min(newProgress, 80);
        });
      }, 150);

      return () => clearInterval(interval);
    }
  }, [isLoading]);

  useEffect(() => {
    if (progress === 100) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onLoadingComplete, 700); // Match transition duration
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [progress, onLoadingComplete]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex flex-col items-center justify-center bg-background transition-opacity duration-700",
        !isVisible && "opacity-0 pointer-events-none",
        className
      )}
    >
      <div className="flex flex-col items-center">
        <div className="mb-8 text-2xl font-medium">
          <AnimatedLoader />
        </div>
        <div className="w-56 h-[1px] bg-muted overflow-hidden">
          <div
            className="h-full bg-foreground"
            style={{ width: `${progress}%`, transition: "width 0.3s ease-out" }}
          />
        </div>
        <div className="mt-2 text-sm text-muted-foreground font-mono">
          {Math.round(progress)}%
        </div>
      </div>
    </div>
  );
};

const AnimatedLoader = () => {
  const [count, setCount] = useState(0);
  const words = ["Crafting", "Designing", "Loading", "Preparing"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => (prev + 1) % words.length);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-8 overflow-hidden">
      {words.map((word, index) => (
        <div
          key={word}
          className="transition-transform duration-500 ease-out-expo"
          style={{
            transform: `translateY(${(index - count) * 100}%)`,
          }}
        >
          {word}
        </div>
      ))}
    </div>
  );
};

export default LoadingScreen;
