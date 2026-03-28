import type { CategorySlug } from "@/lib/categories";

export type MediaKind = "image" | "video" | "pdf" | "unknown";

export interface MediaItem {
  id: string;
  url: string;
  kind: MediaKind;
  filename: string;
  categorySlug: CategorySlug;
  /** Path relative to public, dir-separated with / */
  relativePath: string;
}
