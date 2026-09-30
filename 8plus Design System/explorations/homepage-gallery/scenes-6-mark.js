/* Group 6 — 標誌動態 (6a / 6b) */
(function(){
  if(!document.getElementById('gallery-style-g6')){
    var st=document.createElement('style'); st.id='gallery-style-g6';
    st.textContent = [
      '.scn-6a{background:radial-gradient(120% 120% at 62% 46%,#0a44d8,#002FA7 52%,#001a5c 92%)}',
      '.scn-6b{background:radial-gradient(120% 120% at 58% 46%,#0a44d8,#002FA7 52%,#001a5c 92%)}',
      '.scn-6a svg.field,.scn-6b svg.field{position:absolute;inset:0;width:100%;height:100%}',
      '.fl6{fill:none;stroke-linecap:round;stroke-dasharray:var(--len);stroke-dashoffset:var(--len);animation:draw6 2.2s ease forwards}',
      '@keyframes draw6{to{stroke-dashoffset:0}}',
      '.markwrap6{position:absolute;z-index:3;filter:drop-shadow(0 0 60px rgba(47,102,255,.5))}',
      '.markwrap6 svg{width:100%;height:100%;overflow:visible}',
      '.scn-6a .markwrap6{left:60%;top:48%;width:min(40vh,38vw,360px);aspect-ratio:1;transform:translate(-50%,-50%);animation:floatyA6 6s ease-in-out infinite}',
      '@keyframes floatyA6{0%,100%{transform:translate(-50%,-50%)}50%{transform:translate(-50%,calc(-50% - 12px))}}',
      '.scn-6b .markwrap6{left:56%;top:48%;width:min(50vh,48vw,460px);aspect-ratio:1;transform:translate(-50%,-50%);animation:floatyB6 7s ease-in-out infinite}',
      '@keyframes floatyB6{0%,100%{transform:translate(-50%,-50%)}50%{transform:translate(-50%,calc(-50% - 10px))}}',
      '.beat6{transform-box:fill-box;transform-origin:center;animation:beat6 3.2s ease-in-out infinite}',
      '.beat6.d{animation-delay:.5s}',
      '@keyframes beat6{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}',
      '.spark6{position:absolute;z-index:2;width:22px;height:22px;border-radius:50%;background:radial-gradient(circle,#fff,#FE5000 55%,transparent 72%);',
        'box-shadow:0 0 36px 10px rgba(254,80,0,.55);transform:translate(-50%,-50%);animation:sparkP6 2.6s ease-in-out infinite}',
      '@keyframes sparkP6{0%,100%{opacity:.85;transform:translate(-50%,-50%) scale(1)}50%{opacity:1;transform:translate(-50%,-50%) scale(1.15)}}',
      '.bridge6{stroke-dasharray:6 10;animation:bridge6 1.2s linear infinite}',
      '@keyframes bridge6{to{stroke-dashoffset:-32}}',
      '@media(max-width:700px){.scn-6a .markwrap6,.scn-6b .markwrap6{left:50%;top:32%;width:min(58vw,280px)}}'
    ].join('\n');
    document.head.appendChild(st);
  }

  var ns='http://www.w3.org/2000/svg';
  function addPath(svg, x1,y1,cx,cy,P,col,w,op,i,extraClass){
    var p=document.createElementNS(ns,'path');
    p.setAttribute('d','M '+x1+' '+y1+' Q '+cx+' '+cy+' '+P.x+' '+P.y);
    p.setAttribute('class','fl6'+(extraClass?(' '+extraClass):''));
    p.setAttribute('stroke',col); p.setAttribute('stroke-width',w); p.setAttribute('opacity',op);
    var len=Math.hypot(cx-x1,cy-y1)+Math.hypot(P.x-cx,P.y-cy);
    p.style.setProperty('--len',len); p.style.animationDelay=(i*0.045)+'s';
    svg.appendChild(p);
  }

  window.GALLERY_SCENES = window.GALLERY_SCENES || [];
  window.GALLERY_SCENES.push(
    {
      id:'6a', group:'g6', label:'線構標記', align:'left',
      thumb:'radial-gradient(circle at 60% 46%,#0a44d8,#001a5c 80%)',
      mount:function(root){
        var svg=document.createElementNS(ns,'svg'); svg.setAttribute('class','field');
        svg.setAttribute('viewBox','0 0 1000 750'); svg.setAttribute('preserveAspectRatio','xMidYMid slice');
        root.appendChild(svg);
        var P={x:600,y:360};
        for(var i=0;i<26;i++){ var y=40+i*18; addPath(svg,-40,y,300,(y+P.y)/2,P, i%4===0?'#9fc0ff':'rgba(255,255,255,.7)', i%4===0?1.2:0.85, .5, i); }
        for(var j=0;j<22;j++){ var x=380+j*26; addPath(svg,x,820,(x+P.x)/2,600,P, j%3===0?'#ffb27a':'#FE5000', j%3===0?1.4:1, .6, j); }
        var spark=document.createElement('div'); spark.className='spark6'; root.appendChild(spark);
        var mw=document.createElement('div'); mw.className='markwrap6';
        mw.innerHTML = '<svg viewBox="0 0 100 100" aria-label="8plus">'+
          '<circle class="beat6" cx="32" cy="29" r="18" fill="#fff"></circle>'+
          '<path class="slash" d="M53 9H68L36 91H21L53 9Z" fill="#fff"></path>'+
          '<circle class="beat6 d" cx="70" cy="64" r="28" fill="#FE5000"></circle>'+
        '</svg>';
        root.appendChild(mw);
        function place(){
          var v=root.getBoundingClientRect();
          var s=Math.max(v.width/1000, v.height/750);
          var ox=(v.width-1000*s)/2, oy=(v.height-750*s)/2;
          spark.style.left=(ox+P.x*s)+'px'; spark.style.top=(oy+P.y*s)+'px';
        }
        place();
        return null;
      }
    },
    {
      id:'6b', group:'g6', label:'雙核連線', align:'left',
      thumb:'radial-gradient(circle at 56% 46%,#0a44d8,#001a5c 80%)',
      mount:function(root){
        var svg=document.createElementNS(ns,'svg'); svg.setAttribute('class','field');
        svg.setAttribute('viewBox','0 0 1000 750'); svg.setAttribute('preserveAspectRatio','xMidYMid slice');
        root.appendChild(svg);
        var P={x:588,y:430};
        for(var i=0;i<20;i++){ var y=60+i*22; addPath(svg,-40,y,280,(y+P.y)/2,P,'rgba(159,192,255,.6)',1,.45,i); }
        for(var j=0;j<18;j++){ var x=360+j*30; addPath(svg,x,820,(x+P.x)/2,660,P,'#FE5000',1.1,.5,j); }
        var mw=document.createElement('div'); mw.className='markwrap6';
        mw.innerHTML = '<svg viewBox="0 0 100 100" aria-label="8plus">'+
          '<circle class="beat6" cx="32" cy="29" r="18" fill="none" stroke="#9fc0ff" stroke-width="2.5"></circle>'+
          '<path class="slash bridge6" d="M53 9H68L36 91H21L53 9Z" fill="none" stroke="#fff" stroke-width="2"></path>'+
          '<circle class="beat6 d" cx="70" cy="64" r="28" fill="#FE5000"></circle>'+
          '<circle cx="32" cy="29" r="5" fill="#9fc0ff"></circle>'+
        '</svg>';
        root.appendChild(mw);
        return null;
      }
    }
  );
})();
