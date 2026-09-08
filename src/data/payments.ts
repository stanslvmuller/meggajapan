export interface PaymentMethod {
  id: string;
  label: string;
  /** Shown in the confirmation dialog. */
  detail: string;
  /** Short supporting line for the payment methods list. */
  note?: string;
}

export const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: "card",
    label: "Credit / Debit Card",
    detail: "Visa •••• 4242",
    note: "Visa, Mastercard, American Express and JCB.",
  },
  {
    id: "apple-pay",
    label: "Apple Pay",
    detail: "Apple Pay",
    note: "One tap on iPhone, iPad and Mac.",
  },
  {
    id: "google-pay",
    label: "Google Pay",
    detail: "Google Pay",
    note: "One tap in Chrome and on Android.",
  },
  {
    id: "paypal",
    label: "PayPal",
    detail: "PayPal account",
    note: "Pay from your PayPal balance or linked card.",
  },
  {
    id: "crypto",
    label: "Crypto",
    detail: "Crypto transfer",
    note: "Bitcoin, Ethereum or Solana.",
  },
  {
    id: "bank",
    label: "Bank Transfer",
    detail: "Bank transfer",
    note: "Direct transfer in USD or JPY.",
  },
];

export type CryptoCoinId = "btc" | "eth" | "sol";

export interface CryptoCoin {
  id: CryptoCoinId;
  symbol: string;
  name: string;
  network: string;
}

export const CRYPTO_COINS: CryptoCoin[] = [
  { id: "btc", symbol: "BTC", name: "Bitcoin", network: "Bitcoin network" },
  { id: "eth", symbol: "ETH", name: "Ethereum", network: "Ethereum mainnet" },
  { id: "sol", symbol: "SOL", name: "Solana", network: "Solana mainnet" },
];

/** Shortens an address for display, e.g. bc1qdhl…l5lr */
export function shortenAddress(address: string): string {
  if (address.length <= 14) return address;
  return `${address.slice(0, 7)}…${address.slice(-4)}`;
}
