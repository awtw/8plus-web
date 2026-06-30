import type { Locale } from "@/lib/i18n";

export type ShareStat = { value: string; label: string };

export type ShareContent = {
  mainSite: string;
  switchLang: string;
  book: string;
  role: string;
  available: string;
  lead: string;
  stats: ShareStat[];
  bookChat: string;
  copy: string;
  copied: string;
  footer: string;
  social: {
    github: { description: string; badge: string };
    line: { description: string };
    instagram: { description: string };
  };
  qr: {
    line: {
      title: string;
      lead: string;
      idLabel: string;
      open: string;
    };
    instagram: {
      title: string;
      lead: string;
      handleLabel: string;
      open: string;
    };
  };
};

export const shareContent: Record<Locale, ShareContent> = {
  "zh-TW": {
    mainSite: "主站",
    switchLang: "English",
    book: "預約",
    role: "工程顧問 · 架構設計 · 產品落地",
    available: "可洽詢",
    lead: "把複雜需求整理成可執行的技術方案，從架構、AI 導入到使用者體驗與交付流程一次對齊。",
    stats: [
      { value: "全端工程", label: "雲端與平台" },
      { value: "企業架構", label: "分散式系統" },
      { value: "AI 導入", label: "落地部署" },
    ],
    bookChat: "預約諮詢",
    copy: "複製",
    copied: "已複製",
    footer: "8plus · 聯絡入口",
    social: {
      github: {
        description: "公開專案、工具與實驗性作品",
        badge: "100+ repos",
      },
      line: {
        description: "加入 8plus 官方帳號",
      },
      instagram: {
        description: "作品更新與工作日常",
      },
    },
    qr: {
      line: {
        title: "加入 LINE 官方帳號",
        lead: "掃描 QR Code 或開啟 8plus Chatbot",
        idLabel: "官方帳號 @482ykgdg",
        open: "加入好友",
      },
      instagram: {
        title: "追蹤 Instagram",
        lead: "掃描 QR Code 追蹤最新動態",
        handleLabel: "IG：august.yan.terra",
        open: "開啟 Instagram",
      },
    },
  },
  en: {
    mainSite: "Main Site",
    switchLang: "中文",
    book: "Book",
    role: "Engineering consultant · architecture · delivery",
    available: "Available",
    lead: "I turn complex requirements into executable technical plans — aligning architecture, AI integration, user experience, and delivery.",
    stats: [
      { value: "Full-stack", label: "Cloud & platform" },
      { value: "Enterprise", label: "Distributed systems" },
      { value: "AI delivery", label: "Production rollout" },
    ],
    bookChat: "Book consultation",
    copy: "Copy",
    copied: "Copied",
    footer: "8plus · Contact hub",
    social: {
      github: {
        description: "Open source, tools, and experiments",
        badge: "100+ repos",
      },
      line: {
        description: "Add the 8plus official account",
      },
      instagram: {
        description: "Work updates and day-to-day notes",
      },
    },
    qr: {
      line: {
        title: "Add on LINE",
        lead: "Scan the QR code or open the 8plus chatbot",
        idLabel: "Official account @482ykgdg",
        open: "Add friend",
      },
      instagram: {
        title: "Follow on Instagram",
        lead: "Scan the QR code to follow",
        handleLabel: "IG: august.yan.terra",
        open: "Open Instagram",
      },
    },
  },
};

export function getShareContent(locale: Locale): ShareContent {
  return shareContent[locale] ?? shareContent.en;
}
