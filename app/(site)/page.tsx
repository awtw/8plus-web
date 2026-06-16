'use client'

import Link from "next/link";
import { posts } from ".velite";
import { useLanguage } from "@/components/language-provider";
import { getLocalizedProjects } from "@/lib/projects";
import { motion } from "framer-motion";
import {
  ArrowSquareOut, CalendarCheck, Code, ComputerTower, Cpu, Database,
  GithubLogo, Lightning, Sparkle, Terminal
} from "@phosphor-icons/react";

const techStack = [
  { label: "C# / .NET", icon: <ComputerTower className="w-4 h-4" />, color: "from-blue-500 to-blue-600", bgColor: "bg-blue-500/10" },
  { label: "Vue 3 / React", icon: <Code className="w-4 h-4" />, color: "from-emerald-500 to-teal-500", bgColor: "bg-emerald-500/10" },
  { label: "Node.js / NestJS", icon: <Terminal className="w-4 h-4" />, color: "from-green-500 to-emerald-600", bgColor: "bg-green-500/10" },
  { label: "Kubernetes / Docker", icon: <Cpu className="w-4 h-4" />, color: "from-sky-500 to-cyan-500", bgColor: "bg-sky-500/10" },
  { label: "AWS / GCP / Azure", icon: <Database className="w-4 h-4" />, color: "from-orange-500 to-amber-500", bgColor: "bg-orange-500/10" },
  { label: "Next.js / Tailwind", icon: <Lightning className="w-4 h-4" />, color: "from-purple-500 to-violet-500", bgColor: "bg-purple-500/10" },
];

const techBadges = [
  ".NET 8", "C#", "Vue 3", "NestJS", "Node.js", "Next.js 15",
  "Kubernetes", "Docker", "AWS", "GCP", "RabbitMQ", "Redis",
  "PostgreSQL", "TypeScript", "Tailwind CSS", "GitHub Actions",
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] as const } },
};

