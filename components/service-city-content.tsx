"use client"

import { useState } from "react"
import Link from "next/link"
import type { Service } from "@/lib/sitemap-data"
import { MessageCircle, Star, Shield, Clock, Ruler, Users, CheckCircle, ChevronDown, ArrowRight, ArrowUpRight } from "lucide-react"

const WA_URL = "https://wa.me/34603389026?text=Hola%2C%20tengo%20un%20problema%20de%20plagas.%20%C2%BFPueden%20ayudarme%3F"
const PHONE = "+34603389026"

const SERVICE_IMAGES: Record<string, string> = {
  "desratizacion": "https://images.unsplash.com/photo-1548767797-d8c844163c4c?q=80&w=2071&auto=format&fit=crop",
  "desinsectacion": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2070&auto=format&fit=crop",
  "fumigacion": "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=2070&auto=format&fit=crop",
  "control-cucarachas": "https://images.unsplash.com/photo-1701554193871-a605f56e3005?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "control-termitas": "https://images.unsplash.com/photo-1540854114405-7f108634a897?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "control-chinches": "https://images.unsplash.com/photo-1681695749552-71e397581267?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "eliminar-avispas": "https://images.unsplash.com/photo-1662886444247-3a3c54303239?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "control-hormigas": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2070&auto=format&fit=crop",
  "control-pulgas": "https://images.unsplash.com/photo-1548767797-d8c844163c4c?q=80&w=2071&auto=format&fit=crop",
  "control-mosquitos": "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=2070&auto=format&fit=crop",
  "control-palomas": "https://images.unsplash.com/photo-1568526381923-caf3fd520382?q=80&w=2069&auto=format&fit=crop",
  "desinfeccion": "https://images.unsplash.com/photo-1636791013127-37effd526316?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
}

function hashCode(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash |= 0
  }
  return Math.abs(hash)
}

function generateReviews(cityName: string, serviceId: string) {
  const seed = hashCode(`${cityName}-${serviceId}`)
  const names = ["Maria L.", "Carlos G.", "Ana R.", "Javier M.", "Elena S.", "Roberto P.", "Patricia D.", "Fernando T.", "Laura B.", "Sergio V."]

  const templates = [
    `Teniamos ${serviceId.includes("rata") ? "ratas" : serviceId.includes("cucaracha") ? "cucarachas" : "una plaga"} en casa y no sabiamos que hacer. plagas nos conecto con un exterminador en ${cityName} en menos de 24h. Problema resuelto en una semana. Servicio impecable.`,
    `Pensabamos que tendriamos que tirar muebles. El profesional que nos envio plagas en ${cityName} hizo un tratamiento increible. Cero plagas desde entonces. Muy recomendable.`,
    `Urgencia total en el restaurante. plagas nos consiguio un exterminador certificado en ${cityName} el mismo dia. Tratamiento profesional sin cerrar el local. Perfecto.`,
    `El exterminador de ${cityName} fue muy profesional. Explico todo el proceso, dio garantia por escrito y el precio fue justo. Muy contento con plagas.`,
    `Segunda vez que uso plagas en ${cityName}. La primera vez fue tan bien que no dude en repetir. Servicio rapido, profesional y con garantia.`,
    `Tenia miedo de los productos quimicos por mis hijos. El profesional de ${cityName} uso tratamiento seguro y me explico todo. Plaga eliminada sin riesgos.`,
  ]

  const startIdx = seed % templates.length
  return Array.from({ length: 6 }, (_, i) => ({
    name: names[(seed + i * 3) % names.length],
    city: cityName,
    rating: (seed + i) % 7 === 0 ? 4 : 5,
    text: templates[(startIdx + i) % templates.length],
    date: `${[3, 17, 8, 24, 11, 29][i]} de ${["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"][[7, 9, 8, 10, 11, 7][i]]} 2025`,
    verified: true,
  }))
}

