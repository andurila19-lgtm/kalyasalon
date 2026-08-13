"use client";

import { salonData } from "@/data/salon";
import { getGoogleMapsDirectionsUrl, getGoogleMapsUrl } from "@/lib/maps";
import { createBookingUrl } from "@/lib/whatsapp";
import { trackMapClick, trackPhoneClick, trackWhatsAppBookingClick } from "@/lib/analytics";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { MapPin, Clock, Phone, Navigation, MessageSquare, ExternalLink } from "lucide-react";

export function Location() {
  const directionsUrl = getGoogleMapsDirectionsUrl();
  const mapsUrl = getGoogleMapsUrl();
  const whatsappUrl = createBookingUrl();

  return (
    <section id="lokasi" className="py-14 sm:py-16 md:py-20 lg:py-24 bg-brand-marble-white/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeading
          eyebrow="Visit Our Studio"
          title="Find Us in Madiun"
          description="Berlokasi strategis di pusat Kota Madiun dengan akses mudah, ruang perawatan nyaman, dan area parkir yang aman."
          align="center"
        />

        {/* Location Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Business Details & Action Buttons */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="bg-card p-6 sm:p-8 rounded-3xl border border-border shadow-xs space-y-6">
              
              <div className="pb-4 border-b border-border">
                <span className="text-[11px] font-bold uppercase tracking-widest text-gold block mb-1">
                  Salon Address
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-display text-foreground">
                  {salonData.name}
                </h3>
                <p className="text-xs text-muted-foreground font-medium mt-0.5">
                  {salonData.descriptor}
                </p>
              </div>

              {/* Verified Details List */}
              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-primary shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4 text-gold" />
                  </div>
                  <div>
                    <span className="font-bold text-foreground block">Alamat</span>
                    <p className="text-muted-foreground leading-relaxed mt-0.5">
                      {salonData.address.formatted}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-primary shrink-0 mt-0.5">
                    <Clock className="w-4 h-4 text-gold" />
                  </div>
                  <div>
                    <span className="font-bold text-foreground block">Jam Operasional</span>
                    <p className="text-muted-foreground mt-0.5">
                      {salonData.openingHours.days}
                    </p>
                    <p className="font-semibold text-primary">
                      {salonData.openingHours.hours}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-primary shrink-0 mt-0.5">
                    <Phone className="w-4 h-4 text-gold" />
                  </div>
                  <div>
                    <span className="font-bold text-foreground block">Telepon & WhatsApp</span>
                    <p className="text-muted-foreground mt-0.5 font-medium">
                      {salonData.phoneDisplay}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action CTA Buttons (Directions, Call, WhatsApp) */}
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <Button variant="gold" size="default" asChild className="w-full min-h-[44px] rounded-full shadow-xs text-xs font-semibold">
                  <a 
                    href={directionsUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    onClick={() => trackMapClick("location_card")}
                    className="gap-1.5"
                  >
                    <Navigation className="w-4 h-4 shrink-0" />
                    <span>PETUNJUK ARAH</span>
                  </a>
                </Button>

                <Button variant="outline" size="default" asChild className="w-full min-h-[44px] rounded-full text-xs font-semibold hover:border-gold/60">
                  <a 
                    href={`tel:${salonData.phone.replace(/[^0-9]/g, "")}`} 
                    onClick={() => trackPhoneClick("location_card")}
                    className="gap-1.5"
                  >
                    <Phone className="w-4 h-4 text-gold shrink-0" />
                    <span>TELEPON</span>
                  </a>
                </Button>

                <Button variant="outline" size="default" asChild className="w-full min-h-[44px] rounded-full text-xs font-semibold hover:border-gold/60">
                  <a 
                    href={whatsappUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    onClick={() => trackWhatsAppBookingClick("location_inquiry")}
                    className="gap-1.5"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>WHATSAPP</span>
                  </a>
                </Button>
              </div>

            </div>
          </div>

          {/* Right Column: Google Maps Interactive/Visual Area */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="relative w-full h-[360px] lg:h-full min-h-[360px] rounded-3xl overflow-hidden border border-border bg-muted shadow-xs flex flex-col items-center justify-center p-6 text-center">
              {/* Google Maps Visual Representation */}
              <div className="absolute inset-0 bg-[radial-gradient(#e8d4d4_1px,transparent_1px)] [background-size:16px_16px] opacity-70" />
              
              <div className="relative z-10 max-w-md bg-card/95 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-border shadow-lg space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center text-primary mx-auto">
                  <MapPin className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h4 className="text-lg font-bold font-display text-foreground">
                    Google Maps Navigation
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Jl. Slamet Riyadi No.8, Klegen, Kec. Kartoharjo, Kota Madiun, Jawa Timur 63117
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <Button variant="gold" size="sm" asChild className="w-full sm:w-auto rounded-full">
                    <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="gap-1.5 text-xs font-semibold">
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Petunjuk Arah</span>
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild className="w-full sm:w-auto rounded-full">
                    <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="gap-1.5 text-xs">
                      <span>Buka di Google Maps</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
