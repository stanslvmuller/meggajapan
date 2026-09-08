"use client";

import { useState } from "react";
import AmountSelector from "./AmountSelector";
import CopyField from "./CopyField";
import CryptoSelector from "./CryptoSelector";
import FavoriteButton from "./FavoriteButton";
import PaymentSelector from "./PaymentSelector";
import {
  CRYPTO_COINS,
  PAYMENT_METHODS,
  shortenAddress,
  type CryptoCoinId,
} from "@/data/payments";
import SupportModal from "./SupportModal";
import type { Community } from "@/data/communities";

export default function SupportPanel({ community }: { community: Community }) {
  const [amount, setAmount] = useState<number | null>(25);
  const [custom, setCustom] = useState(false);
  const [methodId, setMethodId] = useState("card");
  const [coinId, setCoinId] = useState<CryptoCoinId>("btc");
  const [open, setOpen] = useState(false);

  const method =
    PAYMENT_METHODS.find((item) => item.id === methodId) ?? PAYMENT_METHODS[0];
  const coin = CRYPTO_COINS.find((item) => item.id === coinId) ?? CRYPTO_COINS[0];
  const valid = amount !== null && amount > 0;

  function selectPreset(value: number) {
    setCustom(false);
    setAmount(value);
  }

  function setCustomAmount(value: string) {
    setCustom(true);
    if (value === "") {
      setAmount(null);
      return;
    }
    const parsed = Number(value);
    setAmount(Number.isFinite(parsed) ? Math.min(Math.max(parsed, 0), 100000) : null);
  }

  return (
    <div>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="label-cap">{community.labels}</p>
          <h1 className="mt-1 text-[24px] font-bold leading-tight text-ink sm:text-[28px]">
            {community.name}
          </h1>
          <p className="mt-2 max-w-[440px] text-[14px] leading-relaxed text-[#444]">
            Support the creators behind the world of {community.name}.
          </p>
        </div>
        <FavoriteButton
          slug={community.slug}
          name={community.name}
          className="mt-1 h-9 w-9 shrink-0"
        />
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1 border-y border-line py-2.5 text-[13px]">
        <span className="text-grey-mid">
          Studio / publisher{" "}
          <strong className="font-bold text-ink">{community.creator}</strong>
        </span>
        <span className="text-grey-mid">
          <strong className="font-bold text-ink">
            {community.supporters.toLocaleString("en-US")}
          </strong>{" "}
          supporters
        </span>
      </div>

      <section className="mt-5">
        <h2 className="text-[15px] font-bold uppercase tracking-wide text-ink">
          Choose your support
        </h2>
        <p className="mb-3 mt-1 text-[13px] text-grey-mid">
          Pick an amount, or enter your own.
        </p>
        <AmountSelector
          amount={amount}
          custom={custom}
          onSelect={selectPreset}
          onCustom={setCustomAmount}
        />
      </section>

      <section className="mt-6">
        <h2 className="mb-3 text-[15px] font-bold uppercase tracking-wide text-ink">
          Payment method
        </h2>
        <PaymentSelector selected={methodId} onSelect={setMethodId} />
      </section>

      <section className="mt-6 rounded-[5px] border border-line bg-panel px-4 py-3">
        <h2 className="mb-1 text-[15px] font-bold uppercase tracking-wide text-ink">
          Direct Support
        </h2>
        <p className="mb-2 text-[12px] leading-relaxed text-grey-mid">
          Prefer to send your support yourself? Use the details below.
        </p>
        <CopyField label="Support ID" value={community.supportId} />
        <CopyField label="Destination" value={community.destination} />
        {methodId === "crypto" && (
          <div className="pt-3">
            <p className="label-cap mb-1.5">Choose a coin</p>
            <CryptoSelector selected={coinId} onSelect={setCoinId} />
            <div className="mt-1">
              <CopyField
                label={`${coin.name} address — ${coin.network}`}
                value={shortenAddress(community.walletAddresses[coinId])}
                copyValue={community.walletAddresses[coinId]}
                mono
              />
            </div>
          </div>
        )}
      </section>

      <div className="mt-6 hidden lg:block">
        <button
          type="button"
          disabled={!valid}
          onClick={() => setOpen(true)}
          className="btn-red w-full py-4 text-[13px] disabled:cursor-not-allowed disabled:bg-[#c9c9c9]"
        >
          Support {community.name}
          {valid ? ` — $${amount}` : ""}
        </button>
        <p className="mt-2 text-center text-[11px] text-grey-mid">
          You can review or repeat your support any time under My Support.
        </p>
      </div>

      {/* Sticky call to action on small screens. */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white px-3 py-2.5 shadow-[0_-2px_10px_rgba(0,0,0,0.12)] lg:hidden">
        <div className="mx-auto flex max-w-shell items-center gap-3">
          <div className="shrink-0">
            <p className="label-cap">Amount</p>
            <p className="text-[16px] font-bold leading-tight text-ink">
              {valid ? `$${amount}` : "—"}
            </p>
          </div>
          <button
            type="button"
            disabled={!valid}
            onClick={() => setOpen(true)}
            className="btn-red flex-1 py-3.5 disabled:cursor-not-allowed disabled:bg-[#c9c9c9]"
          >
            Support {community.name}
          </button>
        </div>
      </div>
      <div aria-hidden className="h-[64px] lg:hidden" />

      {open && valid && amount !== null && (
        <SupportModal
          community={community}
          amount={amount}
          method={method}
          coin={methodId === "crypto" ? coin : undefined}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
}
