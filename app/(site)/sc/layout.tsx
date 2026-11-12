import type { ReactNode } from "react";
import { Instrument_Serif } from "next/font/google";
import { breadcrumbLd, pageMetadata, SITE } from "@/lib/seo";
import { getMokyuuHubContent, MOKYUU_URL } from "@/lib/content/mokyuu";

// mokyuu.com's display face; scoped to /sc so the rest of the site does not pay for it.
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-mky-serif",
  display: "swap",
});

const TITLE = "墨語 MOKYUU：網頁小遊戲與創作者社群連結";
const DESCRIPTION =
  "墨語 MOKYUU 是 August 的創作身份。免下載就能玩的網頁小遊戲〈辦公室觀察日誌〉與〈職場求生記〉、線上水墨畫布〈墨滴〉，以及 Instagram、LINE、GitHub 社群連結。";
const OG_IMAGE = "/og/sc-mokyuu.png";

export const metadata = {
  ...pageMetadata({ title: TITLE, description: DESCRIPTION, path: "/sc", images: [OG_IMAGE] }),
  keywords: [
    "墨語",
    "MOKYUU",
    "網頁小遊戲",
    "免費小遊戲",
    "辦公室觀察日誌",
    "職場求生記",
    "抓同事摸魚",
    "墨滴 Ink Drop",
    "August Wang",
    "創作者",
  ],
};

function structuredData() {
  const c = getMokyuuHubContent("zh-TW");
  const pageUrl = `${SITE.url}/sc`;
  const brandId = `${MOKYUU_URL}/#brand`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: TITLE,
        description: DESCRIPTION,
        inLanguage: "zh-TW",
        isPartOf: { "@id": `${SITE.url}/#website` },
        primaryImageOfPage: `${SITE.url}${OG_IMAGE}`,
        mainEntity: { "@id": `${SITE.url}/#person` },
        about: { "@id": brandId },
        hasPart: { "@id": `${pageUrl}#games` },
      },
      {
        "@type": "Brand",
        "@id": brandId,
        name: "墨語 MOKYUU",
        alternateName: ["MOKYUU", "墨語"],
        url: MOKYUU_URL,
        logo: `${MOKYUU_URL}/apple-touch-icon.png`,
        slogan: "把想法磨成墨，寫成一個世界。",
      },
      {
        "@type": "ItemList",
        "@id": `${pageUrl}#games`,
        name: "墨語 MOKYUU 網頁小遊戲",
        numberOfItems: c.games.length + 1,
        itemListElement: [
          ...c.games.map((game, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "Game",
              name: game.title,
              alternateName: game.titleEn,
              url: game.url,
              description: game.description,
              genre: game.kind.replace(/ · \d{4}$/, ""),
              inLanguage: "zh-TW",
              isAccessibleForFree: true,
              creator: { "@id": brandId },
            },
          })),
          {
            "@type": "ListItem",
            position: c.games.length + 1,
            item: {
              "@type": "CreativeWork",
              name: "墨滴 Ink Drop",
              url: c.inkDrop.url,
              description: "線上水墨畫布：點一下墨就暈開，拖曳著寫，筆畫越快墨越淡，寫好可以存成圖片。",
              isAccessibleForFree: true,
              creator: { "@id": brandId },
            },
          },
        ],
      },
      breadcrumbLd([
        ["8plus", "/"],
        ["墨語 MOKYUU", "/sc"],
      ]),
    ],
  };
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className={instrumentSerif.variable}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData()) }} />
      {children}
    </div>
  );
}
