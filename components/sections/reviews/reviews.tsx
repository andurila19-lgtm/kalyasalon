import Link from "next/link";
import { reviewsData } from "@/data/reviews";
import { salonData } from "@/data/salon";
import { SectionHeading } from "@/components/ui/section-heading";
import { ReviewCard } from "@/components/ui/review-card";
import { Star, ArrowRight } from "lucide-react";

interface ReviewsProps {
  isPreview?: boolean;
}

export function Reviews({ isPreview = false }: ReviewsProps) {
  return (
    <section id="ulasan" className="py-14 sm:py-16 md:py-20 lg:py-24 bg-brand-soft-pink/25 relative overflow-hidden">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-brand-blush-pink/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Verified Google Badge */}
        <div className="max-w-2xl mx-auto text-center space-y-3 mb-8 sm:mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-card border border-border shadow-2xs">
            <div className="flex items-center gap-0.5 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-xs font-bold text-foreground">
              {salonData.rating} / 5.0
            </span>
            <span className="text-[11px] text-muted-foreground">
              ({salonData.reviewCountDisplay} Ulasan)
            </span>
          </div>

          <SectionHeading
            eyebrow="Google Reviews"
            title="Loved by Our Customers"
            description={`${salonData.rating} out of 5 based on ${salonData.reviewCountDisplay} Google reviews. Pengalaman nyata dari pelanggan setia Kalya Salon Madiun.`}
            align="center"
            className="mb-0"
          />
        </div>

        {/* Reviews Cards Grid: 1 col on mobile, 2 col on tablet, 3 col on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {reviewsData.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        {/* Real Review Note & CTA to /ulasan */}
        <div className="text-center mt-8 sm:mt-12 space-y-4">
          <p className="text-[11px] sm:text-xs text-muted-foreground">
            Berdasarkan data ulasan publik Google Maps terverifikasi untuk Kalya Salon Kota Madiun.
          </p>

          {isPreview && (
            <div className="pt-1">
              <Link
                href="/ulasan"
                className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full border border-border bg-background shadow-xs hover:bg-muted hover:border-gold/60 text-foreground text-xs sm:text-sm font-semibold transition-colors cursor-pointer min-h-[44px]"
              >
                <span>Baca Lebih Banyak Ulasan Pelanggan</span>
                <ArrowRight className="w-4 h-4 text-gold" />
              </Link>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
