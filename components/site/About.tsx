import Image from "next/image";
import { Label, Reveal, SplitHeading } from "./motion";

/* Pour ajouter ta photo : place-la dans /public (ex. /public/mattias.jpg)
   puis remplace null par "/mattias.jpg". Format portrait conseillé. */
const FOUNDER_PHOTO: string | null = null;

const facts = ["Médiamaticien", "Création web", "Design & communication visuelle", "Photographie"];

export default function About() {
  return (
    <section id="a-propos" className="relative mx-auto max-w-[88rem] px-5 py-24 md:px-10 md:py-36">
      <div className="grid gap-14 md:grid-cols-12 md:gap-10">
        <Reveal className="md:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden bg-ink-2">
            {FOUNDER_PHOTO ? (
              <Image src={FOUNDER_PHOTO} alt="Mattias, fondateur d'iTrame." fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
            ) : (
              /* En attendant la photo : un monogramme sur la trame */
              <div aria-hidden="true" className="absolute inset-0">
                <div
                  className="absolute inset-0 opacity-60"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgb(247 246 250 / 0.06) 1px, transparent 1px), linear-gradient(90deg, rgb(247 246 250 / 0.06) 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                  }}
                />
                <span className="absolute bottom-6 left-6 font-display text-[11rem] font-bold leading-none tracking-[-0.06em] md:text-[14rem]">
                  M<span className="text-violet">.</span>
                </span>
                <span className="absolute right-6 top-6 h-3 w-3 bg-rose" />
              </div>
            )}
          </div>
        </Reveal>

        <div className="md:col-span-6 md:col-start-7 md:pt-10">
          <Label index="04">À propos</Label>
          <SplitHeading
            text="Derrière iTrame, une vraie *passion.*"
            className="mt-6 font-display text-[clamp(2.25rem,4.8vw,4.5rem)] font-semibold leading-[0.98] tracking-[-0.04em]"
          />
          <Reveal delay={0.1}>
            <p className="mt-10 text-xl leading-relaxed md:text-2xl">
              Je suis Mattias, médiamaticien et fondateur d&apos;iTrame.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              Le web, le design et le développement, c&apos;est ce qui me fait vibrer : comprendre une activité, imaginer
              son site, puis le construire ligne par ligne. Avec iTrame, tu as un seul interlocuteur, qui connaît ton
              projet par cœur et qui reste là après la mise en ligne.
            </p>
          </Reveal>
          <Reveal delay={0.2} as="div" className="mt-10 flex flex-wrap gap-2">
            {facts.map((f) => (
              <span key={f} className="border border-line px-4 py-2 text-sm text-muted">
                {f}
              </span>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
