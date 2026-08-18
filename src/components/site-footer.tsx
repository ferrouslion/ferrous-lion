import { LionMark } from "@/components/lion-mark";
import { EPIC_CREATOR_CODE, SOCIALS } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div className="flex items-center gap-3">
          <LionMark className="size-8" />
          <div>
            <p className="font-display text-sm font-semibold tracking-[0.16em] text-fg uppercase">
              Ferrous Lion
            </p>
            <p className="text-xs text-faint">
              Epic creator code{" "}
              <span className="text-muted">{EPIC_CREATOR_CODE}</span>
            </p>
          </div>
        </div>
        <p className="text-xs text-faint">
          <a
            href={SOCIALS.twitch}
            className="hover:text-muted"
            target="_blank"
            rel="noreferrer"
          >
            Twitch
          </a>
          <span className="mx-2">·</span>
          Built for the next drop-in.
        </p>
      </div>
    </footer>
  );
}
