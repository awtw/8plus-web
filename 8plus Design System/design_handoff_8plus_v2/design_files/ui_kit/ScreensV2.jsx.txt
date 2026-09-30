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
    about: { eyebrow: "01 · STORY", title: "關於我", cta: "閱讀完整故事",
      kicker: "AUGUST WANG · awtw · 架構驅動的技術夥伴",
      lead: "設計、前端、後端到雲端架構，一手把想法交付成可信系統。",
      summary: "大學讀生醫與化學，卻在自學裡找到對程式的熱情，一路轉進全端與雲端；在 SaaS 產品的實戰中累積架構觀，如今以自由接案協助團隊，把想法交付成真正可信、可維護的系統。",
      spectrum: [
        { t: "設計", en: "Design", s: "UI/UX · 品牌識別 · 視覺語言", sEn: "UI/UX · Brand identity · Visual language" },
        { t: "前端", en: "Frontend", s: "動效 · RWD · 互動體驗", sEn: "Motion · RWD · Interaction" },
        { t: "後端", en: "Backend", s: "API · 資料模型 · 系統整合", sEn: "API · Data models · Integration" },
        { t: "雲端架構", en: "Architecture", s: "Kubernetes · RAG · 可擴展設計", sEn: "Kubernetes · RAG · Scalable design" },
      ],
      highlights: [ { k: "代表成就", v: "千萬級推播 · 30 分鐘送達" }, { k: "跨域轉職", v: "生醫 → 工程" }, { k: "SaaS 實戰", v: "產品級架構經驗" }, { k: "自由接案", v: "顧問 · 開發 · 設計" } ] },
    lab: { eyebrow: "02 · LAB", title: "作品集", cta: "查看全部作品" },
    path: { eyebrow: "03 · PATH", title: "學職涯歷程", lead: "從生醫到 AI 架構 — 每一步都在累積可信交付的能力。", cta: "查看完整歷程", items: [
      { year: "2026", period: "2026-02 → 至今", title: "中國信託（法金 AI）", sub: "高級架構師", desc: "AI Platform 與 RAG 架構設計、AI Agent 與知識工程落地，並參與大型架構開發與技術政策制定", tags: ["AI Platform", "RAG", "K8s"], active: true },
      { year: "2025", period: "2025-03 → 09", title: "優配科技 Universal Processing", sub: "資深軟體工程師", desc: "CRM／POS／分潤系統開發，跨國團隊交付", tags: [".NET", "React", "AWS"] },
      { year: "2024", period: "2024-06 → 2025-03", title: "台達電子", sub: "資深軟體工程師", desc: "", tags: [] },
      { year: "2021", period: "2021-03 → 2023-02", title: "91APP 九易宇軒", sub: "資深軟體工程師", desc: "電商 SaaS — 獨立打造千萬級推播架構、30 分鐘全量送達；SLA、藍綠部署、多租戶實戰", tags: ["SaaS", "千萬級推播", "藍綠部署"] },
      { year: "2018", period: "2018-07", title: "交大 分子醫學與生物工程所", sub: "碩士畢業 · GPA 3.98", desc: "從生醫跨入工程的起點", tags: ["R", "Python"] },
    ] },
    services: { eyebrow: "04 · SERVICES", title: "我能提供什麼", cta: "了解服務詳情", items: [
      { title: "程式架構諮詢", desc: "系統邊界、技術選型、可擴展與可維護的架構設計" },
      { title: "網站開發", desc: "Next.js 全端開發、生產級交付與迭代上線" },
      { title: "設計包案", desc: "從資訊架構到視覺語言的完整設計落地" },
      { title: "整體資訊規劃", desc: "內容模型、導覽 IA、轉換動線的系統性規劃" },
    ] },
    booking: { eyebrow: "05 · CONTACT / BOOKING", title: "預約 30 分鐘諮詢", lead: "聊聊你的需求 — 從架構、開發到設計，一起找到可落地的路線。", cta: "前往完整預約頁", confirm: "確認預約", booked: "已預約", again: "再約一次", pick: "選一個時段" },
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
    about: { eyebrow: "01 · STORY", title: "About me", cta: "Read the full story",
      kicker: "AUGUST WANG · awtw · Architecture-led partner",
      lead: "Design, frontend, backend to cloud architecture — turning ideas into trusted systems, end to end.",
      summary: "From biomedical science to full-stack and cloud — self-taught, forged on real SaaS products. Now freelancing to help teams turn ideas into trusted, maintainable systems.",
      spectrum: [
        { t: "設計", en: "Design", s: "UI/UX · 品牌識別 · 視覺語言", sEn: "UI/UX · Brand identity · Visual language" },
        { t: "前端", en: "Frontend", s: "動效 · RWD · 互動體驗", sEn: "Motion · RWD · Interaction" },
        { t: "後端", en: "Backend", s: "API · 資料模型 · 系統整合", sEn: "API · Data models · Integration" },
        { t: "雲端架構", en: "Architecture", s: "Kubernetes · RAG · 可擴展設計", sEn: "Kubernetes · RAG · Scalable design" },
      ],
      highlights: [ { k: "Track record", v: "10M-scale push · 30-min delivery" }, { k: "Cross-field", v: "Biomed → Engineering" }, { k: "SaaS", v: "Production architecture" }, { k: "Freelance", v: "Consult · Build · Design" } ] },
    lab: { eyebrow: "02 · LAB", title: "Selected work", cta: "View all projects" },
    path: { eyebrow: "03 · PATH", title: "Career path", lead: "From biomed to AI architecture — every step compounds toward trusted delivery.", cta: "View full path", items: [
      { year: "2026", period: "2026-02 → Present", title: "CTBC Bank (Corporate AI)", sub: "Senior Architect", desc: "AI platform & RAG architecture, AI agents and knowledge engineering — plus large-scale architecture programs and technical policy", tags: ["AI Platform", "RAG", "K8s"], active: true },
      { year: "2025", period: "2025-03 → 09", title: "Universal Processing LLC", sub: "Senior Software Engineer", desc: "CRM / POS / revenue-share systems with a cross-border team", tags: [".NET", "React", "AWS"] },
      { year: "2024", period: "2024-06 → 2025-03", title: "Delta Electronics", sub: "Senior Software Engineer", desc: "", tags: [] },
      { year: "2021", period: "2021-03 → 2023-02", title: "91APP", sub: "Senior Software Engineer", desc: "E-commerce SaaS — built a 10M-scale push architecture delivering in 30 minutes; SLA, blue-green deploys, multi-tenant", tags: ["SaaS", "Push at scale", "Blue-green"] },
      { year: "2018", period: "2018-07", title: "NCTU — Molecular Medicine & Bioengineering", sub: "M.S. · GPA 3.98", desc: "Where biomed crossed into engineering", tags: ["R", "Python"] },
    ] },
    services: { eyebrow: "04 · SERVICES", title: "What I offer", cta: "Explore services", items: [
      { title: "Architecture consulting", desc: "System boundaries, stack choices, scalable architecture" },
      { title: "Web development", desc: "Next.js full-stack delivery and iterative shipping" },
      { title: "Design packages", desc: "End-to-end design from IA to visual language" },
      { title: "Information planning", desc: "Content models, navigation IA, conversion flows" },
    ] },
    booking: { eyebrow: "05 · CONTACT / BOOKING", title: "Book a 30-minute call", lead: "Talk through your needs — from architecture and development to design.", cta: "Open full booking page", confirm: "Confirm booking", booked: "Booked", again: "Book another", pick: "Pick a slot" },
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
function Hero({ c, navigate }) {
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

        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: corner ? "flex-start" : "flex-end", alignItems: corner ? "flex-start" : "center", textAlign: corner ? "left" : "center", paddingBottom: corner ? 0 : "6vh", paddingTop: corner ? "clamp(40px, 10vh, 76px)" : (variant === "lines" ? "4vh" : 0), paddingLeft: corner ? 10 : 0 }}>
          {corner && <p className="hp-rise" style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--accent)", margin: "0 0 18px", animationDelay: ".1s" }}>{c.__ === "en" ? "Architecture-led · AI shipped" : "架構驅動 · AI 落地"}</p>}
          <h1 className="hp-rise" style={corner
            ? { fontFamily: "var(--font-display)", fontSize: "clamp(1.7rem, 3vw, 2.7rem)", lineHeight: 1.2, letterSpacing: "-0.02em", fontWeight: 600, color: "var(--fg)", margin: 0, maxWidth: "18ch", textShadow: "0 4px 30px rgba(0,10,50,.7)", animationDelay: ".2s" }
            : { fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 8.5vw, 4.75rem)", lineHeight: 1.06, letterSpacing: "-0.04em", fontWeight: 600, color: "var(--fg)", margin: 0, maxWidth: "22ch", textShadow: "0 6px 50px rgba(0,10,50,.85)", animationDelay: ".15s" }}>
            {c.hero.headline.map((line, i) => <span key={i} style={{ display: "block" }}>{line}</span>)}
          </h1>
          <div className="hp-rise hero-ctas" style={{ display: "flex", flexWrap: "wrap", gap: 14, margin: corner ? "28px 0 0" : "34px 0 0", justifyContent: corner ? "flex-start" : "center", animationDelay: ".35s" }}>
            <Button size="lg" onClick={() => navigate && navigate("/booking")}>{c.hero.cta1}</Button>
            <Button variant="secondary" size="lg" onClick={() => navigate && navigate("/lab")}>{c.hero.cta2}</Button>
          </div>
          {corner && (
            <div className="hp-rise" style={{ margin: "40px 0 0", maxWidth: "40ch", borderTop: "1px solid var(--border-soft)", animationDelay: ".5s" }}>
              {c.hero.pillars.map((p) => (
                <div key={p.mark} style={{ display: "flex", gap: 14, alignItems: "flex-start", padding: "15px 0", borderBottom: "1px solid var(--border-soft)" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 600, color: "var(--accent)", border: "1px solid var(--accent)", borderRadius: "9999px", width: 26, height: 26, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>{p.mark}</span>
                  <div>
                    <div style={{ fontFamily: "var(--font-body)", fontSize: 15, fontWeight: 600, color: "var(--fg)", letterSpacing: "-.01em" }}>{p.title}</div>
                    <div style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.55, marginTop: 3 }}>{p.desc}</div>
                  </div>
                </div>
              ))}
            </div>
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

function SectionHead({ c, cta, onCta }) {
  return (
    <div style={eyebrowRow}>
      <div>
        <p style={eye}>{c.eyebrow}</p>
        <h2 style={h2}>{c.title}</h2>
      </div>
      {cta && <Button variant="link" onClick={onCta}>{cta} →</Button>}
    </div>
  );
}

// --- 01 About (orange) — who I am, end to end ---
function About({ c, navigate }) {
  const a = c.about;
  return (
    <Section field="orange" style={{ minHeight: "100vh", display: "flex", alignItems: "center" }} innerStyle={{ width: "100%" }}>
      <SectionHead c={a} cta={a.cta} onCta={() => navigate && navigate("/about")} />
      <p style={{ ...eye, margin: "0 0 12px", color: "var(--accent)" }}>{a.kicker}</p>
      <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.6rem, 3.4vw, 2.6rem)", lineHeight: 1.24, letterSpacing: "-0.02em", color: "var(--fg)", maxWidth: "22ch", margin: 0, fontWeight: 400 }}>{a.lead}</p>
      <p style={{ fontFamily: "var(--font-body)", fontWeight: 300, fontSize: "clamp(1rem, 1.4vw, 1.12rem)", lineHeight: 1.85, color: "var(--fg-2)", maxWidth: "50ch", margin: "22px 0 0" }}>{a.summary}</p>

      <p style={{ ...eye, margin: "42px 0 16px" }}>{c.__ === "en" ? "CAPABILITY · DESIGN TO ARCHITECTURE" : "能力光譜 · 設計到架構一手包"}</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12 }}>
        {a.spectrum.map((st, i) => {
          const op = 0.4 + 0.6 * (i / (a.spectrum.length - 1));
          return (
            <div key={st.t} style={{ border: "1px solid var(--border-soft)", borderRadius: 16, padding: "16px 16px 18px", background: "var(--surface)", position: "relative", overflow: "hidden" }}>
              <span aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "var(--accent)", opacity: op }} />
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 9 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent)", opacity: op }} />
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: ".1em", color: "var(--meta)" }}>{String(i + 1).padStart(2, "0")}</span>
                {i < a.spectrum.length - 1 ? <span aria-hidden="true" style={{ marginLeft: "auto", color: "var(--meta)", fontSize: 13 }}>→</span> : null}
              </div>
              <div style={{ fontFamily: "var(--font-body)", fontSize: 16, fontWeight: 600, color: "var(--fg)" }}>{c.__ === "en" ? st.en : st.t}</div>
              <div style={{ fontSize: 12.5, color: "var(--muted)", lineHeight: 1.6, marginTop: 5 }}>{c.__ === "en" ? st.sEn : st.s}</div>
            </div>
          );
        })}
      </div>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 30 }}>
        {a.highlights.map((hl, i) => (
          <div key={hl.k} style={{ border: i === 0 ? "1px solid var(--accent)" : "1px solid var(--border-soft)", borderRadius: 16, padding: "14px 18px", background: "var(--surface)", minWidth: 150 }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: ".08em", color: "var(--accent)" }}>{hl.k}</div>
            <div style={{ fontFamily: "var(--font-body)", fontSize: 14.5, color: "var(--fg)", marginTop: 5 }}>{hl.v}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 24 }}>
        {["C# / .NET", "Vue / React", "Node / NestJS", "Kubernetes", "AWS · GCP"].map((x) => <Badge key={x} variant="chip">{x}</Badge>)}
      </div>
    </Section>
  );
}

