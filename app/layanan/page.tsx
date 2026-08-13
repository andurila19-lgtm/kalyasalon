import { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { MobileStickyCta } from "@/components/layout/mobile-sticky-cta";
import { Services } from "@/components/sections/services/services";
import { FinalCta } from "@/components/sections/booking/final-cta";

export const metadata: Metadata = {
  title: "Menu Layanan — Kalya Salon Madiun",
  description:
    "Pilihan lengkap layanan potong rambut wanita, Korean wave perm, balayage coloring, smoothing, scalp detox spa, dan perawatan intensif di Kalya Salon Kota Madiun.",
  alternates: {
    canonical: "/layanan",
  },
};

export default function LayananPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="grow pt-24 sm:pt-28">
        {/* Page Hero Header */}
        <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-brand-soft-pink/40 to-background border-b border-border/60">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary">
              <span className="w-4 h-px bg-gold" />
              <span>Full Service Menu</span>
              <span className="w-4 h-px bg-gold" />
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-foreground leading-tight">
              Pilihan Perawatan Rambut <br />
              <span className="italic font-normal text-primary">Berkelas & Terpercaya</span>
            </h1>

            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Jelajahi berbagai menu layanan salon kami mulai dari gunting rambut presisi, perming Korea, pewarnaan balayage berkilau, hingga terapi spa kulit kepala.
            </p>
          </div>
        </section>

        {/* Full Services Component with Category Filter */}
        <Services />

        {/* Final Conversion CTA */}
        <FinalCta />
      </main>

      <Footer />
      <MobileStickyCta />
    </div>
  );
}
