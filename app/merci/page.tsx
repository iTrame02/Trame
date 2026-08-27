export default function MerciPage() {
    return (
      <main className="min-h-screen flex items-center justify-center px-6 bg-[#0d0d0f] text-[#f5f3ef]">
        <div className="w-full max-w-3xl text-center">
          <div className="rounded-[28px] border border-[#9b7bff]/25 px-8 py-14 md:px-14 md:py-20">
            <p className="text-sm text-[#A9A5B0] mb-6">
              Message envoyé
            </p>
  
            <h1 className="text-4xl md:text-6xl font-medium tracking-tight">
              Merci<span className="text-[#9b7bff]">!</span>
            </h1>
  
            <p className="mt-6 text-lg md:text-xl text-neutral-300 leading-relaxed">
              Votre message a bien été envoyé.
            </p>
  
            <p className="mt-3 text-[#A9A5B0] leading-relaxed">
              Nous reviendrons vers vous au plus vite pour échanger autour de votre projet.
            </p>
  
            <a
              href="/"
              className="inline-flex mt-10 rounded-full border border-[#9b7bff]/40 px-6 py-3 text-sm transition hover:border-[#9b7bff]"
            >
              Retour à l&apos;accueil
            </a>
          </div>
        </div>
      </main>
    );
  }