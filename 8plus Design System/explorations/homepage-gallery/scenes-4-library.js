/* Group 4 — 背景素材庫 (4a–4j, 10 種) */
(function(){
  if(!document.getElementById('gallery-style-g4')){
    var st=document.createElement('style'); st.id='gallery-style-g4';
    st.textContent = [
      '.scn-4a,.scn-4b,.scn-4c,.scn-4d,.scn-4e,.scn-4f,.scn-4g,.scn-4h,.scn-4i,.scn-4j{',
        'background:radial-gradient(120% 120% at 50% 40%,#0a1240,#060a24 55%,#04061a 85%)}',

      '.scn-4a .plane{position:absolute;left:50%;top:52%;width:150vmin;height:150vmin;',
        'transform:translate(-50%,-50%) rotateX(62deg) rotateZ(-42deg);',
        'background-image:linear-gradient(rgba(123,168,255,.4) 1px,transparent 1px),linear-gradient(90deg,rgba(123,168,255,.4) 1px,transparent 1px);',
        'background-size:7% 7%;animation:isoflow4a 8s linear infinite;',
        '-webkit-mask-image:radial-gradient(circle,#000 30%,transparent 68%);mask-image:radial-gradient(circle,#000 30%,transparent 68%)}',
      '.scn-4a .node{position:absolute;width:14px;height:14px;border-radius:50%;background:var(--orange);',
        'box-shadow:0 0 22px 4px rgba(254,80,0,.7);animation:isopulse4a 3s ease-in-out infinite}',
      '@keyframes isoflow4a{to{background-position:7% 7%}}',
      '@keyframes isopulse4a{0%,100%{transform:scale(.7);opacity:.6}50%{transform:scale(1.3);opacity:1}}',

      '.scn-4b .band{position:absolute;left:-30%;width:160%;height:44vh;filter:blur(46px);opacity:.65;border-radius:50%}',
      '.scn-4b .s1{top:6%;background:radial-gradient(60% 100% at 40% 50%,#2f66ff,transparent 70%);animation:silk1_4b 15s ease-in-out infinite}',
      '.scn-4b .s2{top:32%;background:radial-gradient(60% 100% at 60% 50%,#FE5000,transparent 70%);animation:silk2_4b 19s ease-in-out infinite}',
      '.scn-4b .s3{top:56%;background:radial-gradient(60% 100% at 45% 50%,#7bd0ff,transparent 70%);animation:silk1_4b 23s ease-in-out infinite}',
      '@keyframes silk1_4b{0%,100%{transform:translateX(-8%) skewY(-4deg)}50%{transform:translateX(10%) skewY(5deg)}}',
      '@keyframes silk2_4b{0%,100%{transform:translateX(8%) skewY(4deg)}50%{transform:translateX(-10%) skewY(-5deg)}}',

      '.scn-4c canvas,.scn-4d canvas,.scn-4e canvas,.scn-4h canvas{position:absolute;inset:0;display:block}',

      '.scn-4f{perspective:1200px}',
      '.scn-4f .space{position:absolute;inset:0;transform-style:preserve-3d;animation:cardrot4f 26s linear infinite}',
      '.scn-4f .card{position:absolute;left:50%;top:50%;width:clamp(140px,20vmin,190px);height:clamp(96px,14vmin,130px);',
        'margin:calc(clamp(96px,14vmin,130px) / -2) 0 0 calc(clamp(140px,20vmin,190px) / -2);border-radius:16px;',
        'background:linear-gradient(150deg,rgba(255,255,255,.12),rgba(255,255,255,.04));border:1px solid rgba(255,255,255,.2);',
        'backdrop-filter:blur(4px);box-shadow:0 30px 70px -30px rgba(0,0,0,.7)}',
      '.scn-4f .card b{position:absolute;left:14px;top:12px;font-family:var(--mono);font-size:11px;color:var(--orange)}',
      '.scn-4f .card i{position:absolute;left:14px;bottom:14px;right:14px;height:1px;background:rgba(255,255,255,.25)}',
      '@keyframes cardrot4f{to{transform:rotateY(360deg)}}',

      '.scn-4g .ring{position:absolute;left:50%;top:50%;width:40px;height:40px;margin:-20px;border-radius:50%;border:1px solid var(--orange);opacity:0;animation:sonar4g 4s ease-out infinite}',
      '.scn-4g .dot{position:absolute;left:50%;top:50%;width:16px;height:16px;margin:-8px;border-radius:50%;background:var(--orange);box-shadow:0 0 30px 6px rgba(254,80,0,.7)}',
      '@keyframes sonar4g{0%{transform:scale(1);opacity:.9;border-color:#7bd0ff}100%{transform:scale(26);opacity:0;border-color:#FE5000}}',

      '.scn-4i .word{position:absolute;left:50%;top:44%;transform:translate(-50%,-50%);font-family:var(--sans);font-weight:900;',
        'font-size:min(26vh,40vmin);letter-spacing:-.04em;color:rgba(255,255,255,.06)}',
      '.scn-4i .g{position:absolute;left:50%;top:44%;transform:translate(-50%,-50%);font-family:var(--sans);font-weight:900;',
        'font-size:min(26vh,40vmin);letter-spacing:-.04em}',
      '.scn-4i .gb{color:#2f66ff;animation:gl1_4i 2.6s steps(2) infinite;clip-path:inset(0 0 62% 0)}',
      '.scn-4i .go{color:#FE5000;animation:gl2_4i 3.1s steps(2) infinite;clip-path:inset(60% 0 0 0)}',
      '@keyframes gl1_4i{0%,100%{transform:translate(-50%,-50%)}20%{transform:translate(-52%,-50%)}22%{transform:translate(-48%,-50%)}}',
      '@keyframes gl2_4i{0%,100%{transform:translate(-50%,-50%)}50%{transform:translate(-47%,-50%)}52%{transform:translate(-53%,-50%)}}',

      '.scn-4j .big{position:absolute;left:50%;top:44%;transform:translate(-50%,-50%);font-family:var(--sans);font-weight:900;',
        'font-size:min(34vh,48vmin);letter-spacing:-.05em;',
        'background:conic-gradient(from 0deg,#002FA7,#2f66ff,#FE5000,#ff9a5c,#7bd0ff,#002FA7);background-size:200% 200%;',
        '-webkit-background-clip:text;background-clip:text;color:transparent;animation:ftflow4j 10s linear infinite;opacity:.9}',
      '.scn-4j .big sup{font-size:.42em;vertical-align:super}',
      '@keyframes ftflow4j{to{background-position:200% 200%}}'
    ].join('\n');
    document.head.appendChild(st);
  }

  function sizeCanvas(cv, root){
    var dpr = Math.min(devicePixelRatio||1, 2);
    var r = root.getBoundingClientRect();
    cv.width = r.width*dpr; cv.height = r.height*dpr;
    cv.style.width='100%'; cv.style.height='100%';
    var g = cv.getContext('2d'); g.scale(dpr,dpr);
    return {ctx:g, w:r.width, h:r.height};
  }

  window.GALLERY_SCENES = window.GALLERY_SCENES || [];
  window.GALLERY_SCENES.push(
    {
      id:'4a', group:'g4', label:'等距網格', align:'center',
      thumb:'#04061a',
      mount:function(root){
        root.innerHTML = '<div class="plane"></div>';
        var n = 7;
        for(var i=0;i<n;i++){
          var sp=document.createElement('span'); sp.className='node';
          sp.style.left=(18+Math.random()*64)+'%'; sp.style.top=(24+Math.random()*52)+'%';
          sp.style.animationDelay=(Math.random()*3)+'s'; root.appendChild(sp);
        }
        return null;
      }
    },
    {
      id:'4b', group:'g4', label:'極光絲綢', align:'center',
      thumb:'linear-gradient(120deg,#2f66ff,#FE5000)',
      mount:function(root){
        root.innerHTML = '<div class="band s1"></div><div class="band s2"></div><div class="band s3"></div>';
        return null;
      }
    },
    {
      id:'4c', group:'g4', label:'程式碼雨', align:'center',
      thumb:'#0a1a0a',
      mount:function(root, ctx){
        root.innerHTML = '<canvas></canvas>';
        var cv = root.querySelector('canvas');
        var s = sizeCanvas(cv, root), g=s.ctx, w=s.w, h=s.h;
        var chars='アイウエオカ0123456789<>/\\[]{}=+*ABCDEF8plus'.split('');
        var fs = ctx.isMobile ? 13 : 16;
        var cols = Math.floor(w/fs);
        var ys = Array(cols).fill(0).map(function(){ return Math.random()*h/fs; });
        var raf;
        function draw(){
          g.fillStyle='rgba(4,6,26,.08)'; g.fillRect(0,0,w,h); g.font=fs+'px monospace';
          for(var i=0;i<cols;i++){
            var ch=chars[Math.floor(Math.random()*chars.length)]; var x=i*fs, y=ys[i]*fs;
            g.fillStyle = Math.random()<.04 ? '#FE5000' : 'rgba(123,168,255,.85)';
            g.fillText(ch,x,y);
            if(y>h && Math.random()>.975) ys[i]=0;
            ys[i]+=0.6;
          }
          raf=requestAnimationFrame(draw);
        }
        if(ctx.reduce){ g.fillStyle='#04061a'; g.fillRect(0,0,w,h); } else draw();
        return function(){ cancelAnimationFrame(raf); };
      }
    },
    {
      id:'4d', group:'g4', label:'流場線', align:'center',
      thumb:'#0a1240',
      mount:function(root, ctx){
        root.innerHTML = '<canvas></canvas>';
        var cv = root.querySelector('canvas');
        var s = sizeCanvas(cv, root), g=s.ctx, w=s.w, h=s.h;
        var count = Math.min(ctx.isMobile?220:500, (w/3)|0);
        var ps = Array.from({length:count},function(){ return {x:Math.random()*w,y:Math.random()*h,c:Math.random()<.25?'254,80,0':'123,168,255'}; });
        var t=0, raf;
        function draw(){
          t+=0.003; g.fillStyle='rgba(4,6,26,.06)'; g.fillRect(0,0,w,h);
          for(var k=0;k<ps.length;k++){
            var p=ps[k];
            var a=Math.sin(p.x*0.004+t)+Math.cos(p.y*0.004-t);
            var nx=p.x+Math.cos(a*3)*1.4, ny=p.y+Math.sin(a*3)*1.4;
            g.strokeStyle='rgba('+p.c+',.5)'; g.lineWidth=1;
            g.beginPath(); g.moveTo(p.x,p.y); g.lineTo(nx,ny); g.stroke();
            p.x=nx; p.y=ny;
            if(p.x<0||p.x>w||p.y<0||p.y>h){ p.x=Math.random()*w; p.y=Math.random()*h; }
          }
          raf=requestAnimationFrame(draw);
        }
        if(ctx.reduce){ g.fillStyle='#04061a'; g.fillRect(0,0,w,h); } else draw();
        return function(){ cancelAnimationFrame(raf); };
      }
    },
    {
      id:'4e', group:'g4', label:'粒子成形', align:'center',
      thumb:'#04061a',
      mount:function(root, ctx){
        root.innerHTML = '<canvas></canvas>';
        var cv = root.querySelector('canvas');
        var s = sizeCanvas(cv, root), g=s.ctx, w=s.w, h=s.h;
        var off=document.createElement('canvas'); off.width=w; off.height=h;
        var o=off.getContext('2d');
        o.fillStyle='#fff'; o.textAlign='center'; o.textBaseline='middle';
        o.font='900 '+Math.min(h*0.6,w*0.4)+'px "Noto Sans TC",sans-serif';
        o.fillText('8+', w/2, h*0.46);
        var img = o.getImageData(0,0,w,h).data;
        var step = ctx.isMobile ? 10 : 7;
        var targets=[];
        for(var y=0;y<h;y+=step) for(var x=0;x<w;x+=step){ if(img[(y*w+x)*4+3]>128) targets.push([x,y]); }
        var ps = targets.map(function(t2){ return {x:Math.random()*w,y:Math.random()*h,tx:t2[0],ty:t2[1],c:Math.random()<.22?'254,80,0':'255,255,255'}; });
        var raf;
        function draw(){
          g.fillStyle='rgba(4,6,26,.2)'; g.fillRect(0,0,w,h);
          for(var k=0;k<ps.length;k++){ var p=ps[k]; p.x+=(p.tx-p.x)*0.04; p.y+=(p.ty-p.y)*0.04;
            g.fillStyle='rgba('+p.c+',.9)'; g.fillRect(p.x,p.y,2,2); }
          raf=requestAnimationFrame(draw);
        }
        if(ctx.reduce){ g.fillStyle='#04061a'; g.fillRect(0,0,w,h); for(var k2=0;k2<ps.length;k2++){ var p2=ps[k2]; g.fillStyle='rgba('+p2.c+',.9)'; g.fillRect(p2.tx,p2.ty,2,2); } }
        else draw();
        return function(){ cancelAnimationFrame(raf); };
      }
    },
    {
      id:'4f', group:'g4', label:'浮動作品卡', align:'center',
      thumb:'linear-gradient(150deg,#1a1f3a,#0a0e1a)',
      mount:function(root){
        root.innerHTML = '<div class="space"></div>';
        var space = root.querySelector('.space');
        var projs = ['LAB//01','LAB//02','LAB//03','LAB//04','LAB//05','LAB//06'];
        projs.forEach(function(p,i){
          var c=document.createElement('div'); c.className='card';
          var ang = i/projs.length*360;
          c.style.transform='rotateY('+ang+'deg) translateZ(300px)';
          c.innerHTML='<b>'+p+'</b><i></i>';
          space.appendChild(c);
        });
        return null;
      }
    },
    {
      id:'4g', group:'g4', label:'聲納脈波', align:'center',
      thumb:'#04061a',
      mount:function(root){
        root.innerHTML = '<div class="dot"></div>';
        for(var i=0;i<4;i++){ var r=document.createElement('span'); r.className='ring'; r.style.animationDelay=(i*1)+'s'; root.appendChild(r); }
        return null;
      }
    },
    {
      id:'4h', group:'g4', label:'霓虹點波', align:'center',
      thumb:'#04061a',
      mount:function(root, ctx){
        root.innerHTML = '<canvas></canvas>';
        var cv = root.querySelector('canvas');
        var s = sizeCanvas(cv, root), g=s.ctx, w=s.w, h=s.h;
        var gap = ctx.isMobile ? 26 : 34;
        var cols = Math.ceil(w/gap)+1, rows = Math.ceil(h/gap)+1;
        var cx = w/2, cy = h*0.46, t=0, raf;
        function draw(){
          t+=0.05; g.clearRect(0,0,w,h);
          for(var i=0;i<cols;i++) for(var j=0;j<rows;j++){
            var x=i*gap, y=j*gap; var d=Math.hypot(x-cx,y-cy);
            var rad=1.2+Math.max(0,Math.sin(d*0.02-t))*3.4;
            var o=0.15+Math.max(0,Math.sin(d*0.02-t))*0.7;
            g.fillStyle = (Math.sin(d*0.02-t)>0.6) ? 'rgba(254,80,0,'+o+')' : 'rgba(123,168,255,'+o+')';
            g.beginPath(); g.arc(x,y,rad,0,7); g.fill();
          }
          raf=requestAnimationFrame(draw);
        }
        if(ctx.reduce){ draw(); cancelAnimationFrame(raf); } else draw();
        return function(){ cancelAnimationFrame(raf); };
      }
    },
    {
      id:'4i', group:'g4', label:'切片故障字', align:'center',
      thumb:'#04061a',
      mount:function(root){
        root.innerHTML = '<div class="word">8+</div><div class="g gb">8+</div><div class="g go">8+</div>';
        return null;
      }
    },
    {
      id:'4j', group:'g4', label:'液態漸層字', align:'center',
      thumb:'conic-gradient(#002FA7,#2f66ff,#FE5000,#7bd0ff,#002FA7)',
      mount:function(root){
        root.innerHTML = '<div class="big">8<sup>+</sup></div>';
        return null;
      }
    }
  );
})();
