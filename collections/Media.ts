import { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  labels: {
    singular: "File Gambar",
    plural: "Penyimpanan Media & Foto",
  },
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
    description: "Seluruh foto dan gambar yang diunggah ke website Kalya Salon tersimpan di sini secara otomatis.",
  },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data && !data.alt) {
          data.alt = "Foto Kalya Salon Madiun";
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
      name: "alt",
      type: "text",
      label: "Keterangan Foto (Alt Text)",
      defaultValue: "Foto Kalya Salon Madiun",
      admin: {
        placeholder: "Contoh: Interior Kalya Salon Madiun atau Hasil Cat Rambut Balayage",
        description: "Boleh dikosongkan (otomatis diisi), atau tulis keterangan singkat isi gambar untuk SEO Google.",
      },
    },
    {
      name: "caption",
      type: "text",
      label: "Catatan Tambahan (Opsional)",
      admin: {
        description: "Catatan internal pemilik salon mengenai foto ini.",
      },
    },
  ],
};
