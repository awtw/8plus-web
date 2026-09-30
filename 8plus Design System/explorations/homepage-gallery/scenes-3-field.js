/* Group 3 — 色場與空間 (3a / 3b / 3c / 3d) */
(function(){
  if(!document.getElementById('gallery-style-g3')){
    var st=document.createElement('style'); st.id='gallery-style-g3';
    st.textContent = [
      '.scn-3a{background:radial-gradient(120% 120% at 75% 45%,#0034b6,#00136b 72%)}',
      '.scn-3a .orbwrap{position:absolute;right:8%;top:50%;transform:translateY(-50%);display:flex;align-items:center;justify-content:center}',
      '.scn-3a .orb{width:min(48vh,44vw,460px);aspect-ratio:1;border-radius:47% 53% 55% 45%/50% 48% 52% 50%;',
        'background:conic-gradient(from 0deg,#002FA7,#2f66ff,#FE5000,#ff9a5c,#7bd0ff,#002FA7);',
        'filter:blur(4px) saturate(1.25);animation:orbSpin 18s linear infinite, orbMorph 9s ease-in-out infinite;',
        'box-shadow:0 40px 140px -20px rgba(254,80,0,.5), inset -30px -30px 90px rgba(0,20,90,.7), inset 30px 30px 80px rgba(255,255,255,.25)}',
      '.scn-3a .orb::after{content:"";position:absolute;inset:0;border-radius:inherit;background:radial-gradient(circle at 34% 30%,rgba(255,255,255,.75),transparent 34%)}',
      '.scn-3a .ring{position:absolute;width:min(58vh,52vw,580px);aspect-ratio:1;border-radius:50%;border:1px solid rgba(255,255,255,.18);animation:ringPulse 6s ease-in-out infinite}',
      '@keyframes orbSpin{to{transform:rotate(360deg)}}',
      '@keyframes orbMorph{0%,100%{border-radius:47% 53% 55% 45%/50% 48% 52% 50%}50%{border-radius:56% 44% 43% 57%/46% 55% 45% 54%}}',
      '@keyframes ringPulse{0%,100%{transform:scale(1);opacity:.5}50%{transform:scale(1.06);opacity:.15}}',
      '@media(max-width:700px){.scn-3a .orbwrap{right:50%;top:34%;transform:translate(50%,-50%)}}',

      '.scn-3b{background:var(--blue)}',
      '.scn-3b .bands{position:absolute;inset:0;z-index:0;display:flex;flex-direction:column;justify-content:center;gap:0;opacity:.9}',
      '.scn-3b .track{white-space:nowrap;font-family:var(--sans);font-weight:900;font-size:15vh;line-height:1.05;letter-spacing:-.02em;display:flex;will-change:transform}',
      '.scn-3b .track span{padding-right:.4em}',
      '.scn-3b .t1{color:transparent;-webkit-text-stroke:1.5px rgba(255,255,255,.5);animation:mLeft3b 26s linear infinite}',
      '.scn-3b .t2{color:var(--orange);animation:mRight3b 30s linear infinite}',
      '.scn-3b .t3{color:transparent;-webkit-text-stroke:1.5px rgba(255,255,255,.28);animation:mLeft3b 34s linear infinite}',
      '@keyframes mLeft3b{to{transform:translateX(-33.33%)}}',
      '@keyframes mRight3b{from{transform:translateX(-33.33%)}to{transform:translateX(0)}}',
      '@media(max-width:700px){.scn-3b .track{font-size:11vh}}',

      '.scn-3c{background:var(--blue);overflow:hidden}',
      '.scn-3c .half{position:absolute;inset:0;z-index:0}',
      '.scn-3c .h-orange{background:var(--orange);clip-path:polygon(100% 0,100% 100%,32% 100%,58% 0);animation:diag3c 12s ease-in-out infinite}',
      '.scn-3c .h-blue{background:linear-gradient(140deg,#0038c9,#001542);clip-path:polygon(0 0,55% 0,29% 100%,0 100%);animation:diag2_3c 12s ease-in-out infinite}',
      '.scn-3c .seam{position:absolute;top:-10%;left:0;width:140%;height:120%;z-index:1;pointer-events:none;',
        'background:linear-gradient(105deg,transparent 42%,rgba(255,255,255,.9) 50%,transparent 58%);mix-blend-mode:overlay;transform:translateX(-6%);animation:seam3c 6s ease-in-out infinite}',
      '@keyframes diag3c{0%,100%{clip-path:polygon(100% 0,100% 100%,32% 100%,58% 0)}50%{clip-path:polygon(100% 0,100% 100%,28% 100%,54% 0)}}',
      '@keyframes diag2_3c{0%,100%{clip-path:polygon(0 0,55% 0,29% 100%,0 100%)}50%{clip-path:polygon(0 0,51% 0,25% 100%,0 100%)}}',
      '@keyframes seam3c{0%,100%{transform:translateX(-8%)}50%{transform:translateX(4%)}}',
      '.scn-3c .tags{position:absolute;right:44px;bottom:60px;font-family:var(--mono);font-size:11px;letter-spacing:.14em;color:rgba(255,255,255,.85);text-align:right;line-height:2;z-index:2}',
      '@media(max-width:700px){.scn-3c .tags{display:none}}',

      '.scn-3d{background:radial-gradient(120% 120% at 50% 30%,#00135f,#04061a 80%)}',
      '.scn-3d .tunnel{position:absolute;inset:0;z-index:0;perspective:520px;perspective-origin:50% 42%;overflow:hidden}',
      '.scn-3d .floor{position:absolute;left:-50%;right:-50%;bottom:-20%;height:150%;transform:rotateX(76deg);transform-origin:bottom center;',
        'background-image:linear-gradient(rgba(123,168,255,.55) 1px,transparent 1px),linear-gradient(90deg,rgba(123,168,255,.35) 1px,transparent 1px);',
        'background-size:64px 64px;animation:flow3d 2.6s linear infinite;mask-image:linear-gradient(transparent,#000 40%)}',
      '.scn-3d .glow{position:absolute;left:0;right:0;top:36%;height:40%;z-index:0;',
        'background:radial-gradient(60% 100% at 50% 100%,rgba(254,80,0,.5),transparent 70%);filter:blur(20px)}',
      '@keyframes flow3d{to{background-position:0 64px}}'
    ].join('\n');
    document.head.appendChild(st);
  }

  window.GALLERY_SCENES = window.GALLERY_SCENES || [];
  window.GALLERY_SCENES.push(
    {
      id:'3a', group:'g3', label:'磁流體光球', align:'left',
      thumb:'conic-gradient(#002FA7,#2f66ff,#FE5000,#7bd0ff,#002FA7)',
      mount:function(root){
        root.innerHTML = '<div class="orbwrap"><div class="ring"></div><div class="orb"></div></div>';
        return null;
      }
    },
    {
      id:'3b', group:'g3', label:'動態字幕帶', align:'left',
      thumb:'var(--blue)',
      mount:function(root){
        root.innerHTML =
          '<div class="bands" aria-hidden="true">'+
            '<div class="track t1"><span>ARCHITECTURE — DELIVERY —&nbsp;</span><span>ARCHITECTURE — DELIVERY —&nbsp;</span><span>ARCHITECTURE — DELIVERY —&nbsp;</span></div>'+
            '<div class="track t2"><span>CONSULT · BUILD · SHIP&nbsp;</span><span>CONSULT · BUILD · SHIP&nbsp;</span><span>CONSULT · BUILD · SHIP&nbsp;</span></div>'+
            '<div class="track t3"><span>8PLUS — 8PLUS — 8PLUS —&nbsp;</span><span>8PLUS — 8PLUS — 8PLUS —&nbsp;</span><span>8PLUS — 8PLUS — 8PLUS —&nbsp;</span></div>'+
          '</div>';
        return null;
      }
    },
    {
      id:'3c', group:'g3', label:'對角對撞', align:'left',
      thumb:'linear-gradient(135deg,#0038c9,#FE5000)',
      mount:function(root){
        root.innerHTML =
          '<div class="half h-blue"></div><div class="half h-orange"></div><div class="seam"></div>'+
          '<div class="tags">CONSULTING<br>ARCHITECTURE<br>FULL-STACK<br>FREELANCE</div>';
        return null;
      }
    },
    {
      id:'3d', group:'g3', label:'格線隧道', align:'center',
      thumb:'radial-gradient(circle at 50% 30%,#7bd0ff,#00135f 70%)',
      mount:function(root){
        root.innerHTML = '<div class="tunnel"><div class="floor"></div></div><div class="glow"></div>';
        return null;
      }
    }
  );
})();
