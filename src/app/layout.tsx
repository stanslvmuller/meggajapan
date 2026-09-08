import type { Metadata } from "next";
import { Luckiest_Guy, Noto_Sans } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-noto",
  display: "swap",
});

const luckiestGuy = Luckiest_Guy({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-luckiest",
  display: "swap",
});

const SITE_URL = "https://meccha.kangenkikin.com";
const SITE_NAME = "Meccha Japan Support";
const SITE_DESCRIPTION =
  "A simple place for fans to support the studios and creators behind their favourite worlds.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Meccha Japan Support — Support the worlds you love",
    template: "%s — Meccha Japan Support",
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "Meccha Japan",
    "fan support",
    "anime",
    "manga",
    "games",
    "Pokémon",
    "Hatsune Miku",
    "Sanrio",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Meccha Japan Support — Support the worlds you love",
    description: SITE_DESCRIPTION,
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Meccha Japan Support — support the worlds you love",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Meccha Japan Support — Support the worlds you love",
    description: SITE_DESCRIPTION,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${notoSans.variable} ${luckiestGuy.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
