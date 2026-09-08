import CommunityCard from "./CommunityCard";
import type { Community } from "@/data/communities";

export default function CommunityGrid({
  communities,
  showSupporters = false,
  columns = "four",
}: {
  communities: Community[];
  showSupporters?: boolean;
  columns?: "three" | "four";
}) {
  const cols =
    columns === "three"
      ? "grid-cols-2 md:grid-cols-3"
      : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4";

  return (
    <div className={`grid gap-3 sm:gap-4 ${cols}`}>
      {communities.map((community) => (
        <CommunityCard
          key={community.slug}
          community={community}
          showSupporters={showSupporters}
        />
      ))}
    </div>
  );
}
