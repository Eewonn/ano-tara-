import { useState } from "react";
import { Camera, X } from "lucide-react";
import type { CommonsImage } from "../types/destination";

export default function PhotoGallery({ images }: { images: CommonsImage[] }) {
  const [lightbox, setLightbox] = useState<number | null>(null);
  if (images.length < 2) return null;

  return (
    <section>
      <div className="mb-2.5 flex items-center justify-between">
        <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-heritage">
          <Camera className="h-3.5 w-3.5 text-accent" />
          More photos · Mga retrato
        </p>
        <span className="text-[10px] text-muted">{images.length} from Commons</span>
      </div>
      <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {images.map((img, i) => (
          <button
            key={img.imageUrl + i}
            type="button"
            onClick={() => setLightbox(i)}
            className="relative h-24 w-32 shrink-0 overflow-hidden rounded-xl bg-cream-strong ring-1 ring-black/[0.06] transition hover:ring-accent/40"
          >
            <img
              src={img.thumbUrl}
              alt={img.title}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </button>
        ))}
      </div>

      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[2000] flex items-center justify-center bg-ink/85 p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-heritage"
            onClick={() => setLightbox(null)}
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
          <figure className="max-h-full max-w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={images[lightbox].imageUrl || images[lightbox].thumbUrl}
              alt={images[lightbox].title}
              className="max-h-[78vh] max-w-full rounded-xl object-contain"
            />
            <figcaption className="mt-2 text-center text-[11px] text-cream/85">
              {images[lightbox].author && `${images[lightbox].author} · `}
              {images[lightbox].license ?? "Wikimedia Commons"}
            </figcaption>
            <div className="mt-3 flex justify-center gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightbox(i);
                  }}
                  className={`h-1.5 rounded-full transition-all ${
                    i === lightbox ? "w-6 bg-white" : "w-1.5 bg-white/40"
                  }`}
                  aria-label={`Photo ${i + 1}`}
                />
              ))}
            </div>
          </figure>
        </div>
      )}
    </section>
  );
}
