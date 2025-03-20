"use client"

import { ProjectCard } from "@/components/project-card"
import { ProjectFilter } from "@/components/project-filter"
import { projects } from "@/data/projects"

export default function PortfolioPage() {
  return (
    <main className="pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
            My <span className="text-primary">Portfolio</span>
          </h1>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            A curated selection of my recent work showcasing my skills in design, development, and animation.
          </p>

          <ProjectFilter />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects &&
            projects.map((project, index) => (
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
        </div>
      </div>
    </main>
  )
}

