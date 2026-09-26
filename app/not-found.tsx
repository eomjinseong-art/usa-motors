import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-16">
      <h1 className="font-serif text-3xl">페이지를 찾지 못했습니다</h1>
      <p className="mt-3 text-muted">주소가 바뀌었거나 카탈로그에 없는 항목입니다.</p>
      <Link href="/" className="mt-6 inline-block text-accent hover:underline">
        홈으로
      </Link>
    </main>
  );
}
