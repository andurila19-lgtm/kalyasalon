"use client";

import Link from "next/link";
import Image from "next/image";
import { salonData } from "@/data/salon";
import { useBooking } from "@/context/booking-context";
import { Button } from "@/components/ui/button";
import { Star, ArrowRight, Calendar } from "lucide-react";

export function Hero() {
  const { openBooking } = useBooking();

  return (
    <section id="beranda" className="relative flex items-center pt-24 pb-12 sm:pt-28 sm:pb-16 lg:pt-32 lg:pb-24 overflow-hidden bg-gradient-to-b from-brand-soft-pink/40 via-background to-background">
      {/* Subtle Background Glows */}
      <div className="absolute top-12 left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-brand-blush-pink/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-60 sm:w-80 h-60 sm:h-80 bg-brand-soft-gold/15 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Headline & Copy */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-5 sm:space-y-6 lg:space-y-7">
            
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-soft-pink text-brand-dark-brown text-[11px] sm:text-xs font-semibold uppercase tracking-widest border border-brand-blush-pink shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-champagne-gold inline-block shrink-0" />
              <span className="truncate">{salonData.name} • {salonData.descriptor} Madiun</span>
            </div>

            {/* Main Editorial Primary H1 for SEO */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[68px] font-bold text-foreground font-display leading-[1.15] tracking-tight">
              Your Beauty, <br className="hidden sm:inline" />
              <span className="italic font-normal text-brand-dark-brown relative inline-block">
                Your Way.
                <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-champagne-gold to-transparent opacity-80" />
              </span>
            </h1>

            {/* Supporting Description with Local SEO context */}
            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-xl font-normal leading-relaxed">
              Salon kecantikan dan perawatan rambut profesional di Kota Madiun. Nikmati suasana yang bersih, nyaman, dan estetik dengan layanan personal untuk hasil rambut anggun berkilau.
            </p>

            {/* Social Proof Trust Badge */}
            <Link 
              href="/ulasan"
              className="flex items-center gap-3 py-2 px-4 rounded-xl bg-card border border-border/80 shadow-2xs hover:border-gold/60 transition-colors"
            >
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <div className="h-4 w-px bg-border" />
              <div className="text-xs sm:text-sm font-medium text-foreground">
                <span className="font-bold text-foreground">{salonData.rating}</span> / 5.0
                <span className="text-muted-foreground ml-1">({salonData.reviewCountDisplay} Google Reviews)</span>
              </div>
            </Link>

            {/* Call To Action Buttons with full 44px+ touch targets on mobile */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto pt-1">
              <Button 
                variant="gold" 
                size="lg" 
                onClick={() => openBooking()}
                className="w-full sm:w-auto min-h-[48px] rounded-full shadow-md hover:shadow-lg transition-all tracking-wide text-xs sm:text-sm font-semibold px-8 cursor-pointer gap-2.5"
              >
                <Calendar className="w-4 h-4" />
                <span>BOOK APPOINTMENT</span>
              </Button>

              <Button variant="outline" size="lg" asChild className="w-full sm:w-auto min-h-[48px] rounded-full border-brand-dark-brown/30 hover:bg-muted text-brand-dark-brown text-xs sm:text-sm font-medium px-7">
                <Link href="/layanan" className="gap-2">
                  <span>LIHAT LAYANAN</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Column: Architectural Arched Salon Photograph */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end relative w-full">
            <div className="relative w-full max-w-[320px] sm:max-w-[400px] lg:max-w-[440px]">
              
              {/* Outer decorative arch accent outline */}
              <div className="absolute -inset-3 rounded-t-[160px] sm:rounded-t-[180px] rounded-b-2xl border border-brand-champagne-gold/40 -z-10 transform translate-x-2 translate-y-2 pointer-events-none" />
              <div className="absolute -inset-1 rounded-t-[150px] sm:rounded-t-[170px] rounded-b-xl border border-brand-blush-pink -z-10 pointer-events-none" />

              {/* Main Arched Image Container */}
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-t-[140px] sm:rounded-t-[160px] rounded-b-xl shadow-2xl border-2 border-brand-champagne-gold/50 bg-muted">
                <Image
                  src="/images/hero/kalya-hero.jpg"
                  alt="Suasana interior Kalya Salon di Kota Madiun dengan cermin lengkung mewah dan ruang perawatan bernuansa blush pink"
                  fill
                  priority
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 440px"
                  className="object-cover object-center transform hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Subtle Image Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                {/* Floating Micro Badge in Image */}
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 p-3 sm:p-3.5 rounded-lg bg-background/90 backdrop-blur-md border border-white/40 shadow-lg text-left">
                  <p className="text-[10px] sm:text-[11px] uppercase tracking-widest text-brand-champagne-gold font-bold">
                    Salon Interior Ambiance
                  </p>
                  <p className="text-[11px] sm:text-xs font-medium text-foreground">
                    Blush Pink & Marble White Luxury Aesthetic
                  </p>
                </div>
              </div>

              {/* Decorative side accent element */}
              <div className="hidden sm:block absolute -bottom-5 -left-5 bg-background rounded-xl p-3 shadow-xl border border-border">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-brand-soft-pink flex items-center justify-center text-primary font-bold text-xs">
                    08
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Lokasi Strategis</p>
                    <p className="text-xs font-bold text-foreground">Jl. Slamet Riyadi No.8</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
