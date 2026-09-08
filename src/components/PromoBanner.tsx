import Image from "next/image";
import Link from "next/link";

const MONTAGE = [
  { src: "/img/cards/pokemon.png", alt: "Pokémon merchandise", className: "z-30 h-[170px] sm:h-[190px] lg:h-[230px]" },
  { src: "/img/cards/pokemon-fit.png", alt: "Pokémon Fit plush collection", className: "z-20 h-[160px] sm:h-[180px] lg:h-[215px]" },
  { src: "/img/cards/sanrio.png", alt: "Sanrio plush", className: "z-10 hidden h-[170px] sm:block lg:h-[215px]" },
  { src: "/img/cards/hatsune-miku.png", alt: "Hatsune Miku figures", className: "z-0 hidden h-[165px] lg:block lg:h-[205px]" },
];

export default function PromoBanner() {
  return (
    <section className="overflow-hidden rounded-[5px] bg-ink">
      <div className="relative flex flex-col gap-6 px-5 py-7 sm:px-8 lg:flex-row lg:items-center lg:gap-8 lg:px-10 lg:py-8">
        {/* Flat red block behind the artwork, in the store's banner style. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-[46%] bg-red/90 lg:block"
          style={{ clipPath: "polygon(14% 0, 100% 0, 100% 100%, 0% 100%)" }}
        />

        <div className="relative z-10 max-w-[560px] lg:flex-1">
          <p className="mb-2 inline-block rounded-[3px] bg-red px-2 py-[3px] text-[11px] font-bold uppercase tracking-[0.14em] text-white">
            Fan Support
          </p>
          <h1 className="font-display text-[30px] leading-[1.1] text-white sm:text-[38px] lg:text-[44px]">
            Support the stories you love.
          </h1>
          <p className="mt-3 max-w-[460px] text-[14px] leading-relaxed text-white/80">
            A simple place for fans to support the studios and creators behind their
            favourite worlds.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Link href="/studios" className="btn-red px-6 py-3">
              Explore Studios
            </Link>
            <Link
              href="/how-it-works"
              className="inline-flex items-center justify-center rounded-[5px] border border-white/50 px-6 py-3 text-[12px] font-bold uppercase tracking-wide text-white transition-colors hover:border-white hover:bg-white hover:text-ink"
            >
              How it works
            </Link>
          </div>
        </div>

        <div className="relative z-10 flex items-end justify-center gap-0 lg:flex-1 lg:justify-end">
          {MONTAGE.map((item, index) => (
            <Image
              key={item.src}
              src={item.src}
              alt={item.alt}
              width={420}
              height={420}
              priority={index < 2}
              className={`w-auto object-contain ${index > 0 ? "-ml-5 lg:-ml-8" : ""} ${item.className}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
