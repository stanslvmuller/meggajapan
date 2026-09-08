"use client";

import { CRYPTO_COINS, type CryptoCoinId } from "@/data/payments";

export default function CryptoSelector({
  selected,
  onSelect,
}: {
  selected: CryptoCoinId;
  onSelect: (id: CryptoCoinId) => void;
}) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {CRYPTO_COINS.map((coin) => {
        const active = selected === coin.id;
        return (
          <button
            key={coin.id}
            type="button"
            onClick={() => onSelect(coin.id)}
            aria-pressed={active}
            className={`flex h-[44px] flex-col items-center justify-center rounded-[5px] border leading-tight transition-colors ${
              active
                ? "border-ink bg-ink text-white"
                : "border-line bg-white text-ink hover:border-ink"
            }`}
          >
            <span className="text-[13px] font-bold">{coin.symbol}</span>
            <span
              className={`text-[11px] ${active ? "text-white/70" : "text-grey-mid"}`}
            >
              {coin.name}
            </span>
          </button>
        );
      })}
    </div>
  );
}
