import type { Metadata } from "next";
import { HeroDirectionPreview } from "@/components/home/hero/hero-direction-preview";

export const metadata: Metadata = {
  title: "Hero 動態方向比較",
  description: "8plus Hero 的兩個藝術方向動態概念稿。",
  robots: { index: false, follow: false },
};

export default function HeroPreviewPage() {
  return <HeroDirectionPreview />;
}
