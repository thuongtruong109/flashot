import { MetadataRoute } from "next";

export const revalidate = 86400;
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://flashot.vercel.app",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
