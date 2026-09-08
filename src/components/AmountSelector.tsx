"use client";

export const PRESET_AMOUNTS = [5, 10, 25, 50, 100];

export default function AmountSelector({
  amount,
  custom,
  onSelect,
  onCustom,
}: {
  amount: number | null;
  custom: boolean;
  onSelect: (value: number) => void;
  onCustom: (value: string) => void;
}) {
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {PRESET_AMOUNTS.map((value) => {
          const active = !custom && amount === value;
          return (
            <button
              key={value}
              type="button"
              onClick={() => onSelect(value)}
              aria-pressed={active}
              className={`h-[42px] min-w-[68px] rounded-[5px] border px-4 text-[14px] font-bold transition-colors ${
                active
                  ? "border-ink bg-ink text-white"
                  : "border-line bg-white text-ink hover:border-ink"
              }`}
            >
              ${value}
            </button>
          );
        })}
        <button
          type="button"
          onClick={() => onCustom("")}
          aria-pressed={custom}
          className={`h-[42px] min-w-[86px] rounded-[5px] border px-4 text-[14px] font-bold transition-colors ${
            custom
              ? "border-ink bg-ink text-white"
              : "border-line bg-white text-ink hover:border-ink"
          }`}
        >
          Custom
        </button>
      </div>

      {custom && (
        <label className="mt-3 flex h-[42px] max-w-[220px] items-center rounded-[5px] border border-ink bg-white pl-3">
          <span className="text-[15px] font-bold text-ink">$</span>
          <input
            type="number"
            min={1}
            max={100000}
            step={1}
            autoFocus
            value={amount ?? ""}
            onChange={(event) => onCustom(event.target.value)}
            placeholder="Enter an amount"
            aria-label="Custom support amount in US dollars"
            className="h-full w-full bg-transparent px-2 text-[15px] font-bold text-ink outline-none placeholder:font-normal placeholder:text-[#9a9a9a]"
          />
        </label>
      )}
    </div>
  );
}
