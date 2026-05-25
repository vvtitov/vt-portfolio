import type { MetadataRoute } from "next"

import { projects } from "@/data/projects"
import { siteUrl } from "@/lib/site"

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/projects", "/services"]
  const projectRoutes = projects.map((project) => `/projects/${project.slug}`)

  return [...staticRoutes, ...projectRoutes].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route.startsWith("/projects/") ? 0.7 : 0.8,
  }))
}
