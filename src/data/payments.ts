export interface PaymentMethod {
  id: string;
  label: string;
  /** Shown in the confirmation dialog. */
  detail: string;
  /** Short supporting line for the payment methods list. */
  note?: string;
  /** Official site the visitor is sent to in order to complete the payment. */
  externalUrl?: string;
}

export const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: "card",
    label: "Credit / Debit Card",
    detail: "Credit / debit card",
    note: "Visa, Mastercard, American Express and JCB.",
  },
  {
    id: "apple-pay",
    label: "Apple Pay",
    detail: "Apple Pay",
    note: "One tap on iPhone, iPad and Mac.",
    externalUrl: "https://www.apple.com/apple-pay/",
  },
  {
    id: "google-pay",
    label: "Google Pay",
    detail: "Google Pay",
    note: "One tap in Chrome and on Android.",
    externalUrl: "https://pay.google.com/about/",
  },
  {
    id: "paypal",
    label: "PayPal",
    detail: "PayPal account",
    note: "Pay from your PayPal balance or linked card.",
    externalUrl: "https://www.paypal.com/",
  },
  {
    id: "revolut",
    label: "Revolut",
    detail: "Revolut",
    note: "Pay with your Revolut balance or card.",
    externalUrl: "https://www.revolut.com/",
  },
  {
    id: "crypto",
    label: "Crypto",
    detail: "Crypto transfer",
    note: "Bitcoin, Ethereum or Solana.",
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

/** Receiving addresses used for every community. */
export const SUPPORT_ADDRESSES: Record<CryptoCoinId, string> = {
  btc: "bc1pnyr3nl80gqzu6vqn4d2t30glkp4ca97vs3pgensnmjfq6343nk9qmy56f7",
  eth: "0x7e336F46dF6C188182E171935BEB574053214E67",
  sol: "68D5UiCodSHJLb4khcCxnwN7tzG4BdEcDZAXVD3zhVU1",
};

/** Shortens an address for display, e.g. bc1pnyr…56f7 */
export function shortenAddress(address: string): string {
  if (address.length <= 14) return address;
  return `${address.slice(0, 7)}…${address.slice(-4)}`;
}
