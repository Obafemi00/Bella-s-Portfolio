"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import styles from "./SiteFooter.module.css";

const navItems = [
  { label: "Projects", href: "/projects" },
  { label: "2D", href: "/projects/2d" },
  { label: "3D", href: "/projects/3d" },
  { label: "AI Video", href: "/projects/ai-video" },
  { label: "Branding", href: "/projects/branding" },
];

export default function SiteFooter() {
  const footerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!footerRef.current) return;

    gsap.registerPlugin(ScrollTrigger);
    gsap.fromTo(
      footerRef.current,
      { opacity: 0, y: 18 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 98%",
          once: true,
        },
      }
    );
  }, []);

  return (
    <footer className={styles.footer} ref={footerRef}>
      <div className={styles.top}>
        <div className={styles.brand}>
          <span className={styles.brandName}>DOLLHOUSE STUDIOS</span>
          <span className={styles.brandTagline}>Where branding meets motion</span>
        </div>

        <div className={styles.divider} />

        <nav className={styles.nav} aria-label="Footer navigation">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={styles.navLink}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className={styles.divider} />

        <a
          className={styles.igBtn}
          href="https://www.instagram.com/dollhouse_studioss?igsh=dnhjcWpmeDJ1MWth"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className={styles.iconSvg}
            aria-hidden="true"
          >
            <path d="M17.5 2h-11A4.5 4.5 0 002 6.5v11A4.5 4.5 0 006.5 22h11a4.5 4.5 0 004.5-4.5v-11A4.5 4.5 0 0017.5 2zm2.25 15.5a2.25 2.25 0 01-2.25 2.25h-11A2.25 2.25 0 014.25 17.5v-11A2.25 2.25 0 016.5 4.25h11A2.25 2.25 0 0119.75 6.5v11z" />
            <path d="M12 7.25a4.75 4.75 0 104.75 4.75A4.76 4.76 0 0012 7.25zm0 7.75a3 3 0 113-3 3 3 0 01-3 3z" />
            <circle cx="17.8" cy="6.2" r="0.8" />
          </svg>
          Follow us
        </a>
      </div>

      <div className={styles.bottom}>
        <p className={styles.copy}>© 2025 Dollhouse Studios. All rights reserved.</p>
        <p className={styles.accentLine}>Crafting Digital Dimensions.</p>
      </div>
    </footer>
  );
}
