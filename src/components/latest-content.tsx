import { useEffect, useState } from "react";
import { format } from "date-fns";
import { ExternalLink, Play } from "lucide-react";
import type {
  LatestContent as LatestContentData,
  TwitchVideo,
  YoutubeVideo,
} from "@/lib/content";
import { SOCIALS, TIKTOK_HANDLE, TWITCH_HANDLE } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { IconTikTok, IconTwitch, IconYouTube } from "@/components/brand-icons";
import { cn } from "@/lib/utils";

function viewsLabel(views: number) {
  if (views >= 1_000_000) return `${(views / 1_000_000).toFixed(1)}M views`;
  if (views >= 1_000) return `${(views / 1_000).toFixed(1)}K views`;
  if (views === 1) return "1 view";
  return `${views} views`;
}

function VideoCard({
  video,
  meta,
  badge,
}: {
  video: Pick<YoutubeVideo, "id" | "title" | "url" | "thumbnail" | "published"> & {
    isShort?: boolean;
  };
  meta: string;
  badge?: string;
}) {
  return (
    <a
      href={video.url}
      target="_blank"
      rel="noreferrer"
      className="hairline hairline-hover group flex flex-col overflow-hidden rounded-2xl bg-surface"
    >
      <div className="relative aspect-video overflow-hidden bg-raised">
        {video.thumbnail ? (
          <img
            src={video.thumbnail}
            alt=""
            className={cn(
              "media-zoom size-full object-cover outline-none",
              video.isShort && "thumb-short",
            )}
          />
        ) : null}
        <span className="absolute inset-0 grid place-items-center bg-bg/0 transition-colors duration-150 group-hover:bg-bg/25">
          <span className="grid size-12 place-items-center rounded-full bg-fg text-bg opacity-0 shadow-sm transition-opacity duration-150 group-hover:opacity-100">
            <Play className="ml-0.5 size-5 fill-current" />
          </span>
        </span>
        {badge ? (
          <span className="game-tag absolute top-3 left-3 rounded-md px-2 py-1 text-xs tracking-[0.16em] uppercase">
            {badge}
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-2 text-sm font-medium text-fg">
          {video.title}
        </h3>
        <p className="mt-2 text-xs text-faint">{meta}</p>
      </div>
    </a>
  );
}

function twitchBadge(kind: string) {
  if (kind === "highlight") return "Highlight";
  if (kind === "upload") return "Upload";
  return "VOD";
}

function TwitchCard({ video }: { video: TwitchVideo }) {
  const date = format(new Date(video.published), "MMM d, yyyy");
  return (
    <VideoCard
      video={video}
      badge={twitchBadge(video.kind)}
      meta={date}
    />
  );
}

function TikTokEmbed({ id, title }: { id: string; title: string }) {
  return (
    <div className="hairline overflow-hidden rounded-2xl bg-surface">
      <iframe
        title={title}
        src={`https://www.tiktok.com/player/v1/${id}?music_info=0&description=1`}
        className="aspect-portrait w-full border-0"
        allow="encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      />
    </div>
  );
}

function TikTokFallback() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (document.querySelector('script[data-tiktok-embed="1"]')) return;
    const script = document.createElement("script");
    script.src = "https://www.tiktok.com/embed.js";
    script.async = true;
    script.dataset.tiktokEmbed = "1";
    document.body.appendChild(script);
  }, []);

  if (!mounted) {
    return <TikTokStaticCard />;
  }

  return (
    <div className="hairline overflow-hidden rounded-2xl bg-surface">
      <blockquote
        className="tiktok-embed"
        cite={SOCIALS.tiktok}
        data-unique-id={TIKTOK_HANDLE}
        data-embed-type="creator"
      >
        <section>
          <TikTokStaticCard />
        </section>
      </blockquote>
    </div>
  );
}

function TikTokStaticCard() {
  return (
    <a
      href={SOCIALS.tiktok}
      target="_blank"
      rel="noreferrer"
      className="flex flex-col items-start gap-3 p-6 sm:flex-row sm:items-center sm:justify-between"
    >
      <span>
        <span className="block font-display text-lg font-semibold text-fg">
          @{TIKTOK_HANDLE}
        </span>
        <span className="mt-1 block text-sm text-muted">
          Latest clips load here from TikTok. Open the profile if the embed is
          quiet.
        </span>
      </span>
      <span className="inline-flex h-11 items-center rounded-md bg-fg px-4 text-sm font-medium text-bg">
        Open TikTok
      </span>
    </a>
  );
}

export function LatestContent({ data }: { data: LatestContentData }) {
  const youtube = data.youtube.slice(0, 6);
  const twitch = data.twitch.slice(0, 3);
  const tiktok = data.tiktok.slice(0, 3);

  return (
    <section id="content" className="scroll-mt-24 border-t border-border">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-medium tracking-[0.28em] text-accent uppercase">
              Latest content
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-fg">
              Fresh off the timeline
            </h2>
          </div>
          <Button asChild variant="outline" size="sm">
            <a href={SOCIALS.youtube} target="_blank" rel="noreferrer">
              <IconYouTube className="size-3.5" />
              YouTube
              <ExternalLink className="size-3.5" />
            </a>
          </Button>
        </div>

        {youtube.length > 0 ? (
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {youtube.map((video) => (
              <li key={video.id}>
                <VideoCard
                  video={video}
                  badge={video.isShort ? "Short" : undefined}
                  meta={`${viewsLabel(video.views)} · ${format(new Date(video.published), "MMM d, yyyy")}`}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p className="hairline mt-10 rounded-2xl bg-surface px-5 py-10 text-center text-sm text-muted">
            Videos will land here as soon as the feed answers. Meanwhile, the
            full archive lives on YouTube.
          </p>
        )}

        <div className="mt-16 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-medium tracking-[0.28em] text-accent uppercase">
              Twitch
            </p>
            <h3 className="mt-2 font-display text-xl font-semibold text-fg">
              Recent VODs
            </h3>
          </div>
          <Button asChild variant="outline" size="sm">
            <a href={`${SOCIALS.twitch}/videos`} target="_blank" rel="noreferrer">
              <IconTwitch className="size-3.5" />
              {TWITCH_HANDLE}
              <ExternalLink className="size-3.5" />
            </a>
          </Button>
        </div>

        {twitch.length > 0 ? (
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {twitch.map((video) => (
              <li key={video.id}>
                <TwitchCard video={video} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="hairline mt-8 rounded-2xl bg-surface px-5 py-10 text-center text-sm text-muted">
            VODs show up here after a stream. Watch live on Twitch in the
            meantime.
          </p>
        )}

        <div className="mt-16 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-medium tracking-[0.28em] text-accent uppercase">
              TikTok
            </p>
            <h3 className="mt-2 font-display text-xl font-semibold text-fg">
              The last few clips
            </h3>
          </div>
          <Button asChild variant="outline" size="sm">
            <a href={SOCIALS.tiktok} target="_blank" rel="noreferrer">
              <IconTikTok className="size-3.5" />
              @{TIKTOK_HANDLE}
              <ExternalLink className="size-3.5" />
            </a>
          </Button>
        </div>

        {tiktok.length > 0 ? (
          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            {tiktok.map((clip) => (
              <li key={clip.id}>
                <TikTokEmbed id={clip.id} title={clip.title} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-8">
            <TikTokFallback />
          </div>
        )}
      </div>
    </section>
  );
}
