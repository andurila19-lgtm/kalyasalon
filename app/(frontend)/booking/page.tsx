import { Metadata } from "next";
import { Suspense } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { MobileStickyCta } from "@/components/layout/mobile-sticky-cta";
import { InteractiveBooking } from "@/components/booking/interactive-booking";
import { RefreshCw } from "lucide-react";

export const metadata: Metadata = {
  title: "Reservasi Janji Temu Online | Kalya Salon Madiun",
  description:
    "Pesan jadwal potong rambut, scalp spa, keratin glow, dan pewarnaan rambut di Kalya Salon Madiun secara realtime tanpa antre.",
};

export default function BookingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="grow pt-24 sm:pt-28 pb-16 bg-gradient-to-b from-brand-soft-pink/30 via-background to-background">
        <Suspense
          fallback={
            <div className="py-24 text-center space-y-3">
              <RefreshCw className="w-8 h-8 animate-spin mx-auto text-brand-champagne-gold" />
              <p className="text-sm text-muted-foreground font-medium">
                Memuat sistem reservasi online Kalya Salon...
              </p>
            </div>
          }
        >
          <InteractiveBooking />
        </Suspense>
      </main>

      <Footer />
      <MobileStickyCta />
    </div>
  );
}
