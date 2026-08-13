import { salonData } from "@/data/salon";
import { Star, Clock, MapPin, Award } from "lucide-react";

export function TrustBar() {
  const stats = [
    {
      id: "rating",
      value: "4.8 ★",
      label: "Google Rating",
      icon: Star,
    },
    {
      id: "reviews",
      value: salonData.reviewCountDisplay,
      label: "Customer Reviews",
      icon: Award,
    },
    {
      id: "hours",
      value: "09:00 – 20:00",
      label: "Open Every Day",
      icon: Clock,
    },
    {
      id: "location",
      value: "Madiun",
      label: "East Java",
      icon: MapPin,
    },
  ];

  return (
    <section className="relative z-10 -mt-4 sm:-mt-6 lg:-mt-8 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-card/95 backdrop-blur-md rounded-2xl border border-border shadow-lg p-4 sm:p-6 lg:p-7">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-border">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.id}
                className={`flex flex-col items-center text-center ${
                  idx > 0 ? "pt-3 md:pt-0 md:px-4" : "md:pr-4"
                }`}
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-secondary flex items-center justify-center text-primary mb-1.5 sm:mb-2">
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gold" />
                </div>
                <span className="text-lg sm:text-2xl lg:text-3xl font-bold font-display text-foreground tracking-tight">
                  {stat.value}
                </span>
                <span className="text-[10px] sm:text-xs lg:text-sm font-medium text-muted-foreground uppercase tracking-wider mt-0.5">
                  {stat.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
