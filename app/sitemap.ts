import type { MetadataRoute } from "next";
import { brands, models } from "@/lib/catalog";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPaths = ["", "/brands", "/cars", "/furious-cars", "/parts", "/credits"];
  const brandPaths = brands.map((brand) => `/brands/${brand.slug}`);
  const modelPaths = models.map((model) => `/cars/${model.slug}`);
  const generationPaths = models.flatMap((model) =>
    (model.generations ?? []).map((generation) => `/cars/${model.slug}/generations/${generation.id}`),
  );
  return [...staticPaths, ...brandPaths, ...modelPaths, ...generationPaths].map((path) => ({
    url: path === "" ? SITE_URL : `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : path.includes("/generations/") ? 0.6 : 0.8,
  }));
}
