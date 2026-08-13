import { 
  BUSINESS_NAME, 
  BUSINESS_DESCRIPTOR, 
  BUSINESS_LOCATION, 
  SITE_URL, 
  DEFAULT_LOCALE,
  DEFAULT_LANG,
  WHATSAPP_DISPLAY,
  INSTAGRAM_HANDLE
} from "@/lib/constants";
import { salonData } from "@/data/salon";

export const siteConfig = {
  name: BUSINESS_NAME,
  descriptor: BUSINESS_DESCRIPTOR,
  title: "Kalya Salon Madiun – Hair Design & Treatment",
  titleTemplate: `%s | ${BUSINESS_NAME}`,
  description: "Kalya Salon Madiun adalah salon rambut & kecantikan premium di Kota Madiun. Layanan Hair Design, Treatment, Balayage, Keratin, dan Hair Spa dengan suasana nyaman.",
  url: SITE_URL,
  locale: DEFAULT_LOCALE,
  lang: DEFAULT_LANG,
  location: BUSINESS_LOCATION,
  keywords: [
    "Kalya Salon",
    "Kalya Salon Madiun",
    "Salon Madiun",
    "Salon Rambut Madiun",
    "Salon Kecantikan Madiun",
    "Hair Design Madiun",
    "Hair Treatment Madiun",
    "Hair Spa Madiun",
    "Creambath Madiun",
    "Hair Coloring Madiun",
    "Balayage Madiun",
    "Keratin Treatment Madiun",
    "Smoothing Rambut Madiun",
    "Salon Kartoharjo",
  ],
  creator: BUSINESS_NAME,
  contact: {
    whatsapp: WHATSAPP_DISPLAY,
    instagram: INSTAGRAM_HANDLE,
  },
  business: salonData,
  openGraph: {
    type: "website",
    locale: DEFAULT_LOCALE,
    url: SITE_URL,
    siteName: BUSINESS_NAME,
    images: [
      {
        url: `${SITE_URL}/images/branding/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: `${BUSINESS_NAME} – ${BUSINESS_DESCRIPTOR} Madiun`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${BUSINESS_NAME} – ${BUSINESS_DESCRIPTOR} Madiun`,
    description: `${BUSINESS_NAME} – Hair Design & Treatment di Kota Madiun.`,
    images: [`${SITE_URL}/images/branding/og-image.jpg`],
  },
};

export type SiteConfig = typeof siteConfig;
