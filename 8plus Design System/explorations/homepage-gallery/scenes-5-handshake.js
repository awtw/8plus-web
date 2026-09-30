/* Group 5 — 握手與焦點 (5a / 5b / 5c / 5d) */
(function(){
  if(!document.getElementById('gallery-style-g5')){
    var st=document.createElement('style'); st.id='gallery-style-g5';
    st.textContent = [
      '.scn-5a{background:var(--dark)}',
      '.scn-5a svg{position:absolute;inset:0;width:100%;height:100%}',
      '.scn-5a .flowline{fill:none;stroke-linecap:round;stroke-dasharray:var(--len);stroke-dashoffset:var(--len);animation:draw5a 2.4s ease forwards}',
      '@keyframes draw5a{to{stroke-dashoffset:0}}',
      '.scn-5a .spark{position:absolute;width:26px;height:26px;border-radius:50%;background:radial-gradient(circle,#fff,#FE5000 55%,transparent 72%);',
        'box-shadow:0 0 40px 12px rgba(254,80,0,.6);animation:sparkPulse5a 2.6s ease-in-out infinite;opacity:0;animation-delay:2.2s;animation-fill-mode:forwards}',
      '@keyframes sparkPulse5a{0%{opacity:0;transform:scale(.4)}30%{opacity:1}50%{transform:scale(1.15)}70%{transform:scale(1)}100%{opacity:1;transform:scale(1.08)}}',

      '.scn-5b{background:var(--dark)}',
      '.scn-5b .frame{position:absolute;inset:0;overflow:hidden}',
      '.scn-5b image-slot{filter:saturate(1.15) contrast(1.05);display:block;width:100%;height:100%}',
      '.scn-5b .duo{position:absolute;inset:0;pointer-events:none;mix-blend-mode:color;',
        'background:linear-gradient(100deg,rgba(0,47,167,.55) 0%,rgba(0,47,167,.15) 42%,rgba(254,80,0,.15) 58%,rgba(254,80,0,.6) 100%)}',
      '.scn-5b .vign{position:absolute;inset:0;pointer-events:none;background:radial-gradient(120% 100% at 40% 45%,transparent 40%,rgba(4,6,26,.6) 100%)}',

      '.scn-5c{background:var(--dark);display:flex;align-items:center;justify-content:center}',
      '.scn-5c .rays{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:min(72vh,72vw,680px);aspect-ratio:1}',
      '.scn-5c .rays span{position:absolute;left:50%;top:50%;width:50%;height:1px;transform-origin:left center;background:linear-gradient(90deg,rgba(123,168,255,.55),transparent)}',
      '.scn-5c .glyph{position:relative;font-family:var(--sans);font-weight:900;font-size:min(46vh,40vw,420px);line-height:.8;letter-spacing:-.05em;color:#fff;',
        'text-shadow:0 0 80px rgba(47,102,255,.5);animation:floaty5c 6s ease-in-out infinite}',
      '.scn-5c .glyph sup{font-size:.34em;vertical-align:super;color:var(--orange);text-shadow:0 0 50px rgba(254,80,0,.7)}',
      '.scn-5c .ring{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);border-radius:50%;border:1px solid rgba(254,80,0,.4);',
        'width:min(54vh,50vw,560px);aspect-ratio:1;animation:spin5c 30s linear infinite}',
      '.scn-5c .ring::before{content:"";position:absolute;top:-5px;left:50%;width:9px;height:9px;border-radius:50%;background:var(--orange);box-shadow:0 0 20px 4px rgba(254,80,0,.8)}',
      '@keyframes floaty5c{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}',
      '@keyframes spin5c{to{transform:translate(-50%,-50%) rotate(360deg)}}',

      '.scn-5d canvas{position:absolute;inset:0;display:block}'
    ].join('\n');
    document.head.appendChild(st);
  }

  window.GALLERY_SCENES = window.GALLERY_SCENES || [];
  window.GALLERY_SCENES.push(
    {
      id:'5a', group:'g5', label:'線流交會', align:'right',
      thumb:'linear-gradient(135deg,#04061a,#9fc0ff 40%,#FE5000)',
      mount:function(root){
        var ns='http://www.w3.org/2000/svg';
        var svg=document.createElementNS(ns,'svg'); svg.setAttribute('viewBox','0 0 1000 800'); svg.setAttribute('preserveAspectRatio','xMidYMid slice');
        root.appendChild(svg);
        var spark=document.createElement('div'); spark.className='spark'; root.appendChild(spark);
        var P={x:560,y:360};
        function add(x1,y1,cx,cy,col,w,op,i){
          var p=document.createElementNS(ns,'path');
          p.setAttribute('d','M '+x1+' '+y1+' Q '+cx+' '+cy+' '+P.x+' '+P.y);
          p.setAttribute('class','flowline'); p.setAttribute('stroke',col); p.setAttribute('stroke-width',w); p.setAttribute('opacity',op);
          var len=Math.hypot(cx-x1,cy-y1)+Math.hypot(P.x-cx,P.y-cy);
          p.style.setProperty('--len',len); p.style.animationDelay=(i*0.05)+'s'; svg.appendChild(p);
        }
        for(var i=0;i<16;i++){ var y=120+i*30; add(-40,y,300,(y+P.y)/2, i%4===0?'#9fc0ff':'rgba(255,255,255,.85)', i%4===0?1.2:0.85, .55, i); }
        for(var j=0;j<14;j++){ var x=520+j*36; add(x,860,(x+P.x)/2,620, j%3===0?'#ffb27a':'#FE5000', j%3===0?1.4:1, .6, j); }
        function place(){
          var v=root.getBoundingClientRect();
          var s=Math.max(v.width/1000, v.height/800);
          var ox=(v.width-1000*s)/2, oy=(v.height-800*s)/2;
          spark.style.left=(ox+P.x*s-13)+'px'; spark.style.top=(oy+P.y*s-13)+'px';
        }
        place();
        return null;
      }
    },
    {
      id:'5b', group:'g5', label:'握手實照（可換圖）', align:'right',
      thumb:'linear-gradient(100deg,#002FA7,#FE5000)',
      mount:function(root){
        root.innerHTML =
          '<div class="frame">'+
            '<image-slot id="galleryHandshake" shape="rect" fit="cover" '+
              'src="../../uploads/CleanShot%202026-07-09%20at%2005.46.47%402x.png" '+
              'placeholder="拖入你的網格手×熱感手照片"></image-slot>'+
            '<div class="duo"></div><div class="vign"></div>'+
          '</div>';
        return null;
      }
    },
    {
      id:'5c', group:'g5', label:'8+ 巨型字標', align:'right',
      thumb:'radial-gradient(circle,#2f66ff,#04061a 70%)',
      mount:function(root){
        root.innerHTML = '<div class="rays"></div><div class="ring"></div><div class="glyph">8<sup>+</sup></div>';
        var rays = root.querySelector('.rays');
        for(var i=0;i<40;i++){ var s=document.createElement('span'); s.style.transform='rotate('+(i*9)+'deg)'; s.style.opacity=(0.15+Math.random()*0.4); rays.appendChild(s); }
        return null;
      }
    },
    {
      id:'5d', group:'g5', label:'粒子指尖', align:'right',
      thumb:'#04061a',
      mount:function(root, ctx){
        root.innerHTML = '<canvas></canvas>';
        var cv = root.querySelector('canvas');
        var dpr = Math.min(devicePixelRatio||1, 2);
        var r = root.getBoundingClientRect(); var W=r.width, H=r.height;
        cv.width=W*dpr; cv.height=H*dpr; cv.style.width='100%'; cv.style.height='100%';
        var g = cv.getContext('2d'); g.scale(dpr,dpr);
        var P0={x:W*0.5,y:H*0.44};
        var count = Math.min(ctx.isMobile?170:360, (W*H/3000)|0);
        var ps = Array.from({length:count},function(){
          var side=Math.random()<.55;
          var ang = side ? (Math.PI*(0.75+Math.random()*0.5)) : (Math.random()*0.5-0.25);
          var rr = 120+Math.random()*Math.max(W,H)*0.5;
          return {tx:P0.x+Math.cos(ang)*rr, ty:P0.y+Math.sin(ang)*rr, x:Math.random()*W, y:Math.random()*H,
            c: side ? (Math.random()<.25?'159,192,255':'255,255,255') : '254,80,0'};
        });
        var t=0, raf;
        function draw(){
          t+=0.01; g.fillStyle='rgba(4,6,26,.16)'; g.fillRect(0,0,W,H);
          for(var k=0;k<ps.length;k++){
            var p=ps[k]; var dx=p.tx-p.x, dy=p.ty-p.y;
            p.x+=dx*0.04; p.y+=dy*0.04; p.x+=Math.sin(t+p.ty)*0.3;
            g.fillStyle='rgba('+p.c+',.85)'; g.beginPath(); g.arc(p.x,p.y,1.5,0,7); g.fill();
            var dP=Math.hypot(p.x-P0.x,p.y-P0.y);
            if(dP<90){ g.strokeStyle='rgba('+p.c+','+((1-dP/90)*.4)+')'; g.lineWidth=.6;
              g.beginPath(); g.moveTo(p.x,p.y); g.lineTo(P0.x,P0.y); g.stroke(); }
          }
          var gr=g.createRadialGradient(P0.x,P0.y,0,P0.x,P0.y,60);
          gr.addColorStop(0,'rgba(254,80,0,.5)'); gr.addColorStop(1,'rgba(254,80,0,0)');
          g.fillStyle=gr; g.fillRect(P0.x-60,P0.y-60,120,120);
          raf=requestAnimationFrame(draw);
        }
        if(!ctx.reduce) draw();
        else { g.fillStyle='#04061a'; g.fillRect(0,0,W,H); for(var k2=0;k2<ps.length;k2++){ var p2=ps[k2]; g.fillStyle='rgba('+p2.c+',.85)'; g.beginPath(); g.arc(p2.tx,p2.ty,1.5,0,7); g.fill(); } }
        return function(){ cancelAnimationFrame(raf); };
      }
    }
  );
})();
