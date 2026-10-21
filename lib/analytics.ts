/* Suivi publicitaire centralisé.
   Pour ajouter une conversion Google Ads précise, renseigne
   CONVERSION_LABEL (Google Ads → Objectifs → Conversions → « Libellé »). */

export const GOOGLE_ADS_ID = "AW-18412017925";
export const CONVERSION_LABEL = "";

const CONSENT_KEY = "itrame-consent";

type Gtag = (...args: unknown[]) => void;

function gtag(...args: unknown[]) {
  const g = (window as unknown as { gtag?: Gtag }).gtag;
  if (typeof g === "function") g(...args);
}

export function getConsent(): "granted" | "denied" | null {
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

export function setConsent(value: "granted" | "denied") {
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch {}
  gtag("consent", "update", {
    ad_storage: value,
    ad_user_data: value,
    ad_personalization: value,
    analytics_storage: value,
  });
}

/* Appelé quand une demande de contact part avec succès. */
export function trackLead(projectType?: string) {
  gtag("event", "generate_lead", { project_type: projectType || "non précisé" });
  if (CONVERSION_LABEL) {
    gtag("event", "conversion", { send_to: `${GOOGLE_ADS_ID}/${CONVERSION_LABEL}` });
  }
}
