import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { PartsCta } from "@/components/PartsCta";
import { movieCars, movieImage } from "@/data/movies";
import { modelBySlug } from "@/lib/catalog";
import { pageMetadata, partsHref, SITE_URL } from "@/lib/site";

export const metadata = pageMetadata({
  title: "영화 속 미국차",
  description:
    "블리트, 식스티 세컨즈, 전격 Z작전, 트랜스포머 등 영화와 TV에 나온 미국차를 이 카탈로그의 모델 페이지로 연결한 색인. 위키백과에서 확인한 차만 실었습니다.",
  path: "/movie-cars",
});

export default function MovieCarsPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8">
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "홈", item: SITE_URL },
              { "@type": "ListItem", position: 2, name: "영화 속 미국차", item: `${SITE_URL}/movie-cars` },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "영화 속 미국차",
            numberOfItems: movieCars.length,
            itemListElement: movieCars.map((car, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: `${car.filmKo} — ${car.carKo}`,
              url: `${SITE_URL}/cars/${car.modelSlug}`,
            })),
          },
        ]}
      />
      <header className="mb-10 max-w-3xl">
        <p className="mb-2 text-xs tracking-[0.2em] text-accent uppercase">Movies</p>
        <h1 className="font-serif text-3xl font-semibold tracking-tight md:text-4xl">영화 속 미국차</h1>
        <p className="mt-4 leading-relaxed text-muted">
          이 카탈로그에 모델 페이지가 있는 미국차 가운데, 위키백과에서 영화나 TV 출연이 확인된 차만 모았습니다. 분노의
          질주 시리즈는 별도 색인입니다.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          비공식 팬사이트이며 영화사·제조사와 제휴하지 않습니다. 상표는 각 권리자의 소유입니다.
        </p>
      </header>
      <ul className="space-y-6">
        {movieCars.map((car) => {
          const model = modelBySlug(car.modelSlug);
          const image = movieImage(car.id);
          return (
            <li id={car.id} key={car.id} className="rounded-2xl border border-line bg-card p-5">
              <p className="text-xs tracking-[0.16em] text-accent uppercase">
                {car.year} · {car.medium}
              </p>
              <h2 className="mt-1 font-serif text-2xl">
                {car.filmKo} <span className="text-base font-normal text-muted">({car.filmEn})</span>
              </h2>
              <p className="mt-3 font-medium">{car.carKo}</p>
              <p className="text-sm text-muted">{car.carEn}</p>
              <p className="mt-2 text-sm">
                <span className="text-muted">등장 · </span>
                {car.driver}
              </p>
              <p className="mt-2 text-sm leading-relaxed">{car.note}</p>
              {image ? (
                <figure className="mt-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={image.url} alt={`${car.filmKo}에 연결된 ${car.carKo}`} className="aspect-[16/9] w-full rounded-xl bg-hero object-cover" />
                  <figcaption className="mt-2 text-xs leading-relaxed text-muted">
                    사진: {image.author} / Wikimedia Commons · {image.license} ·{" "}
                    <a href={image.pageUrl} className="underline decoration-line underline-offset-2 hover:text-accent" rel="noopener noreferrer">
                      출처
                    </a>
                  </figcaption>
                </figure>
              ) : null}
              <p className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm">
                {model ? (
                  <Link href={`/cars/${model.slug}`} className="text-accent hover:underline">
                    우리 카탈로그 · {model.nameKo}
                  </Link>
                ) : null}
                <a href={car.source.href} className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">
                  {car.source.label}
                </a>
                <a href={partsHref(`movie-${car.id}`)} className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">
                  자동차용품
                </a>
              </p>
            </li>
          );
        })}
      </ul>
      <div className="mt-8 max-w-xl">
        <PartsCta campaign="movie-cars" />
      </div>
    </main>
  );
}
