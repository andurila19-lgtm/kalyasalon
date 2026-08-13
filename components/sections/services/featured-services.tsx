"use client";

import Link from "next/link";
import Image from "next/image";
import { useBooking } from "@/context/booking-context";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { ArrowRight } from "lucide-react";

export function FeaturedServices() {
  const { openBooking } = useBooking();

  const featured = [
    {
      id: "scalp-detox-spa",
      title: "Scalp Detox & Hair Spa Therapy",
      category: "Hair Spa",
      description: "Pembersihan mendalam residu ketombe & minyak berlebih dengan pijatan leher aromaterapi yang menenangkan.",
      price: "Rp 135.000",
      image: "/images/services/treatment.jpg",
    },
    {
      id: "signature-haircut",
      title: "Signature Haircut & Blow",
      category: "Hair Cutting",
      description: "Konsultasi bentuk wajah, cuci rambut relaksasi, dan potongan presisi untuk hasil styling bervolume.",
      price: "Rp 65.000",
      image: "/images/services/haircut.jpg",
    },
    {
      id: "keratin-smooth-glow",
      title: "Keratin Smooth & Glow Treatment",
      category: "Hair Treatment",
      description: "Formula protein keratin murni untuk mengatasi rambut mekar & kusam menjadi lurus lembut berkilau.",
      price: "Rp 250.000",
      image: "/images/gallery/treatment-1.jpg",
    },
    {
      id: "balayage-ash-blonde",
      title: "Modern Balayage & Highlight Dimension",
      category: "Hair Coloring",
      description: "Teknik gradasi warna bebas bercak dengan tonal ash, caramel, dan teknologi pelindung kilau.",
      price: "Mulai Rp 350.000",
      image: "/images/services/coloring.jpg",
    },
  ];

  return (
    <section className="py-14 sm:py-16 md:py-20 lg:py-24 bg-brand-soft-pink/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeading
          eyebrow="Customer Favorites"
          title="Most Loved Treatments"
          description="Layanan unggulan yang paling banyak dipilih dan direkomendasikan oleh pelanggan setia Kalya Salon Madiun."
          align="center"
        />

        {/* 4 Visual Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {featured.map((item) => (
            <div
              key={item.id}
              className="group bg-card rounded-2xl overflow-hidden border border-border hover:border-gold/60 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Image Container with subtle Arch top */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 300px"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-background/90 backdrop-blur-xs text-primary border border-border shadow-2xs">
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-4 sm:p-5 space-y-1.5 sm:space-y-2">
                  <Link href={`/layanan/${item.id}`} className="block group-hover:text-primary transition-colors">
                    <h3 className="text-sm sm:text-base font-bold font-display text-foreground leading-snug line-clamp-2">
                      {item.title}
                    </h3>
                  </Link>
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Footer Price & CTA */}
              <div className="p-4 sm:p-5 pt-0 border-t border-border/40 mt-3 sm:mt-4 space-y-2.5 sm:space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-muted-foreground">Harga Mulai</span>
                  <span className="text-sm sm:text-base font-bold font-display text-primary">
                    {item.price}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    asChild
                    className="w-full rounded-full min-h-[38px] text-[11px] font-semibold"
                  >
                    <Link href={`/layanan/${item.id}`}>
                      Detail
                    </Link>
                  </Button>

                  <Button 
                    variant="gold" 
                    size="sm" 
                    onClick={() => openBooking(item.id)}
                    className="w-full rounded-full min-h-[38px] cursor-pointer text-[11px] font-semibold"
                  >
                    Booking
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA to /layanan */}
        <div className="mt-8 sm:mt-12 text-center">
          <Link
            href="/layanan"
            className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full border border-border bg-background shadow-xs hover:bg-muted hover:border-gold/60 text-foreground text-xs sm:text-sm font-semibold transition-colors cursor-pointer min-h-[44px]"
          >
            <span>Lihat Semua Menu & Kategori Layanan</span>
            <ArrowRight className="w-4 h-4 text-gold" />
          </Link>
        </div>

      </div>
    </section>
  );
}
