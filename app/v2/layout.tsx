import type { Metadata } from "next";
import { Instrument_Serif } from "next/font/google";
import "./v2.css";

const serif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "iTrame. — Nouvelle DA (test)",
  robots: { index: false, follow: false },
};

export default function V2Layout({ children }: { children: React.ReactNode }) {
  return <div className={serif.variable}>{children}</div>;
}
