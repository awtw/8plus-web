// Content for /sc — August's share hub with two tabs:
//   "august"  — the original personal link-in-bio (IG @august.yan.terra, personal LINE, GitHub, 8plus)
//   "mokyuu"  — 墨語 MOKYUU, August's creative persona (mokyuu.com, web games, IG @mokyuu.ig)
// 8plus is the professional identity.
// Visual language mirrors mokyuu.com: Ink #08080A × Klein Blue #002FA7 × Seal #FF401F.
import type { Locale } from "@/lib/i18n";
import { getLinePersonalAddFriendUrl } from "@/lib/line";

export const MOKYUU_URL = "https://mokyuu.com";
export const AUGUST_IG_URL = "https://www.instagram.com/august.yan.terra/";
export const MOKYUU_IG_URL = "https://www.instagram.com/mokyuu.ig/";

export type ScTab = "august" | "mokyuu";
export type ScQrKind = "ig-august" | "ig-mokyuu" | "line-personal";

/** Outbound links carry UTM so mokyuu.com's own GA4 can attribute traffic from this hub. */
export function mokyuuHref(path = "/", content?: string) {
  const url = new URL(path, MOKYUU_URL);
  url.searchParams.set("utm_source", "8plus");
  url.searchParams.set("utm_medium", "referral");
  url.searchParams.set("utm_campaign", "sc_hub");
  if (content) url.searchParams.set("utm_content", content);
  return url.toString();
}

export type MokyuuGame = {
  id: string;
  no: string;
  title: string;
  titleEn: string;
  kind: string;
  hook: string;
  description: string;
  facts: string[];
  /** Canonical URL (no UTM) — used in structured data. */
  url: string;
  href: string;
  art: "watch" | "survival";
};

export type ScHubLink =
  | { kind: "external"; id: string; name: string; description: string; href: string }
  /** Opens `href` directly on phones; shows the QR dialog on desktop (see usePrefersQr). */
  | { kind: "qr"; id: string; name: string; description: string; qr: ScQrKind; href: string }
  | { kind: "tab"; id: string; name: string; description: string; tab: ScTab };

export type AugustHubContent = {
  name: string;
  lead: string;
  links: ScHubLink[];
};

/** Original /sc personal profile (before the MOKYUU tab existed). */
export function getAugustHubContent(locale: Locale): AugustHubContent {
  const zh = locale === "zh-TW";
  return {
    name: "August",
    lead: zh ? "生活裡的片段、正在做的事。" : "Life snippets and work in progress.",
    links: [
      { kind: "qr", id: "instagram", name: "Instagram", description: "@august.yan.terra", qr: "ig-august", href: AUGUST_IG_URL },
      {
        kind: "qr",
        id: "line",
        name: "LINE",
        description: zh ? "私人帳號 · 輕鬆聊聊" : "Personal · say hi",
        qr: "line-personal",
        href: getLinePersonalAddFriendUrl(),
      },
      {
        kind: "external",
        id: "github",
        name: "GitHub",
        description: zh ? "程式與 side projects" : "Code & side projects",
        href: "https://github.com/awtw",
      },
      {
        kind: "external",
        id: "main",
        name: zh ? "官方網站" : "Official site",
        description: zh ? "8plus.app 完整介紹" : "Full story on 8plus.app",
        href: "/",
      },
      {
        kind: "tab",
        id: "to-mokyuu",
        name: zh ? "墨語 MOKYUU" : "MOKYUU 墨語",
        description: zh ? "我的創作身份 · 網頁小遊戲" : "My creative persona · web games",
        tab: "mokyuu",
      },
    ],
  };
}

export type MokyuuHubContent = {
  eyebrow: string;
  name: string;
  tagline: [string, string];
  taglineEn: string;
  lead: string;
  cta: string;
  ctaNote: string;
  marquee: string[];
  playIndex: string;
  playTitle: string;
  playLead: string;
  playAction: string;
  games: MokyuuGame[];
  inkDrop: { title: string; description: string; href: string; url: string };
  socialIndex: string;
  socialTitle: string;
  social: ScHubLink[];
  footerLine: string;
  footerProfessional: string;
  footerNote: string;
};

const WATCH_URL = `${MOKYUU_URL}/lab/game/coworker/`;
const SURVIVAL_URL = `${MOKYUU_URL}/lab/game/coworker/v2/`;
const INK_DROP_URL = `${MOKYUU_URL}/play`;

