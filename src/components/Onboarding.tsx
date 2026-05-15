import { useState } from "react";
import { ArrowRight, BookOpen, MapPin, Sparkles } from "lucide-react";

const KEY = "anotara.onboarded.v1";

export function shouldShowOnboarding(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(KEY) !== "1";
}

function markDone() {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(KEY, "1");
  } catch {
    // ignore
  }
}

const SLIDES = [
  {
    eyebrow: "Welcome · Mabuhay",
    title: "Philippine stories on the map",
    body: "AnoTara turns Metro Manila into a story-first explorer. Every pin opens with the cultural meaning, not just the directions.",
    icon: MapPin,
    tint: "from-accent/20 to-cream-strong",
  },
  {
    eyebrow: "Listen · Pakinggan",
    title: "Read the story. Hear it aloud.",
    body: "Tap any place to read its kuwento. Press Play to listen — perfect kapag naglalakad ka at gusto mong makinig na lang.",
    icon: BookOpen,
    tint: "from-leaf/20 to-cream-strong",
  },
  {
    eyebrow: "Local · Tara",
    title: "Ask a Filipino local guide",
    body: "Powered by real AI — ask anything, get answers grounded in the place's actual history and culture. Walking buddy on demand.",
    icon: Sparkles,
    tint: "from-heritage/15 to-cream-strong",
  },
];

export default function Onboarding({ onDone }: { onDone: () => void }) {
  const [i, setI] = useState(0);
  const slide = SLIDES[i];
  const last = i === SLIDES.length - 1;
  const Icon = slide.icon;

  const next = () => {
    if (last) {
      markDone();
      onDone();
    } else {
      setI(i + 1);
    }
  };

  const skip = () => {
    markDone();
    onDone();
  };

  return (
    <div className="absolute inset-0 z-[1500] flex flex-col items-center justify-center bg-cream-strong/95 px-6 backdrop-blur-md">
      <button
        type="button"
        onClick={skip}
        className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-muted shadow-sm"
      >
        Skip
      </button>

      <div
        className={`relative flex w-full max-w-sm flex-col items-center rounded-3xl bg-gradient-to-br ${slide.tint} p-6 text-center shadow-xl`}
      >
        <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-accent shadow-sm">
          <Icon className="h-6 w-6" />
        </div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">
          {slide.eyebrow}
        </p>
        <h2 className="mt-1.5 font-serif text-2xl font-semibold leading-tight text-heritage">
          {slide.title}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-ink/85">{slide.body}</p>

        <div className="mt-5 flex items-center gap-1.5">
          {SLIDES.map((_, idx) => (
            <span
              key={idx}
              className={`h-1.5 rounded-full transition-all ${
                idx === i ? "w-6 bg-accent" : "w-1.5 bg-heritage/20"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={next}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-heritage py-3 text-sm font-semibold text-white shadow-md"
        >
          {last ? "Tara, let's go" : "Next"}
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
