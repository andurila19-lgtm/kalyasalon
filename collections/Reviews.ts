import { CollectionConfig } from "payload";

export const Reviews: CollectionConfig = {
  slug: "reviews",
  admin: {
    useAsTitle: "customerName",
    group: "Galeri & Ulasan",
    defaultColumns: ["customerName", "rating", "serviceUsed", "verified"],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "customerName",
      type: "text",
      label: "Nama Pelanggan",
      required: true,
    },
    {
      name: "rating",
      type: "number",
      label: "Rating Bintang (1 - 5)",
      min: 1,
      max: 5,
      defaultValue: 5,
      required: true,
    },
    {
      name: "text",
      type: "textarea",
      label: "Isi Ulasan",
      required: true,
    },
    {
      name: "serviceUsed",
      type: "text",
      label: "Layanan yang Digunakan (Contoh: Scalp Detox & Hair Spa)",
    },
    {
      name: "date",
      type: "text",
      label: "Waktu Ulasan (Contoh: 2 minggu yang lalu)",
    },
    {
      name: "verified",
      type: "checkbox",
      label: "Terverifikasi dari Google Maps?",
      defaultValue: true,
    },
  ],
};
