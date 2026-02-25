"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    q: "Cuanto cuesta eliminar una plaga?",
    a: "El precio depende del tipo de plaga, la superficie y la gravedad. plagas te presenta presupuestos detallados de exterminadores certificados para que compares. Escribenos por WhatsApp para orientacion gratuita.",
  },
  {
    q: "Cuanto tarda en eliminarse una plaga?",
    a: "Depende del tipo de plaga. Cucarachas y hormigas: 1-2 semanas. Chinches: 2-3 semanas con seguimiento. Termitas: 1-3 meses segun gravedad. Ratas: 2-4 semanas. El exterminador te da un plazo cerrado antes de empezar.",
  },
  {
    q: "El servicio de plagas tiene algun coste?",
    a: "No. Nuestro asesoramiento es 100% gratuito. Conectamos con exterminadores certificados, te presentamos presupuestos y te acompanamos durante el tratamiento. Sin comisiones, sin costes ocultos.",
  },
  {
    q: "Los tratamientos son seguros para ninos y mascotas?",
    a: "Si. Los exterminadores que recomendamos utilizan productos homologados y tecnicas seguras. Te informan de las precauciones especificas segun el tratamiento. En muchos casos no es necesario abandonar la vivienda.",
  },
  {
    q: "Teneis servicio de urgencias?",
    a: "Si. Servicio urgente 24 horas, 7 dias a la semana. En menos de 2 horas tienes un exterminador en camino. Ideal para plagas que no pueden esperar: avispas, ratas, chinches en hotel, etc.",
  },
  {
    q: "Que garantia tienen los tratamientos?",
    a: "Todos los exterminadores que recomendamos ofrecen garantia por escrito. Normalmente entre 3 y 12 meses segun el tipo de plaga. Si la plaga reaparece, vuelven sin coste adicional.",
  },
]

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="max-w-3xl mx-auto px-6 lg:px-8 py-20 lg:py-32">
      <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3 font-sans">FAQ</p>
      <h2 className="font-serif text-3xl sm:text-4xl tracking-tight text-foreground mb-12">Preguntas frecuentes</h2>

      <div className="divide-y divide-border">
        {faqs.map((faq, i) => (
          <div key={i} className="py-6">
            <button onClick={() => setOpenIndex(openIndex === i ? null : i)} className="w-full flex items-start justify-between gap-4 text-left">
              <span className="text-sm font-sans font-medium text-foreground">{faq.q}</span>
              <ChevronDown className={`w-4 h-4 text-muted-foreground flex-shrink-0 transition-transform ${openIndex === i ? "rotate-180" : ""}`} />
            </button>
            {openIndex === i && (
              <p className="text-sm text-muted-foreground font-sans leading-relaxed mt-4">{faq.a}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
