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

export async function fetchCommonsImage(
  imageQuery: string,
  variant: "modern" | "historic" = "modern",
): Promise<CommonsImage | null> {
  try {
    const query =
      variant === "historic"
        ? `filetype:bitmap ${imageQuery} (historic OR vintage OR 1900 OR 1920 OR 1930 OR "old photograph")`
        : `filetype:bitmap ${imageQuery}`;
    const params = new URLSearchParams({
      action: "query",
      generator: "search",
      gsrsearch: query,
      gsrnamespace: "6",
      gsrlimit: variant === "historic" ? "8" : "5",
      prop: "imageinfo",
      iiprop: "url|extmetadata",
      iiurlwidth: "1200",
      format: "json",
      origin: "*",
    });

    const response = await fetch(`${COMMONS_API}?${params.toString()}`);
    if (!response.ok) return null;

    const data = (await response.json()) as WikiResponse;
    const pages = data.query?.pages;
    if (!pages) return null;

    const sortedPages = Object.values(pages).sort((a, b) => {
      const ai = (a as WikiPage & { index?: number }).index ?? 99;
      const bi = (b as WikiPage & { index?: number }).index ?? 99;
      return ai - bi;
    });
    const page = sortedPages.find((p) => p.imageinfo?.[0]?.thumburl || p.imageinfo?.[0]?.url);
    const info = page?.imageinfo?.[0];
    if (!info?.thumburl && !info?.url) return null;

    const meta = info.extmetadata;
    const author = meta?.Artist?.value
      ? stripHtml(meta.Artist.value)
      : undefined;
    const license = meta?.LicenseShortName?.value;
    const credit = meta?.Credit?.value
      ? stripHtml(meta.Credit.value)
      : undefined;

    return {
      title: page?.title ?? imageQuery,
      imageUrl: info.url ?? info.thumburl ?? "",
      thumbUrl: info.thumburl ?? info.url ?? "",
      pageUrl: info.descriptionurl ?? "https://commons.wikimedia.org",
      author,
      license,
      credit,
    };
  } catch {
    return null;
  }
}
