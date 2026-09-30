/* global React */
// Hero backdrop concepts for 8plus.app (file 2 of 2) — 18 additional Klein-blue visuals.
const { useCv, Shell } = window.HbUtil;
const KB = "#002FA7";

(function injectHb2Css() {
  let st = document.getElementById("hb2-css");
  if (!st) { st = document.createElement("style"); st.id = "hb2-css"; document.head.appendChild(st); }
  st.textContent = `
  /* typo — 動態字牆 */
  .hb-typo .row { position: absolute; left: 0; right: 0; overflow: hidden; font-family: var(--font-display); font-weight: 700; font-size: 12.5vh; line-height: 1; white-space: nowrap; color: transparent; -webkit-text-stroke: 1.5px rgba(255,255,255,.2); }
  .hb-typo .row.o { -webkit-text-stroke: 1.5px rgba(254,110,40,.55); }
  .hb-typo .run { display: flex; width: max-content; animation: hbMarq linear infinite; }
  .hb-typo .run span { padding-right: .5em; }
  /* eclipse — 日蝕循環：太陽 → 日蝕 → 分離 */
  .hb-ecl .sun { position: absolute; left: 64%; top: 45%; transform: translate(-50%,-50%); width: min(50vh, 440px); aspect-ratio: 1; border-radius: 50%; background: radial-gradient(circle at 42% 40%, #FFE0B8, #FE7A26 52%, #E64A00 80%); animation: hbBreath2 6s ease-in-out infinite; }
  .hb-ecl .moon { position: absolute; left: 64%; top: 45%; width: calc(min(50vh, 440px) * 0.985); aspect-ratio: 1; border-radius: 50%; background: radial-gradient(circle at 62% 42%, #04164c, #000d33 75%); transform: translate(calc(-50% + 18%), -50%); animation: hbEclipse 16s ease-in-out infinite; }
  .hb-ecl .oring { position: absolute; left: 64%; top: 45%; transform: translate(-50%,-50%) rotate(18deg); width: min(62vh, 545px); aspect-ratio: 1; border-radius: 50%; border: 1px dashed rgba(190,215,255,.28); }
  @keyframes hbBreath2 {
    0%, 100% { box-shadow: 0 0 130px 26px rgba(254,110,40,.5), 0 0 40px 8px rgba(255,170,100,.6); }
    50% { box-shadow: 0 0 180px 38px rgba(254,110,40,.66), 0 0 54px 12px rgba(255,170,100,.75); }
  }
  @keyframes hbEclipse {
    0% { transform: translate(-50%, -50%); }
    12% { transform: translate(calc(-50% - 18%), -50%); }
    38% { transform: translate(calc(-50% - 18%), -50%); }
    50% { transform: translate(-50%, -50%); }
    62% { transform: translate(calc(-50% + 18%), -50%); }
    88% { transform: translate(calc(-50% + 18%), -50%); }
    100% { transform: translate(-50%, -50%); }
  }
  @media (prefers-reduced-motion: reduce) {
    .hb-typo .run, .hb-ecl .sun, .hb-ecl .moon { animation: none; }
  }`;
})();

const Cv = ({ active, hint, refFn }) => (
  <Shell active={active}><canvas ref={refFn} className="hb-cv"></canvas>{hint ? <span className="hb-hint">{hint}</span> : null}</Shell>
);

// 星際穿越 — warp starfield accelerating outward
function Warp({ active }) {
  const ref = useCv(active, (cv, ctx) => {
    let ps = null;
    const reset = (p, maxR) => { p.a = Math.random() * Math.PI * 2; p.d = 8 + Math.random() * 50; p.sp = 1.012 + Math.random() * 0.02; p.o = Math.random() < 0.06; if (maxR) p.d = Math.random() * maxR; };
    return { frame() {
      const w = cv.width, h = cv.height, cx = w * 0.5, cy = h * 0.46, maxR = Math.hypot(w, h) * 0.58;
      if (!ps) { ps = Array.from({ length: 170 }, () => { const p = {}; reset(p, maxR); return p; }); }
      ctx.fillStyle = "rgba(0,47,167,.34)"; ctx.fillRect(0, 0, w, h);
      for (const p of ps) {
        const d2 = p.d * p.sp + 0.4;
        const al = Math.min(1, p.d / (maxR * 0.4));
        ctx.strokeStyle = p.o ? "rgba(254,110,40," + (0.3 + al * 0.6) + ")" : "rgba(210,228,255," + (0.12 + al * 0.6) + ")";
        ctx.lineWidth = 0.8 + al * 1.6;
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(p.a) * p.d, cy + Math.sin(p.a) * p.d);
        ctx.lineTo(cx + Math.cos(p.a) * d2, cy + Math.sin(p.a) * d2);
        ctx.stroke();
        p.d = d2; if (p.d > maxR) reset(p);
      }
    } };
  });
  return <Cv active={active} refFn={ref} />;
}

