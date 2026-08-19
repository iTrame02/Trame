import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name = String(body.name || "").trim();
    const company = String(body.company || "").trim();
    const email = String(body.email || "").trim();
    const phone = String(body.phone || "").trim();
    const project = String(body.project || "").trim();
    const message = String(body.message || "").trim();

    if (!name || !email || !message) {
      return Response.json(
        { error: "Veuillez remplir les champs obligatoires." },
        { status: 400 }
      );
    }

    const { error } = await resend.emails.send({
      from: "iTrame. <contact@itrame.ch>",
      to: ["contact@itrame.ch"],
      replyTo: email,
      subject: `Nouveau projet — ${name}`,
      html: `
        <h2>Nouvelle demande depuis iTrame.</h2>

        <p><strong>Nom :</strong> ${escapeHtml(name)}</p>
        <p><strong>Entreprise :</strong> ${escapeHtml(company || "Non renseignée")}</p>
        <p><strong>E-mail :</strong> ${escapeHtml(email)}</p>
        <p><strong>Téléphone :</strong> ${escapeHtml(phone || "Non renseigné")}</p>
        <p><strong>Projet :</strong> ${escapeHtml(project || "Non renseigné")}</p>

        <hr />

        <p><strong>Message :</strong></p>
        <p>${escapeHtml(message).replaceAll("\n", "<br />")}</p>
      `,
    });

    if (error) {
      console.error(error);

      return Response.json(
        { error: "Impossible d’envoyer le message." },
        { status: 500 }
      );
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Une erreur est survenue." },
      { status: 500 }
    );
  }
}