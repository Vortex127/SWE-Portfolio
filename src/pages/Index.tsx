
import { useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutMe from "@/components/AboutMe";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import CustomCursor from "@/components/CustomCursor";

const Index = () => {
  const starsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Update page title
    document.title = "Alex Parker | Software Engineer";
    
    // Fade in sections on scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );
    
    document.querySelectorAll("section:not(:first-child)").forEach((section) => {
      section.classList.add("opacity-0");
      observer.observe(section);
    });
    
    // Parallax stars effect
    const handleMouseMove = (e: MouseEvent) => {
      if (!starsRef.current) return;
      
      const stars = starsRef.current.querySelectorAll('.star');
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      
      stars.forEach((star, index) => {
        const speed = 1 + index % 3 * 0.5;
        const offsetX = (x - 0.5) * speed * 20;
        const offsetY = (y - 0.5) * speed * 20;
        (star as HTMLElement).style.transform = `translate(${offsetX}px, ${offsetY}px)`;
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="bg-background min-h-screen relative overflow-x-hidden">
      <CustomCursor />
      
      {/* Animated background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Stars background */}
        <div ref={starsRef} className="absolute inset-0">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="star absolute rounded-full bg-white"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.max(1, Math.random() * 3)}px`,
                height: `${Math.max(1, Math.random() * 3)}px`,
                opacity: Math.random() * 0.7,
                animation: `pulse ${2 + Math.random() * 3}s infinite ease-in-out alternate`
              }}
            />
          ))}
        </div>
        
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl animate-float opacity-30"></div>
        <div className="absolute bottom-1/3 -right-32 w-80 h-80 bg-blue-500/20 rounded-full filter blur-3xl animate-float opacity-30" 
             style={{ animationDelay: "2s" }}></div>
        <div className="absolute top-2/3 left-1/4 w-64 h-64 bg-accent/20 rounded-full filter blur-3xl animate-spin-slow opacity-20"></div>
        
        {/* Grid overlay */}
        <div className="absolute inset-0 grid-pattern opacity-20"></div>
      </div>
      
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <AboutMe />
        <Projects />
        <Skills />
        <Contact />
        
        {/* Footer */}
        <footer className="py-8 px-6 border-t border-white/10 relative z-10 backdrop-blur-sm">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-white/60 text-sm animate-pulse-slow">
                &copy; {new Date().getFullYear()} Alex Parker. All rights reserved.
              </p>
              <p className="text-white/60 text-sm mt-2 md:mt-0">
                Designed & Built with <span className="text-red-400 animate-pulse">❤️</span>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
