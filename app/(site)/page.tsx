'use client'

import Link from "next/link";
import { posts } from ".velite";
import { projects } from ".velite";
import { useLanguage } from "@/components/language-provider";
import {
  ArrowUpRight,
  Calendar,
  Code2,
  Cpu,
  Database,
  ExternalLink,
  Github,
  Linkedin,
  Server,
  Sparkles,
  SquareTerminal,
  Zap,
} from "lucide-react";

const techStack = [
  { label: "C# / .NET", icon: <Server className="w-4 h-4" />, color: "from-blue-500 to-blue-600", bgColor: "bg-blue-500/10" },
  { label: "Vue 3 / React", icon: <Code2 className="w-4 h-4" />, color: "from-emerald-500 to-teal-500", bgColor: "bg-emerald-500/10" },
  { label: "Node.js / NestJS", icon: <SquareTerminal className="w-4 h-4" />, color: "from-green-500 to-emerald-600", bgColor: "bg-green-500/10" },
  { label: "Kubernetes / Docker", icon: <Cpu className="w-4 h-4" />, color: "from-sky-500 to-cyan-500", bgColor: "bg-sky-500/10" },
  { label: "AWS / GCP / Azure", icon: <Database className="w-4 h-4" />, color: "from-orange-500 to-amber-500", bgColor: "bg-orange-500/10" },
  { label: "Next.js / Tailwind", icon: <Zap className="w-4 h-4" />, color: "from-purple-500 to-violet-500", bgColor: "bg-purple-500/10" },
];

const techBadges = [
  ".NET 8", "C#", "Vue 3", "NestJS", "Node.js", "Next.js 15",
  "Kubernetes", "Docker", "AWS", "GCP", "RabbitMQ", "Redis",
  "PostgreSQL", "TypeScript", "Tailwind CSS", "GitHub Actions",
];

const lifePhotos = [
  { url: "https://vueproject.s3.us-west-2.amazonaws.com/IMG_3344.jpg", alt: "Life photo 1" },
  { url: "https://vueproject.s3.us-west-2.amazonaws.com/Xnip2024-02-13_19-38-33.png", alt: "Life photo 2" },
];

