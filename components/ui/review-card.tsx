import { Review } from "@/types/review";
import { Star, CheckCircle2, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

interface ReviewCardProps {
  review: Review;
  className?: string;
}

export function ReviewCard({ review, className }: ReviewCardProps) {
  return (
    <div
      className={cn(
        "bg-card rounded-2xl p-6 sm:p-7 border border-border hover:border-gold/60 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between relative",
        className
      )}
    >
      <Quote className="w-8 h-8 text-gold/20 absolute top-4 right-4 pointer-events-none" />

      <div className="space-y-4">
        {/* Rating Stars & Source */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-amber-500">
            {[...Array(review.rating)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <span className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
            Google Review
          </span>
        </div>

        {/* Review Text */}
        <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed italic">
          &ldquo;{review.text}&rdquo;
        </p>
      </div>

      {/* Reviewer Information */}
      <div className="pt-4 mt-4 border-t border-border/50 space-y-1">
        <div className="flex items-center gap-1.5">
          <h4 className="text-xs font-bold text-foreground font-display">
            {review.customerName}
          </h4>
          {review.verified && (
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          )}
        </div>
        <div className="flex items-center justify-between text-[11px] text-muted-foreground">
          <span>{review.serviceUsed || "Perawatan Rambut"}</span>
          <span>{review.date}</span>
        </div>
      </div>
    </div>
  );
}
