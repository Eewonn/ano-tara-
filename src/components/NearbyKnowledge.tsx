import { MapPin } from "lucide-react";
import type { CommonsImage, Destination } from "../types/destination";

interface NearbyKnowledgeProps {
  nearby: Destination[];
  imageCache: Map<string, CommonsImage>;
  onSelect: (id: string) => void;
}

export default function NearbyKnowledge({
  nearby,
  imageCache,
  onSelect,
}: NearbyKnowledgeProps) {
  if (nearby.length === 0) return null;

  return (
    <section>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-heritage">
          Nearby knowledge
        </h3>
        <span className="text-xs text-muted">Tap to explore</span>
      </div>

      <div className="-mx-1 flex gap-3 overflow-x-auto px-1 pb-2">
        {nearby.map((place) => {
          const cached = imageCache.get(place.id);
          return (
            <button
              key={place.id}
              type="button"
              onClick={() => onSelect(place.id)}
              className="w-40 shrink-0 overflow-hidden rounded-xl border border-heritage/10 bg-white text-left shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="relative h-24 bg-[#e8ddd0]">
                {cached?.thumbUrl ? (
                  <img
                    src={cached.thumbUrl}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center font-serif text-2xl text-heritage/40">
                    {place.initials}
                  </div>
                )}
              </div>
              <div className="p-2.5">
                <p className="line-clamp-1 text-sm font-semibold text-heritage">
                  {place.name}
                </p>
                <p className="mt-0.5 flex items-center gap-1 text-xs text-muted">
                  <MapPin className="h-3 w-3" />
                  {place.category.replace("-", " ")}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
