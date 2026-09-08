"use client";

import Image from "next/image";
import { useState } from "react";
import type { CardTint } from "@/data/communities";

const TINT_CLASS: Record<CardTint, string> = {
  graphite: "tint-graphite",
  silver: "tint-silver",
  aqua: "tint-aqua",
  blue: "tint-blue",
  coral: "tint-coral",
  orange: "tint-orange",
  pink: "tint-pink",
  yellow: "tint-yellow",
  lime: "tint-lime",
  violet: "tint-violet",
  cream: "tint-cream",
};

export default function CommunityGallery({
  name,
  art,
  tint,
  gallery,
}: {
  name: string;
  art: string;
  tint: CardTint;
  gallery: string[];
}) {
  const slides = [art, ...gallery];
  const [active, setActive] = useState(0);
  const isArt = active === 0;

  return (
    <div>
      <div
        className={`flex aspect-square w-full items-center justify-center overflow-hidden rounded-[5px] border border-line ${
          isArt ? TINT_CLASS[tint] : "bg-white"
        }`}
      >
        <Image
          key={slides[active]}
          src={slides[active]}
          alt={name}
          width={800}
          height={800}
          priority
          className={`object-contain ${
            isArt ? "max-h-[86%] max-w-[80%]" : "h-full w-full"
          }`}
        />
      </div>

      <div className="mt-2 grid grid-cols-5 gap-2 sm:grid-cols-7">
        {slides.map((src, index) => (
          <button
            key={src}
            type="button"
            onClick={() => setActive(index)}
            aria-label={`Show image ${index + 1} of ${slides.length}`}
            aria-current={active === index}
            className={`flex aspect-square items-center justify-center overflow-hidden rounded-[4px] border transition-colors ${
              active === index ? "border-ink" : "border-line hover:border-[#999]"
            } ${index === 0 ? TINT_CLASS[tint] : "bg-white"}`}
          >
            <Image
              src={src}
              alt=""
              width={160}
              height={160}
              className={
                index === 0
                  ? "max-h-[80%] max-w-[80%] object-contain"
                  : "h-full w-full object-contain"
              }
            />
          </button>
        ))}
      </div>
    </div>
  );
}
