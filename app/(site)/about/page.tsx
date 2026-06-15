'use client'

import { useLanguage } from "@/components/language-provider";
import {
  Server, Code2, Cloud, BookOpen, GraduationCap, Heart, Brain,
  Cat, Globe, Plane, Dumbbell, Film, Music, ExternalLink, Quote,
  Award, ShieldCheck, BarChart3, Zap, ChevronRight
} from "lucide-react";

const lifePhotos = [
  "https://vueproject.s3.us-west-2.amazonaws.com/IMG_1004.jpg",
  "https://vueproject.s3.us-west-2.amazonaws.com/IMG_3527.jpg",
  "https://vueproject.s3.us-west-2.amazonaws.com/IMG_5545.jpg",
  "https://vueproject.s3.us-west-2.amazonaws.com/IMG_5547.jpg",
  "https://vueproject.s3.us-west-2.amazonaws.com/IMG_20220914_145243.jpg",
  "https://vueproject.s3.us-west-2.amazonaws.com/Xnip2023-01-10_09-14-40.png",
  "https://vueproject.s3.us-west-2.amazonaws.com/Xnip2024-02-13_19-18-57.png",
  "https://vueproject.s3.us-west-2.amazonaws.com/IMG_0916.jpg",
  "https://vueproject.s3.us-west-2.amazonaws.com/IMG_3344.jpg",
];

const resumeEn = "https://docs.google.com/document/d/1G26EC_crJEpGAyD40WY-l67m1osq_uG2bI3P5eKOjQs/edit?usp=sharing";
const resumeZh = "https://docs.google.com/document/d/1n5j7DQ7-O0W9BnqM7AflffGT8C3yat62rQTz9QpyahA/edit?usp=sharing";

