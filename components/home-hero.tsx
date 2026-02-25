import { MessageCircle, ArrowDown } from "lucide-react"

const WA_URL = "https://wa.me/34603389026?text=Hola%2C%20tengo%20un%20problema%20de%20plagas.%20%C2%BFPueden%20ayudarme%3F"

export function HomeHero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-end bg-foreground text-background overflow-hidden">
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=2070&auto=format&fit=crop"
          alt="Control de plagas profesional"
          className="w-full h-full object-cover opacity-30"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pb-16 lg:pb-24 pt-32">
        <div className="grid lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8">
            <p className="text-[10px] sm:text-xs tracking-[0.4em] uppercase text-background/40 mb-6 font-sans">
              Control de plagas profesional en toda España
            </p>
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-background leading-[0.9]">
              Tu hogar
              <br />
              <span className="italic font-light">libre de plagas.</span>
            </h1>
          </div>

          <div className="lg:col-span-4 lg:text-right">
            <p className="text-sm text-background/60 font-sans leading-relaxed max-w-sm lg:ml-auto mb-8">
              Conectamos con los mejores exterminadores certificados de tu zona. Servicio urgente 24h, presupuestos reales, resultados garantizados.
            </p>
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
              <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-background text-foreground px-8 py-4 text-sm font-sans font-medium hover:opacity-90 transition-opacity">
                <MessageCircle className="w-4 h-4" /> Urgencias 24h
              </a>
              <a href="#servicios" className="inline-flex items-center justify-center gap-2 border border-background/30 text-background px-8 py-4 text-sm font-sans hover:border-background/60 transition-colors">
                Ver servicios <ArrowDown className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-px mt-16 lg:mt-24 border-t border-background/10 pt-8">
          <div>
            <p className="font-serif text-3xl sm:text-4xl lg:text-5xl text-background">15.000+</p>
            <p className="text-[10px] sm:text-xs text-background/40 mt-1 font-sans tracking-wide">Plagas eliminadas</p>
          </div>
          <div>
            <p className="font-serif text-3xl sm:text-4xl lg:text-5xl text-background">4.9<span className="text-lg text-background/40">/5</span></p>
            <p className="text-[10px] sm:text-xs text-background/40 mt-1 font-sans tracking-wide">Valoracion media</p>
          </div>
          <div>
            <p className="font-serif text-3xl sm:text-4xl lg:text-5xl text-background">24h</p>
            <p className="text-[10px] sm:text-xs text-background/40 mt-1 font-sans tracking-wide">Servicio urgente</p>
          </div>
        </div>
      </div>
    </section>
  )
}
