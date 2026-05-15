import type { CommonsImage } from "../types/destination";

const COMMONS_API = "https://commons.wikimedia.org/w/api.php";

interface WikiImageInfo {
  thumburl?: string;
  url?: string;
  descriptionurl?: string;
  extmetadata?: {
    Artist?: { value?: string };
    LicenseShortName?: { value?: string };
  };
}

interface WikiPage {
  title?: string;
  imageinfo?: WikiImageInfo[];
  index?: number;
}

interface WikiResponse {
  query?: {
    pages?: Record<string, WikiPage>;
  };
}

function stripHtml(value: string): string {
  return value.replace(/<[^>]+>/g, "").trim();
}

export async function fetchCommonsGallery(
  query: string,
  limit = 6,
): Promise<CommonsImage[]> {
  try {
    const params = new URLSearchParams({
      action: "query",
      generator: "search",
      gsrsearch: `filetype:bitmap ${query}`,
      gsrnamespace: "6",
      gsrlimit: String(limit + 2),
      prop: "imageinfo",
      iiprop: "url|extmetadata",
      iiurlwidth: "1000",
      format: "json",
      origin: "*",
    });
    const res = await fetch(`${COMMONS_API}?${params.toString()}`);
    if (!res.ok) return [];
    const data = (await res.json()) as WikiResponse;
    const pages = data.query?.pages;
    if (!pages) return [];

    return Object.values(pages)
      .sort((a, b) => (a.index ?? 99) - (b.index ?? 99))
      .map((page): CommonsImage | null => {
        const info = page.imageinfo?.[0];
        if (!info?.thumburl && !info?.url) return null;
        const meta = info.extmetadata;
        return {
          title: page.title ?? query,
          imageUrl: info.url ?? info.thumburl ?? "",
          thumbUrl: info.thumburl ?? info.url ?? "",
          pageUrl: info.descriptionurl ?? "",
          author: meta?.Artist?.value ? stripHtml(meta.Artist.value) : undefined,
          license: meta?.LicenseShortName?.value,
        };
      })
      .filter((img): img is CommonsImage => Boolean(img))
      .slice(0, limit);
  } catch {
    return [];
  }
}
