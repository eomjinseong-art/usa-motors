const COUPANG_PARTNERS_URL = "https://link.coupang.com/a/hsdzLh1vB6";

/** 하단 쿠팡 파트너스 배너 (광고). 링크는 수익 추적용이므로 수정하지 마세요. */
export function CoupangBanner({ className = "" }: { className?: string }) {
  return (
    <aside aria-label="광고" className={`mx-auto max-w-6xl px-4 pt-8 ${className}`}>
      <a
        href={COUPANG_PARTNERS_URL}
        target="_blank"
        rel="sponsored noopener noreferrer nofollow"
        className="flex items-center gap-3 rounded-sm border border-line bg-card px-4 py-3 text-sm text-ink transition-colors hover:border-accent hover:text-accent"
      >
        <span className="shrink-0 rounded-sm border border-line px-1.5 py-0.5 text-[10px] tracking-wider text-muted">
          광고
        </span>
        <span className="min-w-0 flex-1">트렁크 넉넉한 미국차처럼, 장바구니도 넉넉하게 · 쿠팡 둘러보기</span>
        <span aria-hidden="true" className="shrink-0 text-accent">
          →
        </span>
      </a>
      <p className="mt-2 text-[11px] leading-5 text-muted">
        이 게시물은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.
      </p>
    </aside>
  );
}
