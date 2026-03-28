import SiteHeader from "@/components/SiteHeader";
import Hero from "@/components/Hero";
import FloatingCategoryCards, {
  type CategoryCardConfig,
} from "@/components/FloatingCategoryCards";
import { CATEGORY_SLUGS, type CategorySlug } from "@/lib/categories";
import { getCategoryPreview } from "@/lib/media";

function buildCategoryConfigs(): CategoryCardConfig[] {
  return CATEGORY_SLUGS.map((slug: CategorySlug) => {
    const preview = getCategoryPreview(slug);
    return {
      slug,
      previewUrl: preview?.url ?? null,
      previewIsVideo: preview?.kind === "video",
    };
  });
}

export default function Home() {
  const configs = buildCategoryConfigs();

  return (
    <div className="page-shell">
      <Hero>
        <SiteHeader />
      </Hero>
      <FloatingCategoryCards configs={configs} />
    </div>
  );
}
