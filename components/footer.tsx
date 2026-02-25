import Link from "next/link"
import { MessageCircle, Mail, MapPin } from "lucide-react"

const WA_URL = "https://wa.me/34603389026?text=Hola%2C%20tengo%20un%20problema%20de%20plagas.%20%C2%BFPueden%20ayudarme%3F"

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          <div className="lg:col-span-1">
            <Link href="/" className="text-2xl font-serif italic text-background tracking-tight">plagas</Link>
            <p className="text-background/50 text-xs mt-4 leading-relaxed max-w-xs">
              Control de plagas profesional en toda España. Conectamos con exterminadores certificados para que tu hogar este libre de plagas.
            </p>
          </div>

          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-background/30 mb-4">Servicios</p>
            <ul className="space-y-2.5">
              {["Desratización", "Control cucarachas", "Control chinches", "Control termitas", "Eliminar avispas", "Desinfección"].map(s => (
                <li key={s}><Link href="/" className="text-xs text-background/60 hover:text-background transition-colors">{s}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-background/30 mb-4">Ciudades</p>
            <ul className="space-y-2.5">
              {["Madrid", "Barcelona", "Valencia", "Sevilla", "Bilbao", "Malaga"].map(c => (
                <li key={c}><Link href={`/desratizacion/${c.toLowerCase()}/`} className="text-xs text-background/60 hover:text-background transition-colors">{c}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-background/30 mb-4">Contacto</p>
            <ul className="space-y-3">
              <li>
                <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs text-background/60 hover:text-background transition-colors">
                  <MessageCircle className="w-3.5 h-3.5" /> WhatsApp 24h: 603 38 90 26
                </a>
              </li>
              <li>
                <a href="mailto:hola@plagasypunto.com" className="flex items-center gap-2 text-xs text-background/60 hover:text-background transition-colors">
                  <Mail className="w-3.5 h-3.5" /> hola@plagasypunto.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-xs text-background/60">
                <MapPin className="w-3.5 h-3.5" /> España
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/10 mt-16 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[10px] text-background/30">© {new Date().getFullYear()} plagas. Todos los derechos reservados.</p>
          <div className="flex gap-6 text-[10px] text-background/30">
            <Link href="/" className="hover:text-background/60 transition-colors">Privacidad</Link>
            <Link href="/" className="hover:text-background/60 transition-colors">Legal</Link>
            <Link href="/" className="hover:text-background/60 transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
