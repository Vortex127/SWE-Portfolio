
import { aboutData } from "@/lib/data";
import { useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

const AboutMe = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container || window.innerWidth < 768) return;
    
    const handleWheel = (e: WheelEvent) => {
      if (!e.deltaY) return;
      e.preventDefault();
      container.scrollLeft += e.deltaY + e.deltaX;
    };
    
    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, []);

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gradient mb-6">About Me</h2>
          <div className="h-1 w-12 bg-accent rounded-full"></div>
        </div>
        
        {/* Mobile view: stacked cards */}
        <div className="md:hidden space-y-6">
          {aboutData.map((item, index) => (
            <div 
              key={index} 
              className="glass-card p-8 rounded-lg transform hover:-translate-y-1 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <h3 className="text-xl font-display font-bold text-white mb-4">{item.title}</h3>
              <p className="text-white/70 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
        
        {/* Desktop view: horizontal scroll with ScrollArea */}
        <div className="hidden md:block">
          <div 
            ref={containerRef} 
            className="flex space-x-6 overflow-x-auto pb-8 snap-x snap-mandatory scroll-smooth scrollbar-none"
            style={{ scrollbarWidth: 'none' }}
          >
            {aboutData.map((item, index) => (
              <div 
                key={index} 
                className="glass-card p-8 rounded-lg min-w-[400px] max-w-[400px] flex-shrink-0 h-[300px] snap-center transform hover:-translate-y-2 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <h3 className="text-2xl font-display font-bold text-white mb-4">{item.title}</h3>
                <p className="text-white/70 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Scroll indicator for desktop */}
        <div className="hidden md:flex justify-center mt-8">
          <div className="flex items-center space-x-3 text-white/50 text-sm">
            <div className="w-12 h-[1px] bg-white/30"></div>
            <span>Scroll horizontally ⟷</span>
            <div className="w-12 h-[1px] bg-white/30"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
