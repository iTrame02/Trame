"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { EMAIL, PHONE_DISPLAY, PHONE_TEL } from "@/lib/contact";

const card =
  "group flex items-center justify-between border border-line bg-ink/70 px-6 py-6 backdrop-blur-sm transition-colors hover:border-violet md:px-8 md:py-8";
const arrow =
  "font-display text-2xl text-faint transition-[transform,color] duration-200 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-rose";

/* Le grand appel à l'action du pied de page.
   Masqué sur la page contact, où le formulaire est juste au-dessus. */
export default function FooterCta() {
  if (usePathname() === "/contact") return null;

  return (
    <div className="pb-20 md:pb-28">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <p className="max-w-4xl font-display text-[clamp(2rem,5.2vw,4.75rem)] font-semibold leading-[0.98] tracking-[-0.04em]">
          Ton site mérite mieux qu&apos;un modèle. <span className="whitespace-nowrap text-violet-soft">Parlons-en.</span>
        </p>
        <Link
          href="/contact"
          className="group inline-flex w-fit shrink-0 items-center gap-6 bg-violet px-7 py-5 text-lg font-semibold transition-colors hover:bg-paper hover:text-ink"
        >
          Demander ma maquette gratuite
          <span className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
        </Link>
      </div>

      <div className="mt-12 grid gap-6 md:mt-16 md:grid-cols-2 md:gap-10">
        <a href={`tel:${PHONE_TEL}`} className={card}>
          <span>
            <span className="block font-display text-sm text-faint">Appelle-moi</span>
            <span className="mt-1 block font-display text-2xl font-semibold tracking-[-0.02em] md:text-4xl">{PHONE_DISPLAY}</span>
          </span>
          <span aria-hidden="true" className={arrow}>↗</span>
        </a>
        <a href={`mailto:${EMAIL}`} className={card}>
          <span className="min-w-0">
            <span className="block font-display text-sm text-faint">Écris-moi</span>
            <span className="mt-1 block truncate font-display text-2xl font-semibold tracking-[-0.02em] md:text-4xl">{EMAIL}</span>
          </span>
          <span aria-hidden="true" className={arrow}>↗</span>
        </a>
      </div>
    </div>
  );
}
