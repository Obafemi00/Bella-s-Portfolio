import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SectionReveal from "@/components/SectionReveal";
import ProjectGrid from "@/components/ProjectGrid";
import VideoCard from "@/components/VideoCard";
import type { CategorySlug } from "@/lib/categories";
import { getVideosForCategory } from "@/lib/media";

type VideoSlug = Exclude<CategorySlug, "branding">;

type Props = {
  title: string;
  slug: VideoSlug;
};

export default function CategoryVideoPage({ title, slug }: Props) {
  const items = getVideosForCategory(slug);

  return (
    <div className="page-shell">
      <SiteHeader />
      <main className="page-main">
        <SectionReveal>
          <Link href="/projects" className="pill-back">
            ← All projects
          </Link>
          <h1 className="page-title">{title}</h1>
          <p className="page-lede">
            Bringing ideas to life through hand-crafted frame-by-frame and dimensional motion
          </p>
        </SectionReveal>

        <ProjectGrid>
          {items.map((item) => (
            <div key={item.id} className="masonry-item">
              <VideoCard src={item.url} />
            </div>
          ))}
        </ProjectGrid>
      </main>
    </div>
  );
}
