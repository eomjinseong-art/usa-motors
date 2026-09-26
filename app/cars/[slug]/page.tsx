import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CarVisual } from "@/components/CarVisual";
import { JsonLd } from "@/components/JsonLd";
import { PartsCta } from "@/components/PartsCta";
import { filmsForModel } from "@/data/films";
import { moviesForModel } from "@/data/movies";
import { CATEGORIES } from "@/lib/types";
import { brandBySlug, getImage, modelBySlug, models, relatedModels } from "@/lib/catalog";
import { pageMetadata, SITE_URL } from "@/lib/site";

type Params = { slug: string };

export function generateStaticParams() {
  return models.map((model) => ({ slug: model.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const model = modelBySlug(slug);
  if (!model) return {};
  return pageMetadata({
    title: `${model.nameKo} (${model.nameEn})`,
    description: model.summary,
    path: `/cars/${model.slug}`,
  });
}

export default async function ModelPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const model = modelBySlug(slug);
  if (!model) notFound();
  const brand = brandBySlug(model.brand);
  const image = getImage(model.slug);
  const films = filmsForModel(model.slug);
  const movies = moviesForModel(model.slug);
  const related = relatedModels(model);
  const categoryLabels = model.categories
    .map((id) => CATEGORIES.find((item) => item.id === id)?.label)
    .filter(Boolean);

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8">
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "홈", item: SITE_URL },
              { "@type": "ListItem", position: 2, name: "모델", item: `${SITE_URL}/cars` },
              { "@type": "ListItem", position: 3, name: model.nameKo, item: `${SITE_URL}/cars/${model.slug}` },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "Car",
            name: `${model.nameEn} (${model.nameKo})`,
            alternateName: model.nameKo,
            description: model.summary,
            brand: { "@type": "Brand", name: brand?.nameEn },
            image: image?.url,
            url: `${SITE_URL}/cars/${model.slug}`,
            vehicleModelDate: model.years,
            bodyType: model.body,
            manufacturer: { "@type": "Organization", name: brand?.nameEn },
          },
        ]}
      />
      <header className="mb-10 max-w-3xl">
        <p className="mb-2 text-xs tracking-[0.2em] text-accent uppercase">
          {brand?.nameEn} · {model.years}
        </p>
        <h1 className="font-serif text-3xl font-semibold tracking-tight md:text-4xl">{model.nameKo}</h1>
        <p className="mt-4 text-base leading-relaxed text-muted">{model.nameEn}</p>
        {categoryLabels.length ? <p className="mt-3 text-xs text-muted">{categoryLabels.join(" · ")}</p> : null}
      </header>
      {image ? (
        <figure>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image.url}
            alt={`${model.nameKo} (${model.nameEn})`}
            width={1600}
            height={900}
            className="aspect-[16/9] w-full rounded-2xl bg-hero object-cover"
          />
          <figcaption>
            <p className="mt-2 text-xs leading-relaxed text-muted">
              사진: {image.author} / Wikimedia Commons · {image.license} ·{" "}
              <a href={image.pageUrl} className="underline decoration-line underline-offset-2 hover:text-accent" rel="noopener noreferrer">
                출처
              </a>
            </p>
          </figcaption>
        </figure>
      ) : (
        <CarVisual name={model.nameKo} body={model.body} categories={model.categories} />
      )}
      <p className="mt-8 max-w-3xl text-base leading-relaxed">{model.summary}</p>
      <section className="mt-10">
        <h2 className="font-serif text-xl">제원</h2>
        <p className="mt-1 text-sm text-muted">공개된 대표 수치입니다. 연식과 트림에 따라 달라지며, 확인되지 않은 값은 적지 않았습니다.</p>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-line">
          <table className="w-full min-w-[20rem] text-left text-sm">
            <tbody>
              {model.specs.map((spec) => (
                <tr key={spec.label} className="border-t border-line first:border-t-0">
                  <th className="w-28 bg-card px-4 py-3 font-medium text-ink">{spec.label}</th>
                  <td className="px-4 py-3 text-muted">{spec.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section className="mt-10 max-w-3xl">
        <h2 className="font-serif text-xl">특징</h2>
        <div className="mt-3 space-y-4 leading-relaxed">
          {model.editorial.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>
      {model.generations?.length ? (
        <section className="mt-10">
          <h2 className="font-serif text-xl">세대</h2>
          <ol className="mt-4 space-y-3">
            {model.generations.map((generation) => (
              <li key={generation.id} className="rounded-2xl border border-line bg-card p-4">
                <Link href={`/cars/${model.slug}/generations/${generation.id}`} className="font-serif text-lg hover:text-accent">
                  {generation.heading}
                </Link>
                <p className="mt-1 text-sm text-muted">
                  {generation.years}
                  {generation.code ? ` · ${generation.code}` : ""}
                </p>
                <p className="mt-2 text-sm leading-relaxed">{generation.summary}</p>
              </li>
            ))}
          </ol>
        </section>
      ) : null}
      {films.length ? (
        <section className="mt-10 rounded-2xl border border-line bg-card p-5">
          <p className="text-xs tracking-[0.18em] text-accent uppercase">Screen</p>
          <h2 className="mt-1 font-serif text-xl">분노의 질주 기록</h2>
          <p className="mt-2 text-sm text-muted">이 카탈로그에 있는 미국 브랜드 기준으로 분노의 질주와 연결된 기록입니다.</p>
          <ul className="mt-3 space-y-2 text-sm">
            {films.map((film) => (
              <li key={film.ffSlug}>
                <a
                  href={`https://ff-archive.vercel.app/cars/${film.ffSlug}`}
                  className="text-accent hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {film.titleKo}
                </a>
                <span className="text-muted"> — {film.note}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
      {movies.length ? (
        <section className="mt-10 rounded-2xl border border-line bg-card p-5">
          <p className="text-xs tracking-[0.18em] text-accent uppercase">Screen</p>
          <h2 className="mt-1 font-serif text-xl">영화 속 등장</h2>
          <ul className="mt-3 space-y-3 text-sm">
            {movies.map((movie) => (
              <li key={movie.id}>
                <Link href={`/movie-cars#${movie.id}`} className="text-accent hover:underline">
                  {movie.filmKo} ({movie.year}
                  {movie.medium === "TV 시리즈" ? ", TV 시리즈" : ""})
                </Link>
                <span className="text-muted">
                  {" "}
                  — {movie.carKo}. {movie.driver}. {movie.note}
                </span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
      {brand ? (
        <section className="mt-10 rounded-2xl border border-line bg-card p-5">
          <p className="text-xs tracking-[0.18em] text-accent uppercase">Brand</p>
          <Link href={`/brands/${brand.slug}`} className="mt-1 block font-serif text-lg hover:text-accent">
            {brand.nameKo}
          </Link>
          <p className="text-sm text-muted">{brand.hq}</p>
          {brand.status === "defunct" ? <p className="mt-1 text-xs text-accent">단종 브랜드</p> : null}
        </section>
      ) : null}
      <div className="mt-8 max-w-xl">
        <PartsCta campaign={`model-${model.slug}`} />
      </div>
      {related.length ? (
        <section className="mt-14">
          <h2 className="font-serif text-xl">같은 브랜드의 다른 모델</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((item) => (
              <Link key={item.slug} href={`/cars/${item.slug}`} className="block rounded-xl border border-line bg-card p-4 hover:border-accent">
                <p className="font-serif">{item.nameKo}</p>
                <p className="mt-1 text-xs text-muted">
                  {item.nameEn} · {item.years}
                </p>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
      <section className="mt-14 border-t border-line pt-8">
        <h2 className="font-serif text-lg">출처</h2>
        <ul className="mt-3 space-y-2 text-sm">
          {model.sources.map((source) => (
            <li key={source.href}>
              <a href={source.href} className="underline decoration-line underline-offset-4 hover:text-accent" target="_blank" rel="noopener noreferrer">
                {source.label}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
