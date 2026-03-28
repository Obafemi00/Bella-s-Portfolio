export const CATEGORY_SLUGS = ["2d", "3d", "ai-video", "branding"] as const;

export type CategorySlug = (typeof CATEGORY_SLUGS)[number];

export const CATEGORY_LABEL: Record<CategorySlug, string> = {
  "2d": "2D Animation",
  "3d": "3D Animation",
  "ai-video": "AI Videos",
  branding: "Branding",
};

export const CATEGORY_HREF: Record<CategorySlug, string> = {
  "2d": "/projects/2d",
  "3d": "/projects/3d",
  "ai-video": "/projects/ai-video",
  branding: "/projects/branding",
};
