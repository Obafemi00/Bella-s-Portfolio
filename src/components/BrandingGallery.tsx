"use client";

import { useState } from "react";
import type { MediaItem } from "@/lib/mediaTypes";
import ImageCard from "@/components/ImageCard";
import Lightbox from "@/components/Lightbox";
import ProjectGrid from "@/components/ProjectGrid";

type Props = {
  items: MediaItem[];
};

export default function BrandingGallery({ items }: Props) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const slides = items.map((item) => ({
    src: item.url,
    alt: item.filename,
  }));

  return (
    <>
      <ProjectGrid>
        {items.map((item, i) => (
          <div key={item.id} className="masonry-item">
            <ImageCard
              src={item.url}
              alt={item.filename}
              onOpen={() => {
                setIndex(i);
                setOpen(true);
              }}
            />
          </div>
        ))}
      </ProjectGrid>

      <Lightbox
        open={open}
        items={slides}
        index={index}
        onClose={() => setOpen(false)}
        onIndexChange={setIndex}
      />
    </>
  );
}
