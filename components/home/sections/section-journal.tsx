import Link from "next/link";
import { posts } from ".velite";
import type { HomeLocale } from "@/lib/content/home-sections";
export function SectionJournal({ locale }: { locale: HomeLocale }) {
  const en = locale === "en";
  const latest = posts
    .filter((post) => post.locale === locale)
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
    .slice(0, 2);
  return (
    <section id="home-section-journal" className="home-section bg-dark">
      <div className="home-section-inner section-shell">
        <p className="scroll-eyebrow">05 / NOTES & CONVERSATIONS</p>
        <h2 className="home-section-title">
          {en ? "Thinking beyond the deliverable." : "交付之外，也分享思考。"}
        </h2>
        <div className="home-journal-grid">
          <article className="home-journal-card">
            <span className="scroll-eyebrow">JOURNAL</span>
            <h3>{en ? "Notes from the work" : "工程現場的筆記"}</h3>
            {latest.map((post) => (
              <p key={post.slug}>
                <Link href={post.url}>{post.title} ↗</Link>
              </p>
            ))}
            <Link href="/blog">{en ? "All articles" : "閱讀所有文章"} →</Link>
          </article>
          <article className="home-journal-card home-journal-show">
            <span className="scroll-eyebrow">LING8 / S0</span>
            <h3>{en ? "Humans come without docs." : "人類沒有文件。"}</h3>
            <p>
              {en
                ? "LING8 explores technology, work and everyday life with an engineering mind. Explore the podcast, videos and episode notes."
                : "靈八用工程腦聊科技、工作與日常。一起看看《靈機8動》的 Podcast、影片與節目筆記。"}
            </p>
            <Link href="/show">{en ? "Meet the show" : "認識靈機8動"} →</Link>
          </article>
        </div>
      </div>
    </section>
  );
}
