import { Salon } from "@/types/salon";
import { 
  BUSINESS_NAME, 
  BUSINESS_DESCRIPTOR, 
  BUSINESS_CATEGORY, 
  PHONE_NUMBER, 
  WHATSAPP_NUMBER, 
  WHATSAPP_DISPLAY, 
  GOOGLE_MAPS_URL, 
  INSTAGRAM_URL, 
  INSTAGRAM_HANDLE, 
  TIKTOK_URL, 
  TIKTOK_HANDLE 
} from "@/lib/constants";

export const salonData: Salon = {
  name: BUSINESS_NAME,
  tagline: "Wujudkan Rambut Sehat, Anggun & Berkilau",
  descriptor: BUSINESS_DESCRIPTOR,
  category: BUSINESS_CATEGORY,
  rating: 4.8,
  reviewCount: 284,
  reviewCountDisplay: "284+",
  phone: PHONE_NUMBER,
  phoneDisplay: PHONE_NUMBER,
  whatsapp: WHATSAPP_NUMBER,
  whatsappDisplay: WHATSAPP_DISPLAY,
  address: {
    street: "Jl. Slamet Riyadi No.8",
    village: "Klegen",
    district: "Kec. Kartoharjo",
    city: "Kota Madiun",
    province: "Jawa Timur",
    postalCode: "63117",
    formatted: "Jl. Slamet Riyadi No.8, Klegen, Kec. Kartoharjo, Kota Madiun, Jawa Timur 63117",
  },
  openingHours: {
    days: "Setiap Hari (Senin – Minggu)",
    hours: "09:00 – 20:00 WIB",
    openTime: "09:00",
    closeTime: "20:00",
    schedule: [
      { day: "Monday", label: "Senin", open: "09:00", close: "20:00" },
      { day: "Tuesday", label: "Selasa", open: "09:00", close: "20:00" },
      { day: "Wednesday", label: "Rabu", open: "09:00", close: "20:00" },
      { day: "Thursday", label: "Kamis", open: "09:00", close: "20:00" },
      { day: "Friday", label: "Jumat", open: "09:00", close: "20:00" },
      { day: "Saturday", label: "Sabtu", open: "09:00", close: "20:00" },
      { day: "Sunday", label: "Minggu", open: "09:00", close: "20:00" },
    ],
  },
  socialLinks: {
    instagram: INSTAGRAM_URL,
    instagramHandle: INSTAGRAM_HANDLE,
    tiktok: TIKTOK_URL,
    tiktokHandle: TIKTOK_HANDLE,
  },
  mapsUrl: GOOGLE_MAPS_URL,
};
