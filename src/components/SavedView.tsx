import { Heart, MapPin } from "lucide-react";
import { destinationById } from "../data/destinations";
import { foodById } from "../data/foods";

export default function SavedView({
  saved,
  onOpenStory,
  onGoTab,
}: {
  saved: Set<string>;
  onOpenStory: (id: string) => void;
  onGoTab: (tab: "stories" | "eats") => void;
}) {
  const places = [...saved]
    .filter((id) => !id.startsWith("food:"))
    .map((id) => destinationById.get(id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const foodItems = [...saved]
    .filter((id) => id.startsWith("food:"))
    .map((id) => foodById.get(id.slice(5)))
    .filter((f): f is NonNullable<typeof f> => Boolean(f));

  const empty = places.length === 0 && foodItems.length === 0;

  return (
    <div className="absolute inset-0 flex flex-col bg-cream-strong pb-14">
      <div className="border-b border-black/5 bg-white px-4 pb-3 pt-5">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/10 text-accent">
            <Heart className="h-4 w-4 fill-accent" />
          </div>
          <div>
            <p className="font-serif text-xl font-semibold text-heritage">Mga gusto mo</p>
            <p className="text-xs text-muted">
              {empty ? "Tap any heart to save it here" : `${places.length + foodItems.length} saved`}
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {empty && (
          <div className="mt-12 flex flex-col items-center gap-3 px-6 text-center">
            <Heart className="h-12 w-12 text-heritage/15" />
            <p className="font-serif text-lg text-heritage">Walang pa rito</p>
            <p className="text-sm text-muted">
              Tap the heart on any place or food spot to save it for later.
            </p>
            <div className="mt-3 flex gap-2">
              <button
                type="button"
                onClick={() => onGoTab("stories")}
                className="rounded-full bg-heritage px-4 py-2 text-xs font-semibold text-white"
              >
                Explore stories
              </button>
              <button
                type="button"
                onClick={() => onGoTab("eats")}
                className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-heritage ring-1 ring-black/[0.08]"
              >
                Browse eats
              </button>
            </div>
          </div>
        )}

        {places.length > 0 && (
          <section>
            <p className="mb-2 px-1 text-[10px] font-semibold uppercase tracking-wider text-muted">
              Places ({places.length})
            </p>
            <div className="space-y-2">
              {places.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => onOpenStory(p.id)}
                  className="flex w-full items-center gap-3 rounded-2xl bg-white p-3 text-left ring-1 ring-black/[0.04] transition hover:ring-accent/30"
                >
                  <div
                    className={`knowledge-pin ${p.category}`}
                    style={{ width: 36, height: 36, fontSize: 11 }}
                  >
                    <span>{p.initials}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-serif text-base font-semibold text-heritage">
                      {p.name}
                    </p>
                    <p className="flex items-center gap-1 text-xs text-muted">
                      <MapPin className="h-3 w-3" />
                      {p.locationLabel}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </section>
        )}

        {foodItems.length > 0 && (
          <section>
            <p className="mb-2 px-1 text-[10px] font-semibold uppercase tracking-wider text-muted">
              Food ({foodItems.length})
            </p>
            <div className="space-y-2">
              {foodItems.map((f) => (
                <div
                  key={f.id}
                  className="flex items-center gap-3 rounded-2xl bg-white p-3 ring-1 ring-black/[0.04]"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/10 font-serif text-xs font-bold text-accent">
                    {f.initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-serif text-base font-semibold text-heritage">
                      {f.name}
                    </p>
                    <p className="truncate text-xs text-muted">
                      {f.area} · {f.signature}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
