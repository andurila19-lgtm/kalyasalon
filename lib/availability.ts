import { getPayload } from "payload";
import configPromise from "@payload-config";
import { servicesData } from "@/data/services";
import {
  TimeSlot,
  AvailabilityResult,
  timeToMinutes,
  minutesToTime,
  getNowInJakarta,
  getTodayDateJakarta,
  isIntervalOverlapping,
} from "./booking-types";

export * from "./booking-types";

export async function getAvailableSlots(params: {
  date: string; // "YYYY-MM-DD"
  serviceId: string;
  staffId?: string;
}): Promise<AvailabilityResult> {
  const { date, serviceId, staffId } = params;

  // 1. Authoritative Service Lookup
  let serviceName = "Treatment Salon";
  let durationMinutes = 60;
  let price = 135000;
  let priceDisplay = "Rp 135.000";

  try {
    const payload = await getPayload({ config: configPromise });
    let serviceDoc: any = null;

    // Try numeric ID first
    if (!isNaN(Number(serviceId))) {
      try {
        serviceDoc = await payload.findByID({
          collection: "services",
          id: serviceId,
        });
      } catch {
        // Not a valid numeric ID
      }
    }

    // Try slug lookup
    if (!serviceDoc) {
      const search = await payload.find({
        collection: "services",
        where: { slug: { equals: serviceId } },
        limit: 1,
      });
      if (search.docs.length > 0) {
        serviceDoc = search.docs[0];
      }
    }

    // Try name match via static data
    if (!serviceDoc) {
      const fallbackStatic = servicesData.find((s) => s.id === serviceId);
      if (fallbackStatic) {
        const search = await payload.find({
          collection: "services",
          where: { name: { equals: fallbackStatic.name } },
          limit: 1,
        });
        if (search.docs.length > 0) {
          serviceDoc = search.docs[0];
        }
      }
    }

    if (serviceDoc) {
      serviceName = (serviceDoc as any).name || serviceName;
      durationMinutes = (serviceDoc as any).durationMinutes || durationMinutes;
      price = (serviceDoc as any).price || price;
      priceDisplay = (serviceDoc as any).priceDisplay || `Rp ${price.toLocaleString("id-ID")}`;
    }
  } catch {
    // Fallback to static servicesData if DB is starting up
    const fallback = servicesData.find((s) => s.id === serviceId);
    if (fallback) {
      serviceName = fallback.name;
      durationMinutes = fallback.durationMinutes || 60;
      price = fallback.price || 135000;
      priceDisplay = fallback.priceDisplay;
    }
  }

  // 2. Salon Operating Settings
  let openingTimeStr = "09:00";
  let closingTimeStr = "20:00";
  let maxCapacity = 3; // Default 3 concurrent chairs/stylists
  let slotIntervalMinutes = 60;
  let sameDayLeadTimeMinutes = 30;

  try {
    const payload = await getPayload({ config: configPromise });
    const settings = await payload.find({
      collection: "salon-settings",
      limit: 1,
    });
    if (settings.docs.length > 0) {
      const doc: any = settings.docs[0];
      openingTimeStr = doc.openingTime || openingTimeStr;
      closingTimeStr = doc.closingTime || closingTimeStr;
      maxCapacity = doc.maxConcurrentCapacity || maxCapacity;
      slotIntervalMinutes = doc.slotIntervalMinutes || slotIntervalMinutes;
      sameDayLeadTimeMinutes = doc.sameDayLeadTimeMinutes ?? sameDayLeadTimeMinutes;
    }
  } catch {
    // Default settings preserved
  }

  const openMinutes = timeToMinutes(openingTimeStr);
  const closeMinutes = timeToMinutes(closingTimeStr);

  // 3. Fetch Existing Bookings for Date (Excluding CANCELLED)
  let activeBookings: Array<{ start: number; end: number; staffId?: string }> = [];
  let blockedIntervals: Array<{ start: number; end: number; reason: string; staffId?: string }> = [];

  try {
    const payload = await getPayload({ config: configPromise });

    // Query active bookings for date
    const bookingsResult = await payload.find({
      collection: "bookings",
      where: {
        and: [
          { bookingDate: { equals: date } },
          { status: { not_equals: "CANCELLED" } },
        ],
      },
      limit: 100,
    });

    activeBookings = bookingsResult.docs.map((doc: any) => ({
      start: timeToMinutes(doc.startTime),
      end: timeToMinutes(doc.endTime),
      staffId: typeof doc.staff === "object" ? doc.staff?.id : doc.staff,
    }));

    // Query active blocked times for date
    const blockedResult = await payload.find({
      collection: "blocked-times",
      where: {
        and: [
          { date: { equals: date } },
          { active: { equals: true } },
        ],
      },
      limit: 50,
    });

    blockedIntervals = blockedResult.docs.map((doc: any) => ({
      start: timeToMinutes(doc.startTime),
      end: timeToMinutes(doc.endTime),
      reason: doc.reason || "Waktu Diblokir",
      staffId: typeof doc.staff === "object" ? doc.staff?.id : doc.staff,
    }));
  } catch (error) {
    console.error("[Availability Engine] Database query error:", error);
  }

  // 4. Timezone & Past Date/Time Evaluation
  const todayDateStr = getTodayDateJakarta();
  const jakartaNow = getNowInJakarta();
  const currentMinutesToday = jakartaNow.getHours() * 60 + jakartaNow.getMinutes();
  const isPastDate = date < todayDateStr;
  const isToday = date === todayDateStr;

  // 5. Generate Candidate Slots
  const slots: TimeSlot[] = [];

  for (let start = openMinutes; start < closeMinutes; start += slotIntervalMinutes) {
    const end = start + durationMinutes;
    const timeStr = minutesToTime(start);
    const endTimeStr = minutesToTime(end);

    // Rule: complete duration must fit inside closing time
    if (end > closeMinutes) {
      slots.push({
        time: timeStr,
        endTime: endTimeStr,
        durationMinutes,
        available: false,
        status: "OUTSIDE_HOURS",
        reason: `Melebihi jam tutup salon (${closingTimeStr} WIB)`,
        capacityRemaining: 0,
        totalCapacity: maxCapacity,
      });
      continue;
    }

    // Rule: cannot book past dates
    if (isPastDate) {
      slots.push({
        time: timeStr,
        endTime: endTimeStr,
        durationMinutes,
        available: false,
        status: "PAST",
        reason: "Waktu telah berlalu",
        capacityRemaining: 0,
        totalCapacity: maxCapacity,
      });
      continue;
    }

    // Rule: cannot book past hours on same day (+ lead time)
    if (isToday && start <= currentMinutesToday + sameDayLeadTimeMinutes) {
      slots.push({
        time: timeStr,
        endTime: endTimeStr,
        durationMinutes,
        available: false,
        status: "PAST",
        reason: "Waktu telah lewat / persiapan minimum",
        capacityRemaining: 0,
        totalCapacity: maxCapacity,
      });
      continue;
    }

    // Rule: check blocked times overlap
    const matchingBlock = blockedIntervals.find((block) => {
      const staffMatches = !staffId || !block.staffId || block.staffId === staffId;
      return staffMatches && isIntervalOverlapping(start, end, block.start, block.end);
    });

    if (matchingBlock) {
      slots.push({
        time: timeStr,
        endTime: endTimeStr,
        durationMinutes,
        available: false,
        status: "BLOCKED",
        reason: matchingBlock.reason,
        capacityRemaining: 0,
        totalCapacity: maxCapacity,
      });
      continue;
    }

    // Rule: count overlapping active bookings
    const overlappingBookings = activeBookings.filter((booking) => {
      const staffMatches = !staffId || !booking.staffId || booking.staffId === staffId;
      return staffMatches && isIntervalOverlapping(start, end, booking.start, booking.end);
    });

    const bookedCount = overlappingBookings.length;
    const capacityRemaining = Math.max(0, maxCapacity - bookedCount);

    if (capacityRemaining <= 0) {
      slots.push({
        time: timeStr,
        endTime: endTimeStr,
        durationMinutes,
        available: false,
        status: "BOOKED",
        reason: "Slot sudah penuh dipesan",
        capacityRemaining: 0,
        totalCapacity: maxCapacity,
      });
    } else {
      slots.push({
        time: timeStr,
        endTime: endTimeStr,
        durationMinutes,
        available: true,
        status: "AVAILABLE",
        capacityRemaining,
        totalCapacity: maxCapacity,
      });
    }
  }

  const availableSlotsCount = slots.filter((s) => s.available).length;

  return {
    date,
    serviceId,
    serviceName,
    durationMinutes,
    price,
    priceDisplay,
    operatingHours: {
      open: openingTimeStr,
      close: closingTimeStr,
    },
    slots,
    isFullyBooked: availableSlotsCount === 0,
  };
}
