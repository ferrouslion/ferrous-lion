import { GAMES } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Games() {
  return (
    <section id="play" className="scroll-mt-24 border-t border-border">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
        <p className="text-xs font-medium tracking-[0.28em] text-accent uppercase">
          What I play
        </p>
        <h2 className="mt-3 max-w-xl text-2xl font-semibold text-fg">
          The rotation on stream
        </h2>
        <p className="mt-4 max-w-2xl text-muted">
          Fortnite is home base. Everything else is whatever the week is asking
          for — Starfield, GTA, mystical worlds, or just chatting about latest
          sports action.
        </p>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {GAMES.map((game) => (
            <li key={game.slug}>
              <article className="hairline hairline-hover group overflow-hidden rounded-2xl bg-surface">
                <div className="relative aspect-4/3 overflow-hidden bg-raised">
                  <img
                    src={game.image}
                    alt=""
                    className={cn(
                      "media-zoom size-full object-cover outline-none",
                      "imageFit" in game && game.imageFit === "top" && "object-top",
                    )}
                  />
                  <span className="game-tag absolute top-3 left-3 rounded-md px-2.5 py-1 text-xs tracking-[0.16em] uppercase">
                    {game.tag}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg font-semibold text-fg">
                    {game.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted">{game.blurb}</p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
