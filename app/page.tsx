"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Download, ArrowDownRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AnimatedCounter } from "@/components/animated-counter"
import { AnimatedText } from "@/components/animated-text"
import { ExperienceTimeline } from "@/components/experience-timeline"
import { ProjectFilter } from "@/components/project-filter"
import { ScrollToTop } from "@/components/scroll-to-top"
import { FilteredProjects } from "@/components/filtered-projects"
import { ProjectsProvider } from "@/context/projects-context"
import dynamic from "next/dynamic"

const ContactForm = dynamic(() => import("@/components/contact-form").then((mod) => mod.ContactForm))
const ContactIconLinks = dynamic(() =>
  import("@/components/contact-icon-links").then((mod) => mod.ContactIconLinks),
)
const TechLogosCarousel = dynamic(() =>
  import("@/components/tech-logos-carousel").then((mod) => mod.TechLogosCarousel),
)

const Threads = dynamic(() => import("@/components/ui/threads-bg"), {
  ssr: false,
      loading: () => (
    <div
      className="absolute inset-0 bg-gradient-to-b from-muted/50 via-background/80 to-muted/30"
      aria-hidden
    />
  ),
})

const siteStackSections = [
  {
    title: "Core",
    items: ["Next.js 15", "React 19", "TypeScript"],
  },
  {
    title: "UI & Design",
    items: ["Tailwind CSS", "shadcn/ui", "Lucide Icons"],
  },
  {
    title: "Animation & Interaction",
    items: ["Framer Motion", "OGL background effects"],
  },
  {
    title: "Forms & Validation",
    items: ["React Hook Form", "Zod"],
  },
  {
    title: "SEO",
    items: ["Next.js Metadata API", "Open Graph + Twitter Cards", "robots.txt + sitemap.xml"],
  },
  {
    title: "Quality & Testing",
    items: ["Playwright", "E2E coverage for homepage + main routes"],
  },
]