// 漣漪擴散 — expanding rings; click to drop a ripple
function Ripple({ active }) {
  const ref = useCv(active, (cv, ctx) => {
    let id = 0, cd = 0;
    const rings = [];
    const add = (x, y, r0) => rings.push({ x, y, r: r0 || 2, o: id++ % 5 === 0 });
    const onTap = (e) => { add(e.detail.x, e.detail.y); add(e.detail.x, e.detail.y, -30); };
    window.addEventListener("heroTap", onTap);
    return {
      dispose() { window.removeEventListener("heroTap", onTap); },
      frame() {
        const w = cv.width, h = cv.height;
        ctx.fillStyle = KB; ctx.fillRect(0, 0, w, h);
        if (--cd <= 0) { add(Math.random() * w, Math.random() * h); cd = 46 + Math.random() * 40; }
        for (let i = rings.length - 1; i >= 0; i--) {
          const g = rings[i]; g.r += 2.1; if (g.r <= 0) continue;
          const a = Math.max(0, 1 - g.r / 380);
          ctx.strokeStyle = g.o ? "rgba(254,80,0," + a * 0.8 + ")" : "rgba(185,212,255," + a * 0.5 + ")";
          ctx.lineWidth = g.o ? 1.6 : 1.1;
          ctx.beginPath(); ctx.arc(g.x, g.y, g.r, 0, Math.PI * 2); ctx.stroke();
          if (a <= 0) rings.splice(i, 1);
        }
      }
    };
  });
  return <Cv active={active} refFn={ref} hint="點擊畫面 — 落下漣漪" />;
}

// 雷達掃描 — sweep with orange blips
function Radar({ active }) {
  const ref = useCv(active, (cv, ctx) => {
    let t = 0, blips = null;
    const RTERMS = ["LLM", "RAG", "embedding", "FastAPI", "MongoDB", "Redis", "Azure", "AWS", "K8s"];
    const MF = "11px " + ((getComputedStyle(document.documentElement).getPropertyValue("--font-mono") || "monospace").trim() || "monospace");
    return { frame() {
      t += 0.016;
      const w = cv.width, h = cv.height, cx = w * 0.64, cy = h * 0.47, R = Math.min(w, h) * 0.38;
      if (!blips) blips = Array.from({ length: 9 }, (_, i) => ({ a: Math.random() * Math.PI * 2, d: 0.2 + Math.random() * 0.75, glow: 0, tm: RTERMS[i] }));
      ctx.fillStyle = "rgba(0,47,167,.12)"; ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = "rgba(170,200,255,.3)"; ctx.lineWidth = 1;
      for (let k = 1; k <= 4; k++) { ctx.beginPath(); ctx.arc(cx, cy, R * k / 4, 0, Math.PI * 2); ctx.stroke(); }
      ctx.beginPath(); ctx.moveTo(cx - R, cy); ctx.lineTo(cx + R, cy); ctx.moveTo(cx, cy - R); ctx.lineTo(cx, cy + R); ctx.stroke();
      const ang = t * 1.1;
      const gr = ctx.createLinearGradient(cx, cy, cx + Math.cos(ang) * R, cy + Math.sin(ang) * R);
      gr.addColorStop(0, "rgba(255,255,255,.08)"); gr.addColorStop(1, "rgba(255,255,255,.85)");
      ctx.strokeStyle = gr; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(ang) * R, cy + Math.sin(ang) * R); ctx.stroke();
      for (const b of blips) {
        const da = ((ang - b.a) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
        if (da < 0.06) b.glow = 1;
        b.glow *= 0.986;
        if (b.glow > 0.02) {
          const bx = cx + Math.cos(b.a) * R * b.d, by = cy + Math.sin(b.a) * R * b.d;
          ctx.fillStyle = "rgba(254,80,0," + b.glow + ")";
          ctx.beginPath(); ctx.arc(bx, by, 4.5, 0, Math.PI * 2); ctx.fill();
          ctx.strokeStyle = "rgba(254,110,40," + b.glow * 0.6 + ")"; ctx.lineWidth = 1;
          ctx.beginPath(); ctx.arc(bx, by, 9, 0, Math.PI * 2); ctx.stroke();
          ctx.font = MF;
          ctx.fillStyle = "rgba(230,240,255," + Math.min(1, b.glow * 1.4) + ")";
          ctx.fillText(b.tm, bx + 14, by + 4);
        }
      }
    } };
  });
  return <Cv active={active} refFn={ref} />;
}

