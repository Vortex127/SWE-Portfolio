
import { skillsData } from "@/lib/data";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Map } from "lucide-react";

const Skills = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Get unique categories
  const categories = Array.from(new Set(skillsData.map(skill => skill.category)));

  // Group skills by category
  const skillsByCategory = categories.reduce((acc, category) => {
    acc[category] = skillsData.filter(skill => skill.category === category);
    return acc;
  }, {} as Record<string, typeof skillsData>);
  
  useEffect(() => {
    // Skills visualization for desktop only
    if (window.innerWidth < 768 || !canvasRef.current || !containerRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const container = containerRef.current;
    
    // Set canvas dimensions
    const setCanvasSize = () => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    };
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    
    // Get all skill nodes
    const skillNodes = Array.from(container.querySelectorAll('.skill-node')) as HTMLElement[];
    
    // Initialize nodes with positions
    const nodes = skillNodes.map(node => {
      const rect = node.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      
      return {
        element: node,
        x: rect.left - containerRect.left + rect.width / 2,
        y: rect.top - containerRect.top + rect.height / 2,
        category: node.dataset.category || '',
        level: parseInt(node.dataset.level || '0', 10)
      };
    });
    
    // Draw connections between nodes of the same category
    const drawConnections = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Group nodes by category
      const nodesByCategory = nodes.reduce((acc, node) => {
        if (!acc[node.category]) {
          acc[node.category] = [];
        }
        acc[node.category].push(node);
        return acc;
      }, {} as Record<string, typeof nodes>);
      
      // Draw connections for each category
      Object.keys(nodesByCategory).forEach((category, categoryIndex) => {
        const categoryNodes = nodesByCategory[category];
        const categoryColor = getCategoryColor(category, categoryIndex);
        
        // Draw connections to center node (hub and spoke)
        if (categoryNodes.length > 0) {
          // Find the "center" node (highest level)
          const centerNode = categoryNodes.reduce((prev, curr) => 
            (prev.level > curr.level) ? prev : curr
          );
          
          // Draw lines from center to all other nodes in the category
          categoryNodes.forEach(node => {
            if (node !== centerNode) {
              ctx.beginPath();
              ctx.moveTo(centerNode.x, centerNode.y);
              ctx.lineTo(node.x, node.y);
              ctx.strokeStyle = `${categoryColor}60`; // Semi-transparent
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          });
        }
      });
    };
    
    // Get pseudo-random but consistent color based on category
    const getCategoryColor = (category: string, index: number) => {
      const colors = [
        '#8B5CF6', // Purple
        '#0EA5E9', // Blue
        '#10B981', // Green
        '#F97316', // Orange
        '#EC4899', // Pink
        '#6366F1'  // Indigo
      ];
      
      return colors[index % colors.length];
    };
    
    // Draw connections initially
    setTimeout(drawConnections, 500); // Allow time for nodes to position
    
    // Update connections when window is resized
    const handleResize = () => {
      // Update node positions
      skillNodes.forEach((node, index) => {
        const rect = node.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        
        nodes[index].x = rect.left - containerRect.left + rect.width / 2;
        nodes[index].y = rect.top - containerRect.top + rect.height / 2;
      });
      
      drawConnections();
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', setCanvasSize);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
      
      <div className="container mx-auto px-6 relative z-20">
        <div className="mb-16 flex items-center gap-3">
          <Map className="text-accent h-6 w-6" />
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gradient mb-0">Skills Map</h2>
          <div className="h-1 w-12 bg-accent rounded-full ml-2"></div>
        </div>
        
        {/* Mobile view: categorized grid */}
        <div className="md:hidden">
          {categories.map((category, catIndex) => (
            <div key={category} className="mb-12">
              <div className="flex items-center gap-2 mb-4">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ 
                    background: `rgb(${139 + catIndex * 20}, ${92 - catIndex * 10}, ${246 - catIndex * 15})` 
                  }}
                ></div>
                <h3 className="text-xl font-display font-semibold text-white">{category}</h3>
              </div>
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
        
        {/* Desktop view: skill map visualization */}
        <div className="hidden md:block relative h-[600px]">
          <canvas ref={canvasRef} className="absolute inset-0 z-0"></canvas>
          <div 
            ref={containerRef} 
            className="relative h-full"
          >
            {categories.map((category, catIndex) => (
              <div key={category} className="absolute" style={{ 
                top: `${120 + (catIndex * 80)}px`, 
                left: '10%',
                transform: 'translateX(-50%)'
              }}>
                <div className="flex items-center gap-2 mb-6">
                  <div 
                    className="w-4 h-4 rounded-full animate-pulse" 
                    style={{ 
                      background: `rgb(${139 + catIndex * 20}, ${92 - catIndex * 10}, ${246 - catIndex * 15})` 
                    }}
                  ></div>
                  <h3 className="text-xl font-display font-semibold text-white">{category}</h3>
                </div>
                
                <div className="flex flex-col gap-4">
                  {skillsByCategory[category].map((skill, skillIndex) => (
                    <div 
                      key={`${category}-${skill.name}`}
                      data-category={category}
                      data-level={skill.level}
                      className="skill-node absolute glass-card px-4 py-2 rounded-lg cursor-pointer transition-all duration-500 hover:scale-110 hover:shadow-lg hover:shadow-accent/10"
                      style={{
                        top: `${(skillIndex % 3) * 40 - 20}px`, 
                        left: `${150 + (skillIndex * (90 + skill.level / 2))}px`,
                        opacity: 0.8 + (skill.level / 100) * 0.2,
                        zIndex: Math.floor(skill.level / 10), 
                        fontSize: `${0.85 + (skill.level / 100) * 0.3}rem`,
                        fontWeight: skill.level > 80 ? 600 : 400,
                      }}
                    >
                      {skill.name}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          {/* Central hub */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-accent/20 backdrop-blur-lg border border-accent/30 flex items-center justify-center animate-pulse-slow z-20">
            <div className="text-center">
              <div className="font-bold text-gradient-purple">Core</div>
              <div className="text-xs text-white/70">Skills</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
