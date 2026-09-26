import type { WikiImage } from "@/lib/types";
import movieImages from "@/data/movie-images.json";

export type ScreenCar = {
  id: string;
  filmKo: string;
  filmEn: string;
  year: number;
  medium: "영화" | "TV 시리즈";
  carKo: string;
  carEn: string;
  driver: string;
  note: string;
  modelSlug: string;
  source: { label: string; href: string };
};

const images = movieImages as Record<string, WikiImage>;

/** Wikipedia-verified American cars in films and one TV series. */
export const movieCars: ScreenCar[] = [
  {
    id: "bullitt-mustang",
    filmKo: "블리트",
    filmEn: "Bullitt",
    year: 1968,
    medium: "영화",
    carKo: "1968 포드 머스탱 GT 패스트백",
    carEn: "1968 Ford Mustang GT Fastback",
    driver: "프랭크 불릿",
    note: "하이랜드 그린의 GT 패스트백 두 대가 촬영에 쓰였다. 엔진은 390 FE V8이다.",
    modelSlug: "ford-mustang",
    source: { label: "Wikipedia — Bullitt", href: "https://en.wikipedia.org/wiki/Bullitt" },
  },
  {
    id: "bullitt-charger",
    filmKo: "블리트",
    filmEn: "Bullitt",
    year: 1968,
    medium: "영화",
    carKo: "1968 닷지 차저",
    carEn: "1968 Dodge Charger",
    driver: "추격 차량",
    note: "샌프란시스코 추격에 검은 1968년 차저 두 대가 쓰였다. 위키백과는 440 매그넘 V8로 적는다.",
    modelSlug: "dodge-charger",
    source: { label: "Wikipedia — Bullitt", href: "https://en.wikipedia.org/wiki/Bullitt" },
  },
  {
    id: "eleanor",
    filmKo: "식스티 세컨즈",
    filmEn: "Gone in 60 Seconds",
    year: 2000,
    medium: "영화",
    carKo: "1967 포드 머스탱 패스트백 ‘엘리너’",
    carEn: "1967 Ford Mustang fastback “Eleanor”",
    driver: "멤피스",
    note: "작품 속 엘리너는 1967 머스탱 패스트백을 셸비 GT500처럼 꾸민 차다. 공장 GT500이 아니다.",
    modelSlug: "ford-mustang",
    source: { label: "Wikipedia — Gone in 60 Seconds (2000)", href: "https://en.wikipedia.org/wiki/Gone_in_60_Seconds_(2000_film)" },
  },
  {
    id: "smokey-trans-am",
    filmKo: "스모키 밴디트",
    filmEn: "Smokey and the Bandit",
    year: 1977,
    medium: "영화",
    carKo: "폰티액 트랜스암",
    carEn: "Pontiac Trans Am",
    driver: "밴디트",
    note: "밴디트가 모는 검은 트랜스암은 작품에서 1977년형으로 나온다. 위키백과는 촬영차가 1976년형 차체에 1977년형 앞모습을 단 차라고 적는다.",
    modelSlug: "pontiac-trans-am",
    source: { label: "Wikipedia — Smokey and the Bandit", href: "https://en.wikipedia.org/wiki/Smokey_and_the_Bandit" },
  },
  {
    id: "kitt",
    filmKo: "전격 Z작전",
    filmEn: "Knight Rider",
    year: 1982,
    medium: "TV 시리즈",
    carKo: "1982 폰티액 파이어버드 트랜스암",
    carEn: "1982 Pontiac Firebird Trans Am",
    driver: "마이클 나이트",
    note: "KITT(Knight Industries Two Thousand)의 차체는 1982년형 파이어버드 트랜스암이다. TV 시리즈다.",
    modelSlug: "pontiac-trans-am",
    source: { label: "Wikipedia — KITT", href: "https://en.wikipedia.org/wiki/KITT" },
  },
  {
    id: "bumblebee",
    filmKo: "트랜스포머",
    filmEn: "Transformers",
    year: 2007,
    medium: "영화",
    carKo: "쉐보레 카마로",
    carEn: "Chevrolet Camaro",
    driver: "범블비",
    note: "범블비는 먼저 1976년형 카마로로, 이후 2007년형 카마로로 변신한다.",
    modelSlug: "chevrolet-camaro",
    source: { label: "Wikipedia — Transformers (film)", href: "https://en.wikipedia.org/wiki/Transformers_(film)" },
  },
  {
    id: "vanishing-point",
    filmKo: "배니싱 포인트",
    filmEn: "Vanishing Point",
    year: 1971,
    medium: "영화",
    carKo: "1970 닷지 챌린저 R/T",
    carEn: "1970 Dodge Challenger R/T",
    driver: "코왈스키",
    note: "코왈스키가 샌프란시스코로 몰고 가는 흰색 1970 챌린저 R/T. 위키백과는 440 매그넘으로 적는다.",
    modelSlug: "dodge-challenger",
    source: { label: "Wikipedia — Vanishing Point (1971)", href: "https://en.wikipedia.org/wiki/Vanishing_Point_(1971_film)" },
  },
  {
    id: "christine",
    filmKo: "크리스틴",
    filmEn: "Christine",
    year: 1983,
    medium: "영화",
    carKo: "1958 플리머스 퓨리",
    carEn: "1958 Plymouth Fury",
    driver: "아니 커닝햄",
    note: "아니가 사들이는 차는 크리스틴이라는 이름의 1958년형 플리머스 퓨리다.",
    modelSlug: "plymouth-fury",
    source: { label: "Wikipedia — Christine (1983 film)", href: "https://en.wikipedia.org/wiki/Christine_(1983_film)" },
  },
  {
    id: "gran-torino",
    filmKo: "그랜 토리노",
    filmEn: "Gran Torino",
    year: 2008,
    medium: "영화",
    carKo: "1972 포드 그랜 토리노",
    carEn: "1972 Ford Gran Torino",
    driver: "월트",
    note: "월트가 아끼는 1972년형 포드 그랜 토리노. 위키백과 본문은 스포츠 트림을 적지 않는다.",
    modelSlug: "ford-torino",
    source: { label: "Wikipedia — Gran Torino", href: "https://en.wikipedia.org/wiki/Gran_Torino" },
  },
  {
    id: "thelma-louise",
    filmKo: "델마와 루이스",
    filmEn: "Thelma & Louise",
    year: 1991,
    medium: "영화",
    carKo: "1966 포드 썬더버드 컨버터블",
    carEn: "1966 Ford Thunderbird convertible",
    driver: "루이스",
    note: "루이스의 차로 지목되는 1966년형 포드 썬더버드 컨버터블.",
    modelSlug: "ford-thunderbird",
    source: { label: "Wikipedia — Thelma & Louise", href: "https://en.wikipedia.org/wiki/Thelma_%26_Louise" },
  },
];

export function moviesForModel(modelSlug: string) {
  return movieCars.filter((car) => car.modelSlug === modelSlug);
}

export function movieImage(id: string): WikiImage | undefined {
  return images[id];
}

export function movieImageRows() {
  return movieCars.flatMap((car) => {
    const image = movieImage(car.id);
    return image ? [{ id: car.id, label: `${car.filmKo} · ${car.carKo}`, image }] : [];
  });
}
