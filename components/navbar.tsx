"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { ContactIconLinks } from "@/components/contact-icon-links"
import { useMenu } from "@/context/menu-context"
import Logo from "./logo"

const MOBILE_NAV_LINKS = [
  { href: "about", label: "About" },
  { href: "experience", label: "Experience" },
  { href: "projects", label: "Projects" },
  { href: "contact", label: "Contact" },
] as const

export function Navbar() {
  const { isMenuOpen, setIsMenuOpen } = useMenu()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [activeSection, setActiveSection] = useState("home")
  const lastScrollY = useRef(0)
  const scrollPositionRef = useRef(0)
  const pathname = usePathname()
  const isHomePage = pathname === "/"

  // Bloquea el scroll al abrir el menú y lo restaura al cerrarlo sin animación.
  useEffect(() => {
    if (!isMenuOpen) return

    const { body, documentElement } = document
    scrollPositionRef.current = window.scrollY
    lastScrollY.current = scrollPositionRef.current

    body.style.position = "fixed"
    body.style.top = `-${scrollPositionRef.current}px`
    body.style.left = "0"
    body.style.right = "0"
    body.style.width = "100%"
    body.style.overflow = "hidden"
    body.style.touchAction = "none"

    documentElement.style.overflow = "hidden"
    documentElement.style.overscrollBehavior = "none"

    return () => {
      const scrollY = scrollPositionRef.current

      body.style.position = ""
      body.style.top = ""
      body.style.left = ""
      body.style.right = ""
      body.style.width = ""
      body.style.overflow = ""
      body.style.touchAction = ""

      documentElement.style.overflow = ""
      documentElement.style.overscrollBehavior = ""

      const previousScrollBehavior = documentElement.style.scrollBehavior
      documentElement.style.scrollBehavior = "auto"
      window.scrollTo(0, scrollY)
      documentElement.style.scrollBehavior = previousScrollBehavior
      lastScrollY.current = scrollY
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

  // Estilo común para los enlaces del menú desktop con underline en hover
  const menuLinkStyle = `relative hover:text-primary transition-colors
    after:absolute after:left-0 after:right-0 after:bottom-[-8px] after:h-[2px] 
    after:bg-primary after:scale-x-0 hover:after:scale-x-100 
    after:transition-transform after:duration-300 after:origin-center`;

  const mobileMenuLinkStyle = `inline-flex min-h-11 items-center rounded-lg px-3 py-2.5 text-2xl font-medium leading-tight sm:text-3xl
    text-foreground/80 transition-[color,background-color] duration-300 ease-out
    hover:bg-muted/55 hover:text-foreground
    active:bg-muted/70 active:duration-150`;

  return (
    <header
      className={`navbar-header fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-background/80 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-4"
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
                className={`text-sm ${menuLinkStyle} ${activeSection === "about" && isHomePage ? "text-primary font-medium" : ""
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
                className={`text-sm ${menuLinkStyle} ${activeSection === "experience" && isHomePage ? "text-primary font-medium" : ""
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
                className={`text-sm ${menuLinkStyle} ${activeSection === "projects" && isHomePage ? "text-primary font-medium" : ""
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
                className={`text-sm ${menuLinkStyle} ${activeSection === "contact" && isHomePage ? "text-primary font-medium" : ""
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
              type="button"
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm relative min-h-11 min-w-11 flex items-center justify-center"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
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

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden fixed inset-0 z-[101] flex flex-col bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/90 overscroll-none"
            style={{
              height: "100dvh",
              paddingTop: "max(5.5rem, calc(env(safe-area-inset-top) + 4rem))",
              paddingBottom: "max(1rem, env(safe-area-inset-bottom))",
              paddingLeft: "max(1rem, env(safe-area-inset-left))",
              paddingRight: "max(1rem, env(safe-area-inset-right))",
            }}
          >
            <div className="flex min-h-0 flex-1 flex-col">
              <div className="flex min-h-0 flex-1 items-center justify-end overflow-y-auto overscroll-contain touch-pan-y px-4 sm:px-8">
                <nav className="flex w-full max-w-sm flex-col items-end gap-1 text-right">
                  {MOBILE_NAV_LINKS.map(({ href, label }) => {
                    const isActive = activeSection === href && isHomePage

                    return (
                      <Link
                        key={href}
                        href={getHref(href)}
                        className={`${mobileMenuLinkStyle} ${
                          isActive ? "bg-muted/40 text-primary font-semibold" : ""
                        }`}
                        onClick={closeMenu}
                      >
                        {label}
                      </Link>
                    )
                  })}
                </nav>
              </div>

              <div className="shrink-0 border-t border-border/50 px-4 pt-5 pb-2">
                <ContactIconLinks
                  size="md"
                  className="justify-center"
                  onLinkClick={closeMenu}
                  includeResume
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
