import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ExternalLink, Github } from "lucide-react"
import type { Metadata } from "next"

import { Button } from "@/components/ui/button"
import { getAllProjectSlugs, getProjectBySlug } from "@/lib/projects"
import { siteUrl } from "@/lib/site"

interface ProjectPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    return { title: "Project Not Found" }
  }

  return {
    title: `${project.title} | Vladislav Titov`,
    description: project.description,
    alternates: {
      canonical: `/projects/${project.slug}`,
    },
    openGraph: {
      title: project.title,
      description: project.description,
      url: `${siteUrl}/projects/${project.slug}`,
      images: [{ url: project.imageSrc, alt: project.title }],
    },
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  return (
    <main className="pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Button asChild variant="ghost" className="mb-8 pl-0 hover:bg-transparent">
          <Link href="/projects" className="flex items-center text-muted-foreground hover:text-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Link>
        </Button>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="relative mb-8 h-64 w-full overflow-hidden rounded-lg border border-border md:h-96">
              <Image
                src={project.imageSrc}
                alt={project.title}
                fill
                priority
                sizes="(min-width: 1024px) 66vw, 100vw"
                className="object-cover object-top"
              />
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">{project.title}</h1>
            <p className="text-muted-foreground mb-8 leading-relaxed">{project.description}</p>

            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-6 h-fit">
            <h2 className="text-xl font-bold mb-6">Project Links</h2>
            <div className="flex flex-col gap-3">
              <Button asChild className="w-full">
                <Link href={project.link} target="_blank" rel="noopener noreferrer">
                  Live Demo
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              {project.githubLink ? (
                <Button asChild variant="outline" className="w-full">
                  <Link href={project.githubLink} target="_blank" rel="noopener noreferrer">
                    View Code
                    <Github className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              ) : null}
              <Button asChild variant="outline" className="w-full">
                <Link href="/#contact">Discuss a Similar Project</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
