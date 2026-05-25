import { ArrowRight, Code2, Gauge, Layout, Palette, TestTube2, type LucideIcon } from "lucide-react"

interface ServiceCardProps {
  title: string
  description: string
  icon: string
}

export function ServiceCard({ title, description, icon }: ServiceCardProps) {
  const IconComponent = getIcon(icon)

  return (
    <div className="group rounded-lg border border-border bg-card p-8 shadow-sm transition-colors hover:border-primary/30">
      <div className="mb-6">
        <IconComponent className="h-8 w-8 text-primary" />
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-muted-foreground mb-6 leading-relaxed">{description}</p>
      <span className="inline-flex items-center text-sm font-medium text-foreground">
        Included in project scope
        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
    </div>
  )
}

function getIcon(iconName: string): LucideIcon {
  switch (iconName) {
    case "Code2":
      return Code2
    case "Gauge":
      return Gauge
    case "Layout":
      return Layout
    case "Palette":
      return Palette
    case "TestTube2":
      return TestTube2
    default:
      return Layout
  }
}
