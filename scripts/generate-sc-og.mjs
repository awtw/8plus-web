// Generates public/og/sc-mokyuu.png — the social card for /sc (MOKYUU hub).
// Usage: node scripts/generate-sc-og.mjs   (needs CJK serif fonts installed, e.g. macOS Songti TC)
import sharp from "sharp";

const W = 1200;
const H = 630;
const serif = "'Songti TC','Noto Serif TC','Noto Serif CJK TC',serif";
const latinSerif = "'Instrument Serif','Times New Roman',serif";
const mono = "'JetBrains Mono','Menlo',monospace";

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <radialGradient id="glow" cx="85%" cy="0%" r="80%">
      <stop offset="0" stop-color="#5C86FF" stop-opacity="0.45"/>
      <stop offset="1" stop-color="#002FA7" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="#002FA7"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <g transform="translate(80 72)">
    <rect width="96" height="96" rx="21" fill="#002FA7" stroke="#EEECE6" stroke-opacity="0.4" stroke-width="2"/>
    <g transform="translate(3.43 2.44) scale(0.8914)">
      <path fill="#F4F2EE" d="M8 86L8 16L50 63L92 16L92 86L75 86L75 59.04L50 87.01L25 59.04L25 86Z"/>
      <path fill="#FF401F" d="M35.1 30.1a14.9 14.9 0 1 0 29.8 0a14.9 14.9 0 1 0 -29.8 0Z"/>
    </g>
    <text x="124" y="40" font-family="${mono}" font-size="20" letter-spacing="3" fill="#BECAF0">(Ø1) DIGITAL PERSONA — TAIPEI</text>
    <text x="124" y="80" font-family="${mono}" font-size="20" letter-spacing="3" fill="#BECAF0">8PLUS.APP/SC</text>
  </g>
  <text x="80" y="330" font-family="${serif}" font-weight="700" font-size="128" fill="#EEECE6">墨語 <tspan font-family="${latinSerif}" font-style="italic" font-weight="400">MOKYUU</tspan></text>
  <text x="80" y="420" font-family="${serif}" font-size="46" fill="#EEECE6">把想法磨成墨，寫成一個世界。</text>
  <g font-family="${serif}" font-size="28" fill="#EEECE6">
    <rect x="80" y="478" width="300" height="60" rx="30" fill="#EEECE6"/>
    <text x="230" y="518" text-anchor="middle" fill="#08080A" font-weight="700">辦公室觀察日誌</text>
    <rect x="400" y="478" width="236" height="60" rx="30" fill="none" stroke="#EEECE6" stroke-opacity="0.6" stroke-width="2"/>
    <text x="518" y="518" text-anchor="middle">職場求生記</text>
    <text x="664" y="518" font-family="${mono}" font-size="20" letter-spacing="2" fill="#BECAF0">FREE WEB GAMES ↗</text>
  </g>
  <g transform="translate(1040 452) rotate(-8)">
    <rect x="-52" y="-52" width="104" height="104" rx="10" fill="#FF401F" fill-opacity="0.1" stroke="#FF401F" stroke-width="4"/>
    <text x="0" y="22" text-anchor="middle" font-family="${serif}" font-weight="700" font-size="62" fill="#FF401F">墨</text>
  </g>
  <rect y="${H - 10}" width="${W}" height="10" fill="#FF401F"/>
</svg>`;

await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile("public/og/sc-mokyuu.png");
console.log("wrote public/og/sc-mokyuu.png");
