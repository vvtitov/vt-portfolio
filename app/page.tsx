"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ExternalLink, Github, Linkedin, Mail, Download, ArrowDownRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SkillBar } from "@/components/skill-bar"
import { ContactForm } from "@/components/contact-form"
import { AnimatedCounter } from "@/components/animated-counter"
import { AnimatedText } from "@/components/animated-text"
import { ExperienceTimeline } from "@/components/experience-timeline"
import { ProjectFilter } from "@/components/project-filter"
import { ScrollToTop } from "@/components/scroll-to-top"
import { projects } from "@/data/projects"
import { skills } from "@/data/skills"
import Threads from "@/components/ui/threads-bg"
import dynamic from "next/dynamic"
import { TechLogosCarousel } from "@/components/tech-logos-carousel"
import { useTheme } from "next-themes"
import { FilteredProjects } from "@/components/filtered-projects"

// Importar MetaBalls solo en el cliente
const MetaBalls = dynamic(() => import("@/components/ui/MetaBalls"), { ssr: false })

export default function Home() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const { theme, resolvedTheme } = useTheme()

  return (
    <main className="relative overflow-x-hidden w-full">
      <ScrollToTop />

      {/* Hero Section */}
      <section ref={ref} className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        <motion.div style={{ y, opacity }} className="absolute inset-0 z-0 min-h-full">
          <Threads />
          <div className="absolute inset-0 bg-foreground/10 dark:bg-white/30 z-10 " />
        </motion.div>

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center p-4 md:p-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                <AnimatedText text="Hello!👋🏼" />
                <AnimatedText text="I'm Vladislav Titov" />
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p className="text-lg md:text-xl text-foreground/90 mb-8 max-w-2xl text-left text-pretty">
                I'm a <span className="italic">software developer</span> with <span className="font-bold">6+ years of experience</span> in Quality Assurance.
                I've worked with a wide range of clients and technologies, and I'm always looking for new challenges and opportunities to grow.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-left"
            >
              <Button asChild size="lg" className="group">
                <Link href="#projects">
                  View My Work
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 mt-1" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-secondary-foreground text-foreground hover:bg-white/40 dark:hover:bg-black/20 bg-secondary/20">
                <Link href="#contact">Get in Touch</Link>
              </Button>
            </motion.div>
          </div>
        </div>

        <motion.div
          className="absolute bottom-32 flex mx-auto"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
        >
          <div className="w-6 h-8 rounded-full border-2 border-black dark:border-white flex justify-center items-start p-1">
            <div className="w-1 h-2 bg-black dark:bg-white rounded-full" />
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
              <Image src="/vlad.jpeg" alt="Portrait photo" fill className="object-cover" />
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


              <div className="flex gap-4 items-center justify-center md:justify-start">
                <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 400 }}>
                  <Button variant="outline" size="icon" asChild>
                    <Link href="https://github.com/vvtitov" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                      <Github className="h-5 w-5" />
                    </Link>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 400 }}>
                  <Button variant="outline" size="icon" asChild>
                    <Link href="https://linkedin.com/in/vladislavtitov" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                      <Linkedin className="h-5 w-5" />
                    </Link>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 400 }}>
                  <Button variant="outline" size="icon" asChild>
                    <Link href="mailto:vladislavtitov.r@gmail.com" aria-label="Email">
                      <Mail className="h-5 w-5" />
                    </Link>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 400 }}>
                  <Button variant="outline" size="icon" asChild>
                    <Link href="/resume.pdf" target="_blank" rel="noopener noreferrer" aria-label="Download Resume">
                      <Download className="h-5 w-5" />
                    </Link>
                  </Button>
                </motion.div>
              </div>
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

          <div className="mt-16 text-center">
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="mb-28"
            >              
              <Button asChild variant="outline" className="group border-foreground">
                <Link href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center">
                  Download Resume
                  <Download className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
            <div className="select-none">
              <MetaBalls/>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-12 md:py-32 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
                My <span className="text-primary">Skills</span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p className="text-muted-foreground mb-8 leading-relaxed">
                I've developed expertise in various technologies and design principles, allowing me to create
                comprehensive solutions for web projects.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div className="space-y-6">
              {skills.slice(0, 4).map((skill, index) => (
                <SkillBar key={skill.name} name={skill.name} percentage={skill.percentage} delay={0.1 * (index + 1)} />
              ))}
            </div>
            <div className="space-y-6">
              {skills.slice(4, 8).map((skill, index) => (
                <SkillBar key={skill.name} name={skill.name} percentage={skill.percentage} delay={0.1 * (index + 5)} />
              ))}
            </div>
          </div>

          {/* Technology Logos Carousel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-24"
          >
            <TechLogosCarousel />
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 md:py-32 bg-muted/30">
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
              <p className="text-muted-foreground mb-8 leading-relaxed">
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
                  He also developed a website for my label Essence, which was a great experience and I love the result.
                  I've worked with many developers, but Vlad is one of the best I've had the privilege of working with."
                </p>
                <div>
                  <p className="font-semibold">Juan Elvadin</p>
                  <p className="text-sm text-muted-foreground">Artist & DJ, Essence</p>
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
      <section id="contact" className="py-24 md:py-32 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
                Get in <span className="text-primary">Touch</span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Have a project in mind or want to discuss potential collaborations? I'd love to hear from you!
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <Mail className="h-5 w-5 mr-3 mt-1 text-primary" />
                  <div>
                    <h4 className="font-medium">Email</h4>
                    <p className="text-muted-foreground">vladislavtitov.r@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Linkedin className="h-5 w-5 mr-3 mt-1 text-primary" />
                  <div>
                    <h4 className="font-medium">LinkedIn</h4>
                    <p className="text-muted-foreground">linkedin.com/in/vladislavtitov</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Github className="h-5 w-5 mr-3 mt-1 text-primary" />
                  <div>
                    <h4 className="font-medium">GitHub</h4>
                    <p className="text-muted-foreground">github.com/vvtitov</p>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold mb-6">Let's Connect</h3>
              <p className="text-muted-foreground mb-6">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>

              <div className="flex gap-4">
                <Button asChild className="group">
                  <Link href="mailto:vladislavtitov.r@gmail.com">
                    Send Email
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                    Download Resume
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="bg-card p-8 rounded-lg shadow-sm border"
            >
              <h3 className="text-2xl font-bold mb-6">Send Me a Message</h3>
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  )
}
