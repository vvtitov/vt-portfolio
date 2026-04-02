import type { MetadataRoute } from "next"

const SITE_URL = "https://www.vtitov.dev"

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/projects", "/portfolio", "/services"]

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }))
}
