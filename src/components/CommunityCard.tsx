import Image from "next/image";
import Link from "next/link";
import FavoriteButton from "./FavoriteButton";
import type { Community } from "@/data/communities";

const TINT_CLASS: Record<Community["tint"], string> = {
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

export default function CommunityCard({
  community,
  showSupporters = false,
}: {
  community: Community;
  showSupporters?: boolean;
}) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[5px] border border-line bg-white shadow-soft transition-shadow duration-150 hover:shadow-card">
      <div className="absolute right-2 top-2 z-10">
        <FavoriteButton slug={community.slug} name={community.name} />
      </div>

      <Link href={`/support/${community.slug}`} className="block">
        <div
          className={`relative flex h-[190px] items-end justify-center overflow-hidden sm:h-[210px] ${
            TINT_CLASS[community.tint]
          }`}
        >
          <Image
            src={community.art}
            alt={community.name}
            width={420}
            height={420}
            className="h-[172px] w-auto max-w-[85%] object-contain transition-transform duration-200 group-hover:scale-[1.04] sm:h-[192px]"
          />
        </div>
      </Link>

      <div className="flex flex-1 flex-col border-t border-line p-3">
        <Link href={`/support/${community.slug}`}>
          <h3 className="text-[14px] font-bold uppercase leading-tight text-ink transition-colors group-hover:text-red">
            {community.name}
          </h3>
        </Link>
        <p className="mt-1 text-[12px] leading-snug text-grey-mid">{community.creator}</p>

        {showSupporters && (
          <p className="mt-2 text-[12px] font-bold text-ink">
            {community.supporters.toLocaleString("en-US")} supporters
          </p>
        )}

        <Link
          href={`/support/${community.slug}`}
          className="btn-black mt-3 w-full"
        >
          Support <span aria-hidden className="ml-1">→</span>
        </Link>
      </div>
    </article>
  );
}
