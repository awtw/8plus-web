import type { Metadata } from "next";
import { HeroMotionLab } from "@/components/home/hero/hero-motion-lab";

export const metadata: Metadata = {
  title: "十種動態方向 — 8plus Hero Lab",
  description: "十個近期互動網站參考，十種可實際操作的 8plus Hero 設計轉譯。",
  robots: { index: false, follow: false },
};

export default async function HeroLabPage({ searchParams }: { searchParams: Promise<{ mode?: string }> }) {
  const { mode } = await searchParams;
  return <HeroMotionLab initialMode={mode} />;
}
