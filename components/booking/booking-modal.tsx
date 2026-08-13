"use client";

import React from "react";
import { useBooking } from "@/context/booking-context";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { InteractiveBooking } from "./interactive-booking";
import { X } from "lucide-react";

export function BookingModal() {
  const { isOpen, closeBooking, selectedServiceId } = useBooking();

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeBooking()}>
      <DialogContent className="w-[94vw] max-w-2xl max-h-[90vh] overflow-y-auto overflow-x-hidden p-3.5 sm:p-6 rounded-2xl bg-background border border-border shadow-2xl min-w-0 block">
        <div className="flex justify-between items-center pb-2.5 border-b border-border mb-3 sm:mb-4">
          <div className="min-w-0 pr-2">
            <DialogTitle className="text-base sm:text-lg font-bold font-display text-foreground truncate">
              Reservasi Kalya Salon
            </DialogTitle>
            <DialogDescription className="text-[11px] sm:text-xs text-muted-foreground truncate">
              Pemesanan jadwal perawatan salon realtime & instan.
            </DialogDescription>
          </div>
          <button
            onClick={closeBooking}
            className="p-2 rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <InteractiveBooking
          initialServiceId={selectedServiceId}
          isModal={true}
          onBookingComplete={() => {
            // Optional callback
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
