"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ProjectCard } from "@/components/project-card"
import { useProjects } from "@/context/projects-context"

export function ProjectsList() {
  const { filteredProjects } = useProjects()

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
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
      </div>

      <div className="mt-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <Button asChild variant="outline" className="group">
            <Link href="/projects" className="flex items-center">
              View All Projects
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </>
  )
}
