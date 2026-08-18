import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LionMark } from "@/components/lion-mark";
import { SOCIALS } from "@/lib/site";

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] items-end overflow-hidden"
    >
      <img
        src="/hero.jpg"
        alt=""
        className="absolute inset-0 size-full object-cover object-left outline-none sm:object-center"
      />
      <div className="hero-shade absolute inset-0" aria-hidden />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-20 pt-32 sm:px-8 sm:pb-24">
        <p className="reveal text-xs font-medium tracking-[0.28em] text-accent uppercase">
          Content creator / streamer
        </p>
        <div className="reveal reveal-delay-1 mt-5 flex items-center gap-4">
          <LionMark className="hidden size-14 sm:block md:size-16" />
          <h1 className="font-display text-3xl font-semibold tracking-[0.06em] text-fg uppercase">
            Ferrous Lion
          </h1>
        </div>
        <p className="reveal reveal-delay-2 mt-5 max-w-xl text-lg text-muted sm:text-xl">
          Chill Fortnite nights, story worlds on PC, and PS5 exclusives when they
          earn the wait. Pull up.
        </p>
        <div className="reveal reveal-delay-3 mt-8 flex flex-wrap items-center gap-3">
          <Button asChild size="lg">
            <a href={SOCIALS.twitch} target="_blank" rel="noreferrer">
              Watch on Twitch
            </a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href={SOCIALS.youtube} target="_blank" rel="noreferrer">
              Latest on YouTube
            </a>
          </Button>
        </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 items-center gap-2 text-xs tracking-[0.22em] text-muted uppercase transition-colors duration-150 hover:text-fg sm:flex"
      >
        Scroll
        <ArrowDown className="size-3.5" />
      </a>
    </section>
  );
}
