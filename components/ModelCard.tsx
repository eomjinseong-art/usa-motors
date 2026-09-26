import Link from "next/link";
import { CarVisual } from "@/components/CarVisual";
import type { Model, WikiImage } from "@/lib/types";
import { brandBySlug } from "@/lib/catalog";

export function ModelCard({ model, image }: { model: Model; image?: WikiImage }) {
  const brand = brandBySlug(model.brand);
  return (
    <Link href={`/cars/${model.slug}`} className="group block overflow-hidden rounded-2xl border border-line bg-card">
      {image ? (
        // Wikimedia thumbs are already sized; next/image is unnecessary for static catalog cards.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image.url}
          alt={`${model.nameKo} (${model.nameEn})`}
          className="aspect-[16/9] w-full object-cover transition group-hover:scale-[1.02]"
          loading="lazy"
        />
      ) : (
        <CarVisual compact name={model.nameKo} body={model.body} categories={model.categories} />
      )}
      <div className="p-4">
        <p className="text-xs tracking-wide text-accent">
          {brand?.nameEn ?? model.brand} · {model.years}
        </p>
        <h2 className="mt-1 font-serif text-xl group-hover:text-accent">{model.nameKo}</h2>
        <p className="mt-1 text-sm text-muted">{model.nameEn}</p>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">{model.summary}</p>
        {image ? (
          <p className="mt-3 truncate text-[11px] text-muted">사진: {image.author}</p>
        ) : null}
      </div>
    </Link>
  );
}
