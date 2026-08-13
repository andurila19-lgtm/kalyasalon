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
