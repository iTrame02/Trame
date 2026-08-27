import Link from "next/link";

export default function MerciPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0d0d0f] px-6 text-[#f5f3ef]">
      <section className="w-full max-w-2xl text-center">
        <p className="mb-5 text-sm uppercase tracking-[0.25em] text-[#9b7bff]">
          Message envoyé
        </p>

        <h1 className="text-5xl font-medium tracking-tight md:text-7xl">
          Merci<span className="text-[#9b7bff]">!</span>
        </h1>

        <p className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-neutral-300">
          Votre demande a bien été envoyée.
        </p>

        <p className="mx-auto mt-3 max-w-xl leading-relaxed text-[#A9A5B0]">
          Nous reviendrons vers vous rapidement afin d’échanger autour de votre
          projet et de ses prochaines étapes.
        </p>

        <Link
          href="/"
          className="mt-10 inline-flex rounded-full border border-[#9b7bff]/50 px-7 py-3 text-sm transition hover:border-[#9b7bff] hover:bg-[#9b7bff]/10"
        >
          Retour à l’accueil
        </Link>
      </section>
    </main>
  );
}