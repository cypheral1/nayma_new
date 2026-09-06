import "server-only";

function requiredSiteUrl(value: string | undefined): string {
  try {
    if (!value) throw new Error("missing");
    const parsed = new URL(value);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") throw new Error("protocol");
    return parsed.toString().replace(/\/$/, "");
  } catch {
    throw new Error("[framecoded] SITE_URL is required and must be an absolute http(s) URL.");
  }
}

export const SITE_URL = requiredSiteUrl(process.env.SITE_URL);

export function siteUrl(path = "/"): string {
  if (/^https?:\/\//i.test(path)) path = new URL(path).pathname;
  return new URL(path.replace(/^\/+/, ""), SITE_URL + "/").toString();
}

export function siteAssetUrl(value: string): string {
  if (!value || /^(?:data:|blob:)/i.test(value)) return value;
  try {
    return new URL(value).toString();
  } catch {
    return siteUrl(value);
  }
}

function rewriteJsonLd(value: unknown): unknown {
  if (typeof value === "string") {
    if (/^https?:\/\//i.test(value)) return siteUrl(value);
    return value;
  }
  if (Array.isArray(value)) return value.map(rewriteJsonLd);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([key, entry]) => [
        key,
        rewriteJsonLd(entry),
      ]),
    );
  }
  return value;
}

export function siteJsonLd(value: unknown): string {
  return JSON.stringify(rewriteJsonLd(value));
}
