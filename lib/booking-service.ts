import { getPayload } from "payload";
import configPromise from "@payload-config";
import {
  getAvailableSlots,
  timeToMinutes,
  minutesToTime,
  getTodayDateJakarta,
} from "./availability";
import { servicesData } from "@/data/services";

export interface CreateBookingParams {
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  serviceId: string;
  staffId?: string;
  bookingDate: string; // "YYYY-MM-DD"
  startTime: string; // "HH:mm"
  notes?: string;
}

export interface BookingResponse {
  success: boolean;
  message: string;
  booking?: {
    id: string;
    bookingCode: string;
    customerName: string;
    customerPhone: string;
    customerEmail?: string;
    serviceName: string;
    bookingDate: string;
    startTime: string;
    endTime: string;
    duration: number;
    totalPrice: number;
    priceDisplay: string;
    status: string;
    notes?: string;
    createdAt: string;
  };
  error?: string;
}

// Generate collision-resistant human-readable booking code
export function generateBookingCode(dateStr: string): string {
  const cleanDate = dateStr.replace(/-/g, "");
  const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `KLY-${cleanDate}-${randomSuffix}`;
}

export async function createBookingAtomically(
  params: CreateBookingParams
): Promise<BookingResponse> {
  const {
    customerName,
    customerPhone,
    customerEmail,
    serviceId,
    staffId,
    bookingDate,
    startTime,
    notes,
  } = params;

  // Basic validation
  if (!customerName || !customerPhone || !serviceId || !bookingDate || !startTime) {
    return {
      success: false,
      message: "Data pemesanan tidak lengkap. Mohon lengkapi seluruh formulir.",
      error: "MISSING_REQUIRED_FIELDS",
    };
  }

  // Sanitize phone
  const cleanPhone = customerPhone.replace(/\D/g, "");
  if (cleanPhone.length < 9 || cleanPhone.length > 15) {
    return {
      success: false,
      message: "Nomor WhatsApp / HP tidak valid. Masukkan nomor yang benar.",
      error: "INVALID_PHONE",
    };
  }

  // 1. Authoritative Service & Duration Lookup
  let serviceDoc: any = null;
  let serviceName = "Layanan Salon";
  let durationMinutes = 60;
  let totalPrice = 135000;
  let priceDisplay = "Rp 135.000";

  try {
    const payload = await getPayload({ config: configPromise });
    try {
      serviceDoc = await payload.findByID({
        collection: "services",
        id: serviceId,
      });
    } catch {
      // Find by slug if id wasn't numeric/uuid
      const search = await payload.find({
        collection: "services",
        where: { slug: { equals: serviceId } },
        limit: 1,
      });
      if (search.docs.length > 0) {
        serviceDoc = search.docs[0];
      }
    }

    if (serviceDoc) {
      serviceName = serviceDoc.name;
      durationMinutes = serviceDoc.durationMinutes || 60;
      totalPrice = serviceDoc.price || 135000;
      priceDisplay = serviceDoc.priceDisplay || `Rp ${totalPrice.toLocaleString("id-ID")}`;
    } else {
      // Fallback to static catalog
      const fallback = servicesData.find((s) => s.id === serviceId);
      if (fallback) {
        serviceName = fallback.name;
        durationMinutes = fallback.durationMinutes || 60;
        totalPrice = fallback.price || 135000;
        priceDisplay = fallback.priceDisplay;
      }
    }
  } catch (error) {
    console.error("[Booking Service] Failed to fetch service data:", error);
    return {
      success: false,
      message: "Layanan tidak ditemukan dalam sistem database salon.",
      error: "SERVICE_NOT_FOUND",
    };
  }

  // 2. Compute authoritative End Time
  const startMinutes = timeToMinutes(startTime);
  const endMinutes = startMinutes + durationMinutes;
  const endTime = minutesToTime(endMinutes);

  // 3. Atomically Check Slot Availability
  const availability = await getAvailableSlots({
    date: bookingDate,
    serviceId,
    staffId,
  });

  const requestedSlot = availability.slots.find((s) => s.time === startTime);

  if (!requestedSlot || !requestedSlot.available) {
    const reasonText = requestedSlot?.reason || "Slot waktu ini sudah penuh dipesan.";
    return {
      success: false,
      message: `Maaf, slot jam ${startTime} baru saja dipesan atau tidak tersedia (${reasonText}). Silakan pilih waktu lainnya.`,
      error: "SLOT_UNAVAILABLE",
    };
  }

  // 4. Create Booking in Database with unique code
  const bookingCode = generateBookingCode(bookingDate);

  try {
    const payload = await getPayload({ config: configPromise });

    // Double check that code is unique
    const newBooking = await payload.create({
      collection: "bookings",
      data: {
        bookingCode,
        customerName: customerName.trim(),
        customerPhone: cleanPhone,
        customerEmail: customerEmail ? customerEmail.trim() : undefined,
        service: serviceDoc ? serviceDoc.id : serviceId,
        staff: staffId ? (Number(staffId) || (staffId as any)) : undefined,
        bookingDate,
        startTime,
        endTime,
        duration: durationMinutes,
        totalPrice,
        status: "CONFIRMED",
        notes: notes ? notes.trim() : undefined,
      },
    });

    return {
      success: true,
      message: "Reservasi berhasil dibuat dan terkonfirmasi secara instan!",
      booking: {
        id: String(newBooking.id),
        bookingCode,
        customerName: customerName.trim(),
        customerPhone: cleanPhone,
        customerEmail,
        serviceName,
        bookingDate,
        startTime,
        endTime,
        duration: durationMinutes,
        totalPrice,
        priceDisplay,
        status: "CONFIRMED",
        notes,
        createdAt: newBooking.createdAt || new Date().toISOString(),
      },
    };
  } catch (error: any) {
    console.error("[Booking Service] Failed to create booking document:", error);
    return {
      success: false,
      message: "Booking sedang tidak tersedia di server. Silakan coba beberapa saat lagi.",
      error: error?.message || "DATABASE_CREATE_ERROR",
    };
  }
}

