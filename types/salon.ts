export interface OpeningHoursDay {
  day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
  label: string;
  open: string;
  close: string;
  closed?: boolean;
}

export interface OpeningHours {
  days: string;
  hours: string;
  openTime: string;
  closeTime: string;
  schedule: OpeningHoursDay[];
}

export interface SocialLinks {
  instagram: string;
  instagramHandle: string;
  tiktok: string;
  tiktokHandle: string;
}

export interface SalonAddress {
  street: string;
  village: string;
  district: string;
  city: string;
  province: string;
  postalCode: string;
  formatted: string;
}

export interface Salon {
  name: string;
  tagline: string;
  descriptor: string;
  category: string;
  rating: number;
  reviewCount: number;
  reviewCountDisplay: string;
  phone: string;
  phoneDisplay: string;
  whatsapp: string;
  whatsappDisplay: string;
  address: SalonAddress;
  openingHours: OpeningHours;
  socialLinks: SocialLinks;
  mapsUrl: string;
  googlePlaceId?: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  isExternal?: boolean;
}
