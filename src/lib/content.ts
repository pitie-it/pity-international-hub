import { queryOptions } from "@tanstack/react-query";
import { getSiteContent, type SiteContent, type SiteTextRow } from "@/lib/content.functions";
import { org } from "@/lib/site-data";

export const siteContentQuery = queryOptions({
  queryKey: ["site-content"],
  queryFn: () => getSiteContent(),
  staleTime: 0,
  refetchInterval: 30_000,
  refetchIntervalInBackground: false,
  refetchOnMount: "always",
  refetchOnWindowFocus: "always",
  refetchOnReconnect: "always",
});

export function textOf(texts: SiteTextRow[] | undefined, key: string, fallback: string) {
  const found = texts?.find((t) => t.key === key)?.value?.trim();
  return found && found.length > 0 ? found : fallback;
}

/** Coordonnées : valeurs enregistrées, sinon celles du site par défaut. */
export function contactInfo(content: SiteContent | undefined) {
  const s = content?.settings;
  return {
    email: s?.email || org.email,
    phone: s?.phone || org.phone,
    phoneAlt: s?.phone_alt || org.phoneAlt,
    whatsapp: s?.whatsapp || org.whatsapp,
    address: s?.address || org.address,
    devise: s?.devise || org.devise,
    socials: s
      ? [
          { label: "Facebook", href: s.facebook },
          { label: "Instagram", href: s.instagram },
          { label: "LinkedIn", href: s.linkedin },
          { label: "YouTube", href: s.youtube },
        ].filter((x) => x.href)
      : org.socials.map((x) => ({ label: x.label, href: x.href })),
  };
}

import {
  media, programmes as staticProgrammes, provinces as staticProvinces, articles as staticArticles,
  type Programme, type Article,
} from "@/lib/site-data";

export const imageKeys = ["recolte", "haricot", "suivi", "semis", "plantation", "grain"] as const;
export function imageOf(key: string | undefined) {
  return (media as Record<string, string>)[key ?? ""] ?? media.recolte;
}

export function programsOf(content: SiteContent | undefined): Programme[] {
  const rows = content?.programmes;
  if (!rows?.length) return staticProgrammes;
  return rows.map((r): Programme => {
    const temoignage = staticProgrammes.find((p) => p.slug === r.slug)?.temoignage;
    return {
    ...(temoignage ? { temoignage } : {}),
    slug: r.slug, title: r.title, tagline: r.tagline, image: imageOf(r.image_key),
    presentation: r.presentation, objectifs: r.objectifs, activites: r.activites, resultats: r.resultats,
  }; });
}

export type ProvinceView = { slug: string; name: string; chef: string; text: string; programmes: string[]; beneficiaires: string; x: number; y: number };
export function provincesOf(content: SiteContent | undefined): ProvinceView[] {
  const rows = content?.provinces;
  const coords: Record<string, [number, number]> = { "nord-kivu": [66, 40], "sud-kivu": [66, 56], ituri: [64, 26] };
  if (!rows?.length) return staticProvinces.map((p) => ({ slug: p.slug, name: p.name, chef: p.chef, text: p.text, programmes: p.programmes, beneficiaires: p.beneficiaires, x: coords[p.slug]?.[0] ?? 60, y: coords[p.slug]?.[1] ?? 50 }));
  return rows.map((r) => ({ slug: r.slug, name: r.name, chef: r.chef_lieu, text: r.description, programmes: r.programmes, beneficiaires: r.beneficiaires, x: Number(r.map_x), y: Number(r.map_y) }));
}

export function articlesOf(content: SiteContent | undefined): Article[] {
  const rows = content?.articles;
  if (!rows?.length) return staticArticles;
  return rows.map((r) => ({
    slug: r.slug, title: r.title, category: r.category as Article["category"], excerpt: r.excerpt, image: imageOf(r.image_key),
    date: new Date(r.published_on).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" }),
  }));
}
