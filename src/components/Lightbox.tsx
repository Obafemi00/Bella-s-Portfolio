"use client";

import {
  useEffect,
  useRef,
  useCallback,
} from "react";
import gsap from "gsap";
import styles from "./Lightbox.module.css";

type Props = {
  open: boolean;
  items: { src: string; alt: string }[];
  index: number;
  onClose: () => void;
  onIndexChange: (index: number) => void;
};

export default function Lightbox({
  open,
  items,
  index,
  onClose,
  onIndexChange,
}: Props) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const safeIndex = Math.min(Math.max(index, 0), Math.max(items.length - 1, 0));
  const current = items[safeIndex];

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && items.length > 1) {
        onIndexChange((safeIndex + items.length - 1) % items.length);
      }
      if (e.key === "ArrowRight" && items.length > 1) {
        onIndexChange((safeIndex + 1) % items.length);
      }
    },
    [open, items.length, onClose, onIndexChange, safeIndex],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  useEffect(() => {
    if (!open) {
      document.body.style.overflow = "";
      return;
    }

    const backdrop = backdropRef.current;
    const panel = panelRef.current;
    if (!backdrop || !panel) return;

    document.body.style.overflow = "hidden";
    const tl = gsap.timeline();
    tl.fromTo(
      backdrop,
      { opacity: 0 },
      { opacity: 1, duration: 0.35, ease: "power2.out" },
    ).fromTo(
      panel,
      { opacity: 0, scale: 0.985 },
      { opacity: 1, scale: 1, duration: 0.45, ease: "power3.out" },
      "-=0.2",
    );

    return () => {
      tl.kill();
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const img = imgRef.current;
    if (!open || !img || !current) return;

    gsap.fromTo(
      img,
      { opacity: 0.85, filter: "blur(4px)" },
      { opacity: 1, filter: "blur(0px)", duration: 0.45, ease: "power2.out" },
    );
  }, [open, current, safeIndex]);

  if (!open || !current) return null;

  return (
    <div
      ref={backdropRef}
      className={styles.backdrop}
      role="presentation"
      onClick={onClose}
    >
      <div
        ref={panelRef}
        className={styles.panel}
        role="dialog"
        aria-modal="true"
        aria-label="Image preview"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className={styles.close}
          onClick={onClose}
          aria-label="Close"
        >
          Close
        </button>

        {items.length > 1 ? (
          <>
            <button
              type="button"
              className={styles.prev}
              aria-label="Previous image"
              onClick={() =>
                onIndexChange((safeIndex + items.length - 1) % items.length)
              }
            />
            <button
              type="button"
              className={styles.next}
              aria-label="Next image"
              onClick={() => onIndexChange((safeIndex + 1) % items.length)}
            />
          </>
        ) : null}

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={imgRef}
          src={current.src}
          alt={current.alt}
          className={styles.image}
        />
      </div>
    </div>
  );
}
