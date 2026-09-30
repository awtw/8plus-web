/* global React */
// 8plus.app v2 CI — the editorial scroll home. All copy is lifted
// from lib/content/home-sections.ts. Sections alternate blue↔orange;
// the hero is a magazine-style masthead; booking has a live slot picker.

const NS2 = window.Ds8plusDesignSystem_1b9e83;
const { Section, Button, Badge, Card, CardHeader, CardTitle, CardDescription, CardContent, Separator } = NS2;

const COPY = {
  zh: {
    hero: {
      tag: "8PLUS.APP · TRUST001", issue: "NO.01 — 2026",
      headline: ["AI 沒有魔法，只有工程", "對的架構，接住你的需求"],
      caption: "FIG.01 — TRUST HANDSHAKE", cue: "往下滾動，認識 8plus",
      pillars: [
        { mark: "A", title: "架構先行", desc: "系統邊界、技術選型、可擴展設計" },
        { mark: "B", title: "AI 導入", desc: "把 AI 嵌進真實流程，而非展示用" },
        { mark: "C", title: "落地體驗", desc: "雲地混合 × LLM／RAG 實際上線" },
      ],
      cta1: "預約諮詢", cta2: "看作品",
    },
    about: { eyebrow: "02 · STORY", title: "關於我", lead: "從生醫到全端與雲端 — 自學驅動的工程之路。", cta: "閱讀完整故事",
      summary: "大學讀生醫與化學，卻在自學裡找到對程式的熱情，一路轉進全端與雲端；在 SaaS 產品的實戰中累積架構觀，如今以自由接案協助團隊，把想法交付成真正可信、可維護的系統。",
      highlights: [ { k: "代表成就", v: "千萬級推播 · 30 分鐘送達" }, { k: "跨域轉職", v: "生醫 → 工程" }, { k: "SaaS 實戰", v: "產品級架構經驗" }, { k: "自由接案", v: "顧問 · 開發 · 設計" } ] },
    lab: { eyebrow: "03 · LAB", title: "作品集", cta: "查看全部作品" },
    path: { eyebrow: "04 · PATH", title: "學職涯歷程", lead: "從生醫到 AI 架構 — 每一步都在累積可信交付的能力。", cta: "查看完整歷程", items: [
      { year: "2026", period: "2026-02 → 至今", title: "中國信託（法金 AI）", sub: "高級架構師", desc: "AI Platform 與 RAG 架構設計、AI Agent 與知識工程落地，並參與大型架構開發與技術政策制定", tags: ["AI Platform", "RAG", "K8s"], active: true },
      { year: "2025", period: "2025-03 → 09", title: "優配科技 Universal Processing", sub: "資深軟體工程師", desc: "CRM／POS／分潤系統開發，跨國團隊交付", tags: [".NET", "React", "AWS"] },
      { year: "2024", period: "2024-06 → 2025-03", title: "台達電子", sub: "資深軟體工程師", desc: "", tags: [] },
      { year: "2021", period: "2021-03 → 2023-02", title: "91APP 九易宇軒", sub: "資深軟體工程師", desc: "電商 SaaS — 獨立打造千萬級推播架構、30 分鐘全量送達；SLA、藍綠部署、多租戶實戰", tags: ["SaaS", "千萬級推播", "藍綠部署"] },
      { year: "2018", period: "2018-07", title: "交大 分子醫學與生物工程所", sub: "碩士畢業 · GPA 3.98", desc: "從生醫跨入工程的起點", tags: ["R", "Python"] },
    ] },
    services: { eyebrow: "01 · SERVICES", title: "我能提供什麼", cta: "了解服務詳情", items: [
      { title: "程式架構諮詢", desc: "系統邊界、技術選型、可擴展與可維護的架構設計" },
      { title: "網站開發", desc: "Next.js 全端開發、生產級交付與迭代上線" },
      { title: "設計包案", desc: "從資訊架構到視覺語言的完整設計落地" },
      { title: "整體資訊規劃", desc: "內容模型、導覽 IA、轉換動線的系統性規劃" },
    ] },
    blog: { eyebrow: "05 · JOURNAL", title: "心法與思考", cta: "閱讀全部文章", read: "閱讀" },
    booking: { eyebrow: "06 · CONTACT / BOOKING", title: "預約 30 分鐘諮詢", lead: "聊聊你的需求 — 從架構、開發到設計，一起找到可落地的路線。", cta: "前往完整預約頁", confirm: "確認預約", booked: "已預約", again: "再約一次", pick: "選一個時段" },
  },
  en: {
    hero: {
      tag: "8PLUS.APP · TRUST001", issue: "NO.01 — 2026",
      headline: ["No magic in AI — just engineering", "The right architecture catches every need"],
      caption: "FIG.01 — TRUST HANDSHAKE", cue: "Scroll to meet 8plus",
      pillars: [
        { mark: "A", title: "Architecture first", desc: "Boundaries, stack choices, scalable design" },
        { mark: "B", title: "AI integration", desc: "Embed AI in real workflows, not demos" },
        { mark: "C", title: "Real deployment", desc: "Hybrid cloud × LLM/RAG, actually live" },
      ],
      cta1: "Book a call", cta2: "See the work",
    },
    about: { eyebrow: "02 · STORY", title: "About me", lead: "From biomed to full-stack and cloud — a self-driven engineering path.", cta: "Read the full story",
      summary: "From biomedical science to full-stack and cloud — self-taught, forged on real SaaS products. Now freelancing to help teams turn ideas into trusted, maintainable systems.",
      highlights: [ { k: "Track record", v: "10M-scale push · 30-min delivery" }, { k: "Cross-field", v: "Biomed → Engineering" }, { k: "SaaS", v: "Production architecture" }, { k: "Freelance", v: "Consult · Build · Design" } ] },
    lab: { eyebrow: "03 · LAB", title: "Selected work", cta: "View all projects" },
    path: { eyebrow: "04 · PATH", title: "Career path", lead: "From biomed to AI architecture — every step compounds toward trusted delivery.", cta: "View full path", items: [
      { year: "2026", period: "2026-02 → Present", title: "CTBC Bank (Corporate AI)", sub: "Senior Architect", desc: "AI platform & RAG architecture, AI agents and knowledge engineering — plus large-scale architecture programs and technical policy", tags: ["AI Platform", "RAG", "K8s"], active: true },
      { year: "2025", period: "2025-03 → 09", title: "Universal Processing LLC", sub: "Senior Software Engineer", desc: "CRM / POS / revenue-share systems with a cross-border team", tags: [".NET", "React", "AWS"] },
      { year: "2024", period: "2024-06 → 2025-03", title: "Delta Electronics", sub: "Senior Software Engineer", desc: "", tags: [] },
      { year: "2021", period: "2021-03 → 2023-02", title: "91APP", sub: "Senior Software Engineer", desc: "E-commerce SaaS — built a 10M-scale push architecture delivering in 30 minutes; SLA, blue-green deploys, multi-tenant", tags: ["SaaS", "Push at scale", "Blue-green"] },
      { year: "2018", period: "2018-07", title: "NCTU — Molecular Medicine & Bioengineering", sub: "M.S. · GPA 3.98", desc: "Where biomed crossed into engineering", tags: ["R", "Python"] },
    ] },
    services: { eyebrow: "01 · SERVICES", title: "What I offer", cta: "Explore services", items: [
      { title: "Architecture consulting", desc: "System boundaries, stack choices, scalable architecture" },
      { title: "Web development", desc: "Next.js full-stack delivery and iterative shipping" },
      { title: "Design packages", desc: "End-to-end design from IA to visual language" },
      { title: "Information planning", desc: "Content models, navigation IA, conversion flows" },
    ] },
    blog: { eyebrow: "05 · JOURNAL", title: "Thinking & craft", cta: "Read all posts", read: "Read" },
    booking: { eyebrow: "06 · CONTACT / BOOKING", title: "Book a 30-minute call", lead: "Talk through your needs — from architecture and development to design.", cta: "Open full booking page", confirm: "Confirm booking", booked: "Booked", again: "Book another", pick: "Pick a slot" },
  },
};

