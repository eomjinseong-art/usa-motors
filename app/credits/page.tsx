import { brands, getImage, models } from "@/lib/catalog";
import { pageMetadata } from "@/lib/site";
import type { WikiImage } from "@/lib/types";

export const metadata = pageMetadata({
  title: "사진 크레딧",
  description: "미국차 컬렉션 아카이브에 쓴 위키미디어 공용 사진의 작가와 라이선스. 퍼블릭 도메인, CC0, CC BY, CC BY-SA만 사용합니다.",
  path: "/credits",
});

export default function CreditsPage() {
  const rows: { slug: string; label: string; image: WikiImage }[] = [];
  for (const brand of brands) {
    const image = getImage(`brand-${brand.slug}`);
    if (image) rows.push({ slug: brand.slug, label: `${brand.nameKo} 로고`, image });
  }
  for (const model of models) {
    const image = getImage(model.slug);
    if (image) rows.push({ slug: model.slug, label: model.nameKo, image });
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8">
      <header className="mb-8 max-w-3xl">
        <p className="mb-2 text-xs tracking-[0.2em] text-accent uppercase">Credits</p>
        <h1 className="font-serif text-3xl font-semibold tracking-tight md:text-4xl">사진 크레딧</h1>
        <p className="mt-4 leading-relaxed text-muted">
          사진과 로고는 위키미디어 공용에서 가져왔습니다. 라이선스가 퍼블릭 도메인, CC0, CC BY, CC BY-SA인 파일만
          실었습니다. 조건에 맞는 사진이 없으면 그래픽으로 대신합니다. 이 사이트는 비공식 팬사이트이며 제조사와 제휴하지
          않습니다. 상표는 각 권리자의 소유입니다.
        </p>
        <p className="mt-3 text-sm text-muted">등록된 사진 {rows.length}장.</p>
      </header>
      <div className="overflow-x-auto rounded-2xl border border-line">
        <table className="w-full min-w-[40rem] text-left text-sm">
          <thead className="bg-card">
            <tr>
              <th className="px-4 py-3 font-medium">항목</th>
              <th className="px-4 py-3 font-medium">작가</th>
              <th className="px-4 py-3 font-medium">라이선스</th>
              <th className="px-4 py-3 font-medium">파일</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.slug} className="border-t border-line">
                <td className="px-4 py-3">{row.label}</td>
                <td className="px-4 py-3 text-muted">{row.image.author}</td>
                <td className="px-4 py-3 text-muted">
                  {row.image.licenseUrl ? (
                    <a href={row.image.licenseUrl} className="underline underline-offset-2 hover:text-accent" target="_blank" rel="noopener noreferrer">
                      {row.image.license}
                    </a>
                  ) : (
                    row.image.license
                  )}
                </td>
                <td className="px-4 py-3">
                  <a href={row.image.pageUrl} className="underline underline-offset-2 hover:text-accent" target="_blank" rel="noopener noreferrer">
                    출처
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