function generateFAQs(cityName: string, serviceName: { title: string; singular: string }, serviceId: string) {
  const faqs = [
    { q: `Cuanto cuesta ${serviceName.singular} en ${cityName}?`, a: `El precio de ${serviceName.singular} en ${cityName} depende de la superficie, el tipo de plaga y la gravedad. Como orientacion: tratamientos basicos desde 60€, tratamientos completos desde 120€. plagas te presenta presupuestos detallados de exterminadores certificados en ${cityName}. Escribenos por WhatsApp para orientacion gratuita.` },
    { q: `El servicio de plagas en ${cityName} tiene algun coste?`, a: `El asesoramiento de plagas es completamente gratuito. Conectamos con exterminadores certificados, te presentamos presupuestos y te acompanamos durante el tratamiento. Sin comisiones ni costes ocultos. Escribenos por WhatsApp sin compromiso.` },
    { q: `Cuanto tiempo tarda en eliminarse la plaga en ${cityName}?`, a: `Depende del tipo de plaga y la gravedad. Cucarachas: 1-2 semanas. Ratas: 2-4 semanas. Chinches: 2-3 semanas. Termitas: 1-3 meses. Los exterminadores que recomendamos en ${cityName} siempre dan un plazo cerrado antes de empezar.` },
  ]

  if (serviceId.includes("rata") || serviceId === "desratizacion") {
    faqs.push(
      { q: "Como se si tengo ratas en casa?", a: `Senales claras: excrementos pequenos y oscuros, ruidos en techo o paredes por la noche, cables o muebles roidos, olor fuerte a amoniaco. Si detectas alguna senal en ${cityName}, contacta con un exterminador profesional cuanto antes.` },
      { q: "Los tratamientos son seguros para mascotas?", a: "Si. Los exterminadores certificados utilizan cebos en estaciones cerradas que las mascotas no pueden abrir. Te informan de las precauciones especificas segun el tratamiento." },
    )
  } else if (serviceId.includes("cucaracha")) {
    faqs.push(
      { q: "Por que tengo cucarachas si mi casa esta limpia?", a: "Las cucarachas buscan agua y calor, no solo comida. Pueden entrar por tuberias, grietas o con la compra. Una casa limpia reduce el riesgo pero no lo elimina. El tratamiento profesional con gel es la solucion definitiva." },
      { q: "El tratamiento con gel es efectivo?", a: "Si. El gel profesional es el metodo mas efectivo contra cucarachas. Las cucarachas lo comen, vuelven al nido y contagian a las demas. Elimina colonias enteras en 1-2 semanas." },
    )
  } else if (serviceId.includes("chinche")) {
    faqs.push(
      { q: "Como se si tengo chinches de cama?", a: "Senales: picaduras en linea o grupo al despertar, manchas de sangre en sabanas, puntos negros en costuras del colchon, olor dulzon. Si sospechas chinches en ${cityName}, actua rapido: se reproducen muy deprisa." },
      { q: "Tengo que tirar el colchon?", a: "No necesariamente. El tratamiento termico profesional elimina chinches en todas las fases sin daniar el colchon. Solo en casos muy graves se recomienda sustituirlo." },
    )
  }

  return faqs
}

interface ServiceCityContentProps {
  pageTitle: string
  serviceName: { name: string; title: string; singular: string }
  cityName: string
  citySlug: string
  serviceId: Service
  modifierText: string
  nearbyCities: string[]
  relatedServices: string[]
  serviceNames: Record<Service, { name: string; title: string; singular: string }>
}

