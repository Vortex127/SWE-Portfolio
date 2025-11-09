"use client"

import { skillsData } from "@/lib/data"
import { useEffect, useRef, useState } from "react"
import { Map } from "lucide-react"

const Skills = () => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)

  // Get unique categories
  const categories = Array.from(new Set(skillsData.map((skill) => skill.category)))

  // Group skills by category
  const skillsByCategory = categories.reduce(
    (acc, category) => {
      acc[category] = skillsData.filter((skill) => skill.category === category)
      return acc
    },
    {} as Record<string, typeof skillsData>,
  )

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    let animationId: number
    let scrollPosition = 0

    const scroll = () => {
      if (!isPaused && scrollContainer) {
        scrollPosition += 1
        if (scrollPosition >= scrollContainer.scrollWidth / 2) {
          scrollPosition = 0
        }
        scrollContainer.scrollLeft = scrollPosition
      }
      animationId = requestAnimationFrame(scroll)
    }

    animationId = requestAnimationFrame(scroll)

    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [isPaused])

  return (
    <section id="skills" className="py-16 md:py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="mb-12 flex items-center gap-3 justify-center">
          <Map className="text-accent h-6 w-6 animate-pulse-slow" />
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gradient mb-0">Skills</h2>
          <div className="h-1 w-12 bg-accent rounded-full ml-2 animate-glow"></div>
        </div>

        {/* Auto-scrolling carousel */}
        <div className="relative">
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-hidden py-8"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            style={{ scrollBehavior: "auto" }}
          >
            {/* Duplicate skills for seamless loop */}
            {[...skillsData, ...skillsData].map((skill, index) => (
              <div
                key={index}
                className="glass-card px-6 py-6 rounded-lg flex-shrink-0 hover:scale-105 transition-transform duration-300 cursor-pointer flex flex-col items-center relative"
                style={{
                  minWidth: "180px",
                }}
              >
                {/* Category badge at top right */}
                <div className="absolute top-0 right-0 px-2 py-1 bg-accent/20 backdrop-blur-sm rounded-full text-xs text-accent/90 border border-accent/30">
                  {skill.category}
                </div>
                
                <div className="w-20 h-20 mb-3 flex items-center justify-center">
                  <img
                    src={skill.image}
                    alt={skill.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="mt-2 w-full h-1 bg-accent/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent rounded-full transition-all duration-500"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills
