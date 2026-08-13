/**
 * Lightweight privacy-first Google Analytics 4 (GA4) abstraction.
 * Strictly prevents Personal Identifiable Information (PII) leakage.
 */

declare global {
  interface Window {
    gtag?: (
      command: "config" | "event" | "js" | "set",
      targetId: string | Date,
      config?: Record<string, unknown>
    ) => void;
    dataLayer?: unknown[];
  }
}

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || "";

export type AnalyticsEventName =
  | "page_view"
  | "booking_open"
  | "service_selected"
  | "booking_form_started"
  | "booking_reviewed"
  | "whatsapp_booking_clicked"
  | "phone_clicked"
  | "map_clicked"
  | "social_clicked";

/**
 * Dispatch analytics event to Google Analytics 4 (gtag) with privacy filters
 */
export function sendAnalyticsEvent(
  eventName: AnalyticsEventName,
  params?: Record<string, string | number | boolean | undefined>
) {
  if (typeof window === "undefined") return;

  // Filter out any undefined or accidental sensitive keys
  const safeParams: Record<string, string | number | boolean> = {};
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (
        value !== undefined &&
        !["name", "phone", "notes", "email", "address"].includes(key.toLowerCase())
      ) {
        safeParams[key] = value;
      }
    }
  }

  // Development logger
  if (process.env.NODE_ENV !== "production") {
    console.log(`[Kalya Analytics Event] ${eventName}:`, safeParams);
  }

  // Send to GA4 if initialized
  if (window.gtag && GA_MEASUREMENT_ID) {
    window.gtag("event", eventName, safeParams);
  }
}

export function trackBookingOpen(source?: string) {
  sendAnalyticsEvent("booking_open", { source: source || "general" });
}

export function trackServiceSelected(serviceId: string, serviceName?: string) {
  sendAnalyticsEvent("service_selected", { 
    service_id: serviceId, 
    service_name: serviceName || serviceId 
  });
}

export function trackBookingFormStarted() {
  sendAnalyticsEvent("booking_form_started");
}

export function trackBookingReviewed(serviceName?: string) {
  sendAnalyticsEvent("booking_reviewed", { service_name: serviceName });
}

export function trackWhatsAppBookingClick(serviceId?: string) {
  sendAnalyticsEvent("whatsapp_booking_clicked", { 
    service_id: serviceId || "unknown",
    conversion_type: "primary_booking"
  });
}

export function trackPhoneClick(source?: string) {
  sendAnalyticsEvent("phone_clicked", { 
    source: source || "location_section",
    conversion_type: "direct_call"
  });
}

export function trackMapClick(source?: string) {
  sendAnalyticsEvent("map_clicked", { 
    source: source || "location_section",
    conversion_type: "directions"
  });
}

export function trackSocialClick(platform: "instagram" | "tiktok", source?: string) {
  sendAnalyticsEvent("social_clicked", { 
    platform, 
    source: source || "social_section" 
  });
}
