import type { Metadata, Viewport } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import ConsentBanner from "@/components/site/ConsentBanner";
import { GOOGLE_ADS_ID } from "@/lib/analytics";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const SITE_URL = "https://www.itrame.ch";
const DESCRIPTION =
  "Création de sites web sur mesure en Suisse romande pour indépendants, restaurants et commerces. Maquette gratuite, site livré en 5 à 7 jours, un seul interlocuteur.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "iTrame. — Création de sites web sur mesure en Suisse",
    template: "%s — iTrame.",
  },
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_CH",
    url: SITE_URL,
    siteName: "iTrame.",
    title: "iTrame. — Ton activité mérite un site qui se démarque.",
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "iTrame. — Ton activité mérite un site qui se démarque.",
    description: DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0b12",
};

/* Lu avant le premier rendu : applique le thème choisi (sans flash)
   et décide si l'intro se joue (première visite de la session, accueil). */
const bootScript = `(function(){try{
var d=document.documentElement,t=localStorage.getItem('itrame-theme');
if(t==='light'||t==='dark')d.dataset.theme=t;
if(location.pathname==='/'&&!sessionStorage.getItem('itrame-intro')&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
sessionStorage.setItem('itrame-intro','1');d.classList.add('intro');
setTimeout(function(){d.classList.add('intro-out')},1350);
setTimeout(function(){d.classList.remove('intro','intro-out')},2300);}
}catch(e){}})();`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "iTrame.",
  url: SITE_URL,
  email: "contact@itrame.ch",
  telephone: "+41782275310",
  description: DESCRIPTION,
  image: `${SITE_URL}/opengraph-image`,
  founder: { "@type": "Person", name: "Mattias" },
  areaServed: [
    { "@type": "Country", name: "Suisse" },
    { "@type": "Place", name: "Suisse romande" },
  ],
  knowsLanguage: "fr",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      data-theme="dark"
      suppressHydrationWarning
      className={`${manrope.variable} ${spaceGrotesk.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>
        {children}
        <ConsentBanner />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Google Ads — mode consentement : rien n'est stocké tant que
            le visiteur n'a pas accepté (voir ConsentBanner). */}
        <Script id="google-consent" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              analytics_storage: 'denied',
              wait_for_update: 500
            });
            try {
              if (localStorage.getItem('itrame-consent') === 'granted') {
                gtag('consent', 'update', {
                  ad_storage: 'granted',
                  ad_user_data: 'granted',
                  ad_personalization: 'granted',
                  analytics_storage: 'granted'
                });
              }
            } catch (e) {}
            gtag('js', new Date());
            gtag('config', '${GOOGLE_ADS_ID}');
          `}
        </Script>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
