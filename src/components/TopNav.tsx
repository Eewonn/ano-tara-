import { Search } from "lucide-react";
import type { FilterChip } from "../types/destination";

const FILTERS: { id: FilterChip; label: string }[] = [
  { id: "all", label: "All" },
  { id: "heritage", label: "Heritage" },
  { id: "churches", label: "Churches" },
  { id: "museums", label: "Museums" },
  { id: "food", label: "Food districts" },
  { id: "parks", label: "Parks" },
  { id: "hidden-gems", label: "Hidden gems" },
];

interface TopNavProps {
  searchQuery: string;
  activeFilter: FilterChip;
  visibleCount: number;
  onSearchChange: (value: string) => void;
  onFilterChange: (filter: FilterChip) => void;
}

export default function TopNav({
  searchQuery,
  activeFilter,
  visibleCount,
  onSearchChange,
  onFilterChange,
}: TopNavProps) {
  return (
    <header className="pointer-events-none absolute inset-x-0 top-0 z-[500] p-3">
      <div className="pointer-events-auto flex flex-col gap-2.5">
        <div className="relative flex items-center gap-2 rounded-2xl bg-white px-3.5 py-2.5 shadow-[0_8px_24px_-8px_rgba(15,23,42,0.12)] ring-1 ring-black/[0.04]">
          <Search className="h-4 w-4 shrink-0 text-muted" aria-hidden />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Ano meron dito?"
            aria-label="Search destinations"
            className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-muted"
          />
          {(searchQuery || activeFilter !== "all") && (
            <span className="shrink-0 rounded-full bg-heritage/8 px-2 py-0.5 text-[10px] font-semibold text-heritage">
              {visibleCount}
            </span>
          )}
        </div>

        <div className="pointer-events-auto -mx-3 flex items-center gap-2 overflow-x-auto px-3 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {FILTERS.map((filter) => (
            <button
              key={filter.id}
              type="button"
              onClick={() => onFilterChange(filter.id)}
              className={`shrink-0 rounded-full px-3.5 py-2 text-xs font-semibold transition-all ${
                activeFilter === filter.id
                  ? "bg-heritage text-white shadow-md"
                  : "bg-white text-heritage ring-1 ring-black/[0.06] hover:ring-heritage/30"
              }`}
            >
              {filter.label}
            </button>
          ))}
          {visibleCount === 0 && (
            <p className="shrink-0 rounded-full bg-heritage/5 px-3 py-2 text-xs text-heritage">
              Walang tumugma
            </p>
          )}
        </div>
      </div>
    </header>
  );
}
