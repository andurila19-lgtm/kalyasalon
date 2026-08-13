"use client";

import Link from "next/link";
import { useState } from "react";
import { galleryData } from "@/data/gallery";
import { SectionHeading } from "@/components/ui/section-heading";
import { GalleryCard } from "@/components/ui/gallery-card";
import { GalleryLightbox } from "@/components/ui/gallery-lightbox";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface GalleryProps {
  isPreview?: boolean;
}

export function Gallery({ isPreview = false }: GalleryProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = [
    { id: "all", label: "Semua" },
    { id: "haircut", label: "Haircut & Style" },
    { id: "coloring", label: "Balayage & Color" },
    { id: "treatment", label: "Treatment & Spa" },
    { id: "interior", label: "Salon Ambiance" },
  ];

  const filteredItems = activeCategory === "all"
    ? galleryData
    : galleryData.filter((item) => item.category === activeCategory);

  return (
    <section id="galeri" className="py-14 sm:py-16 md:py-20 lg:py-24 bg-background relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeading
          eyebrow="Visual Showcase"
          title="Inside Kalya"
          description="A glimpse of your next beauty experience. Portofolio hasil karya stylist dan suasana salon yang menenangkan di Madiun."
          align="center"
        />

        {/* Filter Categories with mobile horizontal scrolling */}
        <div className="flex items-center gap-2 mb-8 sm:mb-10 lg:mb-12 overflow-x-auto no-scrollbar py-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:justify-center">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "px-4 py-2 min-h-[40px] rounded-full text-xs sm:text-sm font-medium transition-all duration-200 border cursor-pointer shrink-0 whitespace-nowrap active:scale-95",
                activeCategory === cat.id
                  ? "bg-primary text-primary-foreground border-primary shadow-xs"
                  : "bg-card text-muted-foreground border-border hover:border-gold/50 hover:text-foreground"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Masonry / Grid Layout: 2 cols on mobile, 3 cols on tablet, 4 cols on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {filteredItems.map((item, idx) => (
            <GalleryCard
              key={item.id || idx}
              item={item}
              onClick={() => setLightboxIndex(idx)}
              className={idx === 0 || idx === 3 ? "aspect-[3/4] lg:row-span-1" : "aspect-square lg:aspect-[3/4]"}
            />
          ))}
        </div>

        {/* Bottom CTA to /galeri (only in homepage preview) */}
        {isPreview && (
          <div className="mt-8 sm:mt-12 text-center">
            <Link
              href="/galeri"
              className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full border border-border bg-background shadow-xs hover:bg-muted hover:border-gold/60 text-foreground text-xs sm:text-sm font-semibold transition-colors cursor-pointer min-h-[44px]"
            >
              <span>Buka Galeri Foto Lengkap</span>
              <ArrowRight className="w-4 h-4 text-gold" />
            </Link>
          </div>
        )}

        {/* Accessible Lightbox Modal */}
        <GalleryLightbox
          items={filteredItems}
          currentIndex={lightboxIndex}
          isOpen={lightboxIndex !== null}
          onClose={() => setLightboxIndex(null)}
          onNavigate={(index) => setLightboxIndex(index)}
        />

        {/* Gallery Caption Info */}
        <div className="text-center mt-10">
          <p className="text-xs text-muted-foreground">
            Ingin melihat portofolio hasil styling harian lainnya? Kunjungi Instagram resmi kami di{" "}
            <a
              href="https://instagram.com/kalyasalonmadiun"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-bold hover:underline"
            >
              @kalyasalonmadiun
            </a>
          </p>
        </div>

      </div>
    </section>
  );
}
