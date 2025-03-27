import React, { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import HorizontalScrollSection from "@/components/HorizontalScrollSection";
import InteractiveFeatureGrid from "@/components/InteractiveFeatureGrid";
import AIParticlesShowcase from "@/components/AIParticlesShowcase";
import ProductShowcase from "@/components/ProductShowcase";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isContentVisible, setIsContentVisible] = useState(false);

  useEffect(() => {
    // Simulate loading assets
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleLoadingComplete = () => {
    setIsContentVisible(true);
    document.body.style.overflow = "";
  };

  useEffect(() => {
    // Prevent scrolling during loading
    if (isLoading) {
      document.body.style.overflow = "hidden";
    }

    // Initialize scroll reveal
    const revealOnScroll = () => {
      const elements = document.querySelectorAll(".reveal-on-scroll");
      elements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const windowHeight = window.innerHeight;

        // Element is in viewport
        if (elementTop < windowHeight - 100 && elementBottom > 0) {
          element.classList.add("revealed");
        }
      });
    };

    if (isContentVisible) {
      revealOnScroll();
      window.addEventListener("scroll", revealOnScroll);
    }

    return () => {
      window.removeEventListener("scroll", revealOnScroll);
    };
  }, [isLoading, isContentVisible]);

  return (
    <>
      <LoadingScreen
        isLoading={isLoading}
        onLoadingComplete={handleLoadingComplete}
      />

      <div
        className={`min-h-screen flex flex-col transition-opacity duration-700 ease-out-expo ${
          isContentVisible ? "opacity-100" : "opacity-0"
        }`}>
        <Navigation />
        <Hero />

        <HorizontalScrollSection />

        <InteractiveFeatureGrid />

        <AIParticlesShowcase />

        <section id="features" className="py-24 relative overflow-hidden">
          <div className="container px-6">
            <div className="max-w-2xl mx-auto text-center mb-16 reveal-on-scroll">
              <span className="inline-block px-3 py-1 text-sm rounded-full border border-primary/10 bg-primary/5 mb-6">
                Features
              </span>
              <h2 className="mb-6">Exceptional Motion Design</h2>
              <p className="text-muted-foreground">
                Our designs combine technical precision with aesthetic elegance
                to create motion graphics that enhance user experience.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Elegant Animations",
                  description:
                    "Subtle, purposeful animations that enhance user experience without overwhelming the interface.",
                  icon: (
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round">
                      <path d="M5 3v16h16"></path>
                      <path d="M5 19l6-6"></path>
                      <path d="M5 13l6-6"></path>
                      <path d="M11 19l6-6"></path>
                      <path d="M17 19l2-2"></path>
                      <path d="M11 13l2-2"></path>
                    </svg>
                  ),
                },
                {
                  title: "Precise Timing",
                  description:
                    "Meticulously timed animations that create a sense of rhythm and flow throughout the experience.",
                  icon: (
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                  ),
                },
                {
                  title: "Responsive Design",
                  description:
                    "Motion graphics that adapt seamlessly to different screen sizes and device capabilities.",
                  icon: (
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round">
                      <rect
                        x="2"
                        y="3"
                        width="20"
                        height="14"
                        rx="2"
                        ry="2"></rect>
                      <line x1="8" y1="21" x2="16" y2="21"></line>
                      <line x1="12" y1="17" x2="12" y2="21"></line>
                    </svg>
                  ),
                },
                {
                  title: "Performance Optimized",
                  description:
                    "Lightweight animations that maintain smooth performance across all devices.",
                  icon: (
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round">
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                    </svg>
                  ),
                },
                {
                  title: "Brand Consistency",
                  description:
                    "Motion identities that reinforce brand values and create recognition across platforms.",
                  icon: (
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                  ),
                },
                {
                  title: "Accessibility",
                  description:
                    "Thoughtful motion design that respects user preferences for reduced motion when needed.",
                  icon: (
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round">
                      <path d="M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2"></path>
                      <rect
                        x="8"
                        y="2"
                        width="13"
                        height="20"
                        rx="2"
                        ry="2"></rect>
                    </svg>
                  ),
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="glass p-8 rounded-xl reveal-on-scroll"
                  style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-medium mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="about"
          className="py-24 bg-primary/5 relative overflow-hidden">
          <div className="container px-6">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="reveal-on-scroll">
                  <span className="inline-block px-3 py-1 text-sm rounded-full border border-primary/10 bg-white/50 mb-6">
                    About Us
                  </span>
                  <h2 className="mb-6">Crafted with Precision</h2>
                  <p className="text-muted-foreground mb-6">
                    We're a team of motion designers dedicated to creating
                    premium animations that elevate digital experiences. Our
                    approach combines technical expertise with an eye for
                    aesthetics.
                  </p>
                  <p className="text-muted-foreground mb-6">
                    Every animation we create is purposeful, enhancing usability
                    while maintaining visual harmony. We believe in the power of
                    subtle movement to communicate meaning and guide users.
                  </p>
                  <button className="btn-primary">Learn More</button>
                </div>

                <div className="relative perspective reveal-on-scroll">
                  <div className="aspect-square rounded-xl overflow-hidden border border-primary/10 shadow-lg rotate-3 preserve-3d hover:rotate-1 transition-transform duration-700 ease-out-expo">
                    <div className="h-full bg-gradient-to-br from-primary/5 to-primary/10 flex items-center justify-center">
                      <div className="text-center p-8">
                        <div className="w-16 h-16 rounded-full bg-white/20 mx-auto flex items-center justify-center mb-6">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round">
                            <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path>
                            <path d="M22 12A10 10 0 0 0 12 2v10z"></path>
                          </svg>
                        </div>
                        <div className="text-2xl font-medium mb-2">
                          Our Philosophy
                        </div>
                        <p className="text-muted-foreground">
                          "Design is intelligence made visible through motion."
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ProductShowcase />
        <Contact />
        <Footer />
      </div>
    </>
  );
};

export default Index;
