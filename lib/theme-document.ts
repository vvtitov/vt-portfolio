export type ResolvedTheme = "light" | "dark"

export const THEME_TOKENS = {
  light: {
    themeColor: "#ffffff",
    background: "hsl(0 0% 100%)",
    statusBarStyle: "default",
  },
  dark: {
    themeColor: "#09090b",
    background: "hsl(240 10% 3.9%)",
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
  document.querySelectorAll('meta[name="theme-color"]').forEach((meta) => {
    meta.remove()
  })

  const themeColorMeta = document.createElement("meta")
  themeColorMeta.setAttribute("name", "theme-color")
  themeColorMeta.setAttribute("content", color)
  document.head.appendChild(themeColorMeta)
}

function forceBrowserThemeRefresh() {
  void document.documentElement.offsetHeight

  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("resize"))
  }
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

  forceBrowserThemeRefresh()

  requestAnimationFrame(() => {
    setThemeColorMeta(tokens.themeColor)
    forceBrowserThemeRefresh()
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