export default function Home() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  return (
    <main className="relative overflow-x-hidden w-full">
      <ScrollToTop />

      {/* Hero Section */}
      <section
        ref={ref}
        id="home"
        className="hero-viewport relative flex items-center justify-center overflow-hidden bg-background"
      >
        <motion.div style={{ y, opacity }} className="hero-background">
          <Threads enableMouseInteraction={true} />
          <div className="absolute inset-0 bg-foreground/10 z-10 pointer-events-none" />
        </motion.div>

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 pt-[env(safe-area-inset-top)]">
          <div className="max-w-4xl mx-auto text-center p-4 md:p-10">
            <motion.div initial={{ opacity: 1, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                <AnimatedText text="Hello!👋🏼" />
                <AnimatedText text="I'm Vladislav Titov" />
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 1, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.12 }}
            >
              <p className="text-lg md:text-xl text-foreground/90 mb-8 max-w-2xl text-left text-pretty">
                I'm a <span className="italic">frontend developer</span> with <span className="font-bold">6+ years of experience</span> in Quality Assurance.
                I've worked with a wide range of clients and technologies, and I'm always looking for new challenges and opportunities to grow.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 1, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.24 }}
              className="flex flex-col sm:flex-row gap-4 justify-left"
            >
              <Button asChild size="lg" className="group">
                <Link href="#projects">
                  Explore My Work
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 mt-1" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-secondary-foreground text-foreground hover:bg-secondary/40 bg-secondary/20">
                <Link href="#contact">Get in Touch</Link>
              </Button>
            </motion.div>
          </div>
        </div>

        <motion.div
          className="absolute inset-x-0 bottom-[max(6rem,calc(env(safe-area-inset-bottom)+4rem))] flex justify-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
        >
          <div className="w-6 h-8 rounded-full border-2 border-foreground flex justify-center items-start p-1">
            <div className="w-1 h-2 bg-foreground rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
                About <span className="text-primary">Me</span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p className="text-muted-foreground mb-2 leading-relaxed px-4 text-left md:text-center">
                Based in Buenos Aires, Argentina for more than 25 years, my expertise lies in crafting exceptional, functional, and accessible web experiences that delight users.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center px-4">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="relative h-[500px] w-full rounded-lg overflow-hidden shadow-md"
            >
              <Image
                src="/vlad.png"
                alt="Portrait photo"
                fill
                priority
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </motion.div>

            <div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8">
                <div className="text-center">
                  <h4 className="text-3xl font-bold text-primary mb-2">
                    <AnimatedCounter from={0} to={6} duration={2} />+
                  </h4>
                  <p className="text-sm text-muted-foreground">Years Experience</p>
                </div>
                <div className="text-center">
                  <h4 className="text-3xl font-bold text-primary mb-2">
                    <AnimatedCounter from={0} to={50} duration={2} />+
                  </h4>
                  <p className="text-sm text-muted-foreground">Sprints</p>
                </div>
                <div className="text-center">
                  <h4 className="text-3xl font-bold text-primary mb-2">
                    <AnimatedCounter from={0} to={30} duration={2} />+
                  </h4>
                  <p className="text-sm text-muted-foreground">Happy Clients</p>
                </div>
                <div className="text-center">
                  <h4 className="text-3xl font-bold text-primary mb-2">
                    <AnimatedCounter from={0} to={2} duration={2} />
                  </h4>
                  <p className="text-sm text-muted-foreground">Cats 😺</p>
                </div>
              </div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  With over 8 years of total experience in software development and customer support, I've worked on a variety of projects
                  from small business websites to large-scale applications. My approach combines technical expertise
                  with creative problem-solving to deliver solutions that escalate the business value.
                </p>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  I'm passionate about creating accessible, user-friendly interfaces that provide seamless experiences
                  across all devices. When I'm not coding, you can find me exploring new design trends, contributing to
                  open-source projects, or experimenting with new technologies.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-12 md:pt-32 bg-gradient-to-b from-muted/30 to-background ">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
                Work <span className="text-primary">Experience</span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p className="text-secondary-foreground/70 mb-8 leading-relaxed">
                This is some of professional journey in the tech industry.
              </p>
            </motion.div>
          </div>

          <div className="max-w-4xl mx-auto">
            <ExperienceTimeline />
          </div>

          <div className="mt-12 flex justify-center">
            <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 400 }}>
              <Button variant="outline" size="icon" asChild>
                <Link href="/resume.pdf" target="_blank" rel="noopener noreferrer" aria-label="Download Resume">
                  <Download className="h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </div>

          {/* Technologies Section (moved to bottom of Experience) */}
          <div className="pt-10 pb-16 md:pt-8 md:pb-16 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              {/* Technology Logos Carousel */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <TechLogosCarousel />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="pt-20 pb-24 md:pt-32 md:pb-32 bg-muted/30 mt-10">
        <ProjectsProvider>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
                Featured <span className="text-primary">Projects</span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p className="text-muted-foreground mb-8 leading-relaxed">
                A selection of my recent work showcasing my skills in design, development, and animation.
              </p>
            </motion.div>

            <ProjectFilter />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FilteredProjects />
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
          </div>
        </ProjectsProvider>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
                Client <span className="text-primary">Testimonials</span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p className="text-muted-foreground mb-8 leading-relaxed px-4 md:px-0">
                What clients and colleagues have to say about working with me.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-card p-8 rounded-lg shadow-sm border"
            >
              <div className="flex flex-col h-full">
                <div className="mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-muted-foreground italic mb-6 flex-grow">
                  "I am very happy with Vlad's work in the design and development of my apartments website. 
                  He was able to capture exactly what I needed, creating a functional, attractive and easy to use site for both me and my guests. 
                  His professionalism, creativity and attention to detail made the process smooth and seamless. I would definitely recommend him to anyone looking for a committed and efficient web developer."
                </p>
                <div>
                  <p className="font-semibold">Yasmin N.</p>
                  <p className="text-sm text-muted-foreground">Owner, Luna Huapi</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-card p-8 rounded-lg shadow-sm border"
            >
              <div className="flex flex-col h-full">
                <div className="mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-muted-foreground italic mb-6 flex-grow">
                  "Working with Vlad was a pleasure. He understood my vision immediately and transformed it into a beautiful, functional website that exceeded my expectations.
                  He also developed a website for my label Fabric Zero, which was a great experience and I love the result.
                  I've worked with many developers, but Vlad is one of the best I've had the privilege of working with."
                </p>
                <div>
                  <p className="font-semibold">Juan Elvadin</p>
                  <p className="text-sm text-muted-foreground">Musical Artist, Fabric Zero</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-card p-8 rounded-lg shadow-sm border"
            >
              <div className="flex flex-col h-full">
                <div className="mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-muted-foreground italic mb-6 flex-grow">
                  "Vladislav is a proactive, fast learner, and a true team player. I had the pleasure of working with him and was always impressed by his ability to adapt quickly, communicate assertively, and collaborate effectively. His respectful and solution-oriented approach made him a valuable addition to our team. Any company would be lucky to have him!"
                </p>
                <div>
                  <p className="font-semibold">Noelia Conti</p>
                  <p className="text-sm text-muted-foreground">QA Engineer, Collegue</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="pt-24 pb-10 md:py-32 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto text-center mb-10 md:mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
              Get in <span className="text-primary">Touch</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed text-pretty">
              Tell me about your project in the form below, or reach out through email and socials.
            </p>
          </motion.div>

          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-10">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-3 rounded-lg border border-border bg-card p-6 md:p-8"
            >
              <h3 className="text-lg font-semibold mb-1">Send a message</h3>
              <p className="text-sm text-muted-foreground mb-6">I usually reply within a couple of days.</p>
              <ContactForm />
            </motion.div>

            <motion.aside
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col justify-center lg:col-span-2"
            >
              <p className="text-sm font-medium text-foreground mb-1">Other channels</p>
              <p className="text-sm text-muted-foreground mb-5">
                Tap an icon to open email, LinkedIn, or GitHub.
              </p>
              <ContactIconLinks size="md" />
            </motion.aside>
          </div>
        </div>
      </section>

      {/* Stack Markdown Section */}
      <section id="stack" className="pt-20 pb-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="max-w-5xl mx-auto"
          >
            <div className="mb-8 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
                Built With <span className="text-primary">This Stack</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                A quick technical snapshot of the main technologies I've used in my portfolio.
              </p>
            </div>

            <div className="overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm">
              <div className="flex items-center gap-2 border-b border-border/70 bg-muted/50 px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-red-400/80" />
                <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
                <span className="h-3 w-3 rounded-full bg-green-400/80" />
                <p className="ml-2 text-xs uppercase tracking-[0.22em] text-muted-foreground">stack.md</p>
              </div>

              <div className="space-y-6 p-6 md:p-8 font-mono text-sm leading-7 text-foreground/90">
                <div className="space-y-2">
                  <p className="text-primary"># Technologies used in this website</p>
                  <p className="text-muted-foreground">A modern portfolio focused on performance, motion and clean UI.</p>
                </div>

                {siteStackSections.map((section) => (
                  <div key={section.title} className="space-y-2">
                    <p className="text-primary/90">## {section.title}</p>
                    <ul className="space-y-1 text-muted-foreground">
                      {section.items.map((item) => (
                        <li key={item}>- {item}</li>
                      ))}
                    </ul>
                  </div>
                ))}

                <div className="rounded-xl border border-border/60 bg-background/80 p-4">
                  <p className="text-primary/90">```txt</p>
                  <p className="text-muted-foreground">Next.js + React + TypeScript + Tailwind + shadcn/ui</p>
                  <p className="text-muted-foreground">+ Framer Motion + React Hook Form + Zod</p>
                  <p className="text-primary/90">```</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
