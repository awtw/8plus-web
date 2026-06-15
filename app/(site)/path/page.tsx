'use client'

import Link from "next/link";
import { useLanguage } from "@/components/language-provider";
import {
  Briefcase, Code2, GraduationCap, Globe, Building2,
  BookOpen, Award, ArrowUpRight, MapPin, Calendar,
  Sparkles, ExternalLink, Quote, Heart
} from "lucide-react";

const milestones = {
  "zh-TW": [
    {
      year: "2025",
      title: "8plus 品牌顧問正式啟動",
      subtitle: "全端工程顧問 · 個人品牌官網",
      icon: <Building2 className="w-4 h-4" />,
      color: "from-blue-500 to-cyan-500",
      descriptions: [
        "創立 8plus 工程顧問品牌",
        "搭建 Next.js 15 個人品牌官網",
        "提供企業技術整合與架構設計顧問服務",
      ],
      tags: ["Next.js 15", "Tailwind CSS", "Vercel", "Cal.com"],
      side: "right",
    },
    {
      year: "2024",
      title: "CTBC 銀行 — 高流量推播系統首席開發",
      subtitle: "Senior Backend Engineer",
      icon: <Building2 className="w-4 h-4" />,
      color: "from-purple-500 to-pink-500",
      descriptions: [
        "獨立開發雙11千萬級別推播系統",
        "使用 RabbitMQ 與 Kubernetes 優化非同步處理",
        "將部署時間從 1.5 小時縮短至 5 分鐘",
        "系統效能提升超過 40%",
      ],
      tags: [".NET 8", "RabbitMQ", "K8s", "AWS"],
      side: "left",
    },
    {
      year: "2023",
      title: "企業級 Vue 3 + LINE Chatbot 全端開發",
      subtitle: "Full-Stack Engineer",
      icon: <Briefcase className="w-4 h-4" />,
      color: "from-emerald-500 to-teal-500",
      descriptions: [
        "使用 Vue 3 + Tailwind CSS 開發響應式品牌網站",
        "整合 Google Dialogflow API 開發智能客服機器人",
        "搭建 CI/CD 自動化部署流程",
        "優化網站 SEO 與 Core Web Vitals",
      ],
      tags: ["Vue 3", "Tailwind", "Dialogflow", "Jenkins"],
      side: "right",
    },
    {
      year: "2022",
      title: "Node.js 微服務架構設計",
      subtitle: "Backend Developer",
      icon: <Code2 className="w-4 h-4" />,
      color: "from-orange-500 to-amber-500",
      descriptions: [
        "設計與開發基於 Node.js 的微服務架構",
        "使用 NestJS + TypeScript 建構 API Gateway",
        "導入 Redis 快取層，顯著降低 API 延遲",
        "建立完整的單元測試與整合測試覆蓋",
      ],
      tags: ["NestJS", "Node.js", "Redis", "TypeScript"],
      side: "left",
    },
    {
      year: "2021",
      title: "Google Sheets API 即時數據分析平台",
      subtitle: "Data Visualization Engineer",
      icon: <Award className="w-4 h-4" />,
      color: "from-sky-500 to-blue-500",
      descriptions: [
        "建構 Vue 3 儀表板串接 Google Sheets API",
        "撰寫統計演算法並實現即時圖表繪製",
        "前端使用 ApexCharts 進行數據可視化",
        "支援多維度數據篩選與動態更新",
      ],
      tags: ["Vue 3", "ApexCharts", "Google API", "Python"],
      side: "right",
    },
    {
      year: "2020",
      title: "碩士論文 — AI 醫療影像分析研究",
      subtitle: "Research Assistant",
      icon: <BookOpen className="w-4 h-4" />,
      color: "from-rose-500 to-pink-500",
      descriptions: [
        "研究深度學習於胸部 X 光肺結節偵測",
        "發表多篇 PubMed 索引期刊論文",
        "開發 AI 輔助診斷原型系統",
        "實驗成果獲業界合作機會",
      ],
      tags: ["Deep Learning", "CNN", "Medical Imaging", "Python"],
      side: "left",
    },
    {
      year: "2019",
      title: "澳洲 TAFE 海外進修",
      subtitle: "Study Abroad",
      icon: <Globe className="w-4 h-4" />,
      color: "from-indigo-500 to-violet-500",
      descriptions: [
        "前往澳洲 TAFE 進修資訊科技",
        "全英語環境學習與專案合作經驗",
        "拓展國際視野與跨文化溝通能力",
        "完成多項實作導向技術專案",
      ],
      tags: ["Study Abroad", "Australia", "English"],
      side: "right",
    },
    {
      year: "2018",
      title: "國立臺灣海洋大學 資訊工程碩士",
      subtitle: "M.S. Computer Science",
      icon: <GraduationCap className="w-4 h-4" />,
      color: "from-green-500 to-emerald-500",
      descriptions: [
        "主修資訊工程，研究 AI 與深度學習",
        "發表多篇研討會與期刊論文",
        "參與校際程式競賽與技術社群",
      ],
      tags: ["NTOU", "AI", "ML", "Computer Vision"],
      side: "left",
    },
  ],
  "en": [
    {
      year: "2025",
      title: "8plus Consulting Launch",
      subtitle: "Full-Stack Engineering Consultant",
      icon: <Building2 className="w-4 h-4" />,
      color: "from-blue-500 to-cyan-500",
      descriptions: [
        "Founded 8plus engineering consulting brand",
        "Built Next.js 15 personal brand website",
        "Providing enterprise architecture consulting",
      ],
      tags: ["Next.js 15", "Tailwind CSS", "Vercel", "Cal.com"],
      side: "right",
    },
    {
      year: "2024",
      title: "CTBC Bank — Lead Developer, Push System",
      subtitle: "Senior Backend Engineer",
      icon: <Building2 className="w-4 h-4" />,
      color: "from-purple-500 to-pink-500",
      descriptions: [
        "Independently developed Double 11 push notification system",
        "RabbitMQ & Kubernetes for async processing",
        "Reduced deployment from 1.5h to 5min",
        "40%+ system performance improvement",
      ],
      tags: [".NET 8", "RabbitMQ", "K8s", "AWS"],
      side: "left",
    },
    {
      year: "2023",
      title: "Enterprise Vue 3 + LINE Chatbot",
      subtitle: "Full-Stack Engineer",
      icon: <Briefcase className="w-4 h-4" />,
      color: "from-emerald-500 to-teal-500",
      descriptions: [
        "Built responsive brand website with Vue 3 + Tailwind",
        "Integrated Google Dialogflow API for chatbot",
        "Set up CI/CD automated deployment",
        "Optimized SEO & Core Web Vitals",
      ],
      tags: ["Vue 3", "Tailwind", "Dialogflow", "Jenkins"],
      side: "right",
    },
    {
      year: "2022",
      title: "Node.js Microservices Architecture",
      subtitle: "Backend Developer",
      icon: <Code2 className="w-4 h-4" />,
      color: "from-orange-500 to-amber-500",
      descriptions: [
        "Designed Node.js microservices architecture",
        "Built API Gateway with NestJS + TypeScript",
        "Introduced Redis caching layer",
        "Established comprehensive test coverage",
      ],
      tags: ["NestJS", "Node.js", "Redis", "TypeScript"],
      side: "left",
    },
    {
      year: "2021",
      title: "Google Sheets API Data Analytics Platform",
      subtitle: "Data Visualization Engineer",
      icon: <Award className="w-4 h-4" />,
      color: "from-sky-500 to-blue-500",
      descriptions: [
        "Built Vue 3 dashboard connected to Google Sheets API",
        "Wrote statistical algorithms for real-time charts",
        "Used ApexCharts for data visualization",
        "Multi-dimensional data filtering & dynamic updates",
      ],
      tags: ["Vue 3", "ApexCharts", "Google API", "Python"],
      side: "right",
    },
    {
      year: "2020",
      title: "M.S. Thesis — Medical AI Imaging",
      subtitle: "Research Assistant",
      icon: <BookOpen className="w-4 h-4" />,
      color: "from-rose-500 to-pink-500",
      descriptions: [
        "Deep learning for chest X-ray nodule detection",
        "Published multiple PubMed-indexed papers",
        "Developed AI-assisted diagnosis prototype",
        "Research led to industry collaboration opportunity",
      ],
      tags: ["Deep Learning", "CNN", "Medical Imaging", "Python"],
      side: "left",
    },
    {
      year: "2019",
      title: "TAFE Australia — Study Abroad",
      subtitle: "International Exchange",
      icon: <Globe className="w-4 h-4" />,
      color: "from-indigo-500 to-violet-500",
      descriptions: [
        "Studied Information Technology at TAFE Australia",
        "Full English environment project collaboration",
        "Broadened global perspective & cross-cultural skills",
      ],
      tags: ["Study Abroad", "Australia", "English"],
      side: "right",
    },
    {
      year: "2018",
      title: "NTOU — M.S. Computer Science",
      subtitle: "Master's Degree",
      icon: <GraduationCap className="w-4 h-4" />,
      color: "from-green-500 to-emerald-500",
      descriptions: [
        "M.S. in Computer Science, AI & Deep Learning research",
        "Published multiple conference & journal papers",
        "Participated in programming contests & tech communities",
      ],
      tags: ["NTOU", "AI", "ML", "Computer Vision"],
      side: "left",
    },
  ],
};

