import { VALID_SERVICES, MODIFIERS, CITIES, PROBLEMS, type Service } from "@/lib/sitemap-data"

const BASE = "https://plagasypunto.com"

function buildUrlEntry(loc: string) {
  return `<url><loc>${loc}</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>`
}

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const rawSlug = (await params).slug
  const slug = rawSlug.replace(/\.xml$/, "")
  const urls: string[] = []

  if (slug === "service-landings") {
    for (const service of VALID_SERVICES) {
      for (const mod of MODIFIERS) {
        const path = mod ? `${service}${mod}` : service
        urls.push(buildUrlEntry(`${BASE}/${path}/`))
      }
    }
  } else if (slug.startsWith("necesidad-")) {
    const parts = slug.replace("necesidad-", "").split("-")
    const chunkIdx = parseInt(parts.pop() || "0")
    const serviceId = parts.join("-") as Service
    const problems = PROBLEMS[serviceId] || []
    const chunkSize = 500
    const chunk = problems.slice(chunkIdx, chunkIdx + chunkSize)
    for (const problem of chunk) {
      for (const city of CITIES) {
        urls.push(buildUrlEntry(`${BASE}/${serviceId}-${problem}/${city}/`))
      }
    }
  } else {
    let matched = false
    for (const service of VALID_SERVICES) {
      for (const mod of MODIFIERS) {
        const expected = mod ? `${service}${mod}` : service
        if (slug === expected) {
          for (const city of CITIES) {
            urls.push(buildUrlEntry(`${BASE}/${expected}/${city}/`))
          }
          matched = true
          break
        }
      }
      if (matched) break
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`

  return new Response(xml, { headers: { "Content-Type": "application/xml" } })
}
