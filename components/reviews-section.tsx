import { Star, Quote } from "lucide-react"

const reviews = [
  {
    name: "Maria L.",
    city: "Madrid",
    text: "Teniamos ratas en el garaje y no sabiamos que hacer. plagas nos conecto con un exterminador en 2 horas. En una semana, problema resuelto. Servicio impecable.",
    rating: 5,
  },
  {
    name: "Carlos y Ana",
    city: "Barcelona",
    text: "Chinches en el colchon despues de un viaje. Pensabamos que tendriamos que tirar todo. El profesional que nos envio plagas hizo tratamiento termico y en 3 dias, cero chinches.",
    rating: 5,
  },
  {
    name: "Elena R.",
    city: "Valencia",
    text: "Cucarachas en la cocina del restaurante. Urgencia total. plagas nos consiguio un exterminador certificado en el mismo dia. Tratamiento con gel, sin cerrar el local. Perfecto.",
    rating: 5,
  },
  {
    name: "Javier M.",
    city: "Sevilla",
    text: "Nido de avispas en el tejado. Mis hijos no podian salir al jardin. Vinieron el mismo dia y lo retiraron en 30 minutos. Profesionales de verdad.",
    rating: 5,
  },
  {
    name: "Patricia S.",
    city: "Bilbao",
    text: "Termitas en las vigas del salon. Pensaba que era el fin de la casa. El tratamiento fue limpio, sin olores, y con 5 anos de garantia. Muy tranquila ahora.",
    rating: 5,
  },
  {
    name: "Roberto G.",
    city: "Malaga",
    text: "Plaga de hormigas que no habia manera de eliminar. Despues de 3 intentos por mi cuenta, llame a plagas. Un profesional vino, puso cebo y en 10 dias desaparecieron todas.",
    rating: 4,
  },
]

export function ReviewsSection() {
  return (
    <section id="opiniones" className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32">
      <div className="grid lg:grid-cols-12 gap-4 mb-16 lg:mb-24">
        <div className="lg:col-span-5">
          <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3 font-sans">Opiniones</p>
          <h2 className="font-serif text-3xl sm:text-5xl tracking-tight text-foreground leading-[1.05]">
            Lo que dicen
            <br />
            <span className="italic font-light">nuestros clientes.</span>
          </h2>
        </div>
        <div className="lg:col-span-5 lg:col-start-8 flex items-end">
          <p className="text-sm text-muted-foreground font-sans leading-relaxed">
            Mas de 15.000 plagas eliminadas en toda España. Valoracion media de 4.9 sobre 5.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review, i) => (
          <div key={i} className="bg-secondary p-8 flex flex-col">
            <Quote className="w-6 h-6 text-muted-foreground/30 mb-4" />
            <p className="text-sm text-foreground/80 font-sans leading-relaxed flex-1">{review.text}</p>
            <div className="mt-6 pt-6 border-t border-border flex items-center justify-between">
              <div>
                <p className="text-sm font-sans font-medium text-foreground">{review.name}</p>
                <p className="text-xs text-muted-foreground">{review.city}</p>
              </div>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className={`w-3.5 h-3.5 ${j < review.rating ? "fill-foreground text-foreground" : "text-muted-foreground/30"}`} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
