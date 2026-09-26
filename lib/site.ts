import type { Metadata } from "next";

export const SITE_URL = "https://usa-motors.vercel.app";
export const SITE_NAME = "USA Motors";
export const SITE_NAME_KO = "미국차 컬렉션 아카이브";
export const SITE_DESCRIPTION =
  "클래식부터 현재까지, 미국 자동차 브랜드와 모델 네임플레이트를 한자리에 모은 한국어 카탈로그 아카이브.";

/** Abacus visitor counter. One hit per browser per local day. */
export const ABACUS_NAMESPACE = "usa-motors";
export const ABACUS_KEY = "visits";
export const ABACUS_STORAGE_KEY = "usa-abacus-day";

export const PARTS_ORIGIN = "https://car-parts-cpang.vercel.app";

export const BRITISH_MOTORS_URL = "https://british-motors.vercel.app";
export const BOND_ARCHIVE_URL = "https://bond-archive-two.vercel.app";
export const FF_ARCHIVE_URL = "https://ff-archive.vercel.app";
export const MI_ARCHIVE_URL = "https://mi-archive.vercel.app";

export function partsHref(campaign: string) {
  const url = new URL(PARTS_ORIGIN);
  url.searchParams.set("utm_source", "usa-motors");
  url.searchParams.set("utm_medium", "cta");
  url.searchParams.set("utm_campaign", campaign);
  return url.toString();
}

export function absoluteUrl(path: string) {
  if (path === "/") return SITE_URL;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
}: {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
}): Metadata {
  const url = absoluteUrl(path);
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: "ko_KR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
