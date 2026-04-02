"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowDownRight, ArrowRight, Download, Github, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { useMenu } from "@/context/menu-context"
import Logo from "./logo"

export function Navbar() {
  const { isMenuOpen, setIsMenuOpen } = useMenu()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [activeSection, setActiveSection] = useState("home")
  const lastScrollY = useRef(0)
  const scrollPositionRef = useRef(0)
  const pathname = usePathname()
  const isHomePage = pathname === "/"

  // Bloquea completamente el scroll del documento cuando el menú móvil está abierto.
  useEffect(() => {
    const { body, documentElement } = document

    if (isMenuOpen) {
      scrollPositionRef.current = window.scrollY

      body.style.position = "fixed"
      body.style.top = `-${scrollPositionRef.current}px`
      body.style.left = "0"
      body.style.right = "0"
      body.style.width = "100%"
      body.style.overflow = "hidden"
      body.style.touchAction = "none"

      documentElement.style.overflow = "hidden"
      documentElement.style.overscrollBehavior = "none"
    } else {
      const scrollY = Math.abs(parseInt(body.style.top || "0", 10)) || scrollPositionRef.current

      body.style.position = ""
      body.style.top = ""
      body.style.left = ""
      body.style.right = ""
      body.style.width = ""
      body.style.overflow = ""
      body.style.touchAction = ""

      documentElement.style.overflow = ""
      documentElement.style.overscrollBehavior = ""

      window.scrollTo(0, scrollY)
    }

    return () => {
      body.style.position = ""
      body.style.top = ""
      body.style.left = ""
      body.style.right = ""
      body.style.width = ""
      body.style.overflow = ""
      body.style.touchAction = ""

      documentElement.style.overflow = ""
      documentElement.style.overscrollBehavior = ""
    }
  }, [isMenuOpen])

  useEffect(() => {
    let ticking = false

    const updateOnScroll = () => {
      const currentScrollY = window.scrollY;
      
      setIsScrolled((previous) => {
        const nextValue = currentScrollY > 10
        return previous === nextValue ? previous : nextValue
      })
      
      if (currentScrollY < 10) {
        setIsVisible((previous) => (previous ? previous : true))
      } else if (currentScrollY < lastScrollY.current) {
        setIsVisible((previous) => (previous ? previous : true))
      } else if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsVisible((previous) => (previous ? false : previous))
      }
      
      lastScrollY.current = currentScrollY;

      if (isHomePage) {
        const sections = ["home", "about", "experience", "projects", "testimonials", "contact"]

        const homeElement = document.getElementById("home")
        if (homeElement) {
          const homeRect = homeElement.getBoundingClientRect()
          if (homeRect.top <= 100 && homeRect.bottom > window.innerHeight / 2) {
            setActiveSection((previous) => (previous === "home" ? previous : "home"))
            ticking = false
            return
          }
        }

        for (const section of [...sections].reverse()) {
          if (section === "home") continue
          const element = document.getElementById(section)
          if (element) {
            const rect = element.getBoundingClientRect()
            if (rect.top <= 100) {
              setActiveSection((previous) => (previous === section ? previous : section))
              break
            }
          }
        }
      }

      ticking = false
    }

    const handleScroll = () => {
      if (ticking) return

      ticking = true
      window.requestAnimationFrame(updateOnScroll)
    }

    updateOnScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => window.removeEventListener("scroll", handleScroll)
  }, [isHomePage])

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  // Generate the appropriate href for navigation links
  const getHref = (section: string) => {
    return isHomePage ? `#${section}` : `/#${section}`
  }

  // Estilo común para los enlaces del menú con underline en hover
  const menuLinkStyle = `relative hover:text-primary transition-colors
    after:absolute after:left-0 after:right-0 after:bottom-[-8px] after:h-[2px] 
    after:bg-primary after:scale-x-0 hover:after:scale-x-100 
    after:transition-transform after:duration-300 after:origin-center`;

  return (
    <header
      className={`navbar-header fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-4"
      } ${isVisible && !isMenuOpen ? "translate-y-0" : isMenuOpen ? "translate-y-0" : "-translate-y-full"}`}
      style={{ pointerEvents: "auto" }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo estático sin animaciones */}
          <div className="z-[102]">
            <Link href="/" className="text-xl font-bold">
              <Logo />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Link
                href={getHref("about")}
                className={`text-sm ${menuLinkStyle} ${
                  activeSection === "about" && isHomePage ? "text-primary font-medium" : ""
                }`}
              >
                About
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link
                href={getHref("experience")}
                className={`text-sm ${menuLinkStyle} ${
                  activeSection === "experience" && isHomePage ? "text-primary font-medium" : ""
                }`}
              >
                Experience
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link
                href={getHref("projects")}
                className={`text-sm ${menuLinkStyle} ${
                  activeSection === "projects" && isHomePage ? "text-primary font-medium" : ""
                }`}
              >
                Projects
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Link
                href={getHref("contact")}
                className={`text-sm ${menuLinkStyle} ${
                  activeSection === "contact" && isHomePage ? "text-primary font-medium" : ""
                }`}
              >
                Contact
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <ThemeToggle />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <Button asChild variant="outline" className="border-foreground bg-background/20 z-20 hover:bg-background/30">
                <Link href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center">
                  PDF
                  <Download className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </nav>

          {/* Mobile Menu Button y ThemeToggle con z-index alto para que permanezcan visibles */}
          <div className="md:hidden flex items-center space-x-4 z-[102]">
            <ThemeToggle />
            <button 
              className="focus:outline-none relative" 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              aria-label="Toggle menu"
            >
              <div className="relative w-12 h-8 flex justify-center items-center">
                {/* Primera línea */}
                <div 
                  className="absolute h-0.5 bg-foreground rounded-full w-12 transition-all duration-300"
                  style={{ 
                    transform: isMenuOpen ? 'translateY(0) rotate(45deg)' : 'translateY(-4px) rotate(0)',
                  }} 
                />
                
                {/* Segunda línea */}
                <div 
                  className="absolute h-0.5 bg-foreground rounded-full w-12 transition-all duration-300"
                  style={{ 
                    transform: isMenuOpen ? 'translateY(0) rotate(-45deg)' : 'translateY(4px) rotate(0)',
                  }} 
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation - Ahora sin duplicar el logo y el toggle theme */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed top-0 left-0 w-full h-screen bg-background/95 backdrop-blur-md z-[101] flex flex-col pt-24"
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
          >
            {/* Contenido del menú móvil - sin la barra superior */}
            <div className="flex-1 flex items-start mt-20 justify-center overflow-auto">
              <nav className="container mx-auto flex flex-col space-y-2 px-20">
                <Link
                  href={getHref("about")}
                  className={`text-foreground text-xl font-medium relative ${menuLinkStyle} py-3 ${
                    activeSection === "about" && isHomePage ? "text-primary font-bold" : ""
                  }`}
                  onClick={closeMenu}
                >
                  About
                </Link>
                <Link
                  href={getHref("experience")}
                  className={`text-foreground text-xl font-medium relative ${menuLinkStyle} py-3 ${
                    activeSection === "experience" && isHomePage ? "text-primary font-bold" : ""
                  }`}
                  onClick={closeMenu}
                >
                  Experience
                </Link>
                <Link
                  href={getHref("projects")}
                  className={`text-foreground text-xl font-medium relative ${menuLinkStyle} py-3 ${
                    activeSection === "projects" && isHomePage ? "text-primary font-bold" : ""
                  }`}
                  onClick={closeMenu}
                >
                  Projects
                </Link>
                <Link
                  href={getHref("contact")}
                  className={`text-foreground text-xl font-medium relative ${menuLinkStyle} py-3 ${
                    activeSection === "contact" && isHomePage ? "text-primary font-bold" : ""
                  }`}
                  onClick={closeMenu}
                >
                  Contact
                </Link>
              </nav>
              <div className="flex flex-col gap-2 mr-10">
                <Button asChild className="w-full py-6 text-lg" onClick={closeMenu} variant="link">
                  <Link href={getHref("contact")}><Linkedin className="w-5 h-5" /></Link>
                </Button>
                <Button asChild className="w-full py-6 text-lg" onClick={closeMenu} variant="link">
                  <Link href={getHref("contact")}><Github className="w-5 h-5" /></Link>
                </Button>
                <Button asChild className="w-full py-6 text-lg" onClick={closeMenu} variant="link">
                  <Link href={getHref("contact")}>PDF <ArrowDownRight className="w-7 h-7" /></Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
