import { ShowPage } from "@/components/show/show-page";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata({
  title: "靈時工派工單｜靈機8動",
  description: "靈時工投稿說明。派工單準備中，尚未開放投稿。",
  path: "/show/ask",
});
export default function Page() {
  return <ShowPage ask />;
}
