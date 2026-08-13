import { CollectionConfig } from "payload";

export const BlockedTimes: CollectionConfig = {
  slug: "blocked-times",
  labels: {
    singular: "Waktu Terblokir / Libur",
    plural: "Jadwal Blokir Waktu",
  },
  admin: {
    useAsTitle: "reason",
    group: "Manajemen Booking",
    defaultColumns: ["date", "startTime", "endTime", "reason", "active"],
    description: "Blokir jam atau tanggal tertentu agar tidak bisa dipesan pelanggan (misal: Maintenance, Istirahat, Acara Khusus).",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "date",
      type: "text",
      label: "Tanggal yang Diblokir (YYYY-MM-DD)",
      required: true,
      index: true,
      admin: {
        placeholder: "Contoh: 2026-08-14",
        description: "Format tanggal tahun-bulan-hari.",
      },
    },
    {
      name: "startTime",
      type: "text",
      label: "Jam Mulai (HH:mm)",
      required: true,
      admin: {
        placeholder: "Contoh: 12:00",
      },
    },
    {
      name: "endTime",
      type: "text",
      label: "Jam Selesai (HH:mm)",
      required: true,
      admin: {
        placeholder: "Contoh: 13:00",
      },
    },
    {
      name: "reason",
      type: "text",
      label: "Alasan Pemblokiran Waktu",
      required: true,
      admin: {
        placeholder: "Contoh: Istirahat Siang / Perbaikan Kursi Salon / Rapat Internal",
      },
    },
    {
      name: "staff",
      type: "relationship",
      relationTo: "staff",
      label: "Khusus untuk Staf Tertentu (Opsional)",
      admin: {
        description: "Kosongkan jika blokir berlaku untuk seluruh salon.",
      },
    },
    {
      name: "active",
      type: "checkbox",
      label: "Blokir Aktif?",
      defaultValue: true,
    },
  ],
};
