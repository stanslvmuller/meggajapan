import Image from "next/image";
import Link from "next/link";

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Support",
    links: [
      { label: "Explore Studios", href: "/studios" },
      { label: "Most Supported", href: "/studios?sort=supported" },
      { label: "How It Works", href: "/how-it-works" },
      { label: "My Support", href: "/my-support" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "FAQ", href: "/how-it-works#faq" },
      { label: "Payment Methods", href: "/how-it-works#payment-methods" },
      { label: "Contact", href: "/how-it-works#contact" },
      { label: "Support Policy", href: "/how-it-works#policy" },
    ],
  },
  {
    title: "Meccha Japan",
    links: [
      { label: "Shop", href: "/studios" },
      { label: "New Products", href: "/studios?sort=az" },
      { label: "Hot Products", href: "/studios?sort=trending" },
      { label: "Collectors", href: "/studios?category=characters" },
    ],
  },
];

const PAYMENTS = ["Visa", "Mastercard", "Amex", "PayPal", "Apple Pay", "Google Pay", "Revolut"];

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-line bg-white">
      <div className="shell grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Image
            src="/img/brand/logo.jpg"
            alt="Meccha Japan"
            width={180}
            height={83}
            className="h-[46px] w-auto"
          />
          <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.22em] text-ink">
            Support
          </p>
          <p className="mt-3 max-w-[280px] text-[13px] leading-relaxed text-grey-mid">
            A support section for the studios, publishers and creators behind the
            worlds in our catalogue.
          </p>
        </div>

        {COLUMNS.map((column) => (
          <div key={column.title}>
            <h3 className="mb-3 text-[13px] font-bold uppercase tracking-wide text-ink">
              {column.title}
            </h3>
            <ul className="space-y-2">
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[13px] text-[#444] transition-colors hover:text-red"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-line bg-panel">
        <div className="shell flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            {PAYMENTS.map((payment) => (
              <span
                key={payment}
                className="rounded-[4px] border border-line bg-white px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-[#555]"
              >
                {payment}
              </span>
            ))}
          </div>
          <div className="text-[12px] leading-relaxed text-grey-mid sm:text-right">
            <p className="font-bold text-ink">© Meccha Japan Support</p>
            <p>
              All franchise names, characters and images are the property of
              their respective owners.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
