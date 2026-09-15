import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { LockKeyhole } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { claimAdmin } from "@/lib/content.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { media } from "@/lib/site-data";

export const Route = createFileRoute("/auth")({
  component: AuthPage,
  head: () => ({ meta: [
    { title: "Administration — Pitié Internationale" },
    { name: "description", content: "Connexion à l'espace privé de gestion du site Pitié Internationale." },
    { property: "og:title", content: "Administration — Pitié Internationale" },
    { property: "og:description", content: "Espace privé de gestion du site." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ]}),
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "create">("login");
  const [busy, setBusy] = useState(false);
  const [email, setEmail] = useState("pitieinternationalrdc@gmail.com");
  const [password, setPassword] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "create") {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        toast.success("Compte créé. Consultez votre e-mail pour confirmer votre inscription.");
        setMode("login");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        await claimAdmin();
        navigate({ to: "/admin" });
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Connexion impossible");
    } finally { setBusy(false); }
  }

  return (
    <section className="container-page flex min-h-[70vh] items-center justify-center py-16">
      <div className="card-surface w-full max-w-md p-8">
        <div className="flex justify-center"><img src={media.logo} alt="Pitié Internationale" className="size-20 rounded-full object-contain" /></div>
        <div className="mt-5 flex justify-center"><LockKeyhole className="size-6 text-primary" /></div>
        <h1 className="mt-3 text-2xl font-bold">{mode === "login" ? "Espace administrateur" : "Créer le compte administrateur"}</h1>
        <p className="mt-2 text-center text-sm text-muted-foreground">{mode === "login" ? "Connectez-vous pour modifier le contenu du site." : "Le premier compte créé deviendra l'administrateur du site."}</p>
        <form onSubmit={submit} className="mt-7 grid gap-5 text-left">
          <div className="grid gap-2"><Label htmlFor="admin-email">Adresse e-mail</Label><Input id="admin-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} readOnly required /></div>
          <div className="grid gap-2"><Label htmlFor="admin-password">Mot de passe</Label><Input id="admin-password" type="password" minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} required /></div>
          <Button type="submit" disabled={busy}>{busy ? "Veuillez patienter…" : mode === "login" ? "Se connecter" : "Créer le compte"}</Button>
        </form>
        <Button variant="link" className="mt-4 w-full" onClick={() => setMode(mode === "login" ? "create" : "login")}>{mode === "login" ? "Première connexion ? Créer le compte" : "J'ai déjà un compte"}</Button>
      </div>
    </section>
  );
}
