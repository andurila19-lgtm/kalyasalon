"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { GalleryItem } from "@/types/gallery";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryLightboxProps {
  items: GalleryItem[];
  currentIndex: number | null;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function GalleryLightbox({
  items,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}: GalleryLightboxProps) {
  const currentItem = currentIndex !== null ? items[currentIndex] : null;

  const handlePrev = useCallback(() => {
    if (currentIndex === null) return;
    const prevIndex = (currentIndex - 1 + items.length) % items.length;
    onNavigate(prevIndex);
  }, [currentIndex, items.length, onNavigate]);

  const handleNext = useCallback(() => {
    if (currentIndex === null) return;
    const nextIndex = (currentIndex + 1) % items.length;
    onNavigate(nextIndex);
  }, [currentIndex, items.length, onNavigate]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handlePrev, handleNext, onClose]);

  if (!currentItem) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent 
        className="max-w-4xl p-0 overflow-hidden border-border bg-background/95 backdrop-blur-xl sm:rounded-3xl max-h-[92vh] flex flex-col justify-between"
        aria-describedby="lightbox-desc"
      >
        {/* Visually hidden accessibility tags */}
        <DialogTitle className="sr-only">
          {currentItem.title || currentItem.alt}
        </DialogTitle>
        <DialogDescription id="lightbox-desc" className="sr-only">
          {currentItem.description || currentItem.alt}
        </DialogDescription>

        {/* Top Control Bar with Close Button */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-border/80 bg-background/80">
          <div className="flex items-center gap-2">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-gold px-2.5 py-0.5 rounded-full bg-secondary">
              {currentItem.category}
            </span>
            <span className="text-xs text-muted-foreground">
              {currentIndex !== null ? currentIndex + 1 : 1} / {items.length}
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Tutup Galeri"
            className="min-h-[44px] min-w-[44px] rounded-full bg-muted/80 hover:bg-muted text-foreground flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Image Container */}
        <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] bg-black/5 flex items-center justify-center overflow-hidden">
          <Image
            src={currentItem.src}
            alt={currentItem.alt}
            fill
            sizes="(max-width: 768px) 100vw, 900px"
            className="object-contain object-center"
            priority
          />

          {/* Navigation Controls on Large Touch Targets */}
          <button
            onClick={handlePrev}
            aria-label="Foto Sebelumnya"
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 min-h-[44px] min-w-[44px] rounded-full bg-background/80 hover:bg-background text-foreground shadow-md backdrop-blur-xs flex items-center justify-center transition-all cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            aria-label="Foto Berikutnya"
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 min-h-[44px] min-w-[44px] rounded-full bg-background/80 hover:bg-background text-foreground shadow-md backdrop-blur-xs flex items-center justify-center transition-all cursor-pointer"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Bottom Details Bar */}
        <div className="p-4 sm:p-6 bg-card border-t border-border/80 space-y-1 text-left">
          <h3 className="text-base sm:text-lg font-bold font-display text-foreground">
            {currentItem.title || currentItem.alt}
          </h3>
          {currentItem.description && (
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {currentItem.description}
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
