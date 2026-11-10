"use client";

import { useEffect, useState } from "react";
import { getConsent, setConsent } from "@/lib/analytics";

export default function ConsentBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Laisse le hero s'afficher tranquillement avant de poser la question
    const t = setTimeout(() => setOpen(getConsent() === null), 1800);
    return () => clearTimeout(t);
  }, []);

  if (!open) return null;

  const choose = (v: "granted" | "denied") => {
    setConsent(v);
    setOpen(false);
  };

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookies"
      className="anim-fade-up fixed bottom-4 left-4 right-4 z-[70] sm:left-auto sm:max-w-sm border border-line bg-ink-2 p-5 text-sm"
    >
      <p className="leading-relaxed text-muted">
        On utilise des cookies pour mesurer l&apos;efficacité de nos publicités. Rien n&apos;est activé sans ton accord.
      </p>
      <div className="mt-4 flex gap-2">
        <button
          onClick={() => choose("granted")}
          className="bg-paper px-4 py-2 font-medium text-ink transition hover:bg-violet hover:text-paper"
        >
          Accepter
        </button>
        <button
          onClick={() => choose("denied")}
          className="border border-line px-4 py-2 text-paper transition hover:border-paper/40"
        >
          Refuser
        </button>
      </div>
    </div>
  );
}
