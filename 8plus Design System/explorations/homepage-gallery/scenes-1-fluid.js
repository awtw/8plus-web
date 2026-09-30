/* Group 1 — 流體與形態 (1a / 1b / 1c) */
(function(){
  if(!document.getElementById('gallery-svg-defs')){
    var div=document.createElement('div'); div.id='gallery-svg-defs';
    div.style.cssText='position:absolute;width:0;height:0;overflow:hidden';
    div.innerHTML =
      '<svg width="0" height="0"><defs>'+
      '<filter id="goofilter-1a"><feGaussianBlur in="SourceGraphic" stdDeviation="18" result="blur"/>'+
      '<feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 26 -11" result="goo"/>'+
      '<feBlend in="SourceGraphic" in2="goo"/></filter>'+
      '</defs></svg>';
    document.body.appendChild(div);
  }
  if(!document.getElementById('gallery-style-g1')){
    var st=document.createElement('style'); st.id='gallery-style-g1';
    st.textContent = [
      '.scn-1a{background:radial-gradient(120% 120% at 50% 40%,#0d1226,#05070f)}',
      '.scn-1a .goo{position:absolute;inset:0;filter:url(#goofilter-1a);z-index:1}',
      '.scn-1a .blob{position:absolute;border-radius:50%;will-change:transform}',

      '.scn-1b{background:linear-gradient(120deg,#04061a 0%,#0a1030 55%,#1a0a04 100%)}',
      '.scn-1b .grid{position:absolute;inset:0;z-index:0;opacity:.5;',
        'background-image:linear-gradient(rgba(255,255,255,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.06) 1px,transparent 1px);',
        'background-size:72px 72px;mask-image:radial-gradient(circle at 68% 50%,#000,transparent 72%)}',
      '.scn-1b .scene3d{position:absolute;right:10%;top:50%;transform:translateY(-50%);',
        'width:clamp(190px,36vmin,420px);height:clamp(190px,36vmin,420px);perspective:1200px;z-index:1}',
      '.scn-1b .token{position:absolute;inset:0;transform-style:preserve-3d;animation:spin1b 16s linear infinite;will-change:transform}',
      '.scn-1b .face{position:absolute;top:50%;left:50%;width:62%;height:62%;margin:-31% 0 0 -31%;display:flex;align-items:center;justify-content:center;',
        'border-radius:18%;backface-visibility:hidden;font-family:var(--sans);font-weight:900;color:#fff;box-shadow:inset 0 0 0 1px rgba(255,255,255,.2)}',
      '.scn-1b .f-front{background:linear-gradient(145deg,var(--blue),#0038c9);transform:translateZ(31%)}',
      '.scn-1b .f-back{background:linear-gradient(145deg,var(--orange),#ff7a3c);transform:rotateY(180deg) translateZ(31%)}',
      '.scn-1b .f-right{background:linear-gradient(145deg,var(--orange),#c93d00);transform:rotateY(90deg) translateZ(31%)}',
      '.scn-1b .f-left{background:linear-gradient(145deg,var(--blue),#001e6e);transform:rotateY(-90deg) translateZ(31%)}',
      '.scn-1b .f-top{background:#0f1738;transform:rotateX(90deg) translateZ(31%)}',
      '.scn-1b .f-bottom{background:#0f1738;transform:rotateX(-90deg) translateZ(31%)}',
      '.scn-1b .glyph{font-size:2.6em;line-height:1;letter-spacing:-.04em}',
      '.scn-1b .glyph sup{font-size:.42em;vertical-align:super}',
      '@keyframes spin1b{from{transform:rotateX(-14deg) rotateY(0)}to{transform:rotateX(-14deg) rotateY(360deg)}}',
      '@media(max-width:700px){.scn-1b .scene3d{right:50%;top:32%;transform:translate(50%,-50%);width:clamp(150px,50vmin,260px);height:clamp(150px,50vmin,260px)}}',

      '.scn-1c{background:#05070f}',
      '.scn-1c .aurora{position:absolute;inset:-20%;z-index:0;filter:blur(60px);opacity:.75}',
      '.scn-1c .a1{position:absolute;width:56vw;height:56vw;border-radius:50%;background:radial-gradient(circle,var(--blue),transparent 62%);',
        'left:-8vw;top:-6vw;animation:float1c 18s ease-in-out infinite}',
      '.scn-1c .a2{position:absolute;width:50vw;height:50vw;border-radius:50%;background:radial-gradient(circle,var(--orange),transparent 62%);',
        'right:-6vw;bottom:-10vw;animation:float2c 22s ease-in-out infinite}',
      '@keyframes float1c{0%,100%{transform:translate(0,0)}50%{transform:translate(8vw,6vh)}}',
      '@keyframes float2c{0%,100%{transform:translate(0,0)}50%{transform:translate(-7vw,-5vh)}}'
    ].join('\n');
    document.head.appendChild(st);
  }

  window.GALLERY_SCENES = window.GALLERY_SCENES || [];
  window.GALLERY_SCENES.push(
    {
      id:'1a', group:'g1', label:'流體對撞', align:'left',
      thumb:'radial-gradient(circle at 35% 35%,#2f66ff,#0d1226 60%)',
      mount:function(root, ctx){
        root.innerHTML = '<div class="goo"></div>';
        var goo = root.querySelector('.goo');
        var palette=['#002FA7','#002FA7','#FE5000','#FE5000','#0038c9','#ff7a3c'];
        var n = ctx.isMobile ? 4 : 6;
        var blobs=[];
        for(var i=0;i<n;i++){
          var d=document.createElement('div'); d.className='blob';
          var size=(ctx.isMobile?150:220)+Math.random()*(ctx.isMobile?150:260);
          d.style.width=d.style.height=size+'px';
          var col=palette[i%palette.length];
          d.style.background='radial-gradient(circle at 40% 40%, '+col+', '+col+' 55%, transparent 72%)';
          goo.appendChild(d);
          blobs.push({el:d,size:size,x:Math.random(),y:Math.random(),
            ax:0.00006+Math.random()*0.00012, ay:0.00006+Math.random()*0.00012,
            px:Math.random()*Math.PI*2, py:Math.random()*Math.PI*2,
            rx:0.18+Math.random()*0.24, ry:0.18+Math.random()*0.24});
        }
        var tmx=0.5,tmy=0.5,mx=0.5,my=0.5;
        function onMove(e){ tmx=e.clientX/innerWidth; tmy=e.clientY/innerHeight; }
        addEventListener('mousemove', onMove);
        var raf;
        function frame(t){
          mx += (tmx-mx)*0.05; my += (tmy-my)*0.05;
          var r=root.getBoundingClientRect(), W=r.width, H=r.height;
          blobs.forEach(function(b,i){
            var cx=(0.5+Math.cos(t*b.ax+b.px)*b.rx+(mx-0.5)*0.06*(i%2?1:-1))*W-b.size/2;
            var cy=(0.5+Math.sin(t*b.ay+b.py)*b.ry+(my-0.5)*0.06*(i%2?-1:1))*H-b.size/2;
            b.el.style.transform='translate('+cx+'px,'+cy+'px)';
          });
          raf=requestAnimationFrame(frame);
        }
        if(!ctx.reduce) raf=requestAnimationFrame(frame);
        else blobs.forEach(function(b,i){ b.el.style.transform='translate('+((0.3+i*0.12)*root.clientWidth)+'px,'+((0.3+(i%3)*0.2)*root.clientHeight)+'px)'; });
        return function(){ cancelAnimationFrame(raf); removeEventListener('mousemove', onMove); };
      }
    },
    {
      id:'1b', group:'g1', label:'3D 字標', align:'left',
      thumb:'linear-gradient(135deg,#0038c9,#FE5000)',
      mount:function(root){
        root.innerHTML =
          '<div class="grid"></div>'+
          '<div class="scene3d"><div class="token">'+
            '<div class="face f-front"><span class="glyph">8<sup>+</sup></span></div>'+
            '<div class="face f-back"><span class="glyph">8<sup>+</sup></span></div>'+
            '<div class="face f-right"></div><div class="face f-left"></div>'+
            '<div class="face f-top"></div><div class="face f-bottom"></div>'+
          '</div></div>';
        return null;
      }
    },
    {
      id:'1c', group:'g1', label:'液態折射', align:'left',
      thumb:'radial-gradient(circle at 30% 30%,#002FA7,#05070f 55%)',
      mount:function(root){
        root.innerHTML = '<div class="aurora"><div class="a1"></div><div class="a2"></div></div>';
        return null;
      }
    }
  );
})();
