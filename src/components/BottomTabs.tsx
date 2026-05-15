import { BookOpen, Footprints, Heart, UtensilsCrossed } from "lucide-react";
import type { AppTab } from "../types/destination";

const TABS: { id: AppTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "stories", label: "Stories", icon: BookOpen },
  { id: "eats", label: "Eats", icon: UtensilsCrossed },
  { id: "routes", label: "Routes", icon: Footprints },
  { id: "saved", label: "Saved", icon: Heart },
];

export default function BottomTabs({
  active,
  onChange,
  savedCount,
}: {
  active: AppTab;
  onChange: (tab: AppTab) => void;
  savedCount: number;
}) {
  return (
    <nav className="absolute inset-x-0 bottom-0 z-[700] border-t border-black/5 bg-white/95 px-2 pb-2 pt-1.5 backdrop-blur-md">
      <div className="flex items-stretch justify-around">
        {TABS.map(({ id, label, icon: Icon }) => {
          const isActive = active === id;
          const count = id === "saved" ? savedCount : 0;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onChange(id)}
              className={`relative flex flex-1 flex-col items-center gap-0.5 rounded-xl py-1.5 transition-colors ${
                isActive ? "text-accent" : "text-muted hover:text-heritage"
              }`}
            >
              <div className="relative">
                <Icon className={`h-5 w-5 ${isActive ? "stroke-[2.4]" : ""}`} />
                {count > 0 && (
                  <span className="absolute -right-2 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[9px] font-bold text-white">
                    {count}
                  </span>
                )}
              </div>
              <span className={`text-[10px] font-semibold ${isActive ? "" : "font-medium"}`}>
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