const eyebrowRow = { display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: 16, marginBottom: 32 };
const h2 = { fontFamily: "var(--font-display)", fontSize: "clamp(1.75rem, 4vw, 3rem)", lineHeight: 1.08, letterSpacing: "-0.03em", fontWeight: 400, color: "var(--fg)", margin: "10px 0 0" };
const eye = { fontFamily: "var(--font-mono)", fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)" };

// --- Editorial hero (blue field) — switchable animated main visuals ---
const HERO_LABELS = {
  combo: "隧道 · 作品卡", flow: "流場線", logo: "8+ 字標", lines: "線流交會",
  topo: "等高線地形", dots: "半調點陣", orbit: "軌道系統", iso: "架構堆疊",
  wave: "聲波緞帶", sphere: "點陣球體", tape: "雜誌拼貼", bp: "電路藍圖",
  warp: "星際穿越", ripple: "漣漪擴散", radar: "雷達掃描", dna: "雙螺旋",
  terra: "線框山脈", harmo: "諧波軌跡", spiro: "幾何旋層", bars: "頻譜柱列",
  atom: "電子軌道", flock: "群鳥飛行", cells: "方格脈衝", typo: "動態字牆",
  eclipse: "日蝕光環",
};
function Hero({ c }) {
  const [variant, setVariant] = React.useState(() => { const v = typeof localStorage !== "undefined" && localStorage.getItem("heroBg2"); return HERO_LABELS[v] ? v : "combo"; });
  const [swOpen, setSwOpen] = React.useState(false);
  const [logoTick, setLogoTick] = React.useState(0);
  const secRef = React.useRef(null), cvRef = React.useRef(null), sceneRef = React.useRef(null), lineRef = React.useRef(null), logoLinesRef = React.useRef(null), fieldRef = React.useRef(null);
  const setV = (v) => { setVariant(v); if (v === "logo") setLogoTick((n) => n + 1); try { localStorage.setItem("heroBg2", v); } catch (e) {} };
  const nodes = React.useMemo(() => Array.from({ length: 7 }, () => ({ left: (18+Math.random()*64)+"%", top: (24+Math.random()*52)+"%", d: (Math.random()*3)+"s" })), []);
  const cards = [
    { t: "前後端串接", en: "Full-stack Integration", s: ["Next.js", "API", "tRPC"] },
    { t: "電商平台開發", en: "E-commerce Platform", s: ["Shopify", "金流", "訂單"] },
    { t: "形象網站設計", en: "Brand Website", s: ["RWD", "CMS", "SEO"] },
    { t: "CI · LOGO 設計", en: "Brand Identity", s: ["Logo", "視覺", "規範"] },
    { t: "AI 導入與自動化", en: "AI Integration", s: ["LLM", "RAG", "Agent"] },
    { t: "雲端架構顧問", en: "Cloud Architecture", s: ["AWS", "CI/CD", "效能"] },
  ];
  React.useEffect(() => {
    if (variant !== "flow") return;
    const cv = cvRef.current, sec = secRef.current; if (!cv || !sec) return;
    const reduce = matchMedia("(prefers-reduced-motion:reduce)").matches;
    const ctx = cv.getContext("2d"); let raf, ps = [], t = 0;
    const resize = () => { cv.width = sec.clientWidth; cv.height = sec.clientHeight;
      ps = Array.from({ length: Math.min(640, (cv.width/1.5)|0) }, () => ({ x: Math.random()*cv.width, y: Math.random()*cv.height, c: Math.random()<.3?"255,125,60":"175,205,255" })); };
    resize(); window.addEventListener("resize", resize);
    const draw = () => { t += 0.003; ctx.fillStyle = "rgba(0,47,167,.085)"; ctx.fillRect(0,0,cv.width,cv.height);
      for (const p of ps) { const a = Math.sin(p.x*0.004+t)+Math.cos(p.y*0.004-t);
        const nx = p.x+Math.cos(a*3)*1.4, ny = p.y+Math.sin(a*3)*1.4;
        ctx.strokeStyle = "rgba("+p.c+",.66)"; ctx.lineWidth = 1.3; ctx.beginPath(); ctx.moveTo(p.x,p.y); ctx.lineTo(nx,ny); ctx.stroke();
        p.x = nx; p.y = ny; if (p.x<0||p.x>cv.width||p.y<0||p.y>cv.height) { p.x = Math.random()*cv.width; p.y = Math.random()*cv.height; } }
      raf = requestAnimationFrame(draw); };
    if (!reduce) draw(); else { ctx.fillStyle = "#002FA7"; ctx.fillRect(0,0,cv.width,cv.height); }
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, [variant]);
  React.useEffect(() => {
    if (variant !== "logo") return;
    const svg = logoLinesRef.current; if (!svg) return;
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    const ns = "http://www.w3.org/2000/svg"; const P = { x: 640, y: 375 }, N = 46;
    for (let i = 0; i < N; i++) {
      const ang = (i / N) * Math.PI * 2 + (Math.random()-.5)*0.12;
      const R = 360 + Math.random()*520;
      const ex = P.x + Math.cos(ang)*R, ey = P.y + Math.sin(ang)*R;
      const gap = 90 + Math.random()*70; // don't draw over the mark itself
      const sx = P.x + Math.cos(ang)*gap, sy = P.y + Math.sin(ang)*gap;
      const p = document.createElementNS(ns, "path");
      p.setAttribute("d", "M " + ex.toFixed(1) + " " + ey.toFixed(1) + " L " + sx.toFixed(1) + " " + sy.toFixed(1));
      p.setAttribute("class", "fl2");
      const orange = Math.random() < 0.24;
      p.setAttribute("stroke", orange ? "#FE5000" : "rgba(159,192,255,.85)");
      p.setAttribute("stroke-width", orange ? 1.3 : 0.9);
      p.style.setProperty("--dur", (2.2 + Math.random()*2.4).toFixed(2) + "s");
      p.style.animationDelay = (-Math.random()*3).toFixed(2) + "s";
      svg.appendChild(p);
    }
  }, [variant, logoTick]);
  React.useEffect(() => {
    if (variant !== "lines") return;
    const cv = fieldRef.current, sec = secRef.current; if (!cv || !sec) return;
    const reduce = matchMedia("(prefers-reduced-motion:reduce)").matches;
    const ctx = cv.getContext("2d"); let raf, ps = [], t = 0;
    const P = () => ({ x: cv.width*0.66, y: cv.height*0.48 });
    const resize = () => { cv.width = sec.clientWidth; cv.height = sec.clientHeight;
      ps = Array.from({ length: Math.min(620, (cv.width/1.6)|0) }, () => ({ x: Math.random()*cv.width, y: Math.random()*cv.height, c: Math.random()<.28?"255,140,80":"160,195,255" })); };
    resize(); window.addEventListener("resize", resize);
    const draw = () => { t += 0.005; const p = P();
      ctx.fillStyle = "rgba(0,47,167,.055)"; ctx.fillRect(0,0,cv.width,cv.height);
      for (const o of ps) { const a = Math.atan2(p.y-o.y, p.x-o.x) + Math.sin((o.x+o.y)*0.004+t)*0.8;
        const nx = o.x+Math.cos(a)*1.9, ny = o.y+Math.sin(a)*1.9;
        ctx.strokeStyle = "rgba("+o.c+",.5)"; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(o.x,o.y); ctx.lineTo(nx,ny); ctx.stroke();
        o.x = nx; o.y = ny; if (o.x<0||o.x>cv.width||o.y<0||o.y>cv.height||Math.hypot(o.x-p.x,o.y-p.y)<16) { o.x = Math.random()*cv.width; o.y = Math.random()*cv.height; } }
      raf = requestAnimationFrame(draw); };
    if (!reduce) draw(); else { ctx.fillStyle = "#002FA7"; ctx.fillRect(0,0,cv.width,cv.height); }
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, [variant]);
  React.useEffect(() => {
    const sec = secRef.current; if (!sec) return;
    const set = () => { const h = document.querySelector("#scroller > header"); const hh = h ? h.getBoundingClientRect().height : 0; sec.style.height = (window.innerHeight - hh) + "px"; };
    set(); window.addEventListener("resize", set);
    return () => window.removeEventListener("resize", set);
  }, []);
  React.useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion:reduce)").matches;
    if (sceneRef.current && variant !== "combo") sceneRef.current.style.transform = "";
    if (reduce || variant !== "combo") return;
    const onM = (e) => { const dx = e.clientX/window.innerWidth-.5, dy = e.clientY/window.innerHeight-.5;
      if (sceneRef.current) sceneRef.current.style.transform = "translate("+(dx*-16)+"px,"+(dy*-10)+"px)"; };
    window.addEventListener("mousemove", onM); return () => window.removeEventListener("mousemove", onM);
  }, [variant]);
  const labels = HERO_LABELS;
  const ORDER = Object.keys(labels);
  const HB = window.HeroBackdrops || {};
  const corner = ["logo", "lines", "orbit", "iso", "sphere", "tape", "bp", "radar", "atom", "eclipse", "spiro", "harmo"].indexOf(variant) !== -1;
  const flat = ["flow", "lines", "topo", "dots", "wave", "bp", "warp", "ripple", "radar", "dna", "terra", "harmo", "spiro", "bars", "flock", "cells"].indexOf(variant) !== -1;
  return (
    <section ref={secRef} className={"bg-blue noise-field" + (corner ? " hero-corner" : "")} onClick={(e) => { if (e.target.closest("button, a")) return; const r = secRef.current ? secRef.current.getBoundingClientRect() : null; if (r) window.dispatchEvent(new CustomEvent("heroTap", { detail: { x: e.clientX - r.left, y: e.clientY - r.top } })); }} style={{ position: "relative", height: "calc(100vh - 73px)", display: "flex", flexDirection: "column", overflow: "hidden", background: flat ? "#002FA7" : "radial-gradient(120% 120% at 50% 44%, #0a44d8, #002FA7 50%, #001a5c 92%)" }}>
      <div ref={sceneRef} style={{ position: "absolute", inset: 0, zIndex: 0, transition: "transform .3s ease" }} aria-hidden="true">
        <div className={"hv-bg" + (variant === "combo" ? " on" : "")}>
          <div className="ht-scene"><div className="ht-plane ht-floor"></div><div className="ht-plane ht-ceil"></div></div>
          <div className="ht-glow"></div>
          <div className="hv-cards"><div className="space">
            {cards.map((p, i) => (
              <div key={i} className="card" style={{ transform: "rotateY(" + (i/cards.length*360) + "deg) translateZ(330px)" }}>
                <span className="idx">{"SERVICE // " + String(i+1).padStart(2,"0")}</span>
                <span className="ttl">{p.t}</span>
                <span className="en">{p.en}</span>
                <span className="stack">{p.s.map((x2) => <span key={x2}>{x2}</span>)}</span>
              </div>
            ))}
          </div></div>
        </div>
        <div className={"hv-bg hv-flow" + (variant === "flow" ? " on" : "")}><canvas ref={cvRef}></canvas></div>
        <div className={"hv-bg hv-logo" + (variant === "logo" ? " on" : "")}>
          <div className="lfield"><div className="lp lfloor"></div><div className="lp lceil"></div></div>
          {variant === "logo" && <svg className="llines" ref={logoLinesRef} viewBox="0 0 1000 750" preserveAspectRatio="xMidYMid slice"></svg>}
          {variant === "logo" && [0,1,2].map((k) => <span key={"e"+k} className="echo" style={{ animationDelay: (k*1.33) + "s" }}></span>)}
          {variant === "logo" && (
          <div className="markwrap" key={"mark-" + logoTick}>
            <svg viewBox="0 0 100 100" fill="none" role="img" aria-label="8plus">
              <circle className="c-sm" cx="32" cy="29" r="18" fill="#fff"></circle>
              <path className="slash" d="M53 9H68L36 91H21L53 9Z" fill="#fff"></path>
              <circle className="c-lg" cx="70" cy="64" r="28" fill="#FE5000"></circle>
            </svg>
          </div>
          )}
        </div>
        <div className={"hv-bg hv-lines" + (variant === "lines" ? " on" : "")}>
          <canvas ref={fieldRef}></canvas>
        </div>
        {ORDER.map((v) => { const C = HB[v]; return C ? <C key={v} active={variant === v} /> : null; })}
      </div>
      <div aria-hidden="true" className={"hero-scrim" + (corner ? " corner" : " flat")}></div>
      <div className={"hv-switch" + (swOpen ? " open" : "")}>
        <div className="panel" role="menu">
          <button className="x" onClick={() => setSwOpen(false)} aria-label="關閉">✕</button>
          <h4>主視覺 · VISUAL</h4>
          <div className="grid">
            {ORDER.map((v, i) => <button key={v} className={"opt" + (variant === v ? " on" : "")} onClick={() => setV(v)} title={labels[v]}>{labels[v]}</button>)}
          </div>
        </div>
        <button className="trig" onClick={() => setSwOpen((o) => !o)} aria-label="調整主視覺與文案" aria-expanded={swOpen}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M4 6h6M14 6h6M4 12h10M18 12h2M4 18h3M11 18h9"></path>
            <circle cx="12" cy="6" r="2" fill="currentColor" stroke="none"></circle>
            <circle cx="16" cy="12" r="2" fill="currentColor" stroke="none"></circle>
            <circle cx="9" cy="18" r="2" fill="currentColor" stroke="none"></circle>
          </svg>
        </button>
      </div>

      <div className="hero-inner" style={{ position: "relative", zIndex: 10, maxWidth: "var(--container-max)", margin: "0 auto", width: "100%", padding: "64px clamp(24px,4vw,28px)", display: "flex", flexDirection: "column", flex: 1, minHeight: 0 }}>
        <header style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--meta)", borderBottom: "1px solid var(--border-soft)", paddingBottom: 14 }}>
          <span>{c.hero.tag}</span><span>{c.hero.issue}</span>
        </header>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: corner ? "flex-start" : "flex-end", alignItems: corner ? "flex-start" : "center", textAlign: corner ? "left" : "center", paddingBottom: corner ? 0 : "6vh", paddingTop: corner ? "clamp(44px, 12vh, 88px)" : (variant === "lines" ? "4vh" : 0), paddingLeft: corner ? 10 : 0 }}>
          <h1 className="hp-rise" style={corner
            ? { fontFamily: "var(--font-display)", fontSize: "clamp(1.7rem, 3vw, 2.7rem)", lineHeight: 1.2, letterSpacing: "-0.02em", fontWeight: 600, color: "var(--fg)", margin: 0, maxWidth: "18ch", textShadow: "0 4px 30px rgba(0,10,50,.7)", animationDelay: ".2s" }
            : { fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 8.5vw, 4.75rem)", lineHeight: 1.06, letterSpacing: "-0.04em", fontWeight: 600, color: "var(--fg)", margin: 0, maxWidth: "22ch", textShadow: "0 6px 50px rgba(0,10,50,.85)", animationDelay: ".15s" }}>
            {c.hero.headline.map((line, i) => <span key={i} style={{ display: "block" }}>{line}</span>)}
          </h1>
          <div className="hp-rise hero-ctas" style={{ display: "flex", flexWrap: "wrap", gap: 14, margin: corner ? "28px 0 0" : "34px 0 0", justifyContent: corner ? "flex-start" : "center", animationDelay: ".35s" }}>
            <Button size="lg">{c.hero.cta1}</Button>
            <Button variant="secondary" size="lg">{c.hero.cta2}</Button>
          </div>
          {corner && (
            <ul className="hp-rise" style={{ listStyle: "none", padding: 0, margin: "38px 0 0", display: "flex", flexDirection: "column", gap: 14, maxWidth: "34ch", animationDelay: ".5s" }}>
              {c.hero.pillars.map((p) => (
                <li key={p.mark} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--accent)", border: "1px solid var(--border)", borderRadius: "9999px", width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>{p.mark}</span>
                  <div>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: 14.5, fontWeight: 500, color: "var(--fg)" }}>{p.title}</span>
                    <span style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.5, marginLeft: 8 }}>{p.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {!corner && (
        <ul className="pillars hp-rise" style={{ listStyle: "none", padding: "26px 0 0", margin: "52px 0 0", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, borderTop: "1px solid var(--border-soft)", animationDelay: ".55s" }}>
          {c.hero.pillars.map((p) => (
            <li key={p.mark} style={{ display: "flex", gap: 14 }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--accent)", border: "1px solid var(--border)", borderRadius: "9999px", width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{p.mark}</span>
              <div>
                <h2 style={{ fontFamily: "var(--font-body)", fontSize: 18, fontWeight: 500, margin: "3px 0 4px", color: "var(--fg)" }}>{p.title}</h2>
                <p style={{ fontSize: 14, color: "var(--muted)", margin: 0, lineHeight: 1.5 }}>{p.desc}</p>
              </div>
            </li>
          ))}
        </ul>
        )}
        <p className="scrollcue" style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--meta)", marginTop: "clamp(32px, 5vh, 60px)", alignSelf: "center" }}><span className="mouse"></span><span className="arw">↓</span> {c.hero.cue}</p>
      </div>
    </section>
  );
}

