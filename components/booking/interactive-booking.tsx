"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
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
  Sparkles,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  Copy,
  Check,
  MapPin,
  RefreshCw,
  Share2,
  CalendarPlus
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
        (payload: any) => {
          // Re-fetch slots silently when any booking changes on this date
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
    const dates: Array<{ dateStr: string; dayName: string; dayNum: string; monthName: string }> = [];
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

      dates.push({ dateStr, dayName, dayNum, monthName });
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
        // Refresh slots and bump back to slot selection step
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
      setErrorMessage("Terjadi kendala saat memproses booking. Silakan coba kembali.");
    } finally {
      setSubmitting(false);
    }
  };

  // Filtered Services List
  const filteredServices = useMemo(() => {
    if (selectedCategory === "all") return servicesData;
    return servicesData.filter((s) => s.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className={cn("w-full mx-auto", isModal ? "max-w-3xl" : "max-w-4xl px-4 py-8")}>
      {/* STEP PROGRESS INDICATOR (Steps 1 to 5) */}
      {step < 6 && (
        <div className="mb-8">
          <div className="flex items-center justify-between max-w-xl mx-auto px-2">
            {[
              { num: 1, label: "Layanan" },
              { num: 2, label: "Tanggal" },
              { num: 3, label: "Waktu" },
              { num: 4, label: "Data Diri" },
              { num: 5, label: "Konfirmasi" },
            ].map((s) => {
              const isCurrent = step === s.num;
              const isPast = step > s.num;
              return (
                <div key={s.num} className="flex flex-col items-center flex-1">
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all",
                      isCurrent && "bg-brand-dark-brown text-brand-warm-ivory ring-4 ring-brand-champagne-gold/30 shadow-md",
                      isPast && "bg-brand-champagne-gold text-brand-charcoal font-bold",
                      !isCurrent && !isPast && "bg-secondary text-muted-foreground"
                    )}
                  >
                    {isPast ? <Check size={14} /> : s.num}
                  </div>
                  <span
                    className={cn(
                      "text-[11px] mt-1.5 font-medium transition-colors hidden sm:block",
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
          <div className="w-full bg-secondary h-1.5 rounded-full mt-3 overflow-hidden max-w-xl mx-auto">
            <div
              className="bg-brand-champagne-gold h-full transition-all duration-300 ease-out"
              style={{ width: `${((step - 1) / 4) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* REALTIME ALERT NOTIFICATION */}
      {realtimeNotification && (
        <div className="mb-6 p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-900 text-xs font-medium flex items-center justify-between gap-3 animate-in fade-in">
          <div className="flex items-center gap-2">
            <AlertCircle size={16} className="text-amber-600 shrink-0" />
            <span>{realtimeNotification}</span>
          </div>
          <button
            onClick={() => setRealtimeNotification(null)}
            className="text-amber-800 hover:text-amber-950 font-bold px-2 py-0.5 text-xs"
          >
            Tutup
          </button>
        </div>
      )}

      {/* ERROR MESSAGE ALERT */}
      {errorMessage && (
        <div className="mb-6 p-4 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive text-xs sm:text-sm font-medium flex items-start gap-3 animate-in fade-in">
          <AlertCircle size={18} className="shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* ============================================================
          STEP 1: CHOOSE SERVICE
          ============================================================ */}
      {step === 1 && (
        <div className="space-y-6">
          <div className="text-center space-y-1">
            <h2 className="text-2xl font-bold font-display text-foreground">
              Pilih Layanan Perawatan
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Pilih salah satu menu perawatan salon yang ingin Anda nikmati.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none justify-start sm:justify-center">
            <button
              onClick={() => setSelectedCategory("all")}
              className={cn(
                "px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all",
                selectedCategory === "all"
                  ? "bg-brand-dark-brown text-white shadow-sm"
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
                  "px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all",
                  selectedCategory === cat.id
                    ? "bg-brand-dark-brown text-white shadow-sm"
                    : "bg-secondary text-foreground hover:bg-brand-soft-pink"
                )}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-h-[420px] overflow-y-auto pr-1">
            {filteredServices.map((service) => {
              const isSelected = selectedServiceId === service.id;
              return (
                <div
                  key={service.id}
                  onClick={() => setSelectedServiceId(service.id)}
                  className={cn(
                    "p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between text-left",
                    isSelected
                      ? "border-brand-champagne-gold bg-brand-soft-pink/40 shadow-sm ring-2 ring-brand-champagne-gold/20"
                      : "border-border bg-card hover:border-brand-champagne-gold/50 hover:bg-muted/30"
                  )}
                >
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="text-sm font-bold text-foreground font-display">
                        {service.name}
                      </h3>
                      {service.featured && (
                        <span className="text-[10px] uppercase font-bold bg-brand-champagne-gold/20 text-brand-dark-brown px-2 py-0.5 rounded-full shrink-0">
                          Populer
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 mt-2 border-t border-border/60">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock size={13} className="text-brand-champagne-gold" />
                      <span>{service.durationMinutes || 60} menit</span>
                    </div>
                    <span className="text-xs font-bold text-brand-dark-brown">
                      {service.priceDisplay}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-end pt-4">
            <Button
              variant="gold"
              size="lg"
              className="rounded-full px-8 gap-2 font-semibold text-xs min-h-[46px]"
              onClick={() => setStep(2)}
            >
              <span>Lanjut: Pilih Tanggal</span>
              <ArrowRight size={15} />
            </Button>
          </div>
        </div>
      )}

      {/* ============================================================
          STEP 2: CHOOSE DATE
          ============================================================ */}
      {step === 2 && (
        <div className="space-y-6">
          <div className="text-center space-y-1">
            <h2 className="text-2xl font-bold font-display text-foreground">
              Pilih Tanggal Kunjungan
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Layanan: <span className="font-semibold text-foreground">{selectedService.name}</span> ({selectedService.durationMinutes || 60} menit)
            </p>
          </div>

          {/* 14-Day Date Grid Picker */}
          <div className="grid grid-cols-3 sm:grid-cols-7 gap-2.5 max-w-2xl mx-auto">
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
                    "p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 cursor-pointer",
                    isSelected
                      ? "border-brand-dark-brown bg-brand-dark-brown text-white shadow-md ring-2 ring-brand-champagne-gold/30"
                      : "border-border bg-card hover:border-brand-champagne-gold hover:bg-secondary/40 text-foreground"
                  )}
                >
                  <span className="text-[10px] uppercase font-bold tracking-wider opacity-80">
                    {item.dayName}
                  </span>
                  <span className="text-lg font-bold font-display leading-tight">
                    {item.dayNum}
                  </span>
                  <span className="text-[10px] opacity-75">{item.monthName}</span>
                </button>
              );
            })}
          </div>

          <div className="p-3.5 rounded-xl bg-secondary/50 border border-border text-xs text-muted-foreground text-center max-w-md mx-auto">
            🕒 Salon buka setiap hari pukul <strong>09:00 - 20:00 WIB</strong> (Termasuk hari libur).
          </div>

          <div className="flex justify-between items-center pt-4">
            <Button
              variant="outline"
              size="lg"
              className="rounded-full px-6 gap-2 text-xs min-h-[46px]"
              onClick={() => setStep(1)}
            >
              <ChevronLeft size={15} />
              <span>Kembali</span>
            </Button>

            <Button
              variant="gold"
              size="lg"
              className="rounded-full px-8 gap-2 font-semibold text-xs min-h-[46px]"
              onClick={() => setStep(3)}
            >
              <span>Lanjut: Pilih Waktu</span>
              <ArrowRight size={15} />
            </Button>
          </div>
        </div>
      )}

      {/* ============================================================
          STEP 3: CHOOSE REALTIME TIME SLOT
          ============================================================ */}
      {step === 3 && (
        <div className="space-y-6">
          <div className="text-center space-y-1">
            <h2 className="text-2xl font-bold font-display text-foreground">
              Pilih Waktu Kedatangan
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Tanggal: <strong>{selectedDate}</strong> • Layanan: <strong>{selectedService.name}</strong> ({selectedService.durationMinutes || 60} menit)
            </p>
          </div>

          {/* Slot Status Legend */}
          <div className="flex items-center justify-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="text-muted-foreground">Tersedia (Realtime)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-neutral-300" />
              <span className="text-muted-foreground">Penuh / Terisi</span>
            </div>
          </div>

          {/* Slots Grid */}
          {slotsLoading ? (
            <div className="py-16 text-center space-y-3">
              <RefreshCw className="w-6 h-6 animate-spin mx-auto text-brand-champagne-gold" />
              <p className="text-xs text-muted-foreground">Memeriksa ketersediaan slot realtime dari database...</p>
            </div>
          ) : availableSlots.length === 0 ? (
            <div className="py-12 text-center space-y-2 bg-card rounded-xl border border-border p-6">
              <AlertCircle className="w-8 h-8 text-muted-foreground mx-auto" />
              <p className="text-sm font-semibold text-foreground">Tidak ada slot tersedia pada tanggal ini.</p>
              <p className="text-xs text-muted-foreground">Silakan kembali dan pilih tanggal lainnya.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-2xl mx-auto">
              {availableSlots.map((slot) => {
                const isSelected = selectedSlot?.time === slot.time;
                const isAvailable = slot.available;

                return (
                  <button
                    key={slot.time}
                    disabled={!isAvailable}
                    onClick={() => setSelectedSlot(slot)}
                    className={cn(
                      "p-3 rounded-xl border transition-all flex flex-col items-center justify-center gap-1",
                      isAvailable && !isSelected && "bg-card border-border hover:border-brand-champagne-gold hover:bg-emerald-500/5 cursor-pointer",
                      isAvailable && isSelected && "bg-brand-dark-brown text-white border-brand-dark-brown shadow-md ring-2 ring-brand-champagne-gold/30",
                      !isAvailable && "bg-muted/40 border-border/40 text-muted-foreground/50 cursor-not-allowed opacity-60"
                    )}
                  >
                    <span className="text-sm font-bold font-display">
                      {slot.time} WIB
                    </span>
                    <span className={cn(
                      "text-[10px] font-semibold uppercase tracking-wider",
                      isAvailable && !isSelected && "text-emerald-700 font-bold",
                      isAvailable && isSelected && "text-brand-champagne-gold font-bold",
                      !isAvailable && "text-muted-foreground/60"
                    )}>
                      {isAvailable ? "Tersedia" : slot.status === "BLOCKED" ? "Diblokir" : "Penuh"}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {selectedSlot && (
            <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-950 text-xs text-center max-w-md mx-auto animate-in fade-in">
              ✅ Anda memilih jam <strong>{selectedSlot.time} WIB</strong> (Selesai estimasi pukul <strong>{selectedSlot.endTime} WIB</strong>).
            </div>
          )}

          <div className="flex justify-between items-center pt-4">
            <Button
              variant="outline"
              size="lg"
              className="rounded-full px-6 gap-2 text-xs min-h-[46px]"
              onClick={() => setStep(2)}
            >
              <ChevronLeft size={15} />
              <span>Ganti Tanggal</span>
            </Button>

            <Button
              variant="gold"
              size="lg"
              disabled={!selectedSlot}
              className="rounded-full px-8 gap-2 font-semibold text-xs min-h-[46px]"
              onClick={() => setStep(4)}
            >
              <span>Lanjut: Data Diri</span>
              <ArrowRight size={15} />
            </Button>
          </div>
        </div>
      )}

      {/* ============================================================
          STEP 4: CUSTOMER INFORMATION
          ============================================================ */}
      {step === 4 && (
        <div className="space-y-6 max-w-xl mx-auto">
          <div className="text-center space-y-1">
            <h2 className="text-2xl font-bold font-display text-foreground">
              Data Diri Pemesan
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Mohon isi data kontak Anda untuk verifikasi reservasi janji temu.
            </p>
          </div>

          <div className="space-y-4 bg-card p-6 rounded-2xl border border-border shadow-sm">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <User size={14} className="text-brand-champagne-gold" />
                <span>Nama Lengkap *</span>
              </label>
              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Contoh: Shafira Aulia"
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-brand-champagne-gold"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <Phone size={14} className="text-brand-champagne-gold" />
                <span>Nomor WhatsApp / HP Aktif *</span>
              </label>
              <input
                type="tel"
                required
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="Contoh: 081234567890"
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-brand-champagne-gold"
              />
              <p className="text-[11px] text-muted-foreground">
                Digunakan untuk konfirmasi kehadiran atau perubahan jadwal darurat.
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <Mail size={14} className="text-brand-champagne-gold" />
                <span>Email (Opsional)</span>
              </label>
              <input
                type="email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                placeholder="contoh@gmail.com"
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-brand-champagne-gold"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <FileText size={14} className="text-brand-champagne-gold" />
                <span>Catatan Khusus (Opsional)</span>
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Contoh: Rambut tebal sebahu, ingin konsultasi warna terlebih dahulu..."
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-brand-champagne-gold resize-none"
              />
            </div>
          </div>

          <div className="flex justify-between items-center pt-2">
            <Button
              variant="outline"
              size="lg"
              className="rounded-full px-6 gap-2 text-xs min-h-[46px]"
              onClick={() => setStep(3)}
            >
              <ChevronLeft size={15} />
              <span>Ganti Jam</span>
            </Button>

            <Button
              variant="gold"
              size="lg"
              disabled={!customerName.trim() || !customerPhone.trim()}
              className="rounded-full px-8 gap-2 font-semibold text-xs min-h-[46px]"
              onClick={() => setStep(5)}
            >
              <span>Review Booking</span>
              <ArrowRight size={15} />
            </Button>
          </div>
        </div>
      )}

      {/* ============================================================
          STEP 5: REVIEW BOOKING
          ============================================================ */}
      {step === 5 && (
        <div className="space-y-6 max-w-xl mx-auto">
          <div className="text-center space-y-1">
            <h2 className="text-2xl font-bold font-display text-foreground">
              Review Ringkasan Reservasi
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Pastikan seluruh rincian janji temu Anda telah sesuai sebelum mengonfirmasi.
            </p>
          </div>

          <div className="bg-card rounded-2xl border border-border p-6 shadow-sm space-y-5">
            {/* Header Service Summary */}
            <div className="flex items-start justify-between pb-4 border-b border-border">
              <div>
                <span className="text-[10px] font-bold text-brand-champagne-gold uppercase tracking-wider block">
                  Layanan Perawatan
                </span>
                <h3 className="text-lg font-bold font-display text-foreground">
                  {selectedService.name}
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Estimasi pengerjaan: {selectedService.durationMinutes || 60} menit
                </p>
              </div>
              <div className="text-right">
                <span className="text-base font-bold text-brand-dark-brown">
                  {selectedService.priceDisplay}
                </span>
                <p className="text-[10px] text-muted-foreground">Bayar di salon</p>
              </div>
            </div>

            {/* Schedule Details */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <span className="text-muted-foreground flex items-center gap-1.5 font-medium">
                  <CalendarIcon size={13} className="text-brand-champagne-gold" />
                  Tanggal Janji Temu
                </span>
                <p className="font-bold text-foreground">{selectedDate}</p>
              </div>

              <div className="space-y-1">
                <span className="text-muted-foreground flex items-center gap-1.5 font-medium">
                  <Clock size={13} className="text-brand-champagne-gold" />
                  Waktu Kedatangan
                </span>
                <p className="font-bold text-foreground">
                  {selectedSlot?.time} - {selectedSlot?.endTime} WIB
                </p>
              </div>
            </div>

            {/* Customer Details */}
            <div className="p-4 rounded-xl bg-secondary/50 border border-border/80 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Nama Pelanggan:</span>
                <span className="font-bold text-foreground">{customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Nomor WhatsApp:</span>
                <span className="font-bold text-foreground">{customerPhone}</span>
              </div>
              {customerEmail && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Email:</span>
                  <span className="font-bold text-foreground">{customerEmail}</span>
                </div>
              )}
              {notes && (
                <div className="pt-2 border-t border-border/60">
                  <span className="text-muted-foreground block mb-0.5">Catatan:</span>
                  <p className="text-foreground italic font-medium">{notes}</p>
                </div>
              )}
            </div>

            {/* Location Notice */}
            <div className="flex items-start gap-2.5 text-[11px] text-muted-foreground pt-1">
              <MapPin size={15} className="text-brand-champagne-gold shrink-0 mt-0.5" />
              <span>
                Lokasi: <strong>{salonData.address.street}</strong>, {salonData.address.city}. Harap hadir 10 menit sebelum jadwal.
              </span>
            </div>
          </div>

          <div className="flex justify-between items-center pt-2">
            <Button
              variant="outline"
              size="lg"
              disabled={submitting}
              className="rounded-full px-6 gap-2 text-xs min-h-[46px]"
              onClick={() => setStep(4)}
            >
              <ChevronLeft size={15} />
              <span>Ubah Data</span>
            </Button>

            <Button
              variant="gold"
              size="lg"
              disabled={submitting}
              className="rounded-full px-8 gap-2 font-semibold text-xs min-h-[46px] shadow-lg shadow-brand-champagne-gold/20"
              onClick={handleSubmitBooking}
            >
              {submitting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Memproses Reservasi...</span>
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
          STEP 6: INSTANT ON-SITE BOOKING CONFIRMATION
          ============================================================ */}
      {step === 6 && confirmedBooking && (
        <div className="max-w-xl mx-auto space-y-6 animate-in zoom-in-95 duration-300">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 size={36} className="text-emerald-600" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-foreground">
              Reservasi Berhasil Dibuat!
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto">
              Janji temu Anda telah terkonfirmasi secara instan di sistem Kalya Salon. Tunjukkan kode reservasi ini saat Anda tiba di salon.
            </p>
          </div>

          {/* Luxury Confirmation Ticket Card */}
          <div className="bg-card rounded-2xl border-2 border-brand-champagne-gold/40 p-6 sm:p-8 shadow-xl relative overflow-hidden space-y-6">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-champagne-gold/10 rounded-full blur-2xl pointer-events-none" />

            {/* Booking Code Banner */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-brand-dark-brown to-brand-charcoal text-white text-center space-y-1 shadow-md">
              <span className="text-[10px] uppercase font-bold tracking-widest text-brand-champagne-gold">
                Kode Reservasi Resmi
              </span>
              <div className="flex items-center justify-center gap-2">
                <span className="text-2xl sm:text-3xl font-bold font-mono tracking-wider">
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
                  {copiedCode ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                </button>
              </div>
            </div>

            {/* Ticket Details */}
            <div className="space-y-3 text-xs sm:text-sm border-t border-b border-border/80 py-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Nama Pelanggan:</span>
                <span className="font-bold text-foreground">{confirmedBooking.customerName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Layanan:</span>
                <span className="font-bold text-foreground">{confirmedBooking.serviceName}</span>
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
                <span className="text-muted-foreground">Total Estimasi Biaya:</span>
                <span className="font-bold text-foreground">{confirmedBooking.priceDisplay}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Status Reservasi:</span>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-emerald-500/20 text-emerald-800 px-2.5 py-0.5 rounded-full">
                  <Check size={12} /> Terkonfirmasi
                </span>
              </div>
            </div>

            {/* Important Notes */}
            <div className="p-3.5 rounded-xl bg-secondary/60 text-xs text-muted-foreground space-y-1">
              <p className="font-semibold text-foreground">📌 Petunjuk Kedatangan:</p>
              <p>• Harap hadir di salon 10 menit sebelum waktu janji temu.</p>
              <p>• Pembayaran dapat dilakukan langsung di kasir (Tunai, QRIS, atau Kartu Debit).</p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                variant="outline"
                className="w-full rounded-full text-xs font-semibold gap-2 min-h-[44px]"
                onClick={() => window.print()}
              >
                <Share2 size={14} />
                <span>Simpan / Cetak Bukti</span>
              </Button>

              <Button
                variant="gold"
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
                  <span>Petunjuk Arah Salon</span>
                </a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
