import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Kalya Salon Madiun",
    short_name: "Kalya Salon",
    description: "Hair Design & Treatment di Kota Madiun. Pengalaman salon premium, nyaman, dan berkelas.",
    start_url: "/",
    display: "standalone",
    background_color: "#FFFDFC",
    theme_color: "#FFFDFC",
    lang: "id-ID",
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
