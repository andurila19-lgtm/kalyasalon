import { CollectionConfig } from "payload";

export const Staff: CollectionConfig = {
  slug: "staff",
  labels: {
    singular: "Staf / Stylist",
    plural: "Daftar Staf & Stylist",
  },
  admin: {
    useAsTitle: "name",
    group: "Manajemen Booking",
    defaultColumns: ["name", "role", "active"],
    description: "Kelola data kapster, penata rambut, dan terapis salon.",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "name",
      type: "text",
      label: "Nama Staf / Stylist",
      required: true,
      admin: {
        placeholder: "Contoh: Maya Anggraini",
      },
    },
    {
      name: "role",
      type: "text",
      label: "Posisi / Keahlian",
      defaultValue: "Hair Stylist",
      admin: {
        placeholder: "Contoh: Senior Hair Stylist / Color Specialist",
      },
    },
    {
      name: "photo",
      type: "upload",
      relationTo: "media",
      label: "Foto Profil Staf (Opsional)",
    },
    {
      name: "services",
      type: "relationship",
      relationTo: "services",
      hasMany: true,
      label: "Layanan yang Dikuasai",
      admin: {
        description: "Pilih layanan perawatan yang dapat ditangani oleh staf ini.",
      },
    },
    {
      name: "active",
      type: "checkbox",
      label: "Status Aktif Melayani Pelanggan?",
      defaultValue: true,
    },
  ],
};
