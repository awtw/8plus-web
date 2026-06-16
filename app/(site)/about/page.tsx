'use client'

import { useLanguage } from "@/components/language-provider";
import { motion } from "framer-motion";
import {
  ComputerTower, Code, Cloud, BookOpen, GraduationCap, Brain,
  Cat, Globe, Airplane, Barbell, FilmStrip, Quotes,
  Medal, Lightning, CaretRight, Robot, Sparkle
} from "@phosphor-icons/react";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] as const } },
};

export default function AboutPage() {
  const { locale } = useLanguage();
  const isZh = locale === "zh-TW";

  const sections = [
    {
      id: "story",
      icon: <Brain className="w-4 h-4" weight="bold" />,
      color: "from-blue-500 to-cyan-500",
      title: isZh ? "這傢伙" : "Who dis",
      content: isZh
        ? "台北人，對知識有病的熱情，相信技術能改變世界。去過澳洲跟日本遊學，體驗過不同文化跟教育模式，眼界開了，適應力也練起來了。從食品科學一路歪到資訊工程，再到現在搞 AI 架構 — 人生就是不斷跨界。"
        : "Taipei-born, pathologically passionate about learning. Tech can change the world — I stand by that. Studied abroad in Australia and Japan, which broadened my horizons and built my adaptability. Went from Food Science to CS to AI Architecture — life is about crossing boundaries.",
    },
    {
      id: "growth",
      icon: <GraduationCap className="w-4 h-4" weight="bold" />,
      color: "from-emerald-500 to-teal-500",
      title: isZh ? "進化史" : "Evolution",
      content: isZh
        ? "堅信「學習是改變人生最強的工具」。從海大食品系自學程式，到交大分子醫學所跨領域轉職，再到業界打滾八年 — 每一階段都是技能樹重配點。去澳洲跟日本進修不只是學語言，是學會用不同角度看世界。"
        : "I firmly believe that learning is the most powerful tool for changing your life. Self-taught coding from Food Science at NTOU, pivoted to CS at NCTU, then 8+ years in the industry — every stage was a skill tree respec. Studied in Australia and Japan not just for language, but for new perspectives.",
    },
    {
      id: "philosophy",
      icon: <Sparkle className="w-4 h-4" weight="fill" />,
      color: "from-purple-500 to-pink-500",
      title: isZh ? "接下來想幹嘛" : "What's Next",
      content: isZh
        ? "成長來自於挑戰，學習是變強的唯一捷徑。不管技術開發、團隊協作還是生活中各種鳥事，保持學習、突破自我就對了。接下來想用這些年累積的經驗，打造更高效、更有價值的解決方案，順便多認識一些有趣的人。"
        : "Growth comes from challenges, learning is the only shortcut. Whether it's dev, teamwork, or life's curveballs — keep learning, keep pushing. Next up: leverage years of experience to build efficient, valuable solutions, and meet cool people along the way.",
    },
  ];

  const interests = [
    { icon: <Barbell className="w-5 h-5" weight="bold" />, label: isZh ? "健身 & 極限武術" : "Fitness & Martial Arts", desc: isZh ? "練的是身體，磨的是心性。抗壓性跟執行力都是這樣來的。" : "Building body and mind. Resilience and execution come from the grind." },
    { icon: <FilmStrip className="w-5 h-5" weight="bold" />, label: isZh ? "電影 & 音樂" : "Movies & Music", desc: isZh ? "從影像跟旋律中找靈感，換個角度思考世界。" : "Finding inspiration in visuals and sound, seeing the world from different angles." },
    { icon: <Cat className="w-5 h-5" weight="bold" />, label: isZh ? "貓奴日常" : "Cat Dad", desc: isZh ? "養貓教會我耐心，還有細膩的觀察力（跟清貓砂的覺悟）。" : "My cat taught me patience, attention to detail, and the art of litter box duty." },
    { icon: <Airplane className="w-5 h-5" weight="bold" />, label: isZh ? "旅行 & 探索" : "Travel & Explore", desc: isZh ? "每座城市都是一本活教科書。走出去，世界比你想像的大。" : "Every city is a living textbook. Go out there — the world is bigger than you think." },
  ];

  const roleSubtitle = isZh
    ? "AI 架構師 · 後端工程師 · 前端工程師 · DevOps 工程師 · 數據科學家"
    : "AI Architect · Backend Engineer · Frontend Engineer · DevOps Engineer · Data Scientist";

  const techCategories = [
    {
      title: isZh ? "後端" : "Backend",
      icon: <ComputerTower className="w-4 h-4" weight="bold" />,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
      items: isZh
        ? [
            ".NET Framework 4.7 ~ .NET 8 (C#, Web API)",
            "Node.js (Express.js, NestJS)",
            "Queue 技術 (RabbitMQ, SQS)",
            "雲端技術 (AWS, GCP, Azure, K8s)",
          ]
        : [
            ".NET Framework 4.7 ~ .NET 8 (C#, Web API)",
            "Node.js (Express.js, NestJS)",
            "Queue (RabbitMQ, SQS)",
            "Cloud (AWS, GCP, Azure, K8s)",
          ],
    },
    {
      title: isZh ? "前端" : "Frontend",
      icon: <Code className="w-4 h-4" weight="bold" />,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/20",
      items: isZh
        ? [
            "Vue 3 (Composition API, SPA)",
            "Next.js 15 (App Router, RSC)",
            "Tailwind CSS, shadcn/ui",
            "ApexCharts, ECharts 即時數據視覺化",
          ]
        : [
            "Vue 3 (Composition API, SPA)",
            "Next.js 15 (App Router, RSC)",
            "Tailwind CSS, shadcn/ui",
            "ApexCharts, ECharts real-time data visualization",
          ],
    },
    {
      title: isZh ? "DevOps & 系統" : "DevOps & Systems",
      icon: <Cloud className="w-4 h-4" weight="bold" />,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20",
      items: isZh
        ? [
            "CI/CD 自動化 (GitLab CI/CD, Jenkins)",
            "系統效能優化 (40%+ 提升)",
            "容器化 (Docker, Kubernetes)",
            "監控 (Prometheus + Grafana)",
          ]
        : [
            "CI/CD automation (GitLab CI/CD, Jenkins)",
            "Performance optimization (40%+ improvement)",
            "Containerization (Docker, Kubernetes)",
            "Monitoring (Prometheus + Grafana)",
          ],
    },
  ];

  const keyProjects = [
    {
      title: isZh ? "中信法金 AI 平台" : "CTBC AI Platform",
      icon: <Robot className="w-5 h-5" weight="bold" />,
      color: "text-violet-500",
      bgColor: "bg-violet-500/10",
      achievements: isZh
        ? ["設計 AI Platform 整體架構，支援 RAG Flow 與 AI Agent 協作", "開發知識工程系統，實現上下文工程與 prompt 管理"]
        : ["Designed AI Platform architecture supporting RAG Flow & AI Agent orchestration", "Built Knowledge Engineering system for context engineering & prompt management"],
    },
    {
      title: isZh ? "雙11大流量推播系統" : "Double 11 Push Notification System",
      icon: <Lightning className="w-5 h-5" weight="bold" />,
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
      achievements: isZh
        ? ["獨立開發並維運，成功支援千萬級別推播", "使用 RabbitMQ & Kubernetes 進行彈性擴展"]
        : ["Independently developed, handled millions of push notifications", "Used RabbitMQ & Kubernetes for scalable expansion"],
    },
    {
      title: isZh ? "品牌網站 + LINE Chatbot" : "Brand Website + LINE Chatbot",
      icon: <Globe className="w-5 h-5" weight="bold" />,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      achievements: isZh
        ? ["使用 Vue 3 + Tailwind CSS 開發響應式網站", "整合 Google Dialogflow API 開發智能客服"]
        : ["Developed responsive website using Vue 3 + Tailwind CSS", "Integrated Google Dialogflow API for intelligent chatbot"],
    },
  ];

  const education = [
    {
      school: isZh ? "NCTU 交通大學" : "NCTU (National Chiao Tung University)",
      degree: isZh ? "分子醫學與生物工程研究所 碩士" : "M.S. Molecular Medicine & Bioengineering",
      year: "2018",
      icon: <GraduationCap className="w-4 h-4" weight="bold" />,
    },
    {
      school: isZh ? "NTOU 海洋大學" : "NTOU (National Taiwan Ocean University)",
      degree: isZh ? "食品科學系 學士" : "B.S. Food Science",
      year: "2012",
      icon: <GraduationCap className="w-4 h-4" weight="bold" />,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] as const }}
        className="flex flex-col sm:flex-row gap-6 sm:gap-10 mb-10 sm:mb-14"
      >
        <div className="shrink-0">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-violet-500 via-blue-500 to-emerald-500 flex items-center justify-center text-white text-3xl sm:text-4xl font-bold shadow-xl ring-2 ring-white/50 dark:ring-slate-700">
            AW
          </div>
        </div>
        <div className="min-w-0">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-1">
            August Wang
          </h1>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mb-3">
            {roleSubtitle}
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              <Medal className="w-3 h-3" weight="bold" />
              8+ {isZh ? "年實戰" : "Years Exp"}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Story Sections */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-6 mb-12"
      >
        {sections.map((section) => (
          <motion.div key={section.id} variants={itemVariants} className="gradient-border-card glass-card rounded-2xl p-5 sm:p-7">
            <div className="flex items-start gap-4">
              <div className={`shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br ${section.color} flex items-center justify-center text-white shadow-lg`}>
                {section.icon}
              </div>
              <div className="min-w-0">
                <h2 className="text-lg font-bold mb-2">{section.title}</h2>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{section.content}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Interests */}
      <h2 className="text-xl font-bold mb-5">{isZh ? "日常 · 碼農以外" : "Life Outside Code"}</h2>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-12"
      >
        {interests.map((item) => (
          <motion.div key={item.label} variants={itemVariants} className="gradient-border-card glass-card rounded-2xl p-5 flex items-start gap-3">
            <div className="shrink-0 p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              {item.icon}
            </div>
            <div>
              <h3 className="text-sm font-bold mb-1">{item.label}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Tech Expertise */}
      <h2 className="text-xl font-bold mb-5">{isZh ? "工具箱" : "Tech Stack"}</h2>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12"
      >
        {techCategories.map((cat) => (
          <motion.div key={cat.title} variants={itemVariants} className={`gradient-border-card glass-card rounded-2xl p-5 border-l-2 ${cat.borderColor}`}>
            <div className="flex items-center gap-2 mb-4">
              <div className={`p-2 rounded-lg ${cat.bgColor} ${cat.color}`}>{cat.icon}</div>
              <h3 className="text-sm font-bold">{cat.title}</h3>
            </div>
            <ul className="space-y-2">
              {cat.items.map((item) => (
                <li key={item} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                  <CaretRight className={`w-3 h-3 mt-0.5 shrink-0 ${cat.color}`} weight="bold" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>

      {/* Key Projects */}
      <h2 className="text-xl font-bold mb-5">{isZh ? "Archive" : "Archive"}</h2>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="space-y-4 mb-12"
      >
        {keyProjects.map((proj) => (
          <motion.div key={proj.title} variants={itemVariants} className="gradient-border-card glass-card rounded-2xl p-5 sm:p-6">
            <div className="flex items-start gap-3 mb-3">
              <div className={`shrink-0 p-2.5 rounded-xl ${proj.bgColor} ${proj.color}`}>
                {proj.icon}
              </div>
              <h3 className="text-base font-bold pt-0.5">{proj.title}</h3>
            </div>
            <ul className="space-y-1.5 ml-10">
              {proj.achievements.map((ach) => (
                <li key={ach} className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 flex items-start gap-2">
                  <span className="text-slate-400 mt-1.5 w-1 h-1 rounded-full bg-slate-400 shrink-0" />
                  {ach}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>

      {/* Education */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] as const }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12"
      >
        <div className="gradient-border-card glass-card rounded-2xl p-5 sm:p-6">
          <h2 className="text-sm font-bold mb-4 flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-blue-500" weight="bold" />
            {isZh ? "教育背景" : "Education"}
          </h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={`${edu.school}-${edu.degree}`} className="flex items-start gap-3">
                <div className="shrink-0 p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                  {edu.icon}
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-bold">{edu.school}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">{edu.degree}</div>
                  <div className="text-[10px] text-slate-400 dark:text-slate-500">{edu.year}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="gradient-border-card glass-card rounded-2xl p-5 sm:p-6">
          <h2 className="text-sm font-bold mb-4 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-purple-500" weight="bold" />
            {isZh ? "Research Archive" : "Research Archive"}
          </h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              <Quotes className="w-3 h-3 mt-0.5 shrink-0 text-slate-400" weight="bold" />
              {isZh ? "慢性腎臟病檢驗工具開發與生物資訊分析" : "Chronic Kidney Disease Diagnostic Tool & Bioinformatics Analysis"}
            </li>
          </ul>
        </div>
      </motion.div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] as const }}
        className="glass-card-strong rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
      >
        <div>
          <h3 className="text-sm font-bold mb-1">{isZh ? "Book a Slot" : "Book a Slot"}</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {isZh ? "直接約個時段，聊 Lab、架構或下一步。" : "Grab a slot and talk Lab, architecture, or what's next."}
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          <a href="/booking" className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90 transition-all">
            {isZh ? "約起來" : "Book"}
          </a>
        </div>
      </motion.div>
    </div>
  );
}
