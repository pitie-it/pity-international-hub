import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  ArrowRight,
  HandHeart,
  HeartPulse,
  Scale,
  ShieldCheck,
  Sprout,
  Users,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Counter, Reveal, SectionHeading } from "@/components/site/primitives";
import { articles, impactStats, media, org, principes, programmes, provinces } from "@/lib/site-data";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "Pitié Internationale — Sauver des vies en RDC" },
      {
        name: "description",
        content:
          "Depuis 2023, Pitié Internationale accompagne les populations affectées par les crises humanitaires en RDC : sécurité alimentaire, protection, santé, justice économique.",
      },
      { property: "og:title", content: "Pitié Internationale — Sauver des vies en RDC" },
      {
        property: "og:description",
        content: "ONG humanitaire congolaise : solutions durables, inclusives et innovantes au service des communautés.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

const pillarIcons = [Sprout, HeartPulse, Scale, ShieldCheck, Users, HandHeart];

function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative isolate flex min-h-[92dvh] items-center overflow-hidden">
        <img src={media.recolte} alt="" aria-hidden className="absolute inset-0 size-full object-cover" />
        <div className="absolute inset-0 gradient-hero" />
        <div className="container-page relative py-24 text-primary-foreground">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] backdrop-blur">
              {org.devise}
            </span>
            <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] sm:text-6xl">
              Ensemble pour sauver des vies et restaurer la dignité humaine
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed opacity-90 sm:text-lg">
              Chez Pitié Internationale, nous croyons que chaque vie compte et que chaque personne mérite de vivre dans
              la sécurité, la dignité et l'espoir. Aux côtés des communautés les plus vulnérables, nous transformons la
              solidarité en actions concrètes pour répondre aux urgences humanitaires, renforcer la résilience des
              populations et promouvoir un développement durable et inclusif.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-action text-action-foreground hover:bg-action/90">
                <Link to="/programmes">
                  Découvrir nos actions <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/40 bg-white/10 text-primary-foreground backdrop-blur hover:bg-white/20 hover:text-primary-foreground"
              >
                <Link to="/don">Faire un don</Link>
              </Button>
            </div>
          </motion.div>
        </div>
        <motion.a
          href="#mission"
          aria-label="Défiler vers la suite"
          className="absolute bottom-7 left-1/2 -translate-x-1/2 text-primary-foreground/80"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        >
          <ChevronDown className="size-8" />
        </motion.a>
      </section>

      {/* MISSION */}
      <section id="mission" className="container-page py-20 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <span className="eyebrow">Notre mission</span>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Une ONG congolaise au service de la <span className="text-gradient-brand">dignité humaine</span>
            </h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              Sauver des vies, vaincre la pauvreté, promouvoir la justice sociale et renforcer la sécurité humaine :
              telle est la raison d'être de Pitié Internationale. Nous intervenons aux côtés des communautés du
              Nord-Kivu, du Sud-Kivu et de l'Ituri, dans le respect strict des principes humanitaires.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {principes.map((p) => (
                <div key={p.title} className="rounded-xl border bg-card p-4">
                  <p className="font-display font-semibold">{p.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{p.text}</p>
                </div>
              ))}
            </div>
            <Button asChild variant="link" className="mt-6 px-0 text-base">
              <Link to="/a-propos">
                En savoir plus sur notre histoire <ArrowRight className="size-4" />
              </Link>
            </Button>
          </Reveal>
          <Reveal delay={0.15} className="grid grid-cols-2 gap-4">
            <img src={media.semis} alt="Semis collectif avec les groupements de femmes" className="h-56 w-full rounded-2xl object-cover shadow-card sm:h-72" loading="lazy" />
            <img src={media.suivi} alt="Suivi d'un atelier de couture appuyé par PI" className="mt-8 h-56 w-full rounded-2xl object-cover shadow-card sm:h-72" loading="lazy" />
            <img src={media.haricot} alt="Tri du haricot après récolte" className="h-40 w-full rounded-2xl object-cover shadow-card sm:h-52" loading="lazy" />
            <img src={media.plantation} alt="Préparation des champs en terrasse" className="mt-8 h-40 w-full rounded-2xl object-cover shadow-card sm:h-52" loading="lazy" />
          </Reveal>
        </div>
      </section>

      {/* PROGRAMMES */}
      <section className="bg-secondary/50 py-20 sm:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow="Nos programmes"
            title="Cinq programmes intégrés au service des communautés"
            subtitle="PI ONG développe des programmes répondant aux besoins humanitaires immédiats tout en renforçant la résilience des communautés."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {programmes.map((p, i) => {
              const Icon = pillarIcons[i % pillarIcons.length]!;
              return (

                <Reveal key={p.slug} delay={i * 0.06}>
                  <Link to="/programmes/$slug" params={{ slug: p.slug }} className="card-surface group block h-full overflow-hidden">
                    <div className="relative h-44 overflow-hidden">
                      <img
                        src={p.image}
                        alt={p.title}
                        loading="lazy"
                        className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <span className="absolute left-4 top-4 flex size-10 items-center justify-center rounded-xl bg-background/90 text-primary backdrop-blur">
                        <Icon className="size-5" />
                      </span>
                    </div>
                    <div className="p-6">
                      <h3 className="font-display text-lg font-semibold leading-snug">{p.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">{p.tagline}</p>
                      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                        Découvrir <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
          <div className="mt-12 text-center">
            <Button asChild size="lg" variant="outline">
              <Link to="/programmes">Voir tous nos programmes</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* IMPACT */}
      <section className="gradient-brand py-20 text-primary-foreground sm:py-24">
        <div className="container-page">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-action">Notre impact</span>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Des résultats mesurables, une redevabilité totale</h2>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
            {impactStats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.05}>
                <p className="font-display text-3xl font-extrabold sm:text-4xl">
                  <Counter value={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-2 text-sm opacity-85">{s.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROVINCES */}
      <section className="container-page py-20 sm:py-28">
        <SectionHeading
          eyebrow="Là où nous travaillons"
          title="Trois provinces à l'épicentre des crises"
          subtitle="Nos équipes sont présentes au plus près des communautés, dans l'Est de la République Démocratique du Congo."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {provinces.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08}>
              <article className="card-surface h-full p-7">
                <p className="eyebrow">{p.chef}</p>
                <h3 className="mt-2 font-display text-xl font-bold">{p.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
                <p className="mt-5 text-sm font-semibold text-primary">{p.beneficiaires} bénéficiaires</p>
              </article>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button asChild variant="outline">
            <Link to="/ou-nous-travaillons">Explorer la carte interactive</Link>
          </Button>
        </div>
      </section>

      {/* ACTUALITES */}
      <section className="bg-secondary/50 py-20 sm:py-28">
        <div className="container-page">
          <SectionHeading eyebrow="Actualités" title="Les dernières nouvelles du terrain" />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {articles.slice(0, 3).map((a, i) => (
              <Reveal key={a.slug} delay={i * 0.08}>
                <article className="card-surface h-full overflow-hidden">
                  <img src={a.image} alt={a.title} loading="lazy" className="h-44 w-full object-cover" />
                  <div className="p-6">
                    <p className="text-xs font-semibold uppercase tracking-widest text-humanitarian">
                      {a.category} · {a.date}
                    </p>
                    <h3 className="mt-2 font-display text-lg font-semibold leading-snug">{a.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{a.excerpt}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button asChild variant="outline">
              <Link to="/actualites">Toutes les actualités</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-page py-20 sm:py-24">
        <Reveal className="relative isolate overflow-hidden rounded-3xl">
          <img src={media.grain} alt="" aria-hidden className="absolute inset-0 size-full object-cover" />
          <div className="absolute inset-0 gradient-hero" />
          <div className="relative px-8 py-16 text-center text-primary-foreground sm:px-16">
            <h2 className="mx-auto max-w-2xl text-3xl font-bold sm:text-4xl">
              Votre soutien transforme des vies, dès aujourd'hui
            </h2>
            <p className="mx-auto mt-4 max-w-xl opacity-90">
              Donnez, devenez volontaire ou construisons ensemble un partenariat durable.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" className="bg-action text-action-foreground hover:bg-action/90">
                <Link to="/don">Faire un don</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/40 bg-white/10 text-primary-foreground hover:bg-white/20 hover:text-primary-foreground"
              >
                <Link to="/agir">Passez à l'action</Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
