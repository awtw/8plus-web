/* Group 7 — 線流交會 (7a / 7b / 7c / 7d / 7e) */
(function(){
  if(!document.getElementById('gallery-style-g7')){
    var st=document.createElement('style'); st.id='gallery-style-g7';
    st.textContent = [
      '.scn-7a,.scn-7b,.scn-7d,.scn-7e{background:#002FA7}',
      '.scn-7a canvas,.scn-7b canvas,.scn-7d canvas,.scn-7e canvas{position:absolute;inset:0;display:block}',
      '.scn-7c{background:#002FA7}',
      '.scn-7c svg{position:absolute;inset:0;width:100%;height:100%}',
      '.fl7{fill:none;stroke-linecap:round}',
      '.rb7{fill:none;stroke-linecap:round;stroke-dasharray:8 14;animation:rbflow7 linear infinite}',
      '@keyframes rbflow7{to{stroke-dashoffset:-44}}',
      '.core7{position:absolute;left:66%;top:48%;width:26px;height:26px;border-radius:50%;transform:translate(-50%,-50%);z-index:2;',
        'background:radial-gradient(circle,#fff,#FE5000 55%,transparent 72%);box-shadow:0 0 44px 14px rgba(254,80,0,.55);animation:corePulse7 2.6s ease-in-out infinite}',
      '@keyframes corePulse7{0%,100%{transform:translate(-50%,-50%) scale(1);opacity:.9}50%{transform:translate(-50%,-50%) scale(1.18);opacity:1}}'
    ].join('\n');
    document.head.appendChild(st);
  }

  function dprCanvas(root){
    var cv = document.createElement('canvas');
    var dpr = Math.min(devicePixelRatio||1, 2);
    var r = root.getBoundingClientRect(); var w=r.width, h=r.height;
    cv.width = w*dpr; cv.height = h*dpr; cv.style.width='100%'; cv.style.height='100%';
    var g = cv.getContext('2d'); g.scale(dpr,dpr);
    return {cv:cv, ctx:g, w:w, h:h};
  }

  window.GALLERY_SCENES = window.GALLERY_SCENES || [];
  window.GALLERY_SCENES.push(
    {
      id:'7a', group:'g7', label:'粒子河流', align:'left',
      thumb:'linear-gradient(135deg,#002FA7,#FE5000)',
      mount:function(root, ctx){
        var c = dprCanvas(root); root.appendChild(c.cv);
        var g=c.ctx, W=c.w, H=c.h;
        var P = {x:W*0.66, y:H*0.48};
        function mk(){
          var side=Math.random(), x,y;
          if(side<.6){ x=-20; y=Math.random()*H; } else { x=Math.random()*W; y=H+20; }
          return {x:x,y:y,c:Math.random()<.26?'254,80,0':'175,205,255',s:0.6+Math.random()*0.8};
        }
        var count = Math.min(ctx.isMobile?200:420, (W*H/3400)|0);
        var ps = Array.from({length:count}, mk);
        var raf;
        function step(){
          g.fillStyle='rgba(0,47,167,.10)'; g.fillRect(0,0,W,H);
          for(var i=0;i<ps.length;i++){
            var o=ps[i]; var dx=P.x-o.x, dy=P.y-o.y, d=Math.hypot(dx,dy);
            o.x+=dx/d*o.s*2.4; o.y+=dy/d*o.s*2.4;
            g.fillStyle='rgba('+o.c+',.85)'; g.beginPath(); g.arc(o.x,o.y,1.5,0,7); g.fill();
            if(d<26) Object.assign(o, mk());
          }
          var gr=g.createRadialGradient(P.x,P.y,0,P.x,P.y,70);
          gr.addColorStop(0,'rgba(254,80,0,.5)'); gr.addColorStop(1,'rgba(254,80,0,0)');
          g.fillStyle=gr; g.fillRect(P.x-70,P.y-70,140,140);
          raf=requestAnimationFrame(step);
        }
        if(ctx.reduce){ g.fillStyle='#002FA7'; g.fillRect(0,0,W,H); } else step();
        return function(){ cancelAnimationFrame(raf); };
      }
    },
    {
      id:'7b', group:'g7', label:'絲帶交織', align:'left',
      thumb:'linear-gradient(160deg,#002FA7,#7bb0ff)',
      mount:function(root, ctx){
        var c = dprCanvas(root); root.appendChild(c.cv);
        var g=c.ctx, W=c.w, H=c.h;
        var P = {x:W*0.66, y:H*0.48};
        var bands = Array.from({length:9},function(_,i){ return {off:i/9, c:i%3===0?'254,80,0':'175,205,255', amp:20+i*6}; });
        var t=0, raf;
        function step(){
          t+=0.012; g.clearRect(0,0,W,H);
          bands.forEach(function(b,i){
            g.beginPath();
            for(var x=-20;x<=P.x;x+=8){
              var prog=x/P.x;
              var y=(H*(0.15+b.off*0.7))*(1-prog)+P.y*prog+Math.sin(x*0.01+t+i)*b.amp*(1-prog);
              if(x===-20) g.moveTo(x,y); else g.lineTo(x,y);
            }
            g.strokeStyle='rgba('+b.c+','+(0.5-i*0.02)+')'; g.lineWidth=2.2; g.stroke();
          });
          raf=requestAnimationFrame(step);
        }
        if(ctx.reduce){ g.fillStyle='#002FA7'; g.fillRect(0,0,W,H); } else step();
        return function(){ cancelAnimationFrame(raf); };
      }
    },
    {
      id:'7c', group:'g7', label:'資料匯流', align:'left',
      thumb:'linear-gradient(135deg,#002FA7,#ffb27a)',
      mount:function(root){
        var ns='http://www.w3.org/2000/svg';
        var svg=document.createElementNS(ns,'svg'); svg.setAttribute('viewBox','0 0 1000 750'); svg.setAttribute('preserveAspectRatio','xMidYMid slice');
        root.appendChild(svg);
        var core=document.createElement('div'); core.className='core7'; root.appendChild(core);
        var P={x:660,y:360};
        var conf=[];
        for(var i=0;i<11;i++){ var y=90+i*54; conf.push({x1:-40,y1:y,cx:300,cy:(y+P.y)/2,c:i%3===0?'#ffb27a':'rgba(180,205,255,.9)'}); }
        for(var j=0;j<7;j++){ var x=380+j*46; conf.push({x1:x,y1:820,cx:(x+P.x)/2,cy:640,c:'#FE5000'}); }
        conf.forEach(function(o,i){
          var d='M '+o.x1+' '+o.y1+' Q '+o.cx+' '+o.cy+' '+P.x+' '+P.y;
          var base=document.createElementNS(ns,'path'); base.setAttribute('d',d); base.setAttribute('class','fl7');
          base.setAttribute('stroke',o.c); base.setAttribute('stroke-width',1); base.setAttribute('opacity',.16); svg.appendChild(base);
          var p=document.createElementNS(ns,'path'); p.setAttribute('d',d); p.setAttribute('class','rb7');
          p.setAttribute('stroke',o.c); p.setAttribute('stroke-width',i%4===0?2.4:1.6); p.setAttribute('opacity',.7);
          p.style.animationDuration=(1.4+Math.random()*1.6)+'s'; p.style.animationDelay=(-Math.random()*2)+'s';
          svg.appendChild(p);
        });
        return null;
      }
    },
    {
      id:'7d', group:'g7', label:'磁力場線', align:'left',
      thumb:'linear-gradient(135deg,#002FA7,#ffa080)',
      mount:function(root, ctx){
        var c = dprCanvas(root); root.appendChild(c.cv);
        var g=c.ctx, W=c.w, H=c.h;
        var P = {x:W*0.66, y:H*0.48};
        var count = Math.min(ctx.isMobile?260:560, (W/1.7)|0);
        var ps = Array.from({length:count},function(){ return {x:Math.random()*W,y:Math.random()*H,c:Math.random()<.28?'255,140,80':'160,195,255'}; });
        var t=0, raf;
        function field(x,y){ var a=Math.atan2(P.y-y,P.x-x); var sw=Math.sin((x+y)*0.004+t)*0.8; return a+sw; }
        function step(){
          t+=0.005; g.fillStyle='rgba(0,47,167,.055)'; g.fillRect(0,0,W,H);
          for(var i=0;i<ps.length;i++){
            var o=ps[i]; var a=field(o.x,o.y); var nx=o.x+Math.cos(a)*1.9, ny=o.y+Math.sin(a)*1.9;
            g.strokeStyle='rgba('+o.c+',.5)'; g.lineWidth=1.2;
            g.beginPath(); g.moveTo(o.x,o.y); g.lineTo(nx,ny); g.stroke();
            o.x=nx; o.y=ny;
            if(o.x<0||o.x>W||o.y<0||o.y>H||Math.hypot(o.x-P.x,o.y-P.y)<16){ o.x=Math.random()*W; o.y=Math.random()*H; }
          }
          raf=requestAnimationFrame(step);
        }
        if(ctx.reduce){ g.fillStyle='#002FA7'; g.fillRect(0,0,W,H); } else step();
        return function(){ cancelAnimationFrame(raf); };
      }
    },
    {
      id:'7e', group:'g7', label:'光纖脈衝', align:'left',
      thumb:'linear-gradient(135deg,#002FA7,#ff6e32)',
      mount:function(root, ctx){
        var c = dprCanvas(root); root.appendChild(c.cv);
        var g=c.ctx, W=c.w, H=c.h;
        var P = {x:W*0.66, y:H*0.48};
        var fibers=[];
        var nf = ctx.isMobile ? 14 : 22, nf2 = ctx.isMobile ? 9 : 14;
        for(var i=0;i<nf;i++){ var y=H*0.1+i*(H*0.8/nf); fibers.push({x1:-20,y1:y,cx:W*0.34,cy:(y+P.y)/2,c:i%4===0?'255,150,90':'170,200,255'}); }
        for(var j=0;j<nf2;j++){ var x=W*0.42+j*(W*0.5/nf2); fibers.push({x1:x,y1:H+20,cx:(x+P.x)/2,cy:H*0.82,c:'255,110,50'}); }
        var pulses = fibers.map(function(){ return Math.random(); });
        function qpt(f, tt){ var mt=1-tt; return {x:mt*mt*f.x1+2*mt*tt*f.cx+tt*tt*P.x, y:mt*mt*f.y1+2*mt*tt*f.cy+tt*tt*P.y}; }
        var raf;
        function step(){
          g.fillStyle='rgba(0,47,167,.14)'; g.fillRect(0,0,W,H);
          fibers.forEach(function(f,i){
            g.strokeStyle='rgba('+f.c+',.16)'; g.lineWidth=1;
            g.beginPath(); g.moveTo(f.x1,f.y1); g.quadraticCurveTo(f.cx,f.cy,P.x,P.y); g.stroke();
            pulses[i]+=0.006+Math.random()*0.004; if(pulses[i]>1) pulses[i]=0;
            var pt=qpt(f, pulses[i]);
            var gl=g.createRadialGradient(pt.x,pt.y,0,pt.x,pt.y,7);
            gl.addColorStop(0,'rgba('+f.c+',.95)'); gl.addColorStop(1,'rgba('+f.c+',0)');
            g.fillStyle=gl; g.beginPath(); g.arc(pt.x,pt.y,7,0,7); g.fill();
          });
          var gr=g.createRadialGradient(P.x,P.y,0,P.x,P.y,60);
          gr.addColorStop(0,'rgba(254,80,0,.55)'); gr.addColorStop(1,'rgba(254,80,0,0)');
          g.fillStyle=gr; g.fillRect(P.x-60,P.y-60,120,120);
          raf=requestAnimationFrame(step);
        }
        if(ctx.reduce){ g.fillStyle='#002FA7'; g.fillRect(0,0,W,H); } else step();
        return function(){ cancelAnimationFrame(raf); };
      }
    }
  );
})();
