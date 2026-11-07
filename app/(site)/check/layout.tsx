import type { ReactNode } from "react";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "3 分鐘需求診斷",
  description: "回答四個簡單問題，得到建議的合作方式與第一步，並可帶著摘要直接預約 AI 應用或 UIX 諮詢。",
  path: "/check",
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
