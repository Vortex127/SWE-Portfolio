
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300 px-6 md:px-12",
        isScrolled ? "py-4 glass-panel" : "py-6"
      )}
    >
      <div className="container mx-auto">
        <nav className="flex items-center justify-between">
          <a 
            href="#" 
            className="text-2xl font-display font-bold text-gradient-purple"
            aria-label="Home"
          >
            AP
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-white/80 hover:text-white transition-colors duration-300 relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-accent after:transition-all hover:after:w-full"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white/80 hover:text-white transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            <div className="w-6 flex flex-col gap-1.5 items-end">
              <div 
                className={cn(
                  "h-0.5 bg-current transition-all duration-300", 
                  isMenuOpen ? "w-6 -rotate-45 translate-y-2" : "w-6"
                )}
              />
              <div 
                className={cn(
                  "h-0.5 bg-current transition-all duration-300", 
                  isMenuOpen ? "opacity-0" : "w-4"
                )}
              />
              <div 
                className={cn(
                  "h-0.5 bg-current transition-all duration-300", 
                  isMenuOpen ? "w-6 rotate-45 -translate-y-2" : "w-5"
                )}
              />
            </div>
          </button>

          {/* Mobile Menu */}
          <div
            className={cn(
              "fixed inset-0 bg-background glass-panel z-50 flex flex-col items-center justify-center transition-all duration-500 md:hidden",
              isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            )}
          >
            <div className="flex flex-col items-center space-y-8">
              {menuItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-xl font-medium text-white hover:text-accent transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
