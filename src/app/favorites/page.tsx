"use client";

import Link from "next/link";
import CommunityGrid from "@/components/CommunityGrid";
import { communities } from "@/data/communities";
import { useFavorites } from "@/lib/storage";

export default function FavoritesPage() {
  const { favorites, ready } = useFavorites();
  const saved = communities.filter((community) =>
    favorites.includes(community.slug),
  );

  return (
    <div className="shell py-4 sm:py-6">
      <nav aria-label="Breadcrumb" className="mb-3 text-[12px] text-grey-mid">
        <Link href="/" className="transition-colors hover:text-red">
          Home
        </Link>
        <span className="mx-1.5">&gt;</span>
        <span className="text-ink">Favorites</span>
      </nav>

      <div className="mb-5 border-b border-line pb-4">
        <h1 className="font-display text-[26px] leading-none text-red sm:text-[30px]">
          Favorites
        </h1>
        <p className="mt-2 text-[13px] text-grey-mid">
          The communities you saved for later.
        </p>
      </div>

      {!ready ? (
        <p className="py-10 text-center text-[13px] text-grey-mid">Loading…</p>
      ) : saved.length === 0 ? (
        <div className="rounded-[5px] border border-line bg-panel px-4 py-12 text-center">
          <p className="text-[15px] font-bold text-ink">Nothing saved yet.</p>
          <p className="mx-auto mt-1 max-w-[380px] text-[13px] leading-relaxed text-grey-mid">
            Tap the heart on any community card to keep it here for later.
          </p>
          <Link href="/studios" className="btn-black mt-5 px-6 py-3">
            Browse studios
          </Link>
        </div>
      ) : (
        <>
          <p className="mb-4 text-[13px] text-grey-mid">
            {saved.length} saved {saved.length === 1 ? "community" : "communities"}
          </p>
          <CommunityGrid communities={saved} showSupporters />
        </>
      )}
    </div>
  );
}
