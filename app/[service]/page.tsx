import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { VALID_SERVICES, CITIES, type Service } from "@/lib/sitemap-data"
import { MessageCircle, ArrowRight, MapPin } from "lucide-react"

export const dynamicParams = true
export const revalidate = 604800

const WA_URL = "https://wa.me/34603389026?text=Hola%2C%20tengo%20un%20problema%20de%20plagas.%20%C2%BFPueden%20ayudarme%3F"

const SERVICE_NAMES: Record<Service, { name: string; title: string; singular: string; description: string }> = {
  "desratizacion": { name: "Desratización", title: "Desratización", singular: "desratización", description: "Eliminación profesional de ratas y ratones. Tratamientos con cebos, trampas y sellado de accesos. Resultados garantizados." },
  "desinsectacion": { name: "Desinsectación", title: "Desinsectación", singular: "desinsectación", description: "Control integral de insectos. Tratamientos profesionales para todo tipo de plagas de insectos en hogares y negocios." },
  "fumigacion": { name: "Fumigación", title: "Fumigación", singular: "fumigación", description: "Fumigación profesional de viviendas, locales y naves. Tratamientos efectivos con productos homologados." },
  "control-cucarachas": { name: "Control de Cucarachas", title: "Control de Cucarachas", singular: "control de cucarachas", description: "Eliminación total de cucarachas con gel profesional. Sin olores, sin molestias. Tratamiento efectivo en 1-2 semanas." },
  "control-termitas": { name: "Control de Termitas", title: "Control de Termitas", singular: "control de termitas", description: "Tratamiento de termitas y carcoma. Protección de madera con garantía de hasta 5 años. Inspección gratuita." },
  "control-chinches": { name: "Control de Chinches", title: "Control de Chinches", singular: "control de chinches", description: "Eliminación de chinches de cama. Tratamiento térmico y químico. Garantía de resultados." },
  "eliminar-avispas": { name: "Eliminar Avispas", title: "Eliminación de Avispas", singular: "eliminación de avispas", description: "Retirada segura de nidos de avispas. Servicio urgente en menos de 2 horas. Avispa asiática incluida." },
  "control-hormigas": { name: "Control de Hormigas", title: "Control de Hormigas", singular: "control de hormigas", description: "Eliminación de colonias de hormigas. Tratamiento con cebo que elimina el hormiguero desde la raíz." },
  "control-pulgas": { name: "Control de Pulgas", title: "Control de Pulgas", singular: "control de pulgas", description: "Tratamiento profesional de pulgas en hogares. Elimina adultos, larvas y huevos. Seguro para mascotas." },
  "control-mosquitos": { name: "Control de Mosquitos", title: "Control de Mosquitos", singular: "control de mosquitos", description: "Control de mosquitos y mosquito tigre. Tratamiento larvicida y adulticida para jardines y exteriores." },
  "control-palomas": { name: "Control de Palomas", title: "Control de Palomas", singular: "control de palomas", description: "Sistemas antipalomas: pinchos, redes y sistemas eléctricos. Soluciones permanentes para balcones y fachadas." },
  "desinfeccion": { name: "Desinfección", title: "Desinfección", singular: "desinfección", description: "Desinfección profesional de locales, oficinas y comunidades. Certificado oficial incluido." },
  "certificado-control-plagas": { name: "Certificado Control Plagas", title: "Certificados Oficiales de Control de Plagas", singular: "certificado de control de plagas", description: "Certificados DDD oficiales: desinsectación, desratización, desinfección. Informes detallados en 24-48h. Válidos para sanidad." },
}

const SERVICE_IMAGES: Record<string, string> = {
  "desratizacion": "https://images.unsplash.com/photo-1633331915190-fe4810c7da87?q=80&w=2070&auto=format&fit=crop",
  "desinsectacion": "https://images.unsplash.com/photo-1636791013127-37effd526316?q=80&w=2070&auto=format&fit=crop",
  "fumigacion": "https://images.unsplash.com/photo-1636791013127-37effd526316?q=80&w=2070&auto=format&fit=crop",
  "control-cucarachas": "https://images.unsplash.com/photo-1701554193871-a605f56e3005?q=80&w=2070&auto=format&fit=crop",
  "control-termitas": "https://images.unsplash.com/photo-1540854114405-7f108634a897?q=80&w=2070&auto=format&fit=crop",
  "control-chinches": "https://images.unsplash.com/photo-1681695749552-71e397581267?q=80&w=1974&auto=format&fit=crop",
  "eliminar-avispas": "https://images.unsplash.com/photo-1662886444247-3a3c54303239?q=80&w=1974&auto=format&fit=crop",
  "control-hormigas": "https://images.unsplash.com/photo-1611748939902-060e1ae99f32?q=80&w=2014&auto=format&fit=crop",
  "control-pulgas": "https://images.unsplash.com/photo-1584709636716-3293bcc4517d?q=80&w=1973&auto=format&fit=crop",
  "control-mosquitos": "https://images.unsplash.com/photo-1584709636716-3293bcc4517d?q=80&w=1973&auto=format&fit=crop",
  "control-palomas": "https://images.unsplash.com/photo-1572262086204-3909bfc93ea0?q=80&w=2071&auto=format&fit=crop",
  "desinfeccion": "https://images.unsplash.com/photo-1636791013127-37effd526316?q=80&w=2070&auto=format&fit=crop",
  "certificado-control-plagas": "https://images.unsplash.com/photo-1644576854212-2d1e383888eb?q=80&w=987&auto=format&fit=crop",
}

