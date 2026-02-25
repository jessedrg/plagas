import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { VALID_SERVICES, CITIES, type Service } from "@/lib/sitemap-data"
import { MessageCircle, ArrowRight, MapPin } from "lucide-react"

export const dynamicParams = true
export const revalidate = 604800

const WA_URL = "https://wa.me/34603389026?text=Hola%2C%20tengo%20un%20problema%20de%20plagas.%20%C2%BFPueden%20ayudarme%3F"

interface ServiceInfo {
  name: string
  title: string
  singular: string
  description: string
  signals: string[]
  process: { step: string; desc: string }[]
  tips: string[]
  duration: string
  guarantee: string
}

const SERVICE_INFO: Record<Service, ServiceInfo> = {
  "desratizacion": {
    name: "Desratización", title: "Desratización", singular: "desratización",
    description: "Las ratas y ratones son una de las plagas más peligrosas. Transmiten enfermedades, contaminan alimentos y causan daños estructurales al roer cables, tuberías y madera. Una pareja de ratas puede generar hasta 2.000 descendientes en un año, por lo que actuar rápido es fundamental.",
    signals: ["Excrementos pequeños y oscuros (5-14mm)", "Ruidos en techo, paredes o bajo el suelo por la noche", "Cables, muebles o envases roídos", "Olor fuerte a amoníaco en zonas cerradas", "Marcas de grasa en rodapiés y esquinas", "Nidos de papel, tela o materiales blandos"],
    process: [
      { step: "Inspección", desc: "El exterminador identifica el tipo de roedor, los puntos de entrada, las rutas de paso y la magnitud de la infestación." },
      { step: "Plan de acción", desc: "Se diseña un tratamiento personalizado: cebos rodenticidas en estaciones seguras, trampas mecánicas y sellado de accesos." },
      { step: "Tratamiento", desc: "Colocación estratégica de cebos y trampas. Los cebos actúan en 4-7 días para evitar que las ratas asocien el cebo con el peligro." },
      { step: "Seguimiento", desc: "Visitas de control para reponer cebos, retirar capturas y verificar la eliminación total. Sellado definitivo de accesos." },
    ],
    tips: ["No dejes comida accesible, guárdala en recipientes herméticos", "Sella grietas y agujeros mayores de 1cm", "Mantén la basura en contenedores cerrados", "Elimina fuentes de agua estancada", "No uses veneno sin supervisión profesional"],
    duration: "2-4 semanas", guarantee: "3-6 meses"
  },
  "desinsectacion": {
    name: "Desinsectación", title: "Desinsectación", singular: "desinsectación",
    description: "La desinsectación es el tratamiento profesional para eliminar todo tipo de insectos: cucarachas, hormigas, pulgas, chinches, mosquitos, polillas y más. Cada insecto requiere un tratamiento específico según su biología y comportamiento.",
    signals: ["Presencia de insectos vivos o muertos", "Excrementos o manchas en superficies", "Daños en alimentos, ropa o madera", "Picaduras en la piel", "Olores extraños en zonas cerradas", "Larvas o huevos en rincones"],
    process: [
      { step: "Diagnóstico", desc: "Identificación del tipo de insecto, focos de infestación y nivel de gravedad." },
      { step: "Selección del método", desc: "Gel, pulverización, nebulización o tratamiento térmico según el insecto y la situación." },
      { step: "Aplicación", desc: "Tratamiento en zonas afectadas y preventivo en zonas de riesgo. Productos homologados y seguros." },
      { step: "Control", desc: "Seguimiento para verificar la eliminación y prevenir reinfestaciones." },
    ],
    tips: ["Mantén la cocina y baños limpios y secos", "Sella grietas en paredes y rodapiés", "No acumules cartón ni papel", "Ventila regularmente", "Revisa la compra antes de guardarla"],
    duration: "1-3 semanas", guarantee: "3-6 meses"
  },
  "fumigacion": {
    name: "Fumigación", title: "Fumigación", singular: "fumigación",
    description: "La fumigación es un tratamiento intensivo que utiliza productos en forma de gas o niebla para alcanzar todos los rincones de un espacio. Es especialmente efectiva para infestaciones graves o espacios grandes como naves, almacenes y locales comerciales.",
    signals: ["Infestación extendida en múltiples zonas", "Plagas en lugares de difícil acceso", "Tratamientos anteriores sin éxito", "Necesidad de desinfección integral", "Preparación de locales antes de apertura", "Cumplimiento de normativa sanitaria"],
    process: [
      { step: "Evaluación", desc: "Análisis del espacio, tipo de plaga y nivel de infestación para determinar el método de fumigación." },
      { step: "Preparación", desc: "Sellado del espacio, protección de alimentos y objetos sensibles, y evacuación temporal si es necesario." },
      { step: "Fumigación", desc: "Aplicación del tratamiento mediante nebulización o termonebulización. El producto alcanza todos los rincones." },
      { step: "Ventilación", desc: "Tiempo de actuación y posterior ventilación del espacio. Verificación de seguridad antes de reocupar." },
    ],
    tips: ["Avisa a vecinos si vives en comunidad", "Retira alimentos y mascotas", "Cubre acuarios y terrarios", "Sigue las instrucciones del técnico", "No entres hasta que te lo indiquen"],
    duration: "1-2 días", guarantee: "3-6 meses"
  },
  "control-cucarachas": {
    name: "Control de Cucarachas", title: "Control de Cucarachas", singular: "control de cucarachas",
    description: "Las cucarachas son vectores de enfermedades como salmonela, gastroenteritis y alergias. Se reproducen rápidamente: una cucaracha alemana puede generar 300.000 descendientes en un año. El tratamiento con gel profesional es el método más efectivo y seguro.",
    signals: ["Cucarachas vivas, especialmente de noche", "Excrementos como granos de café molido", "Olor dulzón y desagradable", "Ootecas (cápsulas de huevos) en rincones", "Manchas marrones en paredes y muebles", "Cucarachas muertas en zonas húmedas"],
    process: [
      { step: "Identificación", desc: "Determinamos la especie (alemana, oriental, americana) ya que cada una requiere un enfoque diferente." },
      { step: "Gel insecticida", desc: "Aplicación de gel profesional en puntos estratégicos. Las cucarachas lo comen, vuelven al nido y contagian a las demás." },
      { step: "Efecto dominó", desc: "El gel actúa en cascada eliminando toda la colonia, incluyendo las que no salen de su escondite." },
      { step: "Revisión", desc: "Control a las 2-3 semanas para verificar la eliminación y reforzar si es necesario." },
    ],
    tips: ["No dejes platos sucios por la noche", "Sella las tuberías con silicona", "Vacía la basura a diario", "Limpia detrás de electrodomésticos", "No uses sprays, dispersan la plaga"],
    duration: "1-2 semanas", guarantee: "3-6 meses"
  },
  "control-termitas": {
    name: "Control de Termitas", title: "Control de Termitas", singular: "control de termitas",
    description: "Las termitas son insectos xilófagos que se alimentan de madera y pueden causar daños estructurales graves. Una colonia puede contener millones de individuos y trabajar en silencio durante años antes de que notes los daños. La detección temprana es crucial.",
    signals: ["Madera que suena hueca al golpear", "Serrín fino cerca de muebles o vigas", "Pequeños agujeros en la madera (1-2mm)", "Túneles de barro en paredes", "Alas de termitas cerca de ventanas", "Pintura agrietada o abombada"],
    process: [
      { step: "Inspección técnica", desc: "Revisión exhaustiva con detectores de humedad y cámaras térmicas para localizar todos los focos." },
      { step: "Diagnóstico", desc: "Identificación de la especie (subterránea, de madera seca) y evaluación de daños estructurales." },
      { step: "Tratamiento", desc: "Cebos con inhibidores de crecimiento, inyección en madera o barrera química según el caso." },
      { step: "Garantía", desc: "Seguimiento anual y garantía de hasta 5 años contra reinfestación." },
    ],
    tips: ["Evita el contacto madera-suelo", "Ventila zonas húmedas", "Revisa periódicamente vigas y marcos", "No almacenes leña junto a la casa", "Actúa ante la primera señal"],
    duration: "1-3 meses", guarantee: "3-5 años"
  },
  "control-chinches": {
    name: "Control de Chinches", title: "Control de Chinches", singular: "control de chinches",
    description: "Las chinches de cama son parásitos que se alimentan de sangre humana durante la noche. Sus picaduras causan irritación, insomnio y ansiedad. Se propagan fácilmente a través de equipaje, ropa y muebles de segunda mano. Son muy resistentes y difíciles de eliminar sin tratamiento profesional.",
    signals: ["Picaduras en línea o grupo al despertar", "Manchas de sangre en sábanas", "Puntos negros (excrementos) en costuras del colchón", "Olor dulzón característico", "Chinches vivas en costuras y grietas", "Mudas de piel translúcidas"],
    process: [
      { step: "Inspección", desc: "Revisión minuciosa de colchón, somier, cabecero, mesillas y cualquier grieta cercana a la cama." },
      { step: "Tratamiento térmico", desc: "Aplicación de calor a 56°C que mata chinches en todas sus fases (huevo, ninfa, adulto) sin químicos." },
      { step: "Tratamiento químico", desc: "Insecticida residual en zonas de refugio para eliminar las que escapen al calor." },
      { step: "Seguimiento", desc: "Revisión a las 2-3 semanas. Las chinches tienen ciclos de 7-10 días, por lo que el seguimiento es crucial." },
    ],
    tips: ["Lava ropa de cama a 60°C mínimo", "Aspira colchón y somier regularmente", "Revisa el equipaje al volver de viaje", "Cuidado con muebles de segunda mano", "No cambies de habitación, extiendes la plaga"],
    duration: "2-3 semanas", guarantee: "3-6 meses"
  },
  "eliminar-avispas": {
    name: "Eliminar Avispas", title: "Eliminación de Avispas", singular: "eliminación de avispas",
    description: "Los nidos de avispas pueden contener miles de individuos y suponen un riesgo grave, especialmente para personas alérgicas. Las avispas atacan en grupo cuando se sienten amenazadas. Nunca intentes retirar un nido sin equipo profesional. La avispa asiática (velutina) es especialmente peligrosa.",
    signals: ["Avispas entrando y saliendo de un punto fijo", "Nido visible en tejado, árbol o estructura", "Zumbido constante cerca de la zona", "Avispas agresivas al acercarse", "Aumento de avispas en jardín o terraza", "Nido de papel gris o marrón"],
    process: [
      { step: "Localización", desc: "Identificación del nido y evaluación del riesgo según ubicación, tamaño y especie." },
      { step: "Equipamiento", desc: "El técnico utiliza traje de protección completo, guantes y máscara." },
      { step: "Eliminación", desc: "Aplicación de insecticida específico y retirada física del nido una vez inactivo." },
      { step: "Prevención", desc: "Sellado del punto de anidación para evitar que vuelvan a construir." },
    ],
    tips: ["No te acerques al nido", "No uses agua ni fuego", "Mantén la calma si te rodean avispas", "Evita perfumes fuertes en exterior", "Llama a profesionales, no improvises"],
    duration: "1-2 horas", guarantee: "Temporada"
  },
  "control-hormigas": {
    name: "Control de Hormigas", title: "Control de Hormigas", singular: "control de hormigas",
    description: "Las hormigas viven en colonias organizadas con miles o millones de individuos. Matar las que ves no soluciona el problema: la reina sigue produciendo huevos. El tratamiento profesional con cebo llega hasta el hormiguero y elimina la colonia desde la raíz.",
    signals: ["Filas de hormigas en cocina o baño", "Hormigas con alas (reproductoras)", "Montículos de tierra en jardín", "Hormigas en alimentos dulces o grasos", "Serrín fino (hormigas carpinteras)", "Actividad constante en el mismo recorrido"],
    process: [
      { step: "Identificación", desc: "Determinamos la especie (negra, argentina, carpintera, faraón) y localizamos el hormiguero." },
      { step: "Cebo profesional", desc: "Las obreras llevan el cebo al hormiguero y lo comparten con la colonia, incluyendo la reina." },
      { step: "Eliminación", desc: "En 1-2 semanas el cebo elimina toda la colonia, no solo las hormigas visibles." },
      { step: "Prevención", desc: "Sellado de accesos y recomendaciones para evitar reinfestación." },
    ],
    tips: ["Limpia restos de comida inmediatamente", "Sella grietas y juntas", "No dejes comida de mascotas fuera", "Guarda el azúcar en recipientes herméticos", "No uses sprays, solo matan las visibles"],
    duration: "1-2 semanas", guarantee: "3-6 meses"
  },
  "control-pulgas": {
    name: "Control de Pulgas", title: "Control de Pulgas", singular: "control de pulgas",
    description: "Las pulgas son parásitos que se alimentan de sangre de mascotas y humanos. Sus picaduras causan irritación intensa y pueden transmitir enfermedades. Una pulga hembra pone hasta 50 huevos al día. El 95% de la infestación está en el ambiente (huevos, larvas, pupas), no en el animal.",
    signals: ["Picaduras en tobillos y piernas", "Mascota que se rasca constantemente", "Puntos negros (excrementos) en pelo del animal", "Pulgas saltando en alfombras o sofás", "Larvas blancas en rincones", "Picaduras incluso sin mascota en casa"],
    process: [
      { step: "Tratamiento del animal", desc: "Aplicación de antiparasitario veterinario en todas las mascotas de la casa." },
      { step: "Tratamiento del hogar", desc: "Insecticida con IGR (regulador de crecimiento) que elimina adultos y evita que huevos y larvas maduren." },
      { step: "Aspirado intensivo", desc: "Las vibraciones del aspirador hacen eclosionar las pupas, exponiéndolas al tratamiento." },
      { step: "Seguimiento", desc: "Revisión a las 2-3 semanas para tratar posibles eclosiones tardías." },
    ],
    tips: ["Aspira a diario durante el tratamiento", "Lava camas de mascotas a 60°C", "Trata a todas las mascotas simultáneamente", "No olvides el coche si viaja tu mascota", "Mantén el tratamiento antiparasitario"],
    duration: "2-3 semanas", guarantee: "3 meses"
  },
  "control-mosquitos": {
    name: "Control de Mosquitos", title: "Control de Mosquitos", singular: "control de mosquitos",
    description: "Los mosquitos no solo son molestos, también transmiten enfermedades como dengue, Zika y fiebre del Nilo. El mosquito tigre, presente en España, es especialmente agresivo y pica de día. El control efectivo requiere eliminar los focos de cría y tratar las zonas de descanso.",
    signals: ["Picaduras frecuentes, especialmente al atardecer", "Mosquitos en interior de la vivienda", "Agua estancada en jardín o terraza", "Zumbido nocturno en dormitorios", "Larvas en agua de macetas o canalones", "Presencia de mosquito tigre (rayas blancas)"],
    process: [
      { step: "Inspección", desc: "Localización de todos los focos de cría: agua estancada, canalones, macetas, piscinas sin tratar." },
      { step: "Larvicida", desc: "Tratamiento del agua con productos que impiden el desarrollo de larvas." },
      { step: "Adulticida", desc: "Pulverización en zonas de descanso de mosquitos adultos: vegetación, sombras, muros." },
      { step: "Prevención", desc: "Recomendaciones para eliminar focos de cría y mantener el control." },
    ],
    tips: ["Vacía cualquier recipiente con agua estancada", "Cambia el agua de macetas semanalmente", "Mantén la piscina tratada", "Limpia canalones regularmente", "Usa mosquiteras en ventanas"],
    duration: "Tratamiento periódico", guarantee: "1-2 meses"
  },
  "control-palomas": {
    name: "Control de Palomas", title: "Control de Palomas", singular: "control de palomas",
    description: "Las palomas causan daños en fachadas, balcones y tejados. Sus excrementos son ácidos y corroen materiales, además de transmitir enfermedades respiratorias. Los métodos caseros no funcionan a largo plazo. Se necesitan sistemas profesionales que impidan físicamente el posado.",
    signals: ["Palomas posadas habitualmente en el mismo lugar", "Acumulación de excrementos", "Nidos en cornisas o huecos", "Daños en fachada o pintura", "Ruidos molestos", "Plumas y suciedad constante"],
    process: [
      { step: "Evaluación", desc: "Análisis de la zona afectada, puntos de posado y nivel de infestación." },
      { step: "Sistema antiposado", desc: "Instalación de pinchos, redes, cables tensados o sistemas eléctricos según la situación." },
      { step: "Limpieza", desc: "Retirada de nidos y limpieza profesional de excrementos con desinfección." },
      { step: "Mantenimiento", desc: "Revisión periódica del sistema y ajustes si es necesario." },
    ],
    tips: ["No alimentes a las palomas", "Cierra accesos a áticos y huecos", "Limpia excrementos con protección", "Los métodos caseros no funcionan", "Actúa antes de que aniden"],
    duration: "1-2 días instalación", guarantee: "2-5 años"
  },
  "desinfeccion": {
    name: "Desinfección", title: "Desinfección", singular: "desinfección",
    description: "La desinfección profesional elimina bacterias, virus, hongos y otros microorganismos patógenos. Es obligatoria para establecimientos de hostelería, alimentación, sanitarios y otros sectores regulados. Incluye certificado oficial válido para inspecciones de sanidad.",
    signals: ["Requisito legal para tu negocio", "Preparación para inspección de sanidad", "Después de una plaga", "Olores persistentes", "Brote de enfermedad", "Apertura o reapertura de local"],
    process: [
      { step: "Evaluación", desc: "Análisis del espacio y determinación del nivel de desinfección necesario." },
      { step: "Preparación", desc: "Protección de equipos sensibles y preparación del espacio." },
      { step: "Desinfección", desc: "Aplicación de biocidas homologados mediante pulverización o nebulización." },
      { step: "Certificación", desc: "Emisión de certificado oficial con todos los datos del tratamiento." },
    ],
    tips: ["Programa desinfecciones periódicas", "Guarda los certificados", "Cumple los plazos según normativa", "Combina con desratización y desinsectación", "Elige empresas registradas en ROESB"],
    duration: "2-4 horas", guarantee: "Certificado válido"
  },
  "certificado-control-plagas": {
    name: "Certificado Control Plagas", title: "Certificados Oficiales de Control de Plagas", singular: "certificado de control de plagas",
    description: "Los certificados DDD (Desinsectación, Desratización, Desinfección) son documentos oficiales que acreditan que un establecimiento ha sido tratado por una empresa autorizada. Son obligatorios para hostelería, alimentación, sanitarios y otros sectores. Emitidos por empresas registradas en el ROESB.",
    signals: ["Apertura de negocio de hostelería", "Inspección de sanidad programada", "Renovación de licencia de actividad", "Requisito de franquicia o cadena", "Auditoría de calidad", "Denuncia o queja de clientes"],
    process: [
      { step: "Contacto", desc: "Nos indicas el tipo de certificado que necesitas y la urgencia." },
      { step: "Tratamiento", desc: "Un técnico realiza el tratamiento correspondiente (desinsectación, desratización y/o desinfección)." },
      { step: "Documentación", desc: "Se genera el certificado oficial con todos los datos: establecimiento, productos, fecha, técnico responsable." },
      { step: "Entrega", desc: "Certificado en 24-48h. Servicio urgente disponible para inspecciones inminentes." },
    ],
    tips: ["Solicita el certificado con antelación", "Verifica que la empresa esté en el ROESB", "Guarda todos los certificados", "Programa tratamientos periódicos", "El certificado debe incluir número de registro"],
    duration: "24-48 horas", guarantee: "Válido para sanidad"
  },
}

