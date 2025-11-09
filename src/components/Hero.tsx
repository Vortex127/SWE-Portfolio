
import { personalInfo } from "@/lib/data";
import { useEffect, useRef, useState } from "react";

const Hero = () => {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const roles = ['Software Engineer', 'AI Engineer'];
  const nameRef = useRef<HTMLHeadingElement>(null);
  
  // Typewriter effect for the name
  useEffect(() => {
    const name = nameRef.current;
    if (!name) return;
    
    const nameText = "Mirza Asfandyar Baig";
    name.innerHTML = '';
    
    nameText.split('').forEach((char, i) => {
      const span = document.createElement('span');
      span.textContent = char;
      span.style.opacity = '0';
      span.style.transform = 'translateY(20px)';
      span.style.transition = `opacity 0.5s ease, transform 0.5s ease`;
      span.style.transitionDelay = `${i * 0.05}s`;
      name.appendChild(span);
      
      setTimeout(() => {
        span.style.opacity = '1';
        span.style.transform = 'translateY(0)';
      }, 100);
    });
  }, []);
  
  // Typewriter effect for roles
  useEffect(() => {
    const role = roles[currentRoleIndex];
    const timeout = setTimeout(() => {
      if (isDeleting) {
        setCurrentText(prev => prev.slice(0, -1));
        setTypingSpeed(75);
      } else {
        setCurrentText(role.substring(0, currentText.length + 1));
        setTypingSpeed(150);
      }

      if (!isDeleting && currentText === role) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentRoleIndex]);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden grid-pattern">
      {/* Background gradient */}
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-accent/10 via-transparent to-transparent" />
      
      {/* Animated circles */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-accent/20 rounded-full filter blur-3xl animate-spin-slow opacity-40" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-700/20 rounded-full filter blur-3xl animate-spin-slow opacity-30" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="h-8 mb-6 flex items-center justify-center">
            <p className="text-accent tracking-wider text-sm md:text-base font-medium">
              <span className="mr-3">✦</span> 
              <span className="inline-block min-w-[200px] text-left">
                {currentText}
                <span className="ml-1 inline-block w-1 h-6 bg-accent animate-pulse"></span>
              </span>
            </p>
          </div>
          
          <h1 
            ref={nameRef}
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
      </div>
    </section>
  );
};

export default Hero;
