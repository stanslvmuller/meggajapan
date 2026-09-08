"use client";

import { useMemo, useState } from "react";
import CommunityGrid from "./CommunityGrid";
import { matchesGroup } from "@/data/categories";
import {
  CATEGORY_LABEL,
  communities,
  type CategoryId,
} from "@/data/communities";

const CATEGORY_ORDER: CategoryId[] = [
  "anime",
  "games",
  "manga",
  "characters",
  "music",
  "tcg",
];

const SORTS = [
  { id: "az", label: "A–Z" },
  { id: "trending", label: "Trending" },
  { id: "supported", label: "Most Supported" },
] as const;

type SortId = (typeof SORTS)[number]["id"];

export default function StudiosBrowser({
  initialCategory,
  initialSort,
  group,
}: {
  initialCategory: CategoryId | null;
  initialSort: SortId;
  group: string | null;
}) {
  const [category, setCategory] = useState<CategoryId | null>(initialCategory);
  const [sort, setSort] = useState<SortId>(initialSort);
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = communities.filter((community) => {
      if (group && !matchesGroup(community, group)) return false;
      if (category && !community.categories.includes(category)) return false;
      if (!q) return true;
      return `${community.name} ${community.creator} ${community.blurb}`
        .toLowerCase()
        .includes(q);
    });

    const sorted = [...filtered];
    if (sort === "az") sorted.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "trending") sorted.sort((a, b) => b.weekly - a.weekly);
    if (sort === "supported") sorted.sort((a, b) => b.supporters - a.supporters);
    return sorted;
  }, [category, group, query, sort]);

  return (
    <div className="grid gap-6 lg:grid-cols-[220px_1fr] lg:gap-8">
      <aside className="lg:sticky lg:top-4 lg:self-start">
        <div className="rounded-[5px] border border-line">
          <div className="border-b border-line px-3 py-2.5">
            <h2 className="text-[13px] font-bold uppercase tracking-wide text-ink">
              Category
            </h2>
          </div>
          <ul className="p-1.5">
            <li>
              <button
                type="button"
                onClick={() => setCategory(null)}
                className={`w-full rounded-[4px] px-2.5 py-2 text-left text-[13px] transition-colors ${
                  category === null
                    ? "bg-ink font-bold text-white"
                    : "text-[#444] hover:bg-panel hover:text-ink"
                }`}
              >
                All communities
              </button>
            </li>
            {CATEGORY_ORDER.map((id) => (
              <li key={id}>
                <button
                  type="button"
                  onClick={() => setCategory(id)}
                  className={`flex w-full items-center justify-between rounded-[4px] px-2.5 py-2 text-left text-[13px] transition-colors ${
                    category === id
                      ? "bg-ink font-bold text-white"
                      : "text-[#444] hover:bg-panel hover:text-ink"
                  }`}
                >
                  {CATEGORY_LABEL[id]}
                  <span
                    className={
                      category === id ? "text-white/70" : "text-[#999]"
                    }
                  >
                    {
                      communities.filter((c) => c.categories.includes(id))
                        .length
                    }
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4 rounded-[5px] border border-line">
          <div className="border-b border-line px-3 py-2.5">
            <h2 className="text-[13px] font-bold uppercase tracking-wide text-ink">
              Sort
            </h2>
          </div>
          <ul className="p-1.5">
            {SORTS.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => setSort(item.id)}
                  className={`w-full rounded-[4px] px-2.5 py-2 text-left text-[13px] transition-colors ${
                    sort === item.id
                      ? "bg-ink font-bold text-white"
                      : "text-[#444] hover:bg-panel hover:text-ink"
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <div>
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search studios and communities"
            aria-label="Search studios and communities"
            className="h-[42px] w-full max-w-[340px] rounded-[5px] border border-line px-3 text-[14px] text-ink outline-none transition-colors focus:border-ink"
          />
          <p className="text-[13px] text-grey-mid">
            {results.length} {results.length === 1 ? "community" : "communities"}
          </p>
        </div>

        {results.length === 0 ? (
          <div className="rounded-[5px] border border-line bg-panel px-4 py-10 text-center">
            <p className="text-[14px] font-bold text-ink">No communities found.</p>
            <p className="mt-1 text-[13px] text-grey-mid">
              Try a different category or clear your search.
            </p>
          </div>
        ) : (
          <CommunityGrid communities={results} showSupporters columns="three" />
        )}
      </div>
    </div>
  );
}
