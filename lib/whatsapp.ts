import { WHATSAPP_NUMBER } from "./constants";

/**
 * Generate standard WhatsApp click-to-chat URL with properly encoded message.
 * Returns "#" gracefully if the phone number is missing or invalid.
 */
export function createWhatsAppUrl(message?: string, phoneNumber: string = WHATSAPP_NUMBER): string {
  const cleanNumber = phoneNumber.replace(/[^0-9]/g, "");
  if (!cleanNumber) return "#";

  if (!message || message.trim() === "") {
    return `https://wa.me/${cleanNumber}`;
  }
  const encodedMessage = encodeURIComponent(message.trim());
  return `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
}

/**
 * Generate a professional salon appointment booking message & URL.
 * Primary CTA: "BOOK APPOINTMENT"
 */
export function createBookingUrl(serviceName?: string): string {
  let message = `Halo Kalya Salon 👋\n\nSaya ingin melakukan booking di Kalya Salon.\n`;

  if (serviceName) {
    message += `\nLayanan: *${serviceName}*\n`;
  } else {
    message += `\nLayanan: \n`;
  }

  message += `Nama: \nTanggal: \nJam: \n\nMohon informasi ketersediaannya.\nTerima kasih 🙏`;

  return createWhatsAppUrl(message);
}

/**
 * Generate a service-specific contextual booking message & URL.
 * Used on service cards: "BOOK THIS SERVICE"
 */
export function createServiceBookingUrl(serviceName: string): string {
  const message = `Halo Kalya Salon 👋\n\nSaya tertarik dengan layanan:\n\n*${serviceName}*\n\nSaya ingin melakukan booking.\n\nNama: \nTanggal: \nJam: \n\nApakah tersedia?\nTerima kasih 🙏`;

  return createWhatsAppUrl(message);
}

/**
 * Generate a general consultation or inquiry WhatsApp URL.
 * Secondary CTA: "CHAT VIA WHATSAPP"
 */
export function createConsultationUrl(topic?: string): string {
  const message = topic
    ? `Halo Kalya Salon 👋\n\nSaya ingin konsultasi mengenai *${topic}*.\n\nMohon bantuannya. Terima kasih!`
    : "Halo Kalya Salon 👋\n\nSaya ingin konsultasi mengenai perawatan rambut.\n\nMohon bantuannya. Terima kasih!";
  return createWhatsAppUrl(message);
}
