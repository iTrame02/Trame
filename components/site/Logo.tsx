/* Le logo iTrame. — le « i » tourne sur lui-même en continu. */
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`logo inline-flex items-baseline ${className}`}>
      <span className="logo-i">i</span>Trame<span className="text-violet">.</span>
    </span>
  );
}
