export type ResolvedTheme = "light" | "dark"

export const THEME_TOKENS = {
  light: {
    themeColor: "#ffffff",
    background: "#ffffff",
    statusBarStyle: "default",
  },
  dark: {
    themeColor: "#09090b",
    background: "#09090b",
    statusBarStyle: "black-translucent",
  },
} as const

function setMeta(name: string, content: string) {
  let meta = document.querySelector(`meta[name="${name}"]`)

  if (!meta) {
    meta = document.createElement("meta")
    meta.setAttribute("name", name)
    document.head.appendChild(meta)
  }

  meta.setAttribute("content", content)
}

function setThemeColorMeta(color: string) {
  const existing = document.getElementById("site-theme-color")

  if (existing) {
    existing.setAttribute("content", color)
    return
  }

  document.querySelectorAll('meta[name="theme-color"]').forEach((meta) => {
    meta.remove()
  })

  const themeColorMeta = document.createElement("meta")
  themeColorMeta.setAttribute("id", "site-theme-color")
  themeColorMeta.setAttribute("name", "theme-color")
  themeColorMeta.setAttribute("content", color)
  document.head.appendChild(themeColorMeta)
}

function isIOSDevice() {
  if (typeof navigator === "undefined") return false

  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
  )
}

function forceSafariChromeRepaint(themeColor: string) {
  if (!isIOSDevice() || typeof document === "undefined") return

  const overlay = document.createElement("div")
  overlay.setAttribute("aria-hidden", "true")
  overlay.style.cssText = [
    "position:fixed",
    "inset:0",
    "z-index:100",
    `background:${themeColor}`,
    "pointer-events:none",
  ].join(";")

  document.body.appendChild(overlay)

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      overlay.remove()
    })
  })
}

function forceDocumentRepaint() {
  if (typeof window === "undefined") return

  void document.documentElement.offsetHeight

  const scrollY = window.scrollY
  window.scrollTo(0, scrollY)
}

export function syncThemeDocument(resolved: ResolvedTheme) {
  if (typeof document === "undefined") return

  const tokens = THEME_TOKENS[resolved]
  const root = document.documentElement

  root.setAttribute("data-theme", resolved)
  root.style.colorScheme = resolved
  root.style.backgroundColor = tokens.background
  document.body.style.backgroundColor = tokens.background

  setThemeColorMeta(tokens.themeColor)
  setMeta("apple-mobile-web-app-status-bar-style", tokens.statusBarStyle)
  forceDocumentRepaint()
  forceSafariChromeRepaint(tokens.themeColor)

  requestAnimationFrame(() => {
    setThemeColorMeta(tokens.themeColor)
    forceDocumentRepaint()
    forceSafariChromeRepaint(tokens.themeColor)
  })
}

export function resolveThemePreference(
  preference: "light" | "dark" | "system",
): ResolvedTheme {
  if (preference === "light" || preference === "dark") {
    return preference
  }

  if (typeof window === "undefined") {
    return "light"
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}
