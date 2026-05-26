"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Github, Linkedin, Mail, Download } from "lucide-react"

import { Button } from "@/components/ui/button"
import { contactEncoded } from "@/lib/contact-encoded"

type ContactHref = {
  email: string
  linkedin: string
  github: string
}

function decodeContact(): ContactHref {
  return {
    email: `mailto:${atob(contactEncoded.email)}`,
    linkedin: atob(contactEncoded.linkedin),
    github: atob(contactEncoded.github),
  }
}

type ContactIconLinksProps = {
  size?: "sm" | "md"
  className?: string
  onLinkClick?: () => void
  includeResume?: boolean
}

export function ContactIconLinks({
  size = "md",
  className = "",
  onLinkClick,
  includeResume = false,
}: ContactIconLinksProps) {
  const [hrefs, setHrefs] = useState<ContactHref | null>(null)

  useEffect(() => {
    setHrefs(decodeContact())
  }, [])

  const iconClass = size === "sm" ? "h-5 w-5" : "h-6 w-6"
  const buttonClass = size === "sm" ? "h-10 w-10" : "h-12 w-12"

  const items = [
    { key: "email" as const, label: "Email", Icon: Mail, external: false },
    { key: "linkedin" as const, label: "LinkedIn", Icon: Linkedin, external: true },
    { key: "github" as const, label: "GitHub", Icon: Github, external: true },
  ]

  return (
    <div className={`flex flex-wrap gap-3 select-none ${className}`}>
      {items.map(({ key, label, Icon, external }) => {
        const href = hrefs?.[key]

        return (
          <Button
            key={key}
            variant="outline"
            size="icon"
            className={buttonClass}
            asChild={Boolean(href)}
            disabled={!href}
            title={label}
          >
            {href ? (
              <Link
                href={href}
                onClick={onLinkClick}
                {...(external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                aria-label={label}
              >
                <Icon className={iconClass} />
              </Link>
            ) : (
              <span aria-hidden>
                <Icon className={iconClass} />
              </span>
            )}
          </Button>
        )
      })}
      {includeResume ? (
        <Button variant="outline" size="icon" className={buttonClass} asChild title="Resume">
          <Link
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={onLinkClick}
            aria-label="Download resume"
          >
            <Download className={iconClass} />
          </Link>
        </Button>
      ) : null}
    </div>
  )
}
