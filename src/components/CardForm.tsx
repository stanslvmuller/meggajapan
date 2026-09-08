"use client";

import { useState } from "react";
import {
  AmexMark,
  BrandMark,
  JcbMark,
  MastercardMark,
  VisaMark,
  detectBrand,
  type CardBrand,
} from "./BrandMarks";

/**
 * Card entry UI only.
 *
 * Nothing typed here is stored, logged or sent anywhere: the values live in
 * component state for the life of the dialog and are discarded when it closes.
 * There is no acquirer wired up, so every submission is declined.
 */

function formatNumber(value: string, brand: CardBrand) {
  const digits = value.replace(/\D/g, "").slice(0, brand === "amex" ? 15 : 16);
  if (brand === "amex") {
    return digits.replace(/(.{4})(.{0,6})(.{0,5}).*/, (_, a, b, c) =>
      [a, b, c].filter(Boolean).join(" "),
    );
  }
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

  const brand = detectBrand(number);
  const cvcLength = brand === "amex" ? 4 : 3;
  const minDigits = brand === "amex" ? 15 : 15;

  const complete =
    number.replace(/\s/g, "").length >= minDigits &&
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
    }, 1500);
  }

  const field =
    "h-[44px] w-full rounded-[5px] border border-line bg-white px-3 text-[14px] text-ink outline-none transition-colors focus:border-ink";

  return (
    <form onSubmit={submit} autoComplete="off" noValidate>
      {/* Accepted networks */}
      <div className="mb-3 flex items-center justify-between">
        <span className="label-cap">Pay with card</span>
        <span className="flex items-center gap-1">
          <VisaMark className={brand === "visa" || brand === "unknown" ? "" : "opacity-35"} />
          <MastercardMark
            className={brand === "mastercard" || brand === "unknown" ? "" : "opacity-35"}
          />
          <AmexMark className={brand === "amex" || brand === "unknown" ? "" : "opacity-35"} />
          <JcbMark className={brand === "jcb" || brand === "unknown" ? "" : "opacity-35"} />
        </span>
      </div>

      <div className="space-y-2.5">
        <label className="block">
          <span className="label-cap mb-1 block">Card number</span>
          <span className="relative block">
            <input
              value={number}
              onChange={(event) => setNumber(formatNumber(event.target.value, brand))}
              inputMode="numeric"
              autoComplete="off"
              placeholder="1234 1234 1234 1234"
              aria-label="Card number"
              className={`${field} pr-12 font-mono tracking-wide`}
            />
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
              <BrandMark brand={brand} />
            </span>
          </span>
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
            <span className="label-cap mb-1 block">
              CVC {brand === "amex" ? "(4 digits)" : ""}
            </span>
            <input
              value={cvc}
              onChange={(event) =>
                setCvc(event.target.value.replace(/\D/g, "").slice(0, cvcLength))
              }
              inputMode="numeric"
              autoComplete="off"
              placeholder={brand === "amex" ? "1234" : "123"}
              aria-label="Security code"
              className={`${field} font-mono`}
            />
          </label>
        </div>
      </div>

      {declined && (
        <div
          role="alert"
          className="mt-3 flex gap-2.5 rounded-[5px] border border-red bg-[#fff5f5] px-3 py-2.5"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#f71f2d"
            strokeWidth="2"
            className="mt-[1px] shrink-0"
            aria-hidden
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v6M12 16.5v.5" strokeLinecap="round" />
          </svg>
          <div>
            <p className="text-[13px] font-bold text-red">
              Card declined — code 05
            </p>
            <p className="mt-0.5 text-[12px] leading-relaxed text-[#8a2b2b]">
              Your bank did not authorise this payment. Check the details and try
              again, or choose another payment method.
            </p>
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={!complete || pending}
        className="btn-red mt-4 flex w-full items-center justify-center gap-2 py-3.5 disabled:cursor-not-allowed disabled:bg-[#c9c9c9]"
      >
        {pending ? (
          <>
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              className="animate-spin"
              aria-hidden
            >
              <circle
                cx="12"
                cy="12"
                r="9"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeDasharray="42"
                strokeLinecap="round"
                opacity="0.9"
              />
            </svg>
            Processing…
          </>
        ) : (
          `Pay $${amount}`
        )}
      </button>

      <p className="mt-2.5 flex items-center justify-center gap-1.5 text-[11px] text-grey-mid">
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden
        >
          <rect x="4" y="10" width="16" height="10" rx="2" />
          <path d="M8 10V7a4 4 0 0 1 8 0v3" />
        </svg>
        Encrypted and processed securely
      </p>

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
