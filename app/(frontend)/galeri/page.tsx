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
