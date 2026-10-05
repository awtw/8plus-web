import type { Metadata } from "next";
import { HeroDirectionPreview } from "@/components/home/hero/hero-direction-preview";

export const metadata: Metadata = {
  title: "訊號成形 — Hero 概念預覽",
  description: "8plus 訊號成形：從分散的想法，到有秩序的系統。",
  robots: { index: false, follow: false },
};

export default function HeroPreviewPage() {
  return <HeroDirectionPreview />;
}
