import { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  upload: {
    staticDir: "public/media",
    imageSizes: [
      {
        name: "thumbnail",
        width: 400,
        height: 300,
        position: "centre",
      },
      {
        name: "card",
        width: 768,
        height: 1024,
        position: "centre",
      },
    ],
    adminThumbnail: "thumbnail",
    mimeTypes: ["image/*"],
  },
  admin: {
    useAsTitle: "alt",
    group: "Media & Foto",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "alt",
      type: "text",
      label: "Deskripsi Alt Foto",
      required: true,
    },
    {
      name: "caption",
      type: "text",
      label: "Keterangan Foto",
    },
  ],
};
