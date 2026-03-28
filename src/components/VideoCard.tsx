"use client";

import {
  useEffect,
  useRef,
  useId,
} from "react";
import styles from "./MediaCards.module.css";

type Props = {
  src: string;
  className?: string;
};

export default function VideoCard({ src, className }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const id = useId();

  useEffect(() => {
    const wrap = wrapRef.current;
    const video = videoRef.current;
    if (!wrap || !video) return;

    const io = new IntersectionObserver(
      (entries) => {
        const [e] = entries;
        if (!e) return;
        if (e.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.22, rootMargin: "0px 0px -8% 0px" },
    );

    io.observe(wrap);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={wrapRef}
      className={[styles.frame, className].filter(Boolean).join(" ")}
      data-project-item
    >
      <video
        ref={videoRef}
        id={id}
        className={styles.video}
        src={src}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label="Project video"
      />
    </div>
  );
}