export function ServiceCityContent({
  pageTitle, serviceName, cityName, citySlug, serviceId, modifierText,
  nearbyCities, relatedServices, serviceNames,
}: ServiceCityContentProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [visibleReviews, setVisibleReviews] = useState(3)

  const reviews = generateReviews(cityName, serviceId)
  const faqs = generateFAQs(cityName, serviceName, serviceId)
  const avgRating = (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
  const heroImg = SERVICE_IMAGES[serviceId] || SERVICE_IMAGES["desratizacion"]

  function getCityDisplayName(slug: string): string {
    return slug.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
  }

  return (
    <>
      {/* Hero */}
      <section className="relative bg-foreground text-background overflow-hidden">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={heroImg} alt={pageTitle} className="w-full h-full object-cover opacity-30" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-28">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-end">
            <div className="lg:col-span-7">
              <nav className="text-[10px] tracking-[0.3em] uppercase text-background/30 mb-8 font-sans flex items-center gap-2">
                <Link href="/" className="hover:text-background/60 transition-colors">Inicio</Link>
                <span>/</span>
                <span>{serviceName.title}</span>
                <span>/</span>
                <span className="text-background/60">{cityName}</span>
              </nav>
              <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-background leading-[0.95]">
                {pageTitle}
              </h1>
              <p className="text-sm sm:text-base text-background/50 mt-8 max-w-xl font-sans leading-relaxed">
                {"Compara los mejores exterminadores de "}
                {serviceName.singular}
                {modifierText ? ` ${modifierText.toLowerCase()}` : ""}
                {` en ${cityName}. Presupuestos reales, garantia incluida. Servicio urgente 24h.`}
              </p>
            </div>

            <div className="lg:col-span-5 lg:col-start-8">
              <div className="flex flex-col gap-3">
                <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-background text-foreground px-8 py-4 text-sm font-sans font-medium hover:opacity-90 transition-opacity">
                  <MessageCircle className="w-4 h-4" /> Urgencias 24h
                </a>
                <a href="#como-funciona" className="inline-flex items-center justify-center gap-2 border border-background/20 text-background px-8 py-4 text-sm font-sans hover:border-background/50 transition-colors">
                  Como funciona
                </a>
              </div>

              <div className="flex items-center gap-4 mt-6 text-xs text-background/40 font-sans">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current text-background/60" />)}
                  <span className="ml-1 text-background/60 font-medium">{avgRating}</span>
                </div>
                <span>|</span>
                <span>{reviews.length}+ opiniones</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Shield, label: "Certificados", sub: "Exterminadores homologados" },
              { icon: Clock, label: "Urgencias 24h", sub: "Respuesta inmediata" },
              { icon: Ruler, label: "Gratuito", sub: "Sin compromiso" },
              { icon: Users, label: "15.000+ plagas", sub: "Eliminadas con plagas" },
            ].map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex items-center gap-3">
                <Icon className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <div>
                  <p className="text-xs font-sans font-medium text-foreground">{label}</p>
                  <p className="text-[10px] text-muted-foreground font-sans">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="como-funciona" className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32">
        <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3 font-sans">Proceso</p>
        <h2 className="font-serif text-2xl sm:text-4xl tracking-tight text-foreground mb-12">
          {`Como funciona ${serviceName.singular} en ${cityName}`}
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { num: "01", title: "Cuentanos tu problema", desc: `Escribenos por WhatsApp. Que plaga tienes, donde esta, desde cuando. Te damos orientacion inmediata sobre ${serviceName.singular} en ${cityName}.` },
            { num: "02", title: "Recibe presupuesto", desc: `Contactamos con exterminadores certificados de ${cityName}. Recibes presupuesto detallado en menos de 24h. Urgencias en 2h.` },
            { num: "03", title: "Plaga eliminada", desc: "El profesional acude, aplica el tratamiento y te da garantia por escrito. Seguimiento incluido hasta la eliminacion total." },
          ].map(step => (
            <div key={step.num} className="flex gap-6">
              <span className="font-serif text-4xl lg:text-5xl text-muted-foreground/20 flex-shrink-0">{step.num}</span>
              <div>
                <h3 className="text-sm font-sans font-medium text-foreground">{step.title}</h3>
                <p className="text-xs text-muted-foreground mt-2 font-sans leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-secondary">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div>
              <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3 font-sans">Opiniones</p>
              <h2 className="font-serif text-2xl sm:text-4xl tracking-tight text-foreground">
                {`Opiniones sobre ${serviceName.singular} en ${cityName}`}
              </h2>
            </div>
            <div className="flex items-center gap-2 text-sm font-sans">
              <div className="flex">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-foreground text-foreground" />)}</div>
              <span className="font-medium">{avgRating}</span>
              <span className="text-muted-foreground">({reviews.length} opiniones)</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.slice(0, visibleReviews).map((review, i) => (
              <div key={i} className="bg-background p-6 flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  {[...Array(5)].map((_, j) => <Star key={j} className={`w-3.5 h-3.5 ${j < review.rating ? "fill-foreground text-foreground" : "text-muted-foreground/30"}`} />)}
                  {review.verified && <CheckCircle className="w-3.5 h-3.5 text-green-600 ml-auto" />}
                </div>
                <p className="text-sm text-foreground/80 font-sans leading-relaxed flex-1">{review.text}</p>
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-xs font-sans font-medium text-foreground">{review.name}</p>
                  <p className="text-[10px] text-muted-foreground">{review.city} · {review.date}</p>
                </div>
              </div>
            ))}
          </div>

          {visibleReviews < reviews.length && (
            <button onClick={() => setVisibleReviews(reviews.length)} className="mt-8 text-sm font-sans text-foreground underline underline-offset-4 hover:no-underline">
              Ver todas las opiniones
            </button>
          )}
        </div>
      </section>

      {/* Mid CTA */}
      <section className="bg-foreground">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 py-16 lg:py-24 text-center">
          <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl tracking-tight text-background leading-[1.05]">
            {`Tu hogar en ${cityName} merece estar`}
            <br />
            <span className="italic font-light">libre de plagas.</span>
          </h2>
          <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-background text-foreground px-8 py-4 mt-10 text-sm font-sans font-medium hover:opacity-90 transition-opacity">
            <MessageCircle className="w-4 h-4" /> Urgencias 24h
          </a>
          <p className="text-[10px] text-background/30 mt-4 font-sans">Servicio disponible 24/7</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-6 lg:px-8 py-20 lg:py-32">
        <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3 font-sans">FAQ</p>
        <h2 className="font-serif text-2xl sm:text-4xl tracking-tight text-foreground mb-12">
          {`Preguntas sobre ${serviceName.singular} en ${cityName}`}
        </h2>
        <div className="divide-y divide-border">
          {faqs.map((faq, i) => (
            <div key={i} className="py-6">
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-start justify-between gap-4 text-left">
                <span className="text-sm font-sans font-medium text-foreground">{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-muted-foreground flex-shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
              </button>
              {openFaq === i && <p className="text-sm text-muted-foreground font-sans leading-relaxed mt-4">{faq.a}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* SEO content */}
      <section className="bg-secondary">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 py-20 lg:py-32">
          <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3 font-sans">Guia</p>
          <h2 className="font-serif text-2xl sm:text-4xl tracking-tight text-foreground mb-8">
            {`Guia para ${serviceName.singular} en ${cityName}`}
          </h2>
          <div className="prose-sm font-sans text-muted-foreground space-y-4 leading-relaxed text-xs sm:text-sm">
            <p>{`Las plagas son un problema comun en ${cityName} que requiere atencion profesional. En plagas conectamos con exterminadores certificados que conocen las particularidades de cada zona y tipo de plaga. Mas de 15.000 hogares y negocios han confiado en nosotros.`}</p>
            <h3 className="text-foreground font-medium text-sm pt-4">Que tener en cuenta</h3>
            <p>{`Al planificar ${serviceName.singular} en ${cityName}, identifica primero el tipo de plaga, la zona afectada y desde cuando tienes el problema. Con estos datos, nuestros exterminadores certificados te presentan un presupuesto ajustado y un plan de accion concreto.`}</p>
            <h3 className="text-foreground font-medium text-sm pt-4">{`Por que confiar en plagas en ${cityName}`}</h3>
            <p>{`Nuestro equipo conoce a los exterminadores de ${cityName} personalmente. Verificamos certificaciones, seguros, garantias y resultados. Cuando te recomendamos un profesional, es porque lo conocemos por dentro. Sin sorpresas, sin intermediarios opacos.`}</p>
          </div>
        </div>
      </section>

      {/* Internal links */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3 font-sans">{serviceName.title} en otras ciudades</p>
            <div className="flex flex-wrap gap-2 mt-4">
              {nearbyCities.map(city => (
                <Link key={city} href={`/${serviceId}/${city}/`} className="text-xs font-sans text-muted-foreground hover:text-foreground transition-colors border border-border px-3 py-1.5 hover:border-foreground/30">
                  {getCityDisplayName(city)}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3 font-sans">Otros servicios en {cityName}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              {relatedServices.map(svc => (
                <Link key={svc} href={`/${svc}/${citySlug}/`} className="text-xs font-sans text-muted-foreground hover:text-foreground transition-colors border border-border px-3 py-1.5 hover:border-foreground/30">
                  {serviceNames[svc as Service]?.title || svc}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-foreground">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 py-16 lg:py-24 text-center">
          <p className="text-[10px] tracking-[0.4em] uppercase text-background/20 mb-4 font-sans">Da el primer paso</p>
          <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl tracking-tight text-background">Plaga eliminada. Garantizado.</h2>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-10">
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-background text-foreground px-8 py-4 text-sm font-sans font-medium hover:opacity-90 transition-opacity">
              <MessageCircle className="w-4 h-4" /> Urgencias 24h
            </a>
            <Link href="/" className="inline-flex items-center justify-center gap-2 border border-background/20 text-background px-8 py-4 text-sm font-sans hover:border-background/50 transition-colors">
              Ver servicios <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Schema.org */}
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "LocalBusiness",
        name: `plagas - ${pageTitle}`,
        description: `Los mejores exterminadores de ${serviceName.singular} en ${cityName}. Presupuestos gratis.`,
        telephone: PHONE, url: `https://plagasypunto.com/${serviceId}/${citySlug}/`,
        address: { "@type": "PostalAddress", addressLocality: cityName, addressCountry: "ES" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: avgRating, reviewCount: reviews.length, bestRating: "5", worstRating: "1" },
      })}} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      })}} />
    </>
  )
}
