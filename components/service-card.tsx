import Link from "next/link"
import { ArrowRight, Building, Box, Layout, MessageSquare, Monitor, Palette, type LucideIcon } from "lucide-react"

interface ServiceCardProps {
  title: string
  description: string
  icon: string
  href: string
}

export function ServiceCard({ title, description, icon, href }: ServiceCardProps) {
  const IconComponent = getIcon(icon)

  return (
    <div className="p-8 border border-gray-200 hover:border-gray-300 transition-colors group">
      <div className="mb-6">
        <IconComponent className="h-8 w-8" />
      </div>
      <h3 className="text-xl font-medium mb-3">{title}</h3>
      <p className="text-gray-600 mb-6">{description}</p>
      <Link href={href} className="inline-flex items-center text-sm font-medium text-black">
        Learn More
        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  )
}

function getIcon(iconName: string): LucideIcon {
  switch (iconName) {
    case "Building":
      return Building
    case "Box":
      return Box
    case "Layout":
      return Layout
    case "MessageSquare":
      return MessageSquare
    case "Monitor":
      return Monitor
    case "Palette":
      return Palette
    default:
      return Layout
  }
}

