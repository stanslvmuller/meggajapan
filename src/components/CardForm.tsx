"use client";

import { useState } from "react";

/**
 * Card entry UI only.
 *
 * Nothing typed here is stored, logged or sent anywhere: the values live in
 * component state for the life of the dialog and are discarded when it closes.
 * There is no acquirer wired up, so every submission is declined.
 */

function formatNumber(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(.{4})/g, "$1 ").trim();
}

function formatExpiry(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length < 3) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

export default function CardForm({
  amount,
  onCancel,
}: {
  amount: number;
  onCancel: () => void;
}) {
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [pending, setPending] = useState(false);
  const [declined, setDeclined] = useState(false);

  const complete =
    number.replace(/\s/g, "").length >= 15 &&
    name.trim().length > 1 &&
    expiry.length === 5 &&
    cvc.length >= 3;

  function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!complete || pending) return;
    setDeclined(false);
    setPending(true);
    window.setTimeout(() => {
      setPending(false);
      setDeclined(true);
    }, 1400);
  }

  const field =
    "h-[42px] w-full rounded-[5px] border border-line px-3 text-[14px] text-ink outline-none transition-colors focus:border-ink";

  return (
    <form onSubmit={submit} autoComplete="off" noValidate>
      <div className="space-y-2.5">
        <label className="block">
          <span className="label-cap mb-1 block">Card number</span>
          <input
            value={number}
            onChange={(event) => setNumber(formatNumber(event.target.value))}
            inputMode="numeric"
            autoComplete="off"
            placeholder="0000 0000 0000 0000"
            aria-label="Card number"
            className={`${field} font-mono tracking-wide`}
          />
        </label>

        <label className="block">
          <span className="label-cap mb-1 block">Name on card</span>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            autoComplete="off"
            placeholder="As printed on the card"
            aria-label="Name on card"
            className={field}
          />
        </label>

        <div className="grid grid-cols-2 gap-2.5">
          <label className="block">
            <span className="label-cap mb-1 block">Expiry</span>
            <input
              value={expiry}
              onChange={(event) => setExpiry(formatExpiry(event.target.value))}
              inputMode="numeric"
              autoComplete="off"
              placeholder="MM/YY"
              aria-label="Expiry date"
              className={`${field} font-mono`}
            />
          </label>
          <label className="block">
            <span className="label-cap mb-1 block">CVC</span>
            <input
              value={cvc}
              onChange={(event) =>
                setCvc(event.target.value.replace(/\D/g, "").slice(0, 4))
              }
              inputMode="numeric"
              autoComplete="off"
              placeholder="123"
              aria-label="Security code"
              className={`${field} font-mono`}
            />
          </label>
        </div>
      </div>

      {declined && (
        <div
          role="alert"
          className="mt-3 rounded-[5px] border border-red bg-[#fff5f5] px-3 py-2.5"
        >
          <p className="text-[13px] font-bold text-red">Card declined</p>
          <p className="mt-0.5 text-[12px] leading-relaxed text-[#8a2b2b]">
            We couldn&rsquo;t authorise this card. Check the details and try
            again, or choose another payment method.
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={!complete || pending}
        className="btn-red mt-4 w-full py-3.5 disabled:cursor-not-allowed disabled:bg-[#c9c9c9]"
      >
        {pending ? "Processing…" : `Pay $${amount}`}
      </button>
      <button
        type="button"
        onClick={onCancel}
        className="mt-2 w-full text-[12px] font-bold uppercase tracking-wide text-grey-mid transition-colors hover:text-ink"
      >
        Choose another method
      </button>
    </form>
  );
}
