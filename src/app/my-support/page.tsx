"use client";

import Image from "next/image";
import Link from "next/link";
import { getCommunity } from "@/data/communities";
import { useSupportHistory } from "@/lib/storage";

function formatDate(value: string) {
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function MySupportPage() {
  const { history, ready } = useSupportHistory();
  const total = history.reduce((sum, entry) => sum + entry.amount, 0);

  return (
    <div className="shell py-4 sm:py-6">
      <nav aria-label="Breadcrumb" className="mb-3 text-[12px] text-grey-mid">
        <Link href="/" className="transition-colors hover:text-red">
          Home
        </Link>
        <span className="mx-1.5">&gt;</span>
        <span className="text-ink">My Support</span>
      </nav>

      <div className="mb-5 flex flex-wrap items-end justify-between gap-4 border-b border-line pb-4">
        <div>
          <h1 className="font-display text-[26px] leading-none text-red sm:text-[30px]">
            My Support
          </h1>
          <p className="mt-2 text-[13px] text-grey-mid">
            Everything you have supported so far.
          </p>
        </div>
        <dl className="flex gap-6">
          <div>
            <dt className="label-cap">Entries</dt>
            <dd className="text-[18px] font-bold text-ink">{history.length}</dd>
          </div>
          <div>
            <dt className="label-cap">Total</dt>
            <dd className="text-[18px] font-bold text-ink">${total}</dd>
          </div>
        </dl>
      </div>

      {/* Table on desktop */}
      <div className="hidden overflow-hidden rounded-[5px] border border-line sm:block">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-panel">
              <th className="px-4 py-2.5 text-[12px] font-bold uppercase tracking-wide text-ink">
                Community
              </th>
              <th className="px-4 py-2.5 text-[12px] font-bold uppercase tracking-wide text-ink">
                Amount
              </th>
              <th className="px-4 py-2.5 text-[12px] font-bold uppercase tracking-wide text-ink">
                Method
              </th>
              <th className="px-4 py-2.5 text-right text-[12px] font-bold uppercase tracking-wide text-ink">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {history.map((entry, index) => {
              const community = getCommunity(entry.slug);
              return (
                <tr
                  key={`${entry.slug}-${entry.date}-${index}`}
                  className="border-t border-line"
                >
                  <td className="px-4 py-3">
                    <Link
                      href={`/support/${entry.slug}`}
                      className="flex items-center gap-3"
                    >
                      {community && (
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-[4px] bg-panel">
                          <Image
                            src={community.art}
                            alt=""
                            width={80}
                            height={80}
                            className="h-8 w-auto object-contain"
                          />
                        </span>
                      )}
                      <span className="text-[14px] font-bold text-ink transition-colors hover:text-red">
                        {entry.name}
                      </span>
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-[14px] font-bold text-ink">
                    ${entry.amount}
                  </td>
                  <td className="px-4 py-3 text-[13px] text-[#444]">{entry.method}</td>
                  <td className="px-4 py-3 text-right text-[13px] text-grey-mid">
                    {formatDate(entry.date)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Cards on mobile */}
      <ul className="space-y-2 sm:hidden">
        {history.map((entry, index) => {
          const community = getCommunity(entry.slug);
          return (
            <li
              key={`${entry.slug}-${entry.date}-${index}`}
              className="rounded-[5px] border border-line p-3"
            >
              <Link href={`/support/${entry.slug}`} className="flex items-center gap-3">
                {community && (
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-[4px] bg-panel">
                    <Image
                      src={community.art}
                      alt=""
                      width={80}
                      height={80}
                      className="h-10 w-auto object-contain"
                    />
                  </span>
                )}
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[14px] font-bold text-ink">
                    {entry.name}
                  </span>
                  <span className="block text-[12px] text-grey-mid">
                    {entry.method} · {formatDate(entry.date)}
                  </span>
                </span>
                <span className="text-[15px] font-bold text-ink">${entry.amount}</span>
              </Link>
            </li>
          );
        })}
      </ul>

      <p className="mt-4 text-[11px] text-grey-mid">
        {ready
          ? "Receipts for each contribution are sent to the email address used at checkout."
          : "Loading your support history…"}
      </p>

      <div className="mt-6">
        <Link href="/studios" className="btn-black px-6 py-3">
          Explore studios
        </Link>
      </div>
    </div>
  );
}
