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
  "Studio web suisse : des sites uniques, modernes et pensés pour faire grandir ton activité. Indépendants, restaurants, commerces et petites entreprises. Premier échange gratuit.";

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
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "iTrame.",
  url: SITE_URL,
  email: "contact@itrame.ch",
  description: DESCRIPTION,
  areaServed: { "@type": "Country", name: "Suisse" },
  knowsLanguage: "fr",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${manrope.variable} ${spaceGrotesk.variable}`}>
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
