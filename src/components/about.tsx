import { EPIC_CREATOR_CODE } from "@/lib/site";

const FACTS = [
  { label: "Home setup", value: "PC first, PS5 for exclusives" },
  { label: "On the field", value: "Auburn · Dolphins · United" },
  { label: "Creator code", value: EPIC_CREATOR_CODE },
];

export function About() {
  return (
    <section id="about" className="scroll-mt-24 border-t border-border">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-28">
        <div>
          <p className="text-xs font-medium tracking-[0.28em] text-accent uppercase">
            About me
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-fg">
            A lion in the lobby. A dad on the couch.
          </h2>
          <div className="mt-6 space-y-4 text-muted">
            <p>
              I'm Ferrous Lion — a content creator and streamer who plays
              for the vibe, not the rank. Most nights I'm on PC: dropping
              into Fortnite, wandering a story, or letting GTA get a little too
              loud. When a Sony exclusive is ready, I fire up the PS5 and take
              my time.
            </p>
            <p>
              Off-stream I'm an Auburn man, a Dolphins fan, and I keep one
              eye on United and Inter Miami. I have a kid who already schools me
              in Battle Royale. If you want Friday crowns, a quiet walk through
              the Forbidden West, or just someone talking shop in chat — the
              door is open.
            </p>
          </div>

          <dl className="mt-10 grid gap-4 sm:grid-cols-3">
            {FACTS.map((fact) => (
              <div
                key={fact.label}
                className="rounded-xl bg-surface px-4 py-4 hairline"
              >
                <dt className="text-xs tracking-[0.18em] text-faint uppercase">
                  {fact.label}
                </dt>
                <dd className="mt-1.5 text-sm font-medium text-fg">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="grid gap-4 sm:grid-cols-[0.7fr_1.3fr] lg:grid-cols-1 lg:grid-rows-[auto_1fr]">
          <div className="flex items-end gap-4 lg:hidden">
            <img
              src="/brand/avatar-sm.png"
              alt="Ferrous Lion"
              className="size-24 rounded-2xl object-cover object-top bg-raised"
            />
            <div>
              <p className="font-display text-lg font-semibold text-fg">
                Ferrous Lion
              </p>
              <p className="text-sm text-muted">@FerrousLion</p>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-2xl">
            <img
              src="/about.jpg"
              alt="Late-night desk with a small iron lion figurine"
              className="aspect-4/3 size-full object-cover"
            />
            <div className="about-fade absolute inset-x-0 bottom-0 flex items-center gap-3 p-4">
              <img
                src="/brand/avatar-sm.png"
                alt=""
                className="hidden size-12 rounded-xl object-cover object-top outline-none lg:block bg-raised"
              />
              <div className="hidden lg:block">
                <p className="font-display text-sm font-semibold text-fg">
                  Ferrous Lion
                </p>
                <p className="text-xs text-muted">Streams · clips · story runs</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
