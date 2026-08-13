import { CollectionConfig } from "payload";

export const Gallery: CollectionConfig = {
  slug: "gallery",
  admin: {
    useAsTitle: "title",
    group: "Galeri & Ulasan",
    defaultColumns: ["title", "category", "featured"],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "Judul Foto Karya / Ruang Salon",
      required: true,
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      label: "Upload Foto",
      required: true,
    },
    {
      name: "category",
      type: "select",
      label: "Kategori Portofolio",
      options: [
        { label: "Haircut & Style", value: "haircut" },
        { label: "Balayage & Color", value: "coloring" },
        { label: "Treatment & Spa", value: "treatment" },
        { label: "Salon Ambiance (Interior)", value: "interior" },
      ],
      defaultValue: "haircut",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
      label: "Keterangan Hasil Penataan",
    },
    {
      name: "featured",
      type: "checkbox",
      label: "Tampilkan di Preview Beranda?",
      defaultValue: true,
    },
  ],
};
