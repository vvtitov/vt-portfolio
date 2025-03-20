import { ServiceCard } from "@/components/service-card"

export default function ServicesPage() {
  return (
    <main className="pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-light mb-6 tracking-tight">
            Our <span className="font-medium">Services</span>
          </h1>
          <p className="text-gray-600 leading-relaxed">
            We offer a comprehensive suite of design services, each delivered with the same unwavering commitment to
            excellence and attention to detail.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ServiceCard
            title="Interior Design"
            description="Creating harmonious, functional spaces that reflect our clients' unique identities and elevate everyday experiences."
            icon="Layout"
            href="/services/interior-design"
          />
          <ServiceCard
            title="Architecture"
            description="Designing structures that seamlessly blend form and function, creating buildings that inspire and endure."
            icon="Building"
            href="/services/architecture"
          />
          <ServiceCard
            title="Brand Identity"
            description="Crafting distinctive visual identities that communicate the essence of a brand and foster meaningful connections."
            icon="Palette"
            href="/services/brand-identity"
          />
          <ServiceCard
            title="Product Design"
            description="Developing innovative, user-centered products that combine aesthetic appeal with practical functionality."
            icon="Box"
            href="/services/product-design"
          />
          <ServiceCard
            title="Digital Design"
            description="Creating intuitive, engaging digital experiences that seamlessly guide users and elevate brand presence."
            icon="Monitor"
            href="/services/digital-design"
          />
          <ServiceCard
            title="Consultation"
            description="Providing expert guidance and strategic insights to help clients navigate complex design challenges."
            icon="MessageSquare"
            href="/services/consultation"
          />
        </div>
      </div>
    </main>
  )
}

