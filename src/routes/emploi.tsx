import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Briefcase, CalendarClock, MapPin, Building2, Send } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PageHero, Reveal, SectionHeading } from "@/components/site/primitives";
import { jobOffers, media, org } from "@/lib/site-data";

export const Route = createFileRoute("/emploi")({
  component: Emploi,
  head: () => ({
    meta: [
      { title: "Emplois et carrières — Pitié Internationale" },
      {
        name: "description",
        content:
          "Découvrez les offres d'emploi, stages et consultances de Pitié Internationale en RDC et postulez en ligne en quelques minutes.",
      },
      { property: "og:title", content: "Emplois et carrières — Pitié Internationale" },
      {
        property: "og:description",
        content: "Rejoignez une équipe humanitaire congolaise engagée. Postulez en ligne.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/emploi" }],
  }),
});

const applicationSchema = z.object({
  nom: z.string().trim().min(2, "Nom trop court").max(100, "Nom trop long"),
  email: z.string().trim().email("Adresse e-mail invalide").max(255),
  telephone: z.string().trim().min(6, "Numéro invalide").max(30),
  poste: z.string().min(1, "Sélectionnez un poste"),
  cv: z.string().trim().url("Lien invalide (https://…)").max(500),
  lettre: z
    .string()
    .trim()
    .min(50, "Votre lettre doit contenir au moins 50 caractères")
    .max(2000, "2000 caractères maximum"),
});

function Emploi() {
  const [poste, setPoste] = useState("");
  const [sending, setSending] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const parsed = applicationSchema.safeParse({
      nom: String(data.get("nom") ?? ""),
      email: String(data.get("email") ?? ""),
      telephone: String(data.get("telephone") ?? ""),
      poste,
      cv: String(data.get("cv") ?? ""),
      lettre: String(data.get("lettre") ?? ""),
    });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Formulaire invalide");
      return;
    }
    setSending(true);
    setTimeout(() => {
      setSending(false);
      form.reset();
      setPoste("");
      toast.success("Candidature envoyée ! Nous revenons vers vous sous 15 jours.");
    }, 700);
  };

  return (
    <>
      <PageHero
        eyebrow="Carrières"
        title="Rejoignez nos équipes sur le terrain"
        subtitle="Pitié Internationale recrute des professionnels engagés pour servir les communautés du Nord-Kivu, du Sud-Kivu et de l'Ituri. Postulez en ligne, en quelques minutes."
        image={media.suivi}
      />

      {/* OFFRES */}
      <section className="container-page py-20 sm:py-24">
        <SectionHeading
          eyebrow="Offres ouvertes"
          title="Nos opportunités du moment"
          subtitle="Toutes nos offres sont ouvertes de manière équitable : PI ONG applique une politique de tolérance zéro face à toute forme de discrimination, d'exploitation et d'abus."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {jobOffers.map((job, i) => (
            <Reveal key={job.slug} delay={i * 0.06}>
              <article className="card-surface flex h-full flex-col p-7">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className="bg-brand-soft text-primary hover:bg-brand-soft">{job.type}</Badge>
                  <Badge variant="outline">{job.departement}</Badge>
                </div>
                <h3 className="mt-4 font-display text-lg font-bold leading-snug">{job.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{job.resume}</p>

                <dl className="mt-5 grid gap-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="size-4 text-primary" /> {job.lieu}
                  </div>
                  <div className="flex items-center gap-2">
                    <Building2 className="size-4 text-primary" /> Département {job.departement}
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarClock className="size-4 text-action" /> Clôture : {job.deadline}
                  </div>
                </dl>

                <Accordion type="single" collapsible className="mt-4">
                  <AccordionItem value="details" className="border-b-0">
                    <AccordionTrigger className="py-2 text-sm font-semibold text-primary">
                      Voir les missions et le profil
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="mt-1 text-sm font-semibold">Principales missions</p>
                      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                        {job.missions.map((m) => (
                          <li key={m}>{m}</li>
                        ))}
                      </ul>
                      <p className="mt-4 text-sm font-semibold">Profil recherché</p>
                      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                        {job.profil.map((p) => (
                          <li key={p}>{p}</li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <Button
                  className="mt-5 w-fit bg-action text-action-foreground hover:bg-action/90"
                  onClick={() => {
                    setPoste(job.title);
                    document.getElementById("postuler")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <Briefcase className="size-4" /> Postuler
                </Button>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FORMULAIRE */}
      <section id="postuler" className="bg-secondary/50 py-20 sm:py-24">
        <div className="container-page">
          <SectionHeading
            eyebrow="Candidature en ligne"
            title="Déposez votre dossier"
            subtitle="Remplissez le formulaire ci-dessous. Seuls les candidats présélectionnés seront contactés."
          />
          <Reveal className="mx-auto mt-12 max-w-3xl">
            <form onSubmit={onSubmit} className="card-surface grid gap-5 p-8 text-left sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="nom">Nom complet *</Label>
                <Input id="nom" name="nom" maxLength={100} required placeholder="Votre nom et prénom" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Adresse e-mail *</Label>
                <Input id="email" name="email" type="email" maxLength={255} required placeholder="vous@exemple.com" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="telephone">Téléphone *</Label>
                <Input id="telephone" name="telephone" maxLength={30} required placeholder="+243 …" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="poste">Poste visé *</Label>
                <Select value={poste} onValueChange={setPoste}>
                  <SelectTrigger id="poste">
                    <SelectValue placeholder="Choisissez une offre" />
                  </SelectTrigger>
                  <SelectContent>
                    {jobOffers.map((j) => (
                      <SelectItem key={j.slug} value={j.title}>
                        {j.title}
                      </SelectItem>
                    ))}
                    <SelectItem value="Candidature spontanée">Candidature spontanée</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2 sm:col-span-2">
                <Label htmlFor="cv">Lien vers votre CV (Drive, Dropbox…) *</Label>
                <Input id="cv" name="cv" type="url" maxLength={500} required placeholder="https://…" />
              </div>
              <div className="grid gap-2 sm:col-span-2">
                <Label htmlFor="lettre">Lettre de motivation *</Label>
                <Textarea
                  id="lettre"
                  name="lettre"
                  rows={6}
                  maxLength={2000}
                  required
                  placeholder="Présentez brièvement votre parcours et vos motivations…"
                />
              </div>
              <div className="sm:col-span-2 flex flex-wrap items-center justify-between gap-4">
                <p className="text-xs text-muted-foreground">
                  Vos données sont utilisées uniquement pour le traitement de votre candidature.
                </p>
                <Button
                  type="submit"
                  disabled={sending}
                  className="bg-action text-action-foreground hover:bg-action/90"
                >
                  <Send className="size-4" /> {sending ? "Envoi…" : "Envoyer ma candidature"}
                </Button>
              </div>
            </form>
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Une question sur le recrutement ? Écrivez-nous à{" "}
              <a className="font-semibold text-primary hover:underline" href={`mailto:${org.email}`}>
                {org.email}
              </a>
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
