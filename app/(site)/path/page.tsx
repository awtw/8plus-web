'use client'

import Link from "next/link";
import { useLanguage } from "@/components/language-provider";
import { motion } from "framer-motion";
import {
  Briefcase, Code, Globe, Buildings,
  GraduationCap, Sparkle, CalendarCheck,
  Brain, Robot
} from "@phosphor-icons/react";

const milestones = {
  "zh-TW": [
    {
      year: "2026",
      period: "2026-02 → 至今",
      title: "中國信託（法金 AI）",
      subtitle: "高級架構師",
      icon: <Brain className="w-4 h-4" weight="bold" />,
      color: "from-violet-500 to-purple-600",
      descriptions: [
        "AI Platform 設計與架構規劃",
        "RAG Flow 架構設計與實作",
        "AI Agent 開發與協作流程設計",
        "知識工程與上下文工程系統設計",
        "整體 AI 服務串接與落地部署",
      ],
      tags: ["AI Platform", "RAG", "AI Agent", "K8s", "Cloud", "LLM"],
      side: "right",
      isActive: true,
    },
    {
      year: "2025",
      period: "2025-03 → 2025-09",
      title: "優配科技 (Universal Processing LLC)",
      subtitle: "資深軟體工程師",
      icon: <Buildings className="w-4 h-4" weight="bold" />,
      color: "from-blue-500 to-cyan-500",
      descriptions: [
        "CRM / Onboarding / 分潤 / POS 系統開發",
        "POS 系統 UIX 主席設計師，主導使用者體驗",
        "參與跨國團隊開發與部署流程",
        "多系統整合與第三方服務串接",
      ],
      tags: [".NET", "Node.js", "React", "AWS", "CRM"],
      side: "left",
    },
    {
      year: "2025",
      period: "2025",
      title: "Resume 2025 — Next.js 作品集 & 8plus 諮詢",
      subtitle: "個人品牌網站上線",
      icon: <Globe className="w-4 h-4" weight="bold" />,
      color: "from-emerald-500 to-teal-500",
      descriptions: [
        "以 Next.js 15 + Velite 打造新一代個人作品集",
        "導入 Vite 開發流程與 Google Calendar 預約功能",
        "結合多年經驗與設計語彙，打造工程諮詢平台",
        "建立系統化的技術諮詢與預約服務",
      ],
      tags: ["Next.js", "Vercel", "Google Calendar", "Velite"],
      side: "right",
    },
    {
      year: "2024",
      period: "2024-06 → 2025-03",
      title: "台達電子",
      subtitle: "資深軟體工程師",
      icon: <Briefcase className="w-4 h-4" weight="bold" />,
      color: "from-orange-500 to-amber-500",
      descriptions: [
        "Java 專案重構為 .NET Core 8，容器化部署至 Kubernetes",
        "串接 SAP 系統，實現企業級資料交換",
        "建立完善的監控機制（Prometheus + Grafana）",
        "系統效能優化與技術債清理",
      ],
      tags: [".NET Core 8", "K8s", "SAP", "Prometheus", "Java"],
      side: "left",
    },
    {
      year: "2024",
      period: "2024",
      title: "Resume 2024 — Vue 3 商業風格作品集",
      subtitle: "商業導向作品集設計",
      icon: <Code className="w-4 h-4" weight="bold" />,
      color: "from-emerald-500 to-teal-500",
      descriptions: [
        "以商業導向為主的作品集設計",
        "強調品牌凝聚力與專案價值呈現",
        "注重資訊階層、視覺節奏與轉換動線",
      ],
      tags: ["Vue 3", "UI/UX", "Tailwind CSS"],
      side: "right",
    },
    {
      year: "2023",
      period: "2023-09 → 2024-05",
      title: "中國信託（個人金融）",
      subtitle: "軟體工程師",
      icon: <Buildings className="w-4 h-4" weight="bold" />,
      color: "from-rose-500 to-pink-500",
      descriptions: [
        "個人金融部門內部系統開發與維運",
        "保險代理人系統開發與優化",
        "OCP（OpenShift Container Platform）上開發與部署",
        "微服務架構導入與系統現代化",
      ],
      tags: [".NET", "OCP", "K8s", "金融系統"],
      side: "left",
    },
    {
      year: "2021",
      period: "2021-03 → 2023-02",
      title: "91APP 九易宇軒",
      subtitle: "資深軟體工程師",
      icon: <Buildings className="w-4 h-4" weight="bold" />,
      color: "from-sky-500 to-blue-500",
      descriptions: [
        "Data Team 推播中心微服務架構設計與開發",
        "每小時 300-500 萬推播發送量的高吞吐系統",
        "使用 EKS + GCP + RabbitMQ + SQS 多雲混合架構",
        "高流量系統穩定維運與效能調校",
      ],
      tags: ["EKS", "RabbitMQ", "SQS", "GCP", "微服務"],
      side: "right",
    },
    {
      year: "2021",
      period: "2021",
      title: "Resume 2021 — Angular 技能作品集",
      subtitle: "震旦期間技能作品集",
      icon: <Code className="w-4 h-4" weight="bold" />,
      color: "from-emerald-500 to-teal-500",
      descriptions: [
        "在震旦集團任職期間累積技術與設計經驗",
        "前端模組化設計、支付流程（PayPal）與樣式工程化",
      ],
      tags: ["Angular", "PayPal", "Sass"],
      side: "left",
    },
    {
      year: "2019",
      period: "2019-12 → 2021-03",
      title: "震旦集團",
      subtitle: "資深軟體工程師",
      icon: <Briefcase className="w-4 h-4" weight="bold" />,
      color: "from-indigo-500 to-violet-500",
      descriptions: [
        "VB .NET 轉型 .NET Framework 4.7 現代化改造",
        "前後端分離架構設計（Angular + .NET Web API）",
        "CI/CD 自動化部署流程導入",
        "Power BI 數據報表開發、Checkmarx 資安掃描導入",
      ],
      tags: ["Angular", ".NET", "Power BI", "CI/CD"],
      side: "right",
    },
    {
      year: "2019",
      period: "2019",
      title: "Resume 2019 — 動效作品集",
      subtitle: "碩班期間作品集",
      icon: <Code className="w-4 h-4" weight="bold" />,
      color: "from-emerald-500 to-teal-500",
      descriptions: [
        "以多種 JS/CSS 動畫技巧實作的作品集",
        "聚焦互動細節與動態呈現",
      ],
      tags: ["VanillaJS", "CSS Animation", "Sass", "Gulp"],
      side: "left",
    },
    {
      year: "2018",
      period: "2018-07",
      title: "NCTU 交通大學 — 分子醫學與生物工程研究所",
      subtitle: "碩士畢業（GPA 3.98）",
      icon: <GraduationCap className="w-4 h-4" weight="bold" />,
      color: "from-green-500 to-emerald-500",
      descriptions: [
        "跨領域從食品科學轉向資訊工程與分子醫學",
        "使用 R / Python 進行生物資訊分析",
        "碩士論文開發慢性腎臟病檢驗工具",
        "選修資工課程，完成前後端專案獲得教授肯定",
      ],
      tags: ["NCTU", "Python", "R", "Bioinformatics"],
      side: "right",
    },
    {
      year: "2012",
      period: "2012-09",
      title: "NTOU 海洋大學 — 食品科學系",
      subtitle: "學士畢業（GPA 3.74）",
      icon: <GraduationCap className="w-4 h-4" weight="bold" />,
      color: "from-slate-500 to-slate-600",
      descriptions: [
        "打下科學研究方法與數據分析基礎",
        "自學 HTML/CSS/JS 開啟程式設計之路",
      ],
      tags: ["NTOU", "食品科學", "自學程式"],
      side: "left",
    },
  ],
  "en": [
    {
      year: "2026",
      period: "2026-02 → Present",
      title: "CTBC Bank (Corporate Banking AI)",
      subtitle: "Senior Architect",
      icon: <Brain className="w-4 h-4" weight="bold" />,
      color: "from-violet-500 to-purple-600",
      descriptions: [
        "AI Platform architecture & design",
        "RAG Flow architecture design & implementation",
        "AI Agent development & orchestration",
        "Knowledge & Context Engineering system design",
        "End-to-end AI service integration & deployment",
      ],
      tags: ["AI Platform", "RAG", "AI Agent", "K8s", "Cloud", "LLM"],
      side: "right",
      isActive: true,
    },
    {
      year: "2025",
      period: "2025-03 → 2025-09",
      title: "Universal Processing LLC",
      subtitle: "Senior Software Engineer",
      icon: <Buildings className="w-4 h-4" weight="bold" />,
      color: "from-blue-500 to-cyan-500",
      descriptions: [
        "CRM / Onboarding / Revenue Share / POS system development",
        "POS UIX Lead Designer",
        "Cross-border team collaboration & deployment",
        "Multi-system integration & third-party API orchestration",
      ],
      tags: [".NET", "Node.js", "React", "AWS", "CRM"],
      side: "left",
    },
    {
      year: "2025",
      period: "2025",
      title: "Resume 2025 — Next.js Portfolio & 8plus Consulting",
      subtitle: "Personal brand website launch",
      icon: <Globe className="w-4 h-4" weight="bold" />,
      color: "from-emerald-500 to-teal-500",
      descriptions: [
        "Built personal portfolio with Next.js 15 + Velite",
        "Integrated Google Calendar booking system",
        "Combined years of experience into consulting platform",
        "Systematized technical consulting & appointment service",
      ],
      tags: ["Next.js", "Vercel", "Google Calendar", "Velite"],
      side: "right",
    },
    {
      year: "2024",
      period: "2024-06 → 2025-03",
      title: "Delta Electronics",
      subtitle: "Senior Software Engineer",
      icon: <Briefcase className="w-4 h-4" weight="bold" />,
      color: "from-orange-500 to-amber-500",
      descriptions: [
        "Refactored Java project to .NET Core 8 with K8s deployment",
        "Integrated SAP for enterprise data exchange",
        "Built monitoring infrastructure (Prometheus + Grafana)",
        "System performance optimization & tech debt reduction",
      ],
      tags: [".NET Core 8", "K8s", "SAP", "Prometheus", "Java"],
      side: "left",
    },
    {
      year: "2024",
      period: "2024",
      title: "Resume 2024 — Vue 3 Portfolio",
      subtitle: "Business-oriented portfolio design",
      icon: <Code className="w-4 h-4" weight="bold" />,
      color: "from-emerald-500 to-teal-500",
      descriptions: [
        "Business-oriented portfolio design",
        "Brand cohesion & project value presentation",
        "Information hierarchy & visual rhythm",
      ],
      tags: ["Vue 3", "UI/UX", "Tailwind CSS"],
      side: "right",
    },
    {
      year: "2023",
      period: "2023-09 → 2024-05",
      title: "CTBC Bank (Personal Banking)",
      subtitle: "Software Engineer",
      icon: <Buildings className="w-4 h-4" weight="bold" />,
      color: "from-rose-500 to-pink-500",
      descriptions: [
        "Internal system development for personal banking division",
        "Insurance agency system development & optimization",
        "Development & deployment on OpenShift Container Platform",
        "Microservices architecture migration",
      ],
      tags: [".NET", "OCP", "K8s", "Banking"],
      side: "left",
    },
    {
      year: "2021",
      period: "2021-03 → 2023-02",
      title: "91APP",
      subtitle: "Senior Software Engineer",
      icon: <Buildings className="w-4 h-4" weight="bold" />,
      color: "from-sky-500 to-blue-500",
      descriptions: [
        "Push notification microservices architecture & development",
        "3-5M hourly push notifications throughput",
        "Hybrid cloud with EKS + GCP + RabbitMQ + SQS",
        "High-traffic system operation & performance tuning",
      ],
      tags: ["EKS", "RabbitMQ", "SQS", "GCP", "Microservices"],
      side: "right",
    },
    {
      year: "2021",
      period: "2021",
      title: "Resume 2021 — Angular Portfolio",
      subtitle: "Skill-oriented portfolio",
      icon: <Code className="w-4 h-4" weight="bold" />,
      color: "from-emerald-500 to-teal-500",
      descriptions: [
        "Tech & design experience from AURORA tenure",
        "Modular frontend architecture, PayPal integration",
      ],
      tags: ["Angular", "PayPal", "Sass"],
      side: "left",
    },
    {
      year: "2019",
      period: "2019-12 → 2021-03",
      title: "AURORA Group (震旦集團)",
      subtitle: "Senior Software Engineer",
      icon: <Briefcase className="w-4 h-4" weight="bold" />,
      color: "from-indigo-500 to-violet-500",
      descriptions: [
        "Modernized VB .NET legacy to .NET Framework 4.7",
        "Frontend-backend separation (Angular + .NET Web API)",
        "Implemented CI/CD automated deployment",
        "Power BI reporting & Checkmarx security scanning",
      ],
      tags: ["Angular", ".NET", "Power BI", "CI/CD"],
      side: "right",
    },
    {
      year: "2019",
      period: "2019",
      title: "Resume 2019 — Motion Portfolio",
      subtitle: "Master's student portfolio",
      icon: <Code className="w-4 h-4" weight="bold" />,
      color: "from-emerald-500 to-teal-500",
      descriptions: [
        "JS/CSS animated portfolio built during graduate school",
        "Focused on interaction details & dynamic presentation",
      ],
      tags: ["VanillaJS", "CSS Animation", "Sass", "Gulp"],
      side: "left",
    },
    {
      year: "2018",
      period: "2018-07",
      title: "NCTU — Institute of Molecular Medicine & Bioengineering",
      subtitle: "M.S. Graduated (GPA 3.98)",
      icon: <GraduationCap className="w-4 h-4" weight="bold" />,
      color: "from-green-500 to-emerald-500",
      descriptions: [
        "Cross-disciplinary pivot from Food Science to CS",
        "Bioinformatics analysis using R / Python",
        "Thesis: CKD diagnostic tool development",
        "Built full-stack projects recognized by professors",
      ],
      tags: ["NCTU", "Python", "R", "Bioinformatics"],
      side: "right",
    },
    {
      year: "2012",
      period: "2012-09",
      title: "NTOU — Department of Food Science",
      subtitle: "B.S. Graduated (GPA 3.74)",
      icon: <GraduationCap className="w-4 h-4" weight="bold" />,
      color: "from-slate-500 to-slate-600",
      descriptions: [
        "Scientific research methodology foundation",
        "Self-taught HTML/CSS/JS - start of programming journey",
      ],
      tags: ["NTOU", "Food Science", "Self-learning"],
      side: "left",
    },
  ],
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] as const } },
};

