
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import gsap from "gsap";

interface AnimatedTextProps {
  text: string;
  className?: string;
  once?: boolean;
  delay?: number;
  duration?: number;
  staggerChildren?: number;
  animationType?: "letter" | "word";
  onAnimationComplete?: () => void;
  glowEffect?: boolean;
  ai?: boolean;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className,
  once = true,
  delay = 0,
  duration = 0.5,
  staggerChildren = 0.03,
  animationType = "letter",
  onAnimationComplete,
  glowEffect = false,
  ai = false,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (textRef.current) {
      observer.observe(textRef.current);
    }

    return () => {
      if (textRef.current) {
        observer.unobserve(textRef.current);
      }
    };
  }, [once]);

  useEffect(() => {
    if (isVisible && elementsRef.current.length > 0) {
      // Kill any existing animations
      gsap.killTweensOf(elementsRef.current);
      
      // Create GSAP timeline
      const tl = gsap.timeline({
        delay: delay / 1000,
        onComplete: onAnimationComplete,
      });
      
      // AI typing effect
      if (ai) {
        elementsRef.current.forEach((el) => {
          if (el) el.style.opacity = "0";
        });
        
        tl.to(elementsRef.current, {
          opacity: 1,
          duration: 0.01,
          stagger: staggerChildren,
          ease: "none",
        });
        
        if (glowEffect) {
          tl.to(elementsRef.current, {
            textShadow: "0 0 8px rgba(255,255,255,0.8), 0 0 12px rgba(0,255,200,0.4)",
            duration: 0.2,
            stagger: staggerChildren,
            ease: "power1.out",
          }, "<0.02");
          
          tl.to(elementsRef.current, {
            textShadow: "0 0 0px rgba(255,255,255,0)",
            duration: 0.3,
            stagger: staggerChildren,
            ease: "power2.out",
          }, ">0.1");
        }
      } 
      // Standard animation
      else {
        tl.fromTo(
          elementsRef.current,
          { 
            opacity: 0,
            y: 10,
          },
          {
            opacity: 1,
            y: 0,
            duration: duration,
            stagger: staggerChildren,
            ease: "power2.out",
          }
        );
        
        if (glowEffect) {
          tl.to(elementsRef.current, {
            textShadow: "0 0 8px rgba(255,255,255,0.8)",
            duration: 0.5,
            stagger: staggerChildren / 2,
            ease: "power1.out",
          }, "<0.2");
          
          tl.to(elementsRef.current, {
            textShadow: "0 0 0px rgba(255,255,255,0)",
            duration: 0.8,
            stagger: staggerChildren / 2,
            ease: "power2.out",
          }, ">0.1");
        }
      }
    }
  }, [isVisible, delay, duration, staggerChildren, onAnimationComplete, glowEffect, ai]);

  const renderContent = () => {
    if (animationType === "letter") {
      return text.split("").map((char, index) => (
        <span
          key={`${char}-${index}`}
          ref={(el) => (elementsRef.current[index] = el)}
          className={cn(
            "inline-block",
            ai && "opacity-0"
          )}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ));
    } else {
      return text.split(" ").map((word, index, array) => (
        <span key={`${word}-${index}`} className="inline-block">
          <span
            ref={(el) => (elementsRef.current[index] = el)}
            className={cn(
              "inline-block",
              ai && "opacity-0"
            )}
          >
            {word}
          </span>
          {index !== array.length - 1 && "\u00A0"}
        </span>
      ));
    }
  };

  return (
    <div ref={textRef} className={cn("overflow-hidden", className)}>
      {renderContent()}
    </div>
  );
};

export default AnimatedText;
