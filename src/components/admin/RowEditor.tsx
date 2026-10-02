import { useState } from "react";
import { Pencil, Plus, Save, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

export type Field = {
  key: string;
  label: string;
  type: "text" | "textarea" | "list" | "number" | "date" | "select";
  options?: readonly string[];
  required?: boolean;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Row = any;

export function RowEditor({
  title, rows, fields, empty, busy, onSave, onDelete, summary,
}: {
  title: string;
  rows: Row[];
  fields: Field[];
  empty: Row;
  busy: boolean;
  onSave: (row: Row) => Promise<unknown>;
  onDelete: (id: string) => void;
  summary: (row: Row) => string;
}) {
  const [draft, setDraft] = useState<Row>(empty);
  const set = (k: string, v: unknown) => setDraft({ ...draft, [k]: v });

  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
      <form
        className="card-surface grid gap-4 p-6"
        onSubmit={(e) => {
          e.preventDefault();
          void onSave(draft).then(() => setDraft(empty));
        }}
      >
        <h2 className="text-xl font-bold">{draft.id ? "Modifier" : "Ajouter"} — {title}</h2>
        {fields.map((f) => (
          <div key={f.key} className="grid gap-2">
            <Label htmlFor={`f-${f.key}`}>{f.label}{f.type === "list" && " (une ligne par élément)"}</Label>
            {f.type === "textarea" || f.type === "list" ? (
              <Textarea
                id={`f-${f.key}`} rows={f.type === "list" ? 4 : 5} required={f.required}
                value={f.type === "list" ? (draft[f.key] ?? []).join("\n") : draft[f.key] ?? ""}
                onChange={(e) => set(f.key, f.type === "list" ? e.target.value.split("\n") : e.target.value)}
              />
            ) : f.type === "select" ? (
              <select
                id={`f-${f.key}`}
                className="h-10 rounded-md border bg-background px-3 text-sm"
                value={draft[f.key] ?? ""}
                onChange={(e) => set(f.key, e.target.value)}
              >
                {f.options?.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            ) : (
              <Input
                id={`f-${f.key}`} type={f.type} required={f.required}
                value={draft[f.key] ?? ""}
                onChange={(e) => set(f.key, f.type === "number" ? Number(e.target.value) : e.target.value)}
              />
            )}
          </div>
        ))}
        <div className="flex items-center gap-3">
          <Switch id="f-published" checked={!!draft.published} onCheckedChange={(v) => set("published", v)} />
          <Label htmlFor="f-published">Publié sur le site</Label>
        </div>
        <div className="flex gap-2">
          <Button type="submit" disabled={busy}><Save className="size-4" /> Enregistrer</Button>
          {draft.id && <Button type="button" variant="outline" onClick={() => setDraft(empty)}><Plus className="size-4" /> Nouveau</Button>}
        </div>
      </form>
      <div className="grid content-start gap-3">
        {rows.map((r) => (
          <article key={r.id} className="card-surface p-5">
            <p className="font-semibold">{summary(r)}</p>
            <p className="text-xs text-muted-foreground">{r.published ? "Publié" : "Masqué"}</p>
            <div className="mt-3 flex gap-2">
              <Button size="sm" variant="outline" onClick={() => { setDraft(r); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
                <Pencil className="size-4" /> Modifier
              </Button>
              <Button
                size="icon" variant="destructive" aria-label="Supprimer"
                onClick={() => { if (confirm("Supprimer définitivement cet élément ?")) onDelete(r.id!); }}
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
          </article>
        ))}
        {rows.length === 0 && <p className="text-sm text-muted-foreground">Aucun élément.</p>}
      </div>
    </div>
  );
}
