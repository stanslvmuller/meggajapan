import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Support — Meccha Japan Support",
  description: "Everything you have supported so far.",
};

export default function MySupportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
