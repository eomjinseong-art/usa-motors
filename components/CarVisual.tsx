type Kind = "sedan" | "coupe" | "truck" | "suv" | "van";

function kindFromBody(body: string, categories: string[]): Kind {
  if (categories.includes("pickup") || /픽업|랜체로|엘 카미노/.test(body)) return "truck";
  if (categories.includes("suv") || /SUV|오프로드/.test(body)) return "suv";
  if (/밴|미니밴/.test(body)) return "van";
  if (categories.includes("sports") || categories.includes("pony") || categories.includes("muscle") || /쿠페|로드스터/.test(body)) {
    return "coupe";
  }
  return "sedan";
}

export function CarVisual({
  name,
  body,
  categories,
  compact = false,
}: {
  name: string;
  body: string;
  categories: string[];
  compact?: boolean;
}) {
  const kind = kindFromBody(body, categories);
  const cabin =
    kind === "truck"
      ? "M28 78 L52 58 H92 L108 78"
      : kind === "suv" || kind === "van"
        ? "M36 78 L48 46 H118 L132 78"
        : kind === "coupe"
          ? "M40 80 L70 52 H118 L140 80"
          : "M34 80 L52 50 H130 L148 80";
  const bed = kind === "truck" ? "M108 78 H168 L172 96 H28" : "M28 80 H176";

  const frame = (
    <div
      className={`flex w-full items-center justify-center bg-hero ${compact ? "aspect-[16/9]" : "aspect-[16/9] rounded-2xl"}`}
      role="img"
      aria-label={`${name} 그래픽`}
    >
        <svg viewBox="0 0 200 120" className="h-[70%] w-[86%]" aria-hidden="true">
          <path d="M8 96 H192" stroke="#f3efe6" strokeOpacity="0.35" strokeWidth="1.2" />
          <path d={cabin} fill="none" stroke="#e7b4bc" strokeWidth="2.2" strokeLinejoin="round" />
          <path d={`${bed} V96`} fill="none" stroke="#f3efe6" strokeWidth="2.2" strokeLinejoin="round" />
          <path d="M28 96 H172" stroke="#f3efe6" strokeWidth="2.2" />
          <circle cx="58" cy="98" r="10" fill="none" stroke="#f3efe6" strokeWidth="2" />
          <circle cx="148" cy="98" r="10" fill="none" stroke="#f3efe6" strokeWidth="2" />
          <circle cx="58" cy="98" r="3" fill="#6e1e2c" />
          <circle cx="148" cy="98" r="3" fill="#6e1e2c" />
      </svg>
    </div>
  );

  if (compact) return frame;

  return (
    <figure>
      {frame}
      <figcaption>
        <p className="mt-2 text-xs leading-relaxed text-muted">
          등록된 상용 이용 가능 사진이 없어 그래픽으로 표시합니다.
        </p>
      </figcaption>
    </figure>
  );
}
