"use client"

import { motion } from "framer-motion"
import { Briefcase } from "lucide-react"
import SpotlightCard from "./ui/spotlight-card"

export function ExperienceTimeline() {
  const experiences = [
    {
      id: 1,
      role: "Frontend Developer",
      company: "Three Mangos Agency",
      period: "April 2024 – Present",
      description:
        "Built mobile-first sites with React and stacks including Next.js, Vite, TanStack, and T3. Delivered system designs with CSS frameworks, performance work (lazy loading, code splitting, fewer HTTP requests), and global state with Redux and Zustand. Integrated REST APIs with auth and error handling; connected frontends to Firebase, Supabase, and SQL/NoSQL backends. Wrote tests with Jest and Playwright, set up CI/CD in Azure DevOps from scratch, added i18n (react-intl / i18next), and analytics (Google Analytics, Hotjar, tracking). Led live demos with stakeholders.",
      technologies: [
        "React",
        "Next.js",
        "Vite",
        "TanStack",
        "T3 Stack",
        "Redux",
        "Zustand",
        "REST",
        "Firebase",
        "Supabase",
        "Jest",
        "Playwright",
        "Azure DevOps",
        "i18n",
      ],
    },
    {
      id: 2,
      role: "QA Analyst",
      company: "MediaMonks",
      period: "December 2018 – March 2024",
      description:
        "Functional and visual testing on web and mobile. Shift-left testing, strong documentation, test plans and cases. Automated APIs with Postman; SQL for data integrity; helped maintain Playwright E2E. Led demos and defect reviews with stakeholders. Jira, X-Ray, and Agile delivery.",
      technologies: ["Postman", "SQL", "Playwright", "Jira", "X-Ray", "Agile", "BrowserStack"],
    },
    {
      id: 3,
      role: "QA Tester",
      company: "Greylab",
      period: "2017 - 2018",
      description:
        "Conducted thorough testing of web applications to identify and resolve bugs and performance issues. Developed and executed test plans, ensuring high-quality standards and compliance with industry best practices.",
      technologies: ["HTML", "CSS", "JavaScript", "Jira", "Waterfall", "Postman"],
    },
    {
      id: 4,
      role: "WordPress Developer",
      company: "Freelance",
      period: "2015 - 2017",
      description:
        "Developed and maintained websites for small to medium-sized businesses. Implemented responsive designs and ensured cross-browser compatibility and accessibility compliance.",
      technologies: ["HTML", "CSS", "JavaScript", "WordPress", "PHP", "Adobe"],  
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
          <div className={`md:w-1/2 ${index % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"} pl-16 md:pl-0`}>
            <SpotlightCard className="bg-muted/80 rounded-lg shadow-sm border">
              <div className="p-6 text-left">
                <h3 className="text-xl font-bold">{exp.role}</h3>
                <p className="text-primary font-medium">{exp.company}</p>
                <p className="text-sm text-muted-foreground mb-4">{exp.period}</p>
                <p className="text-muted-foreground mb-4">{exp.description}</p>
                <div className="flex flex-wrap gap-2 justify-start">
                  {exp.technologies.map((tech) => (
                    <span key={tech} className="text-xs px-2 py-1 bg-primary/10 rounded-full text-muted-foreground">
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
