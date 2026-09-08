import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CommunityGallery from "@/components/CommunityGallery";
import RecentSupporters from "@/components/RecentSupporters";
import RelatedCommunities from "@/components/RelatedCommunities";
import SupportPanel from "@/components/SupportPanel";
import { communities, getCommunity, getRelated } from "@/data/communities";

export function generateStaticParams() {
  return communities.map((community) => ({ slug: community.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const community = getCommunity(slug);
  if (!community) return { title: "Not found" };
  return {
    title: `Support ${community.name}`,
    description: `Support the creators behind the world of ${community.name}.`,
  };
}

export default async function SupportDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const community = getCommunity(slug);
  if (!community) notFound();

  const related = getRelated(community);

  return (
    <div className="shell py-4 sm:py-6">
      <nav aria-label="Breadcrumb" className="mb-4 text-[12px] text-grey-mid">
        <Link href="/" className="transition-colors hover:text-red">
          Home
        </Link>
        <span className="mx-1.5">&gt;</span>
        <Link href="/studios" className="transition-colors hover:text-red">
          Studios
        </Link>
        <span className="mx-1.5">&gt;</span>
        <span className="text-ink">{community.name}</span>
      </nav>

      <div className="grid gap-6 lg:grid-cols-2 lg:gap-10">
        <div className="lg:sticky lg:top-4 lg:self-start">
          <CommunityGallery
            name={community.name}
            art={community.art}
            tint={community.tint}
            gallery={community.gallery}
          />
        </div>

        <SupportPanel community={community} />
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:gap-10">
        <section>
          <h2 className="mb-3 text-[15px] font-bold uppercase tracking-wide text-ink">
            About
          </h2>
          <div className="space-y-3 text-[14px] leading-relaxed text-[#444]">
            {community.about.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <h2 className="mb-3 mt-7 text-[15px] font-bold uppercase tracking-wide text-ink">
            Where your support goes
          </h2>
          <ul className="overflow-hidden rounded-[5px] border border-line">
            {community.allocation.map((row) => (
              <li
                key={row.label}
                className="flex flex-col gap-0.5 border-b border-line px-3 py-3 last:border-b-0 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
              >
                <span className="text-[14px] font-bold text-ink">{row.label}</span>
                <span className="text-[13px] text-grey-mid sm:text-right">
                  {row.note}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-2 text-[11px] leading-relaxed text-grey-mid">
            Franchise names, characters and product photography are the property
            of their respective owners.
          </p>
        </section>

        <RecentSupporters community={community} />
      </div>

      <div className="mt-12">
        <RelatedCommunities communities={related} />
      </div>
    </div>
  );
}
