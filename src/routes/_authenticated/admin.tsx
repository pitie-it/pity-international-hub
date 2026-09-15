import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { Briefcase, FileText, LogOut, MapPin, MessageSquareQuote, Plus, Save, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  deleteJob, deleteTestimonial, getAdminContent, isAdmin, saveJob, saveSettings,
  saveTestimonial, saveTexts, type JobInput, type SiteContent, type TestimonialInput,
} from "@/lib/content.functions";

export const Route = createFileRoute("/_authenticated/admin")({
  component: AdminPage,
  head: () => ({ meta: [
    { title: "Gestion du site — Pitié Internationale" },
    { name: "description", content: "Administration privée des contenus de Pitié Internationale." },
    { property: "og:title", content: "Gestion du site — Pitié Internationale" },
    { property: "og:description", content: "Administration privée des contenus." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ]}),
});

const emptyTestimonial: TestimonialInput = { quote: "", author: "", role_label: "", sort_order: 0, published: true };
const emptyJob: JobInput = { slug: "", title: "", type: "CDD", lieu: "", departement: "", deadline: "", resume: "", missions: [], profil: [], published: true, sort_order: 0 };

function AdminPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [content, setContent] = useState<SiteContent>();
  const [denied, setDenied] = useState(false);
  const [busy, setBusy] = useState(false);
  const [testimonial, setTestimonial] = useState<TestimonialInput>(emptyTestimonial);
  const [job, setJob] = useState<JobInput>(emptyJob);

  async function load() {
    try {
      const access = await isAdmin();
      if (!access.admin) { setDenied(true); return; }
      setContent(await getAdminContent());
    } catch { setDenied(true); }
  }
  useEffect(() => { void load(); }, []);

  async function run(action: () => Promise<unknown>, message: string) {
    setBusy(true);
    try { await action(); toast.success(message); await queryClient.invalidateQueries(); await load(); }
    catch (error) { toast.error(error instanceof Error ? error.message : "Une erreur est survenue"); }
    finally { setBusy(false); }
  }

  async function signOut() {
    await queryClient.cancelQueries(); queryClient.clear(); await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  if (denied) return <section className="container-page py-24 text-center"><h1 className="text-3xl font-bold">Accès non autorisé</h1><p className="mt-3 text-muted-foreground">Ce compte ne possède pas le rôle administrateur.</p><Button className="mt-6" onClick={signOut}>Changer de compte</Button></section>;
  if (!content) return <section className="container-page py-24 text-center"><p>Chargement de l'administration…</p></section>;

  const setText = (key: string, value: string) => setContent({ ...content, texts: content.texts.map((t) => t.key === key ? { ...t, value } : t) });
  const setSetting = (key: string, value: string) => content.settings && setContent({ ...content, settings: { ...content.settings, [key]: value } });

  return (
    <section className="container-page py-10 sm:py-14">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-6">
        <div><p className="eyebrow">Administration</p><h1 className="mt-2 text-3xl font-bold">Gestion du site</h1><p className="mt-2 text-sm text-muted-foreground">Modifiez vos contenus sans toucher au code.</p></div>
        <Button variant="outline" onClick={signOut}><LogOut className="size-4" /> Déconnexion</Button>
      </div>

      <Tabs defaultValue="texts" className="mt-8">
        <TabsList className="grid h-auto w-full grid-cols-2 gap-1 sm:grid-cols-4">
          <TabsTrigger value="texts"><FileText className="size-4" /> Textes</TabsTrigger>
          <TabsTrigger value="testimonials"><MessageSquareQuote className="size-4" /> Témoignages</TabsTrigger>
          <TabsTrigger value="jobs"><Briefcase className="size-4" /> Emplois</TabsTrigger>
          <TabsTrigger value="settings"><MapPin className="size-4" /> Coordonnées</TabsTrigger>
        </TabsList>

        <TabsContent value="texts" className="mt-8">
          <div className="grid gap-8">
            {Array.from(new Set(content.texts.map((t) => t.page))).map((page) => (
              <div key={page} className="card-surface p-6"><h2 className="text-xl font-bold">{page}</h2><div className="mt-5 grid gap-5">
                {content.texts.filter((t) => t.page === page).map((t) => <div key={t.key} className="grid gap-2"><Label htmlFor={t.key}>{t.label}</Label>{t.multiline ? <Textarea id={t.key} rows={5} value={t.value} onChange={(e) => setText(t.key, e.target.value)} /> : <Input id={t.key} value={t.value} onChange={(e) => setText(t.key, e.target.value)} />}</div>)}
              </div></div>
            ))}
            <Button disabled={busy} className="w-fit" onClick={() => run(() => saveTexts({ data: { texts: content.texts.map(({ key, value }) => ({ key, value })) } }), "Textes enregistrés")}><Save className="size-4" /> Enregistrer les textes</Button>
          </div>
        </TabsContent>

        <TabsContent value="testimonials" className="mt-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
            <form className="card-surface grid gap-4 p-6" onSubmit={(e) => { e.preventDefault(); void run(() => saveTestimonial({ data: testimonial }), "Témoignage enregistré").then(() => setTestimonial(emptyTestimonial)); }}>
              <h2 className="text-xl font-bold">{testimonial.id ? "Modifier" : "Ajouter"} un témoignage</h2>
              <div className="grid gap-2"><Label>Citation</Label><Textarea required rows={5} value={testimonial.quote} onChange={(e) => setTestimonial({ ...testimonial, quote: e.target.value })} /></div>
              <div className="grid gap-2"><Label>Nom</Label><Input required value={testimonial.author} onChange={(e) => setTestimonial({ ...testimonial, author: e.target.value })} /></div>
              <div className="grid gap-2"><Label>Fonction ou lieu</Label><Input value={testimonial.role_label} onChange={(e) => setTestimonial({ ...testimonial, role_label: e.target.value })} /></div>
              <div className="flex items-center gap-3"><Switch checked={testimonial.published} onCheckedChange={(v) => setTestimonial({ ...testimonial, published: v })} /><Label>Publié sur le site</Label></div>
              <div className="flex gap-2"><Button type="submit" disabled={busy}><Save className="size-4" /> Enregistrer</Button>{testimonial.id && <Button type="button" variant="outline" onClick={() => setTestimonial(emptyTestimonial)}>Annuler</Button>}</div>
            </form>
            <div className="grid gap-3">{content.testimonials.map((t) => <article key={t.id} className="card-surface p-5"><blockquote className="text-sm">« {t.quote} »</blockquote><p className="mt-3 font-semibold">{t.author}</p><p className="text-xs text-muted-foreground">{t.role_label} · {t.published ? "Publié" : "Masqué"}</p><div className="mt-4 flex gap-2"><Button size="sm" variant="outline" onClick={() => setTestimonial({ id: t.id, quote: t.quote, author: t.author, role_label: t.role_label, sort_order: t.sort_order, published: t.published })}>Modifier</Button><Button size="icon" variant="destructive" aria-label="Supprimer" onClick={() => run(() => deleteTestimonial({ data: { id: t.id } }), "Témoignage supprimé")}><Trash2 className="size-4" /></Button></div></article>)}</div>
          </div>
        </TabsContent>

        <TabsContent value="jobs" className="mt-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
            <form className="card-surface grid gap-4 p-6" onSubmit={(e) => { e.preventDefault(); void run(() => saveJob({ data: job }), "Offre enregistrée").then(() => setJob(emptyJob)); }}>
              <h2 className="text-xl font-bold">{job.id ? "Modifier" : "Ajouter"} une offre</h2>
              <div className="grid gap-2"><Label>Titre du poste</Label><Input required value={job.title} onChange={(e) => setJob({ ...job, title: e.target.value, slug: job.slug || e.target.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") })} /></div>
              <div className="grid gap-4 sm:grid-cols-2"><div className="grid gap-2"><Label>Type</Label><Input value={job.type} onChange={(e) => setJob({ ...job, type: e.target.value })} /></div><div className="grid gap-2"><Label>Département</Label><Input value={job.departement} onChange={(e) => setJob({ ...job, departement: e.target.value })} /></div></div>
              <div className="grid gap-4 sm:grid-cols-2"><div className="grid gap-2"><Label>Lieu</Label><Input value={job.lieu} onChange={(e) => setJob({ ...job, lieu: e.target.value })} /></div><div className="grid gap-2"><Label>Date limite</Label><Input value={job.deadline} onChange={(e) => setJob({ ...job, deadline: e.target.value })} /></div></div>
              <div className="grid gap-2"><Label>Résumé</Label><Textarea required rows={3} value={job.resume} onChange={(e) => setJob({ ...job, resume: e.target.value })} /></div>
              <div className="grid gap-2"><Label>Missions (une par ligne)</Label><Textarea rows={5} value={job.missions.join("\n")} onChange={(e) => setJob({ ...job, missions: e.target.value.split("\n").filter(Boolean) })} /></div>
              <div className="grid gap-2"><Label>Profil (un élément par ligne)</Label><Textarea rows={5} value={job.profil.join("\n")} onChange={(e) => setJob({ ...job, profil: e.target.value.split("\n").filter(Boolean) })} /></div>
              <div className="flex items-center gap-3"><Switch checked={job.published} onCheckedChange={(v) => setJob({ ...job, published: v })} /><Label>Offre publiée</Label></div>
              <div className="flex gap-2"><Button type="submit" disabled={busy}><Save className="size-4" /> Enregistrer</Button>{job.id && <Button type="button" variant="outline" onClick={() => setJob(emptyJob)}>Annuler</Button>}</div>
            </form>
            <div className="grid gap-3">{content.jobs.map((j) => <article key={j.id} className="card-surface p-5"><h3 className="font-bold">{j.title}</h3><p className="mt-1 text-sm text-muted-foreground">{j.type} · {j.lieu} · {j.published ? "Publiée" : "Masquée"}</p><div className="mt-4 flex gap-2"><Button size="sm" variant="outline" onClick={() => setJob({ id: j.id, slug: j.slug, title: j.title, type: j.type, lieu: j.lieu, departement: j.departement, deadline: j.deadline, resume: j.resume, missions: j.missions, profil: j.profil, published: j.published, sort_order: j.sort_order })}>Modifier</Button><Button size="icon" variant="destructive" aria-label="Supprimer" onClick={() => run(() => deleteJob({ data: { id: j.id } }), "Offre supprimée")}><Trash2 className="size-4" /></Button></div></article>)}</div>
          </div>
          <Button variant="outline" className="mt-5" onClick={() => setJob(emptyJob)}><Plus className="size-4" /> Nouvelle offre</Button>
        </TabsContent>

        <TabsContent value="settings" className="mt-8">
          {content.settings && <div className="card-surface grid gap-5 p-6 sm:grid-cols-2">{[
            ["email", "Adresse e-mail"], ["phone", "Téléphone principal"], ["phone_alt", "Deuxième téléphone"], ["whatsapp", "Numéro WhatsApp"], ["address", "Adresse"], ["devise", "Devise"], ["facebook", "Facebook"], ["instagram", "Instagram"], ["linkedin", "LinkedIn"], ["youtube", "YouTube"],
          ].map(([key, label]) => <div key={key} className={`grid gap-2 ${key === "address" || key === "devise" ? "sm:col-span-2" : ""}`}><Label>{label}</Label><Input value={String(content.settings?.[key as keyof typeof content.settings] ?? "")} onChange={(e) => setSetting(key, e.target.value)} /></div>)}<div className="sm:col-span-2"><Button disabled={busy} onClick={() => run(() => saveSettings({ data: content.settings ?? {} }), "Coordonnées enregistrées")}><Save className="size-4" /> Enregistrer les coordonnées</Button></div></div>}
        </TabsContent>
      </Tabs>
    </section>
  );
}
