export type ServiceCategory = 
  | "hair-design" 
  | "hair-treatment" 
  | "hair-coloring" 
  | "hair-styling" 
  | "spa-package";

export interface ServiceCategoryMeta {
  id: ServiceCategory;
  name: string;
  description: string;
}

export interface Service {
  id: string;
  name: string;
  category: ServiceCategory;
  description: string;
  price: number | null;
  priceDisplay: string;
  priceLabel?: string;
  durationMinutes?: number;
  featured: boolean;
  image?: string;
  bookingMessage: string;
}
