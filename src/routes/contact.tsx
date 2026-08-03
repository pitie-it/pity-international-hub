import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { PageHero, Reveal } from "@/components/site/primitives";
import { media, org } from "@/lib/site-data";

export const Route = createFileRoute("/contact")({
  component: Contact,
  head: () => ({
    meta: [
      { title: "Contact — Pitié Internationale" },
      {
        name: "description",
        content: "Contactez Pitié Internationale à Goma (RDC) : formulaire, téléphone, email, WhatsApp et réseaux sociaux.",
      },
      { property: "og:title", content: "Contact — Pitié Internationale" },
      { property: "og:description", content: "Écrivez-nous, nous vous répondons rapidement." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
});

function Contact() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Parlons de ce que nous pouvons construire ensemble"
        subtitle="Partenaires, bailleurs, volontaires, journalistes ou communautés : nos équipes sont à votre écoute."
        image={media.suivi}
      />

      <section className="container-page py-20 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
          <Reveal className="card-surface p-8">
            <h2 className="font-display text-2xl font-bold">Envoyez-nous un message</h2>
            <form
              className="mt-6 space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                toast.success("Merci ! Votre message a bien été envoyé.");
                (e.target as HTMLFormElement).reset();
              }}
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <Label htmlFor="nom">Nom complet</Label>
                  <Input id="nom" name="nom" required autoComplete="name" className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" required autoComplete="email" className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="tel">Téléphone</Label>
                  <Input id="tel" name="tel" type="tel" autoComplete="tel" className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="sujet">Sujet</Label>
                  <Input id="sujet" name="sujet" required className="mt-2" />
                </div>
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" name="message" required rows={6} className="mt-2" />
              </div>
              <Button type="submit" size="lg" className="bg-action text-action-foreground hover:bg-action/90">
                Envoyer le message
              </Button>
            </form>
          </Reveal>

          <Reveal delay={0.1} className="space-y-6">
            <div className="card-surface p-7">
              <h2 className="font-display text-xl font-bold">Nos coordonnées</h2>
              <ul className="mt-5 space-y-4 text-sm">
                <li className="flex gap-3">
                  <MapPin className="mt-0.5 size-5 shrink-0 text-humanitarian" /> {org.address}
                </li>
                <li className="flex gap-3">
                  <Phone className="mt-0.5 size-5 shrink-0 text-humanitarian" />
                  <span>
                    <a href={`tel:${org.phone.replace(/\s/g, "")}`} className="hover:underline">{org.phone}</a>
                    {" / "}
                    <a href={`tel:${org.phoneAlt.replace(/\s/g, "")}`} className="hover:underline">{org.phoneAlt}</a>
                  </span>
                </li>

                <li className="flex gap-3">
                  <Mail className="mt-0.5 size-5 shrink-0 text-humanitarian" /> {org.email}
                </li>
                <li className="flex gap-3">
                  <MessageCircle className="mt-0.5 size-5 shrink-0 text-humanitarian" />
                  <a href={`https://wa.me/${org.whatsapp}`} className="underline-offset-4 hover:underline">
                    Discuter sur WhatsApp
                  </a>
                </li>
              </ul>
              <div className="mt-5 flex flex-wrap gap-2">
                {org.socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="rounded-full border px-3 py-1 text-xs font-medium hover:bg-accent"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border shadow-card">
              <iframe
                title="Localisation de Pitié Internationale à Goma"
                src="https://www.google.com/maps?q=Goma,%20Nord-Kivu,%20RDC&output=embed"
                className="h-72 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
