"use client";

import { salonData } from "@/data/salon";
import { useBooking } from "@/context/booking-context";
import { getGoogleMapsDirectionsUrl } from "@/lib/maps";
import { Button } from "@/components/ui/button";
import { MessageSquare, Navigation } from "lucide-react";

export function FinalCta() {
  const { openBooking } = useBooking();
  const directionsUrl = getGoogleMapsDirectionsUrl();

  return (
    <section className="py-14 sm:py-16 md:py-20 lg:py-24 bg-brand-soft-pink/60 relative overflow-hidden">
      {/* Decorative Subtle Arch Backdrop */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-b-[300px] bg-brand-blush-pink/40 blur-2xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-5 sm:space-y-6 lg:space-y-8">
        
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-background/80 backdrop-blur-xs text-primary text-[11px] sm:text-xs font-semibold uppercase tracking-widest border border-brand-blush-pink shadow-2xs">
          <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />
          <span>{salonData.name} Madiun</span>
        </div>

        {/* Headline */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-display text-foreground leading-[1.18] tracking-tight">
          Ready for Your <br />
          <span className="italic font-normal text-primary">Next Look?</span>
        </h2>

        {/* Supporting Copy */}
        <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-xl mx-auto font-normal leading-relaxed">
          Book your next beauty experience at Kalya Salon. Rasakan perawatan rambut istimewa dengan kenyamanan ruang relaksasi bernuansa estetik di Madiun.
        </p>

        {/* Primary and Secondary CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Button 
            variant="gold" 
            size="lg" 
            onClick={() => openBooking()}
            className="w-full sm:w-auto min-h-[48px] rounded-full shadow-md hover:shadow-lg transition-all tracking-wide text-xs sm:text-sm font-semibold px-8 cursor-pointer gap-2.5"
          >
            <MessageSquare className="w-4 h-4" />
            <span>BOOK APPOINTMENT</span>
          </Button>

          <Button variant="outline" size="lg" asChild className="w-full sm:w-auto min-h-[48px] rounded-full border-primary/30 hover:bg-background text-foreground text-xs sm:text-sm font-medium px-7">
            <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="gap-2">
              <Navigation className="w-4 h-4" />
              <span>GET DIRECTIONS</span>
            </a>
          </Button>
        </div>

        {/* Operating Hours Note */}
        <p className="text-xs text-muted-foreground pt-4">
          Buka Setiap Hari: 09:00 – 20:00 WIB • Jl. Slamet Riyadi No.8, Kota Madiun
        </p>

      </div>
    </section>
  );
}
