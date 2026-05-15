import type { CommonsImage } from "../types/destination";
import { fetchCommonsImage } from "./fetchCommonsImage";
import { fetchTavilyHistoricImage } from "./fetchTavilyImage";

export async function fetchHistoricImage(
  imageQuery: string,
  modernImageUrl?: string,
): Promise<CommonsImage | null> {
  const commons = await fetchCommonsImage(imageQuery, "historic");
  if (commons && commons.imageUrl !== modernImageUrl) return commons;

  const tavily = await fetchTavilyHistoricImage(imageQuery);
  if (tavily && tavily.imageUrl !== modernImageUrl) return tavily;

  return commons ?? null;
}
