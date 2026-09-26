import { partsHref } from "@/lib/site";

export function PartsCta({ campaign, className = "" }: { campaign: string; className?: string }) {
  return (
    <a
      href={partsHref(campaign)}
      target="_blank"
      rel="noopener noreferrer"
      className={`block rounded-2xl border border-line bg-card p-5 hover:border-accent ${className}`}
    >
      <p className="text-xs tracking-[0.18em] text-accent uppercase">Parts</p>
      <p className="mt-1 font-serif text-xl">자동차용품 바로가기</p>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        관련 자동차용품 숍으로 이동합니다. 새 탭에서 열립니다.
      </p>
    </a>
  );
}
