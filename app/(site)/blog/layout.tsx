import type { ReactNode } from "react";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "技術博客",
  description: "AI 與 Agent、Next.js 與前端架構、UI/UX 設計的實作紀錄與選型判斷，由 August Wang 撰寫。",
  path: "/blog",
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
