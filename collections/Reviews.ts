import { CollectionConfig } from "payload";

export const Reviews: CollectionConfig = {
  slug: "reviews",
  labels: {
    singular: "Ulasan Pelanggan",
    plural: "Daftar Ulasan & Testimoni",
  },
  admin: {
    useAsTitle: "customerName",
    group: "Galeri & Ulasan",
    defaultColumns: ["customerName", "rating", "serviceUsed", "date", "verified"],
    description: "Kelola ulasan kepuasan pelanggan yang diambil dari Google Maps atau testimoni langsung.",
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
      admin: {
        placeholder: "Contoh: Shafira Aulia",
        description: "Nama pelanggan yang memberikan ulasan.",
      },
    },
    {
      name: "rating",
      type: "select",
      label: "Nilai Bintang (Rating)",
      options: [
        { label: "⭐⭐⭐⭐⭐ (5 Bintang - Sangat Puas)", value: "5" },
        { label: "⭐⭐⭐⭐ (4 Bintang - Puas)", value: "4" },
        { label: "⭐⭐⭐ (3 Bintang - Cukup)", value: "3" },
      ],
      defaultValue: "5",
      required: true,
      admin: {
        description: "Pilih jumlah bintang penilaian dari pelanggan.",
      },
    },
    {
      name: "text",
      type: "textarea",
      label: "Isi Ulasan / Testimoni",
      required: true,
      admin: {
        placeholder: "Contoh: Suka banget potong di sini, hasilnya rapi sesuai request dan tempatnya nyaman banget...",
        description: "Salin isi komentar atau testimoni asli dari pelanggan.",
      },
    },
    {
      name: "serviceUsed",
      type: "text",
      label: "Layanan yang Diambil Pelanggan",
      admin: {
        placeholder: "Contoh: Scalp Detox & Signature Haircut",
        description: "Jenis perawatan yang dicoba oleh pelanggan (opsional tapi bagus untuk referensi pembaca).",
      },
    },
    {
      name: "date",
      type: "text",
      label: "Waktu Ulasan",
      defaultValue: "Baru saja",
      admin: {
        placeholder: "Contoh: 1 minggu yang lalu atau Agustus 2026",
        description: "Kapan ulasan ini diberikan (misal: '2 hari yang lalu' atau '1 bulan yang lalu').",
      },
    },
    {
      name: "verified",
      type: "checkbox",
      label: "Beri Tanda 'Terverifikasi Google Maps'?",
      defaultValue: true,
      admin: {
        description: "Centang untuk menampilkan lencana centang hijau 'Ulasan Asli Terverifikasi'.",
      },
    },
  ],
};
