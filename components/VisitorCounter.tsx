"use client";

import { useEffect, useState } from "react";
import { ABACUS_KEY, ABACUS_NAMESPACE, ABACUS_STORAGE_KEY } from "@/lib/site";

export function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const today = new Date().toLocaleDateString("en-CA");
    const already = window.localStorage.getItem(ABACUS_STORAGE_KEY) === today;
    const mode = already ? "get" : "hit";
    fetch(`https://abacus.jasoncameron.dev/${mode}/${ABACUS_NAMESPACE}/${ABACUS_KEY}`)
      .then((response) => {
        if (!response.ok) throw new Error("abacus");
        return response.json();
      })
      .then((data: { value?: number }) => {
        if (typeof data.value === "number") {
          setCount(data.value);
          if (!already) window.localStorage.setItem(ABACUS_STORAGE_KEY, today);
        }
      })
      .catch(() => setCount(null));
  }, []);

  return (
    <span
      className="inline-flex items-center gap-1 text-sm text-muted tabular-nums"
      title="오늘 한 번만 집계되는 방문 수"
      aria-label={count == null ? "방문 수 불러오는 중" : `방문 ${count.toLocaleString("ko-KR")}`}
    >
      <span aria-hidden="true">👁</span>
      <span>{count == null ? "—" : count.toLocaleString("ko-KR")}</span>
    </span>
  );
}
