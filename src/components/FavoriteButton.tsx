"use client";

import { useFavorites } from "@/lib/storage";

export default function FavoriteButton({
  slug,
  name,
  className = "",
}: {
  slug: string;
  name: string;
  className?: string;
}) {
  const { isFavorite, toggle, ready } = useFavorites();
  const active = ready && isFavorite(slug);

  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={active ? `Remove ${name} from favorites` : `Add ${name} to favorites`}
      title={active ? "Remove from favorites" : "Add to favorites"}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        toggle(slug);
      }}
      className={`flex h-8 w-8 items-center justify-center rounded-full border border-line bg-white/95 transition-colors hover:border-red ${className}`}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill={active ? "#f71f2d" : "none"}
        stroke={active ? "#f71f2d" : "#666"}
        strokeWidth="2"
        aria-hidden
      >
        <path d="M12 20.5s-7-4.4-8.9-8.4A4.9 4.9 0 0 1 12 6.4a4.9 4.9 0 0 1 8.9 5.7c-1.9 4-8.9 8.4-8.9 8.4Z" />
      </svg>
    </button>
  );
}
