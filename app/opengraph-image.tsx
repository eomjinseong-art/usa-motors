import { ImageResponse } from "next/og";

export const alt = '미국차 컬렉션 아카이브';
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const text = '미국차 컬렉션 아카이브클래식부터 현재까지, 미국 자동차 브랜드';
  const font = await fetch(`https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@700&text=${encodeURIComponent(text)}`)
    .then((r) => r.text())
    .then((css) => css.match(/src: url\((.+?)\)/)?.[1])
    .then((url) => (url ? fetch(url).then((r) => r.arrayBuffer()) : null))
    .catch(() => null);
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end", background: '#1A1208', color: '#E8D5A3', padding: "72px", fontFamily: "NotoKR" }}>
        <div style={{ color: '#C9A45A', fontSize: 28, letterSpacing: 6 }}>USA MOTORS ARCHIVE</div>
        <div style={{ marginTop: 24, fontSize: 76, color: '#E8D5A3' }}>미국차 컬렉션 아카이브</div>
        <div style={{ marginTop: 20, fontSize: 30, color: '#B8A57A' }}>클래식부터 현재까지, 미국 자동차 브랜드</div>
      </div>
    ),
    { ...size, fonts: font ? [{ name: "NotoKR", data: font, weight: 700 }] : [] },
  );
}
