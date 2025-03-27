
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import AnimatedText from "./AnimatedText";
import ParallaxSection from "./ParallaxSection";

interface ProductShowcaseProps {
  className?: string;
}

const showcaseItems = [
  {
    id: 1,
    title: "Motion Identity",
    description: "Consistent motion language that reinforces your brand values and personality.",
    category: "Branding",
  },
  {
    id: 2,
    title: "Website Animations",
    description: "Subtle interactions and effects that enhance user experience and engagement.",
    category: "Web",
  },
  {
    id: 3,
    title: "3D Visualizations",
    description: "Immersive three-dimensional experiences that showcase products and concepts.",
    category: "3D",
  },
  {
    id: 4,
    title: "Animated Logos",
    description: "Dynamic logo animations that bring your brand to life across all touchpoints.",
    category: "Branding",
  },
];

const ProductShowcase: React.FC<ProductShowcaseProps> = ({ className }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const showcaseRef = useRef<HTMLDivElement>(null);

  const scrollToIndex = (index: number) => {
    if (isScrolling || !showcaseRef.current) return;
    
    setIsScrolling(true);
    setActiveIndex(index);
    
    const item = showcaseRef.current.querySelector(`[data-index="${index}"]`);
    if (item) {
      const container = showcaseRef.current;
      const itemLeft = (item as HTMLElement).offsetLeft;
      const containerWidth = container.offsetWidth;
      const itemWidth = (item as HTMLElement).offsetWidth;
      
      const scrollPosition = itemLeft - (containerWidth / 2) + (itemWidth / 2);
      
      container.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
      
      setTimeout(() => {
        setIsScrolling(false);
      }, 500);
    } else {
      setIsScrolling(false);
    }
  };

  const handleScroll = () => {
    if (isScrolling || !showcaseRef.current) return;
    
    const container = showcaseRef.current;
    const scrollPosition = container.scrollLeft;
    const containerWidth = container.offsetWidth;
    
    // Find which item is closest to the center of the viewport
    let closestIndex = 0;
    let closestDistance = Number.MAX_VALUE;
    
    const items = container.querySelectorAll('[data-index]');
    items.forEach((item, index) => {
      const itemLeft = (item as HTMLElement).offsetLeft;
      const itemWidth = (item as HTMLElement).offsetWidth;
      const itemCenter = itemLeft + (itemWidth / 2);
      const containerCenter = scrollPosition + (containerWidth / 2);
      
      const distance = Math.abs(itemCenter - containerCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });
    
    if (closestIndex !== activeIndex) {
      setActiveIndex(closestIndex);
    }
  };

  useEffect(() => {
    const container = showcaseRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => {
        container.removeEventListener('scroll', handleScroll);
      };
    }
  }, [activeIndex, isScrolling]);

  return (
    <section id="showcase" className={cn("py-24 relative overflow-hidden", className)}>
      <div className="container px-6">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="inline-block px-3 py-1 text-sm rounded-full border border-primary/10 bg-primary/5 mb-6">
            Showcase
          </span>
          <h2 className="mb-6">Premium Motion Graphics</h2>
          <p className="text-muted-foreground">
            Our motion designs combine precision, elegance, and purpose to create experiences that leave a lasting impression.
          </p>
        </div>
        
        <div className="mb-12 flex justify-center">
          <div className="flex items-center space-x-2">
            {showcaseItems.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  index === activeIndex ? "bg-primary w-6" : "bg-primary/20"
                )}
                onClick={() => scrollToIndex(index)}
                aria-label={`View item ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        <div
          ref={showcaseRef}
          className="flex overflow-x-auto pb-8 px-[10%] snap-x snap-mandatory scrollbar-none"
          style={{ scrollbarWidth: 'none' }}
        >
          {showcaseItems.map((item, index) => (
            <div
              key={item.id}
              data-index={index}
              className={cn(
                "flex-shrink-0 w-full sm:w-[90%] md:w-[70%] lg:w-[60%] snap-center p-1",
                "transition-all duration-300",
                index === activeIndex ? "scale-100" : "scale-95 opacity-60"
              )}
            >
              <div 
                className={cn(
                  "rounded-xl overflow-hidden border border-primary/10",
                  "transition-all duration-500",
                  index === activeIndex ? "shadow-lg" : "shadow-md"
                )}
              >
                <div className="aspect-video bg-gradient-to-br from-primary/5 to-primary/10 overflow-hidden">
                  <ParallaxSection
                    speed={0.05}
                    direction="up"
                    className="h-full flex items-center justify-center"
                  >
                    <div className="text-center p-8">
                      <div className="inline-block px-2 py-1 text-xs rounded-full border border-primary/10 bg-primary/5 mb-4">
                        {item.category}
                      </div>
                      <h3 className="mb-3 text-xl md:text-2xl">{item.title}</h3>
                      <p className="text-muted-foreground text-sm md:text-base max-w-lg mx-auto">
                        {item.description}
                      </p>
                    </div>
                  </ParallaxSection>
                </div>
                <div className="p-6 bg-background border-t border-primary/10">
                  <div className="flex items-center justify-between">
                    <div className="text-sm">{item.title}</div>
                    <button className="btn-outline text-sm py-2">View Project</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
