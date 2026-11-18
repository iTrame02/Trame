/* Le rideau d'ouverture, à la première visite de l'accueil.
   Rendu côté serveur, masqué par défaut : c'est le script du <head>
   qui l'affiche puis le lève (voir app/layout.tsx), sans attendre React. */
export default function Intro() {
  const letters = ["i", "T", "r", "a", "m", "e"];
  return (
    <div className="intro-curtain" aria-hidden="true">
      <div className="flex flex-col items-start">
        <p className="font-display text-[clamp(3.5rem,13vw,10rem)] font-semibold leading-none tracking-[-0.05em]">
          {letters.map((l, i) => (
            <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
              <span className="intro-word" style={{ animationDelay: `${0.05 + i * 0.05}s` }}>
                {l}
              </span>
            </span>
          ))}
          <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
            <span className="intro-word text-violet" style={{ animationDelay: "0.4s" }}>
              .
            </span>
          </span>
        </p>
        <span className="intro-bar mt-4 block h-px w-full bg-rose" />
        <p className="anim-fade-up mt-4 font-display text-sm text-muted" style={{ animationDelay: "0.55s", animationPlayState: "running" }}>
          Studio web suisse
        </p>
      </div>
    </div>
  );
}