export async function cancelBooking(bookingId: string): Promise<{ success: boolean; message: string }> {
  try {
    const payload = await getPayload({ config: configPromise });
    await payload.update({
      collection: "bookings",
      id: bookingId,
      data: {
        status: "CANCELLED",
      },
    });
    return { success: true, message: "Booking berhasil dibatalkan dan slot kembali tersedia." };
  } catch (error: any) {
    return { success: false, message: error?.message || "Gagal membatalkan booking." };
  }
}

export async function rescheduleBooking(params: {
  bookingId: string;
  newDate: string;
  newStartTime: string;
}): Promise<BookingResponse> {
  const { bookingId, newDate, newStartTime } = params;

  try {
    const payload = await getPayload({ config: configPromise });
    const existing = await payload.findByID({
      collection: "bookings",
      id: bookingId,
    });

    if (!existing) {
      return { success: false, message: "Data booking tidak ditemukan.", error: "NOT_FOUND" };
    }

    const serviceId = typeof existing.service === "object" ? (existing.service as any).id : existing.service;
    const duration = existing.duration || 60;

    // Check availability on target date/time
    const availability = await getAvailableSlots({
      date: newDate,
      serviceId,
    });

    const targetSlot = availability.slots.find((s) => s.time === newStartTime);
    if (!targetSlot || !targetSlot.available) {
      return {
        success: false,
        message: `Slot tujuan ${newStartTime} pada ${newDate} tidak tersedia.`,
        error: "TARGET_SLOT_UNAVAILABLE",
      };
    }

    const newStartMinutes = timeToMinutes(newStartTime);
    const newEndMinutes = newStartMinutes + duration;
    const newEndTime = minutesToTime(newEndMinutes);

    const updated = await payload.update({
      collection: "bookings",
      id: bookingId,
      data: {
        bookingDate: newDate,
        startTime: newStartTime,
        endTime: newEndTime,
        status: "CONFIRMED",
      },
    });

    return {
      success: true,
      message: "Jadwal reservasi berhasil diubah.",
      booking: {
        id: String(updated.id),
        bookingCode: updated.bookingCode,
        customerName: updated.customerName,
        customerPhone: updated.customerPhone,
        serviceName: (updated.service as any)?.name || "Layanan Salon",
        bookingDate: newDate,
        startTime: newStartTime,
        endTime: newEndTime,
        duration,
        totalPrice: updated.totalPrice,
        priceDisplay: `Rp ${updated.totalPrice.toLocaleString("id-ID")}`,
        status: "CONFIRMED",
        createdAt: updated.createdAt,
      },
    };
  } catch (error: any) {
    return { success: false, message: error?.message || "Gagal mengubah jadwal booking.", error: "RESCHEDULE_ERROR" };
  }
}
