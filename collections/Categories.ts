import { CollectionConfig } from "payload";
import { slugify } from "../lib/utils";

export const Categories: CollectionConfig = {
  slug: "categories",
  labels: {
    singular: "Kategori Layanan",
    plural: "Daftar Kategori Layanan",
  },
  admin: {
    useAsTitle: "name",
    group: "Katalog Salon",
    description: "Kelompok jenis menu salon (contoh: Haircut & Styling, Hair Spa & Scalp, Hair Coloring, Perming & Smoothing).",
  },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data && !data.slug && data.name) {
          data.slug = slugify(data.name);
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
      label: "Nama Kategori",
      required: true,
      admin: {
        placeholder: "Contoh: Haircut & Styling",
        description: "Nama grup layanan yang akan muncul sebagai tab filter di menu.",
      },
    },
    {
      name: "description",
      type: "textarea",
      label: "Deskripsi Singkat Kategori (Opsional)",
      admin: {
        placeholder: "Contoh: Koleksi penataan rambut presisi sesuai bentuk wajah dan karakter unik Anda.",
        description: "Penjelasan ringkas mengenai kelompok perawatan ini.",
      },
    },
    {
      name: "slug",
      type: "text",
      label: "Kode URL Kategori (Otomatis)",
      unique: true,
      admin: {
        placeholder: "Otomatis terisi dari nama kategori",
        description: "Boleh dikosongkan, sistem akan otomatis membuatnya (misal: haircut-styling).",
      },
    },
  ],
};
