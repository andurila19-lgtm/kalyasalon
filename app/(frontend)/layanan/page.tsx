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
