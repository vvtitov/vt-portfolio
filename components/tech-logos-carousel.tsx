"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useAnimationControls } from "framer-motion"
import { useTheme } from "next-themes"
import {
  SiReact,
  SiNextdotjs,
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiCss3,
  SiTailwindcss,
  SiFramer,
  SiFigma,
  SiGit,
  SiNodedotjs,
  SiVite
} from "react-icons/si"

// Define the technology logos with their names and icon components
const techLogos = [
  { name: "React", icon: SiReact },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "JavaScript", icon: SiJavascript },
  { name: "TypeScript", icon: SiTypescript },
  { name: "Node.js", icon: SiNodedotjs },
  { name: "Vite", icon: SiVite },
  { name: "HTML5", icon: SiHtml5 },
  { name: "CSS3", icon: SiCss3 },
  { name: "Tailwind CSS", icon: SiTailwindcss },
  { name: "Framer Motion", icon: SiFramer },
  { name: "Figma", icon: SiFigma },
  { name: "Git", icon: SiGit }
]

export function TechLogosCarousel() {
  const [screenSize, setScreenSize] = useState({
    width: 0,
    isMobile: false,
    isTablet: false
  })
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme } = useTheme()
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState(0)
  const [itemWidth, setItemWidth] = useState(0)
  const controls = useAnimationControls()
  const animationStarted = useRef(false)

  // Handle mounting and responsive behavior
  useEffect(() => {
    setMounted(true)
    
    const updateScreenSize = () => {
      const width = window.innerWidth
      setScreenSize({
        width,
        isMobile: width < 640,
        isTablet: width >= 640 && width < 1024
      })
    }
    
    updateScreenSize()
    window.addEventListener("resize", updateScreenSize)
    
    return () => {
      window.removeEventListener("resize", updateScreenSize)
    }
  }, [])

  // Measure container and item widths for precise animation
  useEffect(() => {
    if (!mounted) return

    const updateWidths = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.scrollWidth)
        
        // Get the first item's width including gap
        const firstItem = containerRef.current.querySelector('[data-item]')
        if (firstItem) {
          const style = window.getComputedStyle(firstItem as HTMLElement)
          const width = (firstItem as HTMLElement).offsetWidth
          const marginRight = parseInt(style.marginRight || '0')
          setItemWidth(width + marginRight)
        }
      }
    }

    updateWidths()
    
    // Use ResizeObserver instead of resize event for better performance
    const resizeObserver = new ResizeObserver(updateWidths)
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }
    
    return () => {
      resizeObserver.disconnect()
    }
  }, [mounted])

  // Function to start the infinite animation
  const startAnimation = async () => {
    if (!containerWidth || !itemWidth || animationStarted.current) return
    
    // Calculate speed based on screen size (pixels per second)
    const speed = screenSize.isMobile ? 150 : screenSize.isTablet ? 130 : 100
    
    // Calculate duration based on container width and speed
    const duration = containerWidth / speed
    
    // Reset to start position
    await controls.set({ x: 0 })
    
    // Start infinite animation
    controls.start({
      x: -itemWidth * techLogos.length,
      transition: {
        duration,
        ease: "linear",
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 0
      }
    })
    
    animationStarted.current = true
  }

  // Start animation when widths are available
  useEffect(() => {
    if (mounted && containerWidth && itemWidth && !animationStarted.current) {
      startAnimation()
    }
  }, [mounted, containerWidth, itemWidth])

  // Reset animation flag when screen size changes significantly
  useEffect(() => {
    if (screenSize.width > 0) {
      animationStarted.current = false
      startAnimation()
    }
  }, [screenSize.width])

  if (!mounted) return null

  // Create a duplicated array for seamless looping
  const duplicatedLogos = [...techLogos, ...techLogos, ...techLogos, ...techLogos]

  return (
    <div className="w-full overflow-hidden pt-20 select-none">
      <div className="mb-8 text-center">
        <h3 className="text-xl md:text-2xl font-semibold text-foreground">
          Technologies I <span className="text-primary">Work With</span>
        </h3>
      </div>
      
      <div className="relative w-full overflow-hidden touch-none">
        {/* Left fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-12 md:w-16 z-10 bg-gradient-to-r from-background to-transparent pointer-events-none"></div>
        
        <motion.div 
          ref={containerRef}
          className="flex items-center hover:scale-115"
          animate={controls}
        >
          {duplicatedLogos.map((tech, index) => {
            const Icon = tech.icon
            return (
              <motion.div 
                key={`logo-${index}`}
                data-item
                className="flex flex-col items-center justify-center bg-card/80 backdrop-blur-sm rounded-lg shadow-sm p-3 sm:p-4 h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 mr-6 md:mr-8 flex-shrink-0"
                whileHover={{ y: -5, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <div className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 flex items-center justify-center">  
                  <Icon 
                    size={screenSize.isMobile ? "1.75rem" : screenSize.isTablet ? "2rem" : "2.5rem"} 
                    className="text-foreground" 
                  />
                </div>
                <span className="text-[10px] sm:text-xs mt-1 sm:mt-2 text-muted-foreground font-medium text-center w-full truncate px-0.5">{tech.name}</span>
              </motion.div>
            )
          })}
        </motion.div>
        
        {/* Right fade effect */}
        <div className="absolute right-0 top-0 bottom-0 w-12 md:w-16 z-10 bg-gradient-to-l from-background to-transparent pointer-events-none"></div>
      </div>
    </div>
  )
}
