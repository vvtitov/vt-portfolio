"use client"

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react"
import { resolveThemePreference, syncThemeDocument, type ResolvedTheme } from "@/lib/theme-document"

export type ThemePreference = "light" | "dark" | "system"

type ThemeContextValue = {
  theme: ThemePreference
  resolvedTheme: ResolvedTheme
  setTheme: (theme: ThemePreference) => void
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemePreference>("system")
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>("light")

  const syncResolvedTheme = useCallback((preference: ThemePreference) => {
    const resolved = resolveThemePreference(preference)

    setThemeState(preference)
    setResolvedTheme(resolved)
    syncThemeDocument(resolved)
  }, [])

  useEffect(() => {
    const stored = localStorage.getItem("theme")
    const preference: ThemePreference =
      stored === "light" || stored === "dark" || stored === "system" ? stored : "system"

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
