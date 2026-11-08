import type { ReactNode } from "react";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "預約 AI 顧問諮詢（30 分鐘）",
  description: "預約 30 分鐘線上諮詢，聊 AI 應用、UIX 或數據分析需求。選一個方便的時段即可，不需事先準備。",
  path: "/booking",
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
