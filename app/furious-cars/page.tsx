import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { PartsCta } from "@/components/PartsCta";
import { furiousCars, ffCarUrl } from "@/data/films";
import { modelBySlug } from "@/lib/catalog";
import { MI_ARCHIVE_URL, pageMetadata, SITE_URL } from "@/lib/site";

export const metadata = pageMetadata({
  title: "분노의 질주 차량",
  description: "분노의 질주 시리즈에 나온 미국 차를 ff-archive 항목과 이 카탈로그의 모델 페이지로 연결한 색인.",
  path: "/furious-cars",
});

export default function FuriousPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8">
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "홈", item: SITE_URL },
              { "@type": "ListItem", position: 2, name: "분노의 질주 차량", item: `${SITE_URL}/furious-cars` },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "분노의 질주 미국 차량",
            itemListElement: furiousCars.map((car, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: car.titleKo,
              url: ffCarUrl(car.ffSlug),
            })),
          },
        ]}
      />
      <header className="mb-10 max-w-3xl">
        <p className="mb-2 text-xs tracking-[0.2em] text-accent uppercase">Fast & Furious</p>
        <h1 className="font-serif text-3xl font-semibold tracking-tight md:text-4xl">분노의 질주 차량</h1>
        <p className="mt-4 leading-relaxed text-muted">
          카탈로그의 본편은 브랜드와 모델입니다. 여기 목록은 분노의 질주 아카이브에 등재된 미국 차만 모은 색인입니다.
          각 항목은 해당 아카이브 페이지로 이어지고, 우리 카탈로그에 같은 네임플레이트가 있으면 모델 페이지도 붙입니다.
        </p>
      </header>
      <ul className="space-y-4">
        {furiousCars.map((car) => {
          const model = car.modelSlug ? modelBySlug(car.modelSlug) : undefined;
          return (
            <li key={car.ffSlug} className="rounded-2xl border border-line bg-card p-5">
              <h2 className="font-serif text-xl">
                <a href={ffCarUrl(car.ffSlug)} className="hover:text-accent" target="_blank" rel="noopener noreferrer">
                  {car.titleKo}
                </a>
              </h2>
              <p className="mt-1 text-sm text-muted">{car.titleEn}</p>
              <p className="mt-2 text-sm leading-relaxed">{car.note}</p>
              <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                <a href={ffCarUrl(car.ffSlug)} className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">
                  분노의 질주 아카이브
                </a>
                {model ? (
                  <Link href={`/cars/${model.slug}`} className="text-accent hover:underline">
                    우리 카탈로그 · {model.nameKo}
                  </Link>
                ) : null}
              </p>
            </li>
          );
        })}
      </ul>
      <section className="mt-14 rounded-2xl border border-line bg-card p-6">
        <h2 className="font-serif text-xl">미션 임파서블 아카이브의 미국 차</h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">
          미션 임파서블 아카이브의 차량 색인을 확인했습니다. 현재 등재된 차는 유럽·일본 브랜드이고, 미국 브랜드 모델
          페이지는 없습니다. 색인 전체는 아래에서 볼 수 있습니다.
        </p>
        <a
          href={`${MI_ARCHIVE_URL}/cars`}
          className="mt-4 inline-block text-sm text-accent hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          mi-archive 차량 색인
        </a>
      </section>
      <div className="mt-8 max-w-xl">
        <PartsCta campaign="furious-cars" />
      </div>
    </main>
  );
}
