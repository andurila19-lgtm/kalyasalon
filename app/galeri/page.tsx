import { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { MobileStickyCta } from "@/components/layout/mobile-sticky-cta";
import { Gallery } from "@/components/sections/gallery/gallery";
import { FinalCta } from "@/components/sections/booking/final-cta";

export const metadata: Metadata = {
  title: "Galeri Foto Portofolio — Kalya Salon Madiun",
  description:
    "Lihat galeri hasil karya potong rambut, Korean perm, pewarnaan balayage, smoothing silk, dan suasana studio salon yang estetik dan bersih di Kalya Salon Madiun.",
  alternates: {
    canonical: "/galeri",
  },
};

export default function GaleriPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="grow pt-24 sm:pt-28">
        {/* Page Hero Header */}
        <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-brand-soft-pink/40 to-background border-b border-border/60">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary">
              <span className="w-4 h-px bg-gold" />
              <span>Visual Portfolio</span>
              <span className="w-4 h-px bg-gold" />
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-foreground leading-tight">
              Galeri Karya & Suasana <br />
              <span className="italic font-normal text-primary">Kalya Salon Madiun</span>
            </h1>

            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Inspirasi gaya rambut terkini dan potret nyata ruang studio kami. Klik pada setiap foto untuk melihat detail portofolio lebih jelas.
            </p>
          </div>
        </section>

        {/* Gallery Component with Lightbox */}
        <Gallery />

        {/* Final Conversion CTA */}
        <FinalCta />
      </main>

      <Footer />
      <MobileStickyCta />
    </div>
  );
}
