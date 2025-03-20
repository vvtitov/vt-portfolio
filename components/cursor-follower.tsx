"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function CursorFollower() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Función para detectar si es un dispositivo móvil
    const isMobileDevice = () => {
      return (
        typeof window !== "undefined" && 
        (window.innerWidth <= 768 || 
         navigator.maxTouchPoints > 0 || 
         /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
      )
    }

    // Solo mostrar cursor personalizado en escritorio
    if (!isMobileDevice()) {
      setIsVisible(true)

      const handleMouseMove = (e: MouseEvent) => {
        setMousePosition({ x: e.clientX, y: e.clientY })
      }

      window.addEventListener("mousemove", handleMouseMove)

      return () => {
        window.removeEventListener("mousemove", handleMouseMove)
      }
    }
  }, [])

  if (!isVisible) return null

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 rounded-full border-2 border-primary z-50 pointer-events-none"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
        }}
        transition={{
          type: "spring",
          damping: 20,
          stiffness: 1200,
          mass: 0.1,
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-primary rounded-full z-50 pointer-events-none"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
        }}
      />
    </>
  )
}
