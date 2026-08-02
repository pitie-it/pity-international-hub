import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, Quote, Target, ListChecks } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero, Reveal } from "@/components/site/primitives";
import { programmes } from "@/lib/site-data";

export const Route = createFileRoute("/programmes/$slug")({
  loader: ({ params }) => {
    const programme = programmes.find((p) => p.slug === params.slug);
    if (!programme) throw notFound();
    return { programme };
  },
  component: ProgrammeDetail,
  errorComponent: ({ error }) => (
    <div className="container-page py-24 text-center" role="alert">
      {error.message}
    </div>
  ),
  notFoundComponent: () => (
    <div className="container-page py-24 text-center">
      <h1 className="text-2xl font-bold">Programme introuvable</h1>
      <Button asChild className="mt-6">
        <Link to="/programmes">Retour aux programmes</Link>
      </Button>
    </div>
  ),
  head: ({ params, loaderData }) => ({
    meta: [
      { title: `${loaderData?.programme.title ?? "Programme"} — Pitié Internationale` },
      { name: "description", content: loaderData?.programme.presentation ?? "Programme de Pitié Internationale." },
      { property: "og:title", content: loaderData?.programme.title ?? "Programme" },
      { property: "og:description", content: loaderData?.programme.tagline ?? "" },
      { property: "og:type", content: "article" },
      { property: "og:url", content: `/programmes/${params.slug}` },
    ],
    links: [{ rel: "canonical", href: `/programmes/${params.slug}` }],
  }),
});

function ProgrammeDetail() {
  const { programme } = Route.useLoaderData();

  return (
    <>
      <PageHero
        eyebrow="Programme"
        title={programme.title}
        subtitle={programme.tagline}
        image={programme.image}
      />

      <section className="container-page py-16 sm:py-24">
        <Button asChild variant="link" className="px-0">
          <Link to="/programmes">
            <ArrowLeft className="size-4" /> Tous les programmes
          </Link>
        </Button>

        <div className="mt-8 grid gap-12 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
          <div className="space-y-12">
            <Reveal>
              <h2 className="text-2xl font-bold">Présentation</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">{programme.presentation}</p>
            </Reveal>

            <Reveal>
              <h2 className="flex items-center gap-2 text-2xl font-bold">
                <Target className="size-6 text-humanitarian" /> Objectifs
              </h2>
              <ul className="mt-4 space-y-3">
                {programme.objectifs.map((o) => (
                  <li key={o} className="flex gap-3 text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-humanitarian" /> {o}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal>
              <h2 className="flex items-center gap-2 text-2xl font-bold">
                <ListChecks className="size-6 text-primary" /> Activités
              </h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {programme.activites.map((a) => (
                  <div key={a} className="rounded-xl border bg-card p-4 text-sm">
                    {a}
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal>
              <h2 className="text-2xl font-bold">Résultats</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {programme.resultats.map((r) => (
                  <div key={r} className="rounded-xl bg-humanitarian-soft p-5 text-sm font-medium text-foreground">
                    {r}
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal>
              <h2 className="text-2xl font-bold">Photos</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <img src={programme.image} alt={programme.title} loading="lazy" className="h-56 w-full rounded-2xl object-cover" />
                <img
                  src={programmes[(programmes.indexOf(programme) + 1) % programmes.length]!.image}
                  alt="Activités de terrain"
                  loading="lazy"
                  className="h-56 w-full rounded-2xl object-cover"
                />
              </div>
            </Reveal>
          </div>

          <aside className="space-y-6">
            <Reveal className="card-surface p-7">
              <Quote className="size-8 text-action" />
              <p className="mt-4 italic leading-relaxed">« {programme.temoignage.quote} »</p>
              <p className="mt-4 text-sm font-semibold text-muted-foreground">— {programme.temoignage.author}</p>
            </Reveal>
            <Reveal delay={0.1} className="rounded-2xl gradient-brand p-7 text-primary-foreground">
              <h3 className="font-display text-lg font-bold">Soutenir ce programme</h3>
              <p className="mt-2 text-sm opacity-90">
                Votre don finance directement les activités menées auprès des communautés.
              </p>
              <Button asChild className="mt-5 w-full bg-action text-action-foreground hover:bg-action/90">
                <Link to="/don">Faire un don</Link>
              </Button>
            </Reveal>
          </aside>
        </div>
      </section>
    </>
  );
}
