"use client";

import { PAYMENT_METHODS } from "@/data/payments";

export default function PaymentSelector({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
      {PAYMENT_METHODS.map((method) => {
        const active = selected === method.id;
        return (
          <button
            key={method.id}
            type="button"
            onClick={() => onSelect(method.id)}
            aria-pressed={active}
            className={`flex h-[46px] items-center gap-2.5 rounded-[5px] border px-3 text-left text-[13px] font-bold transition-colors ${
              active
                ? "border-ink bg-panel text-ink"
                : "border-line bg-white text-ink hover:border-ink"
            }`}
          >
            <span
              aria-hidden
              className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                active ? "border-ink" : "border-[#bbb]"
              }`}
            >
              {active && <span className="h-2 w-2 rounded-full bg-ink" />}
            </span>
            {method.label}
          </button>
        );
      })}
    </div>
  );
}
