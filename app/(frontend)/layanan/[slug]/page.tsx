import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { servicesData, serviceCategories } from "@/data/services";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { MobileStickyCta } from "@/components/layout/mobile-sticky-cta";
import { ServiceDetailClient } from "./service-detail-client";
import { Tag, ChevronRight, CheckCircle2, ShieldAlert } from "lucide-react";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = servicesData.find((s) => s.id === slug);

  if (!service) {
    return {
      title: "Layanan Tidak Ditemukan — Kalya Salon Madiun",
    };
  }

  return {
    title: `${service.name} — Kalya Salon Madiun`,
    description: `${service.description} Estimasi harga ${service.priceDisplay} dan durasi ${service.durationMinutes} menit di Kalya Salon Madiun.`,
    alternates: {
      canonical: `/layanan/${service.id}`,
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = servicesData.find((s) => s.id === slug);

  if (!service) {
    notFound();
  }

  const categoryMeta = serviceCategories.find((c) => c.id === service.category);
  const relatedServices = servicesData.filter((s) => s.category === service.category && s.id !== service.id);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="grow pt-24 sm:pt-28">
        {/* Breadcrumb Navigation */}
        <div className="bg-brand-soft-pink/30 border-b border-border/60 py-3.5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-2 text-xs text-muted-foreground" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-primary transition-colors">
                Beranda
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/60" />
              <Link href="/layanan" className="hover:text-primary transition-colors">
                Layanan
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/60" />
              <span className="text-foreground font-semibold truncate max-w-[200px] sm:max-w-none">
                {service.name}
              </span>
            </nav>
          </div>
        </div>

        {/* Service Main Content Section */}
        <section className="py-12 sm:py-16 md:py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              
              {/* Left Column: Detailed Service Info & Booking Card */}
              <div className="lg:col-span-8 space-y-8">
                
                {/* Header Info */}
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-primary text-xs font-semibold uppercase tracking-wider">
                    <Tag className="w-3.5 h-3.5 text-gold" />
                    <span>{categoryMeta?.name || service.category}</span>
                  </div>

                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display text-foreground leading-tight">
                    {service.name}
                  </h1>

                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed pt-1">
                    {service.description}
                  </p>
                </div>

                {/* Treatment Highlights & What's Included */}
                <div className="bg-card p-6 sm:p-8 rounded-2xl border border-border space-y-5">
                  <h2 className="text-lg font-bold font-display text-foreground">
                    Apa yang Anda Dapatkan dalam Perawatan Ini:
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                      <div>
                        <h3 className="text-xs sm:text-sm font-semibold text-foreground">
                          Konsultasi Stylist Berpengalaman
                        </h3>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Analisis kondisi rambut & kecocokan gaya sebelum pengerjaan.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                      <div>
                        <h3 className="text-xs sm:text-sm font-semibold text-foreground">
                          Formula Nutrisi Premium
                        </h3>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Produk berkualitas tanpa merusak kelembutan alami rambut.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                      <div>
                        <h3 className="text-xs sm:text-sm font-semibold text-foreground">
                          Ruang Perawatan Nyaman
                        </h3>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Suasana salon estetik dan penyejuk ruangan untuk relaksasi.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                      <div>
                        <h3 className="text-xs sm:text-sm font-semibold text-foreground">
                          Tips Perawatan Lanjutan
                        </h3>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Panduan menjaga hasil rambut tetap awet berkilau di rumah.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Important Notice Box */}
                <div className="p-4 sm:p-5 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-3 text-xs sm:text-sm text-foreground/90">
                  <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    <strong>Catatan Penting:</strong> Untuk layanan pewarnaan, balayage, dan smoothing, estimasi harga final dapat bervariasi sesuai panjang, ketebalan, dan riwayat kimia rambut Anda. Konsultasi menyeluruh dilakukan terlebih dahulu di salon.
                  </p>
                </div>

              </div>

              {/* Right Column: Pricing Summary & Interactive Booking Trigger */}
              <div className="lg:col-span-4 sticky top-28 space-y-6">
                <ServiceDetailClient service={service} />
              </div>

            </div>

            {/* Related Services Section */}
            {relatedServices.length > 0 && (
              <div className="mt-16 pt-12 border-t border-border space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold font-display text-foreground">
                    Layanan Terkait Lainnya
                  </h3>
                  <Link href="/layanan" className="text-xs font-semibold text-primary hover:text-gold transition-colors">
                    Lihat Semua Layanan →
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {relatedServices.map((rel) => (
                    <Link
                      key={rel.id}
                      href={`/layanan/${rel.id}`}
                      className="group bg-card p-5 rounded-2xl border border-border hover:border-gold/60 shadow-xs transition-all flex flex-col justify-between"
                    >
                      <div>
                        <h4 className="text-sm font-bold font-display text-foreground group-hover:text-primary transition-colors">
                          {rel.name}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                          {rel.description}
                        </p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
                        <span className="text-xs font-bold text-primary">
                          {rel.priceDisplay}
                        </span>
                        <span className="text-[11px] text-gold font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center">
                          Detail →
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

          </div>
        </section>
      </main>

      <Footer />
      <MobileStickyCta />
    </div>
  );
}
