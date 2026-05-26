"use client"

import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useState, type ReactNode } from "react"

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

function applyTheme(preference: ThemePreference) {
  const root = document.documentElement
  const resolved = preference === "system" ? getSystemTheme() : preference

  root.setAttribute("data-theme", resolved)
}

const THEME_COLORS = {
  light: "#ffffff",
  dark: "#09090b",
} as const

function updateThemeColorMeta(resolved: "light" | "dark") {
  if (typeof document === "undefined") return

  const color = THEME_COLORS[resolved]
  const root = document.documentElement

  root.style.colorScheme = resolved

  document.querySelectorAll('meta[name="theme-color"]').forEach((meta) => {
    meta.remove()
  })

  const themeColorMeta = document.createElement("meta")
  themeColorMeta.setAttribute("name", "theme-color")
  themeColorMeta.setAttribute("content", color)
  document.head.appendChild(themeColorMeta)
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemePreference>("system")
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light")

  const syncResolvedTheme = useCallback((preference: ThemePreference) => {
    const resolved = preference === "system" ? getSystemTheme() : preference
    setResolvedTheme(resolved)
    applyTheme(preference)
    updateThemeColorMeta(resolved)
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

  useLayoutEffect(() => {
    updateThemeColorMeta(resolvedTheme)
  }, [resolvedTheme])

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
