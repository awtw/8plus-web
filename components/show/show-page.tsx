"use client";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/components/language-provider";
import { getPublicEpisodes } from "@/lib/episodes";
import "@/styles/pages/show.css";

const topics = [
  [
    "BUG",
    "拆開那些理所當然",
    "Debug the everyday",
    "需求通靈、職場溝通，以及「這應該很簡單吧？」",
    "Unspoken requirements, workplace communication, and “that should be easy.”",
  ],
  [
    "TECH",
    "工具變了，人呢？",
    "New tools. Same humans?",
    "AI、Vibe Coding、產品文化；聊改變，也聊代價。",
    "AI, vibe coding and product culture: the change and its tradeoffs.",
  ],
  [
    "LIFE",
    "人生沒有規格書",
    "Life has no spec",
    "朋友、選擇與轉折。不急著給人生一個標準答案。",
    "Friendship, choices and turning points without a one-size-fits-all answer.",
  ],
  [
    "ASK",
    "靈時工",
    "Odd jobs for LING8",
    "拆解觀眾帶來的難題。投稿功能準備中。",
    "Unpacking your questions. Submissions are being prepared.",
  ],
];
export function ShowPage({ ask = false }: { ask?: boolean }) {
  const { locale } = useLanguage();
  const en = locale === "en";
  const allEpisodes = getPublicEpisodes();
  const episodes = allEpisodes.filter((episode) => episode.locale === locale);
  const latest = episodes[0];
  if (ask)
    return (
      <div className="show-world" data-header-color="#171814">
        <section className="show-shell show-ask">
          <Link href="/show" className="show-link">
            ← {en ? "Back to the show" : "回到靈機8動"}
          </Link>
          <p className="show-kicker">LING8 / ASK</p>
          <h1>
            {en ? "A question worth taking apart." : "把難題交給靈時工。"}
          </h1>
          <p className="show-lead">
            {en
              ? "The submission desk is being prepared."
              : "派工單準備中，尚未開放投稿。"}
          </p>
          <div className="show-note">
            <h2>{en ? "What could you ask?" : "未來可以派什麼工？"}</h2>
            <p>
              {en
                ? "A puzzling request, a communication breakdown, or a daily habit that makes no sense. Start with what happened and what you want to understand."
                : "一句需要通靈的需求、一次說不清的溝通，或日常裡讓你想不通的事。先說發生什麼，再說你想理解什麼。"}
            </p>
            <p>
              {en
                ? "The form will explain how questions are used and offer an anonymous publication choice. Please keep company secrets and identifying details out of your story."
                : "表單上線時會說明投稿用途，並提供匿名公開的選擇。請先移除公司機密，以及可識別他人的資料。"}
            </p>
          </div>
          <p>
            {en
              ? "No submissions are collected on this page yet. The opening date will be announced here."
              : "這個頁面目前不收集任何投稿；開放時間將在此公告。"}
          </p>
        </section>
      </div>
    );
  return (
    <div className="show-world" data-header-color="#171814">
      <section className="show-shell show-hero">
        <div>
          <p className="show-kicker">LING8 / PODCAST + YOUTUBE</p>
          <span className="show-status">
            {allEpisodes.length
              ? en
                ? "S0 · ON AIR"
                : "S0 · 已開播"
              : en
                ? "S0 · IN PREPARATION"
                : "S0 · 準備中"}
          </span>
          <h1>
            {en ? (
              <>
                Humans come
                <br />
                without docs.
              </>
            ) : (
              <>
                人類沒有文件，
                <br />
                只好拆開來看看。
              </>
            )}
          </h1>
          <p className="show-lead">
            {en
              ? "LING8 — an engineering mind exploring technology, work and the absurdity of everyday life. No final answers. Just versions."
              : "《靈機8動》：靈八用工程腦聊科技、工作與日常裡說不清楚的事。沒有答案，只有版本。"}
          </p>
          <Link className="show-button" href={latest?.url ?? "#season"}>
            {latest
              ? en
                ? "Explore the latest episode"
                : "看看最新一集"
              : en
                ? "Explore season zero"
                : "先看看 S0 在想什麼"}{" "}
            <span aria-hidden>↘</span>
          </Link>
        </div>
        <figure className="show-cover">
          <Image
            src="/images/show/ling8-cover.webp"
            alt={en ? "LING8 — official show artwork" : "靈機8動正式節目封面"}
            width={1200}
            height={1200}
            priority
          />
          <figcaption>
            靈機8動 / LING8 <span>SEASON ZERO</span>
          </figcaption>
        </figure>
      </section>
      <section id="season" className="show-shell show-season">
        <p className="show-kicker">01 / THE EXPERIMENT</p>
        <div className="show-section-heading">
          <h2>
            {en ? "Season zero: no manual included." : "S0：人類沒有文件"}
          </h2>
          <p>
            {en
              ? "A public plan, not a release schedule. Topics may change as the season takes shape."
              : "這是一份公開的題材計畫，並非已上架集數或更新承諾；內容會隨製作調整。"}
          </p>
        </div>
        <div className="show-topics">
          {topics.map(([tag, zhTitle, enTitle, zh, eng]) => (
            <article key={tag}>
              <span className="show-kicker">{tag}</span>
              <h3>{en ? enTitle : zhTitle}</h3>
              <p>{en ? eng : zh}</p>
            </article>
          ))}
        </div>
        <div className="show-note">
          <span className="show-kicker">FIRST QUESTIONS</span>
          <h3>
            {en
              ? "Can engineering help us understand people?"
              : "工程師可能是世界上最常通靈的職業。"}
          </h3>
          <p>
            {en
              ? "What makes a requirement feel like mind reading? If AI writes code, what is an engineer for? Does life need a requirements document? These are some of the questions we are preparing to explore."
              : "從「這應該很簡單吧？」開始，接著聊 AI 都會寫 Code 了，工程師還要做什麼；再問人生是否也需要一份需求文件。"}
          </p>
        </div>
      </section>
      <section className="show-shell show-latest">
        <p className="show-kicker">02 / ON AIR</p>
        <h2>{en ? "Episodes" : "節目內容"}</h2>
        {episodes.length ? (
          <div className="show-topics">
            {episodes.map((episode) => (
              <Link className="show-note" href={episode.url} key={episode.slug}>
                <span>
                  {episode.bucket} / {episode.episodeNumber}
                </span>
                <h3>{episode.title}</h3>
                <p>{episode.summary}</p>
              </Link>
            ))}
          </div>
        ) : (
          <p className="show-lead">
            {allEpisodes.length
              ? en
                ? "There are no episodes in English yet. Change the site language to explore available episodes."
                : "目前尚無中文版單集，可切換語言查看其他已發布內容。"
              : en
                ? "The first episode is in preparation. Video, audio and episode notes will live here when published."
                : "第一集準備中。正式發布後，這裡會一起整理影片、音訊與單集筆記。"}
          </p>
        )}
      </section>
      <section className="show-invitation">
        <div className="show-shell">
          <p className="show-kicker">03 / ODD JOBS</p>
          <h2>{en ? "Got a human bug?" : "你也遇到人類的 Bug？"}</h2>
          <p>
            {en
              ? "Meet the future submission desk for the show."
              : "靈時工準備上工。先看看未來可以交給我什麼難題。"}
          </p>
          <Link className="show-button" href="/show/ask">
            {en ? "About submissions" : "認識靈時工派工單"} →
          </Link>
        </div>
      </section>
      <section className="show-shell show-about">
        <p className="show-kicker">04 / BEHIND THE MIC</p>
        <h2>
          {en ? "August, also known as LING8." : "我是 August，也叫靈八。"}
        </h2>
        <p className="show-lead">
          {en
            ? "An engineer trying to understand an absurd world with engineering methods. This is a place for observations, questions and revisions."
            : "一個試圖用工程方法理解荒謬世界的人。這裡收集觀察、疑問，以及隨時可以修改的理解。"}
        </p>
        <div className="show-crosslinks">
          <Link href="/about">
            {en ? "The person behind the show" : "關於我"} ↗
          </Link>
          <Link href="/services">
            {en ? "Engineering with 8plus" : "8plus 工程合作"} ↗
          </Link>
          <a
            href="https://shuyan.art"
            target="_blank"
            rel="noopener noreferrer"
          >
            {en ? "Visual work at shuyan" : "shuyan 視覺創作"} ↗
          </a>
        </div>
      </section>
    </div>
  );
}
