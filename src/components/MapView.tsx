import { useEffect, useMemo } from "react";
import {
  MapContainer,
  Marker,
  Polyline,
  TileLayer,
  Tooltip,
  ZoomControl,
  useMap,
  useMapEvent,
} from "react-leaflet";
import L from "leaflet";
import type { Destination, RouteStop } from "../types/destination";
import { destinationById } from "../data/destinations";

interface MapViewProps {
  places: Destination[];
  selectedId: string | null;
  routeStops: RouteStop[] | null;
  onSelect: (id: string) => void;
  onMapTap?: () => void;
}

function MapTapHandler({ onTap }: { onTap?: () => void }) {
  useMapEvent("click", () => {
    onTap?.();
  });
  return null;
}

function FlyToSelected({
  selectedId,
}: {
  selectedId: string | null;
}) {
  const map = useMap();

  useEffect(() => {
    if (!selectedId) return;
    const place = destinationById.get(selectedId);
    if (!place) return;
    map.flyTo(place.coordinates, selectedId === "intramuros" ? 16 : 17, {
      duration: 0.8,
    });
  }, [selectedId, map]);

  return null;
}

function FitToRoute({ coords }: { coords: [number, number][] }) {
  const map = useMap();
  useEffect(() => {
    if (coords.length < 2) return;
    const bounds = L.latLngBounds(coords);
    map.flyToBounds(bounds, {
      padding: [60, 60],
      maxZoom: 16,
      duration: 0.8,
    });
  }, [coords, map]);
  return null;
}

const CATEGORY_SVG: Record<string, string> = {
  heritage:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><path d="M3 21h18M5 21V10l7-5 7 5v11M9 21v-7h6v7"/></svg>',
  churches:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><path d="M10 9h4M12 7v6M6 21V11l6-4 6 4v10M9 21v-5h6v5"/></svg>',
  museums:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><path d="M3 21h18M3 10l9-6 9 6M5 21V10m4 11V10m6 11V10m4 11V10"/></svg>',
  food:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><path d="M3 3v6c0 1.7 1.3 3 3 3v9M6 3v6M9 3v6M15 12c1.7 0 3-1.3 3-3l-3-6v18"/></svg>',
  parks:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><path d="M12 2L4 14h5l-3 6h12l-3-6h5L12 2z"/></svg>',
  "hidden-gems":
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><path d="M6 3h12l4 6-10 12L2 9z"/><path d="M11 3l-2 6h6l-2-6M2 9h20"/></svg>',
};

function createPinIcon(place: Destination, selected: boolean) {
  const icon = CATEGORY_SVG[place.category] ?? `<span>${place.initials}</span>`;
  return L.divIcon({
    className: "",
    html: `<div class="knowledge-pin ${place.category}${selected ? " selected" : ""}">${icon}</div>`,
    iconSize: selected ? [38, 38] : [32, 32],
    iconAnchor: selected ? [19, 38] : [16, 32],
  });
}

function createRouteIcon(number: number) {
  return L.divIcon({
    className: "",
    html: `<div class="route-pin">${number}</div>`,
    iconSize: [26, 26],
    iconAnchor: [13, 13],
  });
}

export default function MapView({
  places,
  selectedId,
  routeStops,
  onSelect,
  onMapTap,
}: MapViewProps) {
  const routeCoords = useMemo(() => {
    if (!routeStops?.length) return [];
    const seen = new Set<string>();
    const coords: [number, number][] = [];
    for (const stop of routeStops) {
      if (seen.has(stop.destinationId)) continue;
      const c = destinationById.get(stop.destinationId)?.coordinates;
      if (!c) continue;
      seen.add(stop.destinationId);
      coords.push(c);
    }
    return coords;
  }, [routeStops]);

  const uniqueRouteStops = useMemo(() => {
    if (!routeStops?.length) return [];
    const seen = new Set<string>();
    const out: typeof routeStops = [];
    for (const stop of routeStops) {
      if (seen.has(stop.destinationId)) continue;
      if (!destinationById.has(stop.destinationId)) continue;
      seen.add(stop.destinationId);
      out.push(stop);
    }
    return out;
  }, [routeStops]);

  return (
    <MapContainer
      center={[14.59, 120.976]}
      zoom={14}
      minZoom={12}
      maxZoom={19}
      zoomControl={false}
      className="absolute inset-0 z-0 h-full w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        subdomains="abcd"
      />
      <ZoomControl position="bottomleft" />
      <FlyToSelected selectedId={selectedId} />
      <FitToRoute coords={routeCoords} />
      <MapTapHandler onTap={onMapTap} />

      {places.map((place) => (
        <Marker
          key={place.id}
          position={place.coordinates}
          icon={createPinIcon(place, place.id === selectedId)}
          eventHandlers={{
            click: () => onSelect(place.id),
          }}
          zIndexOffset={place.id === selectedId ? 1000 : 0}
        >
          <Tooltip direction="top" offset={[0, -28]} opacity={0.95}>
            {place.name}
          </Tooltip>
        </Marker>
      ))}

      {uniqueRouteStops.map((stop, index) => {
        const coords = destinationById.get(stop.destinationId)?.coordinates;
        if (!coords) return null;
        return (
          <Marker
            key={`route-${stop.destinationId}-${index}`}
            position={coords}
            icon={createRouteIcon(index + 1)}
            zIndexOffset={500}
          />
        );
      })}

      {routeCoords.length > 1 && (
        <Polyline
          positions={routeCoords}
          pathOptions={{
            color: "#FF8C42",
            weight: 4,
            opacity: 0.85,
            dashArray: "8 10",
          }}
        />
      )}
    </MapContainer>
  );
}
