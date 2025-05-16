
import { aboutData } from "@/lib/data";
import { useEffect, useRef } from "react";

const AboutMe = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container || window.innerWidth < 768) return;
    
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      container.scrollLeft += e.deltaY;
    };
    
    container.addEventListener('wheel', handleWheel);
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
              className="glass-card p-8 rounded-lg transform hover:-translate-y-1 transition-all duration-300"
            >
              <h3 className="text-xl font-display font-bold text-white mb-4">{item.title}</h3>
              <p className="text-white/70 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
        
        {/* Desktop view: horizontal scroll */}
        <div 
          ref={containerRef} 
          className="hidden md:flex space-x-6 overflow-x-auto scrollbar-none pb-8 snap-x snap-mandatory scroll-smooth"
        >
          {aboutData.map((item, index) => (
            <div 
              key={index} 
              className="glass-card p-8 rounded-lg min-w-[400px] max-w-[400px] flex-shrink-0 h-[300px] snap-center transform hover:-translate-y-2 transition-all duration-300"
            >
              <h3 className="text-2xl font-display font-bold text-white mb-4">{item.title}</h3>
              <p className="text-white/70 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
        
        {/* Scroll indicator for desktop */}
        <div className="hidden md:block text-center mt-8 text-white/50 text-sm">
          <span>Scroll horizontally ⟷</span>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
