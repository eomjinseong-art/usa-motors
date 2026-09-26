import type { CategoryId, Generation, Model } from "@/lib/types";

export type RawModel = {
  slug: string;
  brand: string;
  nameKo: string;
  nameEn: string;
  years: string;
  body: string;
  categories: CategoryId[];
  summary: string;
  editorial: string[];
  specs: [string, string][];
  sources: [string, string][];
  imageQuery: string;
  generations?: Generation[];
};

export function toModel(raw: RawModel): Model {
  return {
    slug: raw.slug,
    brand: raw.brand,
    nameKo: raw.nameKo,
    nameEn: raw.nameEn,
    years: raw.years,
    body: raw.body,
    categories: raw.categories,
    summary: raw.summary,
    editorial: raw.editorial,
    imageQuery: raw.imageQuery,
    generations: raw.generations,
    specs: [
      { label: "생산", value: raw.years },
      { label: "차체", value: raw.body },
      ...raw.specs.map(([label, value]) => ({ label, value })),
    ],
    sources: raw.sources.map(([label, href]) => ({ label, href })),
  };
}