export default function PathPage() {
  const { locale } = useLanguage();
  const data = milestones[locale] || milestones["en"];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Header */}
      <div className="mb-10 sm:mb-14">
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-semibold tracking-wider uppercase rounded-full glass-card-strong text-indigo-600 dark:text-indigo-400">
            <Sparkles className="w-3 h-3" />
            {locale === "zh-TW" ? "2018 — 2025" : "2018 — 2025"}
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
          {locale === "zh-TW" ? "職涯與成長軌跡" : "Career & Growth Journey"}
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl leading-relaxed">
          {locale === "zh-TW"
            ? "從研究所到海外進修、從後端工程師到技術顧問 — 每一個節點都是一次重要的成長。"
            : "From graduate school to studying abroad, from backend engineer to tech consultant — every milestone is a meaningful step forward."}
        </p>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-[19px] sm:left-1/2 top-4 bottom-4 w-px bg-gradient-to-b from-blue-500/50 via-purple-500/50 to-emerald-500/50 sm:-translate-x-px" />

        <div className="space-y-10 sm:space-y-14">
          {data.map((milestone, index) => {
            const isLeft = milestone.side === "left";

            return (
              <div key={`${milestone.year}-${index}`} className="relative flex flex-col sm:flex-row items-start gap-4 sm:gap-0">
                {/* Year Badge - Mobile: left, Desktop: alternating */}
                <div className={`hidden sm:flex sm:w-1/2 ${isLeft ? "sm:justify-end sm:pr-10" : "sm:pl-10"}`}>
                  <div className={`sm:flex flex-col ${isLeft ? "items-end text-right" : "items-start text-left"}`}>
                    <span className="text-4xl sm:text-5xl font-black tracking-tighter text-slate-200 dark:text-slate-800 select-none leading-none">
                      {milestone.year}
                    </span>
                  </div>
                </div>

                {/* Timeline Node */}
                <div className="absolute left-0 sm:left-1/2 top-1 sm:-translate-x-1/2 z-10">
                  <div className={`w-[38px] h-[38px] rounded-xl bg-gradient-to-br ${milestone.color} flex items-center justify-center text-white shadow-lg shadow-${milestone.color.split(" ")[0].replace("from-", "")}/20 ring-4 ring-white dark:ring-slate-950`}>
                    {milestone.icon}
                  </div>
                </div>

                {/* Mobile: show year inline */}
                <div className="sm:hidden flex items-center gap-2 mb-1 ml-[52px]">
                  <Calendar className="w-3 h-3 text-slate-400" />
                  <span className="text-xs font-bold text-slate-400">{milestone.year}</span>
                </div>

                {/* Content Card */}
                <div className={`w-full sm:w-1/2 ${isLeft ? "sm:pr-10" : "sm:pl-10"} ml-[52px] sm:ml-0`}>
                  <div className="glass-card rounded-2xl p-5 sm:p-6 hover:-translate-y-0.5 transition-all duration-300">
                    <div className="flex items-start gap-3 mb-3">
                      <div className={`shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br ${milestone.color} flex items-center justify-center text-white sm:hidden`}>
                        {milestone.icon}
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-sm sm:text-base font-bold leading-snug">{milestone.title}</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{milestone.subtitle}</p>
                      </div>
                    </div>

                    <ul className="space-y-1.5 mb-4">
                      {milestone.descriptions.map((desc, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                          <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600 mt-2 shrink-0" />
                          {desc}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-1.5">
                      {milestone.tags.map((tag) => (
                        <span key={tag} className="px-2 py-0.5 text-[10px] font-medium rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="mt-12 sm:mt-16 glass-card-strong rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold mb-1">
            {locale === "zh-TW" ? "一起寫下新的里程碑？" : "Ready to write the next milestone?"}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {locale === "zh-TW" ? "預約諮詢，讓我們聊聊你的下一步。" : "Book a consultation and let's discuss your next chapter."}
          </p>
        </div>
        <Link href="/booking">
          <button className="shrink-0 px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-semibold hover:opacity-90 transition-all active:scale-95 flex items-center gap-2 shadow-lg shadow-slate-900/20 dark:shadow-white/10">
            <Calendar className="w-4 h-4" />
            {locale === "zh-TW" ? "預約諮詢" : "Book Now"}
          </button>
        </Link>
      </div>
    </div>
  );
}
