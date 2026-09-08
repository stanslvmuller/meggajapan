"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import CardForm from "./CardForm";
import {
  SUPPORT_ADDRESSES,
  shortenAddress,
  type CryptoCoin,
  type PaymentMethod,
} from "@/data/payments";
import type { Community } from "@/data/communities";
import { useSupportHistory } from "@/lib/storage";

export default function SupportModal({
  community,
  amount,
  method,
  coin,
  onClose,
  onChangeMethod,
}: {
  community: Community;
  amount: number;
  method: PaymentMethod;
  /** Only set when the crypto method is selected. */
  coin?: CryptoCoin;
  onClose: () => void;
  onChangeMethod: () => void;
}) {
  const [confirmed, setConfirmed] = useState(false);
  const { add } = useSupportHistory();

  const isCard = method.id === "card";
  const isCrypto = method.id === "crypto" && Boolean(coin);
  const methodLabel = isCrypto ? `Crypto — ${coin!.symbol}` : method.label;
  const methodDetail = isCrypto
    ? `${coin!.name} (${coin!.symbol})`
    : method.detail;

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [onClose]);

  function confirm() {
    if (method.externalUrl) {
      window.open(method.externalUrl, "_blank", "noopener,noreferrer");
    }
    add({
      slug: community.slug,
      name: community.name,
      amount,
      method: methodLabel,
      date: new Date().toISOString().slice(0, 10),
    });
    setConfirmed(true);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/55 p-0 sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`Support ${community.name}`}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="max-h-full w-full max-w-[440px] overflow-y-auto rounded-t-[8px] bg-white shadow-card sm:rounded-[6px]">
        <div className="flex items-center justify-between border-b border-line px-5 py-3">
          <h2 className="text-[14px] font-bold uppercase tracking-wide text-ink">
            {confirmed
              ? "Support recorded"
              : isCard
                ? "Card details"
                : "Confirm your support"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-7 w-7 items-center justify-center rounded-full text-[18px] leading-none text-grey-mid transition-colors hover:bg-panel hover:text-ink"
          >
            ×
          </button>
        </div>

        {confirmed ? (
          <div className="px-5 py-6 text-center">
            <div className="mx-auto flex h-[92px] w-[92px] items-center justify-center overflow-hidden rounded-full bg-panel">
              <Image
                src={community.art}
                alt=""
                width={180}
                height={180}
                className="h-[74px] w-auto object-contain"
              />
            </div>
            <p className="mt-4 text-[17px] font-bold text-ink">
              Thank you for supporting {community.name}!
            </p>
            <p className="mx-auto mt-2 max-w-[320px] text-[13px] leading-relaxed text-grey-mid">
              {method.externalUrl
                ? `Finish the payment in the ${method.label} window that just opened. Your support has been added to your support history.`
                : "Your support has been recorded and added to your support history."}
            </p>

            <div className="mt-5 flex flex-col gap-2 sm:flex-row">
              <Link href="/my-support" className="btn-black flex-1 py-3">
                View my support
              </Link>
              <button type="button" onClick={onClose} className="btn-ghost flex-1 py-3">
                Close
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="px-5 py-4">
              <p className="label-cap">You are supporting</p>
              <div className="mt-2 flex items-center gap-3 rounded-[5px] border border-line p-3">
                <span className="flex h-[54px] w-[54px] shrink-0 items-center justify-center overflow-hidden rounded-[4px] bg-panel">
                  <Image
                    src={community.art}
                    alt=""
                    width={120}
                    height={120}
                    className="h-[44px] w-auto object-contain"
                  />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[15px] font-bold text-ink">
                    {community.name}
                  </span>
                  <span className="block truncate text-[12px] text-grey-mid">
                    {community.creator}
                  </span>
                </span>
                <span className="shrink-0 text-[18px] font-bold text-ink">
                  ${amount}
                </span>
              </div>

              {isCard ? (
                <div className="mt-4">
                  <CardForm amount={amount} onCancel={onChangeMethod} />
                </div>
              ) : (
                <dl className="mt-4">
                  <div className="flex items-center justify-between gap-4 border-b border-line py-2.5">
                    <dt className="label-cap">Payment method</dt>
                    <dd className="text-[14px] font-bold text-ink">{methodDetail}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-4 border-b border-line py-2.5 last:border-b-0">
                    <dt className="label-cap">
                      {method.id === "bank" ? "Reference" : "Destination"}
                    </dt>
                    <dd className="truncate text-[13px] font-bold text-ink">
                      {community.supportId}
                    </dd>
                  </div>
                  {isCrypto && (
                    <div className="flex items-center justify-between gap-4 py-2.5">
                      <dt className="label-cap">{coin!.symbol} address</dt>
                      <dd className="truncate font-mono text-[13px] font-bold text-ink">
                        {shortenAddress(SUPPORT_ADDRESSES[coin!.id])}
                      </dd>
                    </div>
                  )}
                </dl>
              )}
            </div>

            {!isCard && (
              <div className="border-t border-line bg-panel px-5 py-4">
                <button type="button" onClick={confirm} className="btn-red w-full py-3.5">
                  {method.externalUrl
                    ? `Continue to ${method.label}`
                    : "Confirm Support"}
                </button>
                <p className="mt-2.5 text-center text-[11px] leading-relaxed text-grey-mid">
                  {method.externalUrl
                    ? `You will be taken to ${method.label} to complete the payment.`
                    : "By confirming you agree to the support policy."}
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
