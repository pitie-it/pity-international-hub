import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CreditCard, Info, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { PageHero, Reveal, SectionHeading } from "@/components/site/primitives";
import { donationTiers, media, paymentMethods } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/don")({
  component: Don,
  head: () => ({
    meta: [
      { title: "Faire un don — Pitié Internationale" },
      {
        name: "description",
        content:
          "Soutenez Pitié Internationale : carte bancaire, PayPal, Orange Money, Airtel Money, M-Pesa ou virement bancaire. Chaque don change des vies en RDC.",
      },
      { property: "og:title", content: "Faire un don — Pitié Internationale" },
      { property: "og:description", content: "Votre don finance directement nos programmes de terrain en RDC." },
      { property: "og:url", content: "/don" },
    ],
    links: [{ rel: "canonical", href: "/don" }],
  }),
});

const amounts = donationAmounts;

export default function DonPage() {
  const [amount, setAmount] = useState("45");


function Don() {
  const [amount, setAmount] = useState("60");
  const [custom, setCustom] = useState("");
  const [frequency, setFrequency] = useState<"unique" | "mensuel">("unique");

  return (
    <>
      <PageHero
        eyebrow="Faire un don"
        title="Un don, un impact concret"
        subtitle="100 % de nos dons privés financent les activités de terrain menées auprès des communautés affectées par les crises."
        image={media.haricot}
      />

      <section className="container-page py-20 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
          <Reveal className="card-surface p-8">
            <h2 className="font-display text-2xl font-bold">Votre don</h2>
            <div className="mt-6 inline-flex rounded-full border p-1">
              {(["unique", "mensuel"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFrequency(f)}
                  className={cn(
                    "rounded-full px-5 py-2 text-sm font-semibold capitalize transition-colors",
                    frequency === f ? "bg-primary text-primary-foreground" : "text-muted-foreground",
                  )}
                >
                  Don {f}
                </button>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {amounts.map((a) => (
                <button
                  key={a}
                  onClick={() => {
                    setAmount(a);
                    setCustom("");
                  }}
                  className={cn(
                    "rounded-xl border py-3 font-display font-bold transition-colors",
                    amount === a && !custom ? "border-action bg-action text-action-foreground" : "hover:bg-accent",
                  )}
                >
                  {a} $
                </button>
              ))}
            </div>

            <Input
              className="mt-4"
              type="number"
              min="1"
              placeholder="Autre montant (USD)"
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
              aria-label="Autre montant en dollars"
            />

            <p className="mt-6 text-sm font-semibold">Moyens de paiement</p>
            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {paymentMethods.map((m) => (
                <span key={m} className="rounded-lg border bg-muted/50 px-3 py-2 text-center text-xs font-medium">
                  {m}
                </span>
              ))}
            </div>

            <Button
              size="lg"
              className="mt-7 w-full bg-action text-action-foreground hover:bg-action/90"
              onClick={() =>
                toast.info(
                  `Don ${frequency} de ${custom || amount} $ enregistré. Le paiement en ligne sera activé prochainement.`,
                )
              }
            >
              <CreditCard className="size-5" /> Donner {custom || amount} $
            </Button>
            <p className="mt-3 flex gap-2 text-xs text-muted-foreground">
              <Info className="size-4 shrink-0" /> Les paiements en ligne sécurisés seront activés prochainement. En
              attendant, contactez-nous pour un virement bancaire ou un paiement mobile.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="space-y-4">
            <h2 className="font-display text-2xl font-bold">Ce que votre don finance</h2>
            {donationTiers.map((t) => (
              <div key={t.amount} className="card-surface flex gap-4 p-6">
                <span className="font-display text-xl font-extrabold text-action">{t.amount}</span>
                <p className="text-sm text-muted-foreground">{t.text}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="bg-secondary/50 py-20 sm:py-24">
        <div className="container-page">
          <SectionHeading eyebrow="Témoignages" title="Ils ont bénéficié de votre générosité" />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              { q: "Avec le kit de semences, j'ai récolté assez pour nourrir ma famille et vendre le surplus.", a: "Furaha M., Nord-Kivu" },
              { q: "Le point d'eau du village a réduit les maladies chez nos enfants.", a: "Christine A., Sud-Kivu" },
              { q: "Ma petite entreprise emploie aujourd'hui trois jeunes de mon quartier.", a: "Espérance B., Goma" },
            ].map((t, i) => (
              <Reveal key={t.a} delay={i * 0.07}>
                <blockquote className="card-surface h-full p-7">
                  <Quote className="size-7 text-action" />
                  <p className="mt-4 italic leading-relaxed">« {t.q} »</p>
                  <footer className="mt-4 text-sm font-semibold text-muted-foreground">— {t.a}</footer>
                </blockquote>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
