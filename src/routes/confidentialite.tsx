import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/confidentialite")({
  component: Confidentialite,
  head: () => ({
    meta: [
      { title: "Politique de confidentialité — Pitié Internationale" },
      { name: "description", content: "Politique de confidentialité de Pitié Internationale." },
      { property: "og:title", content: "Politique de confidentialité — Pitié Internationale" },
      { property: "og:description", content: "Politique de confidentialité de Pitié Internationale." },
      { property: "og:url", content: "/confidentialite" },
    ],
    links: [{ rel: "canonical", href: "/confidentialite" }],
  }),
});

function Confidentialite() {
  return (
    <section className="container-page py-20 sm:py-28">
      <h1 className="text-3xl font-bold sm:text-4xl">Politique de confidentialité</h1>
      <p className="mt-6 text-muted-foreground">Contenu à venir.</p>
    </section>
  );
}
