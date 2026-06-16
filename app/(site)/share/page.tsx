'use client'

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  GithubLogo, ChatCircle, CalendarCheck, Compass,
  Check, Copy, Translate, QrCode, ArrowSquareOut
} from "@phosphor-icons/react";
import { useLanguage } from "@/components/language-provider";
import { Button } from "@/components/ui/button";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] as const } },
};

export default function SharePage() {
  const { locale, setLocale } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [showLineQR, setShowLineQR] = useState(false);
  const [showWeChatQR, setShowWeChatQR] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("alec.wang.tpe@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const socialLinks = [
    {
      name: "GitHub",
      icon: <GithubLogo className="w-5 h-5" weight="bold" />,
      url: "https://github.com/awtw",
      color: "hover:bg-neutral-800 hover:text-white dark:hover:bg-neutral-100 dark:hover:text-black",
      textColor: "text-neutral-700 dark:text-neutral-300",
      description: "Open Source · Side Projects",
      badge: "60+ repos"
    },
    {
      name: "LINE",
      icon: <ChatCircle className="w-5 h-5" weight="bold" />,
      url: "https://line.me/ti/p/SYT2wZ621C",
      color: "hover:bg-emerald-500 hover:text-white",
      textColor: "text-emerald-500",
      description: "直接密我 / Direct Message",
      isQR: true,
      onQRClick: () => setShowLineQR(true)
    },
    {
      name: "WeChat",
      icon: <QrCode className="w-5 h-5" weight="bold" />,
      url: "https://u.wechat.com/kG1kyipmafco0eLFnxNneqo",
      color: "hover:bg-green-500 hover:text-white",
      textColor: "text-green-500",
      description: "微信直連 / WeChat Direct",
      isQR: true,
      onQRClick: () => setShowWeChatQR(true)
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center py-6 px-4 relative overflow-hidden font-sans">

      <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] rounded-full bg-blue-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] right-[20%] w-[40%] h-[40%] rounded-full bg-emerald-500/5 blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] as const }}
        className="w-full max-w-md bg-slate-900/40 backdrop-blur-xl rounded-[2.5rem] border border-slate-800/80 p-6 md:p-8 shadow-2xl relative z-10"
      >

        {/* Top Bar */}
        <div className="flex justify-between items-center mb-8">
          <Link href="/">
            <Button variant="ghost" size="sm" className="rounded-full text-slate-400 hover:text-slate-200 hover:bg-slate-800/50">
              <Compass className="w-4 h-4 mr-1.5" weight="bold" />
              {locale === "zh-TW" ? "主站" : "Main Site"}
            </Button>
          </Link>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLocale(locale === "zh-TW" ? "en" : "zh-TW")}
            className="rounded-full text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
          >
            <Translate className="w-4 h-4 mr-1.5" weight="bold" />
            {locale === "zh-TW" ? "English" : "中文"}
          </Button>
        </div>

        {/* Profile */}
        <div className="flex flex-col items-center text-center mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] as const, delay: 0.1 }}
            className="relative mb-4 group"
          >
            <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt" />
            <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-violet-500 via-blue-500 to-emerald-500 flex items-center justify-center text-white text-4xl font-bold border-2 border-slate-950 shadow-lg">
              AW
            </div>
            <div className="absolute bottom-1 right-1 w-5 h-5 bg-emerald-500 border-[3px] border-slate-900 rounded-full flex items-center justify-center">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping glow-dot" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-2xl font-bold tracking-tight mb-1"
          >
            August Wang
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="text-slate-400 text-sm max-w-xs mb-4"
          >
            {locale === "zh-TW" ? "全棧 Builder · 架構師 · 接案體質" : "Full-Stack · Architect · Consulting"}
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.35 }}
            className="grid grid-cols-3 gap-2 w-full max-w-xs bg-slate-950/60 rounded-2xl p-3 border border-slate-800/50 mb-6 text-xs"
          >
            <div>
              <div className="text-blue-400 font-bold text-sm">8+ Yrs</div>
              <div className="text-slate-500 mt-0.5">{locale === "zh-TW" ? "年資" : "Exp"}</div>
            </div>
            <div className="border-x border-slate-800/50">
              <div className="text-purple-400 font-bold text-sm">C# & Vue</div>
              <div className="text-slate-500 mt-0.5">{locale === "zh-TW" ? "主力技" : "Core"}</div>
            </div>
            <div>
              <div className="text-emerald-400 font-bold text-sm">Vercel</div>
              <div className="text-slate-500 mt-0.5">{locale === "zh-TW" ? "部署流" : "Cloud"}</div>
            </div>
          </motion.div>

          {/* Primary CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="w-full"
          >
            <Link href="/booking" className="w-full">
              <button className="w-full relative py-3.5 px-6 rounded-2xl font-bold text-sm transition-all duration-300 transform active:scale-95 overflow-hidden group bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 hover:brightness-110 shadow-lg shadow-blue-500/10">
                <span className="relative z-10 flex items-center justify-center gap-2 text-white">
                  <CalendarCheck className="w-4 h-4 animate-bounce" weight="bold" />
                  {locale === "zh-TW" ? "約 coffee chat · 聊 Lab · 純交朋友也行" : "Book a Coffee Chat · Collab · Or Just Say Hi"}
                </span>
              </button>
            </Link>
          </motion.div>
        </div>

        {/* Email Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.45 }}
          onClick={copyEmail}
          className="flex items-center justify-between p-4 bg-slate-950/40 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all cursor-pointer mb-6 group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-slate-800/60 rounded-xl text-blue-400 group-hover:scale-110 transition-transform">
              <Copy className="w-5 h-5" weight="bold" />
            </div>
            <div className="text-left">
              <div className="text-xs text-slate-500 font-medium">Email</div>
              <div className="text-sm font-semibold text-slate-200 group-hover:text-blue-400 transition-colors">alec.wang.tpe@gmail.com</div>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-200">
            {copied ? <Check className="w-4 h-4 text-emerald-400" weight="bold" /> : <Copy className="w-4 h-4" weight="bold" />}
          </Button>
        </motion.div>

        {/* Links */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-3.5"
        >
          {socialLinks.map((link) => {
            const cardContent = (
              <div className="flex items-center justify-between p-4 w-full">
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 bg-slate-800/40 rounded-xl transition-all ${link.textColor}`}>
                    {link.icon}
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-bold text-slate-100">{link.name}</div>
                    <div className="text-xs text-slate-400 mt-0.5 line-clamp-1">{link.description}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {link.badge && (
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-slate-800 text-slate-400 rounded-full border border-slate-700/50">
                      {link.badge}
                    </span>
                  )}
                  {link.isQR ? (
                    <QrCode className="w-4 h-4 text-slate-500" weight="bold" />
                  ) : (
                    <ArrowSquareOut className="w-3.5 h-3.5 text-slate-500" weight="bold" />
                  )}
                </div>
              </div>
            );

            if (link.isQR) {
              return (
                <motion.div key={link.name} variants={itemVariants}>
                  <button
                    onClick={link.onQRClick}
                    className={`w-full bg-slate-950/20 hover:bg-slate-950/60 border border-slate-800/80 rounded-2xl flex items-center transition-all duration-300 hover:border-slate-700 hover:-translate-y-0.5 overflow-hidden ${link.color}`}
                  >
                    {cardContent}
                  </button>
                </motion.div>
              );
            }

            return (
              <motion.div key={link.name} variants={itemVariants}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full bg-slate-950/20 hover:bg-slate-950/60 border border-slate-800/80 rounded-2xl flex items-center transition-all duration-300 hover:border-slate-700 hover:-translate-y-0.5 overflow-hidden ${link.color}`}
                >
                  {cardContent}
                </a>
              </motion.div>
            );
          })}
        </motion.div>

        {/* LINE QR */}
        {showLineQR && (
          <div className="absolute inset-0 bg-slate-950/90 rounded-[2.5rem] flex flex-col items-center justify-center p-6 z-50 animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 text-center max-w-xs relative">
              <h3 className="font-bold text-lg mb-2 text-emerald-400">Add on LINE</h3>
              <p className="text-xs text-slate-400 mb-4">{locale === "zh-TW" ? "掃碼或直接加" : "Scan or add directly"}</p>
              <div className="bg-white p-3 rounded-2xl inline-block mb-4">
                <div className="w-44 h-44 bg-neutral-100 flex flex-col items-center justify-center text-slate-900 font-bold relative border border-neutral-200">
                  <div className="w-40 h-40 border-4 border-emerald-500 flex flex-col items-center justify-center text-center p-2 rounded">
                    <span className="text-xs text-slate-500">LINE ID</span>
                    <span className="text-emerald-600 text-sm">@SYT2wZ621C</span>
                    <span className="text-[10px] text-slate-400 mt-2">Scan with camera</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <a href="https://line.me/ti/p/SYT2wZ621C" target="_blank" rel="noopener noreferrer" className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 rounded-xl font-bold text-sm text-white">
                  {locale === "zh-TW" ? "直接開 LINE" : "Open LINE App"}
                </a>
                <Button variant="ghost" onClick={() => setShowLineQR(false)} className="text-slate-400 hover:text-slate-200">
                  {locale === "zh-TW" ? "返回" : "Close"}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* WeChat QR */}
        {showWeChatQR && (
          <div className="absolute inset-0 bg-slate-950/90 rounded-[2.5rem] flex flex-col items-center justify-center p-6 z-50 animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 text-center max-w-xs relative">
              <h3 className="font-bold text-lg mb-2 text-green-400">Add on WeChat</h3>
              <p className="text-xs text-slate-400 mb-4">{locale === "zh-TW" ? "掃碼加微信" : "Scan QR to add"}</p>
              <div className="bg-white p-3 rounded-2xl inline-block mb-4">
                <div className="w-44 h-44 bg-neutral-100 flex flex-col items-center justify-center text-slate-900 font-bold relative border border-neutral-200">
                  <div className="w-40 h-40 border-4 border-green-500 flex flex-col items-center justify-center text-center p-2 rounded">
                    <span className="text-xs text-slate-500">WeChat</span>
                    <span className="text-green-600 text-sm">August Wang</span>
                    <span className="text-[10px] text-slate-400 mt-2">Scan in WeChat</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Button onClick={() => setShowWeChatQR(false)} className="w-full py-2.5 bg-green-500 hover:bg-green-600 rounded-xl font-bold text-sm text-white">
                  {locale === "zh-TW" ? "知道了" : "Dismiss"}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="mt-8 pt-6 border-t border-slate-800/50 text-center"
        >
          <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold flex items-center justify-center gap-1">
            <span>AUG+</span>
            <span className="text-slate-700">|</span>
            <span>8PLUS Web Agent</span>
          </p>
          <p className="text-[9px] text-slate-600 mt-1">
            © 2026 August Wang. All Rights Reserved.
          </p>
        </motion.div>

      </motion.div>
    </div>
  );
}