function SectionHead({ c, cta }) {
  return (
    <div style={eyebrowRow}>
      <div>
        <p style={eye}>{c.eyebrow}</p>
        <h2 style={h2}>{c.title}</h2>
      </div>
      {cta && <Button variant="link">{cta} →</Button>}
    </div>
  );
}

// --- 02 About (blue) ---
function About({ c }) {
  return (
    <Section field="blue" style={{ minHeight: "100vh", display: "flex", alignItems: "center" }} innerStyle={{ width: "100%" }}>
      <SectionHead c={c.about} cta={c.about.cta} />
      <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 3vw, 2.25rem)", lineHeight: 1.3, letterSpacing: "-0.02em", color: "var(--fg)", maxWidth: "24ch", margin: 0 }}>
        {c.about.lead}
      </p>
      <p style={{ fontFamily: "var(--font-body)", fontWeight: 300, fontSize: "clamp(1rem, 1.4vw, 1.15rem)", lineHeight: 1.85, color: "var(--fg-2)", maxWidth: "48ch", margin: "22px 0 0" }}>
        {c.about.summary}
      </p>
      <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 30 }}>
        {c.about.highlights.map((hl) => (
          <div key={hl.k} style={{ border: "1px solid var(--border-soft)", borderRadius: 16, padding: "14px 18px", background: "var(--surface)", minWidth: 150 }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: ".08em", color: "var(--accent)" }}>{hl.k}</div>
            <div style={{ fontFamily: "var(--font-body)", fontSize: 14.5, color: "var(--fg)", marginTop: 5 }}>{hl.v}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 28 }}>
        {["C# / .NET", "Vue / React", "Node / NestJS", "Kubernetes", "AWS · GCP"].map((x) => <Badge key={x} variant="chip">{x}</Badge>)}
      </div>
    </Section>
  );
}

