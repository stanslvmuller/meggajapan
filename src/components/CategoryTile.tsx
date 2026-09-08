import Image from "next/image";
import Link from "next/link";
import type { CategoryTileDef } from "@/data/categories";
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

export default function CategoryTile({ tile }: { tile: CategoryTileDef }) {
  return (
    <Link
      href={tile.href}
      className="group flex h-full flex-col overflow-hidden rounded-[5px] border border-line bg-white shadow-soft transition-shadow duration-150 hover:shadow-card"
    >
      <div
        className={`flex h-[120px] items-end justify-center overflow-hidden sm:h-[140px] ${
          TINT_CLASS[tile.tint]
        }`}
      >
        <Image
          src={tile.art}
          alt=""
          width={320}
          height={320}
          className="h-[108px] w-auto max-w-[80%] object-contain transition-transform duration-200 group-hover:scale-[1.05] sm:h-[126px]"
        />
      </div>
      <div className="flex flex-1 flex-col justify-center border-t border-line px-3 py-2.5">
        <h3 className="text-[13px] font-bold uppercase leading-tight text-ink transition-colors group-hover:text-red">
          {tile.label}
        </h3>
        <p className="mt-0.5 text-[12px] leading-snug text-grey-mid">{tile.note}</p>
      </div>
    </Link>
  );
}
