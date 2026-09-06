import type { ImgHTMLAttributes } from "react";

export interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  /** Mark as the LCP image: load eagerly with high fetch priority. */
  priority?: boolean;
}

/**
 * Drop-in <img> with sensible performance defaults:
 *  - lazy loading + async decoding (off the critical path) by default
 *  - eager + fetchPriority="high" when `priority` is set (hero/LCP images)
 *  - width/height should be provided to prevent layout shift (CLS)
 */
export function Image({ priority, loading, decoding, fetchPriority, ...rest }: ImageProps) {
  return (
    <img
      {...rest}
      loading={loading ?? "eager"}
      decoding={decoding ?? "async"}
      fetchPriority={fetchPriority ?? (priority ? "high" : undefined)}
    />
  );
}