export function getMokyuuHubContent(locale: Locale): MokyuuHubContent {
  const zh = locale === "zh-TW";
  return {
    eyebrow: "(Ø1) Digital Persona — Taipei",
    name: "墨語 MOKYUU",
    tagline: zh ? ["把想法磨成墨，", "寫成一個世界。"] : ["Ideas, ground into ink —", "written into a world."],
    taglineEn: zh ? "Ideas, ground into ink — written into a world." : "把想法磨成墨，寫成一個世界。",
    lead: zh
      ? "August 的創作身份：觀點、故事，和可以直接玩的互動作品。"
      : "August's creative identity: points of view, stories, and interactive work you can play right away.",
    cta: zh ? "走進墨語的世界" : "Enter the world of MOKYUU",
    ctaNote: "mokyuu.com",
    marquee: zh
      ? ["墨語 MOKYUU", "把想法磨成墨", "Ink × Klein Blue", "寫成一個世界", "Play is the manifesto"]
      : ["MOKYUU 墨語", "Ideas into ink", "Ink × Klein Blue", "Written into a world", "Play is the manifesto"],
    playIndex: "(Ø2) Play — " + (zh ? "互動" : "Games"),
    playTitle: zh ? "兩款點開就能玩的網頁小遊戲" : "Two web games, playable in one tap",
    playLead: zh
      ? "免下載、免註冊，手機和電腦打開就能玩。把職場日常的荒謬，做成遊戲。"
      : "No download, no sign-up — open on phone or desktop and play. Everyday office absurdity, turned into games.",
    playAction: zh ? "開始玩" : "Play now",
    games: [
      {
        id: "office-watch",
        no: "01",
        title: "辦公室觀察日誌",
        titleEn: "Office Watch",
        kind: zh ? "觀察遊戲 · 2026" : "Observation game · 2026",
        hook: zh ? "抓同事摸魚" : "Catch coworkers slacking",
        description: zh
          ? "你是臥底公務員：盯著同事記錄他在摸什麼魚，靠聲音找出打嗝的暗樁、打暈奧客 PM、大聲拒絕加班。"
          : "You're an undercover civil servant: log who's slacking and how, find the hiccuping mole by sound, knock out the nightmare PM, and say no to overtime.",
        facts: zh
          ? ["120 座位 · 28 種摸魚", "全服今日挑戰", "連線比分數"]
          : ["120 desks · 28 slack moves", "Daily server-wide challenge", "Multiplayer rooms"],
        url: WATCH_URL,
        href: mokyuuHref("/lab/game/coworker/", "office-watch"),
        art: "watch",
      },
      {
        id: "office-survival",
        no: "02",
        title: "職場求生記",
        titleEn: "Office Survival",
        kind: zh ? "選擇式劇情 · 2026" : "Choice-driven story · 2026",
        hook: zh ? "你會是哪一種結局？" : "Which ending will you get?",
        description: zh
          ? "試用期被延長、明星同事被穿小鞋、關係戶攬功拿優——每個選擇都通往不同的職場結局。"
          : "Extended probation, a star colleague sidelined, the boss's favourite taking credit — every choice leads to a different career ending.",
        facts: zh
          ? ["14 種結局", "每局劇情順序不同", "生成結局卡分享"]
          : ["14 endings", "Story order reshuffles", "Shareable ending card"],
        url: SURVIVAL_URL,
        href: mokyuuHref("/lab/game/coworker/v2/", "office-survival"),
        art: "survival",
      },
    ],
    inkDrop: {
      title: zh ? "還有：墨滴 Ink Drop" : "Also: Ink Drop 墨滴",
      description: zh ? "線上水墨畫布，點一下墨就暈開" : "An online ink canvas — tap and the ink blooms",
      href: mokyuuHref("/play", "ink-drop"),
      url: INK_DROP_URL,
    },
    socialIndex: "(Ø3) Follow — " + (zh ? "追蹤墨語" : "Follow MOKYUU"),
    socialTitle: zh ? "墨語的社群" : "MOKYUU on social",
    social: [
      { kind: "qr", id: "instagram-mokyuu", name: "Instagram", description: "@mokyuu.ig", qr: "ig-mokyuu", href: MOKYUU_IG_URL },
      {
        kind: "external",
        id: "journal",
        name: zh ? "手記 Journal" : "Journal",
        description: zh ? "故事、幕後，和還沒想完的事" : "Stories, behind the scenes, unfinished thoughts",
        href: mokyuuHref("/journal", "journal"),
      },
      {
        kind: "tab",
        id: "to-august",
        name: "August",
        description: zh ? "個人社群 · LINE · GitHub" : "Personal social · LINE · GitHub",
        tab: "august",
      },
      {
        kind: "external",
        id: "8plus",
        name: zh ? "8plus 專業身份" : "8plus — professional",
        description: zh ? "AI 應用架構與顧問服務" : "AI architecture & consulting",
        href: "/",
      },
    ],
    footerLine: "MOKYUU · DIGITAL PERSONA · TAIPEI",
    footerProfessional: zh ? "專業身份是 8plus：AI 應用架構與顧問。" : "The professional identity is 8plus: AI architecture & consulting.",
    footerNote: "© 2026 MOKYUU 墨語",
  };
}
