import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Reveal, SectionHeading } from "@/components/site/primitives";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { media, partnerCategories } from "@/lib/site-data";

export const Route = createFileRoute("/partenaires")({
  component: Partenaires,
  head: () => ({
    meta: [
      { title: "Nos Partenaires — Pitié Internationale" },
      {
        name: "description",
        content:
          "Agences des Nations Unies, ONG internationales et nationales, institutions publiques, entreprises et fondations partenaires de Pitié Internationale.",
      },
      { property: "og:title", content: "Nos Partenaires — Pitié Internationale" },
      { property: "og:description", content: "Ils nous font confiance et rendent nos actions possibles." },
      { property: "og:url", content: "/partenaires" },
    ],
    links: [{ rel: "canonical", href: "/partenaires" }],
  }),
});

function Partenaires() {
  const allLogos = partnerCategories.flatMap((c) => c.items);

  return (
    <>
      <PageHero
        eyebrow="Nos partenaires"
        title="Des alliances au service des communautés"
        subtitle="Nous travaillons main dans la main avec des partenaires techniques et financiers qui partagent nos valeurs et nos exigences de qualité."
        image={media.suivi}
      />

      <section className="container-page py-20 sm:py-24">
        <SectionHeading eyebrow="Ils nous accompagnent" title="Un réseau de confiance" />
        <Carousel opts={{ align: "start", loop: true }} className="mt-12">
          <CarouselContent>
            {allLogos.map((logo) => (
              <CarouselItem key={logo} className="basis-1/2 sm:basis-1/3 lg:basis-1/5">
                <div className="flex h-24 items-center justify-center rounded-2xl border bg-card px-4 text-center text-sm font-semibold text-muted-foreground shadow-card">
                  {logo}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>

      <section className="bg-secondary/50 py-20 sm:py-24">
        <div className="container-page">
          <SectionHeading eyebrow="Catégories" title="Six familles de partenaires" />
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {partnerCategories.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.06}>
                <div className="card-surface h-full p-7">
                  <h3 className="font-display text-lg font-bold">{c.title}</h3>
                  <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                    {c.items.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-humanitarian" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
