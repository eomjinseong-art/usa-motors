import { brands } from "@/data/brands";
import { movieCars } from "@/data/movies";
import { generationsBySlug } from "@/data/generations";
import { modelVideos } from "@/data/youtube";
import { chevroletModels } from "@/data/models/chevrolet";
import { fordModels } from "@/data/models/ford";
import { luxuryModels } from "@/data/models/luxury";
import { restModels } from "@/data/models/rest";
import { stellantisModels } from "@/data/models/stellantis";
import { toModel, type RawModel } from "@/data/raw";
import type { Brand, CategoryId, Model } from "@/lib/types";
import wikiImages from "@/data/wiki-images.json";
import type { WikiImage } from "@/lib/types";

const rawModels: RawModel[] = [
  ...fordModels,
  ...chevroletModels,
  ...stellantisModels,
  ...luxuryModels,
  ...restModels,
];

export const models: Model[] = rawModels.map((raw) => {
  const model = toModel(raw);
  const generations = generationsBySlug[model.slug];
  if (generations) model.generations = generations;
  const video = modelVideos[model.slug];
  if (video) model.video = video;
  return model;
});

const images = wikiImages as Record<string, WikiImage>;

export function getImage(slug: string): WikiImage | undefined {
  return images[slug];
}

export function brandBySlug(slug: string): Brand | undefined {
  return brands.find((brand) => brand.slug === slug);
}

export function modelBySlug(slug: string): Model | undefined {
  return models.find((model) => model.slug === slug);
}

export function modelsByBrand(slug: string): Model[] {
  return models.filter((model) => model.brand === slug);
}

export function filterModels(brand?: string, category?: string): Model[] {
  return models.filter((model) => {
    if (brand && model.brand !== brand) return false;
    if (category && !model.categories.includes(category as CategoryId)) return false;
    return true;
  });
}

export function relatedModels(model: Model, limit = 8): Model[] {
  return models.filter((item) => item.brand === model.brand && item.slug !== model.slug).slice(0, limit);
}

export const featuredSlugs = [
  "ford-mustang",
  "chevrolet-corvette",
  "dodge-charger",
  "jeep-wrangler",
  "cadillac-eldorado",
  "ford-f-150",
  "pontiac-gto",
  "tesla-model-s",
];

export function featuredModels(): Model[] {
  return featuredSlugs.map((slug) => modelBySlug(slug)).filter((model): model is Model => Boolean(model));
}

export function searchCatalog(query: string) {
  const needle = query.trim().toLowerCase();
  if (!needle) return [];
  const hits: {
    title: string;
    subtitle: string;
    href: string;
    kind: string;
    keywords: string;
  }[] = [];

  for (const brand of brands) {
    const hay = `${brand.nameKo} ${brand.nameEn} ${brand.slug} ${brand.summary} ${brand.hq}`.toLowerCase();
    if (hay.includes(needle)) {
      hits.push({
        title: `${brand.nameKo} (${brand.nameEn})`,
        subtitle: brand.summary,
        href: `/brands/${brand.slug}`,
        kind: "브랜드",
        keywords: hay,
      });
    }
  }

  for (const model of models) {
    const brand = brandBySlug(model.brand);
    const hay = `${model.nameKo} ${model.nameEn} ${model.slug} ${model.years} ${model.summary} ${brand?.nameKo ?? ""} ${brand?.nameEn ?? ""}`.toLowerCase();
    if (hay.includes(needle)) {
      hits.push({
        title: `${model.nameKo} (${model.nameEn})`,
        subtitle: `${brand?.nameKo ?? ""} · ${model.years}`,
        href: `/cars/${model.slug}`,
        kind: "모델",
        keywords: hay,
      });
    }
  }

  for (const car of movieCars) {
    const hay = `${car.filmKo} ${car.filmEn} ${car.carKo} ${car.carEn} ${car.driver} ${car.note}`.toLowerCase();
    if (hay.includes(needle)) {
      hits.push({
        title: `${car.filmKo} · ${car.carKo}`,
        subtitle: `${car.year} · ${car.medium}`,
        href: `/movie-cars#${car.id}`,
        kind: "영화",
        keywords: hay,
      });
    }
  }

  return hits.slice(0, 20);
}

export { brands };
