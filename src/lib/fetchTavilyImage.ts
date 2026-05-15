import type { CommonsImage } from "../types/destination";

const TAVILY_URL = "https://api.tavily.com/search";

interface TavilyResponse {
  images?: Array<string | { url: string; description?: string }>;
  results?: Array<{ url: string; title?: string; content?: string }>;
}

export async function fetchTavilyHistoricImage(
  query: string,
): Promise<CommonsImage | null> {
  const apiKey = import.meta.env.VITE_TAVILY_API_KEY;
  if (!apiKey) return null;

  try {
    const res = await fetch(TAVILY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_key: apiKey,
        query: `${query} historical photograph 1900 1920 1930 vintage archive`,
        include_images: true,
        include_image_descriptions: true,
        search_depth: "basic",
        max_results: 5,
      }),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as TavilyResponse;
    const images = data.images ?? [];
    if (!images.length) return null;

    const first = images[0];
    const url = typeof first === "string" ? first : first.url;
    const description = typeof first === "string" ? undefined : first.description;
    if (!url) return null;

    return {
      title: query,
      imageUrl: url,
      thumbUrl: url,
      pageUrl: data.results?.[0]?.url ?? "",
      author: description,
      license: "via Tavily",
      credit: data.results?.[0]?.title,
    };
  } catch {
    return null;
  }
}