// 雙螺旋 — DNA strands across the field
function Dna({ active }) {
  const ref = useCv(active, (cv, ctx) => {
    let t = 0;
    const DTERMS = ["LLM", "RAG", "embedding", "FastAPI", "MongoDB", "Redis", "Azure", "AWS", "K8s"];
    const MF = "12px " + ((getComputedStyle(document.documentElement).getPropertyValue("--font-mono") || "monospace").trim() || "monospace");
    return { frame() {
      t += 0.016;
      const w = cv.width, h = cv.height, cy = h * 0.47, amp = Math.min(120, h * 0.16);
      ctx.fillStyle = KB; ctx.fillRect(0, 0, w, h);
      for (let x = -10; x <= w + 10; x += 20) {
        const ph = x * 0.016 - t * 1.8;
        const y1 = cy + Math.sin(ph) * amp, y2 = cy + Math.sin(ph + Math.PI) * amp;
        const d1 = (Math.cos(ph) + 1) / 2, d2 = 1 - d1;
        const i = (x / 20) | 0;
        if (i % 3 === 0) {
          ctx.strokeStyle = "rgba(160,195,255,.22)"; ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(x, y1); ctx.lineTo(x, y2); ctx.stroke();
        }
        if (i % 9 === 4) {
          const term = DTERMS[(((i - 4) / 9) | 0) % DTERMS.length];
          ctx.font = MF;
          ctx.fillStyle = i % 18 === 4 ? "rgba(254,110,40,.85)" : "rgba(215,230,255,.7)";
          ctx.fillText(term, x - ctx.measureText(term).width / 2, cy + 4);
        }
        const dot = (y, d, orange) => {
          ctx.fillStyle = orange ? "rgba(254,80,0," + (0.3 + 0.65 * d) + ")" : "rgba(205,225,255," + (0.15 + 0.6 * d) + ")";
          ctx.beginPath(); ctx.arc(x, y, 1.4 + 2.6 * d, 0, Math.PI * 2); ctx.fill();
        };
        dot(y1, d1, i % 8 === 0); dot(y2, d2, false);
      }
    } };
  });
  return <Cv active={active} refFn={ref} />;
}

// 線框山脈 — perspective wireframe terrain scrolling toward viewer
function Terra({ active }) {
  const ref = useCv(active, (cv, ctx) => {
    let t = 0;
    const F = (xw, zw) => Math.sin(xw * 1.7 + zw * 0.8) * Math.cos(xw * 0.6 - zw * 0.5) + Math.sin(xw * 3.1 + zw * 1.7) * 0.35;
    return { frame() {
      t += 0.014;
      const w = cv.width, h = cv.height, cx = w / 2, y0 = h * 0.4;
      ctx.fillStyle = KB; ctx.fillRect(0, 0, w, h);
      const sp = t * 1.4, zoff = Math.floor(sp), frac = sp - zoff;
      for (let zi = 26; zi >= 1; zi--) {
        const z = zi - frac; if (z <= 0.2) continue;
        const zw = zoff + zi;
        const sc = 1 / (0.3 * z + 0.7);
        const orange = zw % 13 === 0;
        ctx.strokeStyle = orange ? "rgba(254,80,0," + (0.25 + 0.6 * sc) + ")" : "rgba(180,208,255," + (0.08 + 0.42 * sc) + ")";
        ctx.lineWidth = orange ? 1.5 : 1;
        ctx.beginPath();
        for (let c = 0; c <= 56; c++) {
          const xw = (c / 56) * 2 - 1;
          const e = Math.max(0, F(xw * 3, zw)) * 150 * sc * (0.35 + Math.abs(xw));
          const xs = cx + xw * w * 1.35 * sc;
          const ys = y0 + 320 * sc - e;
          if (c === 0) ctx.moveTo(xs, ys); else ctx.lineTo(xs, ys);
        }
        ctx.stroke();
      }
    } };
  });
  return <Cv active={active} refFn={ref} />;
}

