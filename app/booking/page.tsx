"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useBooking } from "@/context/booking-context";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { MobileStickyCta } from "@/components/layout/mobile-sticky-cta";
import { Button } from "@/components/ui/button";
import { salonData } from "@/data/salon";
import { MessageSquare, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";

function BookingContent() {
  const searchParams = useSearchParams();
  const serviceParam = searchParams.get("service");
  const { openBooking } = useBooking();

  useEffect(() => {
    // Automatically trigger booking modal when visiting /booking
    openBooking(serviceParam || undefined, "booking_page_route");
  }, [serviceParam, openBooking]);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-8">
      <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center text-primary mx-auto">
        <Calendar className="w-8 h-8 text-gold" />
      </div>

      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-bold font-display text-foreground">
          Reservasi Appointment
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
          Formulir booking interaktif sedang aktif. Jika modal tertutup secara tidak sengaja, klik tombol di bawah untuk melanjutkan pemesanan jadwal salon Anda.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Button
          variant="gold"
          size="lg"
          className="w-full sm:w-auto rounded-full text-sm font-semibold min-h-[48px] px-8 cursor-pointer gap-2"
          onClick={() => openBooking(serviceParam || undefined, "booking_page_manual")}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Buka Formulir Booking</span>
        </Button>

        <Button
          variant="outline"
          size="lg"
          asChild
          className="w-full sm:w-auto rounded-full text-sm font-semibold min-h-[48px] px-8"
        >
          <Link href="/layanan">
            <span>Lihat Menu Layanan</span>
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Link>
        </Button>
      </div>

      {/* Information Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 text-left border-t border-border">
        <div className="p-4 rounded-xl bg-card border border-border space-y-1">
          <span className="text-xs font-bold text-gold uppercase tracking-wider block">Jam Buka</span>
          <p className="text-xs text-foreground font-semibold">Setiap Hari 09:00 - 20:00</p>
          <p className="text-[11px] text-muted-foreground">Termasuk hari libur nasional</p>
        </div>

        <div className="p-4 rounded-xl bg-card border border-border space-y-1">
          <span className="text-xs font-bold text-gold uppercase tracking-wider block">WhatsApp</span>
          <p className="text-xs text-foreground font-semibold">{salonData.phoneDisplay}</p>
          <p className="text-[11px] text-muted-foreground">Respons cepat oleh staf salon</p>
        </div>

        <div className="p-4 rounded-xl bg-card border border-border space-y-1">
          <span className="text-xs font-bold text-gold uppercase tracking-wider block">Lokasi</span>
          <p className="text-xs text-foreground font-semibold">{salonData.address.street}</p>
          <p className="text-[11px] text-muted-foreground">{salonData.address.city}, {salonData.address.province}</p>
        </div>
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="grow pt-24 sm:pt-28 flex items-center justify-center bg-gradient-to-b from-brand-soft-pink/30 via-background to-background">
        <Suspense fallback={
          <div className="py-24 text-center text-sm text-muted-foreground">
            Memuat sistem reservasi...
          </div>
        }>
          <BookingContent />
        </Suspense>
      </main>

      <Footer />
      <MobileStickyCta />
    </div>
  );
}
