import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Favorites — Meccha Japan Support",
  description: "The communities you saved for later.",
};

export default function FavoritesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
