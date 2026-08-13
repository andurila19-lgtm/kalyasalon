import { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  auth: true, // Enables built-in secure login, hashed passwords, and token authentication
  admin: {
    useAsTitle: "email",
    group: "Pengaturan & Akun",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "name",
      type: "text",
      label: "Nama Lengkap",
      required: true,
    },
    {
      name: "role",
      type: "select",
      label: "Hak Akses",
      defaultValue: "admin",
      options: [
        { label: "Administrator (Full Access)", value: "admin" },
        { label: "Stylist / Staff", value: "staff" },
      ],
      required: true,
    },
  ],
};
