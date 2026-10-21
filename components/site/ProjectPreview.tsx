"use client";

import Image from "next/image";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { projects } from "@/lib/projects";
import { ease } from "./motion";

const DURATION = 4200;

/* Aperçu animé des vrais sites : défile tout seul, se met en pause
   au survol, et suit légèrement la souris. */
export default function ProjectPreview() {
  const [{ index, prev }, setState] = useState<{ index: number; prev: number | null }>({ index: 0, prev: null });
  const go = (i: number) => setState((s) => (i === s.index ? s : { index: i, prev: s.index }));
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (paused || reduce) return;
    const t = setTimeout(() => go((index + 1) % projects.length), DURATION);
    return () => clearTimeout(t);
  }, [index, paused, reduce]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 80, damping: 20 });
  const sy = useSpring(my, { stiffness: 80, damping: 20 });
  const frontX = useTransform(sx, (v) => v * 10);
  const frontY = useTransform(sy, (v) => v * 8);
  const backX = useTransform(sx, (v) => v * -14);
  const backY = useTransform(sy, (v) => v * -10);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  const p = projects[index];
  const next = projects[(index + 1) % projects.length];
  const domain = (url?: string) => url?.replace(/^https?:\/\/(www\.)?/, "") ?? "";

  return (
    <div
      onMouseMove={onMove}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => {
        setPaused(false);
        mx.set(0);
        my.set(0);
      }}
      className="relative"
    >
      {/* Écran de fond : le projet suivant */}
      <motion.div
        style={{ x: backX, y: backY }}
        aria-hidden="true"
        className="absolute -top-6 right-0 hidden w-[62%] overflow-hidden border border-line bg-ink-2 opacity-50 md:-top-10 md:block"
      >
        <div className="relative aspect-[16/10]">
          <Image src={next.image} alt="" fill sizes="30vw" className="object-cover object-top grayscale" />
        </div>
      </motion.div>

      {/* Écran principal */}
      <motion.a
        href={p.url}
        target="_blank"
        rel="noopener noreferrer"
        style={{ x: frontX, y: frontY }}
        className="relative z-10 block border border-line bg-ink-2 md:mr-[12%] md:mt-12"
        aria-label={`Voir le site ${p.name} (nouvel onglet)`}
      >
        <div className="flex items-center gap-3 border-b border-line px-4 py-2.5">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="h-2 w-2 rounded-full bg-paper/15" />
            <span className="h-2 w-2 rounded-full bg-paper/15" />
            <span className="h-2 w-2 rounded-full bg-paper/15" />
          </span>
          <span className="truncate font-display text-xs text-faint">{domain(p.url)}</span>
        </div>
        <div className="relative aspect-[16/10] overflow-hidden">
          {prev !== null && (
            <Image
              key={`prev-${projects[prev].slug}`}
              src={projects[prev].image}
              alt=""
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover object-top"
            />
          )}
          <motion.div
            key={p.slug}
            initial={prev === null || reduce ? false : { clipPath: "inset(0 0 0 100%)" }}
            animate={{ clipPath: "inset(0 0 0 0%)" }}
            transition={{ duration: 0.9, ease }}
            className="absolute inset-0"
          >
            <Image
              src={p.image}
              alt={`Capture du site ${p.name}`}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              loading={index === 0 ? "eager" : "lazy"}
              fetchPriority={index === 0 ? "high" : "auto"}
              className="object-cover object-top"
            />
          </motion.div>
        </div>
      </motion.a>

      {/* Légende + progression */}
      <div className="relative z-10 mt-5 md:mr-[12%]">
        <div className="flex items-baseline justify-between gap-4 font-display text-sm">
          <p className="min-w-0 truncate">
            <span className="text-rose">{String(index + 1).padStart(2, "0")}</span>
            <span className="text-faint"> / {String(projects.length).padStart(2, "0")}</span>
            <span className="ml-3 text-paper">{p.name}</span>
            <span className="ml-2 text-faint">{p.place}</span>
          </p>
          <span className="shrink-0 text-faint">{p.category}</span>
        </div>
        <div className="mt-3 flex gap-1.5" role="tablist" aria-label="Choisir un projet">
          {projects.map((proj, i) => (
            <button
              key={proj.slug}
              role="tab"
              aria-selected={i === index}
              aria-label={proj.name}
              onClick={() => go(i)}
              className="relative h-6 flex-1"
            >
              <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-paper/15" />
              {i < index && <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-paper/50" />}
              {i === index && (
                <motion.span
                  key={`${proj.slug}-${paused}`}
                  initial={{ scaleX: paused || reduce ? 1 : 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: paused || reduce ? 0 : DURATION / 1000, ease: "linear" }}
                  className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 origin-left bg-rose"
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
