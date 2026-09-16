import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export type SiteSettingsRow = Database["public"]["Tables"]["site_settings"]["Row"];
export type SiteTextRow = Database["public"]["Tables"]["site_texts"]["Row"];
export type TestimonialRow = Database["public"]["Tables"]["testimonials"]["Row"];

export type SiteContent = {
  settings: SiteSettingsRow | null;
  texts: SiteTextRow[];
  testimonials: TestimonialRow[];
};

function publicClient() {
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  return createClient<Database>(process.env["SUPABASE_URL"]!, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) h.delete("Authorization");
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

/** Contenus publics du site (lecture anonyme). */
export const getSiteContent = createServerFn({ method: "GET" }).handler(async (): Promise<SiteContent> => {
  const supabase = publicClient();
  const [settings, texts, testimonials] = await Promise.all([
    supabase.from("site_settings").select("*").eq("id", "main").maybeSingle(),
    supabase.from("site_texts").select("*").order("page").order("sort_order"),
    supabase.from("testimonials").select("*").eq("published", true).order("sort_order"),
  ]);
  return {
    settings: settings.data ?? null,
    texts: texts.data ?? [],
    testimonials: testimonials.data ?? [],
  };
});

async function assertAdmin(supabase: any, userId: string) {
  const { data } = await supabase.rpc("has_role", { _user_id: userId, _role: "admin" });
  if (!data) throw new Error("Accès réservé à l'administrateur");
}

/** Contenus complets pour l'administration (y compris non publiés). */
export const getAdminContent = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<SiteContent> => {
    await assertAdmin(context.supabase, context.userId);
    const supabase = context.supabase;
    const [settings, texts, testimonials] = await Promise.all([
      supabase.from("site_settings").select("*").eq("id", "main").maybeSingle(),
      supabase.from("site_texts").select("*").order("page").order("sort_order"),
      supabase.from("testimonials").select("*").order("sort_order"),
    ]);
    return {
      settings: settings.data ?? null,
      texts: texts.data ?? [],
      testimonials: testimonials.data ?? [],
    };
  });

/** Le tout premier compte connecté devient administrateur. */
export const claimAdmin = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data: identity } = await context.supabase.auth.getUser();
    if (identity.user?.email?.toLowerCase() !== "pitieinternationalrdc@gmail.com") {
      throw new Error("Cette adresse e-mail n'est pas autorisée à administrer le site");
    }
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { count } = await supabaseAdmin
      .from("user_roles")
      .select("id", { count: "exact", head: true })
      .eq("role", "admin");
    if ((count ?? 0) > 0) return { granted: false };
    const { error } = await supabaseAdmin
      .from("user_roles")
      .insert({ user_id: context.userId, role: "admin" });
    if (error) throw new Error(error.message);
    return { granted: true };
  });

export const isAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    return { admin: Boolean(data) };
  });

export const saveTexts = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { texts: { key: string; value: string }[] }) => data)
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    for (const t of data.texts) {
      const { error } = await context.supabase
        .from("site_texts")
        .update({ value: t.value })
        .eq("key", t.key);
      if (error) throw new Error(error.message);
    }
    return { ok: true };
  });

export const saveSettings = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: Partial<SiteSettingsRow>) => data)
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { id: _ignored, updated_at: _ignored2, ...fields } = data;
    const { error } = await context.supabase.from("site_settings").update(fields).eq("id", "main");
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export type TestimonialInput = {
  id?: string;
  quote: string;
  author: string;
  role_label: string;
  sort_order: number;
  published: boolean;
};

export const saveTestimonial = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: TestimonialInput) => data)
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { id, ...fields } = data;
    const query = id
      ? context.supabase.from("testimonials").update(fields).eq("id", id)
      : context.supabase.from("testimonials").insert(fields);
    const { error } = await query;
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const deleteTestimonial = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { error } = await context.supabase.from("testimonials").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

