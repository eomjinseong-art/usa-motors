"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { VisitorCounter } from "@/components/VisitorCounter";
import { BRITISH_MOTORS_URL, partsHref, SITE_NAME } from "@/lib/site";

type NavItem = { href: string; label: string; external?: boolean };

const NAV: NavItem[] = [
  { href: "/", label: "홈" },
  { href: "/brands", label: "브랜드" },
  { href: "/cars", label: "모델" },
  { href: "/furious-cars", label: "분노의 질주" },
  { href: BRITISH_MOTORS_URL, label: "영국차", external: true },
  { href: partsHref("header"), label: "자동차용품", external: true },
];

type SearchHit = {
  title: string;
  subtitle: string;
  href: string;
  kind: string;
};

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl min-w-0 items-center gap-2 px-4 py-3 sm:gap-3">
          <Link href="/" className="min-w-0 shrink">
            <span className="block truncate font-serif text-base leading-none tracking-tight sm:text-lg">
              {SITE_NAME}
            </span>
          </Link>
          <nav className="ml-4 hidden items-center gap-4 lg:flex" aria-label="주요">
            {NAV.map((item) =>
              item.external ? (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-sm text-ink hover:text-accent"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm ${
                    pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
                      ? "font-semibold text-accent"
                      : "text-ink hover:text-accent"
                  }`}
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>
          <div className="ml-auto flex min-w-0 items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="rounded-full border border-line px-3 py-1.5 text-sm hover:border-accent"
              aria-label="검색 열기"
            >
              검색
            </button>
            <VisitorCounter />
            <button
              type="button"
              className="rounded-md border border-line px-2 py-1 text-sm lg:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              onClick={() => setMenuOpen((open) => !open)}
            >
              메뉴
            </button>
          </div>
        </div>
        {menuOpen ? (
          <nav id="mobile-nav" className="grid gap-2 border-t border-line px-4 py-3 lg:hidden" aria-label="모바일">
            {NAV.map((item) =>
              item.external ? (
                <a key={item.label} href={item.href} className="py-1 text-sm" target="_blank" rel="noopener noreferrer">
                  {item.label}
                </a>
              ) : (
                <Link key={item.href} href={item.href} className="py-1 text-sm">
                  {item.label}
                </Link>
              ),
            )}
          </nav>
        ) : null}
      </header>
      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

function SearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchHit[]>([]);
  const [searching, setSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    setQuery("");
    setResults([]);
    setSearching(false);
    const timer = window.setTimeout(() => inputRef.current?.focus(), 20);
    return () => window.clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const trimmed = query.trim();
    if (!trimmed) {
      setResults([]);
      setSearching(false);
      return;
    }
    setSearching(true);
    const timer = window.setTimeout(() => {
      fetch(`/api/search?q=${encodeURIComponent(trimmed)}`)
        .then((response) => (response.ok ? response.json() : []))
        .then((data) => setResults(Array.isArray(data) ? data : []))
        .catch(() => setResults([]))
        .finally(() => setSearching(false));
    }, 120);
    return () => window.clearTimeout(timer);
  }, [query, open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <button type="button" className="absolute inset-0 bg-ink/40" aria-label="검색 닫기" onClick={onClose} />
      <div className="relative mx-auto mt-20 w-[min(100%-1.5rem,36rem)] rounded-2xl border border-line bg-card p-4 shadow-xl">
        <label htmlFor="site-search" className="sr-only">
          브랜드, 모델 검색
        </label>
        <input
          id="site-search"
          ref={inputRef}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="브랜드 · 모델 검색"
          className="w-full rounded-xl border border-line bg-paper px-4 py-3 text-base outline-none focus:ring-2 focus:ring-accent"
        />
        <SearchResults results={results} query={query} searching={searching} onNavigate={onClose} />
      </div>
    </div>
  );
}

function SearchResults({
  results,
  query,
  searching,
  onNavigate,
}: {
  results: SearchHit[];
  query: string;
  searching: boolean;
  onNavigate: () => void;
}) {
  if (!query.trim()) {
    return (
      <p className="mt-3 px-1 text-sm text-muted">
        머스탱, 콜벳, 랭글러처럼 브랜드나 모델 이름으로 찾아 보세요.
      </p>
    );
  }
  if (searching && results.length === 0) {
    return <p className="mt-3 px-1 text-sm text-muted">찾는 중…</p>;
  }
  if (results.length === 0) {
    return <p className="mt-3 px-1 text-sm text-muted">맞는 항목이 없습니다.</p>;
  }
  return (
    <ul className="mt-3 max-h-[50vh] space-y-1 overflow-y-auto">
      {results.map((hit) => (
        <li key={`${hit.kind}-${hit.href}-${hit.title}`}>
          <Link href={hit.href} onClick={onNavigate} className="block rounded-xl px-3 py-2 hover:bg-paper">
            <span className="text-xs text-accent">{hit.kind}</span>
            <span className="mt-0.5 block font-medium">{hit.title}</span>
            <span className="block text-sm text-muted">{hit.subtitle}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