export default function HomePage() {
  const { t, tn, locale } = useLanguage();

  const recentPosts = posts
    .filter(post => post.published && post.locale === locale)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  const featuredProjects = projects
    .filter(project => project.published && project.locale === locale)
    .slice(0, 3);

  return (
    <div className="relative min-h-screen">
      {/* Aurora Background Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-5%] w-[50%] h-[50%] rounded-full bg-blue-500/[0.04] dark:bg-blue-500/[0.07] blur-[140px] animate-aurora" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] rounded-full bg-purple-500/[0.04] dark:bg-purple-500/[0.07] blur-[140px] animate-aurora" style={{ animationDelay: "-3s" }} />
        <div className="absolute top-[40%] right-[10%] w-[30%] h-[30%] rounded-full bg-emerald-500/[0.03] dark:bg-emerald-500/[0.05] blur-[120px] animate-aurora" style={{ animationDelay: "-6s" }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 lg:py-14">
        {/* === Minimal Hero === */}
        <section className="mb-10 sm:mb-14 lg:mb-18">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-semibold tracking-wider uppercase rounded-full glass-card-strong text-emerald-600 dark:text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {locale === "zh-TW" ? "可預約諮詢" : "Available for Consulting"}
                </span>
              </div>
              <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-tight leading-[1.1] mb-3 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-600 dark:from-white dark:via-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
                Engineering<br className="sm:hidden" />· UX · Consulting
              </h1>
              <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-xl leading-relaxed">
                {locale === "zh-TW"
                  ? "五年前後端實戰經驗 · 微服務架構 · 雲端原生 · 技術顧問"
                  : "5+ Years Full-Stack · Microservices · Cloud Native · Tech Consulting"}
              </p>
            </div>
            <div className="flex gap-2 shrink-0">
              <Link href="/booking">
                <button className="relative group px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-semibold hover:opacity-90 transition-all active:scale-95 flex items-center gap-2 shadow-lg shadow-slate-900/20 dark:shadow-white/10">
                  <Calendar className="w-4 h-4" />
                  {locale === "zh-TW" ? "預約諮詢" : "Book"}
                </button>
              </Link>
              <a href="https://www.linkedin.com/in/chung-yu-wang-0b9370141/" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-500 dark:text-slate-400">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="https://github.com/awtw" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-500 dark:text-slate-400">
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

        {/* === Bento Grid === */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[minmax(180px,auto)]">

          {/* [1] Profile Card — spans 2 cols on lg */}
          <div className="sm:col-span-2 row-span-1 glass-card rounded-2xl p-5 sm:p-7 flex flex-col sm:flex-row gap-5 sm:gap-8">
            <div className="shrink-0">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden ring-2 ring-slate-200 dark:ring-slate-600">
                <img src="https://vueproject.s3.us-west-2.amazonaws.com/me.jpg" alt="August Wang" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-1">
                August Wang
                <span className="text-sm font-normal text-slate-400 dark:text-slate-500 ml-2">(王中禹)</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-3">
                {locale === "zh-TW"
                  ? "資深全端工程師 · 專注於高效能系統與微服務架構"
                  : "Senior Full-Stack Engineer · High-Performance Systems & Microservices"}
              </p>
              <div className="flex flex-wrap items-center gap-2 text-xs">
                {techStack.slice(0, 3).map((tech) => (
                  <span key={tech.label} className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg ${tech.bgColor} text-slate-700 dark:text-slate-300 font-medium`}>
                    {tech.icon}
                    {tech.label}
                  </span>
                ))}
                <span className="text-slate-400 dark:text-slate-500 text-[10px]">+{techStack.length - 3}</span>
              </div>
            </div>
            <div className="hidden sm:flex flex-col items-end justify-center shrink-0">
              <div className="text-right">
                <div className="text-[10px] text-slate-400 dark:text-slate-500 font-medium uppercase tracking-widest">{locale === "zh-TW" ? "經驗" : "Experience"}</div>
                <div className="text-xl font-bold">5+ <span className="text-sm font-normal text-slate-400 dark:text-slate-500">{locale === "zh-TW" ? "年" : "Years"}</span></div>
              </div>
            </div>
          </div>

          {/* [2] Tech Stack Radar */}
          <div className="glass-card rounded-2xl p-5 sm:p-6">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-purple-500" />
              <h3 className="text-sm font-bold">{locale === "zh-TW" ? "技術棧" : "Tech Stack"}</h3>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {techBadges.slice(0, 8).map((badge) => (
                <span key={badge} className="px-2.5 py-1 text-[11px] font-medium rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                  {badge}
                </span>
              ))}
              <span className="px-2.5 py-1 text-[11px] font-medium rounded-lg bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800">
                +{techBadges.length - 8}
              </span>
            </div>
          </div>

          {/* [3] Booking CTA — spans 2 cols on mobile */}
          <Link href="/booking" className="sm:col-span-1 lg:col-span-1">
            <div className="glass-card rounded-2xl p-5 sm:p-6 h-full flex flex-col justify-between group cursor-pointer hover:-translate-y-0.5 transition-all duration-300">
              <div>
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-3 shadow-lg shadow-blue-500/20">
                  <Calendar className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-base font-bold mb-1">{locale === "zh-TW" ? "一對一諮詢" : "1-on-1 Consulting"}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {locale === "zh-TW" ? "架構設計、程式碼審查、技術選型、職涯討論" : "Architecture · Code Review · Tech Selection"}
                </p>
              </div>
              <div className="flex items-center gap-1 mt-3 text-xs font-semibold text-blue-600 dark:text-blue-400 group-hover:gap-2 transition-all">
                {locale === "zh-TW" ? "選擇時段" : "Pick a Time"}
                <ArrowUpRight className="w-3 h-3" />
              </div>
            </div>
          </Link>

          {/* [4] Blog Post 1 */}
          {recentPosts[0] && (
            <Link href={recentPosts[0].url} className="sm:col-span-1">
              <div className="glass-card rounded-2xl p-5 sm:p-6 h-full flex flex-col group hover:-translate-y-0.5 transition-all duration-300">
                <div className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">
                  {locale === "zh-TW" ? "最新文章" : "Latest Blog"}
                </div>
                <h3 className="text-sm font-bold leading-snug mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                  {recentPosts[0].title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2 mb-3">
                  {recentPosts[0].summary}
                </p>
                <div className="mt-auto flex items-center justify-between">
                  <time className="text-[10px] text-slate-400">{(new Date(recentPosts[0].date)).toLocaleDateString(locale === "zh-TW" ? "zh-TW" : "en-US", { month: "short", day: "numeric", year: "numeric" })}</time>
                  <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-blue-500 transition-colors" />
                </div>
              </div>
            </Link>
          )}

          {/* [5] Featured Project 1 */}
          {featuredProjects[0] && (
            <Link href={featuredProjects[0].url} className="sm:col-span-1">
              <div className="glass-card rounded-2xl p-5 sm:p-6 h-full flex flex-col group hover:-translate-y-0.5 transition-all duration-300">
                <div className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">
                  {locale === "zh-TW" ? "精選專案" : "Featured"}
                </div>
                <h3 className="text-sm font-bold leading-snug mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2">
                  {featuredProjects[0].title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2 mb-3">
                  {featuredProjects[0].summary}
                </p>
                {featuredProjects[0].stack && (
                  <div className="flex flex-wrap gap-1 mt-auto">
                    {featuredProjects[0].stack.slice(0, 3).map((tech: string) => (
                      <span key={tech} className="px-1.5 py-0.5 text-[10px] rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500">{tech}</span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          )}

          {/* [6] Life Photo — spans 2 on sm */}
          <div className="sm:col-span-2 glass-card rounded-2xl overflow-hidden relative h-52 sm:h-48 group">
            <img
              src={lifePhotos[0].url}
              alt={lifePhotos[0].alt}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <h3 className="text-white font-bold text-sm mb-0.5">
                {locale === "zh-TW" ? "生活與成長" : "Life & Growth"}
              </h3>
              <p className="text-white/60 text-xs">
                {locale === "zh-TW" ? "澳洲 · 日本 · 台灣 · 貓咪 · 武術 · 旅行" : "Australia · Japan · Taiwan · Cat · Martial Arts · Travel"}
              </p>
            </div>
          </div>

          {/* [7] Blog Post 2 */}
          {recentPosts[1] && (
            <Link href={recentPosts[1].url}>
              <div className="glass-card rounded-2xl p-5 sm:p-6 h-full flex flex-col group hover:-translate-y-0.5 transition-all duration-300">
                <div className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">
                  {locale === "zh-TW" ? "文章" : "Blog"}
                </div>
                <h3 className="text-sm font-bold leading-snug mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                  {recentPosts[1].title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2 mb-3">
                  {recentPosts[1].summary}
                </p>
                <div className="mt-auto flex items-center justify-between">
                  <time className="text-[10px] text-slate-400">{(new Date(recentPosts[1].date)).toLocaleDateString(locale === "zh-TW" ? "zh-TW" : "en-US", { month: "short", day: "numeric", year: "numeric" })}</time>
                  <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-blue-500 transition-colors" />
                </div>
              </div>
            </Link>
          )}

          {/* [8] Featured Project 2 */}
          {featuredProjects[1] && (
            <Link href={featuredProjects[1].url}>
              <div className="glass-card rounded-2xl p-5 sm:p-6 h-full flex flex-col group hover:-translate-y-0.5 transition-all duration-300">
                <div className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">
                  {locale === "zh-TW" ? "專案" : "Project"}
                </div>
                <h3 className="text-sm font-bold leading-snug mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2">
                  {featuredProjects[1].title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2 mb-3">
                  {featuredProjects[1].summary}
                </p>
                {featuredProjects[1].stack && (
                  <div className="flex flex-wrap gap-1 mt-auto">
                    {featuredProjects[1].stack.slice(0, 3).map((tech: string) => (
                      <span key={tech} className="px-1.5 py-0.5 text-[10px] rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500">{tech}</span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          )}

          {/* [9] Full Tech Stack — expandable area */}
          <Link href="/about" className="sm:col-span-1 lg:col-span-3">
            <div className="glass-card rounded-2xl p-4 sm:p-5 flex items-center justify-between group hover:-translate-y-0.5 transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                  <Code2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold">{locale === "zh-TW" ? "完整技術棧與經歷" : "Full Tech Stack & Experience"}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{techBadges.length} technologies · 5+ years</p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </Link>

        </div>

        {/* === Bottom CTA Strip === */}
        <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 p-5 sm:p-6 glass-card-strong rounded-2xl">
          <div>
            <h3 className="text-sm font-bold mb-1">{locale === "zh-TW" ? "準備好討論你的專案了嗎？" : "Ready to discuss your project?"}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {locale === "zh-TW" ? "預約 30 分鐘免費諮詢，一起找出最佳解決方案。" : "Book a free 30-min call to find the best solution."}
            </p>
          </div>
          <Link href="/booking">
            <button className="relative shrink-0 px-6 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-semibold hover:opacity-90 transition-all active:scale-95 flex items-center gap-2 shadow-lg shadow-slate-900/20 dark:shadow-white/10">
              <Calendar className="w-4 h-4" />
              {locale === "zh-TW" ? "預約時段" : "Schedule Now"}
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
}
