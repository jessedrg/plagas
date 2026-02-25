import { MessageCircle, ArrowRight } from "lucide-react"

const WA_URL = "https://wa.me/34603389026?text=Hola%2C%20tengo%20un%20problema%20de%20plagas.%20%C2%BFPueden%20ayudarme%3F"

export function CtaSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=2070&auto=format&fit=crop"
          alt="Control de plagas profesional"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-foreground/80" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-40">
        <div className="max-w-2xl">
          <p className="text-[10px] tracking-[0.4em] uppercase text-background/30 mb-4 font-sans">Servicio urgente 24h</p>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl tracking-tight text-background leading-[1.05]">
            Tu hogar merece estar
            <br />
            <span className="italic font-light">libre de plagas.</span>
          </h2>
          <p className="text-sm text-background/60 mt-6 font-sans leading-relaxed max-w-md">
            Escribenos ahora. Sin compromiso, sin coste. En menos de 2 horas tienes un exterminador en camino.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-10">
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-background text-foreground px-8 py-4 text-sm font-sans font-medium hover:opacity-90 transition-opacity">
              <MessageCircle className="w-4 h-4" /> Urgencias 24h
            </a>
            <a href="#servicios" className="inline-flex items-center justify-center gap-2 border border-background/30 text-background px-8 py-4 text-sm font-sans hover:border-background/60 transition-colors">
              Ver servicios <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
