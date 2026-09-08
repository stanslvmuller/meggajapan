"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { searchCommunities } from "@/data/communities";

export default function SearchBox({ compact = false }: { compact?: boolean }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  const results = searchCommunities(query).slice(0, 6);

  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (!wrapRef.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  function submit(event: React.SyntheticEvent) {
    event.preventDefault();
    if (!query.trim()) return;
    setOpen(false);
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  }

  return (
    <div ref={wrapRef} className="relative w-full">
      <form onSubmit={submit} className="flex w-full">
        <input
          type="search"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder="Search studios, series and creators"
          aria-label="Search studios, series and creators"
          className={`w-full min-w-0 rounded-l-[5px] border-none bg-white px-3 text-[14px] text-ink outline-none placeholder:text-[#8a8a8a] ${
            compact ? "h-[38px]" : "h-[44px] lg:h-[48px]"
          }`}
        />
        <button
          type="submit"
          aria-label="Search"
          className={`flex shrink-0 items-center justify-center rounded-r-[5px] bg-red-hot px-4 text-white transition-colors hover:bg-red-dark lg:px-6 ${
            compact ? "h-[38px]" : "h-[44px] lg:h-[48px]"
          }`}
        >
          <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>
        </button>
      </form>

      {open && query.trim().length > 0 && (
        <div className="absolute left-0 right-0 top-full z-40 mt-1 overflow-hidden rounded-[5px] border border-line bg-white shadow-card">
          {results.length === 0 ? (
            <p className="px-4 py-4 text-[13px] text-grey-mid">
              No communities match &ldquo;{query}&rdquo;.
            </p>
          ) : (
            <ul>
              {results.map((community) => (
                <li key={community.slug} className="border-b border-line-soft last:border-b-0">
                  <Link
                    href={`/support/${community.slug}`}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 px-3 py-2 transition-colors hover:bg-panel"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-[4px] bg-panel">
                      <Image
                        src={community.art}
                        alt=""
                        width={40}
                        height={40}
                        className="h-8 w-8 object-contain"
                      />
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-[13px] font-bold text-ink">
                        {community.name}
                      </span>
                      <span className="block truncate text-[12px] text-grey-mid">
                        {community.creator}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={submit}
                  className="w-full bg-panel px-3 py-2 text-left text-[12px] font-bold uppercase tracking-wide text-ink transition-colors hover:text-red"
                >
                  See all results for &ldquo;{query}&rdquo;
                </button>
              </li>
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
