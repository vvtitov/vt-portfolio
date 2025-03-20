"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const pathname = usePathname()
  const isHomePage = pathname === "/"

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }

      // Only update active section on home page
      if (isHomePage) {
        // Update active section based on scroll position
        const sections = ["home", "about", "experience", "skills", "projects", "testimonials", "contact"]

        for (const section of sections.reverse()) {
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
  }, [isHomePage])

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  // Generate the appropriate href for navigation links
  const getHref = (section) => {
    return isHomePage ? `#${section}` : `/#${section}`
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <Link href="/" className="text-2xl font-bold">
              <span className="text-primary">Vladislav</span> Titov
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
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button asChild>
                <Link href={getHref("contact")}>Hire Me</Link>
              </Button>
            </motion.div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle />
            <button className="focus:outline-none" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
              {isMenuOpen ? <X className="h-6 w-6 hover:rotate-3" /> : <Menu className="h-6 w-6 hover:rotate-3" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md shadow-md"
          >
            <nav className="container mx-auto px-4 py-6 flex flex-col space-y-4">
              <Link
                href={getHref("about")}
                className={`text-foreground text-sm hover:text-primary transition-colors py-2 ${
                  activeSection === "about" && isHomePage ? "text-primary font-medium" : ""
                }`}
                onClick={closeMenu}
              >
                About
              </Link>
              <Link
                href={getHref("experience")}
                className={`text-foreground text-sm hover:text-primary transition-colors py-2 ${
                  activeSection === "experience" && isHomePage ? "text-primary font-medium" : ""
                }`}
                onClick={closeMenu}
              >
                Experience
              </Link>
              <Link
                href={getHref("skills")}
                className={`text-foreground text-sm hover:text-primary transition-colors py-2 ${
                  activeSection === "skills" && isHomePage ? "text-primary font-medium" : ""
                }`}
                onClick={closeMenu}
              >
                Skills
              </Link>
              <Link
                href={getHref("projects")}
                className={`text-foreground text-sm hover:text-primary transition-colors py-2 ${
                  activeSection === "projects" && isHomePage ? "text-primary font-medium" : ""
                }`}
                onClick={closeMenu}
              >
                Projects
              </Link>
              <Link
                href={getHref("testimonials")}
                className={`text-foreground text-sm hover:text-primary transition-colors py-2 ${
                  activeSection === "testimonials" && isHomePage ? "text-primary font-medium" : ""
                }`}
                onClick={closeMenu}
              >
                Testimonials
              </Link>
              <Link
                href={getHref("contact")}
                className={`text-foreground text-sm hover:text-primary transition-colors py-2 ${
                  activeSection === "contact" && isHomePage ? "text-primary font-medium" : ""
                }`}
                onClick={closeMenu}
              >
                Contact
              </Link>
              <Button asChild className="w-full" onClick={closeMenu}>
                <Link href={getHref("contact")}>Hire Me</Link>
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
