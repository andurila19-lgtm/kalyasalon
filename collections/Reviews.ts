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
      type: "number",
      label: "Nilai Bintang (Rating 1 - 5)",
      min: 1,
      max: 5,
      defaultValue: 5,
      required: true,
      admin: {
        placeholder: "5",
        description: "Ketik angka rating bintang (misal: 5 untuk 5 bintang).",
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
