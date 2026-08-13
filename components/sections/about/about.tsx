import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { HeartHandshake, UserCheck, ShieldCheck, Award, ArrowRight } from "lucide-react";

interface AboutProps {
  isPreview?: boolean;
}

export function About({ isPreview = false }: AboutProps) {
  const highlights = [
    {
      id: "friendly",
      title: "Friendly Service",
      description: "Pelayanan hangat dan bersahabat membuat Anda merasa seperti di rumah sendiri.",
      icon: HeartHandshake,
    },
    {
      id: "consultation",
      title: "Personal Consultation",
      description: "Konsultasi mendalam untuk memahami tekstur rambut dan gaya terbaik Anda.",
      icon: UserCheck,
    },
    {
      id: "comfort",
      title: "Clean & Comfortable",
      description: "Ruang salon estetik berpendingin udara yang bersih, higienis, dan wangi.",
      icon: ShieldCheck,
    },
    {
      id: "professional",
      title: "Professional Treatment",
      description: "Pilihan produk berkualitas dan teknik perawatan rambut yang teruji.",
      icon: Award,
    },
  ];

  return (
    <section id="tentang" className="py-14 sm:py-16 md:py-20 lg:py-24 bg-background relative overflow-hidden">
      {/* Decorative subtle background elements */}
      <div className="absolute top-1/2 -right-32 w-80 h-80 bg-brand-soft-pink/50 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Arched Image Composition */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-[380px] lg:max-w-none">
              
              {/* Decorative Arch Backdrop */}
              <div className="absolute -inset-3 rounded-t-[140px] rounded-b-2xl border border-gold/30 -z-10 transform -rotate-1" />
              
              <div className="relative aspect-[4/5] w-full rounded-t-[130px] rounded-b-xl overflow-hidden shadow-xl border border-border">
                <Image
                  src="/images/about/about-salon.jpg"
                  alt="Suasana interior Kalya Salon Madiun yang bersih dan nyaman"
                  fill
                  sizes="(max-width: 768px) 100vw, 450px"
                  className="object-cover object-center"
                />
              </div>

              {/* Floating Quote Card */}
              <div className="absolute -bottom-6 -right-4 sm:-right-6 bg-card/95 backdrop-blur-md p-4 sm:p-5 rounded-xl border border-border shadow-lg max-w-[240px]">
                <div className="flex items-center gap-1.5 text-gold mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Filosofi Kalya</span>
                </div>
                <p className="text-xs text-foreground font-medium italic">
                  &ldquo;Setiap helai rambut memiliki cerita keindahan yang pantas dirawat dengan istimewa.&rdquo;
                </p>
              </div>

            </div>
          </div>

          {/* Right Column: Editorial Text & 4 Highlights */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-primary">
                <span className="w-6 h-[1.5px] bg-gold inline-block" />
                <span>About Kalya Salon</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-foreground leading-tight">
                More Than Just <br className="hidden sm:inline" />
                <span className="italic font-normal text-primary">A Salon</span>
              </h2>
            </div>

            <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
              <p>
                Kalya Salon hadir di Kota Madiun untuk memberikan pengalaman perawatan rambut yang nyaman, personal, dan menyenangkan.
              </p>
              <p>
                Dengan suasana salon yang bersih dan estetik bernuansa blush pink & white marble, tim yang ramah, serta berbagai pilihan hair treatment berkualitas, setiap kunjungan dibuat agar Anda bisa tampil lebih percaya diri sekaligus menikmati waktu berkualitas untuk diri sendiri.
              </p>
            </div>

            {/* 4 Pillars Highlight Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-left">
              {highlights.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl bg-card border border-border/80 hover:border-gold/50 transition-colors shadow-2xs"
                  >
                    <div className="flex items-center gap-3 mb-1.5">
                      <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center text-primary shrink-0">
                        <Icon className="w-3.5 h-3.5 text-gold" />
                      </div>
                      <h3 className="text-sm font-bold text-foreground font-display">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-xs text-muted-foreground leading-normal pl-10">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* CTA to /tentang (only on homepage preview) */}
            {isPreview && (
              <div className="pt-2">
                <Link
                  href="/tentang"
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full border border-border bg-background shadow-xs hover:bg-muted hover:border-gold/60 text-foreground text-xs sm:text-sm font-semibold transition-colors cursor-pointer min-h-[44px]"
                >
                  <span>Cerita Selengkapnya Tentang Kalya</span>
                  <ArrowRight className="w-4 h-4 text-gold" />
                </Link>
              </div>
            )}

          </div>

        </div>
      </div>
    </section>
  );
}
