import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

import { Users } from "./collections/Users";
import { Services } from "./collections/Services";
import { Categories } from "./collections/Categories";
import { Gallery } from "./collections/Gallery";
import { Reviews } from "./collections/Reviews";
import { Media } from "./collections/Media";
import { Bookings } from "./collections/Bookings";
import { Staff } from "./collections/Staff";
import { BlockedTimes } from "./collections/BlockedTimes";
import { SalonSettings } from "./collections/SalonSettings";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SITE_URL || "https://kalyasalon.vercel.app",
  sharp,
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: "• Kalya Salon Control Center",
    },
    components: {
      beforeNavLinks: ["@/components/admin/SidebarNavLinks#SidebarNavLinks"],
      beforeDashboard: ["@/components/admin/DashboardHero#DashboardHero"],
      views: {
        bookingCalendar: {
          Component: "@/components/admin/BookingCalendarView#BookingCalendarView",
          path: "/booking-calendar",
        },
      },
    },
  },
  collections: [
    Bookings,
    Services,
    Categories,
    Staff,
    BlockedTimes,
    Gallery,
    Reviews,
    Media,
    SalonSettings,
    Users,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "kalya-salon-madiun-ultra-secure-payload-secret-key-2026",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || "postgresql://postgres:YMJ2U%2AnhTtU%246We@db.pbjaeuhfubmwqczfmnli.supabase.co:5432/postgres",
      ssl: {
        rejectUnauthorized: false,
      },
      max: 10,
    },
    push: false,
  }),
});
