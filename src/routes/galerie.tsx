import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PlayCircle, X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { PageHero, Reveal, SectionHeading } from "@/components/site/primitives";
import { galleryItems, media } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/galerie")({
  component: Galerie,
  head: () => ({
    meta: [
      { title: "Galerie — Pitié Internationale" },
      {
        name: "description",
        content: "Photos et vidéos des interventions de Pitié Internationale auprès des communautés en RDC.",
      },
      { property: "og:title", content: "Galerie — Pitié Internationale" },
      { property: "og:description", content: "Nos actions en images : albums photos et vidéos de terrain." },
      { property: "og:url", content: "/galerie" },
    ],
    links: [{ rel: "canonical", href: "/galerie" }],
  }),
});

function Galerie() {
  const albums = ["Tous", ...Array.from(new Set(galleryItems.map((g) => g.album)))];
  const [album, setAlbum] = useState("Tous");
  const [lightbox, setLightbox] = useState<{ src: string; title: string } | null>(null);
  const items = album === "Tous" ? galleryItems : galleryItems.filter((g) => g.album === album);

  return (
    <>
      <PageHero
        eyebrow="Galerie"
        title="Nos actions en images"
        subtitle="Découvrez le quotidien de nos équipes et des communautés que nous accompagnons."
        image={media.recolte}
      />

      <section className="container-page py-20 sm:py-24">
        <div className="flex flex-wrap gap-2">
          {albums.map((a) => (
            <button
              key={a}
              onClick={() => setAlbum(a)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                album === a ? "border-primary bg-primary text-primary-foreground" : "hover:bg-accent",
              )}
            >
              {a}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((g, i) => (
            <Reveal key={g.title} delay={(i % 3) * 0.06}>
              <button
                onClick={() => setLightbox({ src: g.src, title: g.title })}
                className="group relative block w-full overflow-hidden rounded-2xl shadow-card"
              >
                <img
                  src={g.src}
                  alt={g.title}
                  loading="lazy"
                  className="h-60 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-left text-sm font-medium text-white">
                  {g.title}
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-secondary/50 py-20 sm:py-24">
        <div className="container-page">
          <SectionHeading eyebrow="Vidéos" title="Galerie vidéos" subtitle="Nos reportages de terrain, bientôt disponibles." />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {["Campagne agricole 2026", "Réponse d'urgence au Nord-Kivu", "Portraits de femmes entrepreneures"].map((v, i) => (
              <Reveal key={v} delay={i * 0.07}>
                <div className="card-surface flex h-52 flex-col items-center justify-center gap-3 p-6 text-center">
                  <PlayCircle className="size-10 text-action" />
                  <p className="font-display font-semibold">{v}</p>
                  <p className="text-xs text-muted-foreground">Vidéo à venir</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Dialog open={!!lightbox} onOpenChange={(o) => !o && setLightbox(null)}>
        <DialogContent className="max-w-4xl p-2">
          <DialogTitle className="sr-only">{lightbox?.title ?? "Image"}</DialogTitle>
          {lightbox && (
            <figure>
              <img src={lightbox.src} alt={lightbox.title} className="max-h-[75dvh] w-full rounded-lg object-contain" />
              <figcaption className="p-3 text-center text-sm text-muted-foreground">{lightbox.title}</figcaption>
            </figure>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
