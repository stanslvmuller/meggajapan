import Image from "next/image";
import Link from "next/link";
import CategoryTile from "@/components/CategoryTile";
import CommunityGrid from "@/components/CommunityGrid";
import PromoBanner from "@/components/PromoBanner";
import SectionTitle from "@/components/SectionTitle";
import { categoryTiles } from "@/data/categories";
import { communities, featured, mostSupported } from "@/data/communities";

const STEPS = [
  {
    number: "01",
    title: "Find what you love",
    text: "Browse studios, series, games and characters.",
  },
  {
    number: "02",
    title: "Choose your support",
    text: "Select an amount and your preferred payment method.",
  },
  {
    number: "03",
    title: "Support the creators",
    text: "Your contribution is directed toward the selected creator or studio.",
  },
];

const REASSURANCE = [
  { title: `${communities.length} communities`, text: "Studios, series, characters and card games." },
  { title: "Support from $5", text: "Pick a preset amount or enter your own." },
  { title: "Six payment methods", text: "Card, Apple Pay, Google Pay, PayPal and more." },
];

export default function HomePage() {
  return (
    <div className="shell py-4 sm:py-6">
      <PromoBanner />

      <ul className="mt-4 grid gap-2 sm:grid-cols-3">
        {REASSURANCE.map((item) => (
          <li
            key={item.title}
            className="rounded-[5px] border border-line bg-panel px-4 py-3"
          >
            <p className="text-[13px] font-bold uppercase tracking-wide text-ink">
              {item.title}
            </p>
            <p className="mt-0.5 text-[12px] text-grey-mid">{item.text}</p>
          </li>
        ))}
      </ul>

      <section className="mt-10">
        <SectionTitle
          title="Featured Communities"
          note="The worlds fans are supporting right now."
          link={{ label: "All studios", href: "/studios" }}
        />
        <CommunityGrid communities={featured} />
      </section>

      <section className="mt-10">
        <SectionTitle
          title="Support by Category"
          note="Browse by what you follow."
        />
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
          {categoryTiles.map((tile) => (
            <CategoryTile key={tile.label} tile={tile} />
          ))}
        </div>
      </section>

      <section className="mt-10">
        <SectionTitle
          title="Most Supported This Week"
          link={{ label: "See ranking", href: "/studios?sort=supported" }}
        />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
          {mostSupported.map((community, index) => (
            <Link
              key={community.slug}
              href={`/support/${community.slug}`}
              className="group flex flex-col overflow-hidden rounded-[5px] border border-line bg-white shadow-soft transition-shadow hover:shadow-card"
            >
              <div className="relative aspect-square bg-white">
                <span className="absolute left-2 top-2 z-10 flex h-6 w-6 items-center justify-center rounded-[3px] bg-ink text-[11px] font-bold text-white">
                  {index + 1}
                </span>
                <Image
                  src={community.gallery[0]}
                  alt={`${community.name} merchandise`}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  className="object-contain p-2 transition-transform duration-200 group-hover:scale-[1.04]"
                />
              </div>
              <div className="border-t border-line px-2.5 py-2">
                <h3 className="truncate text-[13px] font-bold uppercase text-ink transition-colors group-hover:text-red">
                  {community.name}
                </h3>
                <p className="mt-0.5 text-[12px] text-grey-mid">
                  {(community.supporters / 1000).toFixed(1)}K supporters
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-[5px] border border-line bg-panel px-4 py-6 sm:px-8 sm:py-8">
        <SectionTitle title="How Support Works" />
        <ol className="grid gap-5 sm:grid-cols-3 sm:gap-8">
          {STEPS.map((step) => (
            <li key={step.number} className="border-t-2 border-ink pt-3">
              <p className="font-display text-[26px] leading-none text-red">
                {step.number}
              </p>
              <h3 className="mt-2 text-[15px] font-bold text-ink">{step.title}</h3>
              <p className="mt-1 text-[13px] leading-relaxed text-[#444]">
                {step.text}
              </p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