const SERVICE_IMAGES: Record<string, string> = {
  "desratizacion": "https://images.unsplash.com/photo-1633331915190-fe4810c7da87?q=80&w=2070&auto=format&fit=crop",
  "desinsectacion": "https://images.unsplash.com/photo-1636791013127-37effd526316?q=80&w=2070&auto=format&fit=crop",
  "fumigacion": "https://images.unsplash.com/photo-1636791013127-37effd526316?q=80&w=2070&auto=format&fit=crop",
  "control-cucarachas": "https://images.unsplash.com/photo-1701554193871-a605f56e3005?q=80&w=2070&auto=format&fit=crop",
  "control-termitas": "https://images.unsplash.com/photo-1540854114405-7f108634a897?q=80&w=2070&auto=format&fit=crop",
  "control-chinches": "https://images.unsplash.com/photo-1681695749552-71e397581267?q=80&w=1974&auto=format&fit=crop",
  "eliminar-avispas": "https://images.unsplash.com/photo-1662886444247-3a3c54303239?q=80&w=1974&auto=format&fit=crop",
  "control-hormigas": "https://images.unsplash.com/photo-1611748939902-060e1ae99f32?q=80&w=2014&auto=format&fit=crop",
  "control-pulgas": "https://images.unsplash.com/photo-1584709636716-3293bcc4517d?q=80&w=1973&auto=format&fit=crop",
  "control-mosquitos": "https://images.unsplash.com/photo-1584709636716-3293bcc4517d?q=80&w=1973&auto=format&fit=crop",
  "control-palomas": "https://images.unsplash.com/photo-1572262086204-3909bfc93ea0?q=80&w=2071&auto=format&fit=crop",
  "desinfeccion": "https://images.unsplash.com/photo-1636791013127-37effd526316?q=80&w=2070&auto=format&fit=crop",
  "certificado-control-plagas": "https://images.unsplash.com/photo-1644576854212-2d1e383888eb?q=80&w=987&auto=format&fit=crop",
}

