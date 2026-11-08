import type { ReactNode } from "react";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "工程師職涯諮詢",
  description: "一對一聊技術路線、職涯選擇、作品集與成長計畫。分享實際經驗與觀點，決定權在你。",
  path: "/career",
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
