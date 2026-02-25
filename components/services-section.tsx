import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

const services = [
  {
    id: "desratizacion",
    title: "Desratización",
    desc: "Eliminación de ratas y ratones. Tratamientos profesionales con cebos y trampas. Resultados garantizados.",
    img: "https://images.unsplash.com/photo-1548767797-d8c844163c4c?q=80&w=2071&auto=format&fit=crop",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    id: "control-cucarachas",
    title: "Control de cucarachas",
    desc: "Eliminación total de cucarachas. Tratamiento con gel profesional. Sin olores ni molestias.",
    img: "https://images.unsplash.com/photo-1701554193871-a605f56e3005?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    span: "",
  },
  {
    id: "control-chinches",
    title: "Control de chinches",
    desc: "Eliminación de chinches de cama. Tratamiento térmico y químico. Garantía de resultados.",
    img: "https://images.unsplash.com/photo-1681695749552-71e397581267?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    span: "",
  },
  {
    id: "control-termitas",
    title: "Control de termitas",
    desc: "Tratamiento de termitas y carcoma. Protección de madera. Inspección gratuita.",
    img: "https://images.unsplash.com/photo-1540854114405-7f108634a897?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    span: "",
  },
  {
    id: "eliminar-avispas",
    title: "Eliminación de avispas",
    desc: "Retirada segura de nidos de avispas. Servicio urgente. Avispa asiática incluida.",
    img: "https://images.unsplash.com/photo-1662886444247-3a3c54303239?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    span: "",
  },
  {
    id: "desinfeccion",
    title: "Desinfección",
    desc: "Desinfección profesional de locales, oficinas y comunidades. Certificado incluido.",
    img: "https://images.unsplash.com/photo-1636791013127-37effd526316?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    span: "",
  },
  {
    id: "certificado-control-plagas",
    title: "Certificados oficiales",
    desc: "Certificados DDD: desinsectación, desratización, desinfección. Informes detallados en 24-48h. Empresas registradas.",
    img: "https://images.unsplash.com/photo-1644576854212-2d1e383888eb?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    span: "",
  },
]

export function ServicesSection() {
  return (
    <section id="servicios" className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32">
      <div className="grid lg:grid-cols-12 gap-4 mb-16 lg:mb-24">
        <div className="lg:col-span-5">
          <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3 font-sans">Servicios</p>
          <h2 className="font-serif text-3xl sm:text-5xl tracking-tight text-foreground leading-[1.05]">
            Soluciones para
            <br />
            <span className="italic font-light">cada plaga.</span>
          </h2>
        </div>
        <div className="lg:col-span-5 lg:col-start-8 flex items-end">
          <p className="text-sm text-muted-foreground font-sans leading-relaxed">
            Exterminadores certificados para todo tipo de plagas. Presupuestos gratuitos, tratamientos garantizados, servicio urgente 24 horas.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-3">
        {services.map((service) => (
          <Link
            key={service.id}
            href={`/${service.id}/madrid/`}
            className={`group relative overflow-hidden bg-secondary aspect-[4/3] ${service.span}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={service.img} alt={service.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
            <div className="absolute inset-0 p-6 flex flex-col justify-end">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-background font-sans font-medium text-sm sm:text-base">{service.title}</h3>
                  <p className="text-background/60 text-xs mt-1 max-w-xs hidden sm:block">{service.desc}</p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-background/60 group-hover:text-background transition-colors flex-shrink-0" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
