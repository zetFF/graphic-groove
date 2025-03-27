
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import AnimatedText from "./AnimatedText";
import { motion } from "@/components/motion";
import gsap from "gsap";
import AIBackground from "./AIBackground";
import { Bot, BrainCircuit, Code, Zap } from "lucide-react";

interface HeroProps {
  className?: string;
}

const Hero: React.FC<HeroProps> = ({ className }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  const glowOrbRef = useRef<HTMLDivElement>(null);
  const consoleLineRef = useRef<HTMLDivElement>(null);
  const consoleRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const [consoleLines, setConsoleLines] = useState<string[]>([]);
  const [isConsoleReady, setIsConsoleReady] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      
      const rect = heroRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      
      setMousePosition({ x, y });
    };

    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (heroElement) {
        heroElement.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  useEffect(() => {
    // Animated glow orb following mouse
    if (glowOrbRef.current) {
      gsap.to(glowOrbRef.current, {
        x: `${(mousePosition.x - 0.5) * 50}px`,
        y: `${(mousePosition.y - 0.5) * 50}px`,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [mousePosition]);

  useEffect(() => {
    // Main animation sequence
    const tl = gsap.timeline();
    timelineRef.current = tl;
    
    // Console animation
    if (consoleRef.current) {
      // Initial console animation
      tl.fromTo(
        consoleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.5 }
      );
      
      // Console blinking cursor
      tl.fromTo(
        consoleLineRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, repeat: -1, yoyo: true },
        "<"
      );
      
      // Start console typing
      tl.call(() => {
        setIsConsoleReady(true);
      }, [], "+=0.5");
    }
    
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, []);

  // Console typing effect
  useEffect(() => {
    if (!isConsoleReady) return;
    
    const messages = [
      "Initializing AI system...",
      "Loading motion graphics...",
      "Calibrating visual components...",
      "Rendering interface...",
      "Computing optimizations...",
      "System ready.",
    ];
    
    let index = 0;
    const interval = setInterval(() => {
      if (index < messages.length) {
        setConsoleLines(prev => [...prev, messages[index]]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 700);
    
    return () => clearInterval(interval);
  }, [isConsoleReady]);

  const calculateTransform = (factor: number) => {
    const xOffset = (mousePosition.x - 0.5) * factor;
    const yOffset = (mousePosition.y - 0.5) * factor;
    return `translate(${xOffset}px, ${yOffset}px)`;
  };

  return (
    <section
      ref={heroRef}
      className={cn(
        "relative min-h-screen flex items-center justify-center overflow-hidden pt-20",
        className
      )}
    >
      {/* AI Background with nodes and connections */}
      <AIBackground 
        density={12} 
        color="rgba(0, 255, 200, 0.15)" 
        className="opacity-80" 
      />
      
      {/* Glow orb */}
      <div 
        ref={glowOrbRef}
        className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-primary/5 to-[rgba(0,255,200,0.1)] blur-[120px] opacity-60 pointer-events-none"
      />

      <div className="container px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className="overflow-hidden mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-block px-3 py-1 text-sm rounded-full border border-[rgba(0,255,200,0.3)] bg-[rgba(0,255,200,0.05)] mb-6 backdrop-blur-sm">
              Advanced Motion Graphics
            </span>
          </motion.div>

          <h1 className="mb-6 leading-tight glow-text">
            <AnimatedText
              text="AI-Powered Motion"
              className="block"
              staggerChildren={0.03}
              delay={500}
              duration={0.6}
              animationType="letter"
              glowEffect={true}
              ai={true}
            />
            <AnimatedText
              text="Visual Excellence"
              className="block"
              staggerChildren={0.03}
              delay={1500}
              duration={0.6}
              animationType="letter"
              glowEffect={true}
              ai={true}
            />
          </h1>

          <motion.div
            className="mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.2 }}
          >
            <p className="text-lg text-muted-foreground">
              Intelligent motion graphics that adapt to your needs, creating immersive experiences with AI-driven animations and seamless interactions.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.5 }}
          >
            <a href="#showcase" className="btn-primary w-full sm:w-auto group overflow-hidden relative">
              <span className="relative z-10 flex items-center justify-center gap-2">
                <span>Explore AI Showcase</span>
                <Zap size={16} className="animate-pulse-subtle" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-[rgba(0,255,200,0.2)] to-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out-expo"></span>
            </a>
            <a href="#contact" className="btn-outline w-full sm:w-auto group overflow-hidden relative border-[rgba(0,255,200,0.3)]">
              <span className="relative z-10">Contact Us</span>
              <span className="absolute inset-0 bg-[rgba(0,255,200,0.05)] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out-expo"></span>
            </a>
          </motion.div>
        </div>

        <motion.div
          className="mt-16 max-w-4xl mx-auto relative perspective"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.8 }}
        >
          {/* AI Console */}
          <div
            ref={consoleRef}
            className="relative rounded-xl overflow-hidden border border-[rgba(0,255,200,0.2)] shadow-lg bg-black/60 backdrop-blur-md"
            style={{
              transform: calculateTransform(-5),
              transition: "transform 0.1s linear",
              boxShadow: "0 0 30px rgba(0, 255, 200, 0.05)",
            }}
          >
            <div className="h-8 border-b border-[rgba(0,255,200,0.2)] flex items-center justify-start px-4 gap-2 bg-black/40">
              <div className="w-3 h-3 rounded-full bg-destructive/80" />
              <div className="w-3 h-3 rounded-full bg-[rgba(0,255,200,0.4)]" />
              <div className="w-3 h-3 rounded-full bg-white/20" />
              <div className="ml-4 text-xs text-[rgba(0,255,200,0.7)] font-mono">
                ai-system.interface
              </div>
            </div>
            
            <div className="relative aspect-video bg-black/80 overflow-hidden p-6">
              <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,255,200,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,200,0.03)_1px,transparent_1px)] bg-[size:20px_20px] opacity-30"></div>
              
              <div className="font-mono text-sm h-full overflow-hidden text-left">
                <div className="flex flex-col gap-2 text-[rgba(0,255,200,0.8)]">
                  <div className="flex items-center gap-2">
                    <BrainCircuit size={16} />
                    <span>AI System v1.0.4</span>
                  </div>
                  
                  {consoleLines.map((line, index) => (
                    <div key={index} className="flex gap-2 items-start">
                      <span className="text-white/60 select-none">{'>'}</span>
                      <AnimatedText
                        text={line}
                        delay={0}
                        staggerChildren={0.02}
                        duration={0.2}
                        animationType="letter"
                        ai={true}
                      />
                    </div>
                  ))}
                  
                  {/* Blinking cursor line */}
                  <div className="flex gap-2 items-start">
                    <span className="text-white/60 select-none">{'>'}</span>
                    <div ref={consoleLineRef} className="w-3 h-4 bg-[rgba(0,255,200,0.8)]"></div>
                  </div>
                </div>
              </div>
              
              {/* AI Interface elements */}
              <div className="absolute bottom-6 right-6 flex gap-3">
                <div className="w-8 h-8 rounded-full bg-[rgba(0,255,200,0.1)] border border-[rgba(0,255,200,0.2)] flex items-center justify-center">
                  <Bot size={14} className="text-[rgba(0,255,200,0.8)]" />
                </div>
                <div className="w-8 h-8 rounded-full bg-[rgba(0,255,200,0.1)] border border-[rgba(0,255,200,0.2)] flex items-center justify-center">
                  <Code size={14} className="text-[rgba(0,255,200,0.8)]" />
                </div>
              </div>
            </div>
            
            <div className="h-8 border-t border-[rgba(0,255,200,0.2)] flex items-center justify-between px-4 gap-2 bg-black/40">
              <div className="text-xs text-[rgba(0,255,200,0.6)] font-mono">
                Status: <span className="text-[rgba(0,255,200,0.8)]">Active</span>
              </div>
              <div className="text-xs text-[rgba(0,255,200,0.6)] font-mono flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[rgba(0,255,200,0.8)] animate-pulse-subtle"></span>
                System ready
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
