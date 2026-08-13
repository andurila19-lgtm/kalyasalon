import { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { MobileStickyCta } from "@/components/layout/mobile-sticky-cta";
import { Location } from "@/components/sections/location/location";
import { SocialMedia } from "@/components/sections/location/social-media";
import { FinalCta } from "@/components/sections/booking/final-cta";

export const metadata: Metadata = {
  title: "Lokasi & Petunjuk Arah — Kalya Salon Madiun",
  description:
    "Kunjungi Kalya Salon di Jl. Slamet Riyadi No.8, Klegen, Kec. Kartoharjo, Kota Madiun. Buka setiap hari pukul 09:00 - 20:00 WIB. Petunjuk arah Google Maps & kontak WhatsApp.",
  alternates: {
    canonical: "/lokasi",
  },
};

export default function LokasiPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="grow pt-24 sm:pt-28">
        {/* Page Hero Header */}
        <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-brand-soft-pink/40 to-background border-b border-border/60">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary">
              <span className="w-4 h-px bg-gold" />
              <span>Studio & Directions</span>
              <span className="w-4 h-px bg-gold" />
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-foreground leading-tight">
              Temukan Studio Kami di <br />
              <span className="italic font-normal text-primary">Pusat Kota Madiun</span>
            </h1>

            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Akses jalan mudah, area parkir memadai, dan ruangan ber-AC yang nyaman siap menyambut kunjungan perawatan rambut Anda.
            </p>
          </div>
        </section>

        {/* Location & Interactive Google Maps Action Card */}
        <Location />

        {/* Official Social Media */}
        <SocialMedia />

        {/* Final Conversion CTA */}
        <FinalCta />
      </main>

      <Footer />
      <MobileStickyCta />
    </div>
  );
}
