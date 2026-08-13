"use client";

import { useBooking } from "@/context/booking-context";
import { MessageSquare } from "lucide-react";

export function MobileStickyCta() {
  const { openBooking } = useBooking();

  return (
    <aside 
      aria-label="Aksi Cepat Reservasi Mobile" 
      className="fixed bottom-0 left-0 right-0 z-40 px-4 py-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] bg-background/95 backdrop-blur-md border-t border-border shadow-lg sm:hidden flex items-center justify-between gap-3"
    >
      <div className="flex flex-col min-w-0">
        <span className="text-[10px] uppercase tracking-wider font-bold text-gold flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block shrink-0" />
          <span className="truncate">Kalya Salon Madiun</span>
        </span>
        <span className="text-xs font-semibold text-foreground truncate">
          Buka Hari Ini 09:00–20:00
        </span>
      </div>

      <button
        type="button"
        onClick={() => openBooking()}
        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 min-h-[44px] rounded-full bg-gold text-brand-dark-brown text-xs font-bold shadow-xs hover:bg-gold-light transition-all shrink-0 cursor-pointer active:scale-95"
      >
        <MessageSquare className="w-4 h-4 shrink-0" />
        <span>Book Now</span>
      </button>
    </aside>
  );
}
