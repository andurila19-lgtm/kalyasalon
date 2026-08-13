export type GalleryCategory = "haircut" | "treatment" | "coloring" | "interior" | "all";

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  category: GalleryCategory;
  title?: string;
  description?: string;
  featured: boolean;
  width?: number;
  height?: number;
}
