"use client"

import type React from "react"
import { projectsData } from "@/lib/data"
import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { Filter, ExternalLink, Github, ChevronRight, X, Search, ArrowUpDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// Color schemes for project cards
const colorSchemes = [
  { accent: "#FF5E5B", gradient: "from-[#FF5E5B]/20 to-[#FF5E5B]/5" },
  { accent: "#39A0ED", gradient: "from-[#39A0ED]/20 to-[#39A0ED]/5" },
  { accent: "#4ECB71", gradient: "from-[#4ECB71]/20 to-[#4ECB71]/5" },
  { accent: "#FFC145", gradient: "from-[#FFC145]/20 to-[#FFC145]/5" },
  { accent: "#B967FF", gradient: "from-[#B967FF]/20 to-[#B967FF]/5" },
  { accent: "#FF6B6B", gradient: "from-[#FF6B6B]/20 to-[#FF6B6B]/5" },
  { accent: "#00C2A8", gradient: "from-[#00C2A8]/20 to-[#00C2A8]/5" },
  { accent: "#E17A47", gradient: "from-[#E17A47]/20 to-[#E17A47]/5" },
]

// Sort options
const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "nameAsc", label: "Name (A-Z)" },
  { value: "nameDesc", label: "Name (Z-A)" },
]

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState<string>("All")
  const [selectedProject, setSelectedProject] = useState<(typeof projectsData)[0] | null>(null)
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [sortBy, setSortBy] = useState<string>("newest")
  const [showSortOptions, setShowSortOptions] = useState<boolean>(false)
  const [isGridView, setIsGridView] = useState<boolean>(true)
  const [visibleProjects, setVisibleProjects] = useState<typeof projectsData>([])
  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true)

  const sortRef = useRef<HTMLDivElement>(null)

  // Get unique technologies across all projects
  const allTechnologies = [
    "All",
    ...Array.from(new Set(projectsData.flatMap((project) => project.technologies))),
  ].slice(0, 8) // Limit to 8 filters to avoid overcrowding

  // Handle outside click for sort dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setShowSortOptions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Filter and sort projects
  useEffect(() => {
    // First filter by technology
    let filtered =
      activeFilter === "All"
        ? projectsData
        : projectsData.filter((project) => project.technologies.includes(activeFilter))

    // Then filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (project) =>
          project.title.toLowerCase().includes(query) ||
          project.description.toLowerCase().includes(query) ||
          project.technologies.some((tech) => tech.toLowerCase().includes(query)),
      )
    }

    // Then sort
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return (b.date?.getTime() || 0) - (a.date?.getTime() || 0)
        case "oldest":
          return (a.date?.getTime() || 0) - (b.date?.getTime() || 0)
        case "nameAsc":
          return a.title.localeCompare(b.title)
        case "nameDesc":
          return b.title.localeCompare(a.title)
        default:
          return 0
      }
    })

    // Set visible projects with a slight delay for animation
    setTimeout(
      () => {
        setVisibleProjects(sorted)
        if (isInitialLoad) setIsInitialLoad(false)
      },
      isInitialLoad ? 300 : 0,
    )
  }, [activeFilter, searchQuery, sortBy, isInitialLoad])

  // Get current sort option label
  const currentSortLabel = sortOptions.find((option) => option.value === sortBy)?.label || "Sort"

  return (
    <section id="projects" className="py-12 md:py-16 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 md:mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gradient mb-3">Projects</h2>
            <div className="h-1 w-12 bg-accent rounded-full"></div>
          </div>

          {/* View toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsGridView(true)}
              className={cn(
                "p-2 rounded-md transition-all duration-300",
                isGridView ? "bg-accent text-white" : "bg-white/10 text-white/70 hover:bg-white/20",
              )}
              aria-label="Grid view"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="3" width="7" height="7" rx="1" fill="currentColor" />
                <rect x="14" y="3" width="7" height="7" rx="1" fill="currentColor" />
                <rect x="3" y="14" width="7" height="7" rx="1" fill="currentColor" />
                <rect x="14" y="14" width="7" height="7" rx="1" fill="currentColor" />
              </svg>
            </button>
            <button
              onClick={() => setIsGridView(false)}
              className={cn(
                "p-2 rounded-md transition-all duration-300",
                !isGridView ? "bg-accent text-white" : "bg-white/10 text-white/70 hover:bg-white/20",
              )}
              aria-label="List view"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="4" width="18" height="2" rx="1" fill="currentColor" />
                <rect x="3" y="11" width="18" height="2" rx="1" fill="currentColor" />
                <rect x="3" y="18" width="18" height="2" rx="1" fill="currentColor" />
              </svg>
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between"
        >
          {/* Filter tabs */}
          <div className="flex items-center">
            <Filter className="w-4 h-4 mr-2 text-white/70" />
            <div className="flex flex-wrap gap-2">
              {allTechnologies.map((tech, index) => (
                <motion.button
                  key={tech}
                  onClick={() => setActiveFilter(tech)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    "px-3 py-1 text-sm rounded-full transition-all duration-300",
                    activeFilter === tech ? "bg-accent text-white" : "bg-white/10 text-white/70 hover:bg-white/20",
                  )}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                >
                  {tech}
                </motion.button>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            {/* Search input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 bg-white/10 border border-white/10 rounded-lg text-white/90 placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-accent/50 w-full sm:w-60 transition-all duration-300"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/80"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Sort dropdown */}
            <div className="relative" ref={sortRef}>
              <button
                onClick={() => setShowSortOptions(!showSortOptions)}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/10 rounded-lg text-white/90 hover:bg-white/15 transition-all duration-300 w-full sm:w-auto justify-between"
              >
                <span className="flex items-center gap-2">
                  <ArrowUpDown className="w-4 h-4 text-white/50" />
                  <span>{currentSortLabel}</span>
                </span>
                <ChevronRight
                  className={cn("w-4 h-4 transition-transform duration-300", showSortOptions ? "rotate-90" : "")}
                />
              </button>

              <AnimatePresence>
                {showSortOptions && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 bg-black/90 border border-white/10 rounded-lg shadow-xl z-10 overflow-hidden"
                  >
                    {sortOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setSortBy(option.value)
                          setShowSortOptions(false)
                        }}
                        className={cn(
                          "w-full text-left px-4 py-2 hover:bg-white/10 transition-colors duration-200",
                          sortBy === option.value ? "text-accent" : "text-white/80",
                        )}
                      >
                        {option.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Projects grid/list */}
        <div
          className={cn(
            "transition-all duration-500",
            isGridView ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6" : "flex flex-col gap-4",
          )}
        >
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project, index) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{
                  duration: 0.4,
                  delay: isInitialLoad ? index * 0.1 : 0,
                  ease: "easeOut",
                }}
              >
                <ProjectCard
                  project={project}
                  onClick={() => setSelectedProject(project)}
                  colorScheme={colorSchemes[index % colorSchemes.length]}
                  isListView={!isGridView}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty state when no projects match filter */}
        {visibleProjects.length === 0 && !isInitialLoad && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <div className="text-white/50 mb-4 text-6xl">¯\_(ツ)_/¯</div>
            <h3 className="text-xl font-medium text-white mb-2">No projects found</h3>
            <p className="text-white/70 mb-6">
              {searchQuery ? "No projects match your search query." : "No projects match the selected filter."}
            </p>
            <button
              onClick={() => {
                setActiveFilter("All")
                setSearchQuery("")
              }}
              className="px-4 py-2 bg-accent rounded-full text-sm hover:bg-accent/80 transition-colors"
            >
              Show all projects
            </button>
          </motion.div>
        )}

        {/* Project detail modal */}
        <AnimatePresence>
          {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
        </AnimatePresence>
      </div>
    </section>
  )
}

