import Link from "next/link";

export default function SectionTitle({
  title,
  note,
  link,
}: {
  title: string;
  note?: string;
  link?: { label: string; href: string };
}) {
  return (
    <div className="mb-4 flex flex-wrap items-end justify-between gap-x-6 gap-y-2 sm:mb-5">
      <div>
        <h2 className="section-title">{title}</h2>
        {note && <p className="mt-1 text-[13px] text-grey-mid">{note}</p>}
      </div>
      {link && (
        <Link href={link.href} className="link-red">
          {link.label} <span aria-hidden>→</span>
        </Link>
      )}
    </div>
  );
}