// 諧波軌跡 — harmonograph curve drawing itself, then starting anew
function Harmo({ active }) {
  const ref = useCv(active, (cv, ctx) => {
    let tau = 0, P = null, lx = null, ly = null;
    const R2 = () => Math.random() * Math.PI * 2;
    const newP = () => ({ f1: 2 + ((Math.random() * 3) | 0), f2: 2 + ((Math.random() * 3) | 0), f3: 1 + ((Math.random() * 4) | 0), f4: 1 + ((Math.random() * 4) | 0), p1: R2(), p2: R2() });
    return { frame() {
      const w = cv.width, h = cv.height, cx = w * 0.62, cy = h * 0.47, A = Math.min(w, h) * 0.3;
      if (!P || tau > 300) { ctx.fillStyle = KB; ctx.fillRect(0, 0, w, h); P = newP(); tau = 0; lx = null; }
      ctx.fillStyle = "rgba(0,47,167,.01)"; ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = "rgba(200,222,255,.5)"; ctx.lineWidth = 1;
      ctx.beginPath();
      let px = lx, py = ly;
      for (let k = 0; k < 46; k++) {
        tau += 0.006;
        const dec = Math.exp(-tau * 0.004);
        const x = cx + (Math.sin(P.f1 * tau + P.p1) + Math.sin(P.f3 * tau * 0.5)) * 0.5 * A * dec;
        const y = cy + (Math.sin(P.f2 * tau + P.p2) + Math.sin(P.f4 * tau * 0.5)) * 0.42 * A * dec;
        if (px === null) ctx.moveTo(x, y); else if (k === 0) { ctx.moveTo(px, py); ctx.lineTo(x, y); } else ctx.lineTo(x, y);
        px = x; py = y;
      }
      ctx.stroke();
      lx = px; ly = py;
      ctx.fillStyle = "rgba(254,80,0,.95)";
      ctx.beginPath(); ctx.arc(px, py, 3, 0, Math.PI * 2); ctx.fill();
    } };
  });
  return <Cv active={active} refFn={ref} />;
}

