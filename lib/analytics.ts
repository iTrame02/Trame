/* Suivi publicitaire centralisé. */

export const GOOGLE_ADS_ID = "AW-18566889039";

/* ⚠️ À REMPLACER par la vraie valeur « send_to » de la conversion
   Google Ads (Objectifs → Conversions → formulaire de contact),
   au format "AW-XXXXXXXXX/XXXXXXXXX". Tant que c'est le modèle,
   aucune conversion n'est envoyée. */
export const LEAD_CONVERSION_SEND_TO = "AW-XXXXXXXXX/XXXXXXXXX";

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
  trackLeadConversion();
}

/* Conversion Google Ads « demande de contact ». Sans effet si gtag
   n'est pas chargé (bloqueur de pub, etc.). */
export function trackLeadConversion() {
  if (LEAD_CONVERSION_SEND_TO.includes("XXXX")) return;
  gtag("event", "conversion", { send_to: LEAD_CONVERSION_SEND_TO });
}
