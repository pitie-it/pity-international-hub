import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { navigation, org, media } from "@/lib/site-data";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t bg-secondary/50">
      <div className="container-page grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <img src={media.logo} alt="Logo Pitié Internationale" className="size-12 rounded-full object-contain" />
            <div className="min-w-0">
              <p className="font-display font-bold">Pitié Internationale</p>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">{org.devise}</p>
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            ONG humanitaire et de développement engagée depuis {org.since} auprès des populations affectées par les
            crises en République Démocratique du Congo.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest">Liens rapides</h3>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-muted-foreground lg:grid-cols-1">
            {navigation.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="transition-colors hover:text-foreground">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest">Coordonnées</h3>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-humanitarian" /> {org.address}
            </li>
            <li className="flex gap-2">
              <Phone className="mt-0.5 size-4 shrink-0 text-humanitarian" /> {org.phone}
            </li>
            <li className="flex gap-2">
              <Mail className="mt-0.5 size-4 shrink-0 text-humanitarian" /> {org.email}
            </li>
          </ul>
          <div className="mt-4 flex flex-wrap gap-2">
            {org.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer noopener"
                className="rounded-full border px-3 py-1 text-xs font-medium transition-colors hover:bg-accent"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest">Newsletter</h3>
          <p className="mt-4 text-sm text-muted-foreground">
            Recevez nos actualités, rapports et appels à l'action.
          </p>
          <form
            className="mt-4 flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              toast.success("Merci ! Votre inscription a bien été enregistrée.");
              (e.target as HTMLFormElement).reset();
            }}
          >
            <Input type="email" required placeholder="Votre email" aria-label="Votre email" />
            <Button type="submit" className="bg-action text-action-foreground hover:bg-action/90">
              OK
            </Button>
          </form>
        </div>
      </div>

      <div className="border-t">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-5 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Pitié Internationale. Tous droits réservés.</p>
          <div className="flex gap-4">
            <Link to="/confidentialite" className="hover:text-foreground">
              Politique de confidentialité
            </Link>
            <Link to="/mentions-legales" className="hover:text-foreground">
              Mentions légales
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
