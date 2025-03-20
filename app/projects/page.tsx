import { ProjectCard } from "@/components/project-card"
import { ProjectFilter } from "@/components/project-filter"
import { projects } from "@/data/projects"

export default function ProjectsPage() {
  return (
    <main className="pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
            All <span className="text-primary">Projects</span>
          </h1>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            A comprehensive showcase of my work across various technologies and design disciplines.
          </p>

          <ProjectFilter />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects && projects.length > 0 ? (
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
            ))
          ) : (
            <div className="col-span-3 text-center py-12">
              <p className="text-muted-foreground">No projects available at the moment.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