// --- 02 Lab (blue) — project archive, growth arc ---
function PROJECTS(c) {
  const en = c.__ === "en";
  return [
    { id: "r-analysis", era: en ? "Rookie" : "青澀期", title: "R 分析", en: "R Analysis",
      tag: en ? "Modeling cart-button impact, visualized with VanillaJS." : "以 R 建立購物車按鍵影響因素模型，VanillaJS 呈現互動洞察。",
      stack: ["R", "VanillaJS"], link: "https://awtw.github.io/R_page/",
      summary: en ? "An analysis model built in R exploring how cart-button design affects conversion, paired with VanillaJS interactive visualization." : "以 R 建立分析模型，探討購物車按鍵設計對購買轉換的影響，並以 VanillaJS 做互動式視覺化，輔助決策與迭代。",
      points: en ? ["Model assumptions & variable selection", "Experiment design & A/B comparison", "Visualization & insight synthesis"] : ["模型假設與變數選擇", "實驗設計與 A/B 比較", "視覺化呈現與洞察整理"] },
    { id: "power-bi", era: en ? "Rookie" : "青澀期", title: "Power BI 關聯探索", en: "Power BI Explorer",
      tag: en ? "Python + Power BI exploring market, employment & disease data." : "以 Python 與 Power BI 探索市場、就業與疾病資料的潛在關聯。",
      stack: ["Python", "Power BI"], link: null,
      summary: en ? "Using open data to explore potential links between stock/employment markets and diseases — Python for feature engineering, Power BI for interactive dashboards." : "以公開資料探索股市、就業市場變化與特定疾病之間的潛在關聯；Python 做資料處理與特徵工程，Power BI 建互動式儀表板。",
      points: en ? ["Data cleaning & feature engineering", "Metric & time-series visualization", "Filter & interactive analysis"] : ["資料清理與特徵工程", "指標與時間序列視覺化", "篩選與交互分析"] },
    { id: "experimentlab", era: en ? "Explore" : "探索期", title: "醫學分析原型平台", en: "ExperimentLab",
      tag: en ? "A prototype platform helping doctors build basic prediction models." : "協助醫師建立研究原型與基礎預測模型的醫學分析平台。",
      stack: ["Vue 3", "UI/UX", "Analysis"], link: "https://experimentlab.online/#/",
      summary: en ? "A prototype platform for doctors applying for research grants — building initial prediction models from indicators like dialysis level or gene expression to assess risk trends." : "協助醫師在申請研究計畫時使用的原型平台，透過覆膜透析程度、基因表現等指標建立初步預測模型，評估疾病惡化或好轉的風險趨勢。",
      points: en ? ["Indicator visualization & trend tracking", "Base model estimation with tunable params", "Research report logging & export"] : ["指標資料視覺化與趨勢追蹤", "基礎模型推估與可調參數", "記錄與匯出研究用報表"] },
    { id: "1914", era: en ? "Brand" : "品牌期", title: "1914 精油品牌官網", en: "1914 Aroma Brand",
      tag: en ? "Self-founded aroma brand — identity, formulas & chatbot support." : "自創精油品牌官網與客服自動化，整合品牌設計、配方與 Chatbot。",
      stack: ["VanillaJS", "LINE / Messenger", "Dialogflow", "Heroku"], link: "https://1914.augustwang.com/",
      summary: en ? "An aroma brand I founded during civil service — naming, logo, packaging, formula R&D and support automation, all done solo, fusing my biochem background with design and engineering." : "替代役期間自創的精油品牌，從命名、Logo、包裝、配方研發到客服自動化全程獨立完成，把生化背景與設計、工程能力整合為一致的品牌體驗。",
      points: en ? ["Science-led fragrance formulas", "Consistent visual system (logo, packaging)", "24/7 chatbot support (LINE, Messenger)"] : ["以科學方法開發香氛配方", "一致的視覺系統（Logo、包裝）", "聊天機器人 24/7 客服（LINE、Messenger）"] },
    { id: "shuyan-art", era: en ? "Brand" : "品牌期", title: "shuyan_art 設計接案平台", en: "shuyan_art",
      tag: en ? "A portfolio & inquiry site for a design studio." : "為設計接案品牌打造的作品展示與接案入口，聚焦視覺質感與轉換動線。",
      stack: ["Next.js", "UI/UX"], link: "https://www.shuyan.art/",
      summary: en ? "A work-showcase and inquiry entry for a design freelancer brand, focused on visual quality, service presentation and conversion flow." : "為設計接案品牌打造的作品展示與接案入口，聚焦視覺質感、服務呈現與轉換動線。",
      points: en ? ["Portfolio-led layout", "Service presentation", "Conversion-focused flow"] : ["以作品為主的版面", "服務呈現", "聚焦轉換的動線"] },
    { id: "crm-series", era: en ? "Product" : "產品期", title: "CRM 設計系列", en: "CRM Series",
      tag: en ? "Login/permission/list/form CRM prototypes — IA & task flow." : "登入、權限、清單、表單與流程引導的 CRM 原型系列，聚焦資訊架構與動線。",
      stack: ["VanillaJS", "Next.js", "Vercel", "UI/UX"], link: "https://crmdev.8plus.app/en",
      summary: en ? "Multi-version CRM prototypes covering login/permission, list search, form editing and flow guidance — with a componentized IA and reusable list/form skeletons." : "針對不同情境設計多版 CRM 原型，涵蓋登入/權限、清單檢索、表單編輯、流程引導，強調資訊架構與操作動線的清晰性。",
      points: en ? ["Consistent design language & components", "Task-oriented pages & flows", "Extensible list/form for permissions & states"] : ["一致的設計語言與元件系統", "以任務為導向的頁面與操作流", "可擴充的列表/表單架構，支援權限與狀態"] },
    { id: "ecommerce-dashboard", era: en ? "Product" : "產品期", title: "電商管理後台", en: "Commerce Dashboard",
      tag: en ? "Modern admin for SMB e-commerce — orders, inventory, analytics." : "為中小型電商打造的現代化管理後台，整合訂單、庫存與數據分析。",
      stack: ["Next.js 15", "TypeScript", "Prisma", "PostgreSQL"], link: null,
      summary: en ? "A full management suite for SMB e-commerce — unifying scattered order, inventory and customer data into one real-time, multi-tenant platform." : "為中小型電商打造的完整管理解決方案，把分散的訂單、庫存與客戶資料整合成即時、多租戶的統一平台。",
      points: en ? ["Order processing efficiency +45%", "Inventory error rate −60%", "Multi-tenant, scalable to 1000+ merchants"] : ["訂單處理效率提升 45%", "庫存錯誤率降低 60%", "多租戶架構，可擴展至 1000+ 商家"] },
    { id: "flash-sale-api", era: en ? "Scale" : "規模期", title: "Flash Sale API", en: "Flash Sale API",
      tag: en ? "High-concurrency flash-sale backend — no oversell under load." : "面向高併發限量搶購的後端 API，透過鎖、佇列與快取避免超賣。",
      stack: ["NestJS", "PostgreSQL", "Redis", "RabbitMQ"], link: "https://github.com/awtw/flash-sale-api",
      summary: en ? "A backend designed for high-concurrency limited-stock sales — guaranteeing no oversell and stock consistency under extreme traffic." : "針對「高併發限量搶購」設計，確保極端流量下不超賣，維持庫存一致性與系統穩定。",
      points: en ? ["Row locks for race conditions", "RabbitMQ queue load shedding", "Redis cache + rate limiting"] : ["行鎖處理競態條件", "RabbitMQ 佇列削峰", "Redis 快取加速 + 限流"] },
    { id: "smart-community-backend", era: en ? "Scale" : "規模期", title: "智慧社區後端", en: "Smart Community Backend",
      tag: en ? ".NET backend for smart communities — residents, devices, events." : "面向智慧社區的 .NET 後端服務，涵蓋住戶、設備、事件通報與通知中心。",
      stack: [".NET", "PostgreSQL", "Redis", "Docker"], link: "https://github.com/awtw/SmartCommunityBackEnd",
      summary: en ? "A layered .NET backend for smart-community apps across residents, devices, events and notifications — built for reliability and observability." : "以 .NET 分層架構建置的智慧社區後端，涵蓋住戶、設備、事件通報與通知等核心模組，強調可靠性與可觀測性。",
      points: en ? ["User / resident / permission modules", "Device & sensor data collection", "Reporting workflow & notification center"] : ["使用者／住戶／權限管理", "設備與感測資料收集", "通報工作流程與通知中心"] },
    { id: "b18", era: en ? "Brand" : "品牌形象", title: "b18 品牌官網", en: "b18 Brand Site",
      tag: en ? "Brand site for a fashion designer — identity, story, IG flow." : "為新創服裝設計師打造的品牌官網，整合視覺語彙、品牌故事與社群導流。",
      stack: ["Next.js", "Vercel", "Instagram", "UI/UX"], link: "https://b18.8plus.app/",
      summary: en ? "A lightweight brand site for a new fashion designer — building identity, product narrative and Instagram flow on a tight budget and timeline." : "為新創服裝設計師打造的輕量品牌官網，在有限預算與時程內同時建立視覺識別、產品敘事與 Instagram 導流。",
      points: en ? ["Layout & whitespace to elevate the brand", "Social CTAs driving to purchase", "Launched within 2 weeks"] : ["以版型與留白凸顯品牌質感", "導購節點導流至社群與購買", "2 週內上線"] },
    { id: "e-cooperative", era: en ? "Now" : "現在", title: "光復協作平台", en: "e-cooperative",
      tag: en ? "Disaster-relief coordination platform for Guangfu, Hualien." : "為花蓮光復災害協作打造的資訊整合與資源媒合平台，聚焦快速上線。",
      stack: ["Next.js", "Vercel", "Flask API", "UI/UX"], link: "https://www.hopenet-gf.com",
      summary: en ? "A coordination platform launched via community and volunteers after the 2025 Guangfu barrier-lake disaster — integrating information and matching resources." : "2025/09 花蓮光復馬太鞍溪堰塞湖災害後，透過社群與志工串聯啟動的協作平台，整合資訊、提升溝通效率並協助資源媒合。",
      points: en ? ["Standardized model for multi-source info", "Volunteer & resident matching", "Lightweight, fast to launch & iterate"] : ["多來源災情資訊標準化資料模型", "志工與居民互助媒合機制", "輕量可維護、快速上線迭代"] },
    { id: "8plus", era: en ? "Now" : "現在", title: "8plus 諮詢平台", en: "8plus Platform",
      tag: en ? "Booking-first consulting platform, Google Calendar." : "以預約為核心的技術諮詢平台，整合 Google Calendar。",
      stack: ["Next.js", "Vercel", "GCal API", "UI/UX"], link: "https://8plus.app/",
      summary: en ? "My own consulting platform — an editorial site with a booking flow, focused on career and engineering conversations with high conversion." : "結合多年產品與開發經驗打造的諮詢預約平台，聚焦職涯與程式開發的深度討論，並以高轉換的預約流程為核心。",
      points: en ? ["Systematic booking, GCal integrated", "Goal-centered consulting framework", "Minimal UI, low friction, high completion"] : ["系統化預約流程，Google Calendar 無縫整合", "以使用者目標為中心的諮詢框架", "極簡介面、降低門檻、提升完成率"] },
  ];
}
var LAB_IMG = { "r-analysis": 1, "experimentlab": 1, "1914": 1, "shuyan-art": 1, "crm-series": 1, "flash-sale-api": 1, "smart-community-backend": 1, "b18": 1, "e-cooperative": 1, "8plus": 1 };
function labImg(id) { if (id === "power-bi") return "labs/power-bi/powerbi.jpeg"; return LAB_IMG[id] ? ("labs/" + id + "/web.png") : null; }
function Lab({ c, navigate, page }) {
  const projects = PROJECTS(c);
  return (
    <Section field="blue" style={{ minHeight: "100vh", display: "flex", alignItems: "center" }} innerStyle={{ width: "100%" }}>
      <SectionHead c={c.lab} cta={page ? null : c.lab.cta} onCta={() => navigate && navigate("/lab")} />
      <p style={{ ...eye, margin: "0 0 22px" }}>{c.__ === "en" ? "FROM RAW HTML → MOTION CRAFT → BRAND COMMERCE" : "從青澀無框架 → 設計感動畫 → 商業電商／品牌形象"}</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gridAutoRows: "1fr", gap: 16 }} className="grid-2">
        {projects.map((p) => {
          const img = labImg(p.id);
          return (
          <div key={p.id} onClick={() => navigate && navigate("/lab/" + p.id)} style={{ cursor: "pointer", height: "100%" }}>
            <Card variant="highlight" style={{ height: "100%", display: "flex", flexDirection: "column" }}>
              <div style={{ height: 150, borderRadius: 12, marginBottom: 14, border: "1px solid var(--border-soft)", backgroundColor: "var(--surface)", backgroundImage: img ? ("url(" + img + ")") : "repeating-linear-gradient(135deg, var(--surface) 0 14px, transparent 14px 28px)", backgroundSize: "cover", backgroundPosition: "top center" }} />
              <CardHeader>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10 }}>
                  <Badge variant="chip">{p.era}</Badge>
                  <span aria-hidden="true" style={{ color: "var(--accent)", fontFamily: "var(--font-mono)", fontSize: 13 }}>↗</span>
                </div>
                <CardTitle style={{ marginTop: 10 }}>{c.__ === "en" ? p.en : p.title}</CardTitle>
                <CardDescription>{p.tag}</CardDescription>
              </CardHeader>
              <CardContent style={{ marginTop: "auto" }}><div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>{p.stack.map((s) => <Badge key={s} variant="chip">{s}</Badge>)}</div></CardContent>
            </Card>
          </div>
          );
        })}
      </div>
    </Section>
  );
}

