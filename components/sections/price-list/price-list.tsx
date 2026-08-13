"use client";

import { useBooking } from "@/context/booking-context";
import { SectionHeading } from "@/components/ui/section-heading";
import { MessageSquare, ArrowRight } from "lucide-react";

export function PriceList() {
  const { openBooking } = useBooking();

  const categories = [
    {
      category: "HAIR DESIGN & STYLING",
      description: "Layanan gunting, cuci, dan penataan rambut profesional.",
      items: [
        { name: "Signature Haircut & Blow", desc: "Konsultasi bentuk wajah, cuci rambut relaksasi, potongan presisi & blow dry.", price: "Rp 65.000", serviceId: "signature-haircut" },
        { name: "Ladies Styling Blow / Catok", desc: "Penataan rambut bervolume, wavy, atau lurus natural untuk berbagai acara.", price: "Rp 45.000", serviceId: "ladies-blow-style" },
        { name: "Korean Wave Perm", desc: "Gelombang rambut bervolume natural tahan lama khas gaya Korea.", price: "Rp 300.000", serviceId: "korean-wave-perm" },
        { name: "Silk Protein Smoothing", desc: "Pelurusan lembut natural dengan nutrisi silk protein tanpa rasa kaku.", price: "Mulai Rp 280.000", serviceId: "silk-protein-smoothing" },
      ],
    },
    {
      category: "HAIR & SCALP TREATMENT",
      description: "Perawatan intensif kesehatan kulit kepala dan nutrisi batang rambut.",
      items: [
        { name: "Scalp Detox & Hair Spa Therapy", desc: "Pembersihan residu mendalam, masker vitamin, dan pijatan leher relaksasi.", price: "Rp 135.000", serviceId: "scalp-detox-spa" },
        { name: "Keratin Smooth & Glow Treatment", desc: "Injeksi protein keratin intensif untuk rambut rusak, mekar, dan kusam.", price: "Rp 250.000", serviceId: "keratin-smooth-glow" },
        { name: "Deep Conditioning Hair Mask", desc: "Nutrisi ekstra kelembapan untuk mengembalikan kelembutan serat rambut.", price: "Rp 95.000", serviceId: "deep-conditioning-mask" },
        { name: "Anti-Hairfall Scalp Tonic Infusion", desc: "Terapi penguatan akar rambut untuk mengurangi kerontokan berlebih.", price: "Rp 110.000", serviceId: "anti-hairfall-tonic" },
      ],
    },
    {
      category: "COLORING & BALAYAGE",
      description: "Pewarnaan berdimensi modern dengan formulasi aman pelindung rambut.",
      items: [
        { name: "Modern Balayage & Dimensional Highlight", desc: "Gradasi warna halus bebas garis batas (Ash, Caramel, Warm Gold).", price: "Mulai Rp 350.000", serviceId: "balayage-ash-blonde" },
        { name: "Fashion Color & Tone Lock", desc: "Pewarnaan satu kepala penuh dengan cat premium minim amonia.", price: "Mulai Rp 220.000", serviceId: "fashion-color-tonelock" },
        { name: "Root Retouch & Gray Coverage", desc: "Penutupan uban atau touch-up akar rambut dengan warna merata sempurna.", price: "Rp 150.000", serviceId: "root-retouch-gray" },
        { name: "Gloss Toner & Color Refresh", desc: "Mengembalikan kilau warna rambut yang memudar agar kembali berkilau.", price: "Rp 120.000", serviceId: "gloss-toner-refresh" },
      ],
    },
  ];

  return (
    <section id="daftar-harga" className="py-14 sm:py-16 md:py-20 lg:py-24 bg-brand-marble-white/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeading
          eyebrow="Transparent Menu"
          title="Daftar Harga & Menu Layanan"
          description="Pengalaman salon premium dengan estimasi harga yang jelas, jujur, dan bersahabat untuk perawatan rutin Anda di Madiun."
          align="center"
        />

        {/* Menu Columns Grid: 1 col on mobile, 2 col on tablet, 3 col on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className="bg-card rounded-2xl border border-border p-5 sm:p-7 shadow-xs flex flex-col justify-between relative hover:border-gold/50 transition-colors"
            >
              {/* Category Header */}
              <div>
                <div className="pb-3 sm:pb-4 mb-4 sm:mb-6 border-b border-border/80">
                  <span className="text-[10px] sm:text-[11px] font-bold text-gold uppercase tracking-widest block mb-1">
                    Kategori {idx + 1}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold font-display text-foreground">
                    {cat.category}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {cat.description}
                  </p>
                </div>

                {/* Items List with Gold Dotted Lines */}
                <div className="space-y-4 sm:space-y-5">
                  {cat.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="group/item">
                      <div className="flex items-baseline justify-between gap-2">
                        <h4 className="text-xs sm:text-sm font-semibold text-foreground group-hover/item:text-primary transition-colors font-display">
                          {item.name}
                        </h4>
                        <div className="grow border-b border-dotted border-gold/40 mx-2 min-w-[16px]" />
                        <span className="text-xs sm:text-sm font-bold text-primary font-display shrink-0">
                          {item.price}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-2 mt-1">
                        <p className="text-[11px] sm:text-xs text-muted-foreground leading-snug">
                          {item.desc}
                        </p>
                        <button
                          type="button"
                          onClick={() => openBooking(item.serviceId)}
                          className="text-[11px] text-gold hover:text-brand-dark-brown font-semibold shrink-0 ml-2 hidden sm:inline-flex items-center gap-1 opacity-0 group-hover/item:opacity-100 transition-opacity cursor-pointer"
                        >
                          <span>Booking</span>
                          <ArrowRight className="w-2.5 h-2.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer Consultation Notice */}
              <div className="mt-6 sm:mt-8 pt-4 border-t border-border/60 text-center">
                <p className="text-[10px] sm:text-[11px] text-muted-foreground">
                  *Harga pewarnaan & smoothing menyesuaikan panjang & ketebalan rambut
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Global Bottom Booking Banner */}
        <div className="mt-8 sm:mt-12 p-5 sm:p-6 rounded-2xl bg-brand-soft-pink/40 border border-brand-blush-pink flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="text-sm sm:text-base font-bold font-display text-foreground">
              Ingin konsultasi jenis perawatan yang paling cocok untuk rambut Anda?
            </h4>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
              Staf kami siap membantu memberikan rekomendasi terbaik secara gratis via WhatsApp.
            </p>
          </div>
          <button
            type="button"
            onClick={() => openBooking()}
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 min-h-[44px] rounded-full bg-primary text-primary-foreground text-xs sm:text-sm font-semibold shadow-xs hover:bg-primary/90 transition-all shrink-0 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Tanya Rekomendasi Stylist</span>
          </button>
        </div>

      </div>
    </section>
  );
}
