import type { CommonsImage } from "../types/destination";

const COMMONS_API = "https://commons.wikimedia.org/w/api.php";

interface WikiExtMeta {
  value?: string;
}

interface WikiImageInfo {
  thumburl?: string;
  url?: string;
  descriptionurl?: string;
  extmetadata?: {
    Artist?: WikiExtMeta;
    LicenseShortName?: WikiExtMeta;
    Credit?: WikiExtMeta;
    AttributionRequired?: WikiExtMeta;
  };
}

interface WikiPage {
  title?: string;
  imageinfo?: WikiImageInfo[];
}

interface WikiResponse {
  query?: {
    pages?: Record<string, WikiPage>;
  };
}

function stripHtml(value: string): string {
  return value.replace(/<[^>]+>/g, "").trim();
}

function pageToCommonsImage(page: WikiPage, fallbackTitle: string): CommonsImage | null {
  const info = page.imageinfo?.[0];
  if (!info?.thumburl && !info?.url) return null;
  const meta = info.extmetadata;
  return {
    title: page.title ?? fallbackTitle,
    imageUrl: info.url ?? info.thumburl ?? "",
    thumbUrl: info.thumburl ?? info.url ?? "",
    pageUrl: info.descriptionurl ?? "https://commons.wikimedia.org",
    author: meta?.Artist?.value ? stripHtml(meta.Artist.value) : undefined,
    license: meta?.LicenseShortName?.value,
    credit: meta?.Credit?.value ? stripHtml(meta.Credit.value) : undefined,
  };
}

/** Fetch a specific Commons file by filename (most reliable for Then/Now). */
export async function fetchCommonsFileByName(
  fileName: string,
): Promise<CommonsImage | null> {
  try {
    const title = fileName.startsWith("File:") ? fileName : `File:${fileName}`;
    const params = new URLSearchParams({
      action: "query",
      titles: title,
      prop: "imageinfo",
      iiprop: "url|extmetadata",
      iiurlwidth: "1200",
      format: "json",
      origin: "*",
    });
    const response = await fetch(`${COMMONS_API}?${params.toString()}`);
    if (!response.ok) return null;
    const data = (await response.json()) as WikiResponse;
    const page = Object.values(data.query?.pages ?? {})[0];
    if (!page || "missing" in page) return null;
    return pageToCommonsImage(page, fileName);
  } catch {
    return null;
  }
}

/** Return multiple Commons images from a search (for picking a distinct historic photo). */
export async function fetchCommonsImageCandidates(
  imageQuery: string,
  variant: "modern" | "historic" = "modern",
  limit = 8,
): Promise<CommonsImage[]> {
  try {
    const query =
      variant === "historic"
        ? `filetype:bitmap ${imageQuery} (Manila OR Philippines) (historic OR vintage OR 1900 OR 1920 OR 1930 OR 1945 OR ruins OR colonial)`
        : `filetype:bitmap ${imageQuery}`;
    const params = new URLSearchParams({
      action: "query",
      generator: "search",
      gsrsearch: query,
      gsrnamespace: "6",
      gsrlimit: String(limit),
      prop: "imageinfo",
      iiprop: "url|extmetadata",
      iiurlwidth: "1200",
      format: "json",
      origin: "*",
    });
    const response = await fetch(`${COMMONS_API}?${params.toString()}`);
    if (!response.ok) return [];
    const data = (await response.json()) as WikiResponse;
    const pages = data.query?.pages;
    if (!pages) return [];

    const sorted = Object.values(pages).sort((a, b) => {
      const ai = (a as WikiPage & { index?: number }).index ?? 99;
      const bi = (b as WikiPage & { index?: number }).index ?? 99;
      return ai - bi;
    });

    const results: CommonsImage[] = [];
    for (const page of sorted) {
      const img = pageToCommonsImage(page, imageQuery);
      if (img) results.push(img);
    }
    return results;
  } catch {
    return [];
  }
}

export async function fetchCommonsImage(
  imageQuery: string,
  variant: "modern" | "historic" = "modern",
  excludeUrl?: string,
): Promise<CommonsImage | null> {
  try {
    const candidates = await fetchCommonsImageCandidates(
      imageQuery,
      variant,
      variant === "historic" ? 10 : 5,
    );
    if (excludeUrl) {
      const norm = (u: string) => u.split("?")[0].toLowerCase();
      const distinct = candidates.find(
        (c) =>
          norm(c.imageUrl) !== norm(excludeUrl) &&
          norm(c.thumbUrl) !== norm(excludeUrl),
      );
      if (distinct) return distinct;
    }
    return candidates[0] ?? null;
  } catch {
    return null;
  }
}
