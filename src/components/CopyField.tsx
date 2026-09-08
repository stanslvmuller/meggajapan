"use client";

import { useEffect, useState } from "react";

export default function CopyField({
  label,
  value,
  copyValue,
  mono = false,
}: {
  label: string;
  /** What is shown on screen (may be shortened). */
  value: string;
  /** What lands on the clipboard, when it differs from the visible text. */
  copyValue?: string;
  mono?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 1800);
    return () => window.clearTimeout(timer);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(copyValue ?? value);
    } catch {
      /* clipboard blocked — the value is still visible on screen */
    }
    setCopied(true);
  }

  return (
    <div className="flex items-center justify-between gap-3 border-b border-line py-2.5 last:border-b-0">
      <div className="min-w-0">
        <p className="label-cap">{label}</p>
        <p
          className={`truncate text-[14px] font-bold text-ink ${
            mono ? "font-mono tracking-tight" : ""
          }`}
        >
          {value}
        </p>
      </div>
      <button
        type="button"
        onClick={copy}
        className="btn-ghost h-[32px] shrink-0 px-3 py-0"
      >
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}