// 幾何旋層 — nested rotating polygons with trails
function Spiro({ active }) {
  const ref = useCv(active, (cv, ctx) => {
    let t = 0;
    return { frame() {
      t += 0.016;
      const w = cv.width, h = cv.height, cx = w * 0.62, cy = h * 0.47;
      ctx.fillStyle = "rgba(0,47,167,.055)"; ctx.fillRect(0, 0, w, h);
      for (let k = 0; k < 5; k++) {
        const n = k + 3, rad = 54 + k * 54;
        const rot = t * (0.25 + k * 0.09) * (k % 2 ? -1 : 1);
        const orange = k === 2;
        ctx.strokeStyle = orange ? "rgba(254,80,0,.6)" : "rgba(195,218,255,.35)";
        ctx.lineWidth = orange ? 1.6 : 1.1;
        ctx.beginPath();
        for (let i = 0; i <= n; i++) {
          const an = rot + (i / n) * Math.PI * 2;
          const x = cx + Math.cos(an) * rad, y = cy + Math.sin(an) * rad;
          if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
    } };
  });
  return <Cv active={active} refFn={ref} />;
}

// 頻譜柱列 — visualizer-style bars along the base
function Bars({ active }) {
  const ref = useCv(active, (cv, ctx) => {
    let t = 0;
    return { frame() {
      t += 0.02;
      const w = cv.width, h = cv.height, n = Math.ceil(w / 16);
      ctx.fillStyle = KB; ctx.fillRect(0, 0, w, h);
      for (let i = 0; i < n; i++) {
        const v = Math.abs(Math.sin(i * 0.33 + t * 1.4) * 0.62 + Math.sin(i * 0.11 - t * 0.8) * 0.38);
        const bh = 24 + v * h * 0.34;
        ctx.fillStyle = v > 0.9 ? "rgba(254,80,0,.85)" : "rgba(185,212,255," + (0.22 + 0.32 * v) + ")";
        ctx.fillRect(i * 16 + 3, h - bh, 9, bh);
      }
    } };
  });
  return <Cv active={active} refFn={ref} />;
}

// 電子軌道 — atom-style elliptical orbits with electrons
function Atom({ active }) {
  const ref = useCv(active, (cv, ctx) => {
    let t = 0;
    const rots = [-0.5, 0.55, 1.6];
    const ATERMS = ["LLM", "RAG", "embedding", "FastAPI", "AWS", "K8s"];
    const MF = "11px " + ((getComputedStyle(document.documentElement).getPropertyValue("--font-mono") || "monospace").trim() || "monospace");
    return { frame() {
      t += 0.016;
      const w = cv.width, h = cv.height, cx = w * 0.66, cy = h * 0.47, R1 = Math.min(w, h) * 0.3;
      ctx.clearRect(0, 0, w, h);
      for (let j = 0; j < 3; j++) {
        ctx.strokeStyle = "rgba(170,200,255,.3)"; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.ellipse(cx, cy, R1, R1 * 0.38, rots[j], 0, Math.PI * 2); ctx.stroke();
        for (let e2 = 0; e2 < 2; e2++) {
          const ang = t * (0.45 + j * 0.18) + j * 2.1 + e2 * Math.PI;
          const ex = Math.cos(ang) * R1, ey = Math.sin(ang) * R1 * 0.38;
          const px = cx + ex * Math.cos(rots[j]) - ey * Math.sin(rots[j]);
          const py = cy + ex * Math.sin(rots[j]) + ey * Math.cos(rots[j]);
          const idx = j * 2 + e2, orange = idx === 2;
          ctx.fillStyle = orange ? "rgba(254,80,0,.25)" : "rgba(220,235,255,.22)";
          ctx.beginPath(); ctx.arc(px, py, 9, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = orange ? "#FE5000" : "#fff";
          ctx.beginPath(); ctx.arc(px, py, 3.5, 0, Math.PI * 2); ctx.fill();
          ctx.font = MF;
          ctx.fillStyle = orange ? "rgba(254,140,80,.95)" : "rgba(215,230,255,.8)";
          ctx.fillText(ATERMS[idx], px + 12, py + 4);
        }
      }
      const nr = 9 + Math.sin(t * 3) * 1.5;
      ctx.fillStyle = "rgba(254,80,0,.25)";
      ctx.beginPath(); ctx.arc(cx, cy, nr * 2.2, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#FE5000";
      ctx.beginPath(); ctx.arc(cx, cy, nr, 0, Math.PI * 2); ctx.fill();
    } };
  });
  return <Cv active={active} refFn={ref} />;
}

// 群鳥飛行 — boids flock, one orange leader
function Flock({ active }) {
  const ref = useCv(active, (cv, ctx) => {
    let bs = null, t = 0;
    return { frame() {
      t += 0.016;
      const cyc = t % 11;
      const scatter = cyc > 7.2 && cyc < 9.4;
      const w = cv.width, h = cv.height;
      if (!bs) bs = Array.from({ length: 54 }, () => ({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - 0.5) * 1.6, vy: (Math.random() - 0.5) * 1.6 }));
      ctx.fillStyle = KB; ctx.fillRect(0, 0, w, h);
      for (let i = 0; i < bs.length; i++) {
        const b = bs[i];
        let ax = 0, ay = 0, mx = 0, my = 0, sx = 0, sy = 0, n = 0;
        for (let j = 0; j < bs.length; j++) {
          if (j === i) continue;
          const o = bs[j], dx = o.x - b.x, dy = o.y - b.y, d = Math.hypot(dx, dy);
          if (d < 70) { ax += o.vx; ay += o.vy; mx += o.x; my += o.y; n++; if (d < 22 && d > 0) { sx -= dx / d; sy -= dy / d; } }
        }
        if (n) {
          const alW = scatter ? 0.012 : 0.045, cohW = scatter ? -0.006 : 0.0045;
          b.vx += (ax / n - b.vx) * alW + (mx / n - b.x) * cohW + sx * 0.09;
          b.vy += (ay / n - b.vy) * alW + (my / n - b.y) * cohW + sy * 0.09;
        }
        const cp = scatter ? 0.00006 : 0.0003;
        b.vx += (w / 2 - b.x) * cp; b.vy += (h / 2 - b.y) * cp;
        if (scatter) { b.vx += (Math.random() - 0.5) * 0.3; b.vy += (Math.random() - 0.5) * 0.3; }
        const sp = Math.hypot(b.vx, b.vy) || 1;
        const lim = Math.min(scatter ? 2.2 : 1.6, Math.max(0.8, sp));
        b.vx = b.vx / sp * lim; b.vy = b.vy / sp * lim;
        b.x += b.vx; b.y += b.vy;
        if (b.x < -20) b.x = w + 20; if (b.x > w + 20) b.x = -20;
        if (b.y < -20) b.y = h + 20; if (b.y > h + 20) b.y = -20;
        const k = i === 0 ? 1.5 : 1;
        ctx.save(); ctx.translate(b.x, b.y); ctx.rotate(Math.atan2(b.vy, b.vx));
        ctx.fillStyle = i === 0 ? "#FE5000" : "rgba(220,235,255,.75)";
        ctx.beginPath(); ctx.moveTo(7 * k, 0); ctx.lineTo(-5 * k, 3.4 * k); ctx.lineTo(-5 * k, -3.4 * k); ctx.closePath(); ctx.fill();
        ctx.restore();
      }
    } };
  });
  return <Cv active={active} refFn={ref} />;
}

// 方格脈衝 — digital cell grid with a diagonal pulse wave
function Cells({ active }) {
  const ref = useCv(active, (cv, ctx) => {
    let t = 0;
    return { frame() {
      t += 0.016;
      const w = cv.width, h = cv.height, s = 44;
      ctx.fillStyle = KB; ctx.fillRect(0, 0, w, h);
      const tk = (t * 2) | 0;
      for (let gy = 0; gy * s < h + s; gy++) for (let gx = 0; gx * s < w + s; gx++) {
        const cxp = gx * s + s / 2, cyp = gy * s + s / 2;
        const v = Math.sin((gx * s + gy * s * 1.3) * 0.005 - t * 2.1) * Math.cos(gy * s * 0.004 + t * 0.7);
        const m = Math.max(0, v);
        const orange = ((gx * 7 + gy * 13 + tk) % 149) === 0;
        const sz = orange ? 20 : 6 + m * 22;
        ctx.fillStyle = orange ? "rgba(254,80,0,.9)" : "rgba(185,212,255," + (0.06 + 0.3 * m) + ")";
        ctx.fillRect(cxp - sz / 2, cyp - sz / 2, sz, sz);
      }
    } };
  });
  return <Cv active={active} refFn={ref} />;
}

// 動態字牆 — kinetic outline typography rows
const TY = "8PLUS · 架構先行 · AI SHIPPED · TRUSTED SYSTEMS · ";
function Typo({ active }) {
  return (
    <Shell active={active} cls="hb-typo">
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <div key={i} className={"row" + (i === 2 ? " o" : "")} style={{ top: 1 + i * 16.5 + "%" }}>
          <div className="run" style={{ animationDuration: 34 + i * 7 + "s", animationDirection: i % 2 ? "reverse" : "normal" }}>
            <span>{TY + TY + TY}</span><span>{TY + TY + TY}</span>
          </div>
        </div>
      ))}
    </Shell>
  );
}

// 日蝕光環 — sun → eclipse → separation, on loop
function Eclipse({ active }) {
  return (
    <Shell active={active} cls="hb-ecl">
      <div className="oring"></div>
      <div className="sun"></div>
      <div className="moon"></div>
    </Shell>
  );
}

Object.assign(window.HeroBackdrops, {
  warp: Warp, ripple: Ripple, radar: Radar, dna: Dna, terra: Terra, harmo: Harmo,
  spiro: Spiro, bars: Bars, atom: Atom, flock: Flock, cells: Cells, typo: Typo, eclipse: Eclipse,
});
