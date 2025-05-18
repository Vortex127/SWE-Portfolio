"use client"

import { skillsData } from "@/lib/data"
import { useEffect, useRef } from "react"
import { Map } from "lucide-react"

const Skills = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

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
    // Skills visualization for desktop only
    if (window.innerWidth < 768 || !canvasRef.current || !containerRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const container = containerRef.current

    // Set canvas dimensions with pixel density adjustment
    const setCanvasSize = () => {
      const pixelRatio = window.devicePixelRatio || 1
      const displayWidth = container.clientWidth
      const displayHeight = container.clientHeight

      canvas.width = displayWidth * pixelRatio
      canvas.height = displayHeight * pixelRatio
      canvas.style.width = `${displayWidth}px`
      canvas.style.height = `${displayHeight}px`

      ctx.scale(pixelRatio, pixelRatio)
    }

    setCanvasSize()
    window.addEventListener("resize", setCanvasSize)

    // Get all skill nodes
    const skillNodes = Array.from(container.querySelectorAll(".skill-node")) as HTMLElement[]

    // Initialize nodes with category-based clustering
    const nodes = skillNodes.map((node, index) => {
      const category = node.dataset.category || ""
      const categoryIndex = categories.indexOf(category)
      const angleOffset = (categoryIndex / categories.length) * Math.PI * 2
      const radius = 150 + Math.random() * 50 // Randomize initial positions within category cluster
      const angle = angleOffset + (Math.random() * 0.5 - 0.25) // Add some random spread within category
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2

      return {
        element: node,
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle),
        vx: 0,
        vy: 0,
        category,
        level: Number.parseInt(node.dataset.level || "0", 10),
        angle, // Store angle for rotation effect
      }
    })

    // Enhanced force-directed graph simulation with category clustering and organic movement
    const simulation = () => {
      const time = Date.now() * 0.001

      nodes.forEach((node1) => {
        node1.vx = 0
        node1.vy = 0

        // Enhanced dynamic interactions between nodes with organic movement
        nodes.forEach((node2) => {
          if (node1 === node2) return

          const dx = node2.x - node1.x
          const dy = node2.y - node1.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          // Dynamic attraction between nodes of the same category
          if (node1.category === node2.category) {
            const pulsingFactor = 1 + Math.sin(time * 2 + distance * 0.05) * 0.4
            const attraction = Math.min(0.5, 120 / distance) * pulsingFactor
            const levelBonus = Math.min(node1.level, node2.level) / 100
            node1.vx += dx * attraction * (0.04 + levelBonus * 0.02)
            node1.vy += dy * attraction * (0.04 + levelBonus * 0.02)
          }

          // Enhanced repulsion with organic movement
          if (distance < 150) {
            const force = (150 - distance) / distance
            const levelFactor = (node1.level + node2.level) / 120
            const repulsion = 0.2 * levelFactor
            const wobble = Math.sin(time * 3 + node1.angle * 2) * 0.1
            node1.vx -= dx * force * (repulsion + wobble)
            node1.vy -= dy * force * (repulsion + wobble)
          }
        })

        // Enhanced orbital motion with dynamic adjustments
        const centerX = canvas.width / 2 - 120
        const centerY = canvas.height / 2
        const categoryIndex = categories.indexOf(node1.category)
        const baseAngle = (categoryIndex / categories.length) * Math.PI * 2
        const orbitRadius = 200 + (node1.level / 100) * 60

        // Add organic movement to orbit
        const orbitWobble = Math.sin(time * 1.5 + node1.angle * 3) * 20
        const adjustedRadius = orbitRadius + orbitWobble

        const targetX = centerX + adjustedRadius * Math.cos(baseAngle + node1.angle)
        const targetY = centerY + adjustedRadius * Math.sin(baseAngle + node1.angle)

        // Dynamic rotation speed based on skill level and position
        const rotationSpeed = 0.002 * (1 + node1.level / 40)
        node1.angle += rotationSpeed * (1 + Math.sin(time + node1.angle) * 0.3)

        // Smooth movement with organic easing
        const dx = targetX - node1.x
        const dy = targetY - node1.y
        const easing = 0.03 + Math.sin(time * 2) * 0.01
        node1.vx += dx * easing
        node1.vy += dy * easing

        // Apply velocity with dynamic damping
        const damping = 0.8 + Math.sin(time + node1.angle) * 0.1
        node1.x += node1.vx * damping
        node1.y += node1.vy * damping

        // Enhanced boundary constraints with smooth bounce
        const padding = 100
        const bounce = 0.5

        if (node1.x < padding) {
          node1.x = padding
          node1.vx *= -bounce
        } else if (node1.x > canvas.width - padding) {
          node1.x = canvas.width - padding
          node1.vx *= -bounce
        }

        if (node1.y < padding) {
          node1.y = padding
          node1.vy *= -bounce
        } else if (node1.y > canvas.height - padding) {
          node1.y = canvas.height - padding
          node1.vy *= -bounce
        }

        // Enhanced node scaling and transformation
        const baseScale = 1 + node1.level / 150
        const pulseScale = Math.sin(time * 2 + categoryIndex * 0.5) * 0.08
        const finalScale = baseScale + pulseScale

        // Apply smooth transform with subtle rotation
        const rotation = Math.sin(time + node1.angle) * 5
        node1.element.style.transform = `
          translate(${node1.x - node1.element.offsetWidth / 2}px, ${node1.y - node1.element.offsetHeight / 2}px)
          scale(${finalScale})
          rotate(${rotation}deg)
        `
      })
    }

    // Draw lightweight, ethereal neural network connections
    const drawConnections = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const time = Date.now() * 0.001

      // Create ethereal glow effect with transparency
      const createEtherealGlow = (x: number, y: number, radius: number, intensity: number, hueShift = 0) => {
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius)
        const baseHue = (time * 10 + hueShift) % 360

        // More transparent, lighter glow
        gradient.addColorStop(0, `hsla(${baseHue}, 80%, 70%, ${intensity * 0.5})`)
        gradient.addColorStop(0.3, `hsla(${(baseHue + 30) % 360}, 90%, 65%, ${intensity * 0.3})`)
        gradient.addColorStop(0.6, `hsla(${(baseHue + 60) % 360}, 95%, 60%, ${intensity * 0.2})`)
        gradient.addColorStop(0.8, `hsla(${(baseHue + 90) % 360}, 80%, 70%, ${intensity * 0.1})`)
        gradient.addColorStop(1, `hsla(${baseHue}, 80%, 75%, 0)`)
        return gradient
      }

      // Subtle core pulse effect
      const pulseSize = 10 + Math.sin(time * 2) * 5
      const coreRotation = time * 20

      // Very subtle outer aura
      ctx.save()
      ctx.translate(centerX, centerY)
      ctx.rotate(coreRotation * 0.05)
      ctx.fillStyle = createEtherealGlow(0, 0, 300 + pulseSize, 0.1, 0)
      ctx.beginPath()
      ctx.arc(0, 0, 300 + pulseSize, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()

      // Minimal middle layer
      ctx.save()
      ctx.translate(centerX, centerY)
      ctx.rotate(-coreRotation * 0.1)
      ctx.fillStyle = createEtherealGlow(0, 0, 200 + pulseSize * 0.6, 0.15, 30)
      ctx.beginPath()
      ctx.arc(0, 0, 200 + pulseSize * 0.6, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()

      // Subtle inner core
      ctx.save()
      ctx.translate(centerX, centerY)
      ctx.rotate(coreRotation * 0.15)
      ctx.fillStyle = createEtherealGlow(0, 0, 100 + pulseSize * 0.4, 0.2, 60)
      ctx.beginPath()
      ctx.arc(0, 0, 100 + pulseSize * 0.4, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()

      // Draw thin, ethereal neural pathways
      nodes.forEach((node) => {
        const nodeAngle = Math.atan2(node.y - centerY, node.x - centerX)
        const waveOffset = Math.sin(time * 2 + nodeAngle) * 8
        const nodeDistance = Math.sqrt(Math.pow(node.x - centerX, 2) + Math.pow(node.y - centerY, 2))

        // Subtle energy flow
        const flowSpeed = 0.8 + node.level / 120
        const flowOffset = (time * flowSpeed) % 1
        const energyGradient = ctx.createLinearGradient(centerX, centerY, node.x, node.y)

        // Lighter, more transparent energy pulse
        const energyIntensity = 0.2 + node.level / 150 + Math.sin(time * 3 + nodeAngle) * 0.05
        energyGradient.addColorStop(Math.max(0, flowOffset - 0.3), `hsla(${(time * 40) % 360}, 80%, 70%, 0)`)
        energyGradient.addColorStop(flowOffset, `hsla(${(time * 40 + 30) % 360}, 90%, 75%, ${energyIntensity})`)
        energyGradient.addColorStop(Math.min(1, flowOffset + 0.3), `hsla(${(time * 40 + 60) % 360}, 80%, 70%, 0)`)

        // Draw main connection with dynamic curve - thinner lines
        ctx.beginPath()
        ctx.moveTo(
          centerX + Math.cos(nodeAngle) * (80 + Math.sin(time + nodeAngle) * 8),
          centerY + Math.sin(nodeAngle) * (80 + Math.sin(time + nodeAngle) * 8),
        )

        // Enhanced organic path
        const curveIntensity = 0.25 + Math.sin(time * 2 + nodeDistance * 0.01) * 0.08
        const controlPoint1X = centerX + Math.cos(nodeAngle) * (160 + waveOffset) * curveIntensity
        const controlPoint1Y = centerY + Math.sin(nodeAngle) * (160 + waveOffset) * curveIntensity
        const controlPoint2X = node.x - Math.cos(nodeAngle) * 50 * curveIntensity
        const controlPoint2Y = node.y - Math.sin(nodeAngle) * 50 * curveIntensity

        ctx.bezierCurveTo(controlPoint1X, controlPoint1Y, controlPoint2X, controlPoint2Y, node.x, node.y)

        // Thinner lines with subtle glow
        ctx.strokeStyle = energyGradient
        ctx.lineWidth = 1.5 + node.level / 40 + Math.sin(time * 4 + nodeAngle) * 0.5

        // Lighter glow effects
        ctx.shadowColor = `hsla(${(time * 40 + 90) % 360}, 90%, 75%, 0.4)`
        ctx.shadowBlur = 15 + Math.sin(time * 3 + nodeAngle) * 3
        ctx.stroke()

        ctx.shadowBlur = 0

        // Draw ethereal synaptic connections between nodes of same category
        nodes.forEach((otherNode) => {
          if (node === otherNode || node.category !== otherNode.category) return

          const dx = otherNode.x - node.x
          const dy = otherNode.y - node.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          // Only connect nearby nodes with thin lines
          if (distance < 200) {
            const opacity = 1 - distance / 200
            const midX = (node.x + otherNode.x) / 2
            const midY = (node.y + otherNode.y) / 2
            const offset = Math.sin(time * 2.5 + distance * 0.04) * 15

            // Draw thin connection
            ctx.beginPath()
            ctx.moveTo(node.x, node.y)

            // Subtle curve
            const curveOffset = Math.sin(time * 1.5 + distance * 0.02) * 20
            ctx.quadraticCurveTo(midX + offset, midY + offset + curveOffset, otherNode.x, otherNode.y)

            // Ethereal glow gradient
            const synapticGlow = ctx.createLinearGradient(node.x, node.y, otherNode.x, otherNode.y)
            const glowIntensity = opacity * 0.3 + Math.sin(time * 2 + distance * 0.01) * 0.05
            const hueOffset = (time * 25) % 360

            synapticGlow.addColorStop(0, `hsla(${hueOffset}, 90%, 75%, ${glowIntensity})`)
            synapticGlow.addColorStop(0.5, `hsla(${(hueOffset + 30) % 360}, 95%, 70%, ${glowIntensity * 1.2})`)
            synapticGlow.addColorStop(1, `hsla(${(hueOffset + 60) % 360}, 90%, 75%, ${glowIntensity})`)

            ctx.strokeStyle = synapticGlow
            ctx.lineWidth = 0.8 + Math.sin(time * 3 + distance * 0.03) * 0.3

            // Subtle glow effect
            ctx.shadowColor = `hsla(${(hueOffset + 90) % 360}, 90%, 75%, 0.3)`
            ctx.shadowBlur = 5 + Math.sin(time * 2.5 + distance * 0.02) * 2
            ctx.stroke()
            ctx.shadowBlur = 0

            // Only add small connection nodes occasionally for a more sparse look
            if (Math.random() > 0.7) {
              // Minimal neural nodes
              const drawMinimalNode = (x: number, y: number, size: number, hue: number) => {
                const pulseSize = size * (1 + Math.sin(time * 2.5 + x * 0.04 + y * 0.04) * 0.2)
                const nodeGlow = createEtherealGlow(x, y, pulseSize * 2, 0.3, hue)
                ctx.fillStyle = nodeGlow
                ctx.beginPath()
                ctx.arc(x, y, pulseSize, 0, Math.PI * 2)
                ctx.fill()
              }

              drawMinimalNode(midX + offset, midY + offset + curveOffset, 2, hueOffset + 120)
            }
          }
        })
      })
    }

    // Animation loop
    let animationFrame: number
    const animate = () => {
      simulation()
      drawConnections()
      animationFrame = requestAnimationFrame(animate)
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", setCanvasSize)
      cancelAnimationFrame(animationFrame)
    }
  }, [])

  return (
    <section id="skills" className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-background to-transparent z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-10" />

      <div className="container mx-auto px-6 relative z-20">
        <div className="mb-12 md:mb-16 flex items-center gap-3">
          <Map className="text-accent h-6 w-6 animate-pulse-slow" />
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gradient mb-0">Skills Map</h2>
          <div className="h-1 w-12 bg-accent rounded-full ml-2 animate-glow"></div>
        </div>

        {/* Mobile view: categorized grid */}
        <div className="md:hidden">
          {categories.map((category, catIndex) => (
            <div key={category} className="mb-12">
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{
                    background: `rgb(${139 + catIndex * 20}, ${92 - catIndex * 10}, ${246 - catIndex * 15})`,
                  }}
                ></div>
                <h3 className="text-xl font-display font-semibold text-white">{category}</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {skillsByCategory[category].map((skill, index) => (
                  <div key={index} className="glass-card px-4 py-2 rounded-lg text-sm">
                    {skill.name}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Desktop view: skill map visualization */}
        <div className="hidden md:block relative h-[700px] -mx-6 -ml-24">
          <canvas ref={canvasRef} className="absolute inset-0 z-0"></canvas>
          <div ref={containerRef} className="relative h-full">
            {skillsData.map((skill, index) => (
              <div
                key={skill.name}
                data-category={skill.category}
                data-level={skill.level}
                className="skill-node absolute glass-card px-3 py-1.5 rounded-lg cursor-pointer transition-all duration-500 hover:scale-110 hover:shadow-lg hover:shadow-accent/10"
                style={{
                  opacity: 0.7 + (skill.level / 100) * 0.3,
                  zIndex: Math.floor(skill.level / 10),
                  fontSize: `${0.8 + (skill.level / 100) * 0.25}rem`,
                  fontWeight: skill.level > 80 ? 600 : 400,
                  backdropFilter: "blur(8px)",
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                }}
              >
                {skill.name}
              </div>
            ))}
          </div>

          {/* Central hub - more minimal and ethereal */}
        </div>
      </div>
    </section>
  )
}

export default Skills
