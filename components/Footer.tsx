import Link from "next/link";
import { PartsCta } from "@/components/PartsCta";
import {
  BOND_ARCHIVE_URL,
  BRITISH_MOTORS_URL,
  FF_ARCHIVE_URL,
  MI_ARCHIVE_URL,
  partsHref,
  SITE_NAME,
} from "@/lib/site";

const ARCHIVE_LINKS = [
  { href: BRITISH_MOTORS_URL, label: "영국차 아카이브" },
  { href: BOND_ARCHIVE_URL, label: "007 아카이브" },
  { href: FF_ARCHIVE_URL, label: "분노의 질주 아카이브" },
  { href: MI_ARCHIVE_URL, label: "미션 임파서블 아카이브" },
];

export function Footer() {
  return (
    <footer className="mt-16 border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="font-serif text-lg">{SITE_NAME}</p>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
            클래식부터 현재까지 미국 자동차 네임플레이트를 정리한 한국어 카탈로그 아카이브입니다.
            비공식 팬사이트이며, 어떤 제조사와도 제휴·후원·승인 관계가 없습니다. 상표와 로고는 각 권리자의 소유입니다.
          </p>
          <nav className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm" aria-label="바닥">
            <Link href="/brands" className="hover:text-accent">
              브랜드
            </Link>
            <Link href="/cars" className="hover:text-accent">
              모델
            </Link>
            <Link href="/furious-cars" className="hover:text-accent">
              분노의 질주
            </Link>
            <Link href="/movie-cars" className="hover:text-accent">
              영화 속 미국차
            </Link>
            <Link href="/credits" className="hover:text-accent">
              사진 크레딧
            </Link>
            <a href={partsHref("footer")} className="hover:text-accent" target="_blank" rel="noopener noreferrer">
              자동차용품
            </a>
          </nav>
          <nav className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted" aria-label="자매 아카이브">
            {ARCHIVE_LINKS.map((item) => (
              <a key={item.href} href={item.href} className="hover:text-accent" target="_blank" rel="noopener noreferrer">
                {item.label}
              </a>
            ))}
          </nav>
        </div>
        <PartsCta campaign="footer" />
      </div>
    </footer>
  );
}
