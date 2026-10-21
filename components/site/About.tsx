import Image from "next/image";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/contact";
import { Label, Reveal, SplitHeading } from "./motion";

/* La photo est en paysage : rose à gauche (le visage), noir à droite.
   Sur ordinateur, le texte vient se poser sur la partie sombre. */
export default function About() {
  return (
    <section id="a-propos" className="relative mx-auto max-w-[88rem] py-24 md:px-10 md:py-36">
      <div className="px-5 md:px-0">
        <Label index="06">À propos</Label>
      </div>

      <div className="relative mt-8 md:mt-12">
        <Reveal>
          <div className="relative aspect-[1556/1011] w-full overflow-hidden md:w-[78%]">
            <Image
              src="/mattias.webp"
              alt="Mattias, fondateur d'iTrame."
              fill
              quality={90}
              sizes="(min-width: 1400px) 1060px, (min-width: 768px) 78vw, 100vw"
              className="object-cover"
            />
            {/* Fondu vers le fond de page, côté texte */}
            <div aria-hidden="true" className="absolute inset-y-0 right-0 hidden w-1/3 bg-gradient-to-r from-transparent to-ink md:block" />
            <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-b from-transparent to-ink md:hidden" />
          </div>
        </Reveal>

        <div className="relative px-5 md:absolute md:inset-y-0 md:right-0 md:flex md:w-[48%] md:flex-col md:justify-center md:px-0">
          <SplitHeading
            text="Derrière iTrame, une vraie *passion.*"
            className="-mt-4 font-display text-[clamp(1.9rem,4.4vw,4.25rem)] font-semibold leading-[0.98] tracking-[-0.04em] md:mt-0"
          />
          <Reveal delay={0.1}>
            <p className="mt-6 font-display text-xl font-medium md:text-2xl">Je suis Mattias, fondateur d&apos;iTrame.</p>
          </Reveal>
        </div>
      </div>

      <div className="mt-12 grid gap-10 px-5 md:mt-20 md:grid-cols-12 md:gap-10 md:px-0">
        <Reveal className="space-y-5 text-lg leading-relaxed text-muted md:col-span-6 md:col-start-2">
          <p>
            J&apos;ai créé iTrame avec une idée simple : permettre à chaque passionné, indépendant ou entrepreneur d&apos;avoir
            un site qui lui ressemble vraiment, sans devoir y consacrer une fortune.
          </p>
          <p>
            Derrière chaque projet, il y a une histoire, une ambition, parfois même un rêve. Et c&apos;est justement ce qui
            me plaît dans mon métier : prendre le temps de comprendre ce qui rend ton activité unique, puis lui donner vie à
            travers un site pensé dans les moindres détails.
          </p>
          <p>
            Avec moi, pas d&apos;intermédiaire ni de solution toute faite. Je m&apos;investis personnellement dans chaque
            création, du premier échange jusqu&apos;à la mise en ligne, et même après.
          </p>
        </Reveal>

        <Reveal delay={0.15} className="md:col-span-4 md:col-start-9 md:pt-2">
          <blockquote className="border-l-2 border-rose pl-6 font-display text-2xl font-medium leading-snug tracking-[-0.01em] md:text-[1.7rem]">
            Parce qu&apos;au fond, je ne crée pas simplement des sites internet.{" "}
            <span className="text-violet-soft">Je donne une place sur le web aux projets qui méritent d&apos;être vus.</span>
          </blockquote>
          <p className="mt-8 pl-6 text-sm text-faint">
            Une question ? Appelle-moi directement au{" "}
            <a href={`tel:${PHONE_TEL}`} className="whitespace-nowrap text-paper underline decoration-paper/25 underline-offset-4 hover:decoration-rose">
              {PHONE_DISPLAY}
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
