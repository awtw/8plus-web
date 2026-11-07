import type { ReactNode } from "react";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "服務項目",
  description: "AI 應用開發、技術顧問、RAG 與地端模型導入、UIX 與數據分析。不是固定菜單，而是一起把技術問題做清楚、做成可執行的下一步。",
  path: "/services",
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
