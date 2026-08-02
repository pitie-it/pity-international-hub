import { createFileRoute } from "@tanstack/react-router";
import { Counter, PageHero, Reveal, SectionHeading } from "@/components/site/primitives";
import { impactStats, media, provinces } from "@/lib/site-data";
import { CongoMap } from "@/components/site/CongoMap";

export const Route = createFileRoute("/impact")({
  component: Impact,
  head: () => ({
    meta: [
      { title: "Notre Impact — Pitié Internationale" },
      {
        name: "description",
        content:
          "Projets, bénéficiaires, communautés, provinces, partenaires et volontaires : découvrez l'impact mesurable de Pitié Internationale en RDC.",
      },
      { property: "og:title", content: "Notre Impact — Pitié Internationale" },
      { property: "og:description", content: "Des résultats mesurables et une redevabilité totale." },
      { property: "og:url", content: "/impact" },
    ],
    links: [{ rel: "canonical", href: "/impact" }],
  }),
});

function Impact() {
  return (
    <>
      <PageHero
        eyebrow="Notre impact"
        title="Ce que nous changeons, chiffres à l'appui"
        subtitle="Nous mesurons systématiquement les effets de nos interventions et publions nos résultats en toute transparence."
        image={media.recolte}
      />

      <section className="container-page py-20 sm:py-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {impactStats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06}>
              <div className="card-surface p-8 text-center">
                <p className="font-display text-4xl font-extrabold text-gradient-brand">
                  <Counter value={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-3 text-sm font-medium text-muted-foreground">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-secondary/50 py-20 sm:py-24">
        <div className="container-page">
          <SectionHeading
            eyebrow="Carte interactive"
            title="Notre présence en République Démocratique du Congo"
            subtitle="Survolez ou sélectionnez une province pour découvrir nos interventions."
          />
          <div className="mt-14">
            <CongoMap />
          </div>
        </div>
      </section>

      <section className="container-page py-20 sm:py-24">
        <SectionHeading eyebrow="Redevabilité" title="Comment nous mesurons nos résultats" />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            { t: "Collecte de données", d: "Enquêtes de base, suivi mensuel et évaluations finales conduites avec les communautés." },
            { t: "Mécanismes de plainte", d: "Lignes de retour d'information accessibles et confidentielles pour chaque projet." },
            { t: "Publication des rapports", d: "Rapports narratifs et financiers partagés avec les bailleurs et les autorités." },
          ].map((c, i) => (
            <Reveal key={c.t} delay={i * 0.07}>
              <div className="card-surface h-full p-7">
                <h3 className="font-display text-lg font-semibold">{c.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-10 text-center text-sm text-muted-foreground">
          {provinces.length} provinces couvertes — Nord-Kivu, Sud-Kivu et Ituri.
        </p>
      </section>
    </>
  );
}
