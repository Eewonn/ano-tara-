import { useCallback, useEffect, useMemo, useState } from "react";
import MapView from "./components/MapView";
import TopNav from "./components/TopNav";
import DestinationPanel, { type PanelView } from "./components/DestinationPanel";
import BottomTabs from "./components/BottomTabs";
import EatsView from "./components/EatsView";
import RoutesView from "./components/RoutesView";
import SavedView from "./components/SavedView";
import Onboarding, { shouldShowOnboarding } from "./components/Onboarding";
import {
  destinationById,
  getNearbyDestinations,
} from "./data/destinations";
import { filterDestinations } from "./lib/filterDestinations";
import { fetchCommonsImage } from "./lib/fetchCommonsImage";
import { fetchCommonsGallery } from "./lib/fetchCommonsGallery";
import { fetchHistoricImage } from "./lib/fetchHistoricImage";
import { useSaved } from "./lib/useSaved";
import type {
  AppTab,
  CommonsImage,
  FilterChip,
  RoutePlan,
  RouteStop,
} from "./types/destination";

const DEFAULT_ID = "intramuros";

export default function App() {
  const [tab, setTab] = useState<AppTab>("stories");
  const [showOnboarding, setShowOnboarding] = useState(() => shouldShowOnboarding());
  const [selectedId, setSelectedId] = useState<string | null>(DEFAULT_ID);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterChip>("all");
  const [panelView, setPanelView] = useState<PanelView>("place");
  const [panelOpen, setPanelOpen] = useState(true);
  const [imageCache, setImageCache] = useState<Map<string, CommonsImage>>(
    () => new Map(),
  );
  const [historicCache, setHistoricCache] = useState<Map<string, CommonsImage | null>>(
    () => new Map(),
  );
  const [galleryCache, setGalleryCache] = useState<Map<string, CommonsImage[]>>(
    () => new Map(),
  );
  const [imageLoading, setImageLoading] = useState(false);
  const [routeStops, setRouteStops] = useState<RouteStop[] | null>(null);
  const { saved, toggle, isSaved } = useSaved();

  const visiblePlaces = useMemo(
    () => filterDestinations(searchQuery, activeFilter),
    [searchQuery, activeFilter],
  );

  const selected = selectedId ? destinationById.get(selectedId) : undefined;

  useEffect(() => {
    if (!selectedId) return;
    const stillVisible = visiblePlaces.some((p) => p.id === selectedId);
    if (!stillVisible) {
      setSelectedId(null);
      setPanelOpen(false);
      setRouteStops(null);
    }
  }, [visiblePlaces, selectedId]);

  useEffect(() => {
    if (!selectedId || imageCache.has(selectedId)) return;

    let cancelled = false;
    const place = destinationById.get(selectedId);
    if (!place) return;

    setImageLoading(true);
    fetchCommonsImage(place.imageQuery).then((result) => {
      if (cancelled) return;
      if (result) {
        setImageCache((prev) => {
          const next = new Map(prev);
          next.set(selectedId, result);
          return next;
        });
        if (!historicCache.has(selectedId)) {
          fetchHistoricImage(place.imageQuery, result.imageUrl).then((hist) => {
            if (cancelled) return;
            setHistoricCache((prev) => {
              const next = new Map(prev);
              next.set(selectedId, hist);
              return next;
            });
          });
        }
      }
      setImageLoading(false);
    });

    if (!galleryCache.has(selectedId)) {
      fetchCommonsGallery(place.imageQuery, 6).then((gallery) => {
        if (cancelled) return;
        setGalleryCache((prev) => {
          const next = new Map(prev);
          next.set(selectedId, gallery);
          return next;
        });
      });
    }

    return () => {
      cancelled = true;
    };
  }, [selectedId, imageCache, historicCache, galleryCache]);

  const handleSelect = useCallback((id: string) => {
    setSelectedId(id);
    setPanelOpen(true);
    setPanelView("place");
    setRouteStops(null);
  }, []);

  const handleRouteSelect = useCallback((stops: RouteStop[]) => {
    setRouteStops(stops);
  }, []);

  const handleStartCuratedRoute = useCallback(
    (anchorId: string, plan: RoutePlan) => {
      setTab("stories");
      setSelectedId(anchorId);
      setPanelOpen(true);
      setPanelView("route");
      setRouteStops(plan.stops);
    },
    [],
  );

  const handleOpenStory = useCallback((id: string) => {
    setTab("stories");
    handleSelect(id);
  }, [handleSelect]);

  const nearby = selected ? getNearbyDestinations(selected.id) : [];

  return (
    <div className="relative flex h-full w-full overflow-hidden bg-cream-strong">
      {tab === "stories" && (
        <div className="relative min-w-0 flex-1">
          <MapView
            places={visiblePlaces}
            selectedId={selectedId}
            routeStops={routeStops}
            onSelect={handleSelect}
          />
          <TopNav
            searchQuery={searchQuery}
            activeFilter={activeFilter}
            visibleCount={visiblePlaces.length}
            onSearchChange={setSearchQuery}
            onFilterChange={setActiveFilter}
          />

          {!panelOpen && (
            <button
              type="button"
              onClick={() => {
                setPanelOpen(true);
                if (!selectedId) handleSelect(DEFAULT_ID);
              }}
              className="absolute bottom-[72px] left-1/2 z-[500] -translate-x-1/2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-lg"
            >
              Open place story
            </button>
          )}

          {panelOpen && selected && (
            <DestinationPanel
              destination={selected}
              panelView={panelView}
              image={imageCache.get(selected.id)}
              historicImage={historicCache.get(selected.id) ?? undefined}
              gallery={galleryCache.get(selected.id) ?? []}
              imageLoading={imageLoading && !imageCache.has(selected.id)}
              imageCache={imageCache}
              nearby={nearby}
              saved={isSaved(selected.id)}
              onToggleSave={() => toggle(selected.id)}
              onClose={() => setPanelOpen(false)}
              onSelectNearby={handleSelect}
              onPanelViewChange={setPanelView}
              onRouteSelect={handleRouteSelect}
            />
          )}
        </div>
      )}

      {tab === "eats" && <EatsView isSaved={isSaved} onToggleSave={toggle} />}

      {tab === "routes" && <RoutesView onStartRoute={handleStartCuratedRoute} />}

      {tab === "saved" && (
        <SavedView saved={saved} onOpenStory={handleOpenStory} onGoTab={setTab} />
      )}

      <BottomTabs active={tab} onChange={setTab} savedCount={saved.size} />

      {showOnboarding && <Onboarding onDone={() => setShowOnboarding(false)} />}
    </div>
  );
}
