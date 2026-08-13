import { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { MobileStickyCta } from "@/components/layout/mobile-sticky-cta";
import { Reviews } from "@/components/sections/reviews/reviews";
import { FinalCta } from "@/components/sections/booking/final-cta";

export const metadata: Metadata = {
  title: "Ulasan Pelanggan — Kalya Salon Madiun",
  description:
    "Rating 4.8 dari 284+ ulasan Google Maps terverifikasi. Baca pengalaman nyata pelanggan wanita Kota Madiun tentang kepuasan potong rambut dan perawatan di Kalya Salon.",
  alternates: {
    canonical: "/ulasan",
  },
};

export default function UlasanPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="grow pt-24 sm:pt-28">
        {/* Page Hero Header */}
        <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-brand-soft-pink/40 to-background border-b border-border/60">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary">
              <span className="w-4 h-px bg-gold" />
              <span>Authentic Social Proof</span>
              <span className="w-4 h-px bg-gold" />
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-foreground leading-tight">
              Cerita & Ulasan Asli <br />
              <span className="italic font-normal text-primary">Pelanggan Kalya Salon</span>
            </h1>

            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Kepercayaan dan kepuasan pelanggan adalah bukti nyata kualitas layanan kami. Ulasan publik ini bersumber langsung dari akun Google Business Profile resmi.
            </p>
          </div>
        </section>

        {/* Reviews Component */}
        <Reviews />

        {/* Final Conversion CTA */}
        <FinalCta />
      </main>

      <Footer />
      <MobileStickyCta />
    </div>
  );
}
