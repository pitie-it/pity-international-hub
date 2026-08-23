import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/mentions-legales")({
  component: MentionsLegales,
  head: () => ({
    meta: [
      { title: "Mentions légales — Pitié Internationale" },
      { name: "description", content: "Mentions légales de Pitié Internationale." },
      { property: "og:title", content: "Mentions légales — Pitié Internationale" },
      { property: "og:description", content: "Mentions légales de Pitié Internationale." },
      { property: "og:url", content: "/mentions-legales" },
    ],
    links: [{ rel: "canonical", href: "/mentions-legales" }],
  }),
});

function MentionsLegales() {
  return (
    <section className="container-page py-20 sm:py-28">
      <h1 className="text-3xl font-bold sm:text-4xl">Mentions légales</h1>
      <p className="mt-6 text-muted-foreground">Contenu à venir.</p>
    </section>
  );
}
