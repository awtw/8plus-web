import type { Locale } from "@/lib/i18n";

export function getBookingContent(locale: Locale) {
  const en = locale === "en";
  return {
    eyebrow: "CONTACT / BOOKING",
    title: en ? "Book a 30-minute call" : "預約 30 分鐘諮詢",
    lead: en
      ? "Talk through your needs, from architecture and development to design. Pick a slot that suits you; no preparation required."
      : "聊聊你的需求，從架構、開發到設計。選一個方便的時段即可，不需事先準備。",
    status: en ? "Available for consulting" : "目前可接受諮詢",
    loading: en ? "Loading calendar…" : "載入行事曆中…",
    coversLabel: en ? "The call covers" : "諮詢包含",
    covers: en
      ? [
          "Problem framing and requirement clarification",
          "Architecture review and stack selection",
          "Code review, performance and delivery flow",
          "Product technical strategy and advisory support",
        ]
      : [
          "需求釐清、問題定義與解法拆解",
          "架構健檢與技術選型",
          "Code Review、效能優化與交付流程",
          "產品技術策略與顧問陪跑",
        ],
    specs: en
      ? ["30 minutes", "Cal Video", "Asia/Taipei (GMT+8)"]
      : ["30 分鐘", "Cal Video 視訊", "台北 GMT+8"],
    altLabel: en ? "Want to see my work first?" : "想先看看我做過什麼？",
    altLead: en
      ? "Code and side projects are on GitHub."
      : "程式碼與個人專案都放在 GitHub。",
    githubAction: en ? "View on GitHub" : "前往 GitHub",
  };
}