const MAIN_CITIES = [
  "madrid", "barcelona", "valencia", "sevilla", "zaragoza", "malaga",
  "murcia", "palma-de-mallorca", "las-palmas-de-gran-canaria", "bilbao",
  "alicante", "cordoba", "valladolid", "vigo", "gijon", "hospitalet-de-llobregat",
  "vitoria-gasteiz", "la-coruna", "granada", "elche", "oviedo", "terrassa",
  "badalona", "cartagena", "jerez-de-la-frontera", "sabadell", "mostoles",
  "santa-cruz-de-tenerife", "alcala-de-henares", "pamplona", "fuenlabrada",
  "almeria", "san-sebastian", "leganes", "santander", "burgos", "albacete",
  "getafe", "salamanca", "logrono", "huelva", "badajoz", "tarragona",
  "lleida", "marbella", "leon", "cadiz", "dos-hermanas", "torrevieja",
]

function getCityDisplayName(slug: string): string {
  return slug.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
}

interface PageProps { params: Promise<{ service: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { service: serviceId } = await params
  if (!VALID_SERVICES.includes(serviceId as Service)) return { title: "No encontrado" }

  const serviceInfo = SERVICE_INFO[serviceId as Service]
  return {
    title: `${serviceInfo.title} en España | Exterminadores Certificados | plagas`,
    description: `${serviceInfo.description} Servicio en toda España. Presupuestos gratis. Urgencias 24h.`,
    alternates: { canonical: `https://plagasypunto.com/${serviceId}/` },
    openGraph: { title: `${serviceInfo.title} en España`, description: serviceInfo.description, type: "website", siteName: "plagas" },
  }
}

export default async function ServiceHubPage({ params }: PageProps) {
  const { service: serviceId } = await params
  if (!VALID_SERVICES.includes(serviceId as Service)) notFound()

  const serviceInfo = SERVICE_INFO[serviceId as Service]
  const heroImg = SERVICE_IMAGES[serviceId] || SERVICE_IMAGES["desratizacion"]
  const relatedServices = VALID_SERVICES.filter(s => s !== serviceId).slice(0, 6)

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative bg-foreground text-background overflow-hidden">
          <div className="absolute inset-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={heroImg} alt={serviceInfo.title} className="w-full h-full object-cover opacity-30" />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-28">
            <nav className="text-[10px] tracking-[0.3em] uppercase text-background/30 mb-8 font-sans flex items-center gap-2">
              <Link href="/" className="hover:text-background/60 transition-colors">Inicio</Link>
              <span>/</span>
              <span className="text-background/60">{serviceInfo.title}</span>
            </nav>
            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-background leading-[0.95]">
              {serviceInfo.title}
              <br />
              <span className="italic font-light">en toda España</span>
            </h1>
            <p className="text-sm sm:text-base text-background/50 mt-8 max-w-xl font-sans leading-relaxed">
              {serviceInfo.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-10">
              <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-background text-foreground px-8 py-4 text-sm font-sans font-medium hover:opacity-90 transition-opacity">
                <MessageCircle className="w-4 h-4" /> Urgencias 24h
              </a>
              <a href="#ciudades" className="inline-flex items-center justify-center gap-2 border border-background/20 text-background px-8 py-4 text-sm font-sans hover:border-background/50 transition-colors">
                Ver ciudades <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </section>

        {/* Señales de alerta */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32 border-b border-border">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16">
            <div className="lg:col-span-4">
              <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3 font-sans">Señales de alerta</p>
              <h2 className="font-serif text-2xl sm:text-4xl tracking-tight text-foreground leading-[1.05]">
                ¿Cómo saber si tienes este problema?
              </h2>
              <p className="text-sm text-muted-foreground mt-4 font-sans leading-relaxed">
                Detectar el problema a tiempo es clave para un tratamiento rápido y efectivo. Estas son las señales más comunes:
              </p>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <ul className="grid sm:grid-cols-2 gap-4">
                {serviceInfo.signals.map((signal, i) => (
                  <li key={i} className="flex items-start gap-3 p-4 bg-secondary/50">
                    <span className="text-xs text-muted-foreground font-mono mt-0.5">0{i + 1}</span>
                    <span className="text-sm text-foreground font-sans">{signal}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Proceso */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32 border-b border-border">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16">
            <div className="lg:col-span-4">
              <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3 font-sans">El proceso</p>
              <h2 className="font-serif text-2xl sm:text-4xl tracking-tight text-foreground leading-[1.05]">
                Cómo trabajamos
              </h2>
              <p className="text-sm text-muted-foreground mt-4 font-sans leading-relaxed">
                Nuestros exterminadores certificados siguen un proceso profesional para garantizar la eliminación completa.
              </p>
              <div className="mt-6 p-4 bg-secondary/50">
                <p className="text-xs text-muted-foreground font-sans">Duración estimada</p>
                <p className="text-lg font-serif text-foreground mt-1">{serviceInfo.duration}</p>
                <p className="text-xs text-muted-foreground font-sans mt-3">Garantía</p>
                <p className="text-lg font-serif text-foreground mt-1">{serviceInfo.guarantee}</p>
              </div>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <div className="space-y-6">
                {serviceInfo.process.map((step, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 bg-foreground text-background flex items-center justify-center font-serif text-lg">
                      {i + 1}
                    </div>
                    <div className="flex-1 pt-1">
                      <h3 className="text-base font-sans font-medium text-foreground">{step.step}</h3>
                      <p className="text-sm text-muted-foreground mt-2 font-sans leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Consejos */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32 border-b border-border">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16">
            <div className="lg:col-span-4">
              <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3 font-sans">Consejos</p>
              <h2 className="font-serif text-2xl sm:text-4xl tracking-tight text-foreground leading-[1.05]">
                Qué puedes hacer tú
              </h2>
              <p className="text-sm text-muted-foreground mt-4 font-sans leading-relaxed">
                Mientras esperas al profesional o para prevenir futuras infestaciones, sigue estos consejos:
              </p>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <ul className="space-y-4">
                {serviceInfo.tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-4 p-4 border border-border">
                    <svg className="w-5 h-5 text-foreground flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-foreground font-sans">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Ciudades principales */}
        <section id="ciudades" className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-12 gap-4 mb-16">
            <div className="lg:col-span-5">
              <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3 font-sans">Ciudades</p>
              <h2 className="font-serif text-3xl sm:text-5xl tracking-tight text-foreground leading-[1.05]">
                {serviceInfo.title}
                <br />
                <span className="italic font-light">cerca de ti</span>
              </h2>
            </div>
            <div className="lg:col-span-5 lg:col-start-8 flex items-end">
              <p className="text-sm text-muted-foreground font-sans leading-relaxed">
                Selecciona tu ciudad para ver exterminadores certificados en tu zona. Servicio disponible en más de 8.000 localidades.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {MAIN_CITIES.map(city => (
              <Link
                key={city}
                href={`/${serviceId}/${city}/`}
                className="group flex items-center gap-2 p-4 border border-border hover:border-foreground/30 hover:bg-secondary transition-all"
              >
                <MapPin className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0" />
                <span className="text-sm font-sans text-foreground truncate">{getCityDisplayName(city)}</span>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground font-sans">
              ¿No encuentras tu ciudad? <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-4 hover:no-underline">Escríbenos por WhatsApp</a> y te conectamos con exterminadores de tu zona.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-foreground">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 py-16 lg:py-24 text-center">
            <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl tracking-tight text-background leading-[1.05]">
              {serviceInfo.title} profesional
              <br />
              <span className="italic font-light">con garantía</span>
            </h2>
            <p className="text-sm text-background/50 mt-6 font-sans max-w-md mx-auto">
              Exterminadores certificados. Presupuestos gratis. Servicio urgente 24h.
            </p>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-background text-foreground px-8 py-4 mt-10 text-sm font-sans font-medium hover:opacity-90 transition-opacity">
              <MessageCircle className="w-4 h-4" /> Contactar ahora
            </a>
          </div>
        </section>

        {/* Otros servicios */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32">
          <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3 font-sans">Otros servicios</p>
          <h2 className="font-serif text-2xl sm:text-4xl tracking-tight text-foreground mb-12">También te puede interesar</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedServices.map(svc => (
              <Link
                key={svc}
                href={`/${svc}/`}
                className="group p-6 border border-border hover:border-foreground/30 hover:bg-secondary transition-all"
              >
                <h3 className="text-sm font-sans font-medium text-foreground group-hover:underline">{SERVICE_INFO[svc as Service]?.title}</h3>
                <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{SERVICE_INFO[svc as Service]?.description}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
