
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutMe from "@/components/AboutMe";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import CustomCursor from "@/components/CustomCursor";

const Index = () => {
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
    
    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-background min-h-screen relative overflow-x-hidden">
      <CustomCursor />
      <Navbar />
      <Hero />
      <AboutMe />
      <Projects />
      <Skills />
      <Contact />
      
      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/10">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/60 text-sm">
              &copy; {new Date().getFullYear()} Alex Parker. All rights reserved.
            </p>
            <p className="text-white/60 text-sm mt-2 md:mt-0">
              Designed & Built with ❤️
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
