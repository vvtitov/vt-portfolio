"use client"

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react"

export type ThemePreference = "light" | "dark" | "system"

type ThemeContextValue = {
  theme: ThemePreference
  resolvedTheme: "light" | "dark"
  setTheme: (theme: ThemePreference) => void
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") {
    return "light"
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

function applyTheme(theme: ThemePreference) {
  const root = document.documentElement

  if (theme === "system") {
    root.removeAttribute("data-theme")
    return
  }

  root.setAttribute("data-theme", theme)
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemePreference>("system")
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light")

  const syncResolvedTheme = useCallback((preference: ThemePreference) => {
    const resolved = preference === "system" ? getSystemTheme() : preference
    setResolvedTheme(resolved)
    applyTheme(preference)
  }, [])

  useEffect(() => {
    const stored = localStorage.getItem("theme")
    const preference: ThemePreference =
      stored === "light" || stored === "dark" || stored === "system" ? stored : "system"

    setThemeState(preference)
    syncResolvedTheme(preference)

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const handleSystemChange = () => {
      if (localStorage.getItem("theme") === "system" || !localStorage.getItem("theme")) {
        syncResolvedTheme("system")
      }
    }

    mediaQuery.addEventListener("change", handleSystemChange)
    return () => mediaQuery.removeEventListener("change", handleSystemChange)
  }, [syncResolvedTheme])

  const setTheme = useCallback(
    (preference: ThemePreference) => {
      setThemeState(preference)
      localStorage.setItem("theme", preference)
      syncResolvedTheme(preference)
    },
    [syncResolvedTheme],
  )

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useThemePreference() {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error("useThemePreference must be used within ThemeProvider")
  }

  return context
}
