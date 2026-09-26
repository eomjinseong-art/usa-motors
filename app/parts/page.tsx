import { PartsCta } from "@/components/PartsCta";
import { pageMetadata, partsHref } from "@/lib/site";

export const metadata = pageMetadata({
  title: "자동차용품",
  description: "미국차 컬렉션 아카이브에서 연결하는 자동차용품 숍 오토픽스.",
  path: "/parts",
});

export default function PartsPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8">
      <header className="mb-8 max-w-3xl">
        <p className="mb-2 text-xs tracking-[0.2em] text-accent uppercase">Parts</p>
        <h1 className="font-serif text-3xl font-semibold tracking-tight md:text-4xl">자동차용품</h1>
        <p className="mt-4 leading-relaxed text-muted">
          차의 기록은 이 아카이브에 있고, 용품은 별도 숍으로 연결합니다. 아래 버튼은 오토픽스로 이어집니다.
        </p>
      </header>
      <PartsCta campaign="parts" className="max-w-xl" />
      <p className="mt-6 text-sm">
        <a href={partsHref("parts-text")} className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">
          오토픽스 열기
        </a>
      </p>
    </main>
  );
}
