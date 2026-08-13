import { CollectionConfig } from "payload";

export const Gallery: CollectionConfig = {
  slug: "gallery",
  labels: {
    singular: "Foto Portofolio",
    plural: "Galeri Foto Portofolio",
  },
  admin: {
    useAsTitle: "title",
    group: "Galeri & Ulasan",
    defaultColumns: ["title", "category", "featured"],
    description: "Unggah portofolio foto hasil pengerjaan salon (potong rambut, pewarnaan, smoothing, atau suasana interior).",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "Judul Foto / Nama Model Gaya",
      required: true,
      admin: {
        placeholder: "Contoh: Korean Layer Cut & Soft Ash Brown Balayage",
        description: "Beri judul singkat yang menarik untuk foto ini.",
      },
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      label: "Pilih / Upload Foto",
      required: true,
      admin: {
        description: "Klik untuk memilih foto dari galeri HP atau drag & drop file gambar (JPG / PNG / WEBP).",
      },
    },
    {
      name: "category",
      type: "select",
      label: "Kategori Portofolio",
      options: [
        { label: "✂️ Potong & Penataan Rambut (Haircut & Style)", value: "haircut" },
        { label: "🎨 Pewarnaan & Balayage (Coloring)", value: "coloring" },
        { label: "✨ Perawatan & Spa (Treatment & Spa)", value: "treatment" },
        { label: "🌿 Suasana & Interior Salon (Ambiance)", value: "interior" },
      ],
      defaultValue: "haircut",
      required: true,
      admin: {
        description: "Pilih kategori agar foto masuk ke tab filter yang sesuai di halaman Galeri website.",
      },
    },
    {
      name: "description",
      type: "textarea",
      label: "Keterangan Tambahan / Detail Penataan (Opsional)",
      admin: {
        placeholder: "Contoh: Teknik pewarnaan seamless balayage dengan tone dingin dan perawatan pelindung keratin.",
        description: "Cerita singkat tentang hasil pengerjaan atau teknik yang digunakan.",
      },
    },
    {
      name: "featured",
      type: "checkbox",
      label: "Tampilkan di Preview Galeri Halaman Depan (Beranda)?",
      defaultValue: true,
      admin: {
        description: "Centang jika foto ini adalah salah satu karya terbaik yang ingin langsung dilihat pengunjung di beranda.",
      },
    },
  ],
};
