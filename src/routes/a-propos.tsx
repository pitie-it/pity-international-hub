import { createFileRoute } from "@tanstack/react-router";
import { Heart, Scale, ShieldCheck, Globe2 } from "lucide-react";
import { PageHero, Reveal, SectionHeading } from "@/components/site/primitives";
import { axesProgrammatiques, groupesCibles, media, principes, timeline, valeurs } from "@/lib/site-data";


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
        title="PITIE INTERNATIONALE (PI ONG)"
        subtitle="Organisation non gouvernementale nationale de droit congolais créée en 2023, PI intervient en République Démocratique du Congo pour apporter une réponse humanitaire, soutenir le relèvement communautaire et promouvoir un développement inclusif."
        image={media.suivi}
      />

      <section className="container-page py-20 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal>
            <span className="eyebrow">Notre histoire</span>
            <h2 className="mt-3 text-3xl font-bold">Née au plus près des communautés</h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              Face à l'ampleur des déplacements forcés de populations, à l'insécurité alimentaire persistante, aux
              effets négatifs de l'insécurité humaine, aux crises humanitaires récurrentes et à la dégradation des
              services sociaux de base dans l'Est de la République Démocratique du Congo, un groupe de professionnels
              congolais engagés dans l'action humanitaire et le développement a fondé PITIE INTERNATIONALE ONG.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Cette initiative est née d'une conviction forte : les solutions les plus durables, les plus inclusives et
              les plus efficaces sont celles qui émergent des communautés elles-mêmes, avec leur participation active et
              leur leadership.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Depuis sa création, PI met en œuvre des interventions qui allient réponse humanitaire d'urgence,
              relèvement précoce et développement durable, en plaçant la transparence, la qualité, l'intégrité et la
              redevabilité au cœur de sa gouvernance.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="space-y-6">
            <div className="card-surface p-7">
              <p className="eyebrow">Notre vision</p>
              <p className="mt-3 leading-relaxed">
                Nous aspirons à un monde d'espoir, d'inclusion et de justice sociale, où la pauvreté est vaincue et où
                chaque personne vit dans la dignité, la sécurité humaine et le respect de ses droits fondamentaux.
              </p>
            </div>
            <div className="card-surface p-7">
              <p className="eyebrow">Notre mission</p>
              <p className="mt-3 leading-relaxed">
                Sauver des vies, vaincre la pauvreté, promouvoir la justice sociale et contribuer à la sécurité humaine
                à travers des interventions humanitaires, de relèvement et de développement durables, centrées sur les
                besoins des communautés les plus vulnérables.
              </p>
            </div>
            <div className="card-surface p-7">
              <p className="eyebrow">Notre groupe cible</p>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {groupesCibles.map((g) => (
                  <li key={g} className="flex gap-2 text-sm text-muted-foreground">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-action" />
                    <span>{g}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Axes programmatiques */}
      <section className="container-page pb-20 sm:pb-24">
        <SectionHeading eyebrow="Axes programmatiques" title="Quatre axes structurent nos interventions" />
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {axesProgrammatiques.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.06}>
              <div className="card-surface h-full p-7">
                <span className="font-display text-3xl font-extrabold text-brand-soft">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-display text-lg font-semibold">{a.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{a.text}</p>
              </div>
            </Reveal>
          ))}
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
