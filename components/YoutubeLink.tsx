import type { ModelVideo } from "@/lib/types";

/**
 * Lightweight YouTube link shown under a model photo.
 * No embed or autoplay: a plain link that opens YouTube in a new tab.
 * Without a verified video it falls back to a YouTube search for "<model> review".
 */
export function YoutubeLink({ video, fallbackQuery }: { video?: ModelVideo; fallbackQuery: string }) {
  const href = video
    ? `https://www.youtube.com/watch?v=${video.videoId}`
    : `https://www.youtube.com/results?search_query=${encodeURIComponent(fallbackQuery)}`;

  return (
    <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex w-fit items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-on-accent transition-colors hover:bg-accent-soft"
      >
        <span aria-hidden="true">▶</span>
        유튜브에서 보기
      </a>
      <p className="min-w-0 text-xs leading-relaxed text-muted">
        {video ? (
          <>
            <span className="text-ink">{video.title}</span> · {video.channel}
          </>
        ) : (
          <>YouTube 검색: {fallbackQuery}</>
        )}
      </p>
    </div>
  );
}
