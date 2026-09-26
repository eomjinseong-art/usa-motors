import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { PartsCta } from "@/components/PartsCta";
import { brandBySlug, modelBySlug, models } from "@/lib/catalog";
import { pageMetadata, SITE_URL } from "@/lib/site";

type Params = { slug: string; gen: string };

export function generateStaticParams() {
  return models.flatMap((model) =>
    (model.generations ?? []).map((generation) => ({ slug: model.slug, gen: generation.id })),
  );
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug, gen } = await params;
  const model = modelBySlug(slug);
  const generation = model?.generations?.find((item) => item.id === gen);
  if (!model || !generation) return {};
  return pageMetadata({
    title: `${generation.heading} (${generation.years})`,
    description: generation.summary,
    path: `/cars/${model.slug}/generations/${generation.id}`,
  });
}

export default async function GenerationPage({ params }: { params: Promise<Params> }) {
  const { slug, gen } = await params;
  const model = modelBySlug(slug);
  const generation = model?.generations?.find((item) => item.id === gen);
  if (!model || !generation) notFound();
  const brand = brandBySlug(model.brand);

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "홈", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: model.nameKo, item: `${SITE_URL}/cars/${model.slug}` },
            {
              "@type": "ListItem",
              position: 3,
              name: generation.heading,
              item: `${SITE_URL}/cars/${model.slug}/generations/${generation.id}`,
            },
          ],
        }}
      />
      <header className="mb-8 max-w-3xl">
        <p className="mb-2 text-xs tracking-[0.2em] text-accent uppercase">
          {brand?.nameKo} · {model.nameKo}
        </p>
        <h1 className="font-serif text-3xl font-semibold tracking-tight md:text-4xl">{generation.heading}</h1>
        <p className="mt-4 text-base text-muted">
          {generation.years}
          {generation.code ? ` · ${generation.code}` : ""}
        </p>
      </header>
      <p className="max-w-3xl text-base leading-relaxed">{generation.summary}</p>
      <section className="mt-8 max-w-3xl">
        <h2 className="font-serif text-xl">이 세대에서 확인할 수 있는 점</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed">
          {generation.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </section>
      {model.generations && model.generations.length > 1 ? (
        <nav className="mt-10" aria-label="다른 세대">
          <h2 className="font-serif text-lg">다른 세대</h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {model.generations.map((item) => (
              <li key={item.id}>
                <Link
                  href={`/cars/${model.slug}/generations/${item.id}`}
                  className={`rounded-full border px-3 py-1.5 text-sm ${
                    item.id === generation.id ? "border-accent bg-accent text-on-accent" : "border-line hover:border-accent"
                  }`}
                >
                  {item.heading}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
      <p className="mt-8">
        <Link href={`/cars/${model.slug}`} className="text-sm text-accent hover:underline">
          {model.nameKo} 모델 페이지
        </Link>
      </p>
      <div className="mt-8 max-w-xl">
        <PartsCta campaign={`generation-${model.slug}-${generation.id}`} />
      </div>
    </main>
  );
}
