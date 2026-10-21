"use client";

import { useEffect, useState } from "react";

/* Bouton de contact toujours à portée de pouce sur mobile,
   masqué sur le hero et une fois arrivé au formulaire. */
export default function MobileCta() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("accueil");
    const contact = document.getElementById("contact");
    if (!hero || !contact) return;
    let pastHero = false;
    let atContact = false;
    const update = () => setShow(pastHero && !atContact);
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.target === hero) pastHero = !e.isIntersecting;
        if (e.target === contact) atContact = e.isIntersecting;
      }
      update();
    });
    io.observe(hero);
    io.observe(contact);
    return () => io.disconnect();
  }, []);

  return (
    <a
      href="#contact"
      tabIndex={show ? 0 : -1}
      aria-hidden={!show}
      className={`fixed inset-x-4 bottom-4 z-40 flex items-center justify-between bg-violet px-6 py-4 font-semibold transition-all duration-500 ease-out-expo md:hidden ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-[150%] opacity-0"
      }`}
    >
      Parlons de ton projet <span aria-hidden="true">↗</span>
    </a>
  );
}
