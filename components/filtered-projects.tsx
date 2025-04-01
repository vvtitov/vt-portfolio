"use client"

import { ProjectCard } from "@/components/project-card"
import { useProjects } from "@/context/projects-context"

export function FilteredProjects() {
  const { filteredProjects } = useProjects()

  return (
    <>
      {filteredProjects.map((project, index) => (
        <ProjectCard
          key={project.id}
          title={project.title}
          description={project.description}
          tags={project.tags}
          imageSrc={project.imageSrc}
          link={project.link}
          githubLink={project.githubLink}
          delay={0.1 * (index + 1)}
        />
      ))}
    </>
  )
}
