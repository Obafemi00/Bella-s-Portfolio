"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Link from "next/link";
import gsap from "gsap";
import styles from "./Hero.module.css";

const HERO_VIDEO =
  "/3D Animation/3D Product Animation Headphones Blender.mp4";

type Props = {
  /** In-flow site header — sits above hero copy, layered over the video. */
  children?: ReactNode;
};

export default function Hero({ children }: Props) {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(
      headlineRef.current,
      { opacity: 0, y: 28, filter: "blur(8px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.15 },
    )
      .fromTo(
        subRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.95 },
        "-=0.72",
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.85 },
        "-=0.65",
      );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section className={styles.hero} aria-label="Introduction">
      {children ? (
        <div className={styles.headerSlot}>{children}</div>
      ) : null}

      <div className={styles.videoWrap} aria-hidden>
        <video
          className={styles.video}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
        <div className={styles.scrim} />
      </div>

      <div className={styles.body}>
        <div className={styles.content}>
          <h1 ref={headlineRef} className={styles.headline}>
            Crafting Digital Dimensions.
          </h1>
          <p ref={subRef} className={styles.subhead}>
            Dollhouse Studios: Where Branding meets the fluid motion of 2D and
            3D storytelling.
          </p>
          <Link
            ref={ctaRef}
            href="/projects"
            className={styles.cta}
            style={{ opacity: 0 }}
          >
            View Projects
          </Link>
        </div>
      </div>
    </section>
  );
}
