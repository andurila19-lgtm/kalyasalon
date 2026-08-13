"use client";

import Link from "next/link";
import { Service } from "@/types/service";
import { useBooking } from "@/context/booking-context";
import { Button } from "@/components/ui/button";
import { MessageSquare, Clock, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  service: Service;
  className?: string;
}

export function ServiceCard({ service, className }: ServiceCardProps) {
  const { openBooking } = useBooking();

  return (
    <div
      className={cn(
        "group bg-card rounded-2xl border border-border p-5 sm:p-6 shadow-xs hover:shadow-md hover:border-gold/60 transition-all duration-300 flex flex-col justify-between",
        className
      )}
    >
      <div>
        <div className="flex items-start justify-between gap-2 mb-2 sm:mb-3">
          <Link href={`/layanan/${service.id}`} className="hover:text-primary transition-colors">
            <h3 className="text-base sm:text-lg font-bold font-display text-foreground group-hover:text-primary transition-colors">
              {service.name}
            </h3>
          </Link>
          {service.featured && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-secondary text-primary shrink-0 border border-brand-blush-pink">
              <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />
              Populer
            </span>
          )}
        </div>

        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-4 sm:mb-6">
          {service.description}
        </p>
      </div>

      <div className="space-y-3 pt-3 sm:pt-4 border-t border-border/60">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Estimasi</span>
            <span className="text-sm sm:text-base font-bold font-display text-primary">
              {service.priceDisplay}
            </span>
          </div>

          {service.durationMinutes && (
            <div className="flex items-center gap-1 text-[11px] sm:text-xs text-muted-foreground">
              <Clock className="w-3.5 h-3.5 text-gold" />
              <span>~{service.durationMinutes} mnt</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2 pt-1">
          <Button
            variant="outline"
            size="sm"
            asChild
            className="rounded-full min-h-[38px] text-[11px] font-semibold hover:border-gold/60"
          >
            <Link href={`/layanan/${service.id}`}>
              <span>Detail</span>
              <ArrowRight className="w-3 h-3 ml-1" />
            </Link>
          </Button>

          <Button
            variant="gold"
            size="sm"
            onClick={() => openBooking(service.id)}
            className="rounded-full min-h-[38px] text-[11px] font-semibold cursor-pointer shadow-xs gap-1.5"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Booking</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
