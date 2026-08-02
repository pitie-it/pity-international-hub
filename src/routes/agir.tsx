import { createFileRoute, Link } from "@tanstack/react-router";
import { HandCoins, Handshake, HeartHandshake, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero, Reveal } from "@/components/site/primitives";
import { media } from "@/lib/site-data";

export const Route = createFileRoute("/agir")({
  component: Agir,
  head: () => ({
    meta: [
      { title: "Passez à l'action — Pitié Internationale" },
      {
        name: "description",
        content:
          "Donnez, devenez volontaire, proposez un partenariat ou organisez une collecte de fonds au profit de Pitié Internationale.",
      },
      { property: "og:title", content: "Passez à l'action — Pitié Internationale" },
      { property: "og:description", content: "Quatre façons concrètes de nous soutenir." },
      { property: "og:url", content: "/agir" },
    ],
    links: [{ rel: "canonical", href: "/agir" }],
  }),
});

const actions = [
  {
    icon: HandCoins,
    title: "Faire un don",
    text: "Un don ponctuel ou régulier finance directement nos programmes de terrain.",
    to: "/don" as const,
    cta: "Donner maintenant",
  },
  {
    icon: Users,
    title: "Devenir volontaire",
    text: "Mettez vos compétences au service des communautés, sur le terrain ou à distance.",
    to: "/contact" as const,
    cta: "Postuler",
  },
  {
    icon: Handshake,
    title: "Proposer un partenariat",
    text: "Agences onusiennes, ONG, entreprises et fondations : construisons ensemble.",
    to: "/partenaires" as const,
    cta: "Nous écrire",
  },
  {
    icon: HeartHandshake,
    title: "Participer à une collecte",
    text: "Mobilisez votre entourage autour d'une cause qui change des vies.",
    to: "/contact" as const,
    cta: "Organiser une collecte",
  },
];

function Agir() {
  return (
    <>
      <PageHero
        eyebrow="Passez à l'action"
        title="Votre engagement fait la différence"
        subtitle="Chaque geste compte : un don, du temps, une compétence ou un partenariat peuvent transformer durablement une communauté."
        image={media.semis}
      />

      <section className="container-page py-20 sm:py-24">
        <div className="grid gap-6 md:grid-cols-2">
          {actions.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.07}>
              <div className="card-surface flex h-full flex-col p-8">
                <span className="flex size-14 items-center justify-center rounded-2xl bg-brand-soft text-primary">
                  <a.icon className="size-7" />
                </span>
                <h2 className="mt-5 font-display text-xl font-bold">{a.title}</h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{a.text}</p>
                <Button asChild className="mt-6 w-fit bg-action text-action-foreground hover:bg-action/90">
                  <Link to={a.to}>{a.cta}</Link>
                </Button>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
