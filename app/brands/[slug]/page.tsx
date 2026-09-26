import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { ModelCard } from "@/components/ModelCard";
import { PartsCta } from "@/components/PartsCta";
import { brandBySlug, brands, getImage, modelsByBrand } from "@/lib/catalog";
import { pageMetadata, SITE_URL } from "@/lib/site";

type Params = { slug: string };

export function generateStaticParams() {
  return brands.map((brand) => ({ slug: brand.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const brand = brandBySlug(slug);
  if (!brand) return {};
  const title = `${brand.nameKo} (${brand.nameEn})`;
  return pageMetadata({
    title,
    description: brand.summary,
    path: `/brands/${brand.slug}`,
  });
}

export default async function BrandPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const brand = brandBySlug(slug);
  if (!brand) notFound();
  const list = modelsByBrand(brand.slug);
  const logo = getImage(`brand-${brand.slug}`);

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8">
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "홈", item: SITE_URL },
              { "@type": "ListItem", position: 2, name: "브랜드", item: `${SITE_URL}/brands` },
              { "@type": "ListItem", position: 3, name: brand.nameKo, item: `${SITE_URL}/brands/${brand.slug}` },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: `${brand.nameKo} 모델`,
            itemListElement: list.map((model, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: model.nameKo,
              url: `${SITE_URL}/cars/${model.slug}`,
            })),
          },
        ]}
      />
      <header className="mb-10 max-w-3xl">
        <p className="mb-2 text-xs tracking-[0.2em] text-accent uppercase">{brand.nameEn}</p>
        <h1 className="font-serif text-3xl font-semibold tracking-tight md:text-4xl">
          {brand.nameKo} ({brand.nameEn})
        </h1>
        <p className="mt-4 text-sm text-muted">
          {brand.hq} · {brand.founded}년{brand.ended ? `–${brand.ended}년` : "–"} · 모델 {list.length}개
        </p>
        {brand.status === "defunct" ? (
          <p className="mt-3 inline-block rounded-full border border-accent px-3 py-1 text-xs text-accent">단종 브랜드</p>
        ) : null}
      </header>
      {logo ? (
        <figure className="mb-8 max-w-xs rounded-2xl border border-line bg-card p-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logo.url} alt={`${brand.nameEn} 로고`} className="mx-auto max-h-28 max-w-[80%] object-contain" />
          <figcaption className="mt-3 text-xs leading-relaxed text-muted">
            로고: {logo.author} / Wikimedia Commons · {logo.license} ·{" "}
            <a href={logo.pageUrl} className="underline decoration-line underline-offset-2 hover:text-accent" rel="noopener noreferrer">
              출처
            </a>
          </figcaption>
        </figure>
      ) : null}
      <div className="max-w-3xl space-y-4 text-base leading-relaxed">
        {brand.editorial.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <section className="mt-12">
        <h2 className="font-serif text-2xl">모델</h2>
        <p className="mt-1 text-sm text-muted">클래식부터 현행 네임플레이트까지.</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((model) => (
            <ModelCard key={model.slug} model={model} image={getImage(model.slug)} />
          ))}
        </div>
      </section>
      <div className="mt-10 max-w-xl">
        <PartsCta campaign={`brand-${brand.slug}`} />
      </div>
      <p className="mt-8 text-sm">
        <Link href="/brands" className="text-accent hover:underline">
          모든 브랜드
        </Link>
      </p>
    </main>
  );
}
