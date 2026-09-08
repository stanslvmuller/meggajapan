import type { Community } from "@/data/communities";

/** Supporter names shown in the recent activity list. */
const NAMES = [
  "Alex",
  "Mika",
  "Jordan",
  "Anonymous",
  "Sae",
  "Nico",
  "Priya",
  "Tom",
  "Yuki",
  "Camille",
  "Ren",
  "Anonymous",
];

const AMOUNTS = [25, 10, 50, 5, 15, 100, 20, 5, 25, 10, 50, 5];
const MINUTES = [2, 8, 14, 27, 41, 58];

export default function RecentSupporters({ community }: { community: Community }) {
  const rows = MINUTES.map((minutes, index) => {
    const offset = (community.id + index * 5) % NAMES.length;
    return {
      name: NAMES[offset],
      amount: AMOUNTS[(community.id + index * 7) % AMOUNTS.length],
      minutes,
    };
  });

  return (
    <section>
      <h2 className="mb-3 text-[15px] font-bold uppercase tracking-wide text-ink">
        Recent supporters
      </h2>
      <ul className="overflow-hidden rounded-[5px] border border-line">
        {rows.map((row, index) => (
          <li
            key={`${row.name}-${row.minutes}`}
            className={`flex items-center justify-between gap-3 px-3 py-2.5 text-[13px] ${
              index % 2 === 1 ? "bg-panel" : "bg-white"
            }`}
          >
            <span className="flex items-center gap-2.5">
              <span
                aria-hidden
                className="flex h-7 w-7 items-center justify-center rounded-full bg-ink text-[11px] font-bold text-white"
              >
                {row.name === "Anonymous" ? "?" : row.name.charAt(0)}
              </span>
              <span className="font-bold text-ink">{row.name}</span>
            </span>
            <span className="flex items-center gap-4">
              <span className="font-bold text-ink">${row.amount}</span>
              <span className="w-[64px] text-right text-grey-mid">
                {row.minutes} min ago
              </span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
