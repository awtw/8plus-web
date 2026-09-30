/* Group 8 — 透視隧道 (8a / 8b / 8c) */
(function(){
  if(!document.getElementById('gallery-style-g8')){
    var st=document.createElement('style'); st.id='gallery-style-g8';
    st.textContent = [
      '.scn-8a,.scn-8b,.scn-8c{background:radial-gradient(120% 120% at 50% 42%,#0a1a63 0%,#050a2e 46%,#04061a 82%)}',
      '.scn-8a .scene8,.scn-8b .scene8,.scn-8c .scene8{position:absolute;inset:0;z-index:0;perspective:560px;perspective-origin:50% 42%;overflow:hidden}',
      '.plane8{position:absolute;left:-60%;right:-60%;height:170%;',
        'background-image:linear-gradient(rgba(150,185,255,.62) 1.3px,transparent 1.3px),linear-gradient(90deg,rgba(150,185,255,.4) 1.3px,transparent 1.3px);',
        'background-size:60px 60px;animation:flow8 2.3s linear infinite}',
      '.floor8{bottom:-30%;transform:rotateX(74deg);transform-origin:bottom center;',
        '-webkit-mask-image:linear-gradient(transparent,#000 32%);mask-image:linear-gradient(transparent,#000 32%)}',
      '.ceil8{top:-30%;transform:rotateX(-74deg);transform-origin:top center;',
        '-webkit-mask-image:linear-gradient(#000 68%,transparent);mask-image:linear-gradient(#000 68%,transparent);opacity:.7}',
      '@keyframes flow8{to{background-position:0 60px}}',
      '.warp8{position:absolute;inset:0;z-index:1;display:block}',
      '.halo8{position:absolute;left:50%;top:42%;transform:translate(-50%,-50%);z-index:1;width:60vw;height:60vw;',
        'background:radial-gradient(circle,rgba(254,80,0,.32),transparent 62%);filter:blur(30px);pointer-events:none}',
      '.focal8{position:absolute;left:50%;top:38%;transform:translate(-50%,-50%);z-index:2;pointer-events:none}',
      '.sun8{width:min(26vh,26vw,270px);aspect-ratio:1;border-radius:50%;',
        'background:linear-gradient(#7bd0ff,#2f66ff 34%,#FE5000 78%,#ff9a5c);box-shadow:0 0 90px rgba(254,80,0,.6),0 0 40px rgba(47,102,255,.5)}',
      '.sun8::after{content:"";position:absolute;left:0;right:0;bottom:0;top:38%;border-radius:0 0 50% 50%/0 0 100% 100%;',
        'background:repeating-linear-gradient(#04061a 0 3px,transparent 3px 12px);opacity:.9}',
      '.core8{position:relative;width:min(30vh,30vw,300px);aspect-ratio:1;display:flex;align-items:center;justify-content:center}',
      '.core8 .r{position:absolute;border-radius:50%;border:1px solid rgba(123,208,255,.6)}',
      '.core8 .r1{inset:0;animation:spin8 22s linear infinite}',
      '.core8 .r2{inset:16%;border-color:rgba(255,255,255,.4);animation:spin8 16s linear infinite reverse}',
      '.core8 .r3{inset:33%;border-color:rgba(254,80,0,.7);animation:spin8 11s linear infinite}',
      '.core8 .dot{width:26%;aspect-ratio:1;border-radius:50%;background:radial-gradient(circle at 40% 35%,#fff,#FE5000 60%,#c93d00);',
        'box-shadow:0 0 60px rgba(254,80,0,.8);animation:pulse8 3s ease-in-out infinite}',
      '@keyframes spin8{to{transform:rotate(360deg)}}',
      '@keyframes pulse8{0%,100%{transform:scale(1);opacity:.95}50%{transform:scale(1.12);opacity:1}}',
      '.tokwrap8{perspective:900px;width:min(26vh,26vw,260px);aspect-ratio:1}',
      '.tok8{position:relative;width:100%;height:100%;transform-style:preserve-3d;animation:tokspin8 14s linear infinite}',
      '.tok8 .f{position:absolute;inset:18%;display:flex;align-items:center;justify-content:center;border-radius:26px;',
        'font-family:var(--sans);font-weight:900;font-size:18vh;color:#fff;backface-visibility:hidden;box-shadow:inset 0 0 0 1px rgba(255,255,255,.25)}',
      '.tok8 .ff{background:linear-gradient(145deg,#002FA7,#0038c9);transform:translateZ(34%)}',
      '.tok8 .fb{background:linear-gradient(145deg,#FE5000,#ff7a3c);transform:rotateY(180deg) translateZ(34%)}',
      '.tok8 .fr{background:linear-gradient(145deg,#FE5000,#c93d00);transform:rotateY(90deg) translateZ(34%)}',
      '.tok8 .fl{background:linear-gradient(145deg,#002FA7,#001e6e);transform:rotateY(-90deg) translateZ(34%)}',
      '.tok8 .f sup{font-size:.4em;vertical-align:super}',
      '@keyframes tokspin8{from{transform:rotateX(-12deg) rotateY(0)}to{transform:rotateX(-12deg) rotateY(360deg)}}'
    ].join('\n');
    document.head.appendChild(st);
  }

  function baseTunnel(root, ctx){
    root.innerHTML =
      '<div class="scene8"><div class="plane8 floor8"></div><div class="plane8 ceil8"></div></div>'+
      '<div class="halo8"></div><canvas class="warp8"></canvas>';
    var scene = root.querySelector('.scene8');
    function onMove(e){
      var dx=(e.clientX/innerWidth-.5), dy=(e.clientY/innerHeight-.5);
      scene.style.transform='translate('+(dx*-22)+'px,'+(dy*-14)+'px)';
    }
    if(!ctx.reduce) addEventListener('mousemove', onMove);

    var cv = root.querySelector('.warp8');
    var dpr = Math.min(devicePixelRatio||1, 2);
    var r = root.getBoundingClientRect(); var W=r.width, H=r.height;
    cv.width = W*dpr; cv.height = H*dpr; cv.style.width='100%'; cv.style.height='100%';
    var g = cv.getContext('2d'); g.scale(dpr,dpr);
    var cx=W/2, cy=H*0.42, scale=Math.min(W,H)*0.9;
    var cols=['rgba(255,255,255,','rgba(123,208,255,','rgba(254,80,0,'];
    function mk(z){
      var ang=Math.random()*Math.PI*2, rr=0.15+Math.random()*0.9;
      return {x:Math.cos(ang)*rr, y:Math.sin(ang)*rr*0.7, z:z||1, c:cols[Math.random()<.22?(Math.random()<.5?1:2):0], px:null, py:null};
    }
    var n = Math.min(ctx.isMobile?90:160, Math.floor(W*H/9000));
    var stars = Array.from({length:n},function(){ return mk(Math.random()); });
    var raf;
    function frame(){
      g.fillStyle='rgba(4,6,26,.32)'; g.fillRect(0,0,W,H);
      for(var i=0;i<stars.length;i++){
        var s=stars[i]; s.z-=0.006;
        if(s.z<=0.05){ Object.assign(s, mk(1)); continue; }
        var sx=cx+s.x/s.z*scale, sy=cy+s.y/s.z*scale;
        var size=(1-s.z)*2.6;
        if(s.px!==null){ g.strokeStyle=s.c+((1-s.z)*0.9)+')'; g.lineWidth=size;
          g.beginPath(); g.moveTo(s.px,s.py); g.lineTo(sx,sy); g.stroke(); }
        s.px=sx; s.py=sy;
      }
      raf=requestAnimationFrame(frame);
    }
    if(!ctx.reduce) frame();
    else {
      g.fillStyle='#04061a'; g.fillRect(0,0,W,H);
      for(var k=0;k<stars.length;k++){ var s2=stars[k]; var sx=cx+s2.x/s2.z*scale, sy=cy+s2.y/s2.z*scale; g.fillStyle=s2.c+'0.6)'; g.fillRect(sx,sy,2,2); }
    }
    return function(){
      cancelAnimationFrame(raf);
      if(!ctx.reduce) removeEventListener('mousemove', onMove);
    };
  }

  window.GALLERY_SCENES = window.GALLERY_SCENES || [];
  window.GALLERY_SCENES.push(
    {
      id:'8a', group:'g8', label:'隧道·合成波太陽', align:'center',
      thumb:'radial-gradient(circle at 50% 44%,#7bd0ff,#FE5000 70%)',
      mount:function(root, ctx){
        var cleanup = baseTunnel(root, ctx);
        var focal=document.createElement('div'); focal.className='focal8'; focal.innerHTML='<div class="sun8"></div>';
        root.appendChild(focal);
        return cleanup;
      }
    },
    {
      id:'8b', group:'g8', label:'隧道·旋轉字標', align:'center',
      thumb:'linear-gradient(135deg,#002FA7,#FE5000)',
      mount:function(root, ctx){
        var cleanup = baseTunnel(root, ctx);
        var focal=document.createElement('div'); focal.className='focal8';
        focal.innerHTML =
          '<div class="tokwrap8"><div class="tok8">'+
            '<div class="f ff">8<sup>+</sup></div><div class="f fb">8<sup>+</sup></div>'+
            '<div class="f fr"></div><div class="f fl"></div>'+
          '</div></div>';
        root.appendChild(focal);
        return cleanup;
      }
    },
    {
      id:'8c', group:'g8', label:'隧道·能量核心', align:'center',
      thumb:'radial-gradient(circle,#fff,#FE5000 55%,#001a5c 90%)',
      mount:function(root, ctx){
        var cleanup = baseTunnel(root, ctx);
        var focal=document.createElement('div'); focal.className='focal8';
        focal.innerHTML =
          '<div class="core8"><div class="r r1"></div><div class="r r2"></div><div class="r r3"></div><div class="dot"></div></div>';
        root.appendChild(focal);
        return cleanup;
      }
    }
  );
})();
