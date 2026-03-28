import Link from "next/link";
import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SectionReveal from "@/components/SectionReveal";
import BrandingGallery from "@/components/BrandingGallery";
import { getBrandingImages } from "@/lib/media";

export const metadata: Metadata = {
  title: "Branding",
};

export default function BrandingPage() {
  const items = getBrandingImages();

  return (
    <div className="page-shell">
      <SiteHeader />
      <main className="page-main">
        <SectionReveal>
          <Link href="/projects" className="pill-back">
            ← All projects
          </Link>
          <h1 className="page-title">Branding</h1>
          <p className="page-lede">
            Identity systems, art direction, and campaign stills — open any
            frame for a full-screen pass with gentle transitions.
          </p>
        </SectionReveal>

        <BrandingGallery items={items} />
      </main>
    </div>
  );
}
