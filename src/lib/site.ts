export const APP_NAME = "FerrousLion";

export const SOCIALS = {
  pickax: "https://pickax.com/ferrouslion",
  rumble: "https://rumble.com/user/ferrouslion",
  x: "https://x.com/FerrousLion",
  youtube: "https://www.youtube.com/@ferrouslion",
  twitch: "https://www.twitch.tv/ferrouslion",
  tiktok: "https://www.tiktok.com/@ferrouslion",
} as const;

export const YOUTUBE_CHANNEL_ID = "UCpGXjtF4LLnHf9ES3fNwSQQ";
export const TIKTOK_HANDLE = "ferrouslion";
export const TWITCH_HANDLE = "ferrouslion";
export const RUMBLE_HANDLE = "ferrouslion";
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
    blurb: "Wednesday night Duos with FerrousCat; Friday Solo streams.",
    tag: "PC/Xbox/PS5",
  },
  {
    slug: "gta",
    title: "Grand Theft Auto",
    image: "/games/gta.jpg",
    blurb: "Late-night Vice City chaos coming soon.",
    tag: "PS5",
  },
  {
    slug: "madden",
    title: "Madden",
    image: "/games/madden.jpg",
    blurb: "Can the Dolphins win the Super Bowl with FerrousLion at the helm?",
    tag: "Xbox",
  },
  {
    slug: "starfield",
    title: "Starfield",
    image: "/games/starfield.jpg",
    blurb: "Exploring strange new worlds with outpost building and custom mods.",
    tag: "PC",
  },
  {
    slug: "horizon",
    title: "Horizon Dawn and Forbidden West",
    image: "/games/horizon.jpg",
    blurb: "The perfect go-to game when you want to relax and chill.",
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
