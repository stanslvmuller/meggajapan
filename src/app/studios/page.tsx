import type { Metadata } from "next";
import Link from "next/link";
import StudiosBrowser from "@/components/StudiosBrowser";
import { groupLabel } from "@/data/categories";
import { CATEGORY_LABEL, type CategoryId } from "@/data/communities";

export const metadata: Metadata = {
  title: "Studios & Communities — Meccha Japan Support",
  description:
    "Browse the studios, series, characters and card games you can support.",
};

const VALID_CATEGORIES: CategoryId[] = [
  "anime",
  "games",
  "manga",
  "characters",
  "music",
  "tcg",
];

const VALID_SORTS = ["az", "trending", "supported"] as const;

export default async function StudiosPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const rawCategory = typeof params.category === "string" ? params.category : "";
  const rawSort = typeof params.sort === "string" ? params.sort : "";
  const rawGroup = typeof params.group === "string" ? params.group : "";

  const category = VALID_CATEGORIES.includes(rawCategory as CategoryId)
    ? (rawCategory as CategoryId)
    : null;
  const sort = (VALID_SORTS as readonly string[]).includes(rawSort)
    ? (rawSort as (typeof VALID_SORTS)[number])
    : "trending";
  const group = rawGroup ? rawGroup : null;

  const heading =
    (group && groupLabel(group)) ||
    (category && CATEGORY_LABEL[category]) ||
    "Studios & Communities";

  return (
    <div className="shell py-4 sm:py-6">
      <nav aria-label="Breadcrumb" className="mb-3 text-[12px] text-grey-mid">
        <Link href="/" className="transition-colors hover:text-red">
          Home
        </Link>
        <span className="mx-1.5">&gt;</span>
        <span className="text-ink">Studios</span>
      </nav>

      <div className="mb-5 border-b border-line pb-4">
        <h1 className="font-display text-[26px] leading-none text-red sm:text-[30px]">
          {heading}
        </h1>
        <p className="mt-2 max-w-[600px] text-[13px] leading-relaxed text-grey-mid">
          Choose a franchise, studio or publisher, then pick how you would like to
          contribute. New communities are added every month.
        </p>
      </div>

      <StudiosBrowser
        key={`${category ?? "all"}-${sort}-${group ?? "none"}`}
        initialCategory={category}
        initialSort={sort}
        group={group}
      />
    </div>
  );
}
