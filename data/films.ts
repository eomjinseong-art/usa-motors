import type { FilmCar } from "@/lib/types";
import { FF_ARCHIVE_URL } from "@/lib/site";

/** American vehicles listed on ff-archive. URLs checked against the live sitemap. */
export const furiousCars: FilmCar[] = [
  { ffSlug: "charger-rt-1970", titleKo: "1970 닷지 차저 R/T", titleEn: "1970 Dodge Charger R/T", modelSlug: "dodge-charger", note: "시리즈 초기의 차저 R/T. 아카이브 등재명 기준." },
  { ffSlug: "charger-rt-rebuilt", titleKo: "재건된 1970 닷지 차저 R/T", titleEn: "Rebuilt 1970 Dodge Charger R/T", modelSlug: "dodge-charger", note: "1970 차저 R/T의 재건 차량으로 등재돼 있다." },
  { ffSlug: "charger-rt-1970-x", titleKo: "1970 닷지 차저 R/T", titleEn: "1970 Dodge Charger R/T", modelSlug: "dodge-charger", note: "패스트 X 아카이브 항목의 1970 차저 R/T." },
  { ffSlug: "charger-1967", titleKo: "1967 닷지 차저", titleEn: "1967 Dodge Charger", modelSlug: "dodge-charger", note: "1967년형 차저로 등재된 항목." },
  { ffSlug: "charger-daytona-1969", titleKo: "1969 닷지 차저 데이토나 레플리카", titleEn: "1969 Dodge Charger Daytona Replica", modelSlug: "dodge-charger", note: "차저 데이토나 레플리카. 1980년대 닷지 데이토나와는 다른 차다." },
  { ffSlug: "charger-2010", titleKo: "2010 닷지 차저", titleEn: "2010 Dodge Charger", modelSlug: "dodge-charger", note: "LX 세대 차저로 등재된 항목." },
  { ffSlug: "charger-f7-offroad", titleKo: "오프로드 닷지 차저", titleEn: "Off-road Dodge Charger", modelSlug: "dodge-charger", note: "오프로드 사양의 차저로 등재돼 있다." },
  { ffSlug: "charger-f7-la", titleKo: "닷지 차저", titleEn: "Dodge Charger", modelSlug: "dodge-charger", note: "분노의 질주 7 아카이브 항목의 차저." },
  { ffSlug: "charger-dom-f8", titleKo: "돔의 차저", titleEn: "Dom's Charger", modelSlug: "dodge-charger", note: "아카이브가 ‘돔의 차저’로 구분한 항목." },
  { ffSlug: "charger-mid-f9", titleKo: "미드십 닷지 차저", titleEn: "Mid-engine Dodge Charger", modelSlug: "dodge-charger", note: "양산 차저와 구동 배치가 다른 촬영용 차량으로 등재돼 있다." },
  { ffSlug: "charger-hellcat-f9", titleKo: "2020 닷지 차저 SRT 헬캣 와이드보디", titleEn: "2020 Dodge Charger SRT Hellcat Widebody", modelSlug: "dodge-charger", note: "헬캣 와이드보디 차저." },
  { ffSlug: "charger-hellcat-redeye-x", titleKo: "2023 닷지 차저 SRT 헬캣 레디아이", titleEn: "2023 Dodge Charger SRT Hellcat Redeye", modelSlug: "dodge-charger", note: "헬캣 레드아이 차저." },
  { ffSlug: "charger-torred-2022", titleKo: "2022 토레드 닷지 차저 R/T", titleEn: "2022 TorRed Dodge Charger R/T", modelSlug: "dodge-charger", note: "토레드 외장의 2022년형 차저 R/T." },
  { ffSlug: "challenger-rt", titleKo: "1970 닷지 챌린저 R/T", titleEn: "1970 Dodge Challenger R/T", modelSlug: "dodge-challenger", note: "1970년형 챌린저 R/T." },
  { ffSlug: "challenger-srt-2015", titleKo: "2015 닷지 챌린저 SRT", titleEn: "2015 Dodge Challenger SRT", modelSlug: "dodge-challenger", note: "LC 세대 챌린저 SRT." },
  { ffSlug: "viper-srt10", titleKo: "2003 닷지 바이퍼 SRT-10", titleEn: "2003 Dodge Viper SRT-10", modelSlug: "dodge-viper", note: "SRT-10 바이퍼." },
  { ffSlug: "yenko-camaro", titleKo: "1969 쉐보레 옌코 카마로 SYC", titleEn: "1969 Chevrolet Yenko Camaro SYC", modelSlug: "chevrolet-camaro", note: "옌코 시리얼 카마로. 양산 카마로 페이지로 연결한다." },
  { ffSlug: "camaro-f7-1968", titleKo: "1968 쉐보레 카마로 Z/28", titleEn: "1968 Chevrolet Camaro Z/28", modelSlug: "chevrolet-camaro", note: "1세대 카마로 Z/28." },
  { ffSlug: "monte-carlo", titleKo: "1971 쉐보레 몬테카를로", titleEn: "1971 Chevrolet Monte Carlo", modelSlug: "chevrolet-monte-carlo", note: "1971년형 몬테카를로." },
  { ffSlug: "chevelle-ss-1970", titleKo: "1970 쉐보레 셰벨 SS", titleEn: "1970 Chevrolet Chevelle SS", modelSlug: "chevrolet-chevelle", note: "1970년형 셰벨 SS." },
  { ffSlug: "impala-1961", titleKo: "1961 쉐보레 임팔라", titleEn: "1961 Chevrolet Impala", modelSlug: "chevrolet-impala", note: "1961년형 임팔라." },
  { ffSlug: "mustang-1967", titleKo: "1967 포드 머스탱 패스트백", titleEn: "1967 Ford Mustang Fastback", modelSlug: "ford-mustang", note: "1세대 머스탱 패스트백." },
  { ffSlug: "mustang-foxbody-1992", titleKo: "1992 포드 머스탱 폭스바디", titleEn: "1992 Ford Mustang Foxbody", modelSlug: "ford-mustang", note: "폭스바디 머스탱." },
  { ffSlug: "ford-gt40", titleKo: "포드 GT40", titleEn: "Ford GT40", modelSlug: "ford-gt40", note: "GT40로 등재된 항목. 2005년 포드 GT와는 다른 차다." },
  { ffSlug: "fairlane-1956", titleKo: "1956 포드 페어레인 크라운 빅토리아", titleEn: "1956 Ford Fairlane Crown Victoria", modelSlug: "ford-fairlane", note: "페어레인 크라운 빅토리아. 1992년 이후의 크라운 빅토리아와는 다른 차다." },
  { ffSlug: "torino-sport-1972", titleKo: "1972 포드 토리노 스포츠", titleEn: "1972 Ford Torino Sport", modelSlug: "ford-torino", note: "1972년형 토리노 스포츠." },
  { ffSlug: "road-runner", titleKo: "1970 플리머스 로드 러너", titleEn: "1970 Plymouth Road Runner", modelSlug: "plymouth-road-runner", note: "1970년형 로드 러너." },
  { ffSlug: "gtx-1971", titleKo: "1971 플리머스 GTX", titleEn: "1971 Plymouth GTX", modelSlug: "plymouth-gtx", note: "1971년형 GTX." },
  { ffSlug: "fiero-f9", titleKo: "폰티액 피에로", titleEn: "Pontiac Fiero", modelSlug: "pontiac-fiero", note: "피에로로 등재된 항목." },
];

export function ffCarUrl(slug: string) {
  return `${FF_ARCHIVE_URL}/cars/${slug}`;
}

export function filmsForModel(modelSlug: string) {
  return furiousCars.filter((car) => car.modelSlug === modelSlug);
}
