"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  CATEGORY_HREF,
  CATEGORY_LABEL,
  type CategorySlug,
} from "@/lib/categories";
import styles from "./FloatingCategoryCards.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export type CategoryCardConfig = {
  slug: CategorySlug;
  previewUrl: string | null;
  previewIsVideo: boolean;
};

const ORDER: CategorySlug[] = ["2d", "3d", "ai-video", "branding"];

type Props = {
  configs: CategoryCardConfig[];
};

export default function FloatingCategoryCards({ configs }: Props) {
  const ordered = ORDER.map((slug) =>
    configs.find((c) => c.slug === slug),
  ).filter((c): c is CategoryCardConfig => c != null);

  const rootRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const cards = cardRefs.current.filter(Boolean);
    if (!cards.length) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top 86%",
          once: true,
        },
      });

      tl.fromTo(
        cards,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.1,
          onComplete: () => {
            cards.forEach((el, i) => {
              gsap.to(el, {
                y: 6 + (i % 3) * 2,
                x: (i % 2 === 0 ? 2.5 : -2.5) + (i === 1 ? 1.5 : 0),
                rotation: i % 2 === 0 ? 0.3 : -0.35,
                duration: 5.5 + i * 0.55,
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true,
              });
            });
          },
        },
      );
    }, root);

    return () => {
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section ref={rootRef} className={styles.section} aria-label="Work categories">
      <div className={styles.inner}>
        <div className={styles.grid}>
          {ordered.map((cfg, index) => {
            const href = CATEGORY_HREF[cfg.slug];
            const label = CATEGORY_LABEL[cfg.slug];
            return (
              <Link
                key={cfg.slug}
                href={href}
                className={styles.card}
                ref={(node) => {
                  cardRefs.current[index] = node;
                }}
                style={{ opacity: 0 }}
              >
                <div className={styles.cardInner}>
                  <div className={styles.media}>
                    {cfg.previewUrl && cfg.previewIsVideo ? (
                      <video
                        className={styles.cover}
                        src={cfg.previewUrl}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                      />
                    ) : cfg.previewUrl ? (
                      <Image
                        className={styles.cover}
                        src={cfg.previewUrl}
                        alt=""
                        fill
                        sizes="(max-width: 720px) 100vw, 50vw"
                      />
                    ) : null}
                  </div>
                  <div className={styles.meta}>
                    <span className={styles.label}>{label}</span>
                    <span>Open collection</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
