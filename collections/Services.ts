import { CollectionConfig } from "payload";
import { slugify, formatRupiah } from "../lib/utils";

export const Services: CollectionConfig = {
  slug: "services",
  labels: {
    singular: "Menu Layanan",
    plural: "Daftar Layanan Salon",
  },
  admin: {
    useAsTitle: "name",
    group: "Katalog Salon",
    defaultColumns: ["name", "category", "priceDisplay", "durationMinutes", "featured"],
    description: "Kelola menu potong rambut, perawatan spa, smoothing, pewarnaan, dan tarif salon.",
  },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data) {
          if (!data.slug && data.name) {
            data.slug = slugify(data.name);
          }
          if (!data.priceDisplay && typeof data.price === "number") {
            data.priceDisplay = formatRupiah(data.price);
          }
        }
        return data;
      },
    ],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "name",
      type: "text",
      label: "Nama Layanan Perawatan",
      required: true,
      admin: {
        placeholder: "Contoh: Scalp Detox & Hair Spa Therapy",
        description: "Ketikkan nama layanan yang ingin ditampilkan di website.",
      },
    },
    {
      name: "category",
      type: "relationship",
      relationTo: "categories",
      label: "Kategori Layanan",
      required: true,
      admin: {
        description: "Pilih kategori untuk mempermudah pelanggan memfilter menu.",
      },
    },
    {
      name: "price",
      type: "number",
      label: "Harga (Hanya Angka)",
      required: true,
      admin: {
        placeholder: "Contoh: 135000",
        description: "Masukkan nominal angka saja tanpa titik atau tulisan Rp.",
      },
    },
    {
      name: "priceDisplay",
      type: "text",
      label: "Teks Tampilan Harga (Opsional - Terisi Otomatis)",
      admin: {
        placeholder: "Contoh: Rp 135.000 atau Mulai Rp 350.000",
        description: "Boleh dikosongkan (akan otomatis dibuatkan dari harga di atas), atau isi jika ada keterangan tambahan seperti 'Mulai Rp 350.000'.",
      },
    },
    {
      name: "durationMinutes",
      type: "number",
      label: "Estimasi Durasi Pengerjaan (Menit)",
      defaultValue: 60,
      required: true,
      admin: {
        placeholder: "Contoh: 60 (untuk 1 jam)",
        description: "Lama waktu pengerjaan perawatan di salon (dalam satuan menit).",
      },
    },
    {
      name: "description",
      type: "textarea",
      label: "Deskripsi & Manfaat Perawatan",
      required: true,
      admin: {
        placeholder: "Contoh: Perawatan pembersihan kulit kepala mendalam dengan scalp scrub organik, massage relaksasi leher dan bahu...",
        description: "Jelaskan manfaat dan langkah perawatan untuk menarik minat pelanggan.",
      },
    },
    {
      name: "featured",
      type: "checkbox",
      label: "Tampilkan sebagai Menu Populer / Pilihan Utama di Beranda?",
      defaultValue: false,
      admin: {
        description: "Centang jika layanan ini termasuk yang paling diminati atau sedang promo di halaman depan website.",
      },
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      label: "Foto Contoh Hasil Layanan (Opsional)",
      admin: {
        description: "Pilih foto dari komputer/HP untuk mempercantik tampilan kartu layanan di website.",
      },
    },
    {
      name: "slug",
      type: "text",
      label: "Alamat URL (Otomatis)",
      unique: true,
      admin: {
        placeholder: "Otomatis terisi dari nama layanan",
        description: "Biarkan kosong, sistem akan mengisinya secara otomatis (misal: scalp-detox-spa).",
      },
    },
  ],
};