interface ProjectCardProps {
  project: (typeof projectsData)[0]
  onClick: () => void
  colorScheme: { accent: string; gradient: string }
  isListView: boolean
}

const ProjectCard = ({ project, onClick, colorScheme, isListView }: ProjectCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "group relative backdrop-blur-sm rounded-xl overflow-hidden transition-all duration-500 cursor-pointer",
        isListView ? "h-[180px]" : "h-[280px]",
      )}
      onClick={onClick}
      style={{
        background: `linear-gradient(to bottom, ${colorScheme.accent}10, ${colorScheme.accent}05)`,
        boxShadow: `0 4px 20px ${colorScheme.accent}10`,
      }}
    >
      {/* Project image with overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 z-10 opacity-70 group-hover:opacity-90 transition-opacity duration-500"
          style={{
            background: `linear-gradient(to top, ${colorScheme.accent}CC, ${colorScheme.accent}66, ${colorScheme.accent}33)`,
          }}
        />
        <img
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-700"
        />
      </div>

      {/* Content */}
      <div
        className={cn(
          "relative z-10 h-full flex transition-all duration-300",
          isListView ? "flex-row items-center p-5" : "flex-col justify-end p-4",
        )}
      >
        {isListView && (
          <div className="mr-4 flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 border-white/20">
            <img
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              className="w-full h-full object-cover object-center"
            />
          </div>
        )}

        <div className={cn("flex flex-col", isListView ? "flex-1" : "h-full")}>
          <div
            className={cn(
              "transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300",
              isListView ? "mb-2" : "mb-auto",
            )}
          >
            <div className="flex flex-wrap gap-2 mb-2">
              {project.technologies.slice(0, isListView ? 2 : 3).map((tech, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-xs rounded-full bg-white/10 text-white/90"
                  style={{ backgroundColor: `${colorScheme.accent}33` }}
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > (isListView ? 2 : 3) && (
                <span
                  className="px-2 py-1 text-xs rounded-full text-white/90"
                  style={{ backgroundColor: `${colorScheme.accent}33` }}
                >
                  +{project.technologies.length - (isListView ? 2 : 3)}
                </span>
              )}
            </div>
          </div>

          <h3
            className={cn(
              "font-display font-bold text-white mb-2 transition-colors duration-300",
              isListView ? "text-lg" : "text-xl",
            )}
            style={{ color: "white" }}
          >
            {project.title}
          </h3>

          <p
            className={cn(
              "text-white/80 text-sm mb-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300",
              isListView ? "line-clamp-1" : "line-clamp-2",
            )}
          >
            {project.description}
          </p>

          <div
            className={cn(
              "flex items-center justify-between transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300",
              isListView && "mt-auto",
            )}
          >
            <div className="flex gap-3">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-white/20 transition-colors"
                onClick={(e) => e.stopPropagation()}
                style={{ backgroundColor: `${colorScheme.accent}22` }}
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-white/20 transition-colors"
                onClick={(e) => e.stopPropagation()}
                style={{ backgroundColor: `${colorScheme.accent}22` }}
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            <span className="text-xs text-white/70 flex items-center">
              View details <ChevronRight className="w-3 h-3 ml-1" />
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

interface ProjectModalProps {
  project: (typeof projectsData)[0]
  onClose: () => void
}

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  // Close modal when clicking outside
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}
        className="relative bg-black/90 border border-white/10 rounded-xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white/70 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative h-64 md:h-80 overflow-hidden">
          <motion.div
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10"
          />
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.7 }}
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className="p-6 md:p-8 overflow-y-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-2xl md:text-3xl font-display font-bold text-white mb-4"
          >
            {project.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white/80 mb-6"
          >
            {project.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-6"
          >
            <h3 className="text-lg font-medium text-white mb-3">Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                  className="px-3 py-1 text-sm rounded-full bg-white/10 text-white/80"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap gap-4"
          >
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2 border border-white/20 rounded-full text-sm hover:bg-white/10 transition-colors"
            >
              <Github className="w-4 h-4" />
              View Code
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2 bg-accent hover:bg-accent/80 rounded-full text-sm transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Live Demo
            </motion.a>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default Projects
