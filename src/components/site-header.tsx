import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { AuthSlot } from "@/components/auth-slot";
import { BrandMark } from "@/components/brand-mark";
import { Button } from "@/components/ui/button";
import { NAV, SOCIALS } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-200",
        scrolled || open
          ? "hairline bg-bg/90 backdrop-blur-md"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:h-[4.5rem] sm:px-8">
        <a href="#top" className="flex items-center gap-2.5 text-fg">
          <BrandMark className="size-8" />
          <span className="font-display text-sm font-semibold tracking-[0.18em] uppercase">
            Ferrous Lion
          </span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm text-muted transition-colors duration-150 hover:text-fg"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <AuthSlot />
          </div>
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <a href={SOCIALS.twitch} target="_blank" rel="noreferrer">
              Watch live
            </a>
          </Button>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-md text-fg lg:hidden"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-border bg-bg px-5 py-6 lg:hidden">
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-base text-fg"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="mt-5 flex items-center justify-between gap-3 px-3">
            <AuthSlot />
            <Button asChild>
              <a href={SOCIALS.twitch} target="_blank" rel="noreferrer">
                Watch live
              </a>
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
