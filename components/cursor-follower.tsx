"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export function CursorFollower() {
  const [isVisible, setIsVisible] = useState(false)
  const outerX = useMotionValue(-100)
  const outerY = useMotionValue(-100)
  const innerX = useMotionValue(-100)
  const innerY = useMotionValue(-100)
  const smoothOuterX = useSpring(outerX, { damping: 20, stiffness: 1200, mass: 0.1 })
  const smoothOuterY = useSpring(outerY, { damping: 20, stiffness: 1200, mass: 0.1 })
  const smoothInnerX = useSpring(innerX, { damping: 30, stiffness: 1500, mass: 0.05 })
  const smoothInnerY = useSpring(innerY, { damping: 30, stiffness: 1500, mass: 0.05 })

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return
    }

    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)")
    const updateVisibility = () => {
      setIsVisible(mediaQuery.matches && window.innerWidth > 768)
    }

    const handleMouseMove = (event: MouseEvent) => {
      outerX.set(event.clientX - 12)
      outerY.set(event.clientY - 12)
      innerX.set(event.clientX - 4)
      innerY.set(event.clientY - 4)
    }

    updateVisibility()

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", updateVisibility)
    } else {
      mediaQuery.addListener(updateVisibility)
    }

    window.addEventListener("resize", updateVisibility, { passive: true })
    window.addEventListener("mousemove", handleMouseMove, { passive: true })

    return () => {
      document.body.classList.remove("custom-cursor-enabled")

      if (typeof mediaQuery.removeEventListener === "function") {
        mediaQuery.removeEventListener("change", updateVisibility)
      } else {
        mediaQuery.removeListener(updateVisibility)
      }

      window.removeEventListener("resize", updateVisibility)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  useEffect(() => {
    document.body.classList.toggle("custom-cursor-enabled", isVisible)

    return () => {
      document.body.classList.remove("custom-cursor-enabled")
    }
  }, [isVisible])

  if (!isVisible) return null

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 rounded-full border-2 border-primary z-[60] pointer-events-none"
        style={{ x: smoothOuterX, y: smoothOuterY }}
      />
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-primary rounded-full z-[60] pointer-events-none"
        style={{ x: smoothInnerX, y: smoothInnerY }}
      />
    </>
  )
}
