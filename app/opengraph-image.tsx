import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

/* Image d'aperçu quand on partage itrame.ch (WhatsApp, LinkedIn, iMessage…) */
export const alt = "iTrame. — Ton activité mérite un site qui se démarque.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const [display, body] = await Promise.all([
    readFile(join(process.cwd(), "app/_og/space-grotesk-600.woff")),
    readFile(join(process.cwd(), "app/_og/manrope-400.woff")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "#0b0b12",
          color: "#f7f6fa",
          fontFamily: "Manrope",
          /* la trame en filigrane */
          backgroundImage:
            "linear-gradient(to right, rgba(247,246,250,0.06) 1px, transparent 1px)",
          backgroundSize: "100px 100%",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", fontFamily: "Space Grotesk", fontSize: 44 }}>
            <span>iTrame</span>
            <span style={{ color: "#855bff", marginLeft: -9 }}>.</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 24, color: "#a19dae" }}>
            <div style={{ width: 12, height: 12, background: "#e56ad9" }} />
            Studio web suisse
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontFamily: "Space Grotesk",
            fontSize: 92,
            lineHeight: 0.98,
            letterSpacing: "-0.045em",
          }}
        >
          <span>Ton activité mérite</span>
          <span>un site qui</span>
          <span style={{ color: "#a888ff" }}>se démarque.</span>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", fontSize: 26, color: "#a19dae" }}>
          <span>Maquette gratuite · Livré en 5 à 7 jours</span>
          <span style={{ color: "#f7f6fa" }}>itrame.ch</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Space Grotesk", data: display, style: "normal", weight: 600 },
        { name: "Manrope", data: body, style: "normal", weight: 400 },
      ],
    }
  );
}
