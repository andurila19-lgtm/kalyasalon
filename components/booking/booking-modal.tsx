"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { servicesData, serviceCategories } from "@/data/services";
import { useBooking } from "@/context/booking-context";
import { 
  bookingFormSchema, 
  BookingFormData, 
  formatIndonesianDate, 
  generateBookingWhatsAppUrl 
} from "@/lib/booking-schema";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  X, 
  ArrowLeft, 
  ArrowRight, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  MessageSquare, 
  AlertCircle,
  ExternalLink
} from "lucide-react";

const TIME_SLOTS = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
];

export function BookingModal() {
  const { 
    isOpen, 
    closeBooking, 
    step, 
    setStep, 
    selectedServiceId, 
    setSelectedServiceId, 
    selectedService,
    trackEvent 
  } = useBooking();

  const [whatsappRedirectUrl, setWhatsappRedirectUrl] = useState<string>("");

  // Get formatted today date (YYYY-MM-DD) for min date constraint
  const today = new Date().toISOString().split("T")[0];

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      serviceId: selectedServiceId || servicesData[0]?.id || "",
      name: "",
      phone: "",
      date: today,
      time: "10:00",
      notes: "",
    },
  });

  const formValues = watch();

  // Sync selected service with form state
  const handleServiceSelect = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    setValue("serviceId", serviceId, { shouldValidate: true });
    trackEvent("service_selected", { serviceId });
  };

  const handleNextFromStep1 = () => {
    if (!formValues.serviceId) {
      setValue("serviceId", selectedServiceId || servicesData[0]?.id || "", { shouldValidate: true });
    }
    setStep(2);
    trackEvent("booking_form_started");
  };

  const handleNextFromStep2 = () => {
    if (!formValues.name || formValues.name.trim().length < 2) {
      // Trigger validation for name
      setValue("name", formValues.name, { shouldValidate: true });
      return;
    }
    if (!formValues.phone || formValues.phone.trim().length < 9) {
      setValue("phone", formValues.phone, { shouldValidate: true });
      return;
    }
    setStep(3);
  };

  const handleNextFromStep3 = () => {
    if (!formValues.date) {
      setValue("date", today, { shouldValidate: true });
    }
    if (!formValues.time) {
      setValue("time", "10:00", { shouldValidate: true });
    }
    setStep(4);
    trackEvent("booking_reviewed", { 
      service: selectedService?.name, 
      date: formValues.date, 
      time: formValues.time 
    });
  };

  const onSubmit = (data: BookingFormData) => {
    const waUrl = generateBookingWhatsAppUrl(data, selectedService);
    setWhatsappRedirectUrl(waUrl);
    setStep(5);
    trackEvent("whatsapp_booking_clicked", { serviceId: data.serviceId });

    // Open WhatsApp in new tab
    if (typeof window !== "undefined") {
      window.open(waUrl, "_blank", "noopener,noreferrer");
    }
  };

  const handleModalClose = () => {
    closeBooking();
    setTimeout(() => {
      reset();
      setWhatsappRedirectUrl("");
    }, 300);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleModalClose()}>
      <DialogContent 
        className="max-w-2xl w-full p-0 overflow-hidden border-border bg-background shadow-2xl rounded-2xl sm:rounded-3xl flex flex-col max-h-[92vh]"
        aria-describedby="booking-modal-desc"
      >
        <DialogTitle className="sr-only">Formulir Booking Kalya Salon Madiun</DialogTitle>
        <DialogDescription id="booking-modal-desc" className="sr-only">
          Pilih layanan, waktu yang diinginkan, dan lanjutkan reservasi langsung via WhatsApp.
        </DialogDescription>

        {/* Modal Header */}
        <div className="px-5 sm:px-8 pt-6 pb-4 border-b border-border/80 bg-background/90 backdrop-blur-md flex items-center justify-between">
          <div className="space-y-0.5">
            <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-primary">
              <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />
              <span>Kalya Salon Booking</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold font-display text-foreground">
              {step === 1 && "Pilih Layanan Perawatan"}
              {step === 2 && "Data Diri Pelanggan"}
              {step === 3 && "Pilih Tanggal & Jam"}
              {step === 4 && "Konfirmasi Detail Booking"}
              {step === 5 && "Siap Terhubung ke WhatsApp"}
            </h2>
          </div>

          <button
            type="button"
            onClick={handleModalClose}
            aria-label="Tutup Dialog Booking"
            className="min-h-[44px] min-w-[44px] rounded-full bg-muted/80 hover:bg-muted text-foreground flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Bar */}
        {step < 5 && (
          <div className="px-5 sm:px-8 py-3 bg-secondary/50 border-b border-border/40 flex items-center justify-between text-xs">
            {[
              { num: 1, label: "Layanan" },
              { num: 2, label: "Data Diri" },
              { num: 3, label: "Jadwal" },
              { num: 4, label: "Review" },
            ].map((s) => (
              <div 
                key={s.num} 
                className={cn(
                  "flex items-center gap-1.5 transition-colors font-medium",
                  step === s.num 
                    ? "text-primary font-bold" 
                    : step > s.num 
                      ? "text-gold" 
                      : "text-muted-foreground/60"
                )}
              >
                <span className={cn(
                  "w-5 h-5 rounded-full text-[11px] flex items-center justify-center font-bold",
                  step === s.num 
                    ? "bg-primary text-primary-foreground" 
                    : step > s.num 
                      ? "bg-gold text-white" 
                      : "bg-muted text-muted-foreground"
                )}>
                  {step > s.num ? "✓" : s.num}
                </span>
                <span className="hidden sm:inline text-[11px] uppercase tracking-wider">{s.label}</span>
              </div>
            ))}
          </div>
        )}

        {/* Modal Scrollable Body */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-1 overflow-hidden">
          <div className="px-5 sm:px-8 py-5 overflow-y-auto flex-1 space-y-6">

            {/* STEP 1: CHOOSE SERVICE */}
            {step === 1 && (
              <div className="space-y-4">
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Pilih salah satu layanan yang ingin Anda nikmati di Kalya Salon Madiun:
                </p>

                <div className="space-y-2.5 max-h-[50vh] overflow-y-auto pr-1">
                  {servicesData.map((srv) => {
                    const isSelected = (formValues.serviceId || selectedServiceId) === srv.id;
                    const catMeta = serviceCategories.find((c) => c.id === srv.category);

                    return (
                      <div
                        key={srv.id}
                        onClick={() => handleServiceSelect(srv.id)}
                        className={cn(
                          "p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 text-left relative",
                          isSelected
                            ? "border-gold bg-secondary/80 shadow-xs"
                            : "border-border bg-card hover:border-gold/50"
                        )}
                      >
                        <div className="space-y-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-gold">
                              {catMeta?.name || srv.category}
                            </span>
                            {srv.featured && (
                              <span className="text-[9px] px-2 py-0.2 rounded-full bg-primary/10 text-primary font-bold">
                                Populer
                              </span>
                            )}
                          </div>
                          <h4 className="text-sm sm:text-base font-bold font-display text-foreground truncate">
                            {srv.name}
                          </h4>
                          <p className="text-xs text-muted-foreground line-clamp-1">
                            {srv.description}
                          </p>
                        </div>

                        <div className="text-right shrink-0 flex flex-col items-end gap-1">
                          <span className="text-xs sm:text-sm font-bold font-display text-primary whitespace-nowrap">
                            {srv.priceDisplay}
                          </span>
                          <div className={cn(
                            "w-5 h-5 rounded-full border flex items-center justify-center transition-colors",
                            isSelected ? "border-gold bg-gold text-white" : "border-border bg-background"
                          )}>
                            {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 2: CUSTOMER INFORMATION */}
            {step === 2 && (
              <div className="space-y-4">
                {selectedService && (
                  <div className="p-3.5 rounded-xl bg-secondary/60 border border-brand-blush-pink flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-gold uppercase font-bold tracking-wider block">Layanan Terpilih</span>
                      <span className="text-xs sm:text-sm font-bold text-foreground font-display">{selectedService.name}</span>
                    </div>
                    <span className="text-xs font-bold text-primary font-display">{selectedService.priceDisplay}</span>
                  </div>
                )}

                <div className="space-y-3 pt-2">
                  <div className="space-y-1">
                    <label htmlFor="name" className="text-xs font-bold text-foreground uppercase tracking-wider block">
                      Nama Lengkap <span className="text-destructive">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Contoh: Amanda Putri"
                      {...register("name")}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
                    />
                    {errors.name && (
                      <p className="text-xs text-destructive flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.name.message}</span>
                      </p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="phone" className="text-xs font-bold text-foreground uppercase tracking-wider block">
                      Nomor WhatsApp <span className="text-destructive">*</span>
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="Contoh: 081234567890"
                      {...register("phone")}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
                    />
                    {errors.phone && (
                      <p className="text-xs text-destructive flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.phone.message}</span>
                      </p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="notes" className="text-xs font-bold text-foreground uppercase tracking-wider block">
                      Catatan Tambahan <span className="text-muted-foreground font-normal lowercase">(opsional)</span>
                    </label>
                    <textarea
                      id="notes"
                      rows={2}
                      placeholder="Contoh: Rambut tebal sebahu, ingin konsultasi warna dulu."
                      {...register("notes")}
                      className="w-full px-4 py-2.5 rounded-xl border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: PREFERRED DATE & TIME */}
            {step === 3 && (
              <div className="space-y-5">
                <div className="space-y-2">
                  <label htmlFor="date" className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-gold" />
                    <span>Tanggal yang Diinginkan <span className="text-destructive">*</span></span>
                  </label>
                  <input
                    id="date"
                    type="date"
                    min={today}
                    {...register("date")}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 cursor-pointer"
                  />
                  {errors.date && (
                    <p className="text-xs text-destructive flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.date.message}</span>
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-gold" />
                    <span>Pilihan Jam Kedatangan (09:00 – 19:00 WIB) <span className="text-destructive">*</span></span>
                  </label>
                  
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                    {TIME_SLOTS.map((slot) => {
                      const isSelected = formValues.time === slot;
                      return (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setValue("time", slot, { shouldValidate: true })}
                          className={cn(
                            "py-2.5 px-2 rounded-xl text-xs font-bold border transition-all cursor-pointer text-center",
                            isSelected
                              ? "bg-primary text-primary-foreground border-primary shadow-xs"
                              : "bg-card text-foreground border-border hover:border-gold/60"
                          )}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                  {errors.time && (
                    <p className="text-xs text-destructive flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.time.message}</span>
                    </p>
                  )}
                </div>

                {/* Clear Disclaimer Note */}
                <div className="p-3.5 rounded-xl bg-brand-soft-pink/40 border border-brand-blush-pink text-xs text-muted-foreground leading-relaxed flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block shrink-0 mt-1.5" />
                  <span>
                    <strong>Catatan Penting:</strong> Jam dan tanggal yang Anda pilih merupakan <em>waktu yang diinginkan</em>. Ketersediaan slot akan dikonfirmasi langsung oleh staf Kalya Salon via WhatsApp.
                  </span>
                </div>
              </div>
            )}

            {/* STEP 4: REVIEW & CONFIRM */}
            {step === 4 && (
              <div className="space-y-5">
                <div className="p-5 rounded-2xl bg-card border border-border space-y-4 text-xs sm:text-sm shadow-xs">
                  <div className="flex items-center justify-between pb-3 border-b border-border">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-gold">Ringkasan Reservasi</span>
                    <span className="text-xs font-bold text-primary">Kalya Salon Madiun</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <span className="text-muted-foreground block text-[11px]">Nama Lengkap:</span>
                      <strong className="text-foreground text-sm font-semibold">{formValues.name || "-"}</strong>
                    </div>

                    <div>
                      <span className="text-muted-foreground block text-[11px]">Nomor WhatsApp:</span>
                      <strong className="text-foreground text-sm font-semibold">{formValues.phone || "-"}</strong>
                    </div>

                    <div>
                      <span className="text-muted-foreground block text-[11px]">Layanan:</span>
                      <strong className="text-foreground text-sm font-semibold">{selectedService?.name || formValues.serviceId}</strong>
                      <span className="text-primary block text-xs font-bold">{selectedService?.priceDisplay}</span>
                    </div>

                    <div>
                      <span className="text-muted-foreground block text-[11px]">Jadwal Diinginkan:</span>
                      <strong className="text-foreground text-sm font-semibold">
                        {formatIndonesianDate(formValues.date)}
                      </strong>
                      <span className="text-gold block text-xs font-bold">Pukul {formValues.time} WIB</span>
                    </div>
                  </div>

                  {formValues.notes && (
                    <div className="pt-2 border-t border-border/60">
                      <span className="text-muted-foreground block text-[11px]">Catatan:</span>
                      <p className="text-foreground italic mt-0.5">{formValues.notes}</p>
                    </div>
                  )}
                </div>

                {/* Important Booking Disclaimer Box */}
                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-foreground/80 leading-relaxed flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>
                    Booking <strong>belum dianggap terkonfirmasi</strong> sampai Anda menerima pesan konfirmasi ketersediaan dari tim Kalya Salon melalui WhatsApp.
                  </span>
                </div>
              </div>
            )}

            {/* STEP 5: SUCCESS STATE */}
            {step === 5 && (
              <div className="py-6 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-600 mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl font-bold font-display text-foreground">
                    Booking Request Siap Dikirim!
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
                    Anda sedang diarahkan ke WhatsApp resmi Kalya Salon untuk konfirmasi jadwal.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-secondary/70 border border-border text-xs text-muted-foreground max-w-sm mx-auto">
                  <span>Jika aplikasi WhatsApp tidak otomatis terbuka, silakan klik tombol di bawah ini:</span>
                </div>

                {whatsappRedirectUrl && (
                  <div className="pt-2">
                    <Button variant="gold" size="lg" asChild className="rounded-full shadow-md min-h-[48px] px-8 text-xs sm:text-sm font-bold">
                      <a href={whatsappRedirectUrl} target="_blank" rel="noopener noreferrer" className="gap-2">
                        <MessageSquare className="w-4 h-4" />
                        <span>Buka WhatsApp Sekarang</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </Button>
                  </div>
                )}
              </div>
            )}

          </div>

          {/* Modal Footer Controls */}
          {step < 5 && (
            <div className="px-5 sm:px-8 py-4 border-t border-border/80 bg-background/90 backdrop-blur-md flex items-center justify-between gap-3 pb-[max(1rem,env(safe-area-inset-bottom))]">
              {step > 1 ? (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setStep((step - 1) as 1 | 2 | 3 | 4 | 5)}
                  className="rounded-full min-h-[44px] px-4 gap-1.5 text-xs font-semibold"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Kembali</span>
                </Button>
              ) : (
                <div />
              )}

              {step === 1 && (
                <Button
                  type="button"
                  variant="gold"
                  size="default"
                  onClick={handleNextFromStep1}
                  className="rounded-full min-h-[44px] px-6 gap-2 text-xs sm:text-sm font-bold ml-auto"
                >
                  <span>Lanjut: Data Diri</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              )}

              {step === 2 && (
                <Button
                  type="button"
                  variant="gold"
                  size="default"
                  onClick={handleNextFromStep2}
                  className="rounded-full min-h-[44px] px-6 gap-2 text-xs sm:text-sm font-bold ml-auto"
                >
                  <span>Lanjut: Pilih Waktu</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              )}

              {step === 3 && (
                <Button
                  type="button"
                  variant="gold"
                  size="default"
                  onClick={handleNextFromStep3}
                  className="rounded-full min-h-[44px] px-6 gap-2 text-xs sm:text-sm font-bold ml-auto"
                >
                  <span>Lanjut: Konfirmasi</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              )}

              {step === 4 && (
                <Button
                  type="submit"
                  variant="gold"
                  size="default"
                  className="rounded-full min-h-[44px] px-6 gap-2 text-xs sm:text-sm font-bold ml-auto shadow-md"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Kirim ke WhatsApp</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              )}
            </div>
          )}

          {step === 5 && (
            <div className="px-5 sm:px-8 py-4 border-t border-border/80 bg-background/90 flex justify-center pb-[max(1rem,env(safe-area-inset-bottom))]">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleModalClose}
                className="rounded-full min-h-[40px] px-6 text-xs font-semibold"
              >
                <span>Tutup Jendela</span>
              </Button>
            </div>
          )}
        </form>

      </DialogContent>
    </Dialog>
  );
}
