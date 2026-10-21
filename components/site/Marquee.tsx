const sectors = ["Restaurants", "Barbiers", "Artisans", "Cabinets", "Boutiques", "Indépendants", "Bars", "Ateliers", "Commerces"];

/* Bandeau des métiers : défile en continu, en pause au survol */
export default function Marquee() {
  const items = [...sectors, ...sectors];
  return (
    <div className="group relative z-10 overflow-hidden border-y border-line bg-ink py-5 md:py-7" aria-label="Les métiers que nous accompagnons">
      <ul className="sr-only">
        {sectors.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
      <div className="marquee group-hover:[animation-play-state:paused]" aria-hidden="true">
        {items.map((s, i) => (
          <span
            key={i}
            className={`flex items-center gap-8 pr-8 font-display text-3xl font-semibold tracking-[-0.03em] md:text-5xl ${
              i % 3 === 1 ? "text-paper" : "text-transparent [-webkit-text-stroke:1px_rgb(247_246_250/0.35)]"
            }`}
          >
            {s}
            <span className="h-2.5 w-2.5 shrink-0 bg-rose" />
          </span>
        ))}
      </div>
    </div>
  );
}