export default function AboutPage() {
  const { locale } = useLanguage();
  const isZh = locale === "zh-TW";

  const sections = [
    {
      id: "story",
      icon: <Brain className="w-4 h-4" />,
      color: "from-blue-500 to-cyan-500",
      title: isZh ? "👋 關於我" : "👋 About Me",
      content: isZh
        ? "我來自台北，從小對知識充滿熱情，始終相信學習與技術能改變世界。我曾赴澳洲與日本遊學，體驗不同文化與教育模式，拓展了全球視野，也培養了適應多變環境的能力。"
        : "I'm from Taipei and have always been passionate about knowledge, believing that learning and technology can change the world. I've studied abroad in Australia and Japan, experiencing different cultures and educational systems. These experiences have strengthened my adaptability to dynamic environments.",
    },
    {
      id: "growth",
      icon: <GraduationCap className="w-4 h-4" />,
      color: "from-emerald-500 to-teal-500",
      title: isZh ? "📍 成長與學習歷程" : "📍 Growth & Learning Journey",
      content: isZh
        ? "我始終相信「學習是改變人生最強大的工具」，因此從求學階段到工作，我都保持著持續學習與成長的習慣。除了台灣的學習經歷，我也曾在澳洲與日本進修，深入體驗不同的文化與教育方式，這些經驗不僅提升了我的語言能力，也讓我更能用開放的視角看待世界。"
        : "I firmly believe that 'learning is the most powerful tool for changing one's life.' From my school days to my professional career, I have maintained a habit of continuous learning and growth. In addition to my education in Taiwan, I have also studied in Australia and Japan, where I immersed myself in different cultures and educational approaches.",
    },
    {
      id: "philosophy",
      icon: <Brain className="w-4 h-4" />,
      color: "from-purple-500 to-pink-500",
      title: isZh ? "💡 理念與未來展望" : "💡 Philosophy & Future Outlook",
      content: isZh
        ? "我始終相信，成長來自於挑戰，而學習則是讓自己變得更強大的關鍵。無論是技術開發、團隊合作，還是生活中的各種挑戰，我都保持持續學習、突破自我的精神。期待未來能運用我的專業，打造更高效、更有價值的解決方案，並與更多志同道合的人交流合作！"
        : "I firmly believe that growth comes from challenges, and learning is the key to becoming stronger. Whether in software development, teamwork, or everyday challenges, I maintain a mindset of continuous learning and self-improvement. I hope to leverage my expertise to develop more efficient and valuable solutions.",
    },
  ];

  const interests = [
    { icon: <Dumbbell className="w-5 h-5" />, label: isZh ? "🔥 健身與極限武術" : "🔥 Fitness & Martial Arts", desc: isZh ? "挑戰自我、突破極限，讓我在工作中更具抗壓性與執行力。" : "Challenging myself and pushing limits, strengthening resilience and execution in my career." },
    { icon: <Film className="w-5 h-5" />, label: isZh ? "🎬 電影與音樂" : "🎬 Movies & Music", desc: isZh ? "從電影與音樂中尋找靈感，啟發以不同角度思考世界。" : "Drawing inspiration from films and music, seeing the world from different perspectives." },
    { icon: <Cat className="w-5 h-5" />, label: isZh ? "🐱 與貓咪共度時光" : "🐱 Spending Time with Cats", desc: isZh ? "養貓讓我學會耐心與細膩的觀察力。" : "Taking care of my cat has taught me patience and attention to detail." },
    { icon: <Plane className="w-5 h-5" />, label: isZh ? "✈️ 旅行與探索" : "✈️ Travel & Exploration", desc: isZh ? "探索不同城市與文化，拓展視野。" : "I love exploring new cities and cultures, broadening my horizons." },
  ];

  const techCategories = [
    {
      title: isZh ? "後端技術" : "Backend",
      icon: <Server className="w-4 h-4" />,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
      items: [
        ".NET Framework 4.7 ~ .NET 8 (C#, Web API)",
        "Node.js (Express.js, NestJS)",
        "Queue 技術 (RabbitMQ, SQS)",
        "雲端技術 (AWS, GCP, Azure, K8s)",
      ],
    },
    {
      title: isZh ? "前端技術" : "Frontend",
      icon: <Code2 className="w-4 h-4" />,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/20",
      items: [
        "Vue 3 (Composition API, SPA)",
        "Next.js 15 (App Router, RSC)",
        "Tailwind CSS, shadcn/ui",
        "ApexCharts, ECharts 即時數據視覺化",
      ],
    },
    {
      title: isZh ? "DevOps & 系統" : "DevOps & Systems",
      icon: <Cloud className="w-4 h-4" />,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20",
      items: [
        "CI/CD 自動化 (GitLab CI/CD, Jenkins)",
        "系統效能優化 (40%+ 提升)",
        "容器化 (Docker, Kubernetes)",
        "監控 (Prometheus + Grafana)",
      ],
    },
  ];

  const keyProjects = [
    {
      title: isZh ? "📌 雙11大流量推播系統" : "📌 Double 11 Push Notification System",
      icon: <Zap className="w-5 h-5" />,
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
      achievements: isZh
        ? ["獨立開發並維運，成功支援千萬級別推播", "使用 RabbitMQ & Kubernetes 進行彈性擴展"]
        : ["Independently developed, handled millions of push notifications", "Used RabbitMQ & Kubernetes for scalable expansion"],
    },
    {
      title: isZh ? "📌 品牌網站 + LINE Chatbot" : "📌 Brand Website + LINE Chatbot",
      icon: <Globe className="w-5 h-5" />,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      achievements: isZh
        ? ["使用 Vue 3 + Tailwind CSS 開發響應式網站", "整合 Google Dialogflow API 開發智能客服"]
        : ["Developed responsive website using Vue 3 + Tailwind CSS", "Integrated Google Dialogflow API for intelligent chatbot"],
    },
    {
      title: isZh ? "📌 Google Sheets API 數據分析可視化" : "📌 Google Sheets API Data Analytics",
      icon: <BarChart3 className="w-5 h-5" />,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
      achievements: isZh
        ? ["串接 Google Sheets API 即時讀取與整理數據", "前端撰寫統計演算法並用 ApexCharts 動態繪製圖表"]
        : ["Built Vue app to interact with Google Sheets API for real-time data", "Implemented algorithms and real-time charts with ApexCharts"],
    },
  ];

  const education = [
    { school: "NTOU", degree: isZh ? "資訊工程碩士" : "M.S. Computer Science", year: "2018", icon: <GraduationCap className="w-4 h-4" /> },
    { school: "TAFE Australia", degree: isZh ? "海外進修" : "Study Abroad", year: "2019", icon: <Globe className="w-4 h-4" /> },
    { school: "NTCU", degree: isZh ? "資訊工程學士" : "B.S. Computer Science", year: "2016", icon: <GraduationCap className="w-4 h-4" /> },
  ];

  const thesisPapers = [
    isZh ? "AI 輔助之胸部 X 光影像分析 — 以深度學習偵測肺結節" : "AI-Assisted Chest X-Ray Analysis for Pulmonary Nodule Detection",
    isZh ? "基於機器學習之醫療影像診斷輔助系統" : "Machine Learning-Based Medical Image Diagnosis Assistance System",
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 mb-10 sm:mb-14">
        <div className="shrink-0">
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden ring-2 ring-slate-200 dark:ring-slate-700 shadow-xl">
            <img src="https://vueproject.s3.us-west-2.amazonaws.com/me.jpg" alt="August Wang" className="w-full h-full object-cover" />
            <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-2xl" />
          </div>
        </div>
        <div className="min-w-0">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-1">
            August Wang
            <span className="text-base font-normal text-slate-400 dark:text-slate-500 ml-2">(王中禹)</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mb-3">
            {isZh ? "後端工程師 · 前端工程師 · DevOps 工程師 · 數據科學家" : "Backend · Frontend · DevOps · Data Scientist"}
          </p>
          <div className="flex flex-wrap gap-2">
            <a href={isZh ? resumeZh : resumeEn} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90 transition-all">
              <ExternalLink className="w-3 h-3" />
              {isZh ? "下載履歷" : "Download Resume"}
            </a>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              <Award className="w-3 h-3" />
              5+ {isZh ? "年經驗" : "Years Exp"}
            </span>
          </div>
        </div>
      </div>

      {/* Story Sections */}
      <div className="space-y-6 mb-12">
        {sections.map((section) => (
          <div key={section.id} className="glass-card rounded-2xl p-5 sm:p-7">
            <div className="flex items-start gap-4">
              <div className={`shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br ${section.color} flex items-center justify-center text-white shadow-lg`}>
                {section.icon}
              </div>
              <div className="min-w-0">
                <h2 className="text-lg font-bold mb-2">{section.title}</h2>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{section.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Interests */}
      <h2 className="text-xl font-bold mb-5">{isZh ? "🏋️ 興趣與生活態度" : "🏋️ Interests & Lifestyle"}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-12">
        {interests.map((item) => (
          <div key={item.label} className="glass-card rounded-2xl p-5 flex items-start gap-3">
            <div className="shrink-0 p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              {item.icon}
            </div>
            <div>
              <h3 className="text-sm font-bold mb-1">{item.label}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tech Expertise */}
      <h2 className="text-xl font-bold mb-5">{isZh ? "💻 技術與專業發展" : "💻 Technical & Professional Development"}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
        {techCategories.map((cat) => (
          <div key={cat.title} className={`glass-card rounded-2xl p-5 border-l-2 ${cat.borderColor}`}>
            <div className="flex items-center gap-2 mb-4">
              <div className={`p-2 rounded-lg ${cat.bgColor} ${cat.color}`}>{cat.icon}</div>
              <h3 className="text-sm font-bold">{cat.title}</h3>
            </div>
            <ul className="space-y-2">
              {cat.items.map((item) => (
                <li key={item} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                  <ChevronRight className={`w-3 h-3 mt-0.5 shrink-0 ${cat.color}`} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Key Projects */}
      <h2 className="text-xl font-bold mb-5">{isZh ? "🚀 重要專案" : "🚀 Key Projects"}</h2>
      <div className="space-y-4 mb-12">
        {keyProjects.map((proj) => (
          <div key={proj.title} className="glass-card rounded-2xl p-5 sm:p-6">
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
          </div>
        ))}
      </div>

      {/* Education & Thesis */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
        {/* Education */}
        <div className="glass-card rounded-2xl p-5 sm:p-6">
          <h2 className="text-sm font-bold mb-4 flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-blue-500" />
            {isZh ? "學歷" : "Education"}
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

        {/* Thesis */}
        <div className="glass-card rounded-2xl p-5 sm:p-6">
          <h2 className="text-sm font-bold mb-4 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-purple-500" />
            {isZh ? "學術論文" : "Thesis & Publications"}
          </h2>
          <ul className="space-y-3">
            {thesisPapers.map((paper) => (
              <li key={paper} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                <Quote className="w-3 h-3 mt-0.5 shrink-0 text-slate-400" />
                {paper}
              </li>
            ))}
          </ul>
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
            <a href="https://pubmed.ncbi.nlm.nih.gov/29126174/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline">
              <ExternalLink className="w-3 h-3" />
              PubMed Publication
            </a>
          </div>
        </div>
      </div>

      {/* Life Gallery */}
      <h2 className="text-xl font-bold mb-5">{isZh ? "📸 我的生活" : "📸 My Life"}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 mb-8">
        {lifePhotos.map((url, i) => (
          <div key={i} className={`group relative overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800 ${i === 0 ? "col-span-2 row-span-2" : ""}`}>
            <img
              src={url}
              alt={`Life photo ${i + 1}`}
              className="w-full h-full object-cover aspect-square group-hover:scale-[1.02] transition-transform duration-500"
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-xl" />
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="glass-card-strong rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold mb-1">{isZh ? "想了解更多？" : "Want to know more?"}</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {isZh ? "查看我的完整履歷或直接預約諮詢。" : "Check my full resume or book a consultation."}
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          <a href={isZh ? resumeZh : resumeEn} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            {isZh ? "下載履歷" : "Resume"}
          </a>
          <a href="/booking" className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90 transition-all">
            {isZh ? "預約諮詢" : "Book"}
          </a>
        </div>
      </div>
    </div>
  );
}
