import { VALID_SERVICES, MODIFIERS, PROBLEMS } from "@/lib/sitemap-data"

const BASE = "https://plagasypunto.com"

export async function GET() {
  const sitemaps: string[] = []

  sitemaps.push(`<sitemap><loc>${BASE}/sitemap-files/service-landings.xml</loc></sitemap>`)

  for (const service of VALID_SERVICES) {
    for (const mod of MODIFIERS) {
      const slug = mod ? `${service}${mod}` : service
      sitemaps.push(`<sitemap><loc>${BASE}/sitemap-files/${slug}.xml</loc></sitemap>`)
    }
    const problems = PROBLEMS[service] || []
    const chunkSize = 500
    for (let i = 0; i < problems.length; i += chunkSize) {
      sitemaps.push(`<sitemap><loc>${BASE}/sitemap-files/necesidad-${service}-${i}.xml</loc></sitemap>`)
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps.join("\n")}
</sitemapindex>`

  return new Response(xml, { headers: { "Content-Type": "application/xml" } })
}
