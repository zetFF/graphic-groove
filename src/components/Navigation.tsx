
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface NavigationProps {
  className?: string;
}

const Navigation: React.FC<NavigationProps> = ({ className }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isMenuOpen]);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-40 py-6 transition-all duration-300 ease-out-expo",
        isScrolled && "py-4 backdrop-blur-lg bg-background/80 shadow-sm",
        className
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <a href="#" className="text-lg font-bold">
          Motion
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="#showcase" className="nav-link">
            Showcase
          </a>
          <a href="#features" className="nav-link">
            Features
          </a>
          <a href="#about" className="nav-link">
            About
          </a>
          <a href="#contact" className="nav-link">
            Contact
          </a>
          <button className="btn-primary">Get Started</button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <div className="relative w-6 h-5">
            <span
              className={cn(
                "absolute h-[1px] w-full bg-foreground transition-all duration-300 ease-out-expo",
                isMenuOpen
                  ? "top-1/2 -translate-y-1/2 rotate-45"
                  : "top-0"
              )}
            />
            <span
              className={cn(
                "absolute top-1/2 -translate-y-1/2 h-[1px] w-full bg-foreground transition-all duration-300 ease-out-expo",
                isMenuOpen ? "opacity-0" : "opacity-100"
              )}
            />
            <span
              className={cn(
                "absolute h-[1px] w-full bg-foreground transition-all duration-300 ease-out-expo",
                isMenuOpen
                  ? "top-1/2 -translate-y-1/2 -rotate-45"
                  : "bottom-0"
              )}
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-background md:hidden transition-all duration-500 ease-out-expo",
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        <div className="container h-full flex flex-col justify-center items-center text-center space-y-8 px-6">
          <a
            href="#showcase"
            className="text-2xl nav-link"
            onClick={() => setIsMenuOpen(false)}
          >
            Showcase
          </a>
          <a
            href="#features"
            className="text-2xl nav-link"
            onClick={() => setIsMenuOpen(false)}
          >
            Features
          </a>
          <a
            href="#about"
            className="text-2xl nav-link"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </a>
          <a
            href="#contact"
            className="text-2xl nav-link"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </a>
          <button
            className="btn-primary mt-8"
            onClick={() => setIsMenuOpen(false)}
          >
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
