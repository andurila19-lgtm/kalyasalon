import { CollectionConfig } from "payload";

export const Services: CollectionConfig = {
  slug: "services",
  admin: {
    useAsTitle: "name",
    group: "Katalog Salon",
    defaultColumns: ["name", "category", "priceDisplay", "durationMinutes", "featured"],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "name",
      type: "text",
      label: "Nama Layanan",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      label: "URL Slug (Contoh: scalp-detox-spa)",
      required: true,
      unique: true,
    },
    {
      name: "category",
      type: "relationship",
      relationTo: "categories",
      label: "Kategori Layanan",
      required: true,
    },
    {
      name: "price",
      type: "number",
      label: "Harga Angka (Rp)",
      required: true,
    },
    {
      name: "priceDisplay",
      type: "text",
      label: "Label Harga Display (Contoh: Rp 135.000 atau Mulai Rp 350.000)",
      required: true,
    },
    {
      name: "durationMinutes",
      type: "number",
      label: "Estimasi Durasi (Menit)",
      defaultValue: 60,
      required: true,
    },
    {
      name: "description",
      type: "textarea",
      label: "Deskripsi Lengkap Perawatan",
      required: true,
    },
    {
      name: "featured",
      type: "checkbox",
      label: "Tampilkan di Beranda (Populer / Most Loved)?",
      defaultValue: false,
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      label: "Foto Ilustrasi Layanan",
    },
  ],
};
