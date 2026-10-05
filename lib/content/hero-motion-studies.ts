export type MotionStudy = {
  id: string; name: string; reference: string; date: string; url: string; source: string; evidence: string; mechanism: string; adaptation: string; hint: string;
};

// Research checked: 2026-10-05. Publication dates are not launch dates.
export const motionStudies = [
  {
    "id": "pixels",
    "name": "像素解碼",
    "reference": "Vivid",
    "date": "2026-09-15",
    "url": "https://viivid.webflow.io/",
    "source": "https://tympanus.net/codrops/2026/09/15/vivid-turning-a-visual-experiment-into-an-interactive-webflow-experience/",
    "evidence": "2026 Codrops 作者案例",
    "mechanism": "有記憶的像素位移與斜向揭露",
    "adaptation": "藍橘方塊揭露 8plus；游標推開後回位",
    "hint": "移動游標／拖動解碼滑桿"
  },
  {
    "id": "type",
    "name": "品牌開場",
    "reference": "House of Yellow",
    "date": "2026-09-16",
    "url": "https://houseofyellow.nl/",
    "source": "https://tympanus.net/codrops/2026/09/16/house-of-yellow/",
    "evidence": "2026 Codrops 作者案例",
    "mechanism": "Logo 遮罩、影片穿插與 SVG 變形",
    "adaptation": "8plus 鏤空字內的藍橘幾何接力；可切換字形構圖",
    "hint": "點擊切換構圖"
  },
  {
    "id": "magnetic",
    "name": "磁性液面",
    "reference": "Dash Creative",
    "date": "2026-07-21",
    "url": "https://www.dashcreative.co/",
    "source": "https://tympanus.net/codrops/2026/07/21/magnetic-commerce-building-the-dash-creative-website/",
    "evidence": "2026 Codrops 作者案例",
    "mechanism": "依游標方向扭曲的 WebGL 影片材質",
    "adaptation": "連續藍橘材質表面，游標牽引並回彈的輕量轉譯",
    "hint": "移動游標／調整牽引幅度"
  },
  {
    "id": "split",
    "name": "雙屏實證",
    "reference": "MERSI",
    "date": "2026-07-27",
    "url": "https://www.mersi-architecture.com/",
    "source": "https://tympanus.net/codrops/2026/07/27/between-print-and-digital-the-making-of-mersis-website/",
    "evidence": "2026 Codrops 作者案例",
    "mechanism": "雙屏反向揭露、中央標籤與封面轉場",
    "adaptation": "資料需求與介面成果反向揭幕，8plus 案例作為内容",
    "hint": "拖動分割滑桿／切換階段"
  },
  {
    "id": "focus",
    "name": "對焦工作室",
    "reference": "4WIDE",
    "date": "2026-04-23",
    "url": "https://4wide.jp/",
    "source": "https://tympanus.net/codrops/2026/04/23/building-4wide-turning-distortion-blur-and-motion-into-a-coherent-experience/",
    "evidence": "2026 Codrops 作者案例",
    "mechanism": "default/focus 模式、魚眼、降速與 RGB shift",
    "adaptation": "介面拼貼穿過對焦視窗，切換聚焦揭露工程資訊",
    "hint": "點擊聚焦切換"
  },
  {
    "id": "grain",
    "name": "材質筆觸",
    "reference": "Podium",
    "date": "2026-06-23",
    "url": "https://podium.global/",
    "source": "https://tympanus.net/codrops/2026/06/23/podium-building-a-website-where-running-becomes-storytelling/",
    "evidence": "2026 Codrops 作者案例",
    "mechanism": "游標歷史作為材質扭曲，顆粒與局部對比",
    "adaptation": "藍橘印刷紋理會記住並淡出游標軌跡，主標固定可讀",
    "hint": "在畫布上移動／觸碰留下痕跡"
  },
  {
    "id": "loupe",
    "name": "細節透鏡",
    "reference": "Digital Stamp Collection",
    "date": "2026-06-09",
    "url": "https://marijanapav.com/stamps",
    "source": "https://tympanus.net/codrops/2026/06/09/building-an-interactive-digital-stamp-collection-with-shaders-postcards-and-playful-inspection/",
    "evidence": "2026 Codrops 作者案例",
    "mechanism": "可拖放郵票、玻璃放大鏡、縮放控制",
    "adaptation": "放大檢視真實作品截圖；保留清晰的工程細節入口",
    "hint": "移動透鏡／調整倍率"
  },
  {
    "id": "editorial",
    "name": "作品編排",
    "reference": "Pell Mell",
    "date": "2026-03-27",
    "url": "https://pellmell.fr/",
    "source": "https://tympanus.net/codrops/2026/03/27/pell-mell-crafting-a-visual-exploration-platform-with-editorial-rhythm/",
    "evidence": "2026 Codrops 作者案例",
    "mechanism": "編輯式作品排列、逐段揭露、克制的懸停",
    "adaptation": "三張既有作品用錯落編排進場，可切換重點作品",
    "hint": "點選作品編號／調整展開"
  },
  {
    "id": "product",
    "name": "系統分解",
    "reference": "Oryzo AI",
    "date": "2026（作品年度）",
    "url": "https://oryzo.ai/",
    "source": "https://lusion.co/projects/oryzo_ai/",
    "evidence": "作者案例列出 Awwwards / FWA SOTM",
    "mechanism": "將普通杯墊做成完整產品發表與3D敘事",
    "adaptation": "把8plus工程服務呈現為可分解的資料/模型/應用系統，為概念示意",
    "hint": "拖動拆解滑桿"
  },
  {
    "id": "world",
    "name": "工作地圖",
    "reference": "Bruno Simon",
    "date": "2026-07-16（報導）",
    "url": "https://bruno-simon.com/",
    "source": "https://tympanus.net/codrops/2026/07/16/meet-the-speakers-of-the-first-three-js-conference/",
    "evidence": "2026 Three.js 大會介紹新版作品集",
    "mechanism": "可駕車探索的互動3D作品世界",
    "adaptation": "以可點選的等角工作站，探索需求/原型/整合/交付；不是完整遊戲複製",
    "hint": "點選工作站按鈕／前往下一站"
  }
] as const satisfies readonly MotionStudy[];

export type MotionMode = typeof motionStudies[number]["id"];
