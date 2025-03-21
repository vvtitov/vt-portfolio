"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export default function Logo() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Determinar el tema predeterminado basado en las preferencias del sistema
  const prefersDarkMode = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  const defaultTheme = prefersDarkMode ? "dark" : "light"
  
  // Usar el tema real si está montado, o el tema predeterminado si no
  const currentTheme = mounted ? theme : defaultTheme
  
  // Definir el color según el tema
  const fillColor = currentTheme === "dark" ? "#FFFFFF" : "#000000"

  return (
    <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="60" height="60" viewBox="0 0 200.000000 200.000000"
 preserveAspectRatio="xMidYMid meet">

<g transform="translate(0.000000,200.000000) scale(0.100000,-0.100000)"
fill={fillColor} stroke="none">
<path d="M1303 1578 l-403 -403 0 -63 0 -62 -63 0 -62 0 -155 -155 -155 -155
218 0 218 0 -3 -57 -3 -58 -277 -3 -277 -2 -141 -148 -141 -147 423 -3 423 -3
155 -149 155 -148 5 152 5 152 149 145 149 144 -149 5 -149 5 -3 58 -3 57 213
0 213 0 147 147 c82 81 148 151 148 155 0 5 -159 8 -352 8 l-353 1 238 235
237 235 -2 230 -3 229 -402 -402z"/>
</g>
</svg>

  )
}
