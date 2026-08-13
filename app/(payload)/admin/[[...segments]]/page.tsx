import type { Metadata } from "next";
import configPromise from "@payload-config";
import { RootPage, generatePageMetadata } from "@payloadcms/next/views";
import { importMap } from "../importMap";

type PageProps = {
  params: Promise<{
    segments: string[];
  }>;
  searchParams: Promise<{
    [key: string]: string | string[];
  }>;
};

export const generateMetadata = async ({ params, searchParams }: PageProps): Promise<Metadata> =>
  generatePageMetadata({ config: configPromise, params, searchParams });

const Page = async ({ params, searchParams }: PageProps) =>
  RootPage({ config: configPromise, importMap, params, searchParams });

export default Page;
