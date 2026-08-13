import { salonData } from "@/data/salon";
import { Star, Award, Clock, MapPin, CheckCircle2 } from "lucide-react";

export function WhyKalya() {
  const reasons = [
    {
      title: "Hasil Rambut Sehat & Anggun",
      desc: "Setiap proses didukung formula yang menutrisi serat rambut sehingga tetap halus dan berkilau alami.",
    },
    {
      title: "Ruang Bersih, Estetik & Nyaman",
      desc: "Ambiance blush pink & white marble yang estetik serta penyejuk ruangan untuk relaksasi maksimal.",
    },
    {
      title: "Konsultasi Personal & Jujur",
      desc: "Kami memahami preferensi Anda dan memberikan saran perawatan sesuai kondisi rambut sebenarnya.",
    },
    {
      title: "Harga Jelas & Bersahabat",
      desc: "Menikmati standar salon premium di Kota Madiun tanpa rasa khawatir akan biaya yang tidak transparan.",
    },
  ];

  return (
    <section className="py-14 sm:py-16 md:py-20 lg:py-24 bg-brand-marble-white/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Editorial Headline & Reasons */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
            <div className="space-y-2.5 sm:space-y-3">
              <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-bold uppercase tracking-widest text-primary">
                <span className="w-4 h-px bg-gold" />
                <span>Our Commitment</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-display text-foreground leading-tight">
                Why Customers <br />
                <span className="italic font-normal text-primary">Keep Coming Back</span>
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-muted-foreground pt-1">
                Kombinasi keahlian penataan rambut, produk bermutu tinggi, dan atmosfer salon yang hangat menjadikan Kalya Salon pilihan utama masyarakat Madiun.
              </p>
            </div>

            {/* List of Reasons: 1 col on mobile, 2 col on tablet/desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 text-left">
              {reasons.map((r, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border shadow-2xs">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-gold shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold font-display text-foreground">
                      {r.title}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-muted-foreground mt-0.5 leading-relaxed">
                      {r.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Refined Verified Statistics Box */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-[360px] sm:max-w-[380px] bg-card p-6 sm:p-8 rounded-3xl border-2 border-gold/40 shadow-xl relative">
              
              <div className="text-center pb-4 sm:pb-6 border-b border-border">
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-gold block mb-1">
                  Verified Track Record
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-display text-foreground">
                  {salonData.name}
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {salonData.address.city}, {salonData.address.province}
                </p>
              </div>

              <div className="space-y-4 sm:space-y-5 pt-5 sm:pt-6">
                <div className="flex items-center gap-3.5 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-secondary flex items-center justify-center text-primary shrink-0">
                    <Star className="w-5 h-5 sm:w-6 sm:h-6 text-amber-500 fill-amber-400" />
                  </div>
                  <div>
                    <span className="text-xl sm:text-2xl font-bold font-display text-foreground block">
                      4.8 / 5.0
                    </span>
                    <span className="text-[11px] sm:text-xs text-muted-foreground font-medium">
                      Google Review Rating
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-secondary flex items-center justify-center text-primary shrink-0">
                    <Award className="w-5 h-5 sm:w-6 sm:h-6 text-gold" />
                  </div>
                  <div>
                    <span className="text-xl sm:text-2xl font-bold font-display text-foreground block">
                      {salonData.reviewCountDisplay}
                    </span>
                    <span className="text-[11px] sm:text-xs text-muted-foreground font-medium">
                      Ulasan Pelanggan Terverifikasi
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-secondary flex items-center justify-center text-primary shrink-0">
                    <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-gold" />
                  </div>
                  <div>
                    <span className="text-xl sm:text-2xl font-bold font-display text-foreground block">
                      09:00 – 20:00
                    </span>
                    <span className="text-[11px] sm:text-xs text-muted-foreground font-medium">
                      Buka Setiap Hari (Senin – Minggu)
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-secondary flex items-center justify-center text-primary shrink-0">
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-gold" />
                  </div>
                  <div>
                    <span className="text-sm sm:text-base font-bold font-display text-foreground block">
                      Jl. Slamet Riyadi No.8
                    </span>
                    <span className="text-[11px] sm:text-xs text-muted-foreground font-medium">
                      Kartoharjo, Kota Madiun
                    </span>
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
