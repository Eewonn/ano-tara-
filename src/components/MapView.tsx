import { useEffect, useMemo } from "react";
import {
  MapContainer,
  Marker,
  Polyline,
  TileLayer,
  Tooltip,
  ZoomControl,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import type { Destination, RouteStop } from "../types/destination";
import { destinationById } from "../data/destinations";

interface MapViewProps {
  places: Destination[];
  selectedId: string | null;
  routeStops: RouteStop[] | null;
  onSelect: (id: string) => void;
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

function createPinIcon(place: Destination, selected: boolean) {
  return L.divIcon({
    className: "",
    html: `<div class="knowledge-pin ${place.category}${selected ? " selected" : ""}"><span>${place.initials}</span></div>`,
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
