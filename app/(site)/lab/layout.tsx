import type { ReactNode } from "react";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Lab 作品集",
  description: "精選實作紀錄：AI 平台、企業與金融系統、醫學教育、高併發後端、品牌官網、數據分析到網頁遊戲。",
  path: "/lab",
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