export default function HomePage() {
  const { locale } = useLanguage();

  const recentPosts = posts
    .filter(post => post.published && post.locale === locale)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  const featuredProjects = getLocalizedProjects(locale).slice(0, 3);

  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-5%] w-[50%] h-[50%] rounded-full bg-blue-500/[0.04] dark:bg-blue-500/[0.07] blur-[140px] animate-aurora" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] rounded-full bg-purple-500/[0.04] dark:bg-purple-500/[0.07] blur-[140px] animate-aurora" style={{ animationDelay: "-3s" }} />
        <div className="absolute top-[40%] right-[10%] w-[30%] h-[30%] rounded-full bg-emerald-500/[0.03] dark:bg-emerald-500/[0.05] blur-[120px] animate-aurora" style={{ animationDelay: "-6s" }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 lg:py-14">

        {/* === Hero === */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] as const }}
          className="mb-10 sm:mb-14 lg:mb-18"
        >
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-semibold tracking-wider uppercase rounded-full glass-card-strong text-emerald-600 dark:text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse glow-dot" />
                  {locale === "zh-TW" ? "Open for gigs" : "Open for gigs"}
                </span>
              </div>
              <h1 className="text-[clamp(2.2rem,6vw,4rem)] font-black tracking-tight leading-[1.05] mb-3 bg-gradient-to-r from-slate-900 via-slate-700 to-slate-500 dark:from-white dark:via-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
                {locale === "zh-TW" ? (
                  <>AI 架構<br className="sm:hidden" />· 全棧 · 雲原生</>
                ) : (
                  <>AI Architecture<br className="sm:hidden" />· Full-Stack · Cloud</>
                )}
              </h1>
              <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-xl leading-relaxed">
                {locale === "zh-TW"
                  ? "全棧修仙 · 微服務老司機 · 雲原生 · 架構不設限"
                  : "8+ Yrs Full-Stack · Microservices · Cloud Native · Tech Consulting"}
              </p>
            </div>
            <div className="flex gap-2 shrink-0">
              <Link href="/booking">
                <button className="relative group px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-semibold hover:opacity-90 transition-all active:scale-95 flex items-center gap-2 shadow-lg shadow-slate-900/20 dark:shadow-white/10">
                  <CalendarCheck weight="bold" className="w-4 h-4" />
                  {locale === "zh-TW" ? "約起來" : "Book"}
                </button>
              </Link>
              <a href="https://github.com/awtw" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-500 dark:text-slate-400">
                <GithubLogo className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.section>

        {/* === Bento Grid === */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[minmax(180px,auto)]"
        >

          {/* [1] Profile Card */}
          <motion.div variants={cardVariants} className="sm:col-span-2 row-span-1 gradient-border-card glass-card rounded-2xl p-5 sm:p-7 flex flex-col sm:flex-row gap-5 sm:gap-8">
            <div className="shrink-0">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-violet-500 via-blue-500 to-emerald-500 flex items-center justify-center text-white text-2xl sm:text-3xl font-bold shadow-lg ring-2 ring-white/50 dark:ring-slate-700">
                AW
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-1">
                August Wang
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-3">
                {locale === "zh-TW"
                  ? "全棧 Builder · C# / Vue 雙修 · 微服務上癮者"
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
                <div className="text-[10px] text-slate-400 dark:text-slate-500 font-medium uppercase tracking-widest">{locale === "zh-TW" ? "戰力" : "EXP"}</div>
                <div className="text-xl font-bold">8+ <span className="text-sm font-normal text-slate-400 dark:text-slate-500">{locale === "zh-TW" ? "年" : "Years"}</span></div>
              </div>
            </div>
          </motion.div>

          {/* [2] Toolbox */}
          <motion.div variants={cardVariants} className="gradient-border-card glass-card rounded-2xl p-5 sm:p-6">
            <div className="flex items-center gap-2 mb-3">
              <Sparkle className="w-4 h-4 text-purple-500" weight="fill" />
              <h3 className="text-sm font-bold">{locale === "zh-TW" ? "工具箱" : "Toolbox"}</h3>
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
          </motion.div>

          {/* [3] Booking CTA */}
          <motion.div variants={cardVariants}>
            <Link href="/booking" className="sm:col-span-1 lg:col-span-1">
              <div className="gradient-border-card glass-card rounded-2xl p-5 sm:p-6 h-full flex flex-col justify-between group cursor-pointer hover:-translate-y-0.5 transition-all duration-300">
                <div>
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-3 shadow-lg shadow-blue-500/20">
                    <CalendarCheck className="w-4 h-4 text-white" weight="bold" />
                  </div>
                  <h3 className="text-base font-bold mb-1">{locale === "zh-TW" ? "來聊聊" : "Let's Talk"}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {locale === "zh-TW" ? "架構健檢 · Code Review · 選型把脈 · 職涯瞎聊" : "Architecture · Code Review · Tech Selection"}
                  </p>
                </div>
                <div className="flex items-center gap-1 mt-3 text-xs font-semibold text-blue-600 dark:text-blue-400 group-hover:gap-2 transition-all">
                  {locale === "zh-TW" ? "卡時段" : "Pick a Time"}
                  <ArrowSquareOut className="w-3 h-3" weight="bold" />
                </div>
              </div>
            </Link>
          </motion.div>

          {/* [4] Blog Post 1 */}
          {recentPosts[0] && (
            <motion.div variants={cardVariants}>
              <Link href={recentPosts[0].url} className="sm:col-span-1">
                <div className="gradient-border-card glass-card rounded-2xl p-5 sm:p-6 h-full flex flex-col group hover:-translate-y-0.5 transition-all duration-300">
                  <div className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">
                    {locale === "zh-TW" ? "Latest Notes" : "Latest"}
                  </div>
                  <h3 className="text-sm font-bold leading-snug mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                    {recentPosts[0].title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2 mb-3">
                    {recentPosts[0].summary}
                  </p>
                  <div className="mt-auto flex items-center justify-between">
                    <time className="text-[10px] text-slate-400">{(new Date(recentPosts[0].date)).toLocaleDateString(locale === "zh-TW" ? "zh-TW" : "en-US", { month: "short", day: "numeric", year: "numeric" })}</time>
                    <ArrowSquareOut className="w-3 h-3 text-slate-400 group-hover:text-blue-500 transition-colors" />
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          {/* [5] Featured Project */}
          {featuredProjects[0] && (
            <motion.div variants={cardVariants}>
              <Link href={featuredProjects[0].url} className="sm:col-span-1">
                <div className="gradient-border-card glass-card rounded-2xl p-5 sm:p-6 h-full flex flex-col group hover:-translate-y-0.5 transition-all duration-300">
                  <div className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">
                    {locale === "zh-TW" ? "Archive" : "Lab"}
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
            </motion.div>
          )}

          {/* [6] Full Tech Stack */}
          <motion.div variants={cardVariants}>
            <Link href="/about" className="sm:col-span-2">
              <div className="gradient-border-card glass-card rounded-2xl p-5 sm:p-7 h-full flex flex-col group hover:-translate-y-0.5 transition-all duration-300">
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                    <Code className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold">{locale === "zh-TW" ? "Stack" : "Stack"}</h3>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                  {locale === "zh-TW"
                    ? "8 年全棧 · 從前端糊到後端再糊上雲端的完整進化史"
                    : "8+ years full-stack · Complete technology map from frontend to backend to cloud"}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {techBadges.map((badge) => (
                    <span key={badge} className="px-2 py-1 text-[10px] font-medium rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      {badge}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-1 mt-4 text-xs font-semibold text-blue-600 dark:text-blue-400 group-hover:gap-2 transition-all">
                    {locale === "zh-TW" ? "View Full Archive →" : "View Full Archive"}
                  <ArrowSquareOut className="w-3 h-3" weight="bold" />
                </div>
              </div>
            </Link>
          </motion.div>

          {/* [7] Blog Post 2 */}
          {recentPosts[1] && (
            <motion.div variants={cardVariants}>
              <Link href={recentPosts[1].url}>
                <div className="gradient-border-card glass-card rounded-2xl p-5 sm:p-6 h-full flex flex-col group hover:-translate-y-0.5 transition-all duration-300">
                  <div className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">
                    {locale === "zh-TW" ? "Notes" : "Notes"}
                  </div>
                  <h3 className="text-sm font-bold leading-snug mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                    {recentPosts[1].title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2 mb-3">
                    {recentPosts[1].summary}
                  </p>
                  <div className="mt-auto flex items-center justify-between">
                    <time className="text-[10px] text-slate-400">{(new Date(recentPosts[1].date)).toLocaleDateString(locale === "zh-TW" ? "zh-TW" : "en-US", { month: "short", day: "numeric", year: "numeric" })}</time>
                    <ArrowSquareOut className="w-3 h-3 text-slate-400 group-hover:text-blue-500 transition-colors" />
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          {/* [8] Featured Project 2 */}
          {featuredProjects[1] && (
            <motion.div variants={cardVariants}>
              <Link href={featuredProjects[1].url}>
                <div className="gradient-border-card glass-card rounded-2xl p-5 sm:p-6 h-full flex flex-col group hover:-translate-y-0.5 transition-all duration-300">
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
            </motion.div>
          )}

          {/* [9] Full Experience CTA */}
          <motion.div variants={cardVariants}>
            <Link href="/about" className="sm:col-span-1 lg:col-span-3">
              <div className="gradient-border-card glass-card rounded-2xl p-4 sm:p-5 flex items-center justify-between group hover:-translate-y-0.5 transition-all duration-300">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                    <Code className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold">{locale === "zh-TW" ? "Stack & Archive" : "Stack & Archive"}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{techBadges.length} technologies · 8+ years</p>
                  </div>
                </div>
                <ArrowSquareOut className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" weight="bold" />
              </div>
            </Link>
          </motion.div>

        </motion.div>

        {/* === Bottom CTA === */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] as const }}
          className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 p-5 sm:p-6 glass-card-strong rounded-2xl"
        >
          <div>
            <h3 className="text-sm font-bold mb-1">{locale === "zh-TW" ? "有 Lab 想搞？" : "Got a Lab?"}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {locale === "zh-TW" ? "30 分鐘 coffee chat，幫你的 idea 加速落地。" : "Free 30-min call to get your idea off the ground."}
            </p>
          </div>
          <Link href="/booking">
            <button className="relative shrink-0 px-6 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-semibold hover:opacity-90 transition-all active:scale-95 flex items-center gap-2 shadow-lg shadow-slate-900/20 dark:shadow-white/10">
              <CalendarCheck className="w-4 h-4" weight="bold" />
              {locale === "zh-TW" ? "約起來" : "Schedule Now"}
            </button>
          </Link>
        </motion.div>

      </div>
    </div>
  );
}
