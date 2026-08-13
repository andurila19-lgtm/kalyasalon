import { GOOGLE_MAPS_URL, GOOGLE_MAPS_EMBED_URL } from "./constants";

/**
 * Get Google Maps direct navigation / listing URL
 */
export function getGoogleMapsUrl(): string {
  return GOOGLE_MAPS_URL;
}

/**
 * Get Google Maps embed iframe URL
 */
export function getGoogleMapsEmbedUrl(): string {
  return GOOGLE_MAPS_EMBED_URL;
}

/**
 * Generate Google Maps directions URL from current location
 */
export function getGoogleMapsDirectionsUrl(): string {
  const destination = encodeURIComponent("Kalya Salon, Jl. Slamet Riyadi No.8, Klegen, Kec. Kartoharjo, Kota Madiun, Jawa Timur 63117");
  return `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
}
