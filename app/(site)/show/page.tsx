import { ShowPage } from "@/components/show/show-page";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata({
  title: "靈機8動 LING8｜Podcast 與 YouTube",
  description:
    "人類沒有文件，只好拆開來看看。靈八用工程腦聊科技、工作與日常。Podcast、YouTube 與節目筆記。",
  path: "/show",
  images: ["/images/show/ling8-cover.webp"],
});
export default function Page() {
  return <ShowPage />;
}
