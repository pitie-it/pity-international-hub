import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageHero, Reveal } from "@/components/site/primitives";
import { media, programmes } from "@/lib/site-data";

export const Route = createFileRoute("/programmes/")({
  component: Programmes,
  head: () => ({
    meta: [
      { title: "Nos Programmes — Pitié Internationale" },
      {
        name: "description",
        content:
          "Sécurité alimentaire, autonomisation économique, gouvernance, genre et protection, santé communautaire : les programmes intégrés de Pitié Internationale en RDC.",
      },
      { property: "og:title", content: "Nos Programmes — Pitié Internationale" },
      { property: "og:description", content: "Cinq programmes intégrés humanitaires et de développement en RDC." },

      { property: "og:url", content: "/programmes" },
    ],
    links: [{ rel: "canonical", href: "/programmes" }],
  }),
});

function Programmes() {
  return (
    <>
      <PageHero
        eyebrow="Nos programmes"
        title="Des programmes intégrés pour répondre à l'urgence et bâtir l'avenir"
        subtitle="PI ONG développe des programmes répondant aux besoins humanitaires immédiats tout en renforçant la résilience des communautés."

        image={media.plantation}
      />

      <section className="container-page py-20 sm:py-24">
        <div className="grid gap-6 md:grid-cols-2">
          {programmes.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 2) * 0.08}>
              <Link
                to="/programmes/$slug"
                params={{ slug: p.slug }}
                className="card-surface group grid h-full gap-0 overflow-hidden sm:grid-cols-[minmax(0,1fr)_40%]"
              >
                <div className="p-7">
                  <h2 className="font-display text-xl font-bold leading-snug">{p.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.tagline}</p>
                  <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                    Voir le programme <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:h-full"
                />
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
