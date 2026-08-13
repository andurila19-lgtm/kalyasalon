import * as React from "react";
import { cn } from "@/lib/utils";

export interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "center" | "left" | "right";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  const alignmentClasses = {
    center: "text-center items-center mx-auto",
    left: "text-left items-start mr-auto",
    right: "text-right items-end ml-auto",
  };

  return (
    <div className={cn("max-w-2xl space-y-2.5 sm:space-y-3 mb-8 sm:mb-12 lg:mb-16", alignmentClasses[align], className)}>
      {eyebrow && (
        <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-bold uppercase tracking-widest text-primary">
          <span className="w-3.5 sm:w-4 h-px bg-gold" />
          <span>{eyebrow}</span>
          {align === "center" && <span className="w-3.5 sm:w-4 h-px bg-gold" />}
        </div>
      )}

      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-display text-foreground leading-tight">
        {title}
      </h2>

      {description && (
        <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
