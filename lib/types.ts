export const CATEGORIES = [
  { id: "muscle", label: "머슬카" },
  { id: "pony", label: "포니카" },
  { id: "pickup", label: "픽업트럭" },
  { id: "suv", label: "SUV" },
  { id: "sedan", label: "세단" },
  { id: "sports", label: "스포츠카" },
  { id: "ev", label: "전기차" },
] as const;

export type CategoryId = (typeof CATEGORIES)[number]["id"];

export type Generation = {
  id: string;
  heading: string;
  years: string;
  code?: string;
  summary: string;
  points: string[];
};

export type ModelVideo = {
  /** Verified YouTube video ID. */
  videoId: string;
  title: string;
  channel: string;
};

export type Model = {
  slug: string;
  brand: string;
  nameKo: string;
  nameEn: string;
  years: string;
  body: string;
  categories: CategoryId[];
  summary: string;
  editorial: string[];
  specs: { label: string; value: string }[];
  sources: { label: string; href: string }[];
  imageQuery: string;
  generations?: Generation[];
  video?: ModelVideo;
};

export type Brand = {
  slug: string;
  nameKo: string;
  nameEn: string;
  status: "current" | "defunct";
  founded: string;
  ended?: string;
  hq: string;
  summary: string;
  editorial: string[];
  imageQuery: string;
};

export type WikiImage = {
  url: string;
  pageUrl: string;
  author: string;
  license: string;
  licenseUrl?: string;
  title: string;
};

export type FilmCar = {
  ffSlug: string;
  titleKo: string;
  titleEn: string;
  modelSlug?: string;
  note: string;
};
