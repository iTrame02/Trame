"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { trackLead } from "@/lib/analytics";
import { Label, Reveal, SplitHeading } from "./motion";

const projectTypes = [
  "Site vitrine",
  "Boutique en ligne",
  "Réservations / sur mesure",
  "Identité visuelle & design",
  "Je ne sais pas encore",
];

const field =
  "w-full border-0 border-b border-paper/20 bg-transparent px-0 py-3 text-lg text-paper outline-none transition-colors placeholder:text-faint focus:border-violet";

export default function Contact() {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    const data = Object.fromEntries(new FormData(e.currentTarget));

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Une erreur est survenue.");
      trackLead(String(data.project || ""));
      router.push("/merci");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Impossible d'envoyer ta demande.");
    }
  }

  return (
    <section id="contact" className="relative mx-auto max-w-[88rem] px-5 py-24 md:px-10 md:py-36">
      <Label index="05">Contact</Label>
      <SplitHeading
        text="Et si on créait quelque chose *ensemble ?*"
        className="mt-6 max-w-5xl font-display text-[clamp(2.75rem,7vw,6.75rem)] font-semibold leading-[0.93] tracking-[-0.045em]"
      />

      <div className="mt-16 grid gap-16 md:mt-24 md:grid-cols-12 md:gap-10">
        <Reveal className="md:col-span-4">
          <p className="text-lg leading-relaxed text-muted md:text-xl">
            Une idée, un projet ou simplement une question ? Discutons-en.{" "}
            <span className="text-paper">Le premier échange est gratuit et sans engagement.</span>
          </p>

          <dl className="mt-12 space-y-6 border-t border-line pt-8">
            <div>
              <dt className="font-display text-sm text-faint">E-mail</dt>
              <dd className="mt-1">
                <a href="mailto:contact@itrame.ch" className="text-lg underline decoration-paper/20 underline-offset-4 transition hover:decoration-rose">
                  contact@itrame.ch
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-display text-sm text-faint">Échange</dt>
              <dd className="mt-1 text-lg">Appel, visio ou rendez-vous</dd>
            </div>
            <div>
              <dt className="font-display text-sm text-faint">Réponse</dt>
              <dd className="mt-1 text-lg">Sous 24 à 48 heures</dd>
            </div>
          </dl>
        </Reveal>

        <Reveal delay={0.1} className="md:col-span-7 md:col-start-6">
          <form onSubmit={onSubmit} className="grid gap-10 md:grid-cols-2 md:gap-x-10">
            <label className="block">
              <span className="font-display text-sm text-muted">Nom *</span>
              <input name="name" required autoComplete="name" className={field} />
            </label>
            <label className="block">
              <span className="font-display text-sm text-muted">E-mail *</span>
              <input name="email" type="email" required autoComplete="email" inputMode="email" className={field} />
            </label>
            <label className="block md:col-span-2">
              <span className="font-display text-sm text-muted">Type de projet</span>
              <select name="project" defaultValue="" className={`${field} cursor-pointer appearance-none`}>
                <option value="" disabled className="bg-ink">
                  Choisis une option
                </option>
                {projectTypes.map((t) => (
                  <option key={t} value={t} className="bg-ink">
                    {t}
                  </option>
                ))}
              </select>
            </label>
            <label className="block md:col-span-2">
              <span className="font-display text-sm text-muted">Message *</span>
              <textarea
                name="message"
                required
                rows={4}
                placeholder="Quelques mots sur ton activité et ton idée suffisent."
                className={`${field} resize-none`}
              />
            </label>

            <div className="flex flex-col gap-4 md:col-span-2 md:flex-row md:items-center md:justify-between">
              <button
                type="submit"
                disabled={status === "sending"}
                className="group inline-flex items-center justify-between gap-10 bg-violet px-7 py-5 text-lg font-semibold transition-colors hover:bg-paper hover:text-ink disabled:cursor-wait disabled:opacity-60"
              >
                {status === "sending" ? "Envoi en cours…" : "Discutons de ton projet"}
                <span className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
              </button>
              <p className="text-sm text-faint">Sans engagement. Tes données servent uniquement à te répondre.</p>
            </div>

            {status === "error" && (
              <p role="alert" className="border-l-2 border-rose pl-4 text-sm text-rose md:col-span-2">
                {error}
              </p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
