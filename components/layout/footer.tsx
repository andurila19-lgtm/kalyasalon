"use client";

import Link from "next/link";
import { salonData } from "@/data/salon";
import { mainNavigation } from "@/data/navigation";
import { useBooking } from "@/context/booking-context";
import { getGoogleMapsDirectionsUrl } from "@/lib/maps";
import { trackSocialClick, trackPhoneClick, trackMapClick } from "@/lib/analytics";
import { Video, MapPin, Phone, Clock, MessageSquare } from "lucide-react";

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export function Footer() {
  const { openBooking } = useBooking();
  const directionsUrl = getGoogleMapsDirectionsUrl();

  return (
    <footer className="bg-brand-charcoal text-white pt-12 sm:pt-16 pb-10 sm:pb-12 border-t border-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid: 1 col on mobile, 2 col on tablet, 4 col on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8 pb-10 sm:pb-12 border-b border-white/10">
          
          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-4 space-y-3.5 sm:space-y-4">
            <Link href="/" className="flex flex-col inline-block group">
              <span className="font-display text-xl sm:text-2xl font-bold tracking-wider text-white group-hover:text-gold transition-colors flex items-center gap-1.5">
                {salonData.name}
                <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />
              </span>
              <span className="text-[10px] sm:text-[11px] font-sans font-medium uppercase tracking-widest text-brand-soft-gold -mt-0.5">
                {salonData.descriptor}
              </span>
            </Link>

            <p className="text-xs sm:text-sm text-white/70 leading-relaxed max-w-sm">
              Salon kecantikan premium di Kota Madiun yang menghadirkan pengalaman perawatan rambut personal, estetik, dan menenangkan dengan harga yang terjangkau.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-2.5 pt-1">
              <a
                href={salonData.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackSocialClick("instagram", "footer")}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 hover:bg-gold hover:text-brand-dark-brown text-white flex items-center justify-center transition-all"
                aria-label="Instagram Kalya Salon"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href={salonData.socialLinks.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackSocialClick("tiktok", "footer")}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 hover:bg-gold hover:text-brand-dark-brown text-white flex items-center justify-center transition-all"
                aria-label="TikTok Kalya Salon"
              >
                <Video className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-3 space-y-3 sm:space-y-4">
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-brand-soft-gold font-display">
              Navigasi Halaman
            </h3>
            <ul className="grid grid-cols-2 sm:grid-cols-1 gap-2 text-xs sm:text-sm text-white/70">
              {mainNavigation.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className="hover:text-gold transition-colors inline-block py-1"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Contact & Hours */}
          <div className="lg:col-span-5 space-y-3 sm:space-y-4">
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-brand-soft-gold font-display">
              Kontak & Lokasi Salon
            </h3>
            
            <div className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm text-white/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackMapClick("footer")}
                  className="hover:text-gold transition-colors leading-relaxed"
                >
                  {salonData.address.formatted}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-gold shrink-0" />
                <span>{salonData.openingHours.days}: {salonData.openingHours.hours}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold shrink-0" />
                <a 
                  href={`tel:${salonData.phone.replace(/[^0-9]/g, "")}`} 
                  onClick={() => trackPhoneClick("footer")}
                  className="hover:text-gold transition-colors font-medium"
                >
                  {salonData.phoneDisplay}
                </a>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => openBooking(undefined, "footer")}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 min-h-[42px] rounded-full bg-gold text-brand-dark-brown text-xs font-bold shadow-xs hover:bg-gold-light transition-all cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Reservasi Sekarang</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Copyright and Location SEO footer note */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-[11px] sm:text-xs text-white/50">
          <p>© 2026 Kalya Salon. All rights reserved.</p>
          <p className="flex items-center gap-1.5 text-center flex-wrap justify-center">
            <span>Kalya Salon</span>
            <span className="text-gold">•</span>
            <span>Jl. Slamet Riyadi No.8, Kartoharjo</span>
            <span className="text-gold">•</span>
            <span>Kota Madiun, Jawa Timur</span>
          </p>
        </div>

      </div>
    </footer>
  );
}
