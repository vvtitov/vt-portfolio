import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { ServiceCard } from "@/components/service-card"
import { Button } from "@/components/ui/button"
import { skills } from "@/data/skills"

export default function ServicesPage() {
  return (
    <main className="pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
            Development <span className="text-primary">Services</span>
          </h1>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Frontend development, UI implementation, and quality-focused delivery for products that need to ship fast
            and stay maintainable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          <ServiceCard
            title="Frontend Development"
            description="Responsive web apps with React, Next.js, and TypeScript — from landing pages to product dashboards."
            icon="Code2"
          />
          <ServiceCard
            title="UI Implementation"
            description="Pixel-accurate builds from Figma or design systems using Tailwind CSS, shadcn/ui, and accessible patterns."
            icon="Layout"
          />
          <ServiceCard
            title="Motion & Interaction"
            description="Meaningful animation with Framer Motion and performance-conscious effects that support the brand."
            icon="Palette"
          />
          <ServiceCard
            title="QA & Test Automation"
            description="Playwright E2E suites, regression coverage, and shift-left practices from 6+ years in quality assurance."
            icon="TestTube2"
          />
          <ServiceCard
            title="Performance & SEO"
            description="Core Web Vitals improvements, metadata, sitemaps, and production-ready Next.js deployments on Vercel."
            icon="Gauge"
          />
          <ServiceCard
            title="Integrations"
            description="APIs, Supabase, auth flows, contact forms with Resend, analytics, and i18n when your product needs them."
            icon="Code2"
          />
        </div>

        <section className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center tracking-tight">
            Core <span className="text-primary">Skills</span>
          </h2>
          <div className="space-y-4">
            {skills.map((skill) => (
              <div key={skill.name} className="rounded-lg border border-border bg-card p-4">
                <div className="mb-2 flex items-center justify-between gap-4">
                  <span className="font-medium">{skill.name}</span>
                  <span className="text-sm text-muted-foreground">{skill.percentage}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{ width: `${skill.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button asChild size="lg" className="group">
              <Link href="/#contact">
                Start a Project
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </main>
  )
}
