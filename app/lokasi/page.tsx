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
