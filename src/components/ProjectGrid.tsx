"use client";

import {
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Props = {
  children: ReactNode;
  className?: string;
};

/**
 * Masonry wrapper with a single gentle scroll reveal + stagger for item nodes.
 */
export default function ProjectGrid({ children, className }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(
        root.querySelectorAll("[data-project-item]"),
      );
      if (!items.length) return;

      gsap.fromTo(
        items,
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 0.88,
          ease: "power2.out",
          stagger: 0.055,
          scrollTrigger: {
            trigger: root,
            start: "top 84%",
            once: true,
          },
        },
      );
    }, root);

    return () => ctx.revert();
    // Grid structure is static per route; animate once on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={rootRef} className={className ?? "masonry"}>
      {children}
    </div>
  );
}
