import type { Metadata } from "next"
import { Inter, Cormorant_Garamond } from "next/font/google"
import "./globals.css"
import WhatsAppButton from "@/components/whatsapp-button"
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" })
const cormorant = Cormorant_Garamond({ subsets: ["latin"], variable: "--font-serif", weight: ["300", "400", "500", "600"], display: "swap" })

export const metadata: Metadata = {
  title: "plagas — Control de Plagas Profesional en España",
  description: "Conectamos con los mejores exterminadores certificados. Desratización, desinsectación, control de cucarachas, chinches, termitas. Servicio urgente 24h.",
  keywords: "control plagas, desratizacion, desinsectacion, cucarachas, chinches, termitas, avispas, exterminador",
  openGraph: {
    title: "plagas — Control de Plagas Profesional en España",
    description: "Conectamos con los mejores exterminadores certificados. Servicio urgente 24h.",
    type: "website",
    siteName: "plagas",
    images: [{ url: "/og", width: 1200, height: 630, alt: "plagas — Control de Plagas Profesional" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "plagas — Control de Plagas Profesional",
    description: "Conectamos con los mejores exterminadores certificados.",
    images: ["/og"],
  },
  icons: [{ rel: "icon", url: "/icon.svg", type: "image/svg+xml" }],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${inter.variable} ${cormorant.variable}`}>
      <body>
        {children}
        <WhatsAppButton />
        <Analytics />
      </body>
    </html>
  )
}
