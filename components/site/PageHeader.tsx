import { Label, Reveal, SplitHeading } from "./motion";

/* En-tête des pages intérieures : étiquette, grand titre, chapeau */
export default function PageHeader({
  label,
  title,
  intro,
}: {
  label: string;
  title: string;
  intro?: React.ReactNode;
}) {
  return (
    <header className="relative mx-auto max-w-[88rem] px-5 pt-32 pb-4 md:px-10 md:pt-44">
      <div className="grid gap-8 md:grid-cols-12 md:items-end">
        <div className="md:col-span-9">
          <Label index="01">{label}</Label>
          <SplitHeading
            as="h1"
            text={title}
            className="mt-6 font-display text-[clamp(2.6rem,9vw,9rem)] font-semibold leading-[0.9] tracking-[-0.05em]"
          />
        </div>
        {intro && (
          <Reveal delay={0.25} className="md:col-span-3">
            <p className="text-muted md:pb-3">{intro}</p>
          </Reveal>
        )}
      </div>
    </header>
  );
}
