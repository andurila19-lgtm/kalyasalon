"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { salonData } from "@/data/salon";
import { mainNavigation } from "@/data/navigation";
import { useBooking } from "@/context/booking-context";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu, MessageSquare, Phone, MapPin, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { openBooking } = useBooking();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/95 backdrop-blur-md shadow-xs border-b border-gold/20 py-3.5"
          : "bg-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="group flex flex-col focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-gold rounded-xs">
          <span className="font-display text-xl sm:text-2xl font-bold tracking-wider text-foreground group-hover:text-primary transition-colors flex items-center gap-1.5">
            {salonData.name}
            <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />
          </span>
          <span className="text-[10px] sm:text-[11px] font-sans font-medium uppercase tracking-widest text-muted-foreground -mt-0.5">
            {salonData.descriptor}
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7" aria-label="Main Navigation">
          {mainNavigation.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));
            return (
              <Link
                key={item.id}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-all relative py-1",
                  isActive
                    ? "text-primary font-bold after:w-full"
                    : "text-foreground/85 hover:text-primary hover:font-semibold after:w-0 hover:after:w-full",
                  "after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:bg-gold after:transition-all after:duration-300"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA Action */}
        <div className="hidden lg:flex items-center gap-3">
          <Button 
            variant="gold" 
            size="default" 
            onClick={() => openBooking()} 
            className="rounded-full shadow-xs hover:shadow-md transition-all cursor-pointer"
          >
            <span>Book Appointment</span>
          </Button>
        </div>

        {/* Mobile Navigation Trigger & Fast CTA */}
        <div className="flex items-center gap-2 lg:hidden">
          <Button 
            variant="gold" 
            size="sm" 
            onClick={() => openBooking()} 
            className="rounded-full text-xs px-3.5 min-h-[38px] shadow-xs cursor-pointer"
          >
            <span>Booking</span>
          </Button>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button 
                variant="outline" 
                size="icon" 
                className="min-h-[44px] min-w-[44px] rounded-full border-border bg-background/80" 
                aria-label="Buka Menu Navigasi"
              >
                <Menu className="w-5 h-5 text-foreground" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[360px] bg-background border-l border-border flex flex-col justify-between p-6 overflow-y-auto">
              <div className="space-y-6">
                <SheetHeader className="text-left border-b border-border pb-4">
                  <SheetTitle className="font-display text-xl font-bold tracking-wide text-foreground">
                    {salonData.name}
                  </SheetTitle>
                  <p className="text-xs text-muted-foreground tracking-wider uppercase font-medium">
                    {salonData.descriptor} • Madiun
                  </p>
                </SheetHeader>

                <nav className="flex flex-col space-y-1" aria-label="Mobile Navigation">
                  {mainNavigation.map((item) => {
                    const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));
                    return (
                      <Link
                        key={item.id}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "text-base font-medium transition-all py-3 px-3 rounded-lg border-b border-border/30 min-h-[44px] flex items-center",
                          isActive
                            ? "bg-secondary text-primary font-bold"
                            : "text-foreground hover:text-primary hover:bg-muted/60"
                        )}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </nav>
              </div>

              {/* Mobile Sheet Footer Info */}
              <div className="space-y-4 pt-4 border-t border-border mt-auto">
                <div className="space-y-2.5 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gold shrink-0" />
                    <span>Setiap Hari: 09:00 – 20:00 WIB</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gold shrink-0" />
                    <span>{salonData.phoneDisplay}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                    <span className="leading-snug">{salonData.address.street}, Kota Madiun</span>
                  </div>
                </div>

                <Button 
                  variant="gold" 
                  className="w-full min-h-[44px] rounded-full cursor-pointer gap-2" 
                  onClick={() => {
                    setIsOpen(false);
                    openBooking();
                  }}
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Reservasi Appointment</span>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
