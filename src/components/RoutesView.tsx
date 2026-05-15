import { Clock, Footprints, MapPin } from "lucide-react";
import { destinations, destinationById } from "../data/destinations";
import type { Destination, RoutePlan } from "../types/destination";

interface CuratedRoute {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  badgeColor: string;
  anchor: Destination;
  plan: RoutePlan;
}

function buildCurated(): CuratedRoute[] {
  const featured: { anchorId: string; key: "quick" | "halfDay" | "fullDay"; badge: string; badgeColor: string }[] = [
    { anchorId: "intramuros", key: "fullDay", badge: "Classic", badgeColor: "bg-accent text-white" },
    { anchorId: "intramuros", key: "halfDay", badge: "Half-day", badgeColor: "bg-heritage text-white" },
    { anchorId: "binondo", key: "halfDay", badge: "Foodie", badgeColor: "bg-brick text-white" },
    { anchorId: "escolta", key: "quick", badge: "Hidden gem", badgeColor: "bg-leaf text-white" },
    { anchorId: "quiapo-church", key: "halfDay", badge: "Devotion", badgeColor: "bg-gold text-white" },
  ];
  return featured
    .map((f) => {
      const anchor = destinationById.get(f.anchorId);
      if (!anchor) return null;
      const plan = anchor.routes[f.key];
      return {
        id: `${f.anchorId}-${f.key}`,
        title: plan.title,
        subtitle: anchor.name,
        badge: f.badge,
        badgeColor: f.badgeColor,
        anchor,
        plan,
      };
    })
    .filter((r): r is CuratedRoute => Boolean(r));
}

export default function RoutesView({
  onStartRoute,
}: {
  onStartRoute: (anchorId: string, plan: RoutePlan) => void;
}) {
  const routes = buildCurated();
  return (
    <div className="absolute inset-0 flex flex-col bg-cream-strong pb-14">
      <div className="border-b border-black/5 bg-white px-4 pb-3 pt-5">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-leaf/15 text-leaf">
            <Footprints className="h-4 w-4" />
          </div>
          <div>
            <p className="font-serif text-xl font-semibold text-heritage">
              Tara, lakad tayo
            </p>
            <p className="text-xs text-muted">Curated walking routes through Manila stories</p>
          </div>
        </div>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {routes.map((r) => {
          const visibleStops = r.plan.stops.filter((s, i, arr) => {
            return arr.findIndex((x) => x.destinationId === s.destinationId) === i;
          });
          return (
            <article
              key={r.id}
              className="overflow-hidden rounded-2xl bg-white shadow-[0_2px_8px_-2px_rgba(15,23,42,0.08)] ring-1 ring-black/[0.04]"
            >
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <span
                      className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${r.badgeColor}`}
                    >
                      {r.badge}
                    </span>
                    <h3 className="mt-1.5 font-serif text-lg font-semibold leading-tight text-heritage">
                      {r.title}
                    </h3>
                    <p className="text-xs text-muted">Starts at {r.subtitle}</p>
                  </div>
                </div>

                <div className="mt-3 flex gap-3 text-xs text-muted">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-accent" />
                    {r.plan.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-leaf" />
                    {visibleStops.length} stops
                  </span>
                </div>

                <p className="mt-2.5 text-sm leading-snug text-ink/85">
                  {r.plan.walkingNote}
                </p>

                <ol className="mt-3 space-y-1.5">
                  {visibleStops.map((stop, i) => (
                    <li
                      key={stop.destinationId}
                      className="flex items-start gap-2 text-[12px] text-ink/85"
                    >
                      <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-cream-strong text-[9px] font-bold text-heritage">
                        {i + 1}
                      </span>
                      <span className="leading-snug">
                        <span className="font-semibold text-heritage">{stop.label}</span>{" "}
                        <span className="text-muted">· {stop.duration}</span>
                      </span>
                    </li>
                  ))}
                </ol>

                <button
                  type="button"
                  onClick={() => onStartRoute(r.anchor.id, r.plan)}
                  className="mt-3 w-full rounded-xl bg-heritage py-2.5 text-sm font-semibold text-white transition hover:bg-ink"
                >
                  Show on map
                </button>
              </div>
            </article>
          );
        })}

        <p className="px-2 pb-2 pt-1 text-center text-[11px] text-muted">
          {destinations.length} places · more routes coming
        </p>
      </div>
    </div>
  );
}
