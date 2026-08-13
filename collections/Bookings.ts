import { CollectionConfig } from "payload";

export const Bookings: CollectionConfig = {
  slug: "bookings",
  labels: {
    singular: "Data Reservasi",
    plural: "Daftar Reservasi Booking",
  },
  admin: {
    useAsTitle: "bookingCode",
    group: "Manajemen Booking",
    defaultColumns: ["bookingCode", "customerName", "service", "bookingDate", "startTime", "endTime", "status"],
    description: "Seluruh data reservasi janji temu pelanggan Kalya Salon.",
  },
  access: {
    read: () => true,
    create: () => true, // Allowed for public booking creation
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: "bookingCode",
      type: "text",
      label: "Kode Reservasi Unik",
      required: true,
      unique: true,
      index: true,
      admin: {
        placeholder: "KLY-20260814-001",
        description: "Kode unik tanda bukti booking pelanggan.",
      },
    },
    {
      name: "customerName",
      type: "text",
      label: "Nama Pelanggan",
      required: true,
    },
    {
      name: "customerPhone",
      type: "text",
      label: "Nomor WhatsApp / HP",
      required: true,
    },
    {
      name: "customerEmail",
      type: "email",
      label: "Email Pelanggan (Opsional)",
    },
    {
      name: "service",
      type: "relationship",
      relationTo: "services",
      label: "Layanan yang Dipesan",
      required: true,
      index: true,
    },
    {
      name: "staff",
      type: "relationship",
      relationTo: "staff",
      label: "Stylist yang Ditugaskan (Opsional)",
      index: true,
    },
    {
      name: "bookingDate",
      type: "text",
      label: "Tanggal Reservasi (YYYY-MM-DD)",
      required: true,
      index: true,
    },
    {
      name: "startTime",
      type: "text",
      label: "Jam Mulai (HH:mm)",
      required: true,
      index: true,
    },
    {
      name: "endTime",
      type: "text",
      label: "Jam Selesai (HH:mm)",
      required: true,
    },
    {
      name: "duration",
      type: "number",
      label: "Durasi Perawatan (Menit)",
      required: true,
    },
    {
      name: "totalPrice",
      type: "number",
      label: "Total Biaya Layanan (Rp)",
      required: true,
    },
    {
      name: "status",
      type: "select",
      label: "Status Booking",
      options: [
        { label: "✅ CONFIRMED (Terkonfirmasi Aktif)", value: "CONFIRMED" },
        { label: "⏳ PENDING (Menunggu Konfirmasi)", value: "PENDING" },
        { label: "🎉 COMPLETED (Selesai Dilayani)", value: "COMPLETED" },
        { label: "❌ CANCELLED (Dibatalkan)", value: "CANCELLED" },
        { label: "⚠️ NO_SHOW (Pelanggan Tidak Hadir)", value: "NO_SHOW" },
      ],
      defaultValue: "CONFIRMED",
      required: true,
      index: true,
    },
    {
      name: "notes",
      type: "textarea",
      label: "Catatan Khusus Pelanggan",
      admin: {
        placeholder: "Contoh: Rambut tebal sebahu, ingin konsultasi warna lebih dulu...",
      },
    },
  ],
};
