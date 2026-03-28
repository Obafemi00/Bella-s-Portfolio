import Link from "next/link";
import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SectionReveal from "@/components/SectionReveal";
import ProjectGrid from "@/components/ProjectGrid";
import VideoCard from "@/components/VideoCard";
import ImageCard from "@/components/ImageCard";
import { getAllMedia } from "@/lib/media";

export const metadata: Metadata = {
  title: "Projects",
};

export default function ProjectsPage() {
  const items = getAllMedia();

  return (
    <div className="page-shell">
      <SiteHeader />
      <main className="page-main">
        <SectionReveal>
          <Link href="/" className="pill-back">
            ← Home
          </Link>
          <h1 className="page-title">Selected work</h1>
          <p className="page-lede">
            A single canvas of motion, film, and identity — explore the full
            archive by medium on each category route.
          </p>
        </SectionReveal>

        <ProjectGrid>
          {items.map((item) => (
            <div key={item.id} className="masonry-item">
              {item.kind === "video" ? (
                <VideoCard src={item.url} />
              ) : (
                <ImageCard src={item.url} alt={item.filename} />
              )}
            </div>
          ))}
        </ProjectGrid>
      </main>
    </div>
  );
}
