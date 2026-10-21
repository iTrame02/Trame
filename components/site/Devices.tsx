"use client";

import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { useState } from "react";

/* Cadre de navigateur sobre, avec l'adresse du site */
export function BrowserFrame({
  url,
  children,
  className = "",
}: {
  url?: string;
  children: React.ReactNode;
  className?: string;
}) {
  const domain = url?.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
  return (
    <div className={`overflow-hidden border border-line bg-ink-2 ${className}`}>
      <div className="flex items-center gap-3 border-b border-line px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-paper/15" />
          <span className="h-2 w-2 rounded-full bg-paper/15" />
          <span className="h-2 w-2 rounded-full bg-paper/15" />
        </span>
        {domain && <span className="truncate font-display text-xs text-faint">{domain}</span>}
      </div>
      {children}
    </div>
  );
}

/* Écran 16:10 : l'accueil du site, et au survol la page complète
   qui défile de haut en bas. */
export function ScrollShot({
  desktop,
  full,
  alt,
  sizes,
  eager = false,
}: {
  desktop: string;
  full?: string;
  alt: string;
  sizes: string;
  eager?: boolean;
}) {
  // armed : la page complète est chargée au premier survol seulement
  // (rien n'est téléchargé sur mobile). Le défilement ne démarre qu'une
  // fois l'image prête, pour qu'il parte bien du haut.
  const [armed, setArmed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [hover, setHover] = useState(false);
  const reduce = useReducedMotion();
  const scrolling = armed && loaded && hover && !reduce;

  return (
    <div
      className="relative aspect-[16/10] overflow-hidden bg-ink-3"
      onPointerEnter={(e) => {
        if (e.pointerType !== "mouse") return;
        setArmed(true);
        setHover(true);
      }}
      onPointerLeave={() => setHover(false)}
    >
      <Image
        src={desktop}
        alt={alt}
        fill
        sizes={sizes}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : "auto"}
        className="object-cover object-top"
      />
      {full && armed && (
        <Image
          src={full}
          alt=""
          aria-hidden="true"
          fill
          sizes={sizes}
          onLoad={() => setLoaded(true)}
          style={{
            objectPosition: scrolling ? "50% 100%" : "50% 0%",
            opacity: scrolling ? 1 : 0,
            transition: scrolling
              ? "opacity 0.4s ease, object-position 9s cubic-bezier(0.45, 0, 0.25, 1) 0.3s"
              : "opacity 0.5s ease, object-position 0s linear 0.5s",
          }}
          className="object-cover"
        />
      )}
    </div>
  );
}

/* Téléphone : la version mobile du site */
export function Phone({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <div
      className={`overflow-hidden rounded-[1.4rem] border-[5px] border-[#1d1928] bg-ink shadow-[0_30px_60px_-20px_rgb(0_0_0/0.8)] md:rounded-[1.9rem] md:border-[7px] ${className}`}
    >
      <div className="relative aspect-[390/844]">
        <Image src={src} alt={alt} fill sizes="(min-width: 768px) 14vw, 30vw" className="object-cover object-top" />
      </div>
    </div>
  );
}
