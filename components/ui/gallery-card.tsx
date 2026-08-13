import Image from "next/image";
import { GalleryItem } from "@/types/gallery";
import { cn } from "@/lib/utils";

interface GalleryCardProps {
  item: GalleryItem;
  className?: string;
  onClick?: () => void;
}

export function GalleryCard({ item, className, onClick }: GalleryCardProps) {
  return (
    <div
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={(e) => {
        if (onClick && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onClick();
        }
      }}
      aria-label={`Buka foto ${item.title || item.alt}`}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border bg-muted shadow-xs hover:shadow-xl transition-all duration-500",
        onClick && "cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-gold",
        className
      )}
    >
      <Image
        src={item.src}
        alt={item.alt}
        fill
        loading="lazy"
        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 sm:p-5" />

      {/* Hover Text Content */}
      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 text-white transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
        <span className="text-[10px] uppercase font-bold tracking-widest text-brand-soft-gold block mb-1">
          {item.category}
        </span>
        <h3 className="text-sm sm:text-base font-bold font-display leading-snug">
          {item.title || item.alt}
        </h3>
        {item.description && (
          <p className="text-xs text-white/80 line-clamp-2 mt-1 hidden sm:block">
            {item.description}
          </p>
        )}
      </div>

      {/* Architectural Corner Decal */}
      <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-black/30 backdrop-blur-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="w-1.5 h-1.5 rounded-full bg-brand-soft-gold inline-block" />
      </div>
    </div>
  );
}
