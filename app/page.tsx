import { Navbar } from "@/components/navbar"
import { HomeHero } from "@/components/home-hero"
import { ServicesSection } from "@/components/services-section"
import { HowItWorks } from "@/components/how-it-works"
import { ReviewsSection } from "@/components/reviews-section"
import { CtaSection } from "@/components/cta-section"
import { FaqSection } from "@/components/faq-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HomeHero />
        <ServicesSection />
        <HowItWorks />
        <ReviewsSection />
        <CtaSection />
        <FaqSection />
      </main>
      <Footer />
    </>
  )
}
