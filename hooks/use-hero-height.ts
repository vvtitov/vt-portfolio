"use client"

import { useEffect } from "react"

export function useHeroHeight() {
  useEffect(() => {
    const setHeroHeight = () => {
      const height = window.visualViewport?.height ?? window.innerHeight
      document.documentElement.style.setProperty("--hero-height", `${Math.round(height)}px`)
      window.dispatchEvent(new Event("resize"))
    }

    setHeroHeight()

    window.visualViewport?.addEventListener("resize", setHeroHeight)
    window.addEventListener("resize", setHeroHeight)
    window.addEventListener("orientationchange", setHeroHeight)

    return () => {
      window.visualViewport?.removeEventListener("resize", setHeroHeight)
      window.removeEventListener("resize", setHeroHeight)
      window.removeEventListener("orientationchange", setHeroHeight)
    }
  }, [])
}
