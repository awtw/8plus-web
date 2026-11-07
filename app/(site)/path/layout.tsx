import type { ReactNode } from "react";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "職涯歷程",
  description: "August Wang 2012–2026 的職涯歷程：從跨領域學術背景到企業 AI 架構，每個階段累積可交付的系統能力與協作經驗。",
  path: "/path",
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
