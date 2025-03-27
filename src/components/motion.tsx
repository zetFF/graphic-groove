
import React, { useEffect, useRef, useState } from "react";

// A simplified motion library to avoid installing framer-motion
// This provides basic animation capabilities similar to framer-motion

export const motion = {
  div: ({ children, className, animate, initial, transition, ...props }: any) => {
    const [isAnimated, setIsAnimated] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
      const timer = setTimeout(() => {
        setIsAnimated(true);
      }, 100);
      
      return () => clearTimeout(timer);
    }, []);
    
    const getStyles = () => {
      if (!initial || !animate) return {};
      
      const transitionDuration = transition?.duration || 0.7;
      const transitionDelay = transition?.delay || 0;
      const transitionEase = transition?.ease || "cubic-bezier(0.19, 1, 0.22, 1)";
      
      let styles: React.CSSProperties = {
        transition: `all ${transitionDuration}s ${transitionEase} ${transitionDelay}s`,
      };
      
      if (initial.opacity !== undefined && animate.opacity !== undefined) {
        styles.opacity = isAnimated ? animate.opacity : initial.opacity;
      }
      
      if (initial.y !== undefined && animate.y !== undefined) {
        styles.transform = `translateY(${isAnimated ? animate.y : initial.y}px)`;
      }
      
      if (initial.x !== undefined && animate.x !== undefined) {
        styles.transform = `translateX(${isAnimated ? animate.x : initial.x}px)`;
      }
      
      if (initial.scale !== undefined && animate.scale !== undefined) {
        styles.transform = `scale(${isAnimated ? animate.scale : initial.scale})`;
      }
      
      // Combined transforms
      if (
        (initial.y !== undefined && animate.y !== undefined) &&
        (initial.x !== undefined && animate.x !== undefined)
      ) {
        styles.transform = `translate(${isAnimated ? animate.x : initial.x}px, ${isAnimated ? animate.y : initial.y}px)`;
      }
      
      if (
        (initial.scale !== undefined && animate.scale !== undefined) &&
        (initial.y !== undefined && animate.y !== undefined)
      ) {
        styles.transform = `translateY(${isAnimated ? animate.y : initial.y}px) scale(${isAnimated ? animate.scale : initial.scale})`;
      }
      
      return styles;
    };
    
    return (
      <div
        ref={ref}
        className={className}
        style={getStyles()}
        {...props}
      >
        {children}
      </div>
    );
  },
  
  // Adding support for span elements
  span: ({ children, className, animate, initial, transition, ...props }: any) => {
    const [isAnimated, setIsAnimated] = useState(false);
    const ref = useRef<HTMLSpanElement>(null);
    
    useEffect(() => {
      const timer = setTimeout(() => {
        setIsAnimated(true);
      }, 100);
      
      return () => clearTimeout(timer);
    }, []);
    
    const getStyles = () => {
      if (!initial || !animate) return {};
      
      const transitionDuration = transition?.duration || 0.7;
      const transitionDelay = transition?.delay || 0;
      const transitionEase = transition?.ease || "cubic-bezier(0.19, 1, 0.22, 1)";
      
      let styles: React.CSSProperties = {
        transition: `all ${transitionDuration}s ${transitionEase} ${transitionDelay}s`,
      };
      
      if (initial.opacity !== undefined && animate.opacity !== undefined) {
        styles.opacity = isAnimated ? animate.opacity : initial.opacity;
      }
      
      if (initial.y !== undefined && animate.y !== undefined) {
        styles.transform = `translateY(${isAnimated ? animate.y : initial.y}px)`;
      }
      
      if (initial.x !== undefined && animate.x !== undefined) {
        styles.transform = `translateX(${isAnimated ? animate.x : initial.x}px)`;
      }
      
      if (initial.scale !== undefined && animate.scale !== undefined) {
        styles.transform = `scale(${isAnimated ? animate.scale : initial.scale})`;
      }
      
      return styles;
    };
    
    return (
      <span
        ref={ref}
        className={className}
        style={getStyles()}
        {...props}
      >
        {children}
      </span>
    );
  }
};
