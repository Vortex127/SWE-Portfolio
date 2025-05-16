
import { skillsData } from "@/lib/data";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const Skills = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const skillBubblesRef = useRef<HTMLDivElement>(null);
  
  // Get unique categories
  const categories = Array.from(new Set(skillsData.map(skill => skill.category)));

  // Group skills by category
  const skillsByCategory = categories.reduce((acc, category) => {
    acc[category] = skillsData.filter(skill => skill.category === category);
    return acc;
  }, {} as Record<string, typeof skillsData>);
  
  useEffect(() => {
    // Skill cloud animation (for desktop only)
    if (window.innerWidth < 768 || !canvasRef.current || !skillBubblesRef.current) return;
    
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return;
    
    const skillBubbles = skillBubblesRef.current;
    const bubbles = Array.from(skillBubbles.children) as HTMLElement[];
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = skillBubbles.clientWidth;
      canvas.height = skillBubbles.clientHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Initialize bubbles with random positions and velocities
    const bubblesData = bubbles.map((bubble) => {
      return {
        element: bubble,
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: bubble.clientWidth / 2
      };
    });
    
    // Animation loop
    let animationFrameId: number;
    const animate = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update bubbles positions
      bubblesData.forEach((bubble) => {
        // Update position
        bubble.x += bubble.vx;
        bubble.y += bubble.vy;
        
        // Boundary check
        if (bubble.x - bubble.radius < 0 || bubble.x + bubble.radius > canvas.width) {
          bubble.vx *= -1;
        }
        if (bubble.y - bubble.radius < 0 || bubble.y + bubble.radius > canvas.height) {
          bubble.vy *= -1;
        }
        
        // Update DOM element position
        bubble.element.style.transform = `translate(${bubble.x - bubble.radius}px, ${bubble.y - bubble.radius}px)`;
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
      
      <div className="container mx-auto px-6 relative z-20">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gradient mb-6">Skills</h2>
          <div className="h-1 w-12 bg-accent rounded-full"></div>
        </div>
        
        {/* Mobile view: categorized grid */}
        <div className="md:hidden">
          {categories.map((category) => (
            <div key={category} className="mb-12">
              <h3 className="text-xl font-display font-semibold text-white mb-4">{category}</h3>
              <div className="flex flex-wrap gap-3">
                {skillsByCategory[category].map((skill, index) => (
                  <div 
                    key={index}
                    className="glass-card px-4 py-2 rounded-lg text-sm"
                  >
                    {skill.name}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* Desktop view: animated skill cloud */}
        <div className="hidden md:block relative h-[500px]">
          <canvas ref={canvasRef} className="absolute inset-0 z-0"></canvas>
          <div ref={skillBubblesRef} className="relative h-full">
            {skillsData.map((skill, index) => (
              <div
                key={index}
                className={cn(
                  "absolute glass-card px-5 py-3 rounded-full cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-accent/10",
                  skill.level > 85 ? "text-lg" : skill.level > 75 ? "text-base" : "text-sm"
                )}
                style={{
                  top: "50%",
                  left: "50%",
                }}
              >
                {skill.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
