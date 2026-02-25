import { MessageCircle } from "lucide-react"

const WA_URL = "https://wa.me/34603389026?text=Hola%2C%20tengo%20un%20problema%20de%20plagas.%20%C2%BFPueden%20ayudarme%3F"

const steps = [
  {
    num: "01",
    title: "Cuentanos tu problema",
    desc: "Escribenos por WhatsApp. Que plaga tienes, donde esta, desde cuando. 2 minutos bastan para darte una primera orientacion.",
  },
  {
    num: "02",
    title: "Recibe presupuesto",
    desc: "Contactamos con exterminadores certificados de tu zona. Recibes presupuesto detallado en menos de 24 horas. Urgencias en 2h.",
  },
  {
    num: "03",
    title: "Plaga eliminada",
    desc: "El profesional acude, aplica el tratamiento y te da garantia por escrito. Seguimiento incluido hasta la eliminacion total.",
  },
]

export function HowItWorks() {
  return (
    <section id="proceso" className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8">
          <div className="lg:col-span-4">
            <p className="text-[10px] tracking-[0.4em] uppercase text-background/30 mb-3 font-sans">Proceso</p>
            <h2 className="font-serif text-3xl sm:text-5xl tracking-tight text-background leading-[1.05]">
              Tres pasos. Plaga eliminada.
            </h2>
            <p className="text-sm text-background/50 mt-6 font-sans leading-relaxed">
              Nos encargamos de todo para que tu solo tengas que abrir la puerta al exterminador.
            </p>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-background text-foreground px-8 py-4 mt-10 text-sm font-sans font-medium hover:opacity-90 transition-opacity">
              <MessageCircle className="w-4 h-4" /> Urgencias 24h
            </a>
          </div>

          <div className="lg:col-span-7 lg:col-start-6 space-y-0">
            {steps.map((step, i) => (
              <div key={step.num} className={`flex gap-8 py-10 ${i < steps.length - 1 ? "border-b border-background/10" : ""}`}>
                <span className="font-serif text-5xl lg:text-6xl text-background/10 flex-shrink-0 leading-none">{step.num}</span>
                <div>
                  <h3 className="text-base sm:text-lg font-sans font-medium text-background">{step.title}</h3>
                  <p className="text-sm text-background/50 mt-2 font-sans leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
