import type { Metadata } from "next";
import configPromise from "@payload-config";
import { RootLayout, handleServerFunctions } from "@payloadcms/next/layouts";
import { importMap } from "./admin/importMap";
import "@payloadcms/next/css";

import "./custom.scss";

export const metadata: Metadata = {
  title: "Kalya Salon — CMS Admin Portal",
  description: "Secure CMS Admin Portal for Kalya Salon Madiun",
  robots: {
    index: false,
    follow: false,
  },
};

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = async ({ children }: LayoutProps) =>
  RootLayout({
    config: configPromise,
    children,
    importMap,
    serverFunction: async (args) => {
      "use server";
      return handleServerFunctions({
        ...args,
        config: configPromise,
        importMap,
      });
    },
  });

export default Layout;
