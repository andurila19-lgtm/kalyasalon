import { CollectionConfig } from "payload";

export const Categories: CollectionConfig = {
  slug: "categories",
  admin: {
    useAsTitle: "name",
    group: "Katalog Salon",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "name",
      type: "text",
      label: "Nama Kategori (Contoh: Haircut & Styling)",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      label: "Slug ID (Contoh: hair-design)",
      required: true,
      unique: true,
    },
    {
      name: "description",
      type: "textarea",
      label: "Deskripsi Singkat Kategori",
    },
  ],
};
