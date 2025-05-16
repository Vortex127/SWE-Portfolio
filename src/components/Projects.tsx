
import { projectsData } from "@/lib/data";
import { useState, useRef } from "react";
import { cn } from "@/lib/utils";

const Projects = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? projectsData.length - 1 : prev - 1));
    scrollToProject();
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === projectsData.length - 1 ? 0 : prev + 1));
    scrollToProject();
  };

  const scrollToProject = () => {
    if (sliderRef.current) {
      const containerWidth = sliderRef.current.clientWidth;
      sliderRef.current.scrollTo({
        left: activeIndex * containerWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gradient mb-6">Projects</h2>
          <div className="h-1 w-12 bg-accent rounded-full"></div>
        </div>

        {/* Mobile view: stacked cards */}
        <div className="md:hidden space-y-12">
          {projectsData.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>

        {/* Desktop view: slider */}
        <div className="hidden md:block relative">
          <div 
            ref={sliderRef}
            className="flex snap-x snap-mandatory overflow-hidden"
          >
            {projectsData.map((project, index) => (
              <div 
                key={index}
                className="min-w-full w-full flex-shrink-0 flex justify-center items-center snap-center"
              >
                <div className="max-w-4xl w-full">
                  <ProjectCard project={project} />
                </div>
              </div>
            ))}
          </div>
          
          {/* Navigation dots */}
          <div className="flex justify-center mt-12 space-x-2">
            {projectsData.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "w-3 h-3 rounded-full transition-all duration-300",
                  activeIndex === index ? "bg-accent" : "bg-white/20"
                )}
                onClick={() => setActiveIndex(index)}
                aria-label={`Go to project ${index + 1}`}
              />
            ))}
          </div>
          
          {/* Navigation arrows */}
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2 flex justify-between w-full px-4 pointer-events-none">
            <button
              onClick={handlePrev}
              className="w-12 h-12 rounded-full bg-black/30 backdrop-blur-md text-white flex items-center justify-center pointer-events-auto hover:bg-black/50 transition-colors"
              aria-label="Previous project"
            >
              ←
            </button>
            <button
              onClick={handleNext}
              className="w-12 h-12 rounded-full bg-black/30 backdrop-blur-md text-white flex items-center justify-center pointer-events-auto hover:bg-black/50 transition-colors"
              aria-label="Next project"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

interface ProjectCardProps {
  project: typeof projectsData[0];
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <div className="glass-card rounded-xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-accent/10">
      <div className="relative h-64 overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/0 z-10"
        />
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
        />
      </div>
      
      <div className="p-8">
        <h3 className="text-2xl font-display font-bold text-white mb-2">{project.title}</h3>
        <p className="text-white/70 mb-6">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-8">
          {project.technologies.map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1 text-xs rounded-full bg-white/10 text-white/80"
            >
              {tech}
            </span>
          ))}
        </div>
        
        <div className="flex gap-4">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 border border-white/20 rounded-full text-sm hover:bg-white/10 transition-colors duration-300"
          >
            GitHub
          </a>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 bg-accent hover:bg-accent/80 rounded-full text-sm transition-colors duration-300"
          >
            Live Demo
          </a>
        </div>
      </div>
    </div>
  );
};

export default Projects;
