
import React, { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import gsap from "gsap";

interface AIBackgroundProps {
  className?: string;
  density?: number;
  color?: string;
  interactive?: boolean;
}

const AIBackground: React.FC<AIBackgroundProps> = ({
  className,
  density = 15,
  color = "rgba(0, 255, 200, 0.2)",
  interactive = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<{ x: number; y: number; vx: number; vy: number; radius: number; connections: number[] }[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    // Full screen canvas
    const resizeCanvas = () => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      initNodes();
    };
    
    // Initialize nodes
    const initNodes = () => {
      const nodes = [];
      const count = Math.floor((canvas.width * canvas.height) / (10000 / density));
      
      for (let i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.1,
          vy: (Math.random() - 0.5) * 0.1,
          radius: Math.random() * 2 + 0.5,
          connections: []
        });
      }
      
      nodesRef.current = nodes;
    };
    
    // Mouse handlers
    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };
    
    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };
    
    // Animation
    const animate = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw nodes
      const nodes = nodesRef.current;
      const connectionDistance = canvas.width * 0.07;
      const mouseInfluenceRadius = canvas.width * 0.1;
      
      nodes.forEach((node, i) => {
        // Move nodes
        node.x += node.vx;
        node.y += node.vy;
        
        // Boundary check
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
        
        // Mouse influence
        if (mouseRef.current.active) {
          const dx = mouseRef.current.x - node.x;
          const dy = mouseRef.current.y - node.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < mouseInfluenceRadius) {
            const angle = Math.atan2(dy, dx);
            const force = (mouseInfluenceRadius - distance) / mouseInfluenceRadius;
            
            // Push away from mouse
            node.vx -= Math.cos(angle) * force * 0.01;
            node.vy -= Math.sin(angle) * force * 0.01;
          }
        }
        
        // Draw node
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();
        
        // Reset connections
        node.connections = [];
        
        // Find connections
        for (let j = i + 1; j < nodes.length; j++) {
          const otherNode = nodes[j];
          const dx = otherNode.x - node.x;
          const dy = otherNode.y - node.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < connectionDistance) {
            node.connections.push(j);
            
            // Draw connection
            ctx.beginPath();
            ctx.strokeStyle = color;
            ctx.globalAlpha = 1 - (distance / connectionDistance);
            ctx.lineWidth = 0.5;
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(otherNode.x, otherNode.y);
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      });
      
      frameRef.current = requestAnimationFrame(animate);
    };
    
    // Initialize
    window.addEventListener("resize", resizeCanvas);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    
    resizeCanvas();
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(frameRef.current);
    };
  }, [density, color, interactive]);

  return (
    <div ref={containerRef} className={cn("absolute inset-0 overflow-hidden", className)}>
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0"
      />
    </div>
  );
};

export default AIBackground;
