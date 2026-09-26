import Link from "next/link";
import { ModelCard } from "@/components/ModelCard";
import { PartsCta } from "@/components/PartsCta";
import { JsonLd } from "@/components/JsonLd";
import { brands, featuredModels, getImage, models } from "@/lib/catalog";
import { pageMetadata, SITE_DESCRIPTION, SITE_NAME, SITE_NAME_KO, SITE_URL } from "@/lib/site";

export const metadata = pageMetadata({
  title: SITE_NAME_KO,
  description: SITE_DESCRIPTION,
  path: "/",
  absoluteTitle: true,
});

export default function HomePage() {
  const featured = featuredModels();
  const current = brands.filter((brand) => brand.status === "current");
  const defunct = brands.filter((brand) => brand.status === "defunct");

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: SITE_NAME_KO,
          itemListElement: brands.map((brand, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: brand.nameKo,
            url: `${SITE_URL}/brands/${brand.slug}`,
          })),
        }}
      />
      <section className="overflow-hidden rounded-3xl bg-hero text-hero-ink">
        <div className="grid gap-6 px-6 py-10 md:grid-cols-[1.3fr_0.7fr] md:px-10 md:py-14">
          <div>
            <p className="text-xs tracking-[0.22em] text-gold uppercase">{SITE_NAME}</p>
            <h1 className="mt-3 font-serif text-4xl leading-tight font-semibold md:text-5xl">{SITE_NAME_KO}</h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-hero-ink/80">
              클래식부터 현재까지, 미국 자동차 브랜드와 모델 네임플레이트를 한자리에 모은 한국어 카탈로그 아카이브.
              현재 카탈로그에는 브랜드 {brands.length}곳, 모델 {models.length}개가 있습니다.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/brands" className="rounded-full bg-accent px-4 py-2 text-sm text-on-accent">
                브랜드 둘러보기
              </Link>
              <Link href="/cars" className="rounded-full border border-hero-ink/30 px-4 py-2 text-sm">
                모델 카탈로그
              </Link>
            </div>
          </div>
          <div className="flex items-end">
            <p className="text-sm leading-relaxed text-hero-ink/80">
              포인트 색은 미국 머슬카의 딥 크림슨입니다. 사진이 있는 모델은 상용 이용이 허용된 위키미디어 공용 이미지만
              쓰고, 없으면 그래픽으로 대신합니다.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-14">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-serif text-2xl">브랜드</h2>
            <p className="mt-1 text-sm text-muted">포드부터 테슬라까지, 현행 미국 배지를 한자리에.</p>
          </div>
          <Link href="/brands" className="text-sm text-accent hover:underline">
            모두 보기
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {current.map((brand) => (
            <Link key={brand.slug} href={`/brands/${brand.slug}`} className="rounded-2xl border border-line bg-card p-5 hover:border-accent">
              <p className="text-xs tracking-wide text-accent">{brand.nameEn}</p>
              <h3 className="mt-1 font-serif text-2xl">{brand.nameKo}</h3>
              <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">{brand.summary}</p>
              <p className="mt-3 text-xs text-muted">모델 {models.filter((model) => model.brand === brand.slug).length}개</p>
            </Link>
          ))}
        </div>
        <h3 className="mt-8 font-serif text-xl">단종 브랜드</h3>
        <div className="mt-3 grid gap-4 sm:grid-cols-3">
          {defunct.map((brand) => (
            <Link key={brand.slug} href={`/brands/${brand.slug}`} className="rounded-2xl border border-line bg-card p-5 hover:border-accent">
              <p className="text-xs text-accent">단종 브랜드 · {brand.ended}</p>
              <h3 className="mt-1 font-serif text-xl">{brand.nameKo}</h3>
              <p className="mt-2 line-clamp-2 text-sm text-muted">{brand.summary}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="font-serif text-2xl">먼저 볼 모델</h2>
        <p className="mt-1 text-sm text-muted">카탈로그에서 먼저 열어 보기 좋은 네임플레이트입니다.</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((model) => (
            <ModelCard key={model.slug} model={model} image={getImage(model.slug)} />
          ))}
        </div>
      </section>

      <section className="mt-14 rounded-2xl border border-line bg-card p-6">
        <p className="text-xs tracking-[0.18em] text-accent uppercase">Screen</p>
        <h2 className="mt-1 font-serif text-2xl">분노의 질주 차량</h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
          미국 차가 시리즈에 나온 기록을 분노의 질주 아카이브와 연결합니다. 사이트 본편은 차 자체이고, 스크린 기록은 별도
          색인입니다.
        </p>
        <Link href="/furious-cars" className="mt-4 inline-block text-sm text-accent hover:underline">
          분노의 질주 차량 목록 →
        </Link>
      </section>

      <div className="mt-8">
        <PartsCta campaign="home" />
      </div>
    </main>
  );
}
