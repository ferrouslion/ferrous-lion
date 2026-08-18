import {
  IconTikTok,
  IconTwitch,
  IconX,
  IconYouTube,
} from "@/components/brand-icons";
import { SOCIALS } from "@/lib/site";

const LINKS = [
  {
    name: "X",
    href: SOCIALS.x,
    handle: "@FerrousLion",
    blurb: "Day-to-day, sports, and go-live pings.",
    icon: IconX,
  },
  {
    name: "YouTube",
    href: SOCIALS.youtube,
    handle: "@ferrouslion",
    blurb: "VODs, shorts, and story missions.",
    icon: IconYouTube,
  },
  {
    name: "Twitch",
    href: SOCIALS.twitch,
    handle: "ferrouslion",
    blurb: "Live drops, chill pubs, late lobbies.",
    icon: IconTwitch,
  },
  {
    name: "TikTok",
    href: SOCIALS.tiktok,
    handle: "@ferrouslion",
    blurb: "Clips and simultaneous live streams.",
    icon: IconTikTok,
  },
] as const;

export function Socials() {
  return (
    <section id="connect" className="scroll-mt-24 border-t border-border">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
        <p className="text-xs font-medium tracking-[0.28em] text-accent uppercase">
          Connect
        </p>
        <h2 className="mt-3 max-w-xl text-2xl font-semibold text-fg">
          Find me everywhere the lion lands
        </h2>
        <p className="mt-4 max-w-2xl text-muted">
          Same name on every platform. Follow the one you actually open.
        </p>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2">
          {LINKS.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="hairline hairline-hover group flex items-center gap-4 rounded-2xl bg-surface p-5"
              >
                <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-raised text-fg">
                  <link.icon className="size-5" />
                </span>
                <span className="min-w-0">
                  <span className="flex items-baseline gap-2">
                    <span className="font-display text-lg font-semibold text-fg">
                      {link.name}
                    </span>
                    <span className="truncate text-sm text-faint">
                      {link.handle}
                    </span>
                  </span>
                  <span className="mt-1 block text-sm text-muted">
                    {link.blurb}
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
