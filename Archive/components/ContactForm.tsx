"use client";

import { FormEvent, useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setStatus("sending");
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const data = {
      name: formData.get("name"),
      company: formData.get("company"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      project: formData.get("project"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Une erreur est survenue.");
      }

      setStatus("success");
      form.reset();

      window.location.href = "/merci";
    } catch (error) {
      setStatus("error");

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Impossible d’envoyer votre demande."
      );
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-12 grid gap-6 md:grid-cols-2"
    >
      <div>
        <label className="mb-2 block text-sm text-[#A9A5B0]">
          Nom *
        </label>

        <input
          name="name"
          type="text"
          required
          className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 outline-none transition focus:border-[#9b7bff]/60"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm text-[#A9A5B0]">
          Entreprise
        </label>

        <input
          name="company"
          type="text"
          className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 outline-none transition focus:border-[#9b7bff]/60"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm text-[#A9A5B0]">
          E-mail *
        </label>

        <input
          name="email"
          type="email"
          required
          className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 outline-none transition focus:border-[#9b7bff]/60"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm text-[#A9A5B0]">
          Téléphone
        </label>

        <input
          name="phone"
          type="tel"
          className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 outline-none transition focus:border-[#9b7bff]/60"
        />
      </div>

      <div className="md:col-span-2">
        <label className="mb-2 block text-sm text-[#A9A5B0]">
          Votre projet
        </label>

        <select
          name="project"
          defaultValue=""
          className="w-full rounded-xl border border-white/10 bg-[#0d0d0f] px-4 py-3 outline-none transition focus:border-[#9b7bff]/60"
        >
          <option value="" disabled>
            Sélectionnez votre projet
          </option>

          <option>Création d’un site</option>
          <option>Refonte d’un site</option>
          <option>Boutique en ligne</option>
          <option>Fonctionnalités spécifiques</option>
          <option>Photographie & contenu</option>
          <option>Autre projet</option>
        </select>
      </div>

      <div className="md:col-span-2">
        <label className="mb-2 block text-sm text-[#A9A5B0]">
          Parlez-nous de votre idée *
        </label>

        <textarea
          name="message"
          required
          rows={6}
          className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 outline-none transition focus:border-[#9b7bff]/60"
        />
      </div>

      <div className="flex flex-col items-start gap-4 md:col-span-2">
        <button
          type="submit"
          disabled={status === "sending"}
          className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {status === "sending"
            ? "Envoi en cours..."
            : "Envoyer mon projet →"}
        </button>

        {status === "error" && (
          <p className="text-sm text-red-400">
            {errorMessage}
          </p>
        )}

        {status === "idle" && (
          <p className="text-sm text-[#7E7A85]">
            Réponse sans engagement.
          </p>
        )}
      </div>
    </form>
  );
}