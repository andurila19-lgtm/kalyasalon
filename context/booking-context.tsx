"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { servicesData } from "@/data/services";
import { Service } from "@/types/service";
import { 
  trackBookingOpen, 
  trackServiceSelected, 
  trackBookingFormStarted, 
  trackBookingReviewed, 
  trackWhatsAppBookingClick,
  AnalyticsEventName 
} from "@/lib/analytics";

export type BookingStep = 1 | 2 | 3 | 4 | 5;

interface BookingContextType {
  isOpen: boolean;
  step: BookingStep;
  selectedServiceId: string;
  selectedService?: Service;
  openBooking: (serviceId?: string, source?: string) => void;
  closeBooking: () => void;
  setStep: (step: BookingStep) => void;
  setSelectedServiceId: (id: string) => void;
  trackEvent: (eventName: AnalyticsEventName, data?: Record<string, string | number | boolean | undefined>) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<BookingStep>(1);
  const [selectedServiceId, setSelectedServiceId] = useState<string>(servicesData[0]?.id || "");

  const selectedService = servicesData.find((s) => s.id === selectedServiceId);

  const trackEvent = useCallback((eventName: AnalyticsEventName, data?: Record<string, string | number | boolean | undefined>) => {
    switch (eventName) {
      case "booking_open":
        trackBookingOpen(typeof data?.source === "string" ? data.source : undefined);
        break;
      case "service_selected":
        if (typeof data?.serviceId === "string") {
          trackServiceSelected(data.serviceId, typeof data?.serviceName === "string" ? data.serviceName : undefined);
        }
        break;
      case "booking_form_started":
        trackBookingFormStarted();
        break;
      case "booking_reviewed":
        trackBookingReviewed(typeof data?.service_name === "string" ? data.service_name : undefined);
        break;
      case "whatsapp_booking_clicked":
        trackWhatsAppBookingClick(typeof data?.serviceId === "string" ? data.serviceId : undefined);
        break;
    }
  }, []);

  const openBooking = useCallback((serviceId?: string, source?: string) => {
    if (serviceId) {
      const exists = servicesData.some((s) => s.id === serviceId);
      if (exists) {
        setSelectedServiceId(serviceId);
      }
    }
    setStep(1);
    setIsOpen(true);
    trackEvent("booking_open", { source: source || "general" });
  }, [trackEvent]);

  const closeBooking = useCallback(() => {
    setIsOpen(false);
    setTimeout(() => {
      setStep(1);
    }, 300);
  }, []);

  return (
    <BookingContext.Provider
      value={{
        isOpen,
        step,
        selectedServiceId,
        selectedService,
        openBooking,
        closeBooking,
        setStep,
        setSelectedServiceId,
        trackEvent,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
}
