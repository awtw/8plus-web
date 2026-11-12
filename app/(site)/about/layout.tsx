import type { ReactNode } from "react";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "關於 August Wang（AI 應用架構師）",
  description: "我是 August Wang，8plus（八普拉斯）AI 顧問工作室主理人，以 AI 架構師的角度完善 AI 應用：從資料處理、檢索、評測到服務整合，確保資料正確與服務穩定。",
  path: "/about",
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
