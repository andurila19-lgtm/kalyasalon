import { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { MobileStickyCta } from "@/components/layout/mobile-sticky-cta";
import { About } from "@/components/sections/about/about";
import { CustomerExperience } from "@/components/sections/about/customer-experience";
import { WhyKalya } from "@/components/sections/about/why-kalya";
import { FinalCta } from "@/components/sections/booking/final-cta";
import { SectionHeading } from "@/components/ui/section-heading";
import { Heart, ShieldCheck, Smile } from "lucide-react";

export const metadata: Metadata = {
  title: "Tentang Kami — Kalya Salon Madiun",
  description:
    "Mengenal Kalya Salon Madiun: standar perawatan rambut berkelas, terapis berpengalaman, kenyamanan ruangan modern, dan transparansi harga untuk wanita Madiun.",
  alternates: {
    canonical: "/tentang",
  },
};

const philosophy = [
  {
    title: "Kenyamanan Ruang & Privasi",
    desc: "Setiap sudut Kalya Salon dirancang untuk memberikan ketenangan pikiran, kebersihan higienis, dan suasana rileks selama proses perawatan.",
    icon: Heart,
  },
  {
    title: "Formula Berkualitas Teruji",
    desc: "Kami hanya menggunakan produk nutrisi rambut yang aman, bebas zat berbahaya, dan telah teruji memberikan hasil nyata berkilau alami.",
    icon: ShieldCheck,
  },
  {
    title: "Konsultasi Jujur & Personal",
    desc: "Stylist kami mendengarkan kebutuhan gaya Anda dan memberikan rekomendasi terbaik yang sesuai dengan tekstur dan kondisi rambut.",
    icon: Smile,
  },
];

export default function TentangPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="grow pt-24 sm:pt-28">
        {/* 1. Core Story Section */}
        <About isPreview={false} />

        {/* 2. Philosophy & Standards Grid */}
        <section className="py-14 sm:py-16 md:py-20 lg:py-24 bg-brand-marble-white/50 border-y border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Service Philosophy"
              title="Filosofi Layanan Kalya"
              description="Tiga pilar utama yang mendasari setiap sentuhan dan pelayanan kami kepada setiap pelanggan yang hadir."
              align="center"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {philosophy.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="bg-card p-6 sm:p-8 rounded-2xl border border-border hover:border-gold/60 shadow-xs transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center text-primary mb-5">
                        <Icon className="w-6 h-6 text-gold" />
                      </div>
                      <h3 className="text-lg font-bold font-display text-foreground mb-2">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 3. Customer Experience Journey */}
        <CustomerExperience />

        {/* 4. Why Customers Choose Kalya & Track Record */}
        <WhyKalya />

        {/* 5. Booking CTA Banner */}
        <FinalCta />
      </main>

      <Footer />
      <MobileStickyCta />
    </div>
  );
}
