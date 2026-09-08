import CommunityGrid from "./CommunityGrid";
import SectionTitle from "./SectionTitle";
import type { Community } from "@/data/communities";

export default function RelatedCommunities({
  communities,
}: {
  communities: Community[];
}) {
  if (communities.length === 0) return null;

  return (
    <section>
      <SectionTitle title="You may also want to support" />
      <CommunityGrid communities={communities} />
    </section>
  );
}
