
import { personalInfo } from "@/lib/data";
import { useEffect, useRef } from "react";

const Hero = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  
  useEffect(() => {
    const title = titleRef.current;
    if (!title) return;
    
    const letters = title.innerText.split("");
    title.innerHTML = "";
    
    letters.forEach((letter, i) => {
      const span = document.createElement("span");
      span.innerText = letter;
      span.style.opacity = "0";
      span.style.transform = "translateY(20px)";
      span.style.transition = `opacity 0.5s ease, transform 0.5s ease`;
      span.style.transitionDelay = `${i * 0.05}s`;
      title.appendChild(span);
      
      setTimeout(() => {
        span.style.opacity = "1";
        span.style.transform = "translateY(0)";
      }, 100);
    });
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden grid-pattern">
      {/* Background gradient */}
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-accent/10 via-transparent to-transparent" />
      
      {/* Animated circles */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-accent/20 rounded-full filter blur-3xl animate-spin-slow opacity-40" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-700/20 rounded-full filter blur-3xl animate-spin-slow opacity-30" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-accent mb-4 tracking-wider text-sm md:text-base font-medium animate-fade-in">
            <span className="mr-3">✦</span> SOFTWARE ENGINEER
          </p>
          
          <h1 
            ref={titleRef}
            className="text-4xl md:text-6xl lg:text-7xl font-display font-extrabold text-gradient mb-6 leading-tight"
          >
            {personalInfo.name}
          </h1>
          
          <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: "0.5s" }}>
            {personalInfo.description}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.7s" }}>
            <a 
              href="#projects" 
              className="px-8 py-4 bg-accent hover:bg-accent/80 text-white font-medium rounded-full transition-colors duration-300 glass-panel"
            >
              View My Work
            </a>
            <a 
              href="#contact" 
              className="px-8 py-4 border border-white/20 hover:border-white/40 text-white font-medium rounded-full transition-colors duration-300"
            >
              Get In Touch
            </a>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute left-1/2 bottom-12 transform -translate-x-1/2 animate-fade-in" style={{ animationDelay: "1.2s" }}>
          <div className="flex flex-col items-center">
            <span className="text-xs text-white/50 mb-2">Scroll to explore</span>
            <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center">
              <div className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce mt-2"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
