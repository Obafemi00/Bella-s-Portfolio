import fs from "fs";
import path from "path";
import {
  CATEGORY_SLUGS,
  type CategorySlug,
  CATEGORY_HREF,
  CATEGORY_LABEL,
} from "@/lib/categories";
import type { MediaItem, MediaKind } from "@/lib/mediaTypes";

export type { MediaKind, MediaItem } from "@/lib/mediaTypes";

export { CATEGORY_SLUGS, type CategorySlug, CATEGORY_HREF, CATEGORY_LABEL };

const FOLDER_BY_SLUG: Record<CategorySlug, string> = {
  "2d": "2D",
  "3d": "3D Animation",
  "ai-video": "AI VIDEO",
  branding: "Branding",
};

const VIDEO_EXT = new Set([".mp4", ".mov", ".webm", ".mkv", ".m4v"]);
const IMAGE_EXT = new Set([
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
  ".gif",
  ".avif",
  ".svg",
]);

function kindFromFilename(filename: string): MediaKind {
  const ext = path.extname(filename).toLowerCase();
  if (VIDEO_EXT.has(ext)) return "video";
  if (IMAGE_EXT.has(ext)) return "image";
  if (ext === ".pdf") return "pdf";
  return "unknown";
}

function walkFiles(dir: string, acc: string[] = []): string[] {
  if (!fs.existsSync(dir)) return acc;
  for (const name of fs.readdirSync(dir)) {
    if (name.startsWith(".")) continue;
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) walkFiles(full, acc);
    else acc.push(full);
  }
  return acc;
}

/** Encode each path segment for safe URLs (spaces, parens, etc.). */
export function toPublicUrl(relativeToPublic: string): string {
  const norm = relativeToPublic.split(path.sep).join("/");
  return `/${norm
    .split("/")
    .map((part) => encodeURIComponent(part))
    .join("/")}`;
}

export function listMediaInFolder(folderRelative: string): MediaItem[] {
  const publicDir = path.join(process.cwd(), "public");
  const root = path.join(publicDir, folderRelative);
  const files = walkFiles(root);
  const slug = Object.entries(FOLDER_BY_SLUG).find(
    ([, folder]) => folder === folderRelative,
  )?.[0] as CategorySlug | undefined;

  if (!slug) return [];

  return files
    .map((absolute, index) => {
      const rel = path.relative(publicDir, absolute);
      const filename = path.basename(absolute);
      const kind = kindFromFilename(filename);
      return {
        id: `${slug}-${index}-${filename}`,
        url: toPublicUrl(rel),
        kind,
        filename,
        categorySlug: slug,
        relativePath: rel.split(path.sep).join("/"),
      } satisfies MediaItem;
    })
    .filter(
      (item) =>
        item.kind !== "unknown" &&
        !item.filename.startsWith(".") &&
        item.kind !== "pdf",
    );
}

export function getMediaByCategory(slug: CategorySlug): MediaItem[] {
  const folder = FOLDER_BY_SLUG[slug];
  return listMediaInFolder(folder);
}

/** All displayable media (no PDFs), every category. */
export function getAllMedia(): MediaItem[] {
  return CATEGORY_SLUGS.map((slug) => getMediaByCategory(slug)).flat();
}

export function getBrandingImages(): MediaItem[] {
  return getMediaByCategory("branding").filter(
    (m) => m.kind === "image" || m.kind === "video",
  );
}

/** Video-only selections for motion categories (2D / 3D / AI). */
export function getVideosForCategory(slug: CategorySlug): MediaItem[] {
  if (slug === "branding") return [];
  return getMediaByCategory(slug).filter((m) => m.kind === "video");
}

/** First suitable preview for category cards (video preferred, then image). */
export function getCategoryPreview(slug: CategorySlug): MediaItem | null {
  const items = getMediaByCategory(slug);
  const video = items.find((i) => i.kind === "video");
  if (video) return video;
  return items.find((i) => i.kind === "image") ?? null;
}
