"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import SearchBox from "./SearchBox";
import { useFavorites } from "@/lib/storage";

const NAV = [
  { label: "Explore", href: "/" },
  { label: "Studios", href: "/studios" },
  { label: "Anime & Manga", href: "/studios?category=anime" },
  { label: "Games", href: "/studios?category=games" },
  { label: "Characters", href: "/studios?category=characters" },
  { label: "Most Supported", href: "/studios?sort=supported" },
  { label: "How It Works", href: "/how-it-works" },
];

function Logo() {
  return (
    <Link href="/" className="flex shrink-0 items-end gap-2" aria-label="Meccha Japan Support — home">
      <Image
        src="/img/brand/logo-white.png"
        alt="Meccha Japan"
        width={200}
        height={92}
        priority
        className="h-[38px] w-auto lg:h-[46px]"
      />
      <span className="mb-[3px] rounded-[3px] border border-white/40 px-[6px] py-[1px] text-[10px] font-bold uppercase tracking-[0.22em] text-white lg:mb-[5px] lg:text-[11px]">
        Support
      </span>
    </Link>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { favorites } = useFavorites();

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header className="bg-ink text-white">
      {/* Utility bar */}
      <div className="border-b border-white/10 text-[12px]">
        <div className="shell flex h-9 items-center justify-between gap-4">
          <p className="hidden text-white/70 sm:block">Support the worlds you love.</p>
          <nav className="flex w-full items-center justify-between gap-3 sm:w-auto sm:justify-end sm:gap-5">
            <span className="flex items-center gap-1.5 text-white/80">
              <Image
                src="/img/flags/us.png"
                alt=""
                width={16}
                height={11}
                className="h-[11px] w-4"
              />
              English
            </span>
            <span className="text-white/80">USD $</span>
            <Link href="/how-it-works" className="text-white/80 transition-colors hover:text-white">
              Help
            </Link>
            <Link
              href="/how-it-works"
              className="whitespace-nowrap text-white/80 transition-colors hover:text-white"
            >
              About Support
            </Link>
          </nav>
        </div>
      </div>

      {/* Main header */}
      <div className="shell flex items-center gap-3 py-3 lg:gap-6 lg:py-4">
        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[5px] bg-ink-soft lg:hidden"
        >
          <span className="relative block h-[2px] w-[18px] bg-white before:absolute before:-top-[6px] before:block before:h-[2px] before:w-[18px] before:bg-white before:content-[''] after:absolute after:top-[6px] after:block after:h-[2px] after:w-[18px] after:bg-white after:content-['']" />
        </button>

        <Logo />

        <div className="hidden flex-1 lg:block">
          <SearchBox />
        </div>

        <div className="ml-auto flex items-center gap-2 lg:gap-3">
          <Link
            href="/my-support"
            className="flex h-[38px] items-center gap-2 rounded-[5px] bg-ink-soft px-3 text-[12px] font-bold transition-colors hover:bg-[#2f2f2f] lg:h-[48px] lg:px-4"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M12 3a4 4 0 1 1 0 8 4 4 0 0 1 0-8Zm0 10c4.42 0 8 2.24 8 5v2H4v-2c0-2.76 3.58-5 8-5Z" />
            </svg>
            <span className="hidden sm:inline">My Support</span>
          </Link>
          <Link
            href="/favorites"
            className="relative flex h-[38px] items-center gap-2 rounded-[5px] bg-ink-soft px-3 text-[12px] font-bold transition-colors hover:bg-[#2f2f2f] lg:h-[48px] lg:px-4"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M12 21s-7.5-4.7-9.5-9A5.2 5.2 0 0 1 12 6.2 5.2 5.2 0 0 1 21.5 12c-2 4.3-9.5 9-9.5 9Z" />
            </svg>
            <span className="hidden sm:inline">Favorites</span>
            {favorites.length > 0 && (
              <span className="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-red px-1 text-[10px] font-bold leading-none text-white">
                {favorites.length}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile search */}
      <div className="shell pb-3 lg:hidden">
        <SearchBox compact />
      </div>

      {/* Desktop navigation */}
      <nav className="hidden border-t border-white/10 lg:block">
        <div className="shell flex items-center gap-6 overflow-x-auto">
          {NAV.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="whitespace-nowrap border-b-2 border-transparent py-3 text-[13px] font-bold uppercase tracking-wide text-white transition-colors hover:border-red hover:text-red"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile navigation */}
      {menuOpen && (
        <nav className="border-t border-white/10 lg:hidden">
          <ul className="shell py-2">
            {NAV.map((item) => (
              <li key={item.label} className="border-b border-white/10 last:border-b-0">
                <Link
                  href={item.href}
                  className="block py-3 text-[13px] font-bold uppercase tracking-wide text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
