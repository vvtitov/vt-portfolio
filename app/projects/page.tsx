import { ProjectFilter } from "@/components/project-filter"
import { ProjectsProvider } from "@/context/projects-context"
import { FilteredProjects } from "@/components/filtered-projects"

export default function ProjectsPage() {
  return (
    <main className="pt-24 pb-16">
      <ProjectsProvider>
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
            <FilteredProjects />
          </div>
        </div>
      </ProjectsProvider>
    </main>
  )
}
