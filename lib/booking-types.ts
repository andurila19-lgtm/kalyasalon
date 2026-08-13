export interface TimeSlot {
  time: string; // "09:00"
  endTime: string; // "10:30"
  durationMinutes: number;
  available: boolean;
  status: "AVAILABLE" | "BOOKED" | "BLOCKED" | "PAST" | "OUTSIDE_HOURS";
  reason?: string;
  capacityRemaining: number;
  totalCapacity: number;
}

export interface AvailabilityResult {
  date: string;
  serviceId: string;
  serviceName: string;
  durationMinutes: number;
  price: number;
  priceDisplay: string;
  operatingHours: {
    open: string;
    close: string;
  };
  slots: TimeSlot[];
  isFullyBooked: boolean;
}

// Convert "HH:mm" string to minutes from midnight
export function timeToMinutes(timeStr: string): number {
  const [hours, minutes] = timeStr.split(":").map(Number);
  return (hours || 0) * 60 + (minutes || 0);
}

// Convert minutes from midnight back to "HH:mm" string
export function minutesToTime(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
}

// Format date to YYYY-MM-DD in Asia/Jakarta timezone
export function getNowInJakarta(): Date {
  const now = new Date();
  const jakartaString = now.toLocaleString("en-US", { timeZone: "Asia/Jakarta" });
  return new Date(jakartaString);
}

export function getTodayDateJakarta(): string {
  const jakartaNow = getNowInJakarta();
  const year = jakartaNow.getFullYear();
  const month = (jakartaNow.getMonth() + 1).toString().padStart(2, "0");
  const day = jakartaNow.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// Check interval overlap: existing.start < requested.end && existing.end > requested.start
export function isIntervalOverlapping(
  startA: number,
  endA: number,
  startB: number,
  endB: number
): boolean {
  return startA < endB && endA > startB;
}
