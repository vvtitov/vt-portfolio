"use client"

import { motion } from "framer-motion"
import { Briefcase } from "lucide-react"
import SpotlightCard from "../app/components/ui/SpotlightCard/SpotlightCard"

export function ExperienceTimeline() {
  const experiences = [
    {
      id: 1,
      role: "Senior Frontend Developer",
      company: "Tech Innovations Inc.",
      period: "2021 - Present",
      description:
        "Lead the frontend development team in creating responsive, accessible web applications using React and Next.js. Implemented performance optimizations resulting in a 40% improvement in load times.",
      technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    },
    {
      id: 2,
      role: "UI/UX Developer",
      company: "Creative Solutions Agency",
      period: "2019 - 2021",
      description:
        "Designed and developed user interfaces for various client projects. Collaborated with designers to implement pixel-perfect, responsive designs with smooth animations and interactions.",
      technologies: ["JavaScript", "React", "SCSS", "Figma", "GSAP"],
    },
    {
      id: 3,
      role: "Web Developer",
      company: "Digital Craft Studio",
      period: "2017 - 2019",
      description:
        "Developed and maintained websites for small to medium-sized businesses. Implemented responsive designs and ensured cross-browser compatibility and accessibility compliance.",
      technologies: ["HTML", "CSS", "JavaScript", "WordPress", "PHP"],
    },
  ]

  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-border" />

      {experiences.map((exp, index) => (
        <motion.div
          key={exp.id}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
          className={`relative flex flex-col md:flex-row gap-8 mb-12 ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}
        >
          {/* Timeline dot */}
          <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-background border-2 border-primary flex items-center justify-center">
            <Briefcase className="h-5 w-5 text-primary" />
          </div>

          {/* Content */}
          <div className={`md:w-1/2 ${index % 2 === 0 ? "md:pr-16 text-right" : "md:pl-16"} pl-16 md:pl-0`}>
            <SpotlightCard className="bg-muted/80 rounded-lg shadow-sm border">
              <div className="p-6">
                <h3 className="text-xl font-bold">{exp.role}</h3>
                <p className="text-primary font-medium">{exp.company}</p>
                <p className="text-sm text-muted-foreground mb-4">{exp.period}</p>
                <p className="text-muted-foreground mb-4">{exp.description}</p>
                <div className="flex flex-wrap gap-2 justify-start">
                  {exp.technologies.map((tech) => (
                    <span key={tech} className="text-xs px-2 py-1 bg-muted rounded-full text-muted-foreground">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </SpotlightCard>
          </div>

          {/* Empty div for layout */}
          <div className="md:w-1/2" />
        </motion.div>
      ))}
    </div>
  )
}
