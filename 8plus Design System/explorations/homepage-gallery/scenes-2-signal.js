/* Group 2 — 資料與訊號 (2a / 2b / 2c / 2d) */
(function(){
  if(!document.getElementById('gallery-style-g2')){
    var st=document.createElement('style'); st.id='gallery-style-g2';
    st.textContent = [
      '.scn-2a{background:radial-gradient(120% 120% at 30% 20%,#0038c9,#001a63 70%)}',
      '.scn-2a canvas{position:absolute;inset:0;display:block}',

      '.scn-2b{background:radial-gradient(130% 120% at 20% 20%,#0038c9,#001a63 70%)}',
      '.scn-2b .fgrid{position:absolute;inset:0;z-index:0;opacity:.4;',
        'background-image:linear-gradient(rgba(255,255,255,.07) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.07) 1px,transparent 1px);',
        'background-size:60px 60px;mask-image:linear-gradient(160deg,#000,transparent 85%)}',

      '.scn-2c{background:radial-gradient(120% 120% at 70% 30%,#0038c9,#001542 72%)}',
      '.scn-2c .meshwrap{position:absolute;right:6%;top:50%;transform:translateY(-50%);width:min(52vw,560px);height:min(72vh,560px)}',
      '.scn-2c .meshwrap svg{width:100%;height:100%;overflow:visible}',
      '.scn-2c .edge{stroke:rgba(255,255,255,.5);stroke-width:1.5;fill:none;stroke-dasharray:var(--len);stroke-dashoffset:var(--len);animation:draw2c 1.5s ease forwards}',
      '.scn-2c .edge.o{stroke:var(--orange)}',
      '.scn-2c .node{opacity:0;transform-box:fill-box;transform-origin:center;animation:pop2c .5s ease forwards}',
      '.scn-2c .node.pulse{animation:pop2c .5s ease forwards,pulse2c 3s ease-in-out infinite 1.6s}',
      '.scn-2c .nlabel{font-family:var(--mono);font-size:11px;fill:rgba(255,255,255,.7);opacity:0;animation:fadein2c .6s ease forwards}',
      '@keyframes draw2c{to{stroke-dashoffset:0}}',
      '@keyframes pop2c{from{opacity:0;transform:scale(.2)}to{opacity:1;transform:scale(1)}}',
      '@keyframes fadein2c{to{opacity:1}}',
      '@keyframes pulse2c{0%,100%{filter:drop-shadow(0 0 0 rgba(254,80,0,0))}50%{filter:drop-shadow(0 0 10px rgba(254,80,0,.9))}}',
      '@media(max-width:700px){.scn-2c .meshwrap{right:50%;left:50%;top:36%;transform:translate(50%,-50%);width:min(84vw,420px);height:min(46vh,420px);opacity:.8}}',

      '.scn-2d{background:radial-gradient(120% 120% at 80% 10%,#0b3a30 0%,#031a3f 45%,#04061a 100%)}',
      '.scn-2d .scan{position:absolute;left:0;right:0;height:26vh;z-index:1;pointer-events:none;',
        'background:linear-gradient(180deg,transparent,rgba(254,80,0,.14),transparent);animation:scan2d 5s linear infinite}',
      '@keyframes scan2d{0%{top:-26vh}100%{top:100vh}}'
    ].join('\n');
    document.head.appendChild(st);
  }

  window.GALLERY_SCENES = window.GALLERY_SCENES || [];
  window.GALLERY_SCENES.push(
    {
      id:'2a', group:'g2', label:'神經粒子', align:'left',
      thumb:'radial-gradient(circle at 40% 40%,#2f66ff,#001a63 70%)',
      mount:function(root, ctx){
        root.innerHTML = '<canvas></canvas>';
        var cv = root.querySelector('canvas');
        var dpr = Math.min(devicePixelRatio||1, 2);
        var rect = root.getBoundingClientRect();
        var w = rect.width, h = rect.height;
        cv.width = w*dpr; cv.height = h*dpr; cv.style.width='100%'; cv.style.height='100%';
        var g = cv.getContext('2d'); g.scale(dpr,dpr);
        var n = Math.min(ctx.isMobile?42:90, Math.floor(w*h/16000));
        var pts = Array.from({length:n},function(){ return {x:Math.random()*w,y:Math.random()*h,
          vx:(Math.random()-.5)*.35,vy:(Math.random()-.5)*.35,o:Math.random()<.22}; });
        var mouse={x:-999,y:-999};
        function onMove(e){ var r=root.getBoundingClientRect(); mouse.x=e.clientX-r.left; mouse.y=e.clientY-r.top; }
        addEventListener('mousemove', onMove);
        var raf;
        function draw(){
          g.clearRect(0,0,w,h);
          for(var k=0;k<pts.length;k++){
            var p=pts[k];
            p.x+=p.vx; p.y+=p.vy;
            if(p.x<0||p.x>w)p.vx*=-1; if(p.y<0||p.y>h)p.vy*=-1;
            var dm=Math.hypot(p.x-mouse.x,p.y-mouse.y);
            if(dm<130){ var f=(130-dm)/130*1.6; p.x+=(p.x-mouse.x)/dm*f; p.y+=(p.y-mouse.y)/dm*f; }
          }
          for(var i=0;i<pts.length;i++) for(var j=i+1;j<pts.length;j++){
            var a=pts[i],b=pts[j],d=Math.hypot(a.x-b.x,a.y-b.y);
            if(d<128){ g.strokeStyle='rgba(255,255,255,'+((1-d/128)*.28)+')'; g.lineWidth=1;
              g.beginPath(); g.moveTo(a.x,a.y); g.lineTo(b.x,b.y); g.stroke(); }
          }
          for(var k2=0;k2<pts.length;k2++){ var p2=pts[k2]; g.beginPath(); g.arc(p2.x,p2.y,p2.o?3:1.7,0,7);
            g.fillStyle=p2.o?'#FE5000':'rgba(255,255,255,.85)'; g.fill(); }
          raf=requestAnimationFrame(draw);
        }
        if(!ctx.reduce) draw(); else { draw(); cancelAnimationFrame(raf); }
        return function(){ cancelAnimationFrame(raf); removeEventListener('mousemove', onMove); };
      }
    },
    {
      id:'2b', group:'g2', label:'流光漸層字', align:'left',
      thumb:'linear-gradient(100deg,#0038c9,#FE5000,#ffd9c4)',
      mount:function(root, ctx, captionEl){
        root.innerHTML = '<div class="fgrid"></div>';
        captionEl.classList.add('fx-2b');
        return function(){ captionEl.classList.remove('fx-2b'); };
      }
    },
    {
      id:'2c', group:'g2', label:'架構自繪', align:'left',
      thumb:'linear-gradient(135deg,#002FA7,#0038c9)',
      mount:function(root){
        root.innerHTML = '<div class="meshwrap"></div>';
        var host = root.querySelector('.meshwrap');
        var nodes=[[80,60,'API'],[300,40,'AUTH'],[210,170,'CORE'],[60,250,'DB'],[330,250,'QUEUE'],[210,330,'DELIVER']];
        var edges=[[0,2],[1,2],[2,3],[2,4],[3,5],[4,5],[2,5]];
        var ns='http://www.w3.org/2000/svg';
        var svg=document.createElementNS(ns,'svg'); svg.setAttribute('viewBox','0 0 400 380');
        edges.forEach(function(e,i){
          var a=e[0], b=e[1], x1=nodes[a][0],y1=nodes[a][1],x2=nodes[b][0],y2=nodes[b][1];
          var len=Math.hypot(x2-x1,y2-y1);
          var l=document.createElementNS(ns,'line');
          l.setAttribute('x1',x1);l.setAttribute('y1',y1);l.setAttribute('x2',x2);l.setAttribute('y2',y2);
          l.setAttribute('class','edge'+(i%3===0?' o':''));l.style.setProperty('--len',len);
          l.style.animationDelay=(i*0.12)+'s'; svg.appendChild(l);
        });
        nodes.forEach(function(nd,i){
          var c=document.createElementNS(ns,'circle');
          c.setAttribute('cx',nd[0]);c.setAttribute('cy',nd[1]);c.setAttribute('r',i===5?10:7);
          c.setAttribute('fill',i===5?'#FE5000':'#fff');
          c.setAttribute('class','node'+(i===5?' pulse':''));c.style.animationDelay=(0.6+i*0.1)+'s';
          svg.appendChild(c);
          var t=document.createElementNS(ns,'text');
          t.setAttribute('x',nd[0]+14);t.setAttribute('y',nd[1]+4);t.setAttribute('class','nlabel');
          t.style.animationDelay=(1+i*0.1)+'s';t.textContent=nd[2]; svg.appendChild(t);
        });
        host.appendChild(svg);
        return null;
      }
    },
    {
      id:'2d', group:'g2', label:'解碼', align:'left',
      thumb:'radial-gradient(circle at 70% 20%,#0b3a30,#04061a 70%)',
      mount:function(root, ctx, captionEl){
        root.innerHTML = '<div class="scan"></div>';
        captionEl.classList.add('fx-2d');
        var eyeSpan = captionEl.querySelector('.eye span:last-child');
        var h1 = captionEl.querySelector('h1');
        var original = eyeSpan.textContent;
        var chars='ABCDEFGHJKLMNPQRSTUVWXYZ0123456789#%*<>/\\';
        var target='ARCHITECTURE // DELIVERED';
        var frame=0, timer;
        h1.style.opacity='0'; h1.style.clipPath='inset(0 100% 0 0)';
        requestAnimationFrame(function(){
          h1.style.transition='clip-path 1.1s cubic-bezier(.7,0,.2,1), opacity .3s ease';
          h1.style.opacity='1'; h1.style.clipPath='inset(0 0 0 0)';
        });
        if(ctx.reduce){ eyeSpan.textContent = target; }
        else {
          timer=setInterval(function(){
            var out='';
            for(var i=0;i<target.length;i++){
              out += (i<frame/2) ? target[i] : (target[i]===' '?' ':chars[Math.floor(Math.random()*chars.length)]);
            }
            eyeSpan.textContent=out; frame++;
            if(frame/2>target.length){ clearInterval(timer); eyeSpan.textContent=target; }
          }, 45);
        }
        return function(){
          clearInterval(timer);
          captionEl.classList.remove('fx-2d');
          eyeSpan.textContent = original;
          h1.style.opacity=''; h1.style.clipPath=''; h1.style.transition='';
        };
      }
    }
  );
})();
