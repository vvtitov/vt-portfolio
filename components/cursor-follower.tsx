"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion"

const INTERACTIVE_SELECTOR =
  'a, button, input, textarea, select, label, [role="button"], [data-cursor="pointer"]'

const OUTER_SIZE = 20
const INNER_SIZE = 3
const OUTER_OFFSET = OUTER_SIZE / 2
const INNER_OFFSET = INNER_SIZE / 2

type Ripple = { id: number; x: number; y: number }

export function CursorFollower() {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [ripples, setRipples] = useState<Ripple[]>([])

  const outerX = useMotionValue(-100)
  const outerY = useMotionValue(-100)
  const innerX = useMotionValue(-100)
  const innerY = useMotionValue(-100)

  const smoothOuterX = useSpring(outerX, { damping: 22, stiffness: 380, mass: 0.35 })
  const smoothOuterY = useSpring(outerY, { damping: 22, stiffness: 380, mass: 0.35 })
  const smoothInnerX = useSpring(innerX, { damping: 28, stiffness: 900, mass: 0.08 })
  const smoothInnerY = useSpring(innerY, { damping: 28, stiffness: 900, mass: 0.08 })

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return
    }

    const mediaQuery = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    )

    const updateVisibility = () => {
      setIsVisible(mediaQuery.matches && window.innerWidth > 768)
    }

    const handleMouseMove = (event: MouseEvent) => {
      outerX.set(event.clientX - OUTER_OFFSET)
      outerY.set(event.clientY - OUTER_OFFSET)
      innerX.set(event.clientX - INNER_OFFSET)
      innerY.set(event.clientY - INNER_OFFSET)

      const target = event.target as Element | null
      setIsHovering(Boolean(target?.closest(INTERACTIVE_SELECTOR)))
    }

    const handleMouseDown = (event: MouseEvent) => {
      setIsClicking(true)

      const id = event.timeStamp
      setRipples((prev) => [...prev, { id, x: event.clientX, y: event.clientY }])
      window.setTimeout(() => {
        setRipples((prev) => prev.filter((ripple) => ripple.id !== id))
      }, 520)
    }

    const handleMouseUp = () => {
      setIsClicking(false)
    }

    updateVisibility()

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", updateVisibility)
    } else {
      mediaQuery.addListener(updateVisibility)
    }

    window.addEventListener("resize", updateVisibility, { passive: true })
    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    window.addEventListener("mousedown", handleMouseDown, { passive: true })
    window.addEventListener("mouseup", handleMouseUp, { passive: true })

    return () => {
      document.body.classList.remove("custom-cursor-enabled")

      if (typeof mediaQuery.removeEventListener === "function") {
        mediaQuery.removeEventListener("change", updateVisibility)
      } else {
        mediaQuery.removeListener(updateVisibility)
      }

      window.removeEventListener("resize", updateVisibility)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [innerX, innerY, outerX, outerY])

  useEffect(() => {
    document.body.classList.toggle("custom-cursor-enabled", isVisible)

    return () => {
      document.body.classList.remove("custom-cursor-enabled")
    }
  }, [isVisible])

  if (!isVisible) return null

  return (
    <>
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            className="pointer-events-none fixed z-[120] rounded-full border border-primary/50"
            style={{ left: ripple.x, top: ripple.y }}
            initial={{ width: OUTER_SIZE, height: OUTER_SIZE, x: "-50%", y: "-50%", opacity: 0.35 }}
            animate={{ width: OUTER_SIZE * 2.2, height: OUTER_SIZE * 2.2, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}
      </AnimatePresence>

      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[121] rounded-full border border-primary/70 bg-primary/5"
        style={{
          width: OUTER_SIZE,
          height: OUTER_SIZE,
          x: smoothOuterX,
          y: smoothOuterY,
        }}
        animate={{
          scale: isClicking ? 0.82 : isHovering ? 1.55 : 1,
          borderColor: isHovering ? "hsl(var(--primary) / 0.95)" : "hsl(var(--primary) / 0.55)",
          backgroundColor: isHovering ? "hsl(var(--primary) / 0.08)" : "hsl(var(--primary) / 0.03)",
        }}
        transition={{ type: "spring", stiffness: 420, damping: 26, mass: 0.4 }}
      />

      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[122] rounded-full bg-primary"
        style={{
          width: INNER_SIZE,
          height: INNER_SIZE,
          x: smoothInnerX,
          y: smoothInnerY,
        }}
        animate={{
          scale: isClicking ? 0.6 : isHovering ? 1.35 : 1,
          opacity: isClicking ? 0.85 : 1,
        }}
        transition={{ type: "spring", stiffness: 520, damping: 28, mass: 0.25 }}
      />
    </>
  )
}
