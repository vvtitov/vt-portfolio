"use client"

import { createContext, useContext, useState, ReactNode } from "react"
import { projects } from "@/data/projects"

type Project = {
  id: number
  title: string
  description: string
  tags: string[]
  imageSrc: string
  link: string
  githubLink?: string
  category: string[]
}

type ProjectsContextType = {
  filteredProjects: Project[]
  activeFilter: string
  setActiveFilter: (filter: string) => void
}

const ProjectsContext = createContext<ProjectsContextType | undefined>(undefined)

export function ProjectsProvider({ children }: { children: ReactNode }) {
  const [activeFilter, setActiveFilter] = useState("all")

  // Filter projects based on the active filter
  const filteredProjects = activeFilter === "all" 
    ? projects 
    : projects.filter(project => project.category.includes(activeFilter))

  return (
    <ProjectsContext.Provider value={{ filteredProjects, activeFilter, setActiveFilter }}>
      {children}
    </ProjectsContext.Provider>
  )
}

export function useProjects() {
  const context = useContext(ProjectsContext)
  if (context === undefined) {
    throw new Error("useProjects must be used within a ProjectsProvider")
  }
  return context
}
