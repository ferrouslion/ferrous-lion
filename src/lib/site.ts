export const APP_NAME = "FerrousLion";

export const SOCIALS = {
  x: "https://x.com/FerrousLion",
  youtube: "https://www.youtube.com/@ferrouslion",
  twitch: "https://www.twitch.tv/ferrouslion",
  tiktok: "https://www.tiktok.com/@ferrouslion",
  instagram: "https://www.instagram.com/ferrouslionx/",
} as const;

export const YOUTUBE_CHANNEL_ID = "UCpGXjtF4LLnHf9ES3fNwSQQ";
export const TIKTOK_HANDLE = "ferrouslion";
export const EPIC_CREATOR_CODE = "ferrouslion";

export const NAV = [
  { href: "#about", label: "About" },
  { href: "#play", label: "What I Play" },
  { href: "#content", label: "Latest" },
  { href: "#connect", label: "Connect" },
] as const;

export const GAMES = [
  {
    slug: "fortnite",
    title: "Fortnite",
    image: "/games/fortnite.jpg",
    blurb: "Friday crowns, Blitz Royale, and long chill pubs. The home game.",
    tag: "Main rotation",
  },
  {
    slug: "gta",
    title: "Grand Theft Auto",
    image: "/games/gta.jpg",
    blurb: "Late-night city chaos when the lobby needs a little heat.",
    tag: "Nights",
  },
  {
    slug: "madden",
    title: "Madden",
    image: "/games/madden.jpg",
    blurb: "Football season lives here — Dolphins colors, patient reads.",
    tag: "Season",
  },
  {
    slug: "starfield",
    title: "Starfield",
    image: "/games/starfield.jpg",
    blurb: "PC story missions, hidden ships, and taking the long way around.",
    tag: "PC",
  },
  {
    slug: "horizon",
    title: "Horizon Forbidden West",
    image: "/games/horizon.jpg",
    blurb: "PS5 exclusives get the slow, pretty treatment they deserve.",
    tag: "PS5",
  },
  {
    slug: "chatting",
    title: "Just Chatting",
    image: "/brand/avatar-sm.png",
    blurb: "Sports takes, lobby talk, and hanging in chat when the games take a back seat.",
    tag: "Talk",
    imageFit: "top",
  },
] as const;
