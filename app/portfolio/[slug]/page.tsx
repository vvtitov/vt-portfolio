import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"

interface ProjectPageProps {
  params: {
    slug: string
  }
}

export default function ProjectPage({ params }: ProjectPageProps) {
  // In a real app, you would fetch project data based on the slug
  const project = {
    title: "Luminance Residence",
    category: "Interior Design",
    description:
      "A modern residential project that balances minimalism with warmth, creating a sophisticated living environment that reflects the client's lifestyle and aesthetic preferences.",
    client: "Private Client",
    location: "New York, NY",
    year: "2023",
    services: ["Interior Design", "Furniture Selection", "Lighting Design"],
    images: [
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
    ],
  }

  return (
    <main className="pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Button asChild variant="ghost" className="mb-8 pl-0 hover:bg-transparent">
          <Link href="/portfolio" className="flex items-center text-gray-600 hover:text-black">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Portfolio
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <h1 className="text-3xl md:text-4xl font-light mb-4 tracking-tight">{project.title}</h1>
            <p className="text-gray-600 mb-8">{project.category}</p>
            <p className="text-gray-800 mb-8 leading-relaxed">{project.description}</p>
          </div>

          <div className="bg-gray-50 p-6">
            <h2 className="text-xl font-medium mb-6">Project Details</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Client</p>
                <p className="font-medium">{project.client}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Location</p>
                <p className="font-medium">{project.location}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Year</p>
                <p className="font-medium">{project.year}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Services</p>
                <ul className="list-disc list-inside">
                  {project.services.map((service, index) => (
                    <li key={index} className="font-medium">
                      {service}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 space-y-12">
          {project.images.map((image, index) => (
            <div key={index} className="relative h-[600px] w-full">
              <Image
                src={image || "/placeholder.svg"}
                alt={`${project.title} - Image ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-light mb-8">Interested in working with us?</h2>
          <Button asChild size="lg" className="rounded-none px-8 bg-black hover:bg-gray-800">
            <Link href="#contact">Get in Touch</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}

