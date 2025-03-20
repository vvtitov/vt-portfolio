import Image from "next/image"
import Link from "next/link"

interface AccidentTypeCardProps {
  title: string
  imageSrc: string
  href: string
}

export function AccidentTypeCard({ title, imageSrc, href }: AccidentTypeCardProps) {
  return (
    <Link
      href={href}
      className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
    >
      <Image src={imageSrc || "/placeholder.svg"} alt={title} width={80} height={80} className="mb-4" />
      <h3 className="text-center font-medium">{title}</h3>
    </Link>
  )
}

