/**
 * Small payment-network marks, drawn as inline SVG so they stay crisp and need
 * no external assets. They are simplified representations used to label the
 * card form; the wordmarks belong to their respective networks.
 */

export type CardBrand = "visa" | "mastercard" | "amex" | "jcb" | "unknown";

/** Detects the network from the leading digits of a card number. */
export function detectBrand(rawNumber: string): CardBrand {
  const n = rawNumber.replace(/\D/g, "");
  if (/^4/.test(n)) return "visa";
  if (/^(5[1-5]|22[2-9]|2[3-6]|27[01]|2720)/.test(n)) return "mastercard";
  if (/^3[47]/.test(n)) return "amex";
  if (/^35/.test(n)) return "jcb";
  return "unknown";
}

const box = "h-[20px] w-[32px] rounded-[3px]";

export function VisaMark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`${box} flex items-center justify-center border border-line bg-white ${className}`}
      aria-label="Visa"
    >
      <svg viewBox="0 0 40 13" className="h-[9px]" role="img" aria-hidden>
        <text
          x="0"
          y="11"
          fontFamily="Georgia, 'Times New Roman', serif"
          fontSize="13"
          fontStyle="italic"
          fontWeight="700"
          letterSpacing="0.5"
          fill="#1434CB"
        >
          VISA
        </text>
      </svg>
    </span>
  );
}

export function MastercardMark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`${box} flex items-center justify-center border border-line bg-white ${className}`}
      aria-label="Mastercard"
    >
      <svg viewBox="0 0 40 24" className="h-[15px]" role="img" aria-hidden>
        <circle cx="15" cy="12" r="9" fill="#EB001B" />
        <circle cx="25" cy="12" r="9" fill="#F79E1B" />
        <path
          fill="#FF5F00"
          d="M20 4.52a9 9 0 0 0 0 14.96 9 9 0 0 0 0-14.96Z"
        />
      </svg>
    </span>
  );
}

export function AmexMark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`${box} flex items-center justify-center overflow-hidden ${className}`}
      aria-label="American Express"
    >
      <svg viewBox="0 0 32 20" className="h-full w-full" role="img" aria-hidden>
        <rect width="32" height="20" rx="3" fill="#1F72CD" />
        <text
          x="16"
          y="13.5"
          textAnchor="middle"
          fontFamily="Arial, sans-serif"
          fontSize="7"
          fontWeight="700"
          letterSpacing="0.3"
          fill="#fff"
        >
          AMEX
        </text>
      </svg>
    </span>
  );
}

export function JcbMark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`${box} flex items-center justify-center overflow-hidden border border-line bg-white ${className}`}
      aria-label="JCB"
    >
      <svg viewBox="0 0 33 20" className="h-[15px]" role="img" aria-hidden>
        {[
          { x: 1, fill: "#0F4C97", letter: "J" },
          { x: 12, fill: "#B3131B", letter: "C" },
          { x: 23, fill: "#3B8A35", letter: "B" },
        ].map((seg) => (
          <g key={seg.letter}>
            <rect x={seg.x} y="1" width="9" height="18" rx="2" fill={seg.fill} />
            <text
              x={seg.x + 4.5}
              y="13.5"
              textAnchor="middle"
              fontFamily="Arial, sans-serif"
              fontSize="8"
              fontWeight="700"
              fill="#fff"
            >
              {seg.letter}
            </text>
          </g>
        ))}
      </svg>
    </span>
  );
}

const BRAND_MARK: Record<Exclude<CardBrand, "unknown">, typeof VisaMark> = {
  visa: VisaMark,
  mastercard: MastercardMark,
  amex: AmexMark,
  jcb: JcbMark,
};

export function BrandMark({
  brand,
  className = "",
}: {
  brand: CardBrand;
  className?: string;
}) {
  if (brand === "unknown") return null;
  const Mark = BRAND_MARK[brand];
  return <Mark className={className} />;
}

/** Revolut wordmark tile, used in the payment methods list. */
export function RevolutMark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`flex h-[20px] items-center rounded-[3px] bg-black px-1.5 ${className}`}
      aria-label="Revolut"
    >
      <svg viewBox="0 0 62 16" className="h-[10px]" role="img" aria-hidden>
        <text
          x="0"
          y="13"
          fontFamily="Arial, Helvetica, sans-serif"
          fontSize="15"
          fontWeight="800"
          letterSpacing="-0.4"
          fill="#fff"
        >
          Revolut
        </text>
      </svg>
    </span>
  );
}
