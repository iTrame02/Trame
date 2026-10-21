"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

export const ease = [0.22, 1, 0.36, 1] as const;

/* Apparition douce au scroll */
export function Reveal({
  children,
  delay = 0,
  className = "",
  as = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "p" | "li" | "section";
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay, ease }}
      className={className}
    >
      {children}
    </Tag>
  );
}

function parseAccents(text: string) {
  let accent = false;
  return text.split(" ").map((raw) => {
    if (raw === "|") return { word: "", isAccent: false, br: true };
    if (raw.startsWith("*")) accent = true;
    const isAccent = accent;
    if (/\*[.,?!]?$/.test(raw)) accent = false;
    return { word: raw.replaceAll("*", ""), isAccent, br: false };
  });
}

/* Titre dont les mots montent depuis un masque, au scroll.
   Les mots entourés de *astérisques* passent en violet,
   un « | » isolé force un retour à la ligne. */
export function SplitHeading({
  text,
  className = "",
  as = "h2",
}: {
  text: string;
  className?: string;
  as?: "h2" | "h3";
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();
  const Tag = as;
  const words = parseAccents(text);

  return (
    <Tag ref={ref} className={className} aria-label={text.replaceAll("*", "").replaceAll(" | ", " ")}>
      {words.map(({ word, isAccent, br }, i) => {
        if (br) return <br key={i} />;
        return (
          <span key={i} aria-hidden="true" className="inline-block overflow-hidden pb-[0.1em] -mb-[0.1em] align-bottom">
            <motion.span
              className={`inline-block ${isAccent ? "text-violet-soft" : ""}`}
              initial={reduce ? false : { y: "105%" }}
              animate={inView || reduce ? { y: "0%" } : {}}
              transition={{ duration: 0.9, delay: i * 0.05, ease }}
            >
              {word}
              {i < words.length - 1 ? " " : ""}
            </motion.span>
          </span>
        );
      })}
    </Tag>
  );
}

/* Le « fil » : séparateur signature qui se tisse au scroll,
   avec son nœud rose. */
export function Thread({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 1 });
  const reduce = useReducedMotion();
  return (
    <div ref={ref} aria-hidden="true" className={`relative flex items-center ${className}`}>
      <motion.span
        initial={reduce ? false : { scale: 0 }}
        animate={inView || reduce ? { scale: 1 } : {}}
        transition={{ duration: 0.4, ease }}
        className="h-2 w-2 shrink-0 bg-rose"
      />
      <motion.span
        initial={reduce ? false : { scaleX: 0 }}
        animate={inView || reduce ? { scaleX: 1 } : {}}
        transition={{ duration: 1.4, delay: 0.15, ease }}
        className="h-px flex-1 origin-left bg-paper/20"
      />
    </div>
  );
}

/* Petite étiquette de section : « 02 — Projets » */
export function Label({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <p className="font-display text-sm text-muted">
      <span className="text-rose">{index}</span>
      <span className="mx-2 text-faint">/</span>
      {children}
    </p>
  );
}
