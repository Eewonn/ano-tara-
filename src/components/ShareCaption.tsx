import { ArrowLeft, Check, Copy } from "lucide-react";
import { useState } from "react";
import type { Destination } from "../types/destination";

interface ShareCaptionProps {
  destination: Destination;
  onBack: () => void;
}

const CAPTION_STYLES: {
  key: keyof Destination["captions"];
  label: string;
}[] = [
  { key: "tourist", label: "Tourist caption" },
  { key: "localTourism", label: "Local tourism page" },
  { key: "social", label: "Short social caption" },
];

export default function ShareCaption({ destination, onBack }: ShareCaptionProps) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyCaption = async (key: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    } catch {
      /* clipboard may be unavailable */
    }
  };

  return (
    <div className="flex h-full flex-col">
      <button
        type="button"
        onClick={onBack}
        className="mb-4 flex items-center gap-2 text-sm font-medium text-heritage hover:text-accent"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to place
      </button>

      <h2 className="font-serif text-2xl text-heritage">Promote this place</h2>
      <p className="mt-1 text-sm text-muted">
        Shareable captions for {destination.name}
      </p>

      <div className="mt-5 space-y-4">
        {CAPTION_STYLES.map(({ key, label }) => (
          <article
            key={key}
            className="rounded-2xl border border-heritage/10 bg-cream-strong p-4 shadow-sm"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-accent">
              {label}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-ink/90">
              {destination.captions[key]}
            </p>
            <button
              type="button"
              onClick={() => copyCaption(key, destination.captions[key])}
              className="mt-3 flex items-center gap-2 rounded-lg border border-heritage/15 bg-white px-3 py-2 text-sm font-medium text-heritage transition-colors hover:border-accent hover:text-accent"
            >
              {copiedKey === key ? (
                <>
                  <Check className="h-4 w-4 text-leaf" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copy caption
                </>
              )}
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}
