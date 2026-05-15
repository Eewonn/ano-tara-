import { useEffect, useRef, useState } from "react";
import {
  BookOpen,
  Camera,
  Clock,
  Compass,
  ExternalLink,
  Heart,
  Lightbulb,
  MapPin,
  Megaphone,
  Navigation,
  Pause,
  Quote,
  Sparkles,
  Ticket,
  Volume2,
  X,
} from "lucide-react";
import type { CommonsImage, Destination } from "../types/destination";
import NearbyKnowledge from "./NearbyKnowledge";
import GuidePanel from "./GuidePanel";
import RoutePlanner from "./RoutePlanner";
import StoryTrivia from "./StoryTrivia";
import PhotoGallery from "./PhotoGallery";

export type PanelView = "place" | "guide" | "route";

interface DestinationPanelProps {
  destination: Destination;
  panelView: PanelView;
  image: CommonsImage | null | undefined;
  historicImage?: CommonsImage | null | undefined;
  historicLoading?: boolean;
  gallery?: CommonsImage[];
  imageLoading: boolean;
  imageCache: Map<string, CommonsImage>;
  nearby: Destination[];
  saved: boolean;
  onToggleSave: () => void;
  onClose: () => void;
  onSelectNearby: (id: string) => void;
  onPanelViewChange: (view: PanelView) => void;
  onRouteSelect: (stops: import("../types/destination").RouteStop[]) => void;
}

const PLACEHOLDER = "/images/placeholder-heritage.svg";

function Sampaguita({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden
    >
      <circle cx="12" cy="6" r="2.4" opacity="0.85" />
      <circle cx="17.2" cy="9.4" r="2.4" opacity="0.85" />
      <circle cx="15.4" cy="15.6" r="2.4" opacity="0.85" />
      <circle cx="8.6" cy="15.6" r="2.4" opacity="0.85" />
      <circle cx="6.8" cy="9.4" r="2.4" opacity="0.85" />
      <circle cx="12" cy="11.5" r="1.6" />
    </svg>
  );
}

export default function DestinationPanel({
  destination,
  panelView,
  image,
  historicImage,
  historicLoading = false,
  gallery,
  imageLoading,
  imageCache,
  nearby,
  saved,
  onToggleSave,
  onClose,
  onSelectNearby,
  onPanelViewChange,
  onRouteSelect,
}: DestinationPanelProps) {
  if (panelView === "guide") {
    return (
      <aside className="panel-shell">
        <div className="panel-scroll flex flex-col p-5">
          <GuidePanel
            destination={destination}
            onBack={() => onPanelViewChange("place")}
          />
        </div>
      </aside>
    );
  }

  if (panelView === "route") {
    return (
      <aside className="panel-shell">
        <div className="panel-scroll flex flex-col p-5">
          <RoutePlanner
            destination={destination}
            onBack={() => onPanelViewChange("place")}
            onRouteSelect={onRouteSelect}
          />
        </div>
      </aside>
    );
  }

  return (
    <PlaceView
      destination={destination}
      image={image}
      historicImage={historicImage}
      historicLoading={historicLoading}
      gallery={gallery}
      imageLoading={imageLoading}
      imageCache={imageCache}
      nearby={nearby}
      saved={saved}
      onToggleSave={onToggleSave}
      onClose={onClose}
      onSelectNearby={onSelectNearby}
      onPanelViewChange={onPanelViewChange}
    />
  );
}

