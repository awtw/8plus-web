import type { ReactNode } from "react";
import { breadcrumbLd, pageMetadata, SITE } from "@/lib/seo";

const TITLE = "聯絡 8plus AI 顧問：預約諮詢、Email、LINE 與 GitHub";
const DESCRIPTION =
  "8plus AI 顧問工作室的聯絡入口：預約 30 分鐘線上諮詢、複製 Email、加入 LINE 官方帳號 @482ykgdg、查看 GitHub 開源專案與完整專業經歷。";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: "/sb" });

function structuredData() {
  const pageUrl = `${SITE.url}/sb`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["ProfilePage", "ContactPage"],
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: TITLE,
        description: DESCRIPTION,
        inLanguage: "zh-TW",
        isPartOf: { "@id": `${SITE.url}/#website` },
        primaryImageOfPage: `${SITE.url}${SITE.ogImage}`,
        mainEntity: { "@id": `${SITE.url}/#studio` },
        about: { "@id": `${SITE.url}/#person` },
        potentialAction: {
          "@type": "ReserveAction",
          name: "預約 30 分鐘線上諮詢",
          target: `${SITE.url}/booking`,
        },
      },
      breadcrumbLd([
        ["8plus", "/"],
        ["聯絡 8plus AI 顧問", "/sb"],
      ]),
    ],
  };
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData()) }} />
      {children}
    </>
  );
}
