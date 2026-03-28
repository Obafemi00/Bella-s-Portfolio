import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";

export default function NotFound() {
  return (
    <div className="page-shell">
      <SiteHeader />
      <main className="page-main">
        <h1 className="page-title">Page not found</h1>
        <p className="page-lede">
          That route does not exist. Return home or browse projects.
        </p>
        <Link href="/" className="pill-back" style={{ marginBottom: "1rem" }}>
          ← Home
        </Link>
        <Link href="/projects" className="pill-back">
          All projects
        </Link>
      </main>
    </div>
  );
}