function PlaceView({
  destination,
  image,
  historicImage,
  historicLoading = false,
  gallery,
  imageLoading,
  imageCache,
  nearby,
  saved,
  onToggleSave,
  onClose,
  onSelectNearby,
  onPanelViewChange,
}: {
  destination: Destination;
  image: CommonsImage | null | undefined;
  historicImage?: CommonsImage | null | undefined;
  historicLoading?: boolean;
  gallery?: CommonsImage[];
  imageLoading: boolean;
  imageCache: Map<string, CommonsImage>;
  nearby: Destination[];
  saved: boolean;
  onToggleSave: () => void;
  onClose: () => void;
  onSelectNearby: (id: string) => void;
  onPanelViewChange: (view: PanelView) => void;
}) {
  const [mode, setMode] = useState<"now" | "then">("now");
  const showingThen = mode === "then" && historicImage;
  const activeImage = showingThen ? historicImage : image;
  const imageSrc = activeImage?.thumbUrl ?? activeImage?.imageUrl ?? PLACEHOLDER;
  const hasImage = Boolean(activeImage?.thumbUrl || activeImage?.imageUrl);
  const hasHistoric =
    !!historicImage &&
    (!!historicImage.thumbUrl || !!historicImage.imageUrl) &&
    historicImage.imageUrl !== image?.imageUrl;
  const showThenToggle = hasHistoric || historicLoading;
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    setMode("now");
  }, [destination.id]);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    setSpeaking(false);
    if (typeof window !== "undefined") {
      window.speechSynthesis?.cancel();
    }
  }, [destination.id]);

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined") {
        window.speechSynthesis?.cancel();
      }
    };
  }, []);

  const toggleNarration = () => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    const synth = window.speechSynthesis;
    if (speaking) {
      synth.cancel();
      setSpeaking(false);
      return;
    }
    const text = `${destination.name}. ${destination.story} ${destination.culturalMeaning}`;
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 0.95;
    u.pitch = 1;
    u.onend = () => setSpeaking(false);
    u.onerror = () => setSpeaking(false);
    utteranceRef.current = u;
    synth.speak(u);
    setSpeaking(true);
  };

  const [dragOffset, setDragOffset] = useState(0);
  const dragStartRef = useRef<{ y: number; active: boolean } | null>(null);

  const onDragStart = (clientY: number) => {
    dragStartRef.current = { y: clientY, active: true };
  };
  const onDragMove = (clientY: number) => {
    const s = dragStartRef.current;
    if (!s?.active) return;
    const delta = Math.max(0, clientY - s.y);
    setDragOffset(delta);
  };
  const onDragEnd = () => {
    const s = dragStartRef.current;
    if (!s?.active) return;
    const dismissed = dragOffset > 140;
    dragStartRef.current = null;
    if (dismissed) {
      setDragOffset(0);
      onClose();
    } else {
      setDragOffset(0);
    }
  };

  return (
    <aside
      className="panel-shell"
      style={{
        transform: dragOffset ? `translateY(${dragOffset}px)` : undefined,
        transition: dragStartRef.current?.active ? "none" : "transform 0.2s ease-out",
      }}
    >
      <div
        className="absolute inset-x-0 top-0 z-30 h-10 cursor-grab active:cursor-grabbing"
        onPointerDown={(e) => {
          (e.target as Element).setPointerCapture?.(e.pointerId);
          onDragStart(e.clientY);
        }}
        onPointerMove={(e) => onDragMove(e.clientY)}
        onPointerUp={onDragEnd}
        onPointerCancel={onDragEnd}
      />
      <div className="panel-scroll">
        <figure className="relative h-72 overflow-hidden bg-gradient-to-br from-cream-strong to-[#e7e5e4]">
          {imageLoading ? (
            <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-[#e8ddd0] via-[#f5ebe0] to-[#e8ddd0]" />
          ) : hasImage ? (
            <img
              src={imageSrc}
              alt={destination.name}
              className="h-full w-full object-cover"
              onError={(e) => {
                const target = e.currentTarget;
                if (!target.dataset.fallback) {
                  target.dataset.fallback = "1";
                  target.src = PLACEHOLDER;
                }
              }}
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-2 px-6 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-heritage/10 font-serif text-2xl text-heritage">
                {destination.initials}
              </div>
              <p className="font-serif text-lg text-heritage/70">{destination.name}</p>
            </div>
          )}

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/15 to-transparent" />

          <div className="absolute left-4 top-12 z-10 flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-heritage shadow-sm backdrop-blur-sm">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-success" />
            Open to visit
          </div>

          {showThenToggle && (
            <div className="absolute left-3 top-[88px] z-10 flex items-center overflow-hidden rounded-full bg-white/95 p-0.5 text-[10px] font-semibold uppercase tracking-wider shadow-md backdrop-blur-sm">
              <button
                type="button"
                onClick={() => setMode("now")}
                className={`flex items-center gap-1 rounded-full px-2.5 py-1 transition ${
                  mode === "now" ? "bg-heritage text-white" : "text-heritage hover:bg-heritage/5"
                }`}
              >
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-success" />
                Now
              </button>
              <button
                type="button"
                onClick={() => hasHistoric && setMode("then")}
                disabled={!hasHistoric}
                className={`flex items-center gap-1 rounded-full px-2.5 py-1 transition ${
                  mode === "then" && hasHistoric
                    ? "bg-heritage text-white"
                    : hasHistoric
                      ? "text-heritage hover:bg-heritage/5"
                      : "text-heritage/40 cursor-not-allowed"
                }`}
                aria-label={hasHistoric ? "View historic photo" : "No historic photo available"}
              >
                {historicLoading && !hasHistoric ? (
                  <>
                    <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-heritage/40" />
                    Then…
                  </>
                ) : (
                  <>
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
                    Then
                  </>
                )}
              </button>
            </div>
          )}

          <div className="absolute right-3 top-12 z-10 flex gap-2">
            <button
              type="button"
              onClick={onToggleSave}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-heritage shadow-sm backdrop-blur-sm transition hover:scale-105"
              aria-label={saved ? "Remove from saved" : "Save"}
            >
              <Heart className={`h-4 w-4 ${saved ? "fill-accent text-accent" : ""}`} />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-ink/60 text-white backdrop-blur-sm transition hover:bg-ink/80"
              aria-label="Close panel"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="absolute inset-x-0 bottom-0 z-10 p-5">
            <p className="mb-1 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/80">
              <Sampaguita className="h-3 w-3 text-white/80" />
              Kuwento mula sa {destination.locationLabel.split(",")[0]}
            </p>
            <h2 className="font-serif text-[30px] font-semibold leading-[1.05] text-white drop-shadow-sm">
              {destination.name}
            </h2>
            <p className="mt-1.5 flex items-center gap-1 text-xs text-white/85">
              <MapPin className="h-3.5 w-3.5" />
              {destination.locationLabel}
            </p>
          </div>

          {hasImage && activeImage && (
            <figcaption className="absolute bottom-1 right-2 z-10 max-w-[70%] truncate rounded bg-ink/55 px-1.5 py-0.5 text-[9px] text-cream/90">
              {showingThen && "Then · "}
              {activeImage.license === "via Tavily" ? "Web archive" : "Wikimedia"}
              {activeImage.author && ` · ${activeImage.author}`}
            </figcaption>
          )}
        </figure>

        <div className="space-y-5 px-5 pt-5 pb-32">
          <div className="flex items-center justify-between gap-2 rounded-2xl bg-white p-3 ring-1 ring-black/[0.05]">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/10 text-accent">
                <Volume2 className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-heritage">
                  Pakinggan ang kwento
                </p>
                <p className="text-[11px] text-muted">Listen to the story · ~2 min</p>
              </div>
            </div>
            <button
              type="button"
              onClick={toggleNarration}
              className={`flex h-9 items-center gap-1.5 rounded-full px-3.5 text-xs font-semibold transition ${
                speaking
                  ? "bg-heritage text-white"
                  : "bg-accent text-white shadow-[0_4px_12px_-2px_rgba(255,140,66,0.5)]"
              }`}
            >
              {speaking ? (
                <>
                  <Pause className="h-3.5 w-3.5" /> Stop
                </>
              ) : (
                <>Play</>
              )}
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <span className="rounded-full bg-heritage px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
              {destination.category.replace("-", " ")}
            </span>
            {destination.badges?.includes("Must Visit") && (
              <span className="rounded-full bg-accent/12 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-accent">
                Must visit
              </span>
            )}
          </div>

          <a
            href={`https://www.google.com/maps/search/?api=1&query=${destination.coordinates[0]},${destination.coordinates[1]}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between rounded-2xl bg-white p-3 ring-1 ring-black/[0.05] transition hover:ring-accent/30"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-leaf/10 text-leaf">
                <Navigation className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-heritage">
                  Get directions
                </p>
                <p className="text-[11px] text-muted">Open in Google Maps</p>
              </div>
            </div>
            <ExternalLink className="h-3.5 w-3.5 text-muted" />
          </a>

          {(destination.recommendedTime || destination.entranceFee) && (
            <div className="grid grid-cols-2 gap-2.5">
              {destination.recommendedTime && (
                <div className="rounded-2xl bg-white p-3 ring-1 ring-black/[0.05]">
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-accent" />
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-muted">
                      Time
                    </p>
                  </div>
                  <p className="mt-1 text-sm font-semibold text-heritage">
                    {destination.recommendedTime}
                  </p>
                </div>
              )}
              {destination.entranceFee && (
                <div className="rounded-2xl bg-white p-3 ring-1 ring-black/[0.05]">
                  <div className="flex items-center gap-1.5">
                    <Ticket className="h-3.5 w-3.5 text-accent" />
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-muted">
                      Entrance
                    </p>
                  </div>
                  <p className="mt-1 text-sm font-semibold text-heritage">
                    {destination.entranceFee}
                  </p>
                </div>
              )}
            </div>
          )}

          <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-accent/10 via-accent/5 to-cream-strong p-5">
            <Sampaguita className="absolute -right-3 -top-3 h-20 w-20 text-accent/20" />
            <div className="relative">
              <p className="mb-1.5 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-accent">
                <Lightbulb className="h-3.5 w-3.5" />
                Alam mo ba? · Did you know?
              </p>
              <p className="font-serif text-[17px] leading-snug text-heritage">
                {destination.whyItMatters}
              </p>
            </div>
          </section>

          <p className="text-[15px] leading-relaxed text-ink/85">
            {destination.summary}
          </p>

          <section className="relative">
            <div className="mb-3 flex items-center gap-2">
              <span className="h-px flex-1 bg-heritage/15" />
              <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-heritage">
                <BookOpen className="h-3.5 w-3.5 text-accent" />
                The Story
              </p>
              <span className="h-px flex-1 bg-heritage/15" />
            </div>
            <div className="relative rounded-2xl bg-cream-strong p-5 pl-7">
              <Quote className="absolute -left-1 -top-2 h-8 w-8 rotate-180 text-accent/35" fill="currentColor" />
              <p className="font-serif text-[17px] italic leading-relaxed text-heritage">
                {destination.story}
              </p>
            </div>
          </section>

          <section className="rounded-2xl bg-heritage p-5 text-cream">
            <p className="mb-2 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-cream/70">
              <Sparkles className="h-3.5 w-3.5" />
              Kahulugang kultural · What it means
            </p>
            <p className="text-[15px] leading-relaxed text-cream/95">
              {destination.culturalMeaning}
            </p>
          </section>

          <StoryTrivia destination={destination} />

          {gallery && gallery.length > 1 && <PhotoGallery images={gallery} />}

          <section className="rounded-2xl bg-white p-4 ring-1 ring-black/[0.05]">
            <div className="mb-3 flex items-center gap-2 text-heritage">
              <Camera className="h-4 w-4 text-accent" />
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.12em]">
                What to do here
              </h3>
            </div>
            <ul className="space-y-2.5 text-sm text-ink/85">
              {destination.whatToDo.map((item, i) => (
                <li key={item} className="flex gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/12 text-[10px] font-bold text-accent">
                    {i + 1}
                  </span>
                  <span className="leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl bg-cream-strong p-4">
            <div className="mb-3 flex items-center gap-2 text-heritage">
              <Megaphone className="h-4 w-4 text-leaf" />
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.12em]">
                Tara, tips mula sa local
              </h3>
            </div>
            <ul className="space-y-2 text-sm text-ink/85">
              {destination.localTips.map((item) => (
                <li key={item} className="flex gap-2.5">
                  <span className="mt-0.5 text-leaf">✓</span>
                  <span className="leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <NearbyKnowledge
            nearby={nearby}
            imageCache={imageCache}
            onSelect={onSelectNearby}
          />
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-white via-white to-white/80 p-4 pt-5">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onPanelViewChange("guide")}
            className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-accent py-3.5 text-sm font-semibold text-white shadow-[0_8px_20px_-6px_rgba(255,140,66,0.55)] transition-transform hover:scale-[1.01]"
          >
            <Compass className="h-4 w-4" />
            Ask the local guide
          </button>
          <button
            type="button"
            onClick={() => onPanelViewChange("route")}
            className="rounded-2xl bg-white px-4 py-3.5 text-sm font-semibold text-heritage ring-1 ring-black/[0.08] transition hover:ring-heritage/30"
            aria-label="Plan a route"
          >
            Route
          </button>
        </div>
      </div>
    </aside>
  );
}
