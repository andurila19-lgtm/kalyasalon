"use client";

import { Service } from "@/types/service";
import { useBooking } from "@/context/booking-context";
import { Button } from "@/components/ui/button";
import { Clock, MessageSquare, Phone } from "lucide-react";
import { salonData } from "@/data/salon";

export function ServiceDetailClient({ service }: { service: Service }) {
  const { openBooking } = useBooking();

  return (
    <div className="bg-card p-6 sm:p-7 rounded-3xl border-2 border-gold/40 shadow-xl space-y-6">
      <div className="space-y-1">
        <span className="text-[11px] font-bold uppercase tracking-widest text-gold block">
          Estimasi Investasi
        </span>
        <div className="text-2xl sm:text-3xl font-bold font-display text-primary">
          {service.priceDisplay}
        </div>
      </div>

      <div className="space-y-3 text-xs sm:text-sm text-muted-foreground border-y border-border py-4">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gold" />
            <span>Estimasi Durasi:</span>
          </span>
          <span className="font-semibold text-foreground">
            ~{service.durationMinutes} menit
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span>Tempat Perawatan:</span>
          <span className="font-semibold text-foreground">
            Kalya Salon Studio
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span>Konfirmasi Reservasi:</span>
          <span className="font-semibold text-emerald-600">
            WhatsApp Resmi
          </span>
        </div>
      </div>

      <div className="space-y-3 pt-2">
        <Button
          variant="gold"
          size="lg"
          className="w-full min-h-[48px] rounded-full shadow-md text-sm font-semibold cursor-pointer gap-2"
          onClick={() => openBooking(service.id, "service_detail_primary")}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Booking Layanan Ini</span>
        </Button>

        <Button
          variant="outline"
          size="default"
          asChild
          className="w-full min-h-[44px] rounded-full text-xs font-semibold hover:border-gold/60"
        >
          <a href={`tel:${salonData.phone.replace(/[^0-9]/g, "")}`}>
            <Phone className="w-3.5 h-3.5 text-gold mr-1.5" />
            <span>Tanya via Telepon</span>
          </a>
        </Button>
      </div>

      <p className="text-[11px] text-center text-muted-foreground leading-snug">
        Tidak perlu pembayaran di muka. Pembayaran dilakukan di salon setelah perawatan selesai.
      </p>
    </div>
  );
}
