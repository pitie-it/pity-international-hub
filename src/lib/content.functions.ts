import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export type SiteSettingsRow = Database["public"]["Tables"]["site_settings"]["Row"];
export type SiteTextRow = Database["public"]["Tables"]["site_texts"]["Row"];
export type TestimonialRow = Database["public"]["Tables"]["testimonials"]["Row"];

export type ProgramRow = Database["public"]["Tables"]["programmes"]["Row"];
export type ProvinceRow = Database["public"]["Tables"]["provinces"]["Row"];
export type ArticleRow = Database["public"]["Tables"]["news_articles"]["Row"];

export type SiteContent = {
  settings: SiteSettingsRow | null;
  texts: SiteTextRow[];
  testimonials: TestimonialRow[];
  programmes: ProgramRow[];
  provinces: ProvinceRow[];
  articles: ArticleRow[];
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
  const [settings, texts, testimonials, programmes, provinces, articles] = await Promise.all([
    supabase.from("site_settings").select("*").eq("id", "main").maybeSingle(),
    supabase.from("site_texts").select("*").order("page").order("sort_order"),
    supabase.from("testimonials").select("*").eq("published", true).order("sort_order"),
    supabase.from("programmes").select("*").eq("published", true).order("sort_order"),
    supabase.from("provinces").select("*").eq("published", true).order("sort_order"),
    supabase.from("news_articles").select("*").eq("published", true).order("published_on", { ascending: false }),
  ]);
  return {
    settings: settings.data ?? null,
    texts: texts.data ?? [],
    testimonials: testimonials.data ?? [],
    programmes: programmes.data ?? [],
    provinces: provinces.data ?? [],
    articles: articles.data ?? [],
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
    const [settings, texts, testimonials, programmes, provinces, articles] = await Promise.all([
      supabase.from("site_settings").select("*").eq("id", "main").maybeSingle(),
      supabase.from("site_texts").select("*").order("page").order("sort_order"),
        supabase.from("testimonials").select("*").order("sort_order"),
      supabase.from("programmes").select("*").order("sort_order"),
      supabase.from("provinces").select("*").order("sort_order"),
      supabase.from("news_articles").select("*").order("published_on", { ascending: false }),
    ]);
    return {
      settings: settings.data ?? null,
      texts: texts.data ?? [],
      testimonials: testimonials.data ?? [],
      programmes: programmes.data ?? [],
      provinces: provinces.data ?? [],
      articles: articles.data ?? [],
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


type Table = "programmes" | "provinces" | "news_articles";

function crud<T extends { id?: string }>(table: Table) {
  const save = createServerFn({ method: "POST" })
    .middleware([requireSupabaseAuth])
    .inputValidator((data: T) => data)
    .handler(async ({ data, context }) => {
      await assertAdmin(context.supabase, context.userId);
      const { id, ...fields } = data as any;
      delete fields.created_at; delete fields.updated_at;
      const sb: any = context.supabase;
      const { error } = id
        ? await sb.from(table).update(fields).eq("id", id)
        : await sb.from(table).insert(fields);
      if (error) throw new Error(error.message);
      return { ok: true };
    });
  return save;
}

const delValidator = (data: { id: string }) => data;

export const saveProgram = crud<Partial<ProgramRow>>("programmes");
export const saveProvince = crud<Partial<ProvinceRow>>("provinces");
export const saveArticle = crud<Partial<ArticleRow>>("news_articles");

export const deleteRow = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { table: Table; id: string }) => {
    if (!["programmes", "provinces", "news_articles"].includes(data.table)) throw new Error("Table invalide");
    return data;
  })
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { error } = await (context.supabase as any).from(data.table).delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
void delValidator;
