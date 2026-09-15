import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { ArrowRight, Sprout, HeartPulse, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal, SectionHeading } from "@/components/site/primitives";
import { media, org, programmes } from "@/lib/site-data";
import { contactInfo, siteContentQuery, textOf } from "@/lib/content";

export const Route = createFileRoute("/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(siteContentQuery),
  component: Home,
  head: () => ({ meta: [
    { title: "Pitié Internationale — ONG humanitaire en RDC" },
    { name: "description", content: "Pitié Internationale accompagne les communautés vulnérables en RDC par des actions humanitaires et de développement durable." },
    { property: "og:title", content: "Pitié Internationale — ONG humanitaire en RDC" },
    { property: "og:description", content: "Une ONG congolaise engagée pour la dignité et la résilience des communautés." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ], links: [{ rel: "canonical", href: "/" }] }),
});

const icons = [Sprout, HeartPulse, Scale];

function Home() {
  const { data } = useSuspenseQuery(siteContentQuery);
  const info = contactInfo(data);
  const texts = data.texts;
  const heroTitle = textOf(texts, "home.hero_title", "Ensemble pour sauver des vies et restaurer la dignité humaine");
  const heroText = textOf(texts, "home.hero_text", "Aux côtés des communautés les plus vulnérables, nous transformons la solidarité en actions concrètes pour répondre aux urgences et bâtir un avenir durable.");
  const missionTitle = textOf(texts, "home.mission_title", "Une ONG congolaise au service de la dignité humaine");
  const missionText = textOf(texts, "home.mission_text", "Pitié Internationale agit avec les communautés du Nord-Kivu, du Sud-Kivu et de l’Ituri pour sauver des vies, réduire la pauvreté et renforcer la sécurité humaine.");

  return <>
    <section className="relative isolate flex min-h-[78dvh] items-center overflow-hidden">
      <img src={media.recolte} alt="Récolte communautaire accompagnée par Pitié Internationale" className="absolute inset-0 size-full object-cover" />
      <div className="absolute inset-0 gradient-hero" />
      <div className="container-page relative py-20 text-primary-foreground">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }} className="max-w-4xl">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-action">{info.devise || org.devise}</span>
          <h1 className="mt-5 text-4xl font-extrabold leading-tight sm:text-6xl">{heroTitle}</h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed opacity-90 sm:text-lg">{heroText}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="bg-action text-action-foreground hover:bg-action/90"><Link to="/programmes">Découvrir nos actions <ArrowRight className="size-4" /></Link></Button>
            <Button asChild size="lg" variant="outline" className="border-white/40 bg-white/10 text-primary-foreground hover:bg-white/20 hover:text-primary-foreground"><Link to="/don">Faire un don</Link></Button>
          </div>
        </motion.div>
      </div>
    </section>

    <section className="container-page py-16 sm:py-20">
      <Reveal className="mx-auto max-w-3xl text-center"><span className="eyebrow">Notre mission</span><h2 className="mt-3 text-3xl font-bold sm:text-4xl">{missionTitle}</h2><p className="mt-5 leading-relaxed text-muted-foreground">{missionText}</p><Button asChild variant="link" className="mt-4"><Link to="/a-propos">Qui sommes-nous ? <ArrowRight className="size-4" /></Link></Button></Reveal>
    </section>

    <section className="bg-secondary/50 py-16 sm:py-20">
      <div className="container-page"><SectionHeading eyebrow="Nos programmes" title="Nos domaines d’intervention" subtitle="Des réponses essentielles, pensées avec et pour les communautés." />
        <div className="mt-10 grid gap-5 md:grid-cols-3">{programmes.slice(0, 3).map((p, i) => { const Icon = icons[i]!; return <Reveal key={p.slug} delay={i * .06}><Link to="/programmes/$slug" params={{ slug: p.slug }} className="card-surface group block h-full overflow-hidden"><img src={p.image} alt={p.title} loading="lazy" className="h-44 w-full object-cover" /><div className="p-5"><Icon className="size-6 text-primary" /><h3 className="mt-3 text-lg font-semibold">{p.title}</h3><p className="mt-2 text-sm text-muted-foreground">{p.tagline}</p></div></Link></Reveal>; })}</div>
        <div className="mt-9 text-center"><Button asChild variant="outline"><Link to="/programmes">Voir tous nos programmes</Link></Button></div>
      </div>
    </section>

    {data.testimonials.length > 0 && <section className="container-page py-16 sm:py-20"><SectionHeading eyebrow="Témoignages" title="La parole aux communautés" /><div className="mx-auto mt-10 grid max-w-5xl gap-5 md:grid-cols-3">{data.testimonials.slice(0, 3).map((t) => <blockquote key={t.id} className="card-surface p-6"><p className="text-sm leading-relaxed">« {t.quote} »</p><footer className="mt-4 text-sm font-semibold">{t.author}<span className="block font-normal text-muted-foreground">{t.role_label}</span></footer></blockquote>)}</div></section>}

    <section className="gradient-brand py-14 text-primary-foreground"><div className="container-page text-center"><h2 className="text-3xl font-bold">Agissons ensemble</h2><p className="mx-auto mt-3 max-w-xl opacity-90">Votre soutien permet d’apporter une aide concrète aux familles qui en ont le plus besoin.</p><div className="mt-7 flex flex-wrap justify-center gap-3"><Button asChild className="bg-action text-action-foreground hover:bg-action/90"><Link to="/don">Faire un don</Link></Button><Button asChild variant="outline" className="border-white/40 bg-transparent text-primary-foreground hover:bg-white/10 hover:text-primary-foreground"><Link to="/agir">S’engager</Link></Button></div></div></section>
  </>;
}
