
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import AnimatedText from "./AnimatedText";
import { toast } from "sonner";

interface ContactProps {
  className?: string;
}

const Contact: React.FC<ContactProps> = ({ className }) => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");
    
    // Simulate form submission
    setTimeout(() => {
      if (Math.random() > 0.1) { // 90% success rate
        setFormStatus("success");
        setFormState({ name: "", email: "", message: "" });
        toast.success("Message sent successfully");
      } else {
        setFormStatus("error");
        toast.error("Failed to send message");
      }
    }, 1500);
  };

  return (
    <section id="contact" className={cn("py-24 relative overflow-hidden", className)}>
      <div className="container px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
          <div>
            <span className="inline-block px-3 py-1 text-sm rounded-full border border-primary/10 bg-primary/5 mb-6">
              Contact
            </span>
            <h2 className="mb-6">Get in Touch</h2>
            <p className="text-muted-foreground mb-8">
              Interested in our motion graphics services? Let's discuss how we can bring your vision to life with elegant, purposeful animations.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="mt-1 w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-medium">Phone</h3>
                  <p className="text-muted-foreground">+1 (555) 123-4567</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="mt-1 w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-medium">Email</h3>
                  <p className="text-muted-foreground">hello@motiongraphics.com</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="mt-1 w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-medium">Location</h3>
                  <p className="text-muted-foreground">123 Design Street, Creative City</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="glass p-8 rounded-xl">
            <h3 className="text-2xl font-medium mb-6">Send a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-md border border-primary/10 bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                  placeholder="Your name"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-md border border-primary/10 bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-3 rounded-md border border-primary/10 bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                  placeholder="Tell us about your project..."
                  required
                />
              </div>
              
              <button
                type="submit"
                className={cn(
                  "btn-primary w-full",
                  formStatus === "submitting" && "opacity-70 cursor-not-allowed"
                )}
                disabled={formStatus === "submitting"}
              >
                {formStatus === "submitting" ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
