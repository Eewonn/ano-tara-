import { destinations } from "../data/destinations";
import type { Destination, FilterChip } from "../types/destination";

export function filterDestinations(
  searchQuery: string,
  activeFilter: FilterChip,
): Destination[] {
  const query = searchQuery.trim().toLowerCase();

  return destinations.filter((place) => {
    const matchesFilter =
      activeFilter === "all" ? true : place.category === activeFilter;

    if (!matchesFilter) return false;

    if (!query) return true;

    const haystack = [
      place.name,
      place.category,
      place.shortDescription,
      ...place.tags,
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(query);
  });
}
