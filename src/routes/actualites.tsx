import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero, Reveal } from "@/components/site/primitives";
import { articles, media } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/actualites")({
  component: Actualites,
  head: () => ({
    meta: [
      { title: "Actualités — Pitié Internationale" },
      {
        name: "description",
        content:
          "Actualités, communiqués, rapports, événements, appels d'offres et initiatives de Pitié Internationale.",
      },
      { property: "og:title", content: "Actualités — Pitié Internationale" },
      { property: "og:description", content: "Toutes les nouvelles du terrain et nos opportunités." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "/actualites" },
    ],
    links: [{ rel: "canonical", href: "/actualites" }],
  }),
});

const categories = ["Toutes", "Actualités", "Communiqués", "Rapports", "Événements", "Appels d'offres", "Volontariat"];

function Actualites() {
  const [filter, setFilter] = useState("Toutes");
  const list = filter === "Toutes" ? articles : articles.filter((a) => a.category === filter);

  return (
    <>
      <PageHero
        eyebrow="Actualités"
        title="Nouvelles du terrain, rapports et opportunités"
        subtitle="Suivez l'évolution de nos programmes, nos publications institutionnelles et nos initiatives."
        image={media.grain}
      />

      <section className="container-page py-20 sm:py-24">
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                filter === c ? "border-primary bg-primary text-primary-foreground" : "hover:bg-accent",
              )}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {list.map((a, i) => (
            <Reveal key={a.slug} delay={(i % 3) * 0.07}>
              <article className="card-surface h-full overflow-hidden">
                <img src={a.image} alt={a.title} loading="lazy" className="h-44 w-full object-cover" />
                <div className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-widest text-humanitarian">
                    {a.category} · {a.date}
                  </p>
                  <h2 className="mt-2 font-display text-lg font-semibold leading-snug">{a.title}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{a.excerpt}</p>
                </div>
              </article>
            </Reveal>
          ))}
          {list.length === 0 && <p className="text-muted-foreground">Aucune publication dans cette catégorie.</p>}
        </div>
      </section>
    </>
  );
}
