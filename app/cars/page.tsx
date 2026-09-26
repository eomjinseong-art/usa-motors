import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { ModelCard } from "@/components/ModelCard";
import { CATEGORIES } from "@/lib/types";
import { brands, filterModels, getImage, models } from "@/lib/catalog";
import { pageMetadata, SITE_URL } from "@/lib/site";

type Search = { brand?: string; category?: string };

export async function generateMetadata({ searchParams }: { searchParams: Promise<Search> }): Promise<Metadata> {
  const { brand, category } = await searchParams;
  const brandName = brands.find((item) => item.slug === brand)?.nameKo;
  const categoryName = CATEGORIES.find((item) => item.id === category)?.label;
  const bits = [brandName, categoryName].filter(Boolean).join(" · ");
  const title = bits ? `${bits} 모델` : "모델";
  const description = bits
    ? `${bits}로 좁힌 미국차 모델 카탈로그.`
    : `미국차 ${models.length}개 모델. 브랜드와 머슬카, 포니카, 픽업, SUV, 세단, 스포츠카, 전기차로 좁혀 볼 수 있습니다.`;
  const query = new URLSearchParams();
  if (brand) query.set("brand", brand);
  if (category) query.set("category", category);
  const path = query.size ? `/cars?${query.toString()}` : "/cars";
  return pageMetadata({ title, description, path });
}

export default async function CarsPage({ searchParams }: { searchParams: Promise<Search> }) {
  const { brand, category } = await searchParams;
  const list = filterModels(brand, category);
  const activeBrand = brands.find((item) => item.slug === brand);
  const activeCategory = CATEGORIES.find((item) => item.id === category);

  function href(nextBrand?: string, nextCategory?: string) {
    const query = new URLSearchParams();
    if (nextBrand) query.set("brand", nextBrand);
    if (nextCategory) query.set("category", nextCategory);
    const value = query.toString();
    return value ? `/cars?${value}` : "/cars";
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "미국차 모델 카탈로그",
          numberOfItems: list.length,
          itemListElement: list.slice(0, 50).map((model, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: model.nameKo,
            url: `${SITE_URL}/cars/${model.slug}`,
          })),
        }}
      />
      <header className="mb-8 max-w-3xl">
        <p className="mb-2 text-xs tracking-[0.2em] text-accent uppercase">Catalogue</p>
        <h1 className="font-serif text-3xl font-semibold tracking-tight md:text-4xl">모델</h1>
        <p className="mt-4 text-base leading-relaxed text-muted">
          전체 {models.length}개 모델. 브랜드와 차종으로 좁혀 볼 수 있습니다. 한 모델이 여러 분류에 들어갈 수 있습니다.
          {activeBrand || activeCategory ? ` 현재 ${list.length}개.` : ""}
        </p>
      </header>
      <nav className="mb-4 flex flex-wrap gap-2" aria-label="브랜드 필터">
        <Link href={href(undefined, category)} className={chip(!brand)}>
          전체
        </Link>
        {brands.map((item) => (
          <Link key={item.slug} href={href(item.slug, category)} className={chip(brand === item.slug)}>
            {item.nameKo}
            {item.status === "defunct" ? " · 단종" : ""}
          </Link>
        ))}
      </nav>
      <nav className="mb-8 flex flex-wrap gap-2" aria-label="차종 필터">
        <Link href={href(brand, undefined)} className={chip(!category)}>
          모든 차종
        </Link>
        {CATEGORIES.map((item) => (
          <Link key={item.id} href={href(brand, item.id)} className={chip(category === item.id)}>
            {item.label}
          </Link>
        ))}
      </nav>
      {list.length === 0 ? (
        <p className="text-sm text-muted">이 조건에 해당하는 모델이 없습니다.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((model) => (
            <ModelCard key={model.slug} model={model} image={getImage(model.slug)} />
          ))}
        </div>
      )}
    </main>
  );
}

function chip(active: boolean) {
  return `rounded-full border px-3 py-1.5 text-sm ${
    active ? "border-accent bg-accent text-on-accent" : "border-line text-muted hover:border-accent"
  }`;
}