// --- 04 Services (blue) ---
function SERVICES_DATA(c) {
  const en = c.__ === "en";
  return [
    { id: "architecture", mark: "A", title: en ? "Architecture consulting" : "程式架構諮詢", desc: en ? "System boundaries, stack choices, scalable architecture" : "系統邊界、技術選型、可擴展與可維護的架構設計",
      includes: en ? ["System boundary & domain modeling", "Stack selection & trade-offs", "Scalability & reliability review"] : ["系統邊界與領域建模", "技術選型與取捨分析", "可擴展性與可靠度健檢"],
      process: en ? ["Discovery", "Architecture design", "Review & handoff"] : ["需求探索 Discovery", "架構設計", "檢視與知識轉移"],
      deliverables: en ? ["Architecture diagram", "Decision records (ADR)", "Delivery roadmap"] : ["架構圖", "決策紀錄 ADR", "落地路線圖"] },
    { id: "webdev", mark: "B", title: en ? "Web development" : "網站開發", desc: en ? "Next.js full-stack delivery and iterative shipping" : "Next.js 全端開發、生產級交付與迭代上線",
      includes: en ? ["Full-stack Next.js build", "Production-grade delivery", "Iterative release"] : ["Next.js 全端開發", "生產級交付", "迭代上線"],
      process: en ? ["Scope & design", "Build & review", "Ship & iterate"] : ["範疇與設計", "開發與 Code Review", "上線與迭代"],
      deliverables: en ? ["Production site", "CI/CD pipeline", "Handover docs"] : ["上線網站", "CI/CD 流程", "交接文件"] },
    { id: "design", mark: "C", title: en ? "Design packages" : "設計包案", desc: en ? "End-to-end design from IA to visual language" : "從資訊架構到視覺語言的完整設計落地",
      includes: en ? ["Brand & visual language", "Bespoke UI & motion", "Design system"] : ["品牌與視覺語言", "客製 UI 與動效", "設計系統"],
      process: en ? ["Direction", "Design", "System & handoff"] : ["方向定調", "視覺設計", "系統化與交付"],
      deliverables: en ? ["Design system", "High-fidelity screens", "Motion specs"] : ["設計系統", "高保真畫面", "動效規格"] },
    { id: "planning", mark: "D", title: en ? "Information planning" : "整體資訊規劃", desc: en ? "Content models, navigation IA, conversion flows" : "內容模型、導覽 IA、轉換動線的系統性規劃",
      includes: en ? ["Content modeling", "Navigation IA", "Conversion flow"] : ["內容模型", "導覽 IA", "轉換動線"],
      process: en ? ["Audit", "Structure", "Validate"] : ["現況盤點", "結構規劃", "驗證"],
      deliverables: en ? ["Sitemap & IA", "Content model", "Flow maps"] : ["網站地圖與 IA", "內容模型", "動線圖"] },
  ];
}
function Services({ c, navigate, page }) {
  const items = SERVICES_DATA(c);
  return (
    <Section field="blue" style={{ minHeight: "100vh", display: "flex", alignItems: "center" }} innerStyle={{ width: "100%" }}>
      <SectionHead c={c.services} cta={page ? null : c.services.cta} onCta={() => navigate && navigate("/services")} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }} className="grid-2">
        {items.map((item) => (
          <div key={item.id} onClick={() => navigate && navigate("/services/" + item.id)} style={{ cursor: "pointer" }}>
            <Card variant="highlight">
              <CardHeader>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Badge style={{ alignSelf: "flex-start" }}>{item.mark} · SERVICE</Badge>
                  <span aria-hidden="true" style={{ color: "var(--accent)", fontFamily: "var(--font-mono)", fontSize: 13 }}>↗</span>
                </div>
                <CardTitle style={{ marginTop: 10 }}>{item.title}</CardTitle>
                <CardDescription>{item.desc}</CardDescription>
              </CardHeader>
            </Card>
          </div>
        ))}
      </div>
    </Section>
  );
}

