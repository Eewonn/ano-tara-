import type { CommonsImage, Destination } from "../types/destination";
import {
  fetchCommonsFileByName,
  fetchCommonsImage,
  fetchCommonsImageCandidates,
} from "./fetchCommonsImage";
import { fetchTavilyHistoricImage } from "./fetchTavilyImage";

function isDistinctFromModern(
  candidate: CommonsImage,
  modernImageUrl?: string,
): boolean {
  if (!modernImageUrl) return true;
  const norm = (u: string) => u.split("?")[0].toLowerCase();
  return (
    norm(candidate.imageUrl) !== norm(modernImageUrl) &&
    norm(candidate.thumbUrl) !== norm(modernImageUrl)
  );
}

export async function fetchHistoricImage(
  place: Pick<
    Destination,
    "imageQuery" | "historicCommonsFile" | "historicImageQuery" | "name"
  >,
  modernImageUrl?: string,
): Promise<CommonsImage | null> {
  if (place.historicCommonsFile) {
    const direct = await fetchCommonsFileByName(place.historicCommonsFile);
    if (direct && isDistinctFromModern(direct, modernImageUrl)) return direct;
  }

  const queries = [
    place.historicImageQuery,
    `${place.name} Manila historic photograph`,
    `${place.name} Manila 1945 OR 1930 OR colonial`,
    place.imageQuery,
  ].filter((q, i, arr): q is string => Boolean(q) && arr.indexOf(q) === i);

  for (const query of queries) {
    const candidates = await fetchCommonsImageCandidates(query, "historic", 12);
    const match = candidates.find((c) => isDistinctFromModern(c, modernImageUrl));
    if (match) return match;
  }

  const commons = await fetchCommonsImage(
    place.historicImageQuery ?? place.imageQuery,
    "historic",
    modernImageUrl,
  );
  if (commons && isDistinctFromModern(commons, modernImageUrl)) return commons;

  const tavily = await fetchTavilyHistoricImage(
    place.historicImageQuery ?? place.name,
  );
  if (tavily && isDistinctFromModern(tavily, modernImageUrl)) return tavily;

  return null;
}
