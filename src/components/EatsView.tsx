import { useEffect, useState } from "react";
import { Clock, Heart, MapPin, Sparkles, UtensilsCrossed } from "lucide-react";
import { foods } from "../data/foods";
import { fetchCommonsImage } from "../lib/fetchCommonsImage";
import type { CommonsImage, FoodKind, FoodSpot } from "../types/destination";

const KIND_FILTERS: { id: "all" | FoodKind; label: string }[] = [
  { id: "all", label: "All" },
  { id: "filipino", label: "Filipino" },
  { id: "merienda", label: "Merienda" },
  { id: "modern", label: "Modern" },
  { id: "regional", label: "Regional" },
  { id: "cafe", label: "Cafe" },
];

const PRICE_LABEL: Record<FoodSpot["priceRange"], string> = {
  budget: "₱",
  moderate: "₱₱",
  splurge: "₱₱₱",
};

export default function EatsView({
  isSaved,
  onToggleSave,
}: {
  isSaved: (id: string) => boolean;
  onToggleSave: (id: string) => void;
}) {
  const [kind, setKind] = useState<"all" | FoodKind>("all");
  const [imageCache, setImageCache] = useState<Map<string, CommonsImage>>(new Map());

  const visible = kind === "all" ? foods : foods.filter((f) => f.kind === kind);

  useEffect(() => {
    let cancelled = false;
    const toFetch = visible.slice(0, 8).filter((f) => !imageCache.has(f.id));
    if (!toFetch.length) return;
    Promise.all(
      toFetch.map((f) =>
        fetchCommonsImage(f.imageQuery).then((img) => ({ id: f.id, img })),
      ),
    ).then((results) => {
      if (cancelled) return;
      setImageCache((prev) => {
        const next = new Map(prev);
        for (const { id, img } of results) {
          if (img) next.set(id, img);
        }
        return next;
      });
    });
    return () => {
      cancelled = true;
    };
  }, [kind, visible, imageCache]);

  return (
    <div className="absolute inset-0 flex flex-col bg-cream-strong pb-14">
      <div className="border-b border-black/5 bg-white px-4 pb-2.5 pt-5">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/10 text-accent">
            <UtensilsCrossed className="h-4 w-4" />
          </div>
          <div>
            <p className="font-serif text-xl font-semibold text-heritage">
              Saan kakain?
            </p>
            <p className="text-xs text-muted">Filipino food, ranked by story</p>
          </div>
        </div>
        <div className="-mx-2 mt-3 flex items-center gap-1.5 overflow-x-auto px-2 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {KIND_FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setKind(f.id)}
              className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                kind === f.id
                  ? "bg-heritage text-white"
                  : "bg-cream-strong text-heritage ring-1 ring-black/[0.05]"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {visible.map((spot) => {
          const img = imageCache.get(spot.id);
          const liked = isSaved(`food:${spot.id}`);
          return (
            <article
              key={spot.id}
              className="overflow-hidden rounded-2xl bg-white shadow-[0_2px_8px_-2px_rgba(15,23,42,0.08)] ring-1 ring-black/[0.04]"
            >
              <div className="relative h-36 bg-gradient-to-br from-cream-strong to-[#e7e5e4]">
                {img?.thumbUrl ? (
                  <img
                    src={img.thumbUrl}
                    alt={spot.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center font-serif text-3xl text-heritage/40">
                    {spot.initials}
                  </div>
                )}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-ink/40 to-transparent" />
                <button
                  type="button"
                  onClick={() => onToggleSave(`food:${spot.id}`)}
                  className="absolute right-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-heritage shadow-sm transition hover:scale-105"
                  aria-label={liked ? "Unsave" : "Save"}
                >
                  <Heart className={`h-3.5 w-3.5 ${liked ? "fill-accent text-accent" : ""}`} />
                </button>
                <span className="absolute bottom-2.5 left-2.5 rounded-full bg-white/95 px-2 py-0.5 text-[10px] font-bold text-heritage shadow-sm">
                  {PRICE_LABEL[spot.priceRange]}
                </span>
              </div>
              <div className="p-3.5">
                <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-accent">
                  {spot.kind}
                </p>
                <h3 className="mt-0.5 font-serif text-lg font-semibold text-heritage">
                  {spot.name}
                </h3>
                <p className="mt-1 flex items-center gap-1 text-xs text-muted">
                  <MapPin className="h-3 w-3" />
                  {spot.area}
                </p>
                <p className="mt-2 text-sm leading-snug text-ink/85">{spot.blurb}</p>
                <div className="mt-2.5 flex items-center justify-between gap-2 text-[11px]">
                  <span className="font-semibold text-heritage">
                    Order: <span className="font-normal text-ink/85">{spot.signature}</span>
                  </span>
                  {spot.hours && (
                    <span className="flex items-center gap-1 text-muted">
                      <Clock className="h-3 w-3" />
                      {spot.hours}
                    </span>
                  )}
                </div>
                {spot.storyHook && (
                  <div className="mt-2.5 flex gap-2 rounded-xl bg-accent/8 px-2.5 py-2 text-[11px] text-heritage">
                    <Sparkles className="mt-0.5 h-3 w-3 shrink-0 text-accent" />
                    <span className="italic leading-snug">{spot.storyHook}</span>
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
