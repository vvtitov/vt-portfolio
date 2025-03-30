"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Determinar el tema predeterminado basado en las preferencias del sistema
  const prefersDarkMode = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  const defaultTheme = prefersDarkMode ? "dark" : "light"
  
  // Usar el tema real si está montado, o el tema predeterminado si no
  const currentTheme = mounted ? theme : defaultTheme

  // No renderizar nada hasta que el componente esté montado para evitar problemas de hidratación
  if (!mounted) {
    return null
  }

  return (
    <Button
      variant="link"
      size="icon"
      onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
      className="opacity-100"
    >
      <motion.div
        animate={{ rotate: currentTheme === "dark" ? 0 : 180 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="relative h-5 w-5"
      >
        <motion.div
          animate={{ opacity: currentTheme === "dark" ? 1 : 0 }}
          initial={{ opacity: currentTheme === "dark" ? 1 : 0 }}
          transition={{ duration: 0.25 }}
          className="absolute inset-0"
        >
          <Moon className="h-5 w-5" />
        </motion.div>
        <motion.div
          animate={{ opacity: currentTheme === "light" ? 1 : 0 }}
          initial={{ opacity: currentTheme === "light" ? 1 : 0 }}
          transition={{ duration: 0.25 }}
          className="absolute inset-0"
        >
          <Sun className="h-5 w-5" />
        </motion.div>
      </motion.div>
    </Button>
  )
}
