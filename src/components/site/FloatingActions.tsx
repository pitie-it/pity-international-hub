import { useEffect, useState } from "react";
import { ArrowUp, MessageCircle } from "lucide-react";
import { org } from "@/lib/site-data";

export function FloatingActions() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
      <a
        href={`https://wa.me/${org.whatsapp}`}
        target="_blank"
        rel="noreferrer noopener"
        aria-label="Nous écrire sur WhatsApp"
        className="flex size-12 items-center justify-center rounded-full bg-humanitarian text-humanitarian-foreground shadow-lift transition-transform hover:scale-110"
      >
        <MessageCircle className="size-6" />
      </a>
      {visible && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Retour en haut"
          className="flex size-12 items-center justify-center rounded-full border bg-card text-foreground shadow-card transition-transform hover:scale-110"
        >
          <ArrowUp className="size-5" />
        </button>
      )}
    </div>
  );
}
