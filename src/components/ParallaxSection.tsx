
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface ParallaxSectionProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  direction?: "up" | "down" | "left" | "right";
  easing?: number;
}

const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  children,
  className,
  speed = 0.1,
  direction = "up",
  easing = 0.1,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsInView(entry.isIntersecting);
      },
      {
        rootMargin: "50px 0px 50px 0px",
        threshold: 0,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !isInView) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Calculate how far the element is from the top of the viewport
      const elementMiddle = rect.top + rect.height / 2;
      const viewportMiddle = windowHeight / 2;
      
      // Calculate the distance from the middle of the viewport as a percentage
      // The range is approximately -1 to 1 (with 0 being exactly in the middle)
      const distanceFromMiddle = (elementMiddle - viewportMiddle) / windowHeight;
      
      // Apply the parallax effect proportional to the distance from the middle
      const newOffset = distanceFromMiddle * 100 * speed;
      
      // Apply easing for smoother transitions
      setOffset((prevOffset) => prevOffset + (newOffset - prevOffset) * easing);
    };

    if (isInView) {
      window.addEventListener("scroll", handleScroll);
      // Initial calculation
      handleScroll();
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [isInView, speed, easing, direction]);

  // Determine the transform based on direction
  const getTransform = () => {
    switch (direction) {
      case "up":
        return `translateY(${-offset}px)`;
      case "down":
        return `translateY(${offset}px)`;
      case "left":
        return `translateX(${-offset}px)`;
      case "right":
        return `translateX(${offset}px)`;
      default:
        return `translateY(${-offset}px)`;
    }
  };

  return (
    <div ref={sectionRef} className={cn("overflow-hidden", className)}>
      <div
        style={{
          transform: getTransform(),
          transition: "transform 0.01s linear",
          willChange: "transform",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default ParallaxSection;
