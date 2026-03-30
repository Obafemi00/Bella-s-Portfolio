"use client";

import { useState } from "react";
import type { MediaItem } from "@/lib/mediaTypes";
import ImageCard from "@/components/ImageCard";
import Lightbox from "@/components/Lightbox";
import ProjectGrid from "@/components/ProjectGrid";
import VideoCard from "@/components/VideoCard";

type Props = {
  items: MediaItem[];
};

export default function BrandingGallery({ items }: Props) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const imageItems = items.filter((item) => item.kind === "image");
  const slides = imageItems.map((item) => ({
    src: item.url,
    alt: item.filename,
  }));

  return (
    <>
      <ProjectGrid>
        {items.map((item) => (
          <div key={item.id} className="masonry-item">
            {item.kind === "video" ? (
              <VideoCard src={item.url} />
            ) : (
              <ImageCard
                src={item.url}
                alt={item.filename}
                onOpen={() => {
                  const imageIndex = imageItems.findIndex(
                    (image) => image.id === item.id,
                  );
                  if (imageIndex >= 0) {
                    setIndex(imageIndex);
                    setOpen(true);
                  }
                }}
              />
            )}
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