// --- Journal removed in v2 (no articles yet) ---

// --- 03 Path (orange) — career timeline summary ---
function PathSec({ c, navigate, page }) {
  return (
    <Section field="orange" style={{ minHeight: "100vh", display: "flex", alignItems: "center" }} innerStyle={{ width: "100%" }}>
      <SectionHead c={c.path} cta={page ? null : c.path.cta} onCta={() => navigate && navigate("/path")} />
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
        <div style={{ display: "grid", gridTemplateColumns: sel ? "216px 1fr 220px" : "220px 1fr", alignItems: "start" }} className="cal-grid">
          {/* event info */}
          <div style={{ padding: "22px 20px", borderRight: `1px solid ${CAL.line}`, width: 216 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
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
            <div style={{ padding: "22px 16px", borderLeft: `1px solid ${CAL.line}`, display: sel ? "block" : "none", width: 219 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                <strong style={{ fontSize: 13 }}>{T.fmt}</strong>
              </div>
              <div style={{ display: "inline-flex", border: `1px solid ${CAL.line}`, borderRadius: 8, overflow: "hidden", marginBottom: 14, fontSize: 11.5 }}>
                <span style={{ padding: "4px 10px", background: CAL.ink, color: "#fff" }}>{T.h12}</span>
                <span style={{ padding: "4px 10px", color: CAL.sub }}>{T.h24}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, maxHeight: 245, overflowY: "auto" }}>
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

// --- 05 Booking (blue) — teaser on home, full vertical page on /booking ---
function Booking({ c, navigate, full }) {
  const services = c.__ === "en"
    ? ["Architecture review & stack selection", "AI integration feasibility", "Dev assistance & code review"]
    : ["架構健檢與技術選型", "AI 導入可行性評估", "開發協助與 Code Review"];
  const contacts = [
    { k: "LINE", v: "@482ykgdg", href: "#" },
    { k: "INSTAGRAM", v: "@august.yan.terra", href: "#" },
    { k: "GITHUB", v: "github.com/awtw", href: "https://github.com/awtw" },
    { k: "LINKEDIN", v: "shuyan-wang", href: "https://www.linkedin.com/in/shuyan-wang-0b9370141" },
  ];
  const status = <Badge variant="status">Available for consulting</Badge>;
  const covered = (
    <div style={{ borderRadius: 22, border: "1px solid var(--border-soft)", background: "var(--surface)", padding: 22, height: "100%" }}>
      <p style={{ ...eye, margin: "0 0 14px" }}>{c.__ === "en" ? "The call covers" : "諮詢包含"}</p>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
        {services.map((s) => (
          <li key={s} style={{ display: "flex", alignItems: "flex-start", gap: 12, fontSize: 14.5, color: "var(--fg-2)", lineHeight: 1.5 }}>
            <span style={{ marginTop: 7, width: 7, height: 7, borderRadius: "50%", background: "var(--accent)", flexShrink: 0 }} />{s}
          </li>
        ))}
      </ul>
    </div>
  );
  const contactGrid = (
    <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
      {contacts.map((ch) => (
        <a key={ch.k} href={ch.href} target={ch.href.charAt(0) === "#" ? undefined : "_blank"} rel="noreferrer" style={{ border: "1px solid var(--border-soft)", borderRadius: 14, padding: "10px 14px", background: "var(--surface)", display: "block", transition: "var(--transition-base)" }}>
          <span style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: ".14em", color: "var(--accent)" }}>{ch.k}</span>
          <span style={{ display: "block", fontSize: 13, color: "var(--fg-2)", marginTop: 4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{ch.v}</span>
        </a>
      ))}
    </div>
  );
  const lead = (mw) => <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.4rem, 2.6vw, 2rem)", lineHeight: 1.35, letterSpacing: "-0.02em", color: "var(--fg)", maxWidth: mw, margin: "0 0 24px" }}>{c.booking.lead}</p>;
  const specRow = { display: "flex", alignItems: "center", gap: 9, color: "var(--fg-2)", fontSize: 14, margin: "10px 0" };

  if (full) {
    return (
      <Section field="blue" style={{ minHeight: "100vh", display: "flex", alignItems: "center" }} innerStyle={{ width: "100%" }}>
        <div style={{ maxWidth: 820, margin: "0 auto", width: "100%" }}>
          <div style={{ marginBottom: 16 }}>{status}</div>
          <SectionHead c={c.booking} />
          {lead("40ch")}
          <div style={{ marginBottom: 20 }}><CalEmbed lang={c.__} /></div>
          <div style={{ marginBottom: 20 }}>{covered}</div>
          {contactGrid}
        </div>
      </Section>
    );
  }

  return (
    <Section field="blue" style={{ minHeight: "100vh", display: "flex", alignItems: "center" }} innerStyle={{ width: "100%" }}>
      <div style={{ maxWidth: 1060, margin: "0 auto", width: "100%" }}>
        <div style={{ marginBottom: 16 }}>{status}</div>
        <SectionHead c={c.booking} />
        {lead("52ch")}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, alignItems: "stretch", marginTop: 4 }} className="grid-2">
          {covered}
          <div style={{ borderRadius: 22, border: "1px solid var(--border-soft)", background: "var(--surface)", padding: "28px 26px", display: "flex", flexDirection: "column", height: "100%" }}>
            <p style={{ ...eye, margin: "0 0 6px", color: "var(--accent)" }}>{c.__ === "en" ? "Online booking" : "線上預約"}</p>
            <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "clamp(1.5rem,2.4vw,2rem)", letterSpacing: "-0.02em", color: "var(--fg)", margin: "0 0 18px" }}>{c.__ === "en" ? "30-min consultation" : "30 分鐘諮詢"}</h3>
            <div style={specRow}><IconClock />{c.__ === "en" ? "30 minutes" : "30 分鐘"}</div>
            <div style={specRow}><IconCam />{c.__ === "en" ? "Cal Video" : "Cal Video 視訊"}</div>
            <div style={specRow}><IconGlobe />{c.__ === "en" ? "Asia/Taipei" : "台北 GMT+8"}</div>
            <div style={{ marginTop: "auto", paddingTop: 22 }}>
              <Button onClick={() => navigate && navigate("/booking")}>{c.booking.cta}</Button>
            </div>
          </div>
        </div>
        <div style={{ marginTop: 16 }}>{contactGrid}</div>
      </div>
    </Section>
  );
}

