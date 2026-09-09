import { queryOptions } from "@tanstack/react-query";
import { getSiteContent, type SiteContent, type SiteTextRow } from "@/lib/content.functions";
import { org, jobOffers } from "@/lib/site-data";

export const siteContentQuery = queryOptions({
  queryKey: ["site-content"],
  queryFn: () => getSiteContent(),
  staleTime: 30_000,
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

export function jobsOf(content: SiteContent | undefined) {
  if (content?.jobs?.length) return content.jobs;
  return jobOffers.map((j, i) => ({
    id: j.slug,
    slug: j.slug,
    title: j.title,
    type: j.type,
    lieu: j.lieu,
    departement: j.departement,
    deadline: j.deadline,
    resume: j.resume,
    missions: j.missions,
    profil: j.profil,
    published: true,
    sort_order: i,
    created_at: "",
    updated_at: "",
  }));
}
