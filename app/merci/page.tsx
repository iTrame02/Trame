import type { Metadata } from "next";
import Link from "next/link";
import Logo from "@/components/site/Logo";

export const metadata: Metadata = {
  title: "Merci",
  robots: { index: false, follow: false },
};

export default function MerciPage() {
  return (
    <main className="mx-auto flex min-h-[100svh] max-w-[88rem] flex-col justify-between px-5 py-8 md:px-10 md:py-10">
      <Link href="/" className="font-display text-2xl font-bold tracking-tight">
        <Logo />
      </Link>

      <section className="py-20">
        <p className="anim-fade-up flex items-center gap-3 font-display text-sm text-muted">
          <span className="h-2 w-2 bg-rose" aria-hidden="true" />
          Message envoyé
        </p>
        <h1 className="mt-8 font-display text-[clamp(3.5rem,12vw,11rem)] font-semibold leading-[0.9] tracking-[-0.05em]">
          <span className="block overflow-hidden pb-[0.08em]">
            <span className="anim-rise" style={{ animationDelay: "0.1s" }}>Merci</span>
            <span className="anim-rise text-violet" style={{ animationDelay: "0.2s" }}>.</span>
          </span>
        </h1>
        <p className="anim-fade-up mt-10 max-w-xl text-xl leading-relaxed text-muted" style={{ animationDelay: "0.4s" }}>
          Ta demande est bien arrivée. <span className="text-paper">Je te réponds sous 24 à 48 heures</span> pour
          qu&apos;on échange sur ton projet et ses prochaines étapes.
        </p>
        <Link
          href="/"
          className="anim-fade-up group mt-12 inline-flex items-center gap-6 border border-paper/25 px-6 py-4 font-semibold transition-colors hover:border-paper"
          style={{ animationDelay: "0.55s" }}
        >
          <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
          Retour à l&apos;accueil
        </Link>
      </section>

      <p className="text-xs text-faint">© {new Date().getFullYear()} iTrame.</p>
    </main>
  );
}
