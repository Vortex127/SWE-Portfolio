
import { aboutData } from "@/lib/data";
import { motion } from "framer-motion";
import { GraduationCap, Code, Briefcase, Rocket, Lightbulb, Award } from "lucide-react";

// Map icons to different sections
const getIcon = (index: number) => {
  const icons = [
    { icon: <GraduationCap className="w-6 h-6" />, color: "text-blue-400" },
    { icon: <Code className="w-6 h-6" />, color: "text-purple-400" },
    { icon: <Briefcase className="w-6 h-6" />, color: "text-green-400" },
    { icon: <Rocket className="w-6 h-6" />, color: "text-yellow-400" },
    { icon: <Lightbulb className="w-6 h-6" />, color: "text-pink-400" },
    { icon: <Award className="w-6 h-6" />, color: "text-red-400" }
  ];
  return icons[index % icons.length];
};

const AboutMe = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 50 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <section id="about" className="relative py-24 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-accent/5 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFucm9ybT0icm90YXRlKDQ1KSI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjAxKSIvPjxwYXRoIGQ9Ik0gMjAgMCBMIDAgMCBMIDAgMjAiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3BhdHRlcm4pIi8+PC9zdmc+')] opacity-30"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.header 
          className="mb-20 text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-accent/80 mb-4">
            My Journey
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            A timeline of my professional growth and personal development
          </p>
        </motion.header>

        <motion.div 
          className="relative"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Timeline line */}
          <div className="absolute left-1/2 w-0.5 h-full bg-gradient-to-b from-accent/30 to-transparent -translate-x-1/2"></div>
          
          {aboutData.map((item, index) => (
            <motion.div 
              key={index}
              className={`relative mb-16 flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-center`}
              variants={item} // This refers to the animation variant defined above
            >
              {/* Content */}
              <div className={`w-full md:w-5/12 px-4 ${index % 2 === 0 ? 'md:pr-12 text-right' : 'md:pl-12'}`}>
                <motion.div 
                  className={`relative p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.03] backdrop-blur-sm border border-white/10 overflow-hidden group hover:border-accent/30 transition-all duration-500 ${index % 2 === 0 ? 'hover:-translate-x-2' : 'hover:translate-x-2'}`}
                  whileHover={{ 
                    boxShadow: '0 10px 30px -10px rgba(0,0,0,0.2)',
                    y: -5
                  }}
                >
                  {/* Decorative elements */}
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute top-0 right-0 w-20 h-20 -mr-10 -mt-10 bg-accent/10 rounded-full blur-3xl"></div>
                  
                  <div className="relative">
                    <h3 className="text-xl  text-left font-display font-semibold text-white mb-2">{item.title}</h3>
                    <p className="text-white/70 text-left">{item.description}</p>
                  </div>
                </motion.div>
              </div>

              {/* Timeline dot with icon */}
              <div className="hidden md:flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-accent/20 to-accent/10 border border-accent/30 backdrop-blur-sm z-10 relative group">
                <div className="w-16 h-16 rounded-full absolute inset-0 bg-gradient-to-br from-accent/20 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
                <div className={`${getIcon(index).color} relative z-10`}>
                  {getIcon(index).icon}
                </div>
              </div>

              {/* Year or index */}
              <div className={`hidden md:block w-5/12 px-4 ${index % 2 === 0 ? 'text-left' : 'text-right'}`}>
                <span className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium">
                  {index + 1}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutMe;
