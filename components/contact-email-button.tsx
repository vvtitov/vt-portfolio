"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { contactEncoded } from "@/lib/contact-encoded"

export function ContactEmailButton() {
  const [emailHref, setEmailHref] = useState<string | null>(null)

  useEffect(() => {
    setEmailHref(`mailto:${atob(contactEncoded.email)}`)
  }, [])

  if (!emailHref) {
    return (
      <Button className="group" disabled>
        Send Email
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    )
  }

  return (
    <Button asChild className="group">
      <Link href={emailHref} aria-label="Send email">
        Send Email
        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </Button>
  )
}
