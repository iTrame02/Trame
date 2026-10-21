/* Le logo iTrame. — le « i » fait un tour sur lui-même de temps
   en temps, et à chaque survol. */
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`logo inline-flex items-baseline ${className}`}>
      <span className="logo-i">i</span>Trame<span className="text-violet">.</span>
    </span>
  );
}
