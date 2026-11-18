import { ViewTransition } from "react";

/* Enveloppe de chaque page : à la navigation, l'ancienne page s'efface
   vers le haut et la nouvelle monte (styles dans globals.css).
   À mettre dans chaque page.tsx : un layout persiste et n'anime rien. */
export default function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter="page-in" exit="page-out" default="none">
      <div>{children}</div>
    </ViewTransition>
  );
}
