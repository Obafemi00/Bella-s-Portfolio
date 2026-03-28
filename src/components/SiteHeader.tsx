import Link from "next/link";
import Logo from "@/components/Logo";
import styles from "./SiteHeader.module.css";

export default function SiteHeader() {
  return (
    <header className={styles.header} aria-label="Site">
      <Link href="/" className={styles.logoWrap}>
        <Logo />
      </Link>
      <nav className={styles.nav} aria-label="Primary">
        <Link href="/projects" className={styles.navLink}>
          Projects
        </Link>
      </nav>
    </header>
  );
}