export default function PathPage() {
  const { locale } = useLanguage();
  const data = milestones[locale] || milestones["en"];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] as const }}
        className="mb-10 sm:mb-14"
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-semibold tracking-wider uppercase rounded-full glass-card-strong text-violet-600 dark:text-violet-400">
            <Sparkle className="w-3 h-3" weight="fill" />
            {locale === "zh-TW" ? "2012 — 2026" : "2012 — 2026"}
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
          {locale === "zh-TW" ? "Growth Archive" : "Career Archive"}
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl leading-relaxed">
          {locale === "zh-TW"
            ? "從海大食品系一路打到中信法金 AI — 每一次轉職都是技能樹重配點。"
            : "From NTOU to CTBC Corporate Banking AI Senior Architect — every transition is a skill tree respec."}
        </p>
      </motion.div>

      {/* Timeline */}
      <div className="relative">
        <div className="absolute left-[19px] sm:left-1/2 top-4 bottom-4 w-px bg-gradient-to-b from-violet-500/50 via-blue-500/50 to-emerald-500/50 sm:-translate-x-px" />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-10 sm:space-y-14"
        >
          {data.map((milestone, index) => {
            const isLeft = milestone.side === "left";

            return (
              <motion.div key={`${milestone.year}-${index}`} variants={itemVariants} className="relative flex flex-col sm:flex-row items-start gap-4 sm:gap-0">

                {/* Desktop: Year */}
                <div className={`hidden sm:flex sm:w-1/2 ${isLeft ? "sm:justify-end sm:pr-10 order-1" : "sm:pl-10 order-2"}`}>
                  <div className={`flex flex-col ${isLeft ? "items-end text-right" : "items-start text-left"}`}>
                    <span className="text-4xl sm:text-5xl font-black tracking-tighter text-slate-200 dark:text-slate-800 select-none leading-none">
                      {milestone.year}
                    </span>
                    {milestone.period && (
                      <span className="text-[11px] text-slate-400 dark:text-slate-600 mt-1 font-medium">{milestone.period}</span>
                    )}
                  </div>
                </div>

                {/* Node */}
                <div className="absolute left-0 sm:left-1/2 top-1 sm:-translate-x-1/2 z-10">
                  <div className={`w-[38px] h-[38px] rounded-xl bg-gradient-to-br ${milestone.color} flex items-center justify-center text-white shadow-lg ring-4 ring-white dark:ring-slate-950 ${milestone.isActive ? "animate-pulse shadow-violet-500/30" : ""}`}>
                    {milestone.icon}
                  </div>
                </div>

                {/* Mobile period */}
                <div className="sm:hidden flex items-center gap-2 mb-1 ml-[52px]">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{milestone.year}</span>
                  {milestone.period && (
                    <>
                      <span className="text-slate-600">·</span>
                      <span className="text-[10px] text-slate-500">{milestone.period}</span>
                    </>
                  )}
                </div>

                {/* Content */}
                <div className={`w-full sm:w-1/2 ${isLeft ? "sm:pr-10 order-2" : "sm:pl-10 order-1"} ml-[52px] sm:ml-0`}>
                  <div className={`gradient-border-card glass-card rounded-2xl p-5 sm:p-6 hover:-translate-y-0.5 transition-all duration-300 ${milestone.isActive ? "ring-1 ring-violet-500/20 dark:ring-violet-400/20" : ""}`}>
                    {milestone.isActive && (
                      <div className="flex items-center gap-1.5 mb-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping glow-dot" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                          {locale === "zh-TW" ? "Online" : "Current"}
                        </span>
                      </div>
                    )}

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
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] as const }}
        className="mt-12 sm:mt-16 glass-card-strong rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
      >
        <div>
          <h3 className="text-sm font-bold mb-1">
            {locale === "zh-TW" ? "Next Lab, ++?" : "Ready for the next level?"}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {locale === "zh-TW" ? "來聊聊 — 你的下一步值得更好的規劃。" : "Book a slot and let's discuss your next chapter."}
          </p>
        </div>
        <Link href="/booking">
          <button className="shrink-0 px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-semibold hover:opacity-90 transition-all active:scale-95 flex items-center gap-2 shadow-lg shadow-slate-900/20 dark:shadow-white/10">
            <CalendarCheck className="w-4 h-4" weight="bold" />
            {locale === "zh-TW" ? "++ 組隊" : "Book Now"}
          </button>
        </Link>
      </motion.div>
    </div>
  );
}
