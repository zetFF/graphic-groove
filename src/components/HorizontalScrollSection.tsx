import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import AnimatedText from "./AnimatedText";
import { Brain, Cpu, Layers, Network, Radio, Zap } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface HorizontalScrollSectionProps {
  className?: string;
}

const features = [
  {
    icon: <Brain className="w-12 h-12 text-[rgba(0,255,200,0.8)]" />,
    title: "Neural Networks",
    description:
      "Advanced pattern recognition systems modeled after the human brain's neural architecture.",
  },
  {
    icon: <Cpu className="w-12 h-12 text-[rgba(0,255,200,0.8)]" />,
    title: "Quantum Processing",
    description:
      "Next-generation computational power harnessing quantum mechanics principles.",
  },
  {
    icon: <Layers className="w-12 h-12 text-[rgba(0,255,200,0.8)]" />,
    title: "Deep Learning",
    description:
      "Multi-layered networks capable of unsupervised feature extraction and complex reasoning.",
  },
  {
    icon: <Network className="w-12 h-12 text-[rgba(0,255,200,0.8)]" />,
    title: "Distributed Systems",
    description:
      "Interconnected nodes working in parallel to solve complex computational challenges.",
  },
  {
    icon: <Radio className="w-12 h-12 text-[rgba(0,255,200,0.8)]" />,
    title: "Adaptive Algorithms",
    description:
      "Self-modifying code that evolves to optimize performance for specific problems.",
  },
  {
    icon: <Zap className="w-12 h-12 text-[rgba(0,255,200,0.8)]" />,
    title: "Real-time Processing",
    description:
      "Instantaneous data analysis and response mechanisms for time-critical applications.",
  },
];

const HorizontalScrollSection: React.FC<HorizontalScrollSectionProps> = ({
  className,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const trigger = triggerRef.current;
    const horizontal = horizontalRef.current;

    if (!section || !trigger || !horizontal) return;

    let scrollTween = gsap.to(horizontal, {
      x: () => -(horizontal.scrollWidth - window.innerWidth),
      ease: "none",
      scrollTrigger: {
        trigger: trigger,
        start: "top top",
        end: () => `+=${horizontal.scrollWidth - window.innerWidth}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });

    // Add entrance animations for each panel
    const panels = horizontal.querySelectorAll(".panel");
    panels.forEach((panel, i) => {
      gsap.fromTo(
        panel,
        {
          opacity: 0.3,
          scale: 0.8,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          scrollTrigger: {
            trigger: panel,
            containerAnimation: scrollTween,
            start: "left center",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => {
      scrollTween.scrollTrigger?.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className={cn("relative", className)}>
      <div ref={triggerRef} className="h-screen overflow-hidden">
        <div className="absolute top-0 left-0 w-full pt-8 z-10 pointer-events-none">
          <div className="container px-6">
            <div className="max-w-2xl mx-auto text-center">
              <span className="inline-block px-3 py-1 text-sm rounded-full border border-[rgba(0,255,200,0.3)] bg-[rgba(0,255,200,0.05)] mb-6 backdrop-blur-sm pointer-events-auto">
                Technology
              </span>
              <h2 className="mb-6 text-white glow-text">
                <AnimatedText
                  text="AI Technology Stack"
                  className="block"
                  staggerChildren={0.03}
                  delay={0}
                  duration={0.6}
                  animationType="letter"
                  glowEffect={true}
                />
              </h2>
            </div>
          </div>
        </div>

        <div
          ref={horizontalRef}
          className="horizontal-section flex items-center h-screen will-change-transform">
          <div className="flex gap-8 px-24 py-12">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`panel flex-shrink-0 w-[400px] h-[500px] rounded-2xl border border-[rgba(0,255,200,0.2)] bg-black/60 backdrop-blur-xl p-8 flex flex-col ${
                  index % 2 === 0 ? "mt-16" : "mb-16"
                }`}>
                <div className="w-20 h-20 rounded-2xl bg-[rgba(0,255,200,0.05)] backdrop-blur-sm border border-[rgba(0,255,200,0.2)] flex items-center justify-center mb-8">
                  {feature.icon}
                </div>

                <h3 className="text-2xl font-medium mb-4 text-white">
                  {feature.title}
                </h3>

                <p className="text-gray-300 mb-8">{feature.description}</p>

                <div className="mt-auto">
                  <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[rgba(0,255,200,0.3)] to-transparent mb-6"></div>

                  <div className="grid grid-cols-3 gap-2">
                    {[...Array(3)].map((_, dotIndex) => (
                      <div
                        key={dotIndex}
                        className="h-1 rounded-full bg-[rgba(0,255,200,0.3)]"></div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HorizontalScrollSection;
