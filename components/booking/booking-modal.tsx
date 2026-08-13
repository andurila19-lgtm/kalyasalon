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
      <DialogContent className="max-w-3xl w-[95vw] max-h-[90vh] overflow-y-auto p-4 sm:p-6 rounded-2xl bg-background border border-border shadow-2xl">
        <div className="flex justify-between items-center pb-2 border-b border-border mb-4">
          <div>
            <DialogTitle className="text-lg font-bold font-display text-foreground">
              Reservasi Kalya Salon
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Pemesanan jadwal perawatan salon realtime & terkonfirmasi otomatis.
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
