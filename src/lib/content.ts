import { createServerFn } from "@tanstack/react-start";
import { TIKTOK_HANDLE, TWITCH_HANDLE, YOUTUBE_CHANNEL_ID } from "./site";

export type YoutubeVideo = {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  published: string;
  views: number;
  isShort: boolean;
};

export type TwitchVideo = {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  published: string;
  kind: string;
};

export type TikTokVideo = {
  id: string;
  title: string;
  url: string;
  thumbnail: string | null;
  published: string | null;
};

export type LatestContent = {
  youtube: YoutubeVideo[];
  twitch: TwitchVideo[];
  tiktok: TikTokVideo[];
};

const EMPTY: LatestContent = { youtube: [], twitch: [], tiktok: [] };

function decodeXml(value: string) {
  return value
    .replaceAll("\u0026amp;", "\u0026")
    .replaceAll("\u0026lt;", "\u003c")
    .replaceAll("\u0026gt;", "\u003e")
    .replaceAll("\u0026quot;", "\u0022")
    .replaceAll("\u0026#39;", "\u0027")
    .replaceAll("\u0026apos;", "\u0027");
}

function parseYoutubeFeed(xml: string): YoutubeVideo[] {
  const entries = xml.split("<entry>").slice(1);
  const videos: YoutubeVideo[] = [];

  for (const entry of entries) {
    const id = entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1];
    const titleRaw = entry.match(/<media:title>([^<]*)<\/media:title>/)?.[1];
    const published = entry.match(/<published>([^<]+)<\/published>/)?.[1];
    const views = Number(entry.match(/views="(\d+)"/)?.[1] ?? 0);
    const href = entry.match(/<link rel="alternate" href="([^"]+)"/)?.[1];
    if (!id || !titleRaw || !published) continue;

    const title = decodeXml(titleRaw);
    const isShort = href?.includes("/shorts/") ?? false;
    if (/live stream/i.test(title) && views === 0) continue;

    videos.push({
      id,
      title,
      url: href ?? `https://www.youtube.com/watch?v=${id}`,
      thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
      published,
      views,
      isShort,
    });
  }

  return videos;
}

async function loadYoutube(): Promise<YoutubeVideo[]> {
  const res = await fetch(
    `https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE_CHANNEL_ID}`,
    {
      headers: { "User-Agent": "FerrousLionSite/1.0 (+https://x.com/FerrousLion)" },
      signal: AbortSignal.timeout(6000),
    },
  );
  if (!res.ok) return [];
  return parseYoutubeFeed(await res.text());
}

function parseTwitchFeed(xml: string): TwitchVideo[] {
  const items = xml.split("<item>").slice(1);
  const videos: TwitchVideo[] = [];

  for (const item of items) {
    const id = item.match(/<guid[^>]*>([^<]+)<\/guid>/)?.[1];
    const titleRaw = item.match(/<title>([^<]*)<\/title>/)?.[1];
    const link = item.match(/<link>([^<]+)<\/link>/)?.[1];
    const published = item.match(/<pubDate>([^<]+)<\/pubDate>/)?.[1];
    const kind = item.match(/<category>([^<]+)<\/category>/)?.[1] ?? "archive";
    const thumb = item.match(/img src="([^"]+)"/)?.[1]
      ?? item.match(/img src="([^&]+)"/)?.[1];
    if (!id || !titleRaw || !published) continue;

    videos.push({
      id,
      title: decodeXml(titleRaw),
      url: link ?? `https://www.twitch.tv/videos/${id}`,
      thumbnail: thumb ? decodeXml(thumb) : "",
      published: new Date(published).toISOString(),
      kind,
    });
  }

  return videos;
}

async function loadTwitch(): Promise<TwitchVideo[]> {
  try {
    const res = await fetch(
      `https://twitchrss.appspot.com/vod/${TWITCH_HANDLE}`,
      {
        headers: { "User-Agent": "FerrousLionSite/1.0 (+https://x.com/FerrousLion)" },
        signal: AbortSignal.timeout(6000),
      },
    );
    if (!res.ok) return [];
    return parseTwitchFeed(await res.text());
  } catch {
    return [];
  }
}

function uniqueIds(ids: string[]) {
  return [...new Set(ids)];
}

async function oembedTikTok(id: string): Promise<TikTokVideo | null> {
  const url = `https://www.tiktok.com/@${TIKTOK_HANDLE}/video/${id}`;
  try {
    const res = await fetch(
      `https://www.tiktok.com/oembed?url=${encodeURIComponent(url)}`,
      {
        headers: { "User-Agent": "FerrousLionSite/1.0" },
        signal: AbortSignal.timeout(4000),
      },
    );
    if (!res.ok) {
      return { id, title: "Watch on TikTok", url, thumbnail: null, published: null };
    }
    const data = (await res.json()) as {
      title?: string;
      thumbnail_url?: string;
    };
    return {
      id,
      title: data.title?.trim() || "Watch on TikTok",
      url,
      thumbnail: data.thumbnail_url ?? null,
      published: null,
    };
  } catch {
    return { id, title: "Watch on TikTok", url, thumbnail: null, published: null };
  }
}

async function loadTikTok(): Promise<TikTokVideo[]> {
  const headersList = [
    {
      "User-Agent":
        "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
      Accept: "text/html,application/xhtml+xml",
    },
    {
      "User-Agent":
        "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
      Accept: "text/html",
    },
  ];

  for (const headers of headersList) {
    try {
      const res = await fetch(`https://www.tiktok.com/@${TIKTOK_HANDLE}`, {
        headers,
        signal: AbortSignal.timeout(5000),
      });
      if (!res.ok) continue;
      const html = await res.text();
      const fromLinks = [
        ...html.matchAll(
          new RegExp(`/@${TIKTOK_HANDLE}/video/(\\d{15,21})`, "g"),
        ),
      ].map((m) => m[1]);
      const fromJson = [...html.matchAll(/"aweme_id":"(\d{15,21})"/g)].map(
        (m) => m[1],
      );
      const ids = uniqueIds([...fromLinks, ...fromJson]).slice(0, 3);
      if (ids.length === 0) continue;
      const videos = await Promise.all(ids.map((id) => oembedTikTok(id)));
      return videos.filter((v): v is TikTokVideo => v !== null);
    } catch {
      // try next strategy
    }
  }

  return [];
}

export const fetchLatestContent = createServerFn({ method: "GET" }).handler(
  async (): Promise<LatestContent> => {
    try {
      const [youtube, twitch, tiktok] = await Promise.all([
        loadYoutube(),
        loadTwitch(),
        loadTikTok(),
      ]);
      return {
        youtube: youtube.slice(0, 6),
        twitch: twitch.slice(0, 3),
        tiktok: tiktok.slice(0, 3),
      };
    } catch {
      return EMPTY;
    }
  },
);
