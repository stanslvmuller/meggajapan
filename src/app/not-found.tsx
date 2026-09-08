import Link from "next/link";

export default function NotFound() {
  return (
    <div className="shell py-16 text-center">
      <p className="font-display text-[52px] leading-none text-red">404</p>
      <h1 className="mt-2 text-[20px] font-bold text-ink">
        We couldn&rsquo;t find that page.
      </h1>
      <p className="mx-auto mt-2 max-w-[420px] text-[13px] leading-relaxed text-grey-mid">
        The community you were looking for may have moved. Browse the directory to
        find it again.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        <Link href="/studios" className="btn-black px-6 py-3">
          Explore studios
        </Link>
        <Link href="/" className="btn-ghost px-6 py-3">
          Back home
        </Link>
      </div>
    </div>
  );
}
