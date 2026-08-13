import { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { MobileStickyCta } from "@/components/layout/mobile-sticky-cta";
import { PriceList } from "@/components/sections/price-list/price-list";
import { FinalCta } from "@/components/sections/booking/final-cta";

export const metadata: Metadata = {
  title: "Daftar Harga & Menu Lengkap — Kalya Salon Madiun",
  description:
    "Transparansi harga layanan potong rambut, smoothing, creambath, keratin treatment, dan pewarnaan rambut di Kalya Salon Madiun. Estimasi harga jujur dan jelas.",
  alternates: {
    canonical: "/harga",
  },
};

export default function HargaPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="grow pt-24 sm:pt-28">
        {/* Full Price List Component */}
        <PriceList />

        {/* Final Conversion CTA */}
        <FinalCta />
      </main>

      <Footer />
      <MobileStickyCta />
    </div>
  );
}
