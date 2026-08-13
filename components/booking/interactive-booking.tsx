"use client";

import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { servicesData, serviceCategories } from "@/data/services";
import { Service, ServiceCategoryMeta } from "@/types/service";
import { TimeSlot, AvailabilityResult, getTodayDateJakarta } from "@/lib/booking-types";
import { getSupabaseClient } from "@/lib/supabase-client";
import { Button } from "@/components/ui/button";
import { salonData } from "@/data/salon";
import {
  Scissors,
  Calendar as CalendarIcon,
  Clock,
  User,
  Phone,
  Mail,
  FileText,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  Copy,
  Check,
  MapPin,
  RefreshCw,
  Share2,
  MessageCircle,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";

interface InteractiveBookingProps {
  initialServiceId?: string;
  onBookingComplete?: (bookingData: any) => void;
  isModal?: boolean;
}

export function InteractiveBooking({
  initialServiceId,
  onBookingComplete,
  isModal = false,
}: InteractiveBookingProps) {
  // Step State: 1 = Service, 2 = Date, 3 = Time, 4 = Info, 5 = Review, 6 = Confirmation
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5 | 6>(1);
  const containerRef = useRef<HTMLDivElement>(null);

  // Selected Data State
  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    initialServiceId || servicesData[0]?.id || ""
  );
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedDate, setSelectedDate] = useState<string>(getTodayDateJakarta());
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);

  // Customer Form State
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [notes, setNotes] = useState("");

  // UI / Async State
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<any | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  // Realtime notification pulse
  const [realtimeNotification, setRealtimeNotification] = useState<string | null>(null);

  // Auto-scroll on step change (especially critical on mobile)
  const scrollToTop = useCallback(() => {
    if (typeof window !== "undefined") {
      if (isModal && containerRef.current) {
        containerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.scrollTo({ top: 120, behavior: "smooth" });
      }
    }
  }, [isModal]);

  useEffect(() => {
    scrollToTop();
  }, [step, scrollToTop]);

  // Authoritative Selected Service
  const selectedService: Service = useMemo(() => {
    return (
      servicesData.find((s) => s.id === selectedServiceId) ||
      servicesData[0]
    );
  }, [selectedServiceId]);

  // 1. Fetch available slots for (date + service)
  const fetchSlots = useCallback(
    async (date: string, serviceId: string, isSilent = false) => {
      if (!isSilent) setSlotsLoading(true);
      setErrorMessage(null);

      try {
        const res = await fetch(
          `/api/bookings/available-slots?date=${date}&serviceId=${serviceId}`
        );
        const json = await res.json();

        if (json.success && json.data) {
          const result: AvailabilityResult = json.data;
          setAvailableSlots(result.slots);

          // If currently selected slot is now unavailable, invalidate it
          if (selectedSlot) {
            const currentSlotInNewData = result.slots.find(
              (s) => s.time === selectedSlot.time
            );
            if (!currentSlotInNewData || !currentSlotInNewData.available) {
              setSelectedSlot(null);
              setRealtimeNotification(
                `Slot jam ${selectedSlot.time} baru saja dipesan pelanggan lain. Silakan pilih jam lainnya.`
              );
            }
          }
        }
      } catch (err) {
        console.error("Failed to fetch slots:", err);
      } finally {
        if (!isSilent) setSlotsLoading(false);
      }
    },
    [selectedSlot]
  );

  // Fetch slots whenever date or service changes
  useEffect(() => {
    if (selectedDate && selectedServiceId) {
      fetchSlots(selectedDate, selectedServiceId);
    }
  }, [selectedDate, selectedServiceId, fetchSlots]);

  // 2. Supabase Realtime Subscription for Live Availability Updates
  useEffect(() => {
    const supabase = getSupabaseClient();
    if (!supabase) return;

    const channel = supabase
      .channel(`booking-slots-${selectedDate}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "bookings" },
        () => {
          fetchSlots(selectedDate, selectedServiceId, true);
        }
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "blocked_times" },
        () => {
          fetchSlots(selectedDate, selectedServiceId, true);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [selectedDate, selectedServiceId, fetchSlots]);

  // 3. Generate 14-day date strip
  const dateOptions = useMemo(() => {
    const dates: Array<{ dateStr: string; dayName: string; dayNum: string; monthName: string; isWeekend: boolean }> = [];
    const now = new Date();

    for (let i = 0; i < 14; i++) {
      const d = new Date();
      d.setDate(now.getDate() + i);

      const year = d.getFullYear();
      const month = (d.getMonth() + 1).toString().padStart(2, "0");
      const day = d.getDate().toString().padStart(2, "0");
      const dateStr = `${year}-${month}-${day}`;

      const dayName = d.toLocaleDateString("id-ID", { weekday: "short" });
      const dayNum = d.getDate().toString();
      const monthName = d.toLocaleDateString("id-ID", { month: "short" });
      const isWeekend = d.getDay() === 0 || d.getDay() === 6;

      dates.push({ dateStr, dayName, dayNum, monthName, isWeekend });
    }
    return dates;
  }, []);

  // 4. Handle Final Atomic Booking Submission
  const handleSubmitBooking = async () => {
    if (!selectedSlot) {
      setErrorMessage("Silakan pilih jam slot waktu yang tersedia.");
      return;
    }
    if (!customerName.trim() || !customerPhone.trim()) {
      setErrorMessage("Nama lengkap dan nomor WhatsApp wajib diisi.");
      return;
    }

    setSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerName: customerName.trim(),
          customerPhone: customerPhone.trim(),
          customerEmail: customerEmail.trim() || undefined,
          serviceId: selectedService.id,
          bookingDate: selectedDate,
          startTime: selectedSlot.time,
          notes: notes.trim() || undefined,
        }),
      });

      const json = await response.json();

      if (!response.ok || !json.success) {
        setErrorMessage(
          json.message || "Slot waktu baru saja dipesan. Silakan pilih waktu lainnya."
        );
        await fetchSlots(selectedDate, selectedService.id);
        if (response.status === 409) {
          setStep(3);
        }
        return;
      }

      // Booking Confirmed!
      setConfirmedBooking(json.booking);
      setStep(6);
      if (onBookingComplete) {
        onBookingComplete(json.booking);
      }
    } catch (err: any) {
      console.error("Booking error:", err);
      setErrorMessage("Terjadi kendala jaringan saat memproses booking. Silakan coba kembali.");
    } finally {
      setSubmitting(false);
    }
  };

  // Filtered Services List
  const filteredServices = useMemo(() => {
    if (selectedCategory === "all") return servicesData;
    return servicesData.filter((s) => s.category === selectedCategory);
  }, [selectedCategory]);

  const stepTitles = [
    { num: 1, label: "Layanan", short: "Layanan" },
    { num: 2, label: "Tanggal", short: "Tanggal" },
    { num: 3, label: "Waktu", short: "Waktu" },
    { num: 4, label: "Data Diri", short: "Kontak" },
    { num: 5, label: "Konfirmasi", short: "Review" },
  ];

  return (
    <div ref={containerRef} className={cn("w-full max-w-full min-w-0 overflow-x-hidden box-border", isModal ? "p-0" : "max-w-3xl px-2 sm:px-6 py-4 sm:py-8")}>
      {/* STEP PROGRESS INDICATOR (Steps 1 to 5) */}
      {step < 6 && (
        <div className="mb-4 sm:mb-8 bg-card/60 backdrop-blur-sm border border-border/70 rounded-2xl p-3 sm:p-5 shadow-xs w-full min-w-0 overflow-hidden">
          {/* Mobile Current Step Header (Only on mobile) */}
          <div className="flex sm:hidden items-center justify-between mb-2 w-full min-w-0">
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-dark-brown shrink-0">
              Langkah {step} dari 5:
            </span>
            <span className="text-xs font-bold text-foreground truncate pl-2">
              {stepTitles[step - 1]?.label}
            </span>
          </div>

          {/* Desktop 5-Step Circles (Strictly hidden on mobile) */}
          <div className="hidden sm:flex items-center justify-between max-w-xl mx-auto px-2 w-full min-w-0">
            {stepTitles.map((s) => {
              const isCurrent = step === s.num;
              const isPast = step > s.num;
              return (
                <div key={s.num} className="flex flex-col items-center flex-1 min-w-0">
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all",
                      isCurrent && "bg-brand-dark-brown text-white ring-3 ring-brand-champagne-gold/40 shadow-xs scale-105",
                      isPast && "bg-brand-champagne-gold text-brand-charcoal font-bold",
                      !isCurrent && !isPast && "bg-secondary text-muted-foreground"
                    )}
                  >
                    {isPast ? <Check size={13} className="stroke-[3]" /> : s.num}
                  </div>
                  <span
                    className={cn(
                      "text-[11px] mt-1 font-medium transition-colors text-center truncate w-full px-0.5",
                      isCurrent && "text-brand-dark-brown font-bold",
                      isPast && "text-brand-charcoal",
                      !isCurrent && !isPast && "text-muted-foreground"
                    )}
                  >
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Progress Bar (Visible on all screens) */}
          <div className="w-full bg-secondary h-1.5 rounded-full mt-1.5 sm:mt-3 overflow-hidden max-w-xl mx-auto">
            <div
              className="bg-brand-champagne-gold h-full transition-all duration-300 ease-out"
              style={{ width: `${((step - 1) / 4) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* REALTIME ALERT NOTIFICATION */}
      {realtimeNotification && (
        <div className="mb-4 sm:mb-6 p-3 sm:p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-900 text-xs font-medium flex items-center justify-between gap-2 animate-in fade-in">
          <div className="flex items-center gap-2">
            <AlertCircle size={15} className="text-amber-600 shrink-0" />
            <span>{realtimeNotification}</span>
          </div>
          <button
            onClick={() => setRealtimeNotification(null)}
            className="text-amber-800 hover:text-amber-950 font-bold px-2 py-0.5 text-xs shrink-0"
          >
            Tutup
          </button>
        </div>
      )}

      {/* ERROR MESSAGE ALERT */}
      {errorMessage && (
        <div className="mb-4 sm:mb-6 p-3.5 sm:p-4 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive text-xs sm:text-sm font-medium flex items-start gap-2.5 animate-in fade-in">
          <AlertCircle size={16} className="shrink-0 mt-0.5" />
          <span className="leading-relaxed">{errorMessage}</span>
        </div>
      )}

      {/* ============================================================
          STEP 1: CHOOSE SERVICE (RESPONSIVE GRID)
          ============================================================ */}
      {step === 1 && (
        <div className="space-y-4 sm:space-y-6">
          <div className="text-center space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold font-display text-foreground">
              Pilih Layanan Perawatan
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Pilih menu perawatan salon yang ingin Anda reservasi hari ini.
            </p>
          </div>

          {/* Category Filter Pills (Smooth Mobile Horizontal Scroll) */}
          <div className="flex gap-1.5 sm:gap-2 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-none justify-start sm:justify-center">
            <button
              onClick={() => setSelectedCategory("all")}
              className={cn(
                "px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all shrink-0",
                selectedCategory === "all"
                  ? "bg-brand-dark-brown text-white shadow-xs"
                  : "bg-secondary text-foreground hover:bg-brand-soft-pink"
              )}
            >
              Semua Menu ({servicesData.length})
            </button>
            {serviceCategories.map((cat: ServiceCategoryMeta) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={cn(
                  "px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all shrink-0",
                  selectedCategory === cat.id
                    ? "bg-brand-dark-brown text-white shadow-xs"
                    : "bg-secondary text-foreground hover:bg-brand-soft-pink"
                )}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Services Grid (Single col mobile, 2 col desktop) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3.5 max-h-[52vh] sm:max-h-[440px] overflow-y-auto pr-1">
            {filteredServices.map((service) => {
              const isSelected = selectedServiceId === service.id;
              return (
                <div
                  key={service.id}
                  onClick={() => setSelectedServiceId(service.id)}
                  className={cn(
                    "p-3.5 sm:p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between text-left relative",
                    isSelected
                      ? "border-brand-champagne-gold bg-brand-soft-pink/40 shadow-xs ring-2 ring-brand-champagne-gold/30"
                      : "border-border bg-card hover:border-brand-champagne-gold/50 hover:bg-muted/30 active:scale-[0.99]"
                  )}
                >
                  <div className="space-y-1">
                    <div className="flex justify-between items-start gap-2">
                      <div className="flex items-center gap-2">
                        <div
                          className={cn(
                            "w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-colors",
                            isSelected
                              ? "border-brand-champagne-gold bg-brand-dark-brown text-white"
                              : "border-muted-foreground/40"
                          )}
                        >
                          {isSelected && <Check size={10} className="stroke-[3]" />}
                        </div>
                        <h3 className="text-sm font-bold text-foreground font-display leading-snug">
                          {service.name}
                        </h3>
                      </div>

                      {service.featured && (
                        <span className="text-[9px] uppercase font-bold bg-brand-champagne-gold/20 text-brand-dark-brown px-1.5 py-0.5 rounded-full shrink-0">
                          Populer
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] sm:text-xs text-muted-foreground line-clamp-2 leading-relaxed pl-6">
                      {service.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2.5 mt-2 border-t border-border/60 pl-6">
                    <div className="flex items-center gap-1 text-[11px] sm:text-xs text-muted-foreground">
                      <Clock size={12} className="text-brand-champagne-gold" />
                      <span>{service.durationMinutes || 60} menit</span>
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-brand-dark-brown">
                      {service.priceDisplay}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sticky/Fixed bottom action bar on mobile */}
          <div className="flex justify-end pt-2 sm:pt-4">
            <Button
              variant="gold"
              size="lg"
              className="w-full sm:w-auto rounded-full px-8 gap-2 font-semibold text-xs sm:text-sm min-h-[46px] shadow-md shadow-brand-champagne-gold/20"
              onClick={() => setStep(2)}
            >
              <span>Lanjut: Pilih Tanggal</span>
              <ArrowRight size={15} />
            </Button>
          </div>
        </div>
      )}

      {/* ============================================================
          STEP 2: CHOOSE DATE (RESPONSIVE DATE STRIP)
          ============================================================ */}
      {step === 2 && (
        <div className="space-y-4 sm:space-y-6">
          <div className="text-center space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold font-display text-foreground">
              Pilih Tanggal Kunjungan
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground px-2">
              Layanan: <strong className="text-foreground">{selectedService.name}</strong> ({selectedService.durationMinutes || 60} menit)
            </p>
          </div>

          {/* 14-Day Responsive Grid (4 col on mobile, 7 col on desktop) */}
          <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 max-w-2xl mx-auto">
            {dateOptions.map((item) => {
              const isSelected = selectedDate === item.dateStr;
              return (
                <button
                  key={item.dateStr}
                  onClick={() => {
                    setSelectedDate(item.dateStr);
                    setSelectedSlot(null);
                  }}
                  className={cn(
                    "p-2.5 sm:p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-0.5 cursor-pointer active:scale-95",
                    isSelected
                      ? "border-brand-dark-brown bg-brand-dark-brown text-white shadow-md ring-2 ring-brand-champagne-gold/40"
                      : "border-border bg-card hover:border-brand-champagne-gold hover:bg-secondary/40 text-foreground"
                  )}
                >
                  <span className={cn(
                    "text-[10px] uppercase font-bold tracking-wider",
                    isSelected ? "text-brand-champagne-gold" : item.isWeekend ? "text-amber-700 dark:text-amber-400" : "text-muted-foreground"
                  )}>
                    {item.dayName}
                  </span>
                  <span className="text-base sm:text-lg font-bold font-display leading-tight">
                    {item.dayNum}
                  </span>
                  <span className="text-[10px] opacity-75">{item.monthName}</span>
                </button>
              );
            })}
          </div>

          <div className="p-3 rounded-xl bg-secondary/50 border border-border text-[11px] sm:text-xs text-muted-foreground text-center max-w-md mx-auto">
            🕒 Salon buka setiap hari pukul <strong>09:00 - 20:00 WIB</strong> (Termasuk akhir pekan).
          </div>

          <div className="flex justify-between items-center gap-2 pt-2 sm:pt-4">
            <Button
              variant="outline"
              size="lg"
              className="rounded-full px-5 sm:px-6 gap-1.5 text-xs min-h-[46px]"
              onClick={() => setStep(1)}
            >
              <ChevronLeft size={15} />
              <span>Kembali</span>
            </Button>

            <Button
              variant="gold"
              size="lg"
              className="rounded-full px-6 sm:px-8 gap-2 font-semibold text-xs sm:text-sm min-h-[46px] shadow-md shadow-brand-champagne-gold/20"
              onClick={() => setStep(3)}
            >
              <span>Lanjut: Pilih Jam</span>
              <ArrowRight size={15} />
            </Button>
          </div>
        </div>
      )}

      {/* ============================================================
          STEP 3: CHOOSE REALTIME TIME SLOT (RESPONSIVE 3-4 COL)
          ============================================================ */}
      {step === 3 && (
        <div className="space-y-4 sm:space-y-6">
          <div className="text-center space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold font-display text-foreground">
              Pilih Waktu Kedatangan
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground px-2">
              Tanggal: <strong>{selectedDate}</strong> • Durasi: <strong>{selectedService.durationMinutes || 60} menit</strong>
            </p>
          </div>

          {/* Slot Status Legend */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 text-[11px] sm:text-xs">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="text-muted-foreground">Tersedia (Realtime)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-neutral-400" />
              <span className="text-muted-foreground">Penuh / Lewat</span>
            </div>
          </div>

          {/* Slots Grid (3 col on mobile, 4 col on desktop) */}
          {slotsLoading ? (
            <div className="py-14 text-center space-y-3">
              <RefreshCw className="w-6 h-6 animate-spin mx-auto text-brand-champagne-gold" />
              <p className="text-xs text-muted-foreground">Memeriksa ketersediaan slot waktu salon...</p>
            </div>
          ) : availableSlots.length === 0 ? (
            <div className="py-10 text-center space-y-2 bg-card rounded-xl border border-border p-5 max-w-md mx-auto">
              <AlertCircle className="w-8 h-8 text-muted-foreground mx-auto" />
              <p className="text-sm font-semibold text-foreground">Tidak ada slot tersedia pada tanggal ini.</p>
              <p className="text-xs text-muted-foreground">Silakan kembali dan pilih tanggal lainnya.</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-2.5 max-w-2xl mx-auto">
              {availableSlots.map((slot) => {
                const isSelected = selectedSlot?.time === slot.time;
                const isAvailable = slot.available;

                return (
                  <button
                    key={slot.time}
                    disabled={!isAvailable}
                    onClick={() => setSelectedSlot(slot)}
                    className={cn(
                      "p-2.5 sm:p-3 rounded-xl border transition-all flex flex-col items-center justify-center gap-0.5 min-h-[58px]",
                      isAvailable && !isSelected && "bg-card border-border hover:border-brand-champagne-gold hover:bg-emerald-500/5 cursor-pointer active:scale-95",
                      isAvailable && isSelected && "bg-brand-dark-brown text-white border-brand-dark-brown shadow-md ring-2 ring-brand-champagne-gold/40",
                      !isAvailable && "bg-muted/40 border-border/40 text-muted-foreground/50 cursor-not-allowed opacity-60"
                    )}
                  >
                    <span className="text-xs sm:text-sm font-bold font-display">
                      {slot.time} WIB
                    </span>
                    <span className={cn(
                      "text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider",
                      isAvailable && !isSelected && "text-emerald-700 font-bold",
                      isAvailable && isSelected && "text-brand-champagne-gold font-bold",
                      !isAvailable && "text-muted-foreground/60"
                    )}>
                      {isAvailable ? "Tersedia" : slot.status === "BLOCKED" ? "Libur" : "Penuh"}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {selectedSlot && (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-950 text-xs text-center max-w-md mx-auto animate-in fade-in">
              ✅ Anda memilih jam <strong>{selectedSlot.time} WIB</strong> (Estimasi selesai pukul <strong>{selectedSlot.endTime} WIB</strong>).
            </div>
          )}

          <div className="flex justify-between items-center gap-2 pt-2 sm:pt-4">
            <Button
              variant="outline"
              size="lg"
              className="rounded-full px-5 sm:px-6 gap-1.5 text-xs min-h-[46px]"
              onClick={() => setStep(2)}
            >
              <ChevronLeft size={15} />
              <span>Ganti Tanggal</span>
            </Button>

            <Button
              variant="gold"
              size="lg"
              disabled={!selectedSlot}
              className="rounded-full px-6 sm:px-8 gap-2 font-semibold text-xs sm:text-sm min-h-[46px] shadow-md shadow-brand-champagne-gold/20"
              onClick={() => setStep(4)}
            >
              <span>Lanjut: Data Diri</span>
              <ArrowRight size={15} />
            </Button>
          </div>
        </div>
      )}

      {/* ============================================================
          STEP 4: CUSTOMER INFORMATION (MOBILE 16PX FONT SIZE SAFE)
          ============================================================ */}
      {step === 4 && (
        <div className="space-y-4 sm:space-y-6 max-w-xl mx-auto">
          <div className="text-center space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold font-display text-foreground">
              Data Diri Pemesan
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Mohon isi data kontak Anda untuk verifikasi reservasi janji temu.
            </p>
          </div>

          <div className="space-y-3.5 sm:space-y-4 bg-card p-4 sm:p-6 rounded-2xl border border-border shadow-xs">
            <div className="space-y-1">
              <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <User size={13} className="text-brand-champagne-gold" />
                <span>Nama Lengkap *</span>
              </label>
              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Contoh: Shafira Aulia"
                className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-champagne-gold"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <Phone size={13} className="text-brand-champagne-gold" />
                <span>Nomor WhatsApp / HP Aktif *</span>
              </label>
              <input
                type="tel"
                required
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="Contoh: 081234567890"
                className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-champagne-gold"
              />
              <p className="text-[10px] sm:text-[11px] text-muted-foreground">
                Digunakan untuk konfirmasi kehadiran atau info perubahan jadwal.
              </p>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <Mail size={13} className="text-brand-champagne-gold" />
                <span>Email (Opsional)</span>
              </label>
              <input
                type="email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                placeholder="contoh@gmail.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-champagne-gold"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <FileText size={13} className="text-brand-champagne-gold" />
                <span>Catatan Khusus (Opsional)</span>
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Contoh: Rambut tebal sebahu, ingin konsultasi warna..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-champagne-gold resize-none"
              />
            </div>
          </div>

          <div className="flex justify-between items-center gap-2 pt-2">
            <Button
              variant="outline"
              size="lg"
              className="rounded-full px-5 sm:px-6 gap-1.5 text-xs min-h-[46px]"
              onClick={() => setStep(3)}
            >
              <ChevronLeft size={15} />
              <span>Ganti Jam</span>
            </Button>

            <Button
              variant="gold"
              size="lg"
              disabled={!customerName.trim() || !customerPhone.trim()}
              className="rounded-full px-6 sm:px-8 gap-2 font-semibold text-xs sm:text-sm min-h-[46px] shadow-md shadow-brand-champagne-gold/20"
              onClick={() => setStep(5)}
            >
              <span>Review Booking</span>
              <ArrowRight size={15} />
            </Button>
          </div>
        </div>
      )}

      {/* ============================================================
          STEP 5: REVIEW BOOKING (LUXURY VOUCHER TICKET)
          ============================================================ */}
      {step === 5 && (
        <div className="space-y-4 sm:space-y-6 max-w-xl mx-auto">
          <div className="text-center space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold font-display text-foreground">
              Review Ringkasan Reservasi
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground px-2">
              Pastikan rincian janji temu Anda telah sesuai sebelum mengonfirmasi.
            </p>
          </div>

          <div className="bg-card rounded-2xl border border-border p-4 sm:p-6 shadow-sm space-y-4">
            {/* Header Service Summary */}
            <div className="flex items-start justify-between pb-3.5 border-b border-border">
              <div>
                <span className="text-[9px] sm:text-[10px] font-bold text-brand-champagne-gold uppercase tracking-wider block">
                  Layanan Perawatan
                </span>
                <h3 className="text-base sm:text-lg font-bold font-display text-foreground leading-snug">
                  {selectedService.name}
                </h3>
                <p className="text-[11px] sm:text-xs text-muted-foreground mt-0.5">
                  Estimasi pengerjaan: {selectedService.durationMinutes || 60} menit
                </p>
              </div>
              <div className="text-right shrink-0">
                <span className="text-sm sm:text-base font-bold text-brand-dark-brown">
                  {selectedService.priceDisplay}
                </span>
                <p className="text-[9px] sm:text-[10px] text-muted-foreground">Bayar di salon</p>
              </div>
            </div>

            {/* Schedule Details */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="space-y-0.5">
                <span className="text-muted-foreground flex items-center gap-1 font-medium text-[11px]">
                  <CalendarIcon size={12} className="text-brand-champagne-gold" />
                  Tanggal Janji Temu
                </span>
                <p className="font-bold text-foreground">{selectedDate}</p>
              </div>

              <div className="space-y-0.5">
                <span className="text-muted-foreground flex items-center gap-1 font-medium text-[11px]">
                  <Clock size={12} className="text-brand-champagne-gold" />
                  Waktu Kedatangan
                </span>
                <p className="font-bold text-foreground">
                  {selectedSlot?.time} - {selectedSlot?.endTime} WIB
                </p>
              </div>
            </div>

            {/* Customer Details */}
            <div className="p-3.5 rounded-xl bg-secondary/50 border border-border/80 space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Nama:</span>
                <span className="font-bold text-foreground">{customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">WhatsApp:</span>
                <span className="font-bold text-foreground">{customerPhone}</span>
              </div>
              {customerEmail && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Email:</span>
                  <span className="font-bold text-foreground">{customerEmail}</span>
                </div>
              )}
              {notes && (
                <div className="pt-1.5 border-t border-border/60">
                  <span className="text-muted-foreground block mb-0.5">Catatan:</span>
                  <p className="text-foreground italic font-medium">{notes}</p>
                </div>
              )}
            </div>

            {/* Location Notice */}
            <div className="flex items-start gap-2 text-[11px] text-muted-foreground pt-1">
              <MapPin size={13} className="text-brand-champagne-gold shrink-0 mt-0.5" />
              <span>
                Lokasi: <strong>{salonData.address.street}</strong>, {salonData.address.city}. Harap hadir 10 menit sebelum jam janji temu.
              </span>
            </div>
          </div>

          <div className="flex justify-between items-center gap-2 pt-2">
            <Button
              variant="outline"
              size="lg"
              disabled={submitting}
              className="rounded-full px-5 sm:px-6 gap-1.5 text-xs min-h-[46px]"
              onClick={() => setStep(4)}
            >
              <ChevronLeft size={15} />
              <span>Ubah Data</span>
            </Button>

            <Button
              variant="gold"
              size="lg"
              disabled={submitting}
              className="w-full sm:w-auto rounded-full px-6 sm:px-8 gap-2 font-semibold text-xs sm:text-sm min-h-[46px] shadow-lg shadow-brand-champagne-gold/25"
              onClick={handleSubmitBooking}
            >
              {submitting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Memproses...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 size={16} />
                  <span>Konfirmasi & Buat Janji Temu</span>
                </>
              )}
            </Button>
          </div>
        </div>
      )}

      {/* ============================================================
          STEP 6: INSTANT ON-SITE BOOKING CONFIRMATION (RESPONSIVE)
          ============================================================ */}
      {step === 6 && confirmedBooking && (
        <div className="max-w-xl mx-auto space-y-4 sm:space-y-6 animate-in zoom-in-95 duration-300">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-500/20 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 size={32} className="text-emerald-600" />
            </div>
            <h2 className="text-xl sm:text-3xl font-bold font-display text-foreground">
              Reservasi Berhasil Dibuat!
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto px-2">
              Janji temu Anda telah terkonfirmasi secara instan di sistem Kalya Salon. Tunjukkan kode reservasi ini saat Anda tiba di salon.
            </p>
          </div>

          {/* Luxury Confirmation Ticket Card */}
          <div className="bg-card rounded-2xl border-2 border-brand-champagne-gold/40 p-4 sm:p-7 shadow-xl relative overflow-hidden space-y-4 sm:space-y-5">
            <div className="absolute top-0 right-0 w-28 h-28 bg-brand-champagne-gold/10 rounded-full blur-2xl pointer-events-none" />

            {/* Booking Code Banner */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-gradient-to-r from-brand-dark-brown to-brand-charcoal text-white text-center space-y-1 shadow-md">
              <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-widest text-brand-champagne-gold">
                Kode Reservasi Resmi
              </span>
              <div className="flex items-center justify-center gap-2">
                <span className="text-xl sm:text-2xl md:text-3xl font-bold font-mono tracking-wider">
                  {confirmedBooking.bookingCode}
                </span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(confirmedBooking.bookingCode);
                    setCopiedCode(true);
                    setTimeout(() => setCopiedCode(false), 2000);
                  }}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                  title="Salin Kode"
                >
                  {copiedCode ? <Check size={15} className="text-emerald-400" /> : <Copy size={15} />}
                </button>
              </div>
            </div>

            {/* Ticket Details */}
            <div className="space-y-2.5 text-xs sm:text-sm border-t border-b border-border/80 py-3.5">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Nama Pelanggan:</span>
                <span className="font-bold text-foreground">{confirmedBooking.customerName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Layanan:</span>
                <span className="font-bold text-foreground text-right">{confirmedBooking.serviceName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Tanggal:</span>
                <span className="font-bold text-foreground">{confirmedBooking.bookingDate}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Waktu Kedatangan:</span>
                <span className="font-bold text-brand-dark-brown">
                  {confirmedBooking.startTime} - {confirmedBooking.endTime} WIB
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Estimasi Biaya:</span>
                <span className="font-bold text-foreground">{confirmedBooking.priceDisplay}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Status Reservasi:</span>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-emerald-500/20 text-emerald-800 px-2.5 py-0.5 rounded-full">
                  <Check size={11} /> Terkonfirmasi
                </span>
              </div>
            </div>

            {/* Important Notes */}
            <div className="p-3 rounded-xl bg-secondary/60 text-[11px] sm:text-xs text-muted-foreground space-y-0.5">
              <p className="font-semibold text-foreground">📌 Petunjuk Kedatangan:</p>
              <p>• Harap hadir di salon 10 menit sebelum jam janji temu.</p>
              <p>• Pembayaran dilakukan langsung di kasir (Tunai, QRIS, atau Debit).</p>
            </div>

            {/* Action Buttons (WhatsApp + Directions + Print) */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-1">
              <Button
                variant="gold"
                className="w-full rounded-full text-xs font-semibold gap-2 min-h-[44px]"
                asChild
              >
                <a
                  href={`https://wa.me/6283845494574?text=${encodeURIComponent(
                    `Halo Kalya Salon 👋\n\nSaya telah membuat reservasi online dengan kode *${confirmedBooking.bookingCode}*.\n\nDetail:\n• Nama: ${confirmedBooking.customerName}\n• Layanan: ${confirmedBooking.serviceName}\n• Jadwal: ${confirmedBooking.bookingDate} pukul ${confirmedBooking.startTime} WIB\n\nMohon konfirmasi kesiapannya. Terima kasih!`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle size={15} />
                  <span>Kirim Notifikasi ke WhatsApp</span>
                </a>
              </Button>

              <Button
                variant="outline"
                className="w-full rounded-full text-xs font-semibold gap-2 min-h-[44px]"
                asChild
              >
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                    salonData.address.formatted
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MapPin size={14} />
                  <span>Petunjuk Arah Maps</span>
                </a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
