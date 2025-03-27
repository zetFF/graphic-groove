
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import AnimatedText from "./AnimatedText";
import { motion } from "@/components/motion";
import { ArrowRight } from "lucide-react";

interface AIParticlesShowcaseProps {
  className?: string;
}

const AIParticlesShowcase: React.FC<AIParticlesShowcaseProps> = ({
  className,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  
  // Particle system
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    
    const particlesArray: {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
    }[] = [];
    
    const createParticles = () => {
      const particleCount = Math.floor((canvas.width * canvas.height) / 10000);
      for (let i = 0; i < particleCount; i++) {
        const size = Math.random() * 5 + 1;
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const speedX = Math.random() * 1 - 0.5;
        const speedY = Math.random() * 1 - 0.5;
        const opacity = Math.random() * 0.5 + 0.3;
        
        particlesArray.push({
          x,
          y,
          size,
          speedX,
          speedY,
          color: `rgba(0, 255, 200, ${opacity})`
        });
      }
    };
    
    const animateParticles = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particlesArray.length; i++) {
        const particle = particlesArray[i];
        
        // Draw particle
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Boundary check
        if (particle.x > canvas.width || particle.x < 0) {
          particle.speedX = -particle.speedX;
        }
        
        if (particle.y > canvas.height || particle.y < 0) {
          particle.speedY = -particle.speedY;
        }
        
        // Connect particles
        connectParticles(particle, i);
      }
      
      requestAnimationFrame(animateParticles);
    };
    
    const connectParticles = (particle: typeof particlesArray[0], index: number) => {
      if (!ctx) return;
      
      for (let j = index + 1; j < particlesArray.length; j++) {
        const dx = particle.x - particlesArray[j].x;
        const dy = particle.y - particlesArray[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < canvas.width / 15) {
          ctx.strokeStyle = `rgba(0, 255, 200, ${0.1 * (1 - distance / (canvas.width / 15))})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
          ctx.stroke();
        }
      }
    };
    
    const handleResize = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      particlesArray.length = 0;
      createParticles();
    };
    
    window.addEventListener('resize', handleResize);
    createParticles();
    animateParticles();
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // 3D card effect
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = card.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      
      gsap.to(card, {
        rotationY: x * 10,
        rotationX: -y * 10,
        transformPerspective: 1000,
        duration: 0.4,
        ease: "power2.out",
      });
    };
    
    const handleMouseLeave = () => {
      gsap.to(card, {
        rotationY: 0,
        rotationX: 0,
        duration: 0.6,
        ease: "power3.out",
      });
    };
    
    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Entrance animations
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 70%",
        toggleActions: "play none none reverse",
      },
    });
    
    tl.from(section.querySelector('.content-column'), {
      x: -50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    });
    
    tl.from(cardRef.current, {
      x: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    }, "<0.2");
    
    tl.from(section.querySelectorAll('.stat-item'), {
      y: 30,
      opacity: 0,
      stagger: 0.1,
      duration: 0.6,
      ease: "power2.out"
    }, "<0.4");
    
  }, []);

  return (
    <section
      ref={sectionRef}
      className={cn("py-24 relative overflow-hidden", className)}
    >
      <div className="absolute inset-0 bg-black/30"></div>
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full"
      />
      
      <div className="container px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="content-column">
            <span className="inline-block px-3 py-1 text-sm rounded-full border border-[rgba(0,255,200,0.3)] bg-[rgba(0,255,200,0.05)] mb-6 backdrop-blur-sm">
              Core Technology
            </span>
            
            <h2 className="text-4xl md:text-5xl font-medium mb-8">
              <AnimatedText
                text="Quantum Neural Architecture"
                className="block glow-text"
                staggerChildren={0.04}
                duration={0.8}
                glowEffect={true}
              />
            </h2>
            
            <p className="text-gray-300 mb-8">
              Our proprietary neural network combines quantum computing principles with advanced machine learning algorithms, enabling computational capabilities that were previously thought impossible.
            </p>
            
            <div className="grid grid-cols-3 gap-6 mb-8">
              {[
                { value: "99.8%", label: "Accuracy" },
                { value: "0.3ms", label: "Response Time" },
                { value: "10^18", label: "Operations/sec" }
              ].map((stat, index) => (
                <div key={index} className="stat-item text-center">
                  <div className="text-2xl font-medium text-[rgba(0,255,200,0.9)] mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
            
            <button 
              className="btn-primary inline-flex items-center"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <span className="mr-2">Technical Whitepaper</span>
              <motion.div
                animate={{ x: isHovering ? 5 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ArrowRight className="w-4 h-4" />
              </motion.div>
            </button>
          </div>
          
          <div
            ref={cardRef}
            className="preserve-3d backface-hidden rounded-xl p-8 ai-glass ai-border ai-glow min-h-[400px] flex flex-col justify-center items-center text-center"
          >
            <div className="w-20 h-20 rounded-full bg-[rgba(0,255,200,0.1)] border border-[rgba(0,255,200,0.3)] flex items-center justify-center mb-8">
              <svg
                className="w-10 h-10 text-[rgba(0,255,200,0.9)]"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 12H7"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M17 12H22"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 7V2"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 22V17"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            
            <h3 className="text-2xl font-medium mb-4 glow-text">Quantum Core</h3>
            <p className="text-gray-300 mb-6">
              Our proprietary quantum processing unit enables computational speeds 1000x faster than traditional neural networks while using 80% less energy.
            </p>
            
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[rgba(0,255,200,0.3)] to-transparent mb-6"></div>
            
            <div className="grid grid-cols-2 gap-4 w-full">
              <div className="p-3 rounded-lg bg-[rgba(0,255,200,0.05)] border border-[rgba(0,255,200,0.2)]">
                <div className="text-lg font-medium text-[rgba(0,255,200,0.9)]">128</div>
                <div className="text-xs text-gray-400">Quantum Nodes</div>
              </div>
              <div className="p-3 rounded-lg bg-[rgba(0,255,200,0.05)] border border-[rgba(0,255,200,0.2)]">
                <div className="text-lg font-medium text-[rgba(0,255,200,0.9)]">10^12</div>
                <div className="text-xs text-gray-400">Synaptic Links</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIParticlesShowcase;
