import { useState } from "react";
import { MapPin } from "lucide-react";
import { motion } from "motion/react";
import { provinces } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export function CongoMap() {
  const [active, setActive] = useState(provinces[0]!.slug);
  const current = provinces.find((p) => p.slug === active)!;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
      <div className="relative overflow-hidden rounded-3xl border bg-card p-6 shadow-card">
        <svg viewBox="0 0 100 100" className="h-[380px] w-full" role="img" aria-label="Carte de la République Démocratique du Congo">
          <path
            d="M14 34 L22 22 L34 18 L44 24 L54 16 L64 18 L68 26 L74 28 L72 38 L78 46 L74 58 L66 66 L60 78 L48 86 L36 84 L28 74 L22 62 L16 52 Z"
            className="fill-brand-soft stroke-primary/40"
            strokeWidth="0.8"
          />
          {provinces.map((p) => {
            const coords = { "nord-kivu": [66, 40], "sud-kivu": [66, 56], ituri: [64, 26] } as Record<string, number[]>;
            const [cx, cy] = coords[p.slug]!;
            const isActive = active === p.slug;
            return (
              <g key={p.slug} onMouseEnter={() => setActive(p.slug)} onClick={() => setActive(p.slug)} className="cursor-pointer">
                <circle cx={cx} cy={cy} r={isActive ? 4.5 : 3} className={cn(isActive ? "fill-action" : "fill-primary")} />
                {isActive && <circle cx={cx} cy={cy} r={8} className="fill-action/20" />}
                <text x={cx! + 6} y={cy! + 1.5} className="fill-foreground text-[3.4px] font-semibold">
                  {p.name}
                </text>
              </g>
            );
          })}
        </svg>
        <p className="mt-2 text-center text-xs text-muted-foreground">
          Carte schématique — sélectionnez une province pour afficher sa fiche.
        </p>
      </div>

      <motion.article
        key={current.slug}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="card-surface p-8"
      >
        <span className="eyebrow">
          <MapPin className="size-4" /> {current.chef}
        </span>
        <h3 className="mt-3 font-display text-2xl font-bold">{current.name}</h3>
        <p className="mt-4 leading-relaxed text-muted-foreground">{current.text}</p>
        <p className="mt-6 text-sm font-semibold text-primary">{current.beneficiaires} bénéficiaires accompagnés</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {current.programmes.map((pr) => (
            <span key={pr} className="rounded-full bg-humanitarian-soft px-3 py-1 text-xs font-medium text-foreground">
              {pr}
            </span>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {provinces.map((p) => (
            <button
              key={p.slug}
              onClick={() => setActive(p.slug)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors",
                p.slug === active ? "bg-primary text-primary-foreground" : "hover:bg-accent",
              )}
            >
              {p.name}
            </button>
          ))}
        </div>
      </motion.article>
    </div>
  );
}
