
import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { motion } from "@/components/motion";
import AnimatedText from "./AnimatedText";
import { 
  ArrowRightCircle, 
  BrainCircuit, 
  Bot, 
  Sparkles, 
  Code, 
  BarChart,
  Fingerprint,
  Rocket
} from "lucide-react";

interface InteractiveFeatureGridProps {
  className?: string;
}

const features = [
  {
    title: "Advanced Intelligence",
    description: "Cognitive systems capable of understanding context, intent, and subtle nuances in language.",
    icon: <BrainCircuit className="w-10 h-10 text-[rgba(0,255,200,0.8)]" />,
    color: "rgba(0, 255, 200, 0.2)"
  },
  {
    title: "Autonomous Agents",
    description: "Self-maintaining AI systems that operate independently to solve complex problems in real-time.",
    icon: <Bot className="w-10 h-10 text-[rgba(0,255,200,0.8)]" />,
    color: "rgba(0, 200, 255, 0.2)"
  },
  {
    title: "Generative Models",
    description: "Creating original content across multiple mediums with unprecedented quality and coherence.",
    icon: <Sparkles className="w-10 h-10 text-[rgba(0,255,200,0.8)]" />,
    color: "rgba(150, 255, 200, 0.2)"
  },
  {
    title: "Code Synthesis",
    description: "Turning natural language descriptions into functional, optimized code across multiple languages.",
    icon: <Code className="w-10 h-10 text-[rgba(0,255,200,0.8)]" />,
    color: "rgba(0, 255, 150, 0.2)"
  },
  {
    title: "Predictive Analytics",
    description: "Forecasting trends and outcomes with remarkable accuracy through multi-dimensional data analysis.",
    icon: <BarChart className="w-10 h-10 text-[rgba(0,255,200,0.8)]" />,
    color: "rgba(100, 255, 200, 0.2)"
  },
  {
    title: "Biometric Integration",
    description: "Seamless merging of biological signals with digital interfaces for intuitive human-AI interaction.",
    icon: <Fingerprint className="w-10 h-10 text-[rgba(0,255,200,0.8)]" />,
    color: "rgba(0, 255, 250, 0.2)"
  }
];

const InteractiveFeatureGrid: React.FC<InteractiveFeatureGridProps> = ({
  className,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    const title = titleRef.current;

    if (!section || cards.length === 0 || !title) return;

    // Create a timeline for the section
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 70%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });

    // Animate the title with a slight stagger for each character
    tl.from(title.querySelectorAll("span"), {
      opacity: 0,
      y: 20,
      stagger: 0.02,
      duration: 0.7,
      ease: "power3.out",
    });

    // Animate cards with a stagger and hover effect
    cards.forEach((card, index) => {
      // Initial reveal animation
      tl.from(
        card,
        {
          opacity: 0,
          y: 30,
          scale: 0.95,
          duration: 0.6,
          ease: "power2.out",
        },
        index * 0.1 + 0.4 // stagger each card's animation start time
      );

      // Add hover animation
      card.addEventListener("mouseenter", () => {
        gsap.to(card, {
          y: -10,
          scale: 1.03,
          boxShadow: "0 20px 40px rgba(0, 255, 200, 0.15)",
          borderColor: "rgba(0, 255, 200, 0.5)",
          duration: 0.4,
          ease: "power2.out",
        });
      });

      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          boxShadow: "0 10px 30px rgba(0, 255, 200, 0.1)",
          borderColor: "rgba(0, 255, 200, 0.2)",
          duration: 0.4,
          ease: "power2.out",
        });
      });
    });

    return () => {
      // Clean up animations
      cards.forEach((card) => {
        card.removeEventListener("mouseenter", () => {});
        card.removeEventListener("mouseleave", () => {});
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={cn("py-24 relative overflow-hidden", className)}
    >
      <div className="absolute inset-0 cyber-grid opacity-20"></div>
      
      <div className="container px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-3 py-1 text-sm rounded-full border border-[rgba(0,255,200,0.3)] bg-[rgba(0,255,200,0.05)] mb-6 backdrop-blur-sm">
            Intelligence Modules
          </span>
          <div ref={titleRef} className="text-4xl md:text-5xl font-medium mb-8 text-white">
            <AnimatedText
              text="Next-Gen AI Capabilities"
              className="block glow-text"
              staggerChildren={0.03}
              duration={0.7}
              glowEffect={true}
            />
          </div>
          <p className="text-gray-300">
            Our platform integrates cutting-edge AI technologies to deliver unprecedented capabilities across multiple domains.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={(el) => (cardRefs.current[index] = el)}
              className="relative ai-glass backdrop-blur-lg p-8 rounded-xl border border-[rgba(0,255,200,0.2)] transition-all duration-300 cursor-pointer overflow-hidden group"
            >
              <div 
                className="absolute inset-0 opacity-10 transition-opacity duration-300 group-hover:opacity-20"
                style={{ background: `radial-gradient(circle at center, ${feature.color} 0%, transparent 70%)` }}
              ></div>
              
              <div className="w-16 h-16 rounded-xl bg-[rgba(0,255,200,0.05)] backdrop-blur-sm border border-[rgba(0,255,200,0.2)] flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              
              <h3 className="text-xl font-medium mb-3 text-white">{feature.title}</h3>
              
              <p className="text-gray-300 mb-6">{feature.description}</p>
              
              <div className="flex items-center text-[rgba(0,255,200,0.8)] opacity-0 transform translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                <span className="mr-2">Explore capability</span>
                <ArrowRightCircle className="w-5 h-5" />
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[rgba(0,255,200,0.3)] to-transparent"></div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            <button className="btn-primary inline-flex items-center">
              <span className="mr-2">Deploy AI Solutions</span>
              <Rocket className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveFeatureGrid;
