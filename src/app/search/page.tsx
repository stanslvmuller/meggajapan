import type { Metadata } from "next";
import Link from "next/link";
import CommunityGrid from "@/components/CommunityGrid";
import { searchCommunities } from "@/data/communities";

export const metadata: Metadata = {
  title: "Search",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const query = typeof params.q === "string" ? params.q : "";
  const results = searchCommunities(query);

  return (
    <div className="shell py-4 sm:py-6">
      <nav aria-label="Breadcrumb" className="mb-3 text-[12px] text-grey-mid">
        <Link href="/" className="transition-colors hover:text-red">
          Home
        </Link>
        <span className="mx-1.5">&gt;</span>
        <span className="text-ink">Search</span>
      </nav>

      <div className="mb-5 border-b border-line pb-4">
        <h1 className="font-display text-[26px] leading-none text-red sm:text-[30px]">
          Search results
        </h1>
        <p className="mt-2 text-[13px] text-grey-mid">
          {query ? (
            <>
              {results.length} {results.length === 1 ? "community" : "communities"}{" "}
              matching <strong className="font-bold text-ink">{query}</strong>
            </>
          ) : (
            "Enter a studio, series or creator in the search bar above."
          )}
        </p>
      </div>

      {query && results.length === 0 ? (
        <div className="rounded-[5px] border border-line bg-panel px-4 py-12 text-center">
          <p className="text-[15px] font-bold text-ink">No communities found.</p>
          <p className="mx-auto mt-1 max-w-[380px] text-[13px] leading-relaxed text-grey-mid">
            Try a shorter term, or browse the full directory.
          </p>
          <Link href="/studios" className="btn-black mt-5 px-6 py-3">
            Browse studios
          </Link>
        </div>
      ) : (
        results.length > 0 && <CommunityGrid communities={results} showSupporters />
      )}
    </div>
  );
}
