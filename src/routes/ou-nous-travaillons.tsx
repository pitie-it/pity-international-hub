import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Reveal, SectionHeading } from "@/components/site/primitives";
import { CongoMap } from "@/components/site/CongoMap";
import { media, provinces } from "@/lib/site-data";

export const Route = createFileRoute("/ou-nous-travaillons")({
  component: OuNousTravaillons,
  head: () => ({
    meta: [
      { title: "Là où nous travaillons — Pitié Internationale" },
      {
        name: "description",
        content:
          "Nord-Kivu, Sud-Kivu et Ituri : découvrez les zones d'intervention de Pitié Internationale en République Démocratique du Congo.",
      },
      { property: "og:title", content: "Là où nous travaillons — Pitié Internationale" },
      { property: "og:description", content: "Nos zones d'intervention dans l'Est de la RDC." },
      { property: "og:url", content: "/ou-nous-travaillons" },
    ],
    links: [{ rel: "canonical", href: "/ou-nous-travaillons" }],
  }),
});

function OuNousTravaillons() {
  return (
    <>
      <PageHero
        eyebrow="Zones d'intervention"
        title="Au cœur de l'Est de la République Démocratique du Congo"
        subtitle="Nos équipes opèrent dans trois provinces parmi les plus affectées par les conflits armés, les déplacements de populations et l'insécurité alimentaire."
        image={media.plantation}
      />

      <section className="container-page py-20 sm:py-24">
        <CongoMap />
      </section>

      <section className="bg-secondary/50 py-20 sm:py-24">
        <div className="container-page">
          <SectionHeading eyebrow="Fiches provinces" title="Nos interventions province par province" />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {provinces.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.07}>
                <article className="card-surface h-full p-7">
                  <p className="eyebrow">Chef-lieu : {p.chef}</p>
                  <h3 className="mt-2 font-display text-xl font-bold">{p.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
                  <ul className="mt-5 space-y-1.5 text-sm">
                    {p.programmes.map((pr) => (
                      <li key={pr} className="flex gap-2">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-action" /> {pr}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 text-sm font-semibold text-primary">{p.beneficiaires} bénéficiaires</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
