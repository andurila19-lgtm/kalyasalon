"use client";

import React from "react";
import { useBooking } from "@/context/booking-context";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { InteractiveBooking } from "./interactive-booking";

export function BookingModal() {
  const { isOpen, closeBooking, selectedServiceId } = useBooking();

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeBooking()}>
      <DialogContent className="w-[94vw] max-w-2xl max-h-[90vh] overflow-y-auto overflow-x-hidden p-3.5 sm:p-6 rounded-2xl bg-background border border-border shadow-2xl min-w-0 block">
        <div className="flex justify-between items-center pb-2.5 border-b border-border mb-3 sm:mb-4 pr-8">
          <div className="min-w-0">
            <DialogTitle className="text-base sm:text-lg font-bold font-display text-foreground truncate">
              Reservasi Kalya Salon
            </DialogTitle>
            <DialogDescription className="text-[11px] sm:text-xs text-muted-foreground truncate">
              Pemesanan jadwal perawatan salon realtime & instan.
            </DialogDescription>
          </div>
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
