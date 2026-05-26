"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useThemePreference } from "@/components/theme-provider"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useThemePreference()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="link" size="icon" aria-label="Loading theme toggle" className="opacity-0">
        <div className="relative h-5 w-5" />
      </Button>
    )
  }

  const isDark = resolvedTheme === "dark"

  return (
    <Button
      variant="link"
      size="icon"
      onClick={() => {
        const currentTheme =
          document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light"

        setTheme(currentTheme === "dark" ? "light" : "dark")
      }}
      aria-label="Toggle theme"
      className="opacity-100"
    >
      <motion.div
        animate={{ rotate: isDark ? 0 : 180 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="relative h-5 w-5"
      >
        <motion.div
          animate={{ opacity: isDark ? 1 : 0 }}
          initial={{ opacity: isDark ? 1 : 0 }}
          transition={{ duration: 0.25 }}
          className="absolute inset-0"
        >
          <Moon className="h-5 w-5" />
        </motion.div>
        <motion.div
          animate={{ opacity: isDark ? 0 : 1 }}
          initial={{ opacity: isDark ? 0 : 1 }}
          transition={{ duration: 0.25 }}
          className="absolute inset-0"
        >
          <Sun className="h-5 w-5" />
        </motion.div>
      </motion.div>
    </Button>
  )
}
