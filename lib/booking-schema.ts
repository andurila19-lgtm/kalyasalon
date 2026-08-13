import { z } from "zod";
import { Service } from "@/types/service";
import { createWhatsAppUrl } from "@/lib/whatsapp";

export const bookingFormSchema = z.object({
  serviceId: z.string({
    message: "Pilih layanan terlebih dahulu.",
  }).min(1, "Pilih layanan terlebih dahulu."),
  name: z.string({
    message: "Nama lengkap wajib diisi.",
  }).min(2, "Nama minimal terdiri dari 2 karakter."),
  phone: z.string({
    message: "Nomor WhatsApp wajib diisi.",
  }).min(9, "Nomor WhatsApp minimal 9 digit.")
    .regex(/^[0-9+() -]+$/, "Format nomor telepon tidak valid."),
  date: z.string({
    message: "Pilih tanggal yang diinginkan.",
  }).min(1, "Pilih tanggal yang diinginkan."),
  time: z.string({
    message: "Pilih jam yang diinginkan.",
  }).min(1, "Pilih jam yang diinginkan."),
  notes: z.string().optional(),
});

export type BookingFormData = z.infer<typeof bookingFormSchema>;

/**
 * Format date string (YYYY-MM-DD) into Indonesian localized string
 */
export function formatIndonesianDate(dateStr: string): string {
  if (!dateStr) return "";
  try {
    const [year, month, day] = dateStr.split("-").map(Number);
    if (!year || !month || !day) return dateStr;
    const dateObj = new Date(year, month - 1, day);
    return dateObj.toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

/**
 * Generate formatted WhatsApp message and click-to-chat URL from booking data
 */
export function generateBookingWhatsAppUrl(data: BookingFormData, selectedService?: Service): string {
  const formattedDate = formatIndonesianDate(data.date);
  const serviceTitle = selectedService ? selectedService.name : data.serviceId;
  const servicePrice = selectedService?.priceDisplay ? ` (${selectedService.priceDisplay})` : "";
  const notesText = data.notes && data.notes.trim() !== "" ? data.notes.trim() : "-";

  const message = [
    "Halo Kalya Salon 👋",
    "",
    "Saya ingin melakukan booking appointment di Kalya Salon Madiun.",
    "",
    "DETAIL BOOKING:",
    `• Nama: ${data.name}`,
    `• WhatsApp: ${data.phone}`,
    `• Layanan: ${serviceTitle}${servicePrice}`,
    `• Tanggal yang Diinginkan: ${formattedDate}`,
    `• Jam yang Diinginkan: ${data.time} WIB`,
    `• Catatan Tambahan: ${notesText}`,
    "",
    "Mohon informasi dan konfirmasi ketersediaan slotnya. Terima kasih! 🙏",
  ].join("\n");

  return createWhatsAppUrl(message);
}
