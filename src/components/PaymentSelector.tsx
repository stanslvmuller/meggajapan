"use client";

import { PAYMENT_METHODS } from "@/data/payments";
import { RevolutMark } from "./BrandMarks";

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
            <span className="flex-1">{method.label}</span>
            {method.id === "revolut" && <RevolutMark />}
            {method.externalUrl && (
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0 text-grey-mid"
                aria-hidden
              >
                <path d="M14 4h6v6" />
                <path d="M20 4 10 14" />
                <path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
              </svg>
            )}
          </button>
        );
      })}
    </div>
  );
}