// --- 02 Lab (blue) ---
function Lab({ c }) {
  const projects = [
    { title: "8plus 諮詢平台", en: "8plus Platform", desc: c.__ === "en" ? "Booking-first consulting platform, Google Calendar." : "以預約為核心的技術諮詢平台，整合 Google Calendar。", stack: ["Next.js", "Vercel", "GCal API"] },
    { title: "電商儀表板", en: "Commerce Dashboard", desc: c.__ === "en" ? "Real-time analytics & order management." : "即時營運分析與訂單管理後台。", stack: ["Vue 3", "NestJS", "PostgreSQL"] },
    { title: "Flash Sale API", en: "Flash Sale API", desc: c.__ === "en" ? "High-concurrency system, Redis + RabbitMQ." : "高併發秒殺系統，Redis + RabbitMQ 削峰。", stack: ["Node.js", "Redis", "RabbitMQ"] },
    { title: "智慧社區平台", en: "Smart Community", desc: c.__ === "en" ? "Full-stack property management." : "社區物業管理全棧解決方案。", stack: [".NET 8", "C#", "Docker"] },
  ];
  return (
    <Section field="orange" style={{ minHeight: "100vh", display: "flex", alignItems: "center" }} innerStyle={{ width: "100%" }}>
      <SectionHead c={c.lab} cta={c.lab.cta} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }} className="grid-2">
        {projects.map((p) => (
          <Card key={p.title} variant="highlight">
            <CardHeader>
              <CardTitle>{c.__ === "en" ? p.en : p.title}</CardTitle>
              <CardDescription>{p.desc}</CardDescription>
            </CardHeader>
            <CardContent><div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>{p.stack.map((s) => <Badge key={s} variant="chip">{s}</Badge>)}</div></CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
}

// --- 03 Services (orange) ---
function Services({ c }) {
  const marks = ["A", "B", "C", "D"];
  return (
    <Section field="orange" style={{ minHeight: "100vh", display: "flex", alignItems: "center" }} innerStyle={{ width: "100%" }}>
      <SectionHead c={c.services} cta={c.services.cta} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }} className="grid-2">
        {c.services.items.map((item, i) => (
          <Card key={item.title} variant="highlight">
            <CardHeader>
              <Badge style={{ alignSelf: "flex-start" }}>{marks[i]} · SERVICE</Badge>
              <CardTitle style={{ marginTop: 8 }}>{item.title}</CardTitle>
              <CardDescription>{item.desc}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </Section>
  );
}

// --- 04 Journal (blue) ---
function Journal({ c }) {
  const posts = [
    { t: c.__ === "en" ? "Hello, 8plus!" : "Hello, 8plus！", d: c.__ === "en" ? "Frontend engineering, UX design, and technical consulting." : "前端工程、UX 設計與技術諮詢的起點。", date: "Jan 22, 2026", tags: ["announcement"] },
    { t: c.__ === "en" ? "Boundaries before code" : "先劃邊界，再寫程式", d: c.__ === "en" ? "Why architecture reviews start with system boundaries." : "為什麼架構健檢從系統邊界開始。", date: "Feb 18, 2026", tags: ["architecture"] },
    { t: c.__ === "en" ? "AI in real workflows" : "把 AI 放進真實流程", d: c.__ === "en" ? "Shipping AI features that survive production." : "讓 AI 功能真正進到生產環境。", date: "Mar 30, 2026", tags: ["ai"] },
  ];
  return (
    <Section field="orange" style={{ minHeight: "100vh", display: "flex", alignItems: "center" }} innerStyle={{ width: "100%" }}>
      <SectionHead c={c.blog} cta={c.blog.cta} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }} className="grid-3">
        {posts.map((p) => (
          <Card key={p.t} variant="highlight">
            <CardHeader>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--meta)", margin: 0 }}>{p.date}</p>
              <CardTitle style={{ fontSize: 20, marginTop: 6 }}>{p.t}</CardTitle>
              <CardDescription>{p.d}</CardDescription>
            </CardHeader>
            <CardContent><Button variant="link">{c.blog.read} →</Button></CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
}

// --- 04 Path (blue) — career timeline summary ---
function PathSec({ c }) {
  return (
    <Section field="blue" style={{ minHeight: "100vh", display: "flex", alignItems: "center" }} innerStyle={{ width: "100%" }}>
      <SectionHead c={c.path} cta={c.path.cta} />
      <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.3rem, 2.4vw, 1.9rem)", lineHeight: 1.4, letterSpacing: "-0.02em", color: "var(--fg)", maxWidth: "30ch", margin: "0 0 34px" }}>{c.path.lead}</p>
      <ol style={{ listStyle: "none", margin: 0, padding: 0, position: "relative", borderLeft: "1px solid var(--border-soft)", display: "flex", flexDirection: "column", gap: 26 }}>
        {c.path.items.map((it) => (
          <li key={it.year + it.title} className="path-row" style={{ position: "relative", paddingLeft: 28, display: "grid", gridTemplateColumns: "120px 1fr", gap: 18 }}>
            <span aria-hidden="true" style={{ position: "absolute", left: -5, top: 7, width: 9, height: 9, borderRadius: "50%", background: it.active ? "var(--accent)" : "var(--bg)", border: it.active ? "none" : "1.5px solid var(--meta)", boxShadow: it.active ? "0 0 12px 2px rgba(254,80,0,.55)" : "none" }}></span>
            <div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 20, color: it.active ? "var(--accent)" : "var(--fg)", lineHeight: 1 }}>{it.year}</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: ".06em", color: "var(--meta)", marginTop: 5 }}>{it.period}</div>
            </div>
            <div>
              <h3 style={{ margin: 0, fontFamily: "var(--font-body)", fontWeight: 500, fontSize: 17, color: "var(--fg)" }}>{it.title}<span style={{ fontSize: 13.5, fontWeight: 400, color: "var(--muted)", marginLeft: 10 }}>{it.sub}</span></h3>
              {it.desc ? <p style={{ margin: "5px 0 0", fontSize: 13.5, lineHeight: 1.55, color: "var(--muted)", maxWidth: "52ch" }}>{it.desc}</p> : null}
              {it.tags && it.tags.length ? <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 8 }}>{it.tags.map((tg) => <Badge key={tg} variant="chip">{tg}</Badge>)}</div> : null}
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}

// --- cal.com month_view embed replica (calLink august-wang-113/30min) ---
const CAL = { link: "cal.com/august-wang-113/30min", brand: "#FE5000", ink: "#1A1A1A", sub: "#6B7280", line: "#E5E7EB", soft: "#F3F4F6", bg: "#FFFFFF" };
function IconClock() { return (<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" strokeLinecap="round" /></svg>); }
function IconCam() { return (<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="6" width="13" height="12" rx="2.5" /><path d="M22 8l-5 4 5 4V8z" strokeLinejoin="round" /></svg>); }
function IconGlobe() { return (<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.6 2.5 15.4 0 18M12 3c-2.5 2.6-2.5 15.4 0 18" /></svg>); }

function CalEmbed({ lang }) {
  const [loading, setLoading] = React.useState(true);
  const [sel, setSel] = React.useState(9);
  const [time, setTime] = React.useState(null);
  const [done, setDone] = React.useState(false);
  React.useEffect(() => { const t = setTimeout(() => setLoading(false), 1100); return () => clearTimeout(t); }, []);

  // July 2026 — 1st is a Wednesday (index 3, Sunday-start grid)
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const lead = 3, today = 8;
  const avail = (d) => d >= today && [0, 6].indexOf((lead + d - 1) % 7) === -1; // weekdays from today
  const wd = lang === "en" ? ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] : ["日", "一", "二", "三", "四", "五", "六"];
  const times = ["09:30", "10:00", "10:30", "11:30", "14:00", "15:30", "17:00"];
  const T = lang === "en"
    ? { name: "August Wang", ev: "30 Min Meeting", dur: "30m", vid: "Cal Video", tz: "Asia/Taipei", pick: "Thu 9", fmt: "Thursday, July 9", next: "Next", h12: "12h", h24: "24h", confirm: "Confirm", booked: "You're booked", again: "Pick another time" }
    : { name: "August Wang", ev: "30 分鐘諮詢", dur: "30 分鐘", vid: "Cal Video 視訊", tz: "台北 GMT+8", pick: "選 7/9", fmt: "7 月 9 日 週四", next: "下一步", h12: "12h", h24: "24h", confirm: "確認預約", booked: "預約完成", again: "換個時段" };

  const cell = { display: "flex", alignItems: "center", justifyContent: "center", height: 38, borderRadius: 8, fontSize: 13.5, fontVariantNumeric: "tabular-nums" };

  return (
    <div style={{ borderRadius: 22, overflow: "hidden", border: "1px solid var(--border-soft)", background: CAL.bg, color: CAL.ink, position: "relative", boxShadow: "0 30px 80px -40px rgba(0,0,0,.6)" }}>
      {/* faux browser/embed chrome */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", borderBottom: `1px solid ${CAL.line}`, background: CAL.soft }}>
        <span style={{ width: 9, height: 9, borderRadius: 9, background: "#E5E7EB" }} />
        <span style={{ width: 9, height: 9, borderRadius: 9, background: "#E5E7EB" }} />
        <span style={{ marginLeft: 8, fontFamily: "var(--font-mono)", fontSize: 11.5, color: CAL.sub, letterSpacing: ".02em" }}>{CAL.link}</span>
        <span style={{ marginLeft: "auto", fontFamily: "var(--font-mono)", fontSize: 10.5, color: CAL.sub }}>Cal.com</span>
      </div>

      {loading ? (
        <div style={{ minHeight: 420, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ textAlign: "center" }}>
            <div className="cal-spin" style={{ width: 38, height: 38, margin: "0 auto 14px", borderRadius: "50%", border: `2px solid ${CAL.line}`, borderTopColor: CAL.brand }} />
            <p style={{ fontSize: 13, color: CAL.sub, margin: 0 }}>{lang === "en" ? "Loading calendar…" : "載入行事曆…"}</p>
          </div>
        </div>
      ) : done ? (
        <div style={{ minHeight: 420, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 32, textAlign: "center" }}>
          <div style={{ width: 54, height: 54, borderRadius: "50%", background: CAL.brand, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.6"><path d="M4 12l5 5L20 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
          <h3 style={{ margin: "0 0 6px", fontSize: 20, letterSpacing: "-.02em" }}>{T.booked}</h3>
          <p style={{ margin: 0, color: CAL.sub, fontSize: 14 }}>{T.ev} · {T.fmt} · {time}</p>
          <p style={{ margin: "4px 0 20px", color: CAL.sub, fontSize: 13 }}>{T.tz}</p>
          <button onClick={() => { setDone(false); setTime(null); }} style={{ padding: "10px 20px", borderRadius: 999, border: `1px solid ${CAL.line}`, background: "#fff", color: CAL.ink, fontSize: 13.5, cursor: "pointer" }}>{T.again}</button>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: time ? "200px 1fr 168px" : "220px 1fr", minHeight: 420 }} className="cal-grid">
          {/* event info */}
          <div style={{ padding: "22px 20px", borderRight: `1px solid ${CAL.line}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{ width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg,#002FA7,#FE5000)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 13, fontWeight: 700 }}>AW</div>
              <span style={{ fontSize: 13, color: CAL.sub }}>{T.name}</span>
            </div>
            <h3 style={{ margin: "0 0 14px", fontSize: 18, letterSpacing: "-.02em", color: CAL.ink }}>{T.ev}</h3>
            {[[<IconClock />, T.dur], [<IconCam />, T.vid], [<IconGlobe />, T.tz]].map((r, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 9, color: CAL.sub, fontSize: 13, margin: "9px 0" }}>
                <span style={{ display: "flex" }}>{r[0]}</span>{r[1]}
              </div>
            ))}
          </div>

          {/* month grid */}
          <div style={{ padding: "22px 22px 18px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
              <strong style={{ fontSize: 15, letterSpacing: "-.01em" }}>{lang === "en" ? "July 2026" : "2026 年 7 月"}</strong>
              <div style={{ display: "flex", gap: 4 }}>
                {["‹", "›"].map((a, i) => <button key={i} style={{ width: 30, height: 30, borderRadius: 8, border: "none", background: CAL.soft, color: CAL.sub, cursor: "pointer", fontSize: 16 }}>{a}</button>)}
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", marginBottom: 4 }}>
              {wd.map((d) => <div key={d} style={{ textAlign: "center", fontSize: 11, color: CAL.sub, fontWeight: 600, padding: "4px 0" }}>{d}</div>)}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 2 }}>
              {Array.from({ length: lead }).map((_, i) => <div key={"b" + i} />)}
              {days.map((d) => {
                const ok = avail(d), on = sel === d;
                return (
                  <div key={d} onClick={() => ok && (setSel(d), setTime(null))}
                    style={{ ...cell, cursor: ok ? "pointer" : "default",
                      background: on ? CAL.brand : ok ? CAL.soft : "transparent",
                      color: on ? "#fff" : ok ? CAL.ink : "#C7CBD1",
                      fontWeight: on ? 700 : d === today ? 700 : 500,
                      boxShadow: d === today && !on ? `inset 0 0 0 1px ${CAL.brand}` : "none" }}>
                    {d}
                  </div>
                );
              })}
            </div>
          </div>

          {/* time slots */}
          {time !== null || sel ? (
            <div style={{ padding: "22px 16px", borderLeft: `1px solid ${CAL.line}`, display: sel ? "block" : "none" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                <strong style={{ fontSize: 13 }}>{T.fmt}</strong>
              </div>
              <div style={{ display: "inline-flex", border: `1px solid ${CAL.line}`, borderRadius: 8, overflow: "hidden", marginBottom: 14, fontSize: 11.5 }}>
                <span style={{ padding: "4px 10px", background: CAL.ink, color: "#fff" }}>{T.h12}</span>
                <span style={{ padding: "4px 10px", color: CAL.sub }}>{T.h24}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, maxHeight: 300, overflowY: "auto" }}>
                {times.map((tm) => time === tm ? (
                  <div key={tm} style={{ display: "flex", gap: 6 }}>
                    <span style={{ flex: 1, padding: "11px 0", textAlign: "center", borderRadius: 8, border: `1px solid ${CAL.line}`, color: CAL.sub, fontSize: 13.5 }}>{tm}</span>
                    <button onClick={() => setDone(true)} style={{ flex: 1, padding: "11px 0", borderRadius: 8, border: "none", background: CAL.brand, color: "#fff", fontSize: 13.5, cursor: "pointer", fontWeight: 600 }}>{T.next}</button>
                  </div>
                ) : (
                  <button key={tm} onClick={() => setTime(tm)} style={{ padding: "11px 0", borderRadius: 8, border: `1px solid ${CAL.brand}`, background: "#fff", color: CAL.brand, fontSize: 13.5, cursor: "pointer", fontWeight: 600, transition: "var(--transition-base)" }}>{tm}</button>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}

// --- 05 Booking (dark) — real cal.com embed replica ---
function Booking({ c }) {
  const services = c.__ === "en"
    ? ["Architecture review & stack selection", "AI integration feasibility", "Dev assistance & code review"]
    : ["架構健檢與技術選型", "AI 導入可行性評估", "開發協助與 Code Review"];
  return (
    <Section field="blue" style={{ minHeight: "100vh", display: "flex", alignItems: "center" }} innerStyle={{ width: "100%" }}>
      <SectionHead c={c.booking} />
      <div style={{ display: "grid", gridTemplateColumns: "0.9fr 1.1fr", gap: 28, alignItems: "start" }} className="grid-2">
        <div>
          <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.4rem, 2.6vw, 2rem)", lineHeight: 1.35, letterSpacing: "-0.02em", color: "var(--fg)", maxWidth: "26ch", margin: 0 }}>
            {c.booking.lead}
          </p>
          <div style={{ marginTop: 26, borderRadius: 22, border: "1px solid var(--border-soft)", background: "var(--surface)", padding: 22 }}>
            <p style={{ ...eye, margin: "0 0 14px" }}>{c.__ === "en" ? "The call covers" : "諮詢包含"}</p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
              {services.map((s) => (
                <li key={s} style={{ display: "flex", alignItems: "flex-start", gap: 12, fontSize: 14.5, color: "var(--fg-2)", lineHeight: 1.5 }}>
                  <span style={{ marginTop: 7, width: 7, height: 7, borderRadius: "50%", background: "var(--accent)", flexShrink: 0 }} />{s}
                </li>
              ))}
            </ul>
          </div>
          <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 14 }}>
            {[
              { k: "EMAIL", v: "alec.wang.tpe@gmail.com", href: "mailto:alec.wang.tpe@gmail.com" },
              { k: "LINE", v: "@482ykgdg", href: "#" },
              { k: "INSTAGRAM", v: "@august.yan.terra", href: "#" },
              { k: "GITHUB", v: "github.com/awtw", href: "https://github.com/awtw" },
            ].map((ch) => (
              <a key={ch.k} href={ch.href} style={{ border: "1px solid var(--border-soft)", borderRadius: 14, padding: "10px 14px", background: "var(--surface)", display: "block", transition: "var(--transition-base)" }}>
                <span style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: ".14em", color: "var(--accent)" }}>{ch.k}</span>
                <span style={{ display: "block", fontSize: 13, color: "var(--fg-2)", marginTop: 4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{ch.v}</span>
              </a>
            ))}
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 20, alignItems: "center", flexWrap: "wrap" }}>
            <Button>{c.booking.cta}</Button>
            <Badge variant="status">Available for consulting</Badge>
          </div>
        </div>
        <CalEmbed lang={c.__} />
      </div>
    </Section>
  );
}

function Home({ lang }) {
  const c = { ...COPY[lang], __: lang };
  // attach lang marker to nested copy for helpers
  c.lab.__ = lang; c.blog.__ = lang; c.services.__ = lang;
  const cc = { ...c, lab: { ...c.lab, __: lang }, blog: { ...c.blog, __: lang } };
  return (
    <React.Fragment>
      <Hero c={c} />
      <Services c={c} />
      <About c={c} />
      <Lab c={cc} />
      <PathSec c={c} />
      <Journal c={cc} />
      <Booking c={c} />
    </React.Fragment>
  );
}

window.Screens = { Home };
