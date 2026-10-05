"use client";

import Link from "next/link";
import type { Episode, Post } from ".velite";
import { useLanguage } from "@/components/language-provider";
import "@/styles/pages/show.css";

export function EpisodeDetail({ episode, related }: { episode: Episode; related: Pick<Post, "slug" | "url" | "title">[] }) {
  const { locale } = useLanguage();
  const en = locale === "en";
  return (
    <article className="show-world" data-header-color="#171814">
      <div className="show-shell show-ask">
        <Link href="/show">← {en ? "All episodes" : "所有節目"}</Link>
        <p className="show-kicker">
          S{episode.season} / {episode.episodeNumber} / {episode.bucket}
        </p>
        <h1>{episode.title}</h1>
        <p className="show-lead">{episode.summary}</p>
        <time dateTime={episode.publishedAt}>
          {new Date(episode.publishedAt!).toLocaleDateString(
            en ? "en-US" : "zh-TW",
            { timeZone: "Asia/Taipei" },
          )}
        </time>
        <div className="show-crosslinks">
          {episode.videoUrl && (
            <a
              className="show-button"
              href={episode.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {en ? "Watch video" : "觀看影片"} ↗
            </a>
          )}
          {episode.audioUrl && (
            <a
              className="show-button"
              href={episode.audioUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {en ? "Listen" : "收聽音訊"} ↗
            </a>
          )}
        </div>
        {episode.chapters.length > 0 && (
          <section className="show-note">
            <h2>{en ? "Chapters" : "章節"}</h2>
            <ol>
              {episode.chapters.map((chapter) => (
                <li key={chapter.timeSeconds}>
                  {Math.floor(chapter.timeSeconds / 60)}:
                  {String(chapter.timeSeconds % 60).padStart(2, "0")} —{" "}
                  {chapter.title}
                </li>
              ))}
            </ol>
          </section>
        )}
        <div
          lang={episode.locale}
          className="show-prose prose max-w-none"
          dangerouslySetInnerHTML={{ __html: episode.html }}
        />
        {episode.transcript && (
          <details className="show-note">
            <summary>{en ? "Transcript" : "逐字稿"}</summary>
            <p className="whitespace-pre-wrap">{episode.transcript}</p>
          </details>
        )}
        {episode.sources.length > 0 && (
          <section className="show-note">
            <h2>{en ? "Sources" : "參考來源"}</h2>
            <ul>
              {episode.sources.map((source) => (
                <li key={source.url}>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {source.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}
        {related.length > 0 && (
          <section className="show-note">
            <h2>{en ? "Further reading" : "延伸閱讀"}</h2>
            {related.map((post) => (
              <p key={post.slug}>
                <Link href={post.url}>{post.title} →</Link>
              </p>
            ))}
          </section>
        )}
      </div>
    </article>
  );
}