function Home({ lang, navigate }) {
  const c = { ...COPY[lang], __: lang };
  c.lab.__ = lang; c.services.__ = lang;
  const cc = { ...c, lab: { ...c.lab, __: lang } };
  return (
    <React.Fragment>
      <Hero c={c} navigate={navigate} />
      <About c={c} navigate={navigate} />
      <Lab c={cc} navigate={navigate} />
      <PathSec c={c} navigate={navigate} />
      <Services c={c} navigate={navigate} />
      <Booking c={c} navigate={navigate} />
    </React.Fragment>
  );
}

// ---------- sub-page helpers ----------
const shotStyle = { width: "100%", aspectRatio: "16 / 9", borderRadius: 18, border: "1px solid var(--border-soft)",
  background: "repeating-linear-gradient(135deg, var(--surface) 0 16px, transparent 16px 32px)",
  display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: ".14em", color: "var(--meta)" };

function DetailCol({ title, items, ordered }) {
  return (
    <div>
      <p style={{ ...eye, margin: "0 0 12px" }}>{title}</p>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
        {items.map((it, i) => (
          <li key={it} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14.5, color: "var(--fg-2)", lineHeight: 1.55 }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--accent)", flexShrink: 0, marginTop: 2, minWidth: 16 }}>{ordered ? String(i + 1).padStart(2, "0") : "·"}</span>
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}

// --- LAB detail: single project ---
function LabDetail({ c, id, navigate }) {
  const en = c.__ === "en";
  const list = PROJECTS(c);
  const p = list.find((x) => x.id === id) || list[0];
  return (
    <Section field="blue" style={{ minHeight: "100vh", display: "flex", alignItems: "center" }} innerStyle={{ width: "100%" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 14, alignItems: "center", marginBottom: 18 }}>
        <Badge variant="chip">{p.era}</Badge>
        <a onClick={() => navigate("/lab")} style={{ cursor: "pointer", fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: ".06em", color: "var(--muted)" }}>← {en ? "All work" : "所有作品"}</a>
      </div>
      <h1 style={{ ...h2, margin: 0 }}>{en ? p.en : p.title}</h1>
      <p style={{ fontFamily: "var(--font-body)", fontWeight: 300, fontSize: "clamp(1rem, 1.5vw, 1.2rem)", lineHeight: 1.8, color: "var(--fg-2)", maxWidth: "54ch", margin: "16px 0 0" }}>{p.summary}</p>
      {labImg(p.id)
        ? <img src={labImg(p.id)} alt={(en ? p.en : p.title) + " screenshot"} style={{ width: "100%", borderRadius: 18, border: "1px solid var(--border-soft)", margin: "28px 0 0", display: "block" }} />
        : <div style={{ ...shotStyle, margin: "28px 0 0" }}>{en ? "PROJECT SHOT" : "作品截圖 / SCREENSHOT"}</div>}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 28, marginTop: 30, alignItems: "start" }}>
        <DetailCol title={en ? "WHAT I DID" : "我做了什麼"} items={p.points} />
        <div>
          <p style={{ ...eye, margin: "0 0 12px" }}>{en ? "STACK" : "技術棧"}</p>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>{p.stack.map((s) => <Badge key={s} variant="chip">{s}</Badge>)}</div>
          <div style={{ marginTop: 24, display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Button onClick={() => navigate("/booking")}>{en ? "Talk about a similar project" : "聊聊類似專案"}</Button>
            {p.link ? <a href={p.link} target="_blank" rel="noreferrer"><Button variant="secondary">{en ? "View live ↗" : "查看線上作品 ↗"}</Button></a> : null}
          </div>
        </div>
      </div>
    </Section>
  );
}

// --- SERVICES detail: single service ---
function ServiceDetail({ c, id, navigate }) {
  const en = c.__ === "en";
  const list = SERVICES_DATA(c);
  const s = list.find((x) => x.id === id) || list[0];
  return (
    <Section field="blue" style={{ minHeight: "100vh", display: "flex", alignItems: "center" }} innerStyle={{ width: "100%" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 14, alignItems: "center", marginBottom: 18 }}>
        <Badge>{s.mark} · SERVICE</Badge>
        <a onClick={() => navigate("/services")} style={{ cursor: "pointer", fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: ".06em", color: "var(--muted)" }}>← {en ? "All services" : "所有服務"}</a>
      </div>
      <h1 style={{ ...h2, margin: 0 }}>{s.title}</h1>
      <p style={{ fontFamily: "var(--font-body)", fontWeight: 300, fontSize: "clamp(1rem, 1.5vw, 1.2rem)", lineHeight: 1.8, color: "var(--fg-2)", maxWidth: "54ch", margin: "16px 0 0" }}>{s.desc}</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 28, marginTop: 34, alignItems: "start" }}>
        <DetailCol title={en ? "INCLUDES" : "服務包含"} items={s.includes} />
        <DetailCol title={en ? "PROCESS" : "合作流程"} items={s.process} ordered />
        <DetailCol title={en ? "DELIVERABLES" : "交付產出"} items={s.deliverables} />
      </div>
      <div style={{ marginTop: 30 }}>
        <Button onClick={() => navigate("/booking")}>{en ? "Book a 30-min call" : "預約 30 分鐘諮詢"}</Button>
      </div>
    </Section>
  );
}

