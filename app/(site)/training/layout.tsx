import type { ReactNode } from "react";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "企業 AI 內訓與工作坊",
  description: "AI 輔助開發、RAG、UIX 與數據分析的企業內訓。依團隊現況設計內容、練習與帶得走的資料，把能力留在團隊裡。",
  path: "/training",
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
