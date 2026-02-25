"use client"

import { useState } from "react"
import Link from "next/link"
import { MessageCircle, Menu, X } from "lucide-react"

const WA_URL = "https://wa.me/34603389026?text=Hola%2C%20tengo%20un%20problema%20de%20plagas.%20%C2%BFPueden%20ayudarme%3F"

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/40">
      <nav className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-14 lg:h-16">
        <Link href="/" className="flex items-center gap-1">
          <span className="text-xl lg:text-2xl font-serif italic text-foreground tracking-tight">plagas</span>
        </Link>

        <div className="hidden lg:flex items-center gap-10 text-[13px] tracking-wide font-sans">
          <Link href="#servicios" className="text-muted-foreground hover:text-foreground transition-colors">Servicios</Link>
          <Link href="#proceso" className="text-muted-foreground hover:text-foreground transition-colors">Proceso</Link>
          <Link href="#opiniones" className="text-muted-foreground hover:text-foreground transition-colors">Opiniones</Link>
          <Link href="#faq" className="text-muted-foreground hover:text-foreground transition-colors">FAQ</Link>
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-foreground text-background text-[13px] px-5 py-2 hover:opacity-80 transition-opacity">
            <MessageCircle className="w-3.5 h-3.5" /> Urgencias 24h
          </a>
        </div>

        <button onClick={() => setOpen(!open)} className="lg:hidden p-2 -mr-2">
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {open && (
        <div className="lg:hidden border-t border-border bg-background px-6 py-6 space-y-4">
          <Link href="#servicios" onClick={() => setOpen(false)} className="block text-sm text-muted-foreground">Servicios</Link>
          <Link href="#proceso" onClick={() => setOpen(false)} className="block text-sm text-muted-foreground">Proceso</Link>
          <Link href="#opiniones" onClick={() => setOpen(false)} className="block text-sm text-muted-foreground">Opiniones</Link>
          <Link href="#faq" onClick={() => setOpen(false)} className="block text-sm text-muted-foreground">FAQ</Link>
          <hr className="border-border" />
          <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="block text-center bg-foreground text-background text-sm px-6 py-3">
            <MessageCircle className="w-4 h-4 inline mr-2" /> Urgencias 24h por WhatsApp
          </a>
        </div>
      )}
    </header>
  )
}