// --- JOURNAL: reserved route ---
function JournalSoon({ lang, navigate }) {
  const en = lang === "en";
  return (
    <Section field="orange" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }} innerStyle={{ width: "100%", textAlign: "center" }}>
      <p style={{ ...eye, justifyContent: "center", display: "flex" }}>05 · JOURNAL</p>
      <h2 style={{ ...h2, margin: "10px 0 0" }}>{en ? "Journal" : "心法與思考"}</h2>
      <p style={{ color: "var(--muted)", margin: "16px auto 0", fontSize: 16, maxWidth: "40ch", lineHeight: 1.7 }}>{en ? "Articles are on the way — this route is reserved for the journal." : "文章即將上線，此路由已為部落格預留。"}</p>
      <div style={{ marginTop: 26 }}><Button variant="secondary" onClick={() => navigate("/")}>{en ? "Back home" : "回首頁"}</Button></div>
    </Section>
  );
}

// --- ABOUT full page: polished life story (from docs/StoryAboutMe.md) ---
function ABOUT_STORY(c) {
  const en = c.__ === "en";
  return en ? {
    kicker: "AUGUST WANG · awtw · SELF-TAUGHT ENGINEER",
    headline: "A self-driven path — from biomed to full-stack and cloud",
    lead: "I am August (awtw). A lifelong self-learner who followed curiosity — and an eye for craft — from biomedical science and chemistry all the way into full-stack and cloud engineering.",
    chapters: [
      { no: "01", eye: "ORIGINS", title: "Self-learning & an eye for craft", body: "Family expectations led me through many fields, but I kept searching for what I actually cared about. Art competitions as a kid built an instinct and stubbornness for aesthetics; a biology-and-chemistry major came easily, yet I realized early it was not the direction I wanted to commit to." },
      { no: "02", eye: "THE TURN", title: "NCTU and my first lines of code", body: "At NCTU's Molecular Medicine & Bioengineering institute I worked in a CS lab on gene sequencing and bio-analysis with R and Python, while taking as many CS courses as I could. In one class project I shipped a full front-to-back feature solo — that got a professor's endorsement and my first real commissions. From there I taught myself the stack: HTML, CSS, JavaScript, PHP, then Angular, React, Vue, and Express.js on the backend." },
      { no: "03", eye: "BUILDING", title: "Civil service & my own brand", body: "During alternative service I spent every evening sharpening CS fundamentals and building a portfolio — even launching my own brand, ‘1914’, integrating LINE, Facebook Chatbot and Google Dialogflow into an intent-recognition support bot deployed on Heroku." },
      { no: "04", eye: "CHALLENGE", title: "Backend-only, and leading adoption", body: "After service I chose to challenge a backend-only engineer role, passed the assessment with top marks, and earned room to explore. It sharpened my direction: keep learning, lead the adoption of new tech, and build a problem-solving mindset." },
      { no: "05", eye: "IN THE FIELD", title: "E-commerce & SaaS at scale", body: "In e-commerce I went deep on B2C product challenges and shipped the fundamentals: SLA and 7×24 assurance, failover and resilience, blue-green and progressive delivery, SaaS architecture with tenant isolation, cloud cost optimization, cross-border deployment and compliance, plus Git Flow, feature toggles and Grafana monitoring. I also led a frontend overhaul, driving componentization and a shared npm library across teams." },
      { no: "06", eye: "NOW", title: "Freelance & an architecture-first belief", body: "Today I freelance across design, frontend and backend, with end-to-end UI/UX and full-stack range. I firmly believe good architecture creates long-term value for a business — far more than the short-term win of rushing to launch. That has been my biggest lesson." },
    ],
    belief: "Good architecture creates lasting value — far beyond the short-term win of rushing to launch.",
    interestsTitle: "OFF THE CLOCK",
    interestsLead: "Outside work I am still curious and many-sided, and still learning how to balance life with the craft.",
    interests: ["Choir & singing", "Gymnastics", "Certified spin coach", "Binge-watching"],
    cta: "Book a call",
  } : {
    kicker: "AUGUST WANG · awtw · 自學驅動的工程師",
    headline: "自學驅動的工程之路——從生醫到全端與雲端",
    lead: "我是 August（awtw）。一個從小熱愛自學的人，靠好奇心與對美感的執著，一路從生醫、化學走到全端與雲端工程。",
    chapters: [
      { no: "01", eye: "起點", title: "自學與美感", body: "因為家庭期待，我曾在許多領域嘗試，卻始終在自學裡尋找真正的熱情。小時候常參加藝術比賽，養成對美感與設計的直覺與執著；大學主修生物與化學，成績不錯，卻很早意識到那不是我想長期投入的方向。" },
      { no: "02", eye: "轉向", title: "交大與第一行程式", body: "進入交大分子醫學與生物工程所後，我在資工實驗室專注基因定序與生物分析，用 R 與 Python 處理數據，同時選修大量資工課程。一次課堂專案裡，我獨力完成了前後端整合的需求，得到教授肯定、開始承接真實案子——從此正式踏上自學程式的路：HTML、CSS、JavaScript、PHP，到 Angular、React、Vue，再到 Express.js 後端。" },
      { no: "03", eye: "累積", title: "替代役與自建品牌", body: "替代役期間，我每天下班後補強資工知識、累積作品集，甚至建立了自己的品牌「1914」，整合 LINE、Facebook Chatbot 與 Google Dialogflow，開發語意辨識客服機器人並部署上 Heroku。" },
      { no: "04", eye: "挑戰", title: "純後端與主導技術", body: "退伍後，我選擇挑戰純後端工程師職位，高分通過考核，也獲得探索與發揮的空間。這段經歷讓我更清楚自己的方向：持續學習、主導新技術導入、建立解決問題的思維。" },
      { no: "05", eye: "實戰", title: "電商與 SaaS 的架構體悟", body: "進入電商產業後，我深入 B2C 的商業需求與產品挑戰，並在實務中落地關鍵能力：SLA 與 7×24 服務保障、故障切換與韌性設計、藍綠部署與漸進式發布、SaaS 架構與租戶隔離、雲端成本優化、跨國部署與法規合規，以及 Git Flow、Feature Toggle、Grafana 監控等工程實踐。我也主導過前端大改版，推動元件化與共用 npm library，建立跨部門的開發模式。" },
      { no: "06", eye: "現在", title: "自由接案與架構觀", body: "如今我以自由接案協助團隊，從設計、前端到後端，發展出完整的 UI/UX 與全端能力。我始終相信：良好的架構設計能為企業創造長期價值，遠勝於匆匆上線的短期收益——這是我這幾年最大的體悟。" },
    ],
    belief: "好的架構，創造長期價值；遠勝匆匆上線的短期收益。",
    interestsTitle: "工作之外的我",
    interestsLead: "生活中我依然是個興趣多元、熱愛學習的人，也在練習拿握工作與生活的平衡。",
    interests: ["合唱·歌唱課", "體操課", "飛輪教練（持照）", "追劇·沙發馬鈴薎"],
    cta: "預約諮詢",
  };
}
function AboutPage({ c, navigate }) {
  const s = ABOUT_STORY(c);
  return (
    <Section field="orange" style={{ minHeight: "100vh", display: "flex", alignItems: "center" }} innerStyle={{ width: "100%" }}>
      <p style={{ ...eye, margin: "0 0 12px", color: "var(--accent)" }}>{s.kicker}</p>
      <h1 style={{ ...h2, margin: 0, maxWidth: "20ch" }}>{s.headline}</h1>
      <p style={{ fontFamily: "var(--font-body)", fontWeight: 300, fontSize: "clamp(1rem, 1.5vw, 1.2rem)", lineHeight: 1.85, color: "var(--fg-2)", maxWidth: "52ch", margin: "20px 0 0" }}>{s.lead}</p>

      <div style={{ marginTop: 46, borderTop: "1px solid var(--border-soft)" }}>
        {s.chapters.map((ch) => (
          <div key={ch.no} className="path-row" style={{ display: "grid", gridTemplateColumns: "minmax(110px,170px) 1fr", gap: 24, padding: "26px 0", borderBottom: "1px solid var(--border-soft)" }}>
            <div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 22, color: "var(--accent)", lineHeight: 1 }}>{ch.no}</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: ".12em", color: "var(--meta)", marginTop: 8 }}>{ch.eye}</div>
            </div>
            <div>
              <h3 style={{ margin: 0, fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 18, color: "var(--fg)" }}>{ch.title}</h3>
              <p style={{ margin: "8px 0 0", fontFamily: "var(--font-body)", fontWeight: 300, fontSize: 15.5, lineHeight: 1.85, color: "var(--fg-2)", maxWidth: "58ch" }}>{ch.body}</p>
            </div>
          </div>
        ))}
      </div>

      <blockquote style={{ margin: "44px 0 0", paddingLeft: 22, borderLeft: "3px solid var(--accent)" }}>
        <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.4rem, 2.8vw, 2.2rem)", lineHeight: 1.35, letterSpacing: "-0.02em", color: "var(--fg)", maxWidth: "24ch", margin: 0 }}>{s.belief}</p>
      </blockquote>

      <p style={{ ...eye, margin: "46px 0 10px" }}>{s.interestsTitle}</p>
      <p style={{ fontFamily: "var(--font-body)", fontWeight: 300, fontSize: 15, lineHeight: 1.7, color: "var(--muted)", maxWidth: "46ch", margin: 0 }}>{s.interestsLead}</p>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 16 }}>
        {s.interests.map((x) => <Badge key={x} variant="chip">{x}</Badge>)}
      </div>

      <div style={{ marginTop: 36 }}>
        <Button onClick={() => navigate("/booking")}>{s.cta}</Button>
      </div>
    </Section>
  );
}