const MAIN_CITIES = [
  "madrid", "barcelona", "valencia", "sevilla", "zaragoza", "malaga",
  "murcia", "palma-de-mallorca", "las-palmas-de-gran-canaria", "bilbao",
  "alicante", "cordoba", "valladolid", "vigo", "gijon", "hospitalet-de-llobregat",
  "vitoria-gasteiz", "la-coruna", "granada", "elche", "oviedo", "terrassa",
  "badalona", "cartagena", "jerez-de-la-frontera", "sabadell", "mostoles",
  "santa-cruz-de-tenerife", "alcala-de-henares", "pamplona", "fuenlabrada",
  "almeria", "san-sebastian", "leganes", "santander", "burgos", "albacete",
  "getafe", "salamanca", "logrono", "huelva", "badajoz", "tarragona",
  "lleida", "marbella", "leon", "cadiz", "dos-hermanas", "torrevieja",
]

function getCityDisplayName(slug: string): string {
  return slug.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
}

interface PageProps { params: Promise<{ service: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { service: serviceId } = await params
  if (!VALID_SERVICES.includes(serviceId as Service)) return { title: "No encontrado" }

  const serviceName = SERVICE_NAMES[serviceId as Service]
  return {
    title: `${serviceName.title} en España | Exterminadores Certificados | plagas`,
    description: `${serviceName.description} Servicio en toda España. Presupuestos gratis. Urgencias 24h.`,
    alternates: { canonical: `https://plagasypunto.com/${serviceId}/` },
    openGraph: { title: `${serviceName.title} en España`, description: serviceName.description, type: "website", siteName: "plagas" },
  }
}

export default async function ServiceHubPage({ params }: PageProps) {
  const { service: serviceId } = await params
  if (!VALID_SERVICES.includes(serviceId as Service)) notFound()

  const serviceName = SERVICE_NAMES[serviceId as Service]
  const heroImg = SERVICE_IMAGES[serviceId] || SERVICE_IMAGES["desratizacion"]
  const relatedServices = VALID_SERVICES.filter(s => s !== serviceId).slice(0, 6)

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative bg-foreground text-background overflow-hidden">
          <div className="absolute inset-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={heroImg} alt={serviceName.title} className="w-full h-full object-cover opacity-30" />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-28">
            <nav className="text-[10px] tracking-[0.3em] uppercase text-background/30 mb-8 font-sans flex items-center gap-2">
              <Link href="/" className="hover:text-background/60 transition-colors">Inicio</Link>
              <span>/</span>
              <span className="text-background/60">{serviceName.title}</span>
            </nav>
            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-background leading-[0.95]">
              {serviceName.title}
              <br />
              <span className="italic font-light">en toda España</span>
            </h1>
            <p className="text-sm sm:text-base text-background/50 mt-8 max-w-xl font-sans leading-relaxed">
              {serviceName.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-10">
              <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-background text-foreground px-8 py-4 text-sm font-sans font-medium hover:opacity-90 transition-opacity">
                <MessageCircle className="w-4 h-4" /> Urgencias 24h
              </a>
              <a href="#ciudades" className="inline-flex items-center justify-center gap-2 border border-background/20 text-background px-8 py-4 text-sm font-sans hover:border-background/50 transition-colors">
                Ver ciudades <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </section>

        {/* Ciudades principales */}
        <section id="ciudades" className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-12 gap-4 mb-16">
            <div className="lg:col-span-5">
              <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3 font-sans">Ciudades</p>
              <h2 className="font-serif text-3xl sm:text-5xl tracking-tight text-foreground leading-[1.05]">
                {serviceName.title}
                <br />
                <span className="italic font-light">cerca de ti</span>
              </h2>
            </div>
            <div className="lg:col-span-5 lg:col-start-8 flex items-end">
              <p className="text-sm text-muted-foreground font-sans leading-relaxed">
                Selecciona tu ciudad para ver exterminadores certificados en tu zona. Servicio disponible en más de 8.000 localidades.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {MAIN_CITIES.map(city => (
              <Link
                key={city}
                href={`/${serviceId}/${city}/`}
                className="group flex items-center gap-2 p-4 border border-border hover:border-foreground/30 hover:bg-secondary transition-all"
              >
                <MapPin className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0" />
                <span className="text-sm font-sans text-foreground truncate">{getCityDisplayName(city)}</span>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground font-sans">
              ¿No encuentras tu ciudad? <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-4 hover:no-underline">Escríbenos por WhatsApp</a> y te conectamos con exterminadores de tu zona.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-foreground">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 py-16 lg:py-24 text-center">
            <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl tracking-tight text-background leading-[1.05]">
              {serviceName.title} profesional
              <br />
              <span className="italic font-light">con garantía</span>
            </h2>
            <p className="text-sm text-background/50 mt-6 font-sans max-w-md mx-auto">
              Exterminadores certificados. Presupuestos gratis. Servicio urgente 24h.
            </p>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-background text-foreground px-8 py-4 mt-10 text-sm font-sans font-medium hover:opacity-90 transition-opacity">
              <MessageCircle className="w-4 h-4" /> Contactar ahora
            </a>
          </div>
        </section>

        {/* Otros servicios */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32">
          <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3 font-sans">Otros servicios</p>
          <h2 className="font-serif text-2xl sm:text-4xl tracking-tight text-foreground mb-12">También te puede interesar</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedServices.map(svc => (
              <Link
                key={svc}
                href={`/${svc}/`}
                className="group p-6 border border-border hover:border-foreground/30 hover:bg-secondary transition-all"
              >
                <h3 className="text-sm font-sans font-medium text-foreground group-hover:underline">{SERVICE_NAMES[svc as Service]?.title}</h3>
                <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{SERVICE_NAMES[svc as Service]?.description}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
