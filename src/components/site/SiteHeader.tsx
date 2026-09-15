import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, Moon, Sun, Search, Globe, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { navigation, org, media, programmes, articles } from "@/lib/site-data";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { contactInfo, siteContentQuery } from "@/lib/content";

function useTheme() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const stored = localStorage.getItem("pi-theme");
    const isDark = stored === "dark";
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);
  const toggle = () => {
    setDark((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle("dark", next);
      localStorage.setItem("pi-theme", next ? "dark" : "light");
      return next;
    });
  };
  return { dark, toggle };
}

function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const query = q.trim().toLowerCase();
  const results = query
    ? [
        ...navigation
          .filter((n) => n.label.toLowerCase().includes(query))
          .map((n) => ({ to: n.to, label: n.label, kind: "Page" })),
        ...programmes
          .filter((p) => p.title.toLowerCase().includes(query))
          .map((p) => ({ to: `/programmes/${p.slug}`, label: p.title, kind: "Programme" })),
        ...articles
          .filter((a) => a.title.toLowerCase().includes(query))
          .map((a) => ({ to: "/actualites", label: a.title, kind: a.category })),
      ].slice(0, 8)
    : [];

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        aria-label="Recherche globale"
        onClick={() => setOpen(true)}
      >
        <Search className="size-5" />
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-xl">
          <DialogTitle>Rechercher sur le site</DialogTitle>
          <Input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Programme, page, actualité…"
          />
          <ul className="max-h-72 space-y-1 overflow-y-auto">
            {results.map((r) => (
              <li key={r.kind + r.label}>
                <Link
                  to={r.to}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-lg px-3 py-2 text-sm hover:bg-muted"
                >
                  <span className="min-w-0 truncate">{r.label}</span>
                  <span className="ml-3 shrink-0 text-xs text-muted-foreground">{r.kind}</span>
                </Link>
              </li>
            ))}
            {query && results.length === 0 && (
              <li className="px-3 py-2 text-sm text-muted-foreground">Aucun résultat.</li>
            )}
          </ul>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function SiteHeader() {
  const { data } = useQuery(siteContentQuery);
  const info = contactInfo(data);
  const { dark, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-transparent transition-all duration-300",
        scrolled ? "border-border bg-background/90 backdrop-blur-xl shadow-card" : "bg-background/70 backdrop-blur",
      )}
    >
      <div className="hidden bg-primary text-primary-foreground lg:block">
        <div className="container-page flex items-center justify-between py-1.5 text-xs">
          <p className="font-semibold tracking-wide">{info.devise}</p>
          <div className="flex items-center gap-4">
            <a href={`mailto:${info.email}`} className="hover:underline">
              {info.email}
            </a>
            <span className="opacity-60">|</span>
            <span className="inline-flex items-center gap-1">
              <Globe className="size-3.5" /> FR · EN (bientôt)
            </span>
          </div>
        </div>
      </div>

      <div className="container-page grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-3.5">
        <Link to="/" aria-label="Pitié Internationale — Accueil" className="flex min-w-0 items-center gap-3.5">
          <img
            src={media.logo}
            alt="Emblème de Pitié Internationale"
            className="size-11 shrink-0 rounded-full object-contain sm:size-14"
          />
          <span className="min-w-0 border-l border-border pl-3.5">
            <span className="block whitespace-nowrap font-display text-xs font-extrabold uppercase text-primary sm:text-lg">
              Pitié Internationale
            </span>
            <span className="mt-0.5 hidden text-[0.65rem] font-semibold uppercase text-muted-foreground sm:block">
              Pitié · Humanité · Entraide
            </span>
          </span>
        </Link>


        <div className="flex items-center gap-1">
          <nav className="hidden items-center gap-0.5 2xl:flex">
            {navigation.slice(0, 7).map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "border-b-2 border-transparent px-3 py-2 text-sm font-semibold text-foreground/80 transition-colors hover:border-primary/40 hover:text-primary",
                  pathname === item.to && "border-primary text-primary",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <GlobalSearch />
          <Button variant="ghost" size="icon" aria-label="Basculer le thème" onClick={toggle} className="hidden sm:inline-flex">
            {dark ? <Sun className="size-5" /> : <Moon className="size-5" />}
          </Button>
          <Button asChild className="hidden rounded-md bg-action text-action-foreground hover:bg-action/90 sm:inline-flex">
            <Link to="/don">
              <Heart className="size-4" /> Faire un don
            </Link>
          </Button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Ouvrir le menu" className="2xl:hidden">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[88vw] max-w-sm overflow-y-auto">
              <SheetTitle className="px-4 pt-4">Navigation</SheetTitle>
              <nav className="flex flex-col gap-1 p-4">
                {navigation.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-muted"
                  >
                    {item.label}
                  </Link>
                ))}
                <Button asChild className="mt-3 bg-action text-action-foreground hover:bg-action/90">
                  <Link to="/don" onClick={() => setOpen(false)}>
                    Faire un don
                  </Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