// --- back bar shown above sub-pages ---
function BackBar({ lang, navigate, crumb }) {
  return (
    <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: "18px clamp(24px,4vw,28px) 0", display: "flex", alignItems: "center", gap: 10 }}>
      <a onClick={() => navigate("/")} style={{ cursor: "pointer", fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: ".08em", color: "var(--muted)" }}>← {lang === "en" ? "HOME" : "首頁"}</a>
      {crumb ? <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: ".08em", color: "var(--meta)" }}>/ {crumb}</span> : null}
    </div>
  );
}

// --- hash router: home scroll OR a focused sub-page ---
function Router({ lang, route, navigate }) {
  const c = { ...COPY[lang], __: lang };
  c.lab.__ = lang; c.services.__ = lang;
  const cc = { ...c, lab: { ...c.lab, __: lang } };
  const page = route.page;
  if (!page || page === "home") return <Home lang={lang} navigate={navigate} />;

  let body = null, crumb = "";
  if (page === "about") { body = <AboutPage c={c} navigate={navigate} />; crumb = c.about.title; }
  else if (page === "lab") { body = route.id ? <LabDetail c={cc} id={route.id} navigate={navigate} /> : <Lab c={cc} navigate={navigate} page />; crumb = c.lab.title; }
  else if (page === "services") { body = route.id ? <ServiceDetail c={c} id={route.id} navigate={navigate} /> : <Services c={c} navigate={navigate} page />; crumb = c.services.title; }
  else if (page === "path") { body = <PathSec c={c} navigate={navigate} page />; crumb = c.path.title; }
  else if (page === "booking") { body = <Booking c={c} full navigate={navigate} />; crumb = c.booking.title; }
  else if (page === "journal") { body = <JournalSoon lang={lang} navigate={navigate} />; crumb = lang === "en" ? "Journal" : "心法與思考"; }
  else { return <Home lang={lang} navigate={navigate} />; }

  return (<React.Fragment><BackBar lang={lang} navigate={navigate} crumb={crumb} />{body}</React.Fragment>);
}

window.Screens = { Home, Router };
