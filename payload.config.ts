import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { fileURLToPath } from "url";

import { Users } from "./collections/Users";
import { Services } from "./collections/Services";
import { Categories } from "./collections/Categories";
import { Gallery } from "./collections/Gallery";
import { Reviews } from "./collections/Reviews";
import { Media } from "./collections/Media";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: "• Kalya Salon Admin",
    },
  },
  collections: [Users, Services, Categories, Gallery, Reviews, Media],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "kalya-salon-madiun-ultra-secure-payload-secret-key-2026",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || "postgresql://postgres.placeholder:placeholder@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres",
    },
  }),
});
