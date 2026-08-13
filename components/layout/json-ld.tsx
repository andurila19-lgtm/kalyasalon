import { salonData } from "@/data/salon";
import { siteConfig } from "@/config/site";

export function generateSalonJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    "@id": `${siteConfig.url}/#beautysalon`,
    "name": salonData.name,
    "description": siteConfig.description,
    "url": siteConfig.url,
    "telephone": salonData.phone,
    "priceRange": "$$",
    "image": `${siteConfig.url}/images/branding/og-image.jpg`,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": salonData.address.street,
      "addressLocality": salonData.address.city,
      "addressRegion": salonData.address.province,
      "postalCode": salonData.address.postalCode,
      "addressCountry": "ID",
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -7.6298,
      "longitude": 111.5305,
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "opens": "09:00",
        "closes": "20:00"
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": salonData.rating.toString(),
      "reviewCount": salonData.reviewCount.toString(),
      "bestRating": "5",
      "worstRating": "1"
    },
    "sameAs": [
      salonData.socialLinks.instagram,
      salonData.socialLinks.tiktok,
      salonData.mapsUrl
    ]
  };
}

export function JsonLd() {
  const jsonLd = generateSalonJsonLd();

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
