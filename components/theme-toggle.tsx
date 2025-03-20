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

  if (!mounted) {
    return null
  }

  return (
    <Button
      variant="link"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
    >
      <motion.div
        animate={{ rotate: theme === "dark" ? 0 : 180 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="relative h-5 w-5"
      >
        <motion.div
          animate={{ opacity: theme === "dark" ? 1 : 0 }}
          transition={{ duration: 0.25 }}
          className="absolute inset-0"
        >
          <Moon className="h-5 w-5" />
        </motion.div>
        <motion.div
          animate={{ opacity: theme === "light" ? 1 : 0 }}
          transition={{ duration: 0.25 }}
          className="absolute inset-0"
        >
          <Sun className="h-5 w-5" />
        </motion.div>
      </motion.div>
    </Button>
  )
}

