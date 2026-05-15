import { ArrowLeft, Clock, Footprints, MapPin, Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { Destination, RoutePlan, RouteStop } from "../types/destination";
import { destinationById } from "../data/destinations";

type RouteKey = "quick" | "halfDay" | "fullDay";

const ROUTE_OPTIONS: { key: RouteKey; label: string; sub: string }[] = [
  { key: "quick", label: "Quick", sub: "~1 hour" },
  { key: "halfDay", label: "Half-day", sub: "3–4 hrs" },
  { key: "fullDay", label: "Full-day", sub: "6–8 hrs" },
];

interface RoutePlannerProps {
  destination: Destination;
  onBack: () => void;
  onRouteSelect: (stops: RouteStop[]) => void;
}

export default function RoutePlanner({
  destination,
  onBack,
  onRouteSelect,
}: RoutePlannerProps) {
  const [activeRoute, setActiveRoute] = useState<RouteKey>("halfDay");

  const plan: RoutePlan = destination.routes[activeRoute];

  const validStops = useMemo(() => {
    const seen = new Set<string>();
    const out: { stop: RouteStop; place?: Destination }[] = [];
    for (const stop of plan.stops) {
      if (seen.has(stop.destinationId)) continue;
      seen.add(stop.destinationId);
      out.push({ stop, place: destinationById.get(stop.destinationId) });
    }
    return out;
  }, [plan]);

  const handleRouteChange = (key: RouteKey) => {
    setActiveRoute(key);
    onRouteSelect(destination.routes[key].stops);
  };

  useEffect(() => {
    onRouteSelect(destination.routes.halfDay.stops);
    setActiveRoute("halfDay");
  }, [destination, onRouteSelect]);

  return (
    <div className="flex h-full flex-col -m-5">
      <div className="flex items-center justify-between border-b border-black/5 bg-white px-4 py-3">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm font-semibold text-heritage hover:text-accent"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
        <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-leaf">
          <Footprints className="h-3 w-3" />
          Walking route
        </div>
      </div>

      <div className="border-b border-black/5 bg-gradient-to-br from-leaf/8 via-cream-strong to-white px-4 py-4">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-leaf">
          Tara? Lakad tayo
        </p>
        <h2 className="font-serif text-xl font-semibold leading-tight text-heritage">
          Manila route from {destination.name}
        </h2>
        <div className="mt-3 grid grid-cols-3 gap-1.5">
          {ROUTE_OPTIONS.map((opt) => (
            <button
              key={opt.key}
              type="button"
              onClick={() => handleRouteChange(opt.key)}
              className={`flex flex-col items-center rounded-xl px-2 py-2 transition ${
                activeRoute === opt.key
                  ? "bg-heritage text-white shadow-sm"
                  : "bg-white text-heritage ring-1 ring-black/[0.06]"
              }`}
            >
              <span className="text-xs font-semibold">{opt.label}</span>
              <span
                className={`text-[10px] ${
                  activeRoute === opt.key ? "text-white/75" : "text-muted"
                }`}
              >
                {opt.sub}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        <div className="rounded-2xl bg-white p-4 ring-1 ring-black/[0.05]">
          <h3 className="font-serif text-lg font-semibold text-heritage">
            {plan.title}
          </h3>
          <div className="mt-1.5 flex flex-wrap gap-3 text-xs text-muted">
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5 text-accent" />
              {plan.duration}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5 text-leaf" />
              {validStops.length} stops
            </span>
          </div>
          <div className="mt-2.5 flex gap-2 rounded-xl bg-leaf/8 px-3 py-2 text-[12px] text-heritage">
            <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-leaf" />
            <span className="italic leading-snug">{plan.walkingNote}</span>
          </div>
        </div>

        <ol className="relative space-y-3 pl-2">
          <span className="absolute left-[18px] top-3 bottom-3 w-0.5 bg-accent/25" />
          {validStops.map(({ stop, place }, index) => (
            <li
              key={`${stop.destinationId}-${index}`}
              className="relative flex gap-3 rounded-2xl bg-white p-3 ring-1 ring-black/[0.04]"
            >
              <span className="z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-white shadow-sm">
                {index + 1}
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-serif text-base font-semibold leading-tight text-heritage">
                  {stop.label}
                </p>
                <p className="mt-0.5 flex items-center gap-1 text-[11px] text-muted">
                  <Clock className="h-3 w-3" />
                  {stop.duration}
                  {place && (
                    <>
                      <span className="mx-1">·</span>
                      <MapPin className="h-3 w-3" />
                      {place.locationLabel.split(",")[0]}
                    </>
                  )}
                </p>
                <p className="mt-1.5 text-[13px] leading-snug text-ink/85">
                  {stop.reason}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
