import { CollectionConfig } from "payload";

export const SalonSettings: CollectionConfig = {
  slug: "salon-settings",
  labels: {
    singular: "Pengaturan Reservasi Salon",
    plural: "Pengaturan Reservasi Salon",
  },
  admin: {
    useAsTitle: "salonName",
    group: "Pengaturan & Akun",
    description: "Atur jam operasional, kapasitas kursi bersamaan, dan interval reservasi salon.",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "salonName",
      type: "text",
      label: "Nama Salon",
      defaultValue: "Kalya Salon Madiun",
      required: true,
    },
    {
      name: "openingTime",
      type: "text",
      label: "Jam Buka Operasional (HH:mm)",
      defaultValue: "09:00",
      required: true,
    },
    {
      name: "closingTime",
      type: "text",
      label: "Jam Tutup Operasional (HH:mm)",
      defaultValue: "20:00",
      required: true,
    },
    {
      name: "maxConcurrentCapacity",
      type: "number",
      label: "Kapasitas Kursi Reservasi Bersamaan (Default Kursi)",
      defaultValue: 3,
      required: true,
      admin: {
        description: "Jumlah maksimal pelanggan yang bisa dilayani di jam yang sama.",
      },
    },
    {
      name: "slotIntervalMinutes",
      type: "number",
      label: "Interval Slot Jam (Menit)",
      defaultValue: 60,
      required: true,
    },
    {
      name: "sameDayLeadTimeMinutes",
      type: "number",
      label: "Waktu Persiapan Minimal Booking Hari Ini (Menit)",
      defaultValue: 30,
      admin: {
        description: "Jeda waktu minimal sebelum jam yang dipesan (misal 30 menit ke depan).",
      },
    },
    {
      name: "contactPhone",
      type: "text",
      label: "Nomor WhatsApp Konfirmasi",
      defaultValue: "083845494574",
    },
  ],
};
