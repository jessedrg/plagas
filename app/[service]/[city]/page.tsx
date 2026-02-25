import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ServiceCityContent } from "@/components/service-city-content"
import { VALID_SERVICES, MODIFIERS, CITIES, type Service } from "@/lib/sitemap-data"

export const dynamicParams = true
export const revalidate = 604800

const KNOWN_MODIFIERS = MODIFIERS.filter(m => m !== "").map(m => m.slice(1)) as string[]

const SERVICE_NAMES: Record<Service, { name: string; title: string; singular: string }> = {
  "desratizacion": { name: "Desratización", title: "Desratización", singular: "desratización" },
  "desinsectacion": { name: "Desinsectación", title: "Desinsectación", singular: "desinsectación" },
  "fumigacion": { name: "Fumigación", title: "Fumigación", singular: "fumigación" },
  "control-cucarachas": { name: "Control de Cucarachas", title: "Control de Cucarachas", singular: "control de cucarachas" },
  "control-termitas": { name: "Control de Termitas", title: "Control de Termitas", singular: "control de termitas" },
  "control-chinches": { name: "Control de Chinches", title: "Control de Chinches", singular: "control de chinches" },
  "eliminar-avispas": { name: "Eliminar Avispas", title: "Eliminación de Avispas", singular: "eliminación de avispas" },
  "control-hormigas": { name: "Control de Hormigas", title: "Control de Hormigas", singular: "control de hormigas" },
  "control-pulgas": { name: "Control de Pulgas", title: "Control de Pulgas", singular: "control de pulgas" },
  "control-mosquitos": { name: "Control de Mosquitos", title: "Control de Mosquitos", singular: "control de mosquitos" },
  "control-palomas": { name: "Control de Palomas", title: "Control de Palomas", singular: "control de palomas" },
  "desinfeccion": { name: "Desinfección", title: "Desinfección", singular: "desinfección" },
}

function parseServiceAndModifier(rawService: string): { serviceId: Service | null; modifier?: string } {
  if (VALID_SERVICES.includes(rawService as Service)) return { serviceId: rawService as Service }
  for (const mod of KNOWN_MODIFIERS) {
    const suffix = `-${mod}`
    if (rawService.endsWith(suffix)) {
      const serviceId = rawService.slice(0, -suffix.length)
      if (VALID_SERVICES.includes(serviceId as Service)) return { serviceId: serviceId as Service, modifier: mod }
    }
  }
  return { serviceId: null }
}

function getCityDisplayName(slug: string): string {
  return slug.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
}

function formatModifier(modifier: string): string {
  const map: Record<string, string> = {
    "precios": "Precios", "barato": "Barato", "economico": "Económico",
    "cuanto-cuesta": "Cuánto Cuesta", "presupuesto": "Presupuesto",
    "presupuesto-gratis": "Presupuesto Gratis",
    "urgente": "Urgente", "24-horas": "24 Horas", "emergencia": "Emergencia",
    "rapido": "Rápido", "hoy": "Hoy", "inmediato": "Inmediato",
    "fin-de-semana": "Fin de Semana",
    "mejor": "Mejor", "profesional": "Profesional", "certificado": "Certificado",
    "de-confianza": "de Confianza", "mejor-valorado": "Mejor Valorado",
    "recomendado": "Recomendado", "garantizado": "Garantizado",
    "con-garantia": "con Garantía", "homologado": "Homologado",
    "a-domicilio": "a Domicilio", "empresa": "Empresa", "servicio": "Servicio",
    "integral": "Integral", "completo": "Completo", "definitivo": "Definitivo",
    "sin-quimicos": "Sin Químicos", "ecologico": "Ecológico",
    "con-gel": "con Gel", "con-cebo": "con Cebo", "con-trampas": "con Trampas",
    "sin-veneno": "Sin Veneno", "tratamiento-termico": "Tratamiento Térmico",
    "cerca-de-mi": "Cerca de Mí", "en-mi-zona": "en Mi Zona",
    "en-casa": "en Casa", "en-piso": "en Piso", "en-local": "en Local",
    "en-restaurante": "en Restaurante", "en-comunidad": "en Comunidad",
    "en-nave": "en Nave", "en-hotel": "en Hotel", "en-oficina": "en Oficina",
    "en-jardin": "en Jardín",
  }
  return map[modifier] || modifier.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
}

interface PageProps { params: Promise<{ service: string; city: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { service: rawService, city: citySlug } = await params
  const { serviceId, modifier } = parseServiceAndModifier(rawService)
  if (!serviceId) return { title: "No encontrado" }

  const serviceName = SERVICE_NAMES[serviceId]
  const cityName = getCityDisplayName(citySlug)
  const modifierText = modifier ? ` ${formatModifier(modifier)}` : ""
  const fullTitle = `${serviceName.title}${modifierText} en ${cityName}`

  return {
    title: `${fullTitle} | Exterminadores Certificados | plagas`,
    description: `${serviceName.title}${modifierText.toLowerCase()} en ${cityName}. Compara exterminadores certificados. Servicio urgente 24h. WhatsApp: 603 38 90 26`,
    alternates: { canonical: `https://plagasypunto.com/${rawService}/${citySlug}/` },
    openGraph: { title: fullTitle, description: `Los mejores exterminadores de ${serviceName.singular} en ${cityName}. Presupuestos gratis.`, type: "website", siteName: "plagas" },
  }
}

export default async function ServiceCityPage({ params }: PageProps) {
  const { service: rawService, city: citySlug } = await params
  const { serviceId, modifier } = parseServiceAndModifier(rawService)
  if (!serviceId) notFound()

  const serviceName = SERVICE_NAMES[serviceId as Service]
  const cityName = getCityDisplayName(citySlug)
  const modifierText = modifier ? formatModifier(modifier) : ""
  const pageTitle = modifier ? `${serviceName.title} ${modifierText} en ${cityName}` : `${serviceName.title} en ${cityName}`

  const cityIndex = CITIES.indexOf(citySlug)
  const nearbyCities = CITIES.slice(Math.max(0, cityIndex - 5), Math.min(CITIES.length, cityIndex + 6)).filter(c => c !== citySlug).slice(0, 5)
  const relatedServices = VALID_SERVICES.filter(s => s !== serviceId).slice(0, 4)

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <ServiceCityContent
          pageTitle={pageTitle} serviceName={serviceName} cityName={cityName}
          citySlug={citySlug} serviceId={serviceId as Service} modifierText={modifierText}
          nearbyCities={nearbyCities} relatedServices={relatedServices} serviceNames={SERVICE_NAMES}
        />
      </main>
      <Footer />
    </div>
  )
}
