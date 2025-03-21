"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowDownRight, ArrowRight, Download, Github, Linkedin, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { useMenu } from "@/context/menu-context"
import Image from "next/image"
import Logo from "./logo"

export function Navbar() {
  const { isMenuOpen, setIsMenuOpen } = useMenu()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [activeSection, setActiveSection] = useState("home")
  const pathname = usePathname()
  const isHomePage = pathname === "/"

  // Prevenir scroll cuando el menú móvil está abierto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Determinar si está scrolleado
      if (currentScrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      
      // Determinar dirección del scroll y visibilidad
      if (currentScrollY < 10) {
        // Siempre visible en la parte superior
        setIsVisible(true);
      } else if (currentScrollY < lastScrollY) {
        // Scrolleando hacia arriba - mostrar navbar
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolleando hacia abajo y no en la parte superior - ocultar navbar
        setIsVisible(false);
      }
      
      // Actualizar la posición del último scroll
      setLastScrollY(currentScrollY);

      // Only update active section on home page
      if (isHomePage) {
        // Update active section based on scroll position
        const sections = ["home", "about", "experience", "skills", "projects", "testimonials", "contact"]

        // Verificar primero si estamos en la sección "home" (hero)
        const homeElement = document.getElementById("home")
        if (homeElement) {
          const homeRect = homeElement.getBoundingClientRect()
          // Si la parte superior de la sección home está visible y cerca del borde superior
          if (homeRect.top <= 100 && homeRect.bottom > window.innerHeight / 2) {
            setActiveSection("home")
            return
          }
        }

        // Si no estamos en home, verificar las demás secciones
        for (const section of sections.reverse()) {
          if (section === "home") continue; // Ya verificamos home arriba
          const element = document.getElementById(section)
          if (element) {
            const rect = element.getBoundingClientRect()
            if (rect.top <= 100) {
              setActiveSection(section)
              break
            }
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isHomePage, lastScrollY])

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  // Generate the appropriate href for navigation links
  const getHref = (section: string) => {
    return isHomePage ? `#${section}` : `/#${section}`
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-6"
      } ${isVisible && !isMenuOpen ? "translate-y-0" : isMenuOpen ? "translate-y-0" : "-translate-y-full"}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <Link href="/" className="text-2xl font-bold">
              <Logo />
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Link
                href={getHref("about")}
                className={`text-sm hover:text-primary transition-colors ${
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
                className={`text-sm hover:text-primary transition-colors ${
                  activeSection === "experience" && isHomePage ? "text-primary font-medium" : ""
                }`}
              >
                Experience
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link
                href={getHref("skills")}
                className={`text-sm hover:text-primary transition-colors ${
                  activeSection === "skills" && isHomePage ? "text-primary font-medium" : ""
                }`}
              >
                Skills
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link
                href={getHref("projects")}
                className={`text-sm hover:text-primary transition-colors ${
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
                className={`text-sm hover:text-primary transition-colors ${
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
                  PDF Resume
                  <Download className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle />
            <button 
              className="focus:outline-none z-[101] relative" 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6 hover:rotate-3" /> : <Menu className="h-6 w-6 hover:rotate-3" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed top-0 left-0 w-full h-screen bg-background/95 backdrop-blur-md z-[100] flex flex-col items-center justify-center overflow-hidden"
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
          >
            <nav className="container mx-auto flex flex-col space-y-3">
              <Link
                href={getHref("about")}
                className={`text-foreground text-xl font-medium hover:text-primary transition-colors py-3 ${
                  activeSection === "about" && isHomePage ? "text-primary font-bold" : ""
                }`}
                onClick={closeMenu}
              >
                About
              </Link>
              <Link
                href={getHref("experience")}
                className={`text-foreground text-xl font-medium hover:text-primary transition-colors py-3 ${
                  activeSection === "experience" && isHomePage ? "text-primary font-bold" : ""
                }`}
                onClick={closeMenu}
              >
                Experience
              </Link>
              <Link
                href={getHref("skills")}
                className={`text-foreground text-xl font-medium hover:text-primary transition-colors py-3 ${
                  activeSection === "skills" && isHomePage ? "text-primary font-bold" : ""
                }`}
                onClick={closeMenu}
              >
                Skills
              </Link>
              <Link
                href={getHref("projects")}
                className={`text-foreground text-xl font-medium hover:text-primary transition-colors py-3 ${
                  activeSection === "projects" && isHomePage ? "text-primary font-bold" : ""
                }`}
                onClick={closeMenu}
              >
                Projects
              </Link>
              <Link
                href={getHref("testimonials")}
                className={`text-foreground text-xl font-medium hover:text-primary transition-colors py-3 ${
                  activeSection === "testimonials" && isHomePage ? "text-primary font-bold" : ""
                }`}
                onClick={closeMenu}
              >
                Testimonials
              </Link>
              <Link
                href={getHref("contact")}
                className={`text-foreground text-xl font-medium hover:text-primary transition-colors py-3 ${
                  activeSection === "contact" && isHomePage ? "text-primary font-bold" : ""
                }`}
                onClick={closeMenu}
              >
                Contact
              </Link>
            </nav>
            <div className="grid grid-cols-3 gap-2 pt-20 justify-center items-center mx-auto">
              <Button asChild className="w-full py-6 text-lg hover:scale-110 transition-transform" onClick={closeMenu} variant="link">
                <Link href={getHref("contact")}><Linkedin className="w-5 h-5" /></Link>
              </Button>
              <Button asChild className="w-full py-6 text-lg hover:scale-110 transition-transform" onClick={closeMenu} variant="link">
                <Link href={getHref("contact")}><Github className="w-5 h-5" /></Link>
              </Button>
              <Button asChild className="w-full py-6 text-lg" onClick={closeMenu} variant="link">
                <Link href={getHref("contact")}>PDF <ArrowDownRight className="w-7 h-7" /></Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
