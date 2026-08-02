import { createFileRoute } from "@tanstack/react-router";
import { Heart, Scale, ShieldCheck, Globe2 } from "lucide-react";
import { PageHero, Reveal, SectionHeading } from "@/components/site/primitives";
import { media, principes, timeline, valeurs } from "@/lib/site-data";

export const Route = createFileRoute("/a-propos")({
  component: APropos,
  head: () => ({
    meta: [
      { title: "À propos — Pitié Internationale" },
      {
        name: "description",
        content:
          "Histoire, vision, mission, valeurs et principes humanitaires de Pitié Internationale, ONG active en République Démocratique du Congo depuis 2023.",
      },
      { property: "og:title", content: "À propos — Pitié Internationale" },
      { property: "og:description", content: "Notre histoire, notre vision, notre mission et nos valeurs." },
      { property: "og:url", content: "/a-propos" },
    ],
    links: [{ rel: "canonical", href: "/a-propos" }],
  }),
});

const principeIcons = [Heart, Globe2, Scale, ShieldCheck];

function APropos() {
  return (
    <>
      <PageHero
        eyebrow="À propos"
        title="Une organisation née de l'urgence, tournée vers la durabilité"
        subtitle="Pitié Internationale (PI) est une organisation humanitaire et de développement créée en 2023 à Goma, au cœur de l'Est de la République Démocratique du Congo."
        image={media.suivi}
      />

      <section className="container-page py-20 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal>
            <span className="eyebrow">Notre histoire</span>
            <h2 className="mt-3 text-3xl font-bold">Née au plus près des communautés</h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              Face à l'ampleur des déplacements de populations, à l'insécurité alimentaire chronique et à la
              fragilisation des services de base dans l'Est de la RDC, un collectif de professionnels congolais de
              l'humanitaire a fondé Pitié Internationale. L'organisation s'appuie sur une conviction : les solutions
              les plus durables naissent des communautés elles-mêmes.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Depuis, PI conjugue réponse d'urgence et programmes de développement, avec une exigence permanente de
              transparence, de qualité et de redevabilité envers les personnes accompagnées comme envers les bailleurs.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="space-y-6">
            <div className="card-surface p-7">
              <p className="eyebrow">Notre vision</p>
              <p className="mt-3 leading-relaxed">
                Nous recherchons un monde d'espoir, d'inclusion et de justice sociale où la pauvreté est vaincue et où
                chacun vit dans la dignité et la sécurité humaine.
              </p>
            </div>
            <div className="card-surface p-7">
              <p className="eyebrow">Notre mission</p>
              <ul className="mt-3 space-y-2">
                {["Sauver des vies.", "Vaincre la pauvreté.", "Promouvoir la justice sociale.", "Renforcer la sécurité humaine."].map((m) => (
                  <li key={m} className="flex gap-2">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-action" />
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card-surface p-7">
              <p className="eyebrow">Notre groupe cible</p>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                Personnes déplacées et familles d'accueil, femmes et filles, jeunes sans emploi, enfants vulnérables,
                personnes vivant avec un handicap, ménages agricoles et communautés rurales affectées par les conflits
                et les chocs climatiques.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Frise chronologique */}
      <section className="bg-secondary/50 py-20 sm:py-24">
        <div className="container-page">
          <SectionHeading eyebrow="Frise chronologique" title="Les grandes étapes de notre parcours" />
          <ol className="relative mt-14 space-y-8 border-l pl-8">
            {timeline.map((t, i) => (
              <Reveal key={t.year + t.title} delay={i * 0.06}>
                <li className="relative">
                  <span className="absolute -left-[41px] top-1.5 flex size-5 items-center justify-center rounded-full border-4 border-background bg-action" />
                  <p className="font-display text-sm font-bold text-primary">{t.year}</p>
                  <h3 className="mt-1 font-display text-lg font-semibold">{t.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{t.text}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Valeurs */}
      <section className="container-page py-20 sm:py-24">
        <SectionHeading eyebrow="Nos valeurs" title="Sept valeurs qui guident chaque décision" />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {valeurs.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.05}>
              <div className="card-surface h-full p-6">
                <span className="font-display text-3xl font-extrabold text-brand-soft">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-2 font-display text-lg font-semibold">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{v.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Principes */}
      <section className="bg-secondary/50 py-20 sm:py-24">
        <div className="container-page">
          <SectionHeading eyebrow="Principes humanitaires" title="Quatre principes non négociables" />
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {principes.map((p, i) => {
              const Icon = principeIcons[i % principeIcons.length]!;
              return (
                <Reveal key={p.title} delay={i * 0.06}>
                  <div className="card-surface h-full p-7">
                    <span className="flex size-12 items-center justify-center rounded-2xl bg-humanitarian-soft text-humanitarian">
                      <Icon className="size-6" />
                    </span>
                    <h3 className="mt-4 font-display text-lg font-semibold">{p.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{p.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
