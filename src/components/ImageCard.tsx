/* Native <img> preserves mixed aspect ratios in masonry grids. */
/* eslint-disable @next/next/no-img-element */
"use client";

import styles from "./MediaCards.module.css";

type Props = {
  src: string;
  alt: string;
  onOpen?: () => void;
  className?: string;
};

export default function ImageCard({ src, alt, onOpen, className }: Props) {
  const img = (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={styles.imageNatural}
    />
  );

  if (onOpen) {
    return (
      <button
        type="button"
        className={[styles.frame, styles.imageBtn, className]
          .filter(Boolean)
          .join(" ")}
        data-project-item
        onClick={onOpen}
        aria-label={`Open ${alt}`}
      >
        {img}
      </button>
    );
  }

  return (
    <div
      className={[styles.frame, className].filter(Boolean).join(" ")}
      data-project-item
    >
      {img}
    </div>
  );
}
