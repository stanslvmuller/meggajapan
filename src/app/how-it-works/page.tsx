import type { Metadata } from "next";
import Link from "next/link";
import SectionTitle from "@/components/SectionTitle";
import { PAYMENT_METHODS } from "@/data/payments";

export const metadata: Metadata = {
  title: "How It Works — Meccha Japan Support",
  description:
    "How fan support works on Meccha Japan Support: choose a community, choose an amount, choose how you pay.",
};

const STEPS = [
  {
    number: "01",
    title: "Find what you love",
    text: "Browse studios, series, games and characters from the directory, or search for a name directly.",
  },
  {
    number: "02",
    title: "Choose your support",
    text: "Select an amount and your preferred payment method. Every community accepts the same six methods.",
  },
  {
    number: "03",
    title: "Support the creators",
    text: "Your contribution is directed toward the selected creator or studio.",
  },
];

const FAQ = [
  {
    q: "Do I need an account?",
    a: "No. Choose a community, pick an amount and confirm. Your support history and favourites are kept on the device you used, so you can come back to them without signing in.",
  },
  {
    q: "What is the Support ID on each page?",
    a: "It is the reference for that community's support fund. Quote it if you send a bank transfer or a crypto transfer yourself, so the contribution can be matched to the right community.",
  },
  {
    q: "Can I choose my own amount?",
    a: "Yes. The presets run from $5 to $100, and the Custom option accepts any amount you enter.",
  },
  {
    q: "Which currencies can I use?",
    a: "Amounts are shown in US dollars. Card, Apple Pay, Google Pay and PayPal convert at checkout; bank transfers are accepted in USD and JPY, and crypto in Bitcoin, Ethereum or Solana.",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="shell py-4 sm:py-6">
      <nav aria-label="Breadcrumb" className="mb-3 text-[12px] text-grey-mid">
        <Link href="/" className="transition-colors hover:text-red">
          Home
        </Link>
        <span className="mx-1.5">&gt;</span>
        <span className="text-ink">How It Works</span>
      </nav>

      <div className="mb-6 border-b border-line pb-4">
        <h1 className="font-display text-[26px] leading-none text-red sm:text-[30px]">
          How It Works
        </h1>
        <p className="mt-2 max-w-[620px] text-[13px] leading-relaxed text-grey-mid">
          Meccha Japan Support is a place for fans to support the studios and
          creators behind their favourite worlds. Three steps, no account needed.
        </p>
      </div>

      <ol className="grid gap-5 sm:grid-cols-3 sm:gap-8">
        {STEPS.map((step) => (
          <li key={step.number} className="border-t-2 border-ink pt-3">
            <p className="font-display text-[26px] leading-none text-red">
              {step.number}
            </p>
            <h2 className="mt-2 text-[15px] font-bold text-ink">{step.title}</h2>
            <p className="mt-1 text-[13px] leading-relaxed text-[#444]">
              {step.text}
            </p>
          </li>
        ))}
      </ol>

      <section id="payment-methods" className="mt-12 scroll-mt-4">
        <SectionTitle title="Payment Methods" />
        <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {PAYMENT_METHODS.map((method) => (
            <li
              key={method.id}
              className="rounded-[5px] border border-line px-3 py-3"
            >
              <p className="text-[14px] font-bold text-ink">{method.label}</p>
              <p className="mt-0.5 text-[12px] text-grey-mid">{method.note}</p>
            </li>
          ))}
        </ul>
      </section>

      <section id="faq" className="mt-12 scroll-mt-4">
        <SectionTitle title="FAQ" />
        <ul className="overflow-hidden rounded-[5px] border border-line">
          {FAQ.map((item) => (
            <li key={item.q} className="border-b border-line p-4 last:border-b-0">
              <p className="text-[14px] font-bold text-ink">{item.q}</p>
              <p className="mt-1 max-w-[720px] text-[13px] leading-relaxed text-[#444]">
                {item.a}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section id="policy" className="mt-12 scroll-mt-4">
        <SectionTitle title="Support Policy" />
        <div className="max-w-[720px] space-y-3 text-[13px] leading-relaxed text-[#444]">
          <p>
            Support is voluntary and is not a purchase. Nothing is shipped, and
            no goods or services are exchanged for a contribution.
          </p>
          <p>
            Franchise names, studio names, characters and product photography
            shown on this site are the property of their respective owners, and
            appear here to identify the communities you can support.
          </p>
        </div>
      </section>

      <section id="contact" className="mt-12 scroll-mt-4">
        <SectionTitle title="Contact" />
        <div className="flex flex-col gap-3 rounded-[5px] border border-line bg-panel p-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-[560px] text-[13px] leading-relaxed text-[#444]">
            Questions about the support section? The main Meccha Japan help pages
            cover orders, shipping and returns for the shop itself.
          </p>
          <Link href="/studios" className="btn-black shrink-0 px-6 py-3">
            Explore studios
          </Link>
        </div>
      </section>
    </div>
  );
}
