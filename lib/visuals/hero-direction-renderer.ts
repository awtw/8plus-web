/** Original hero direction studies. Created 2026-10-05 (Asia/Taipei). */
export type HeroDirection = 'organic' | 'ascii';
export type DirectionRenderer = {
  pause(value: boolean): void;
  replay(): void;
  destroy(): void;
};
type RenderState = { ready: boolean; reduced: boolean; progress: number };

const vertexSource = `
attribute vec2 aPosition;
void main() { gl_Position = vec4(aPosition, 0.0, 1.0); }
`;

const fragmentSource = `
precision highp float;
uniform vec2 uResolution;
uniform vec2 uPointer;
uniform float uTime;
uniform float uReduced;
uniform sampler2D uGlyphs;
#define PI 3.14159265359
mat2 rotate(float a) { float c=cos(a), s=sin(a); return mat2(c,-s,s,c); }
float box(vec3 p, vec3 b) { vec3 q=abs(p)-b; return length(max(q,0.0))+min(max(q.x,max(q.y,q.z)),0.0); }
float progress() { return smoothstep(0.0, 7.0, uTime); }
vec3 transform(vec3 p) {
  p.xz *= rotate(-0.48 + uPointer.x * 0.19 + sin(uTime*0.10)*0.055);
  p.yz *= rotate(0.24 + uPointer.y * 0.10);
  return p;
}
vec2 field(vec3 pos) {
  vec3 p=transform(pos);
#ifdef ORGANIC
  p.xy *= rotate(-0.46);
  float a=atan(p.y,p.x);
  float birth=1.0-progress();
  float fold=sin(a*3.0 + uTime*0.23)*0.15;
  float radius=mix(0.56,1.06,progress())+fold
    +0.065*(uPointer.x*cos(a)+uPointer.y*sin(a));
  vec2 q=vec2(length(p.xy)-radius,p.z);
  q *= rotate(a*1.5 + sin(uTime*0.13)*0.15 + uPointer.x*0.15);
  float d=length(q/vec2(1.0,0.68))-(0.30+0.065*sin(a*3.0+1.4));
  d += sin(p.x*5.0 + uTime*.3)*sin(p.y*4.0)*0.016;
  d += birth*(0.10+0.16*sin(a*5.0));
  return vec2(d*0.66, a);
#else
  p.xz *= rotate(0.47);
  float stack=floor((p.y+1.42)/0.31);
  float y=mod(p.y+1.42,0.31)-0.155;
  float build=1.0-smoothstep(stack*0.075,stack*0.075+0.3,progress());
  vec3 q=vec3(p.x,y,p.z);
  q.xz *= rotate(stack*0.115 + sin(uTime*0.18)*0.07 + uPointer.x*0.15);
  q.x += build*(0.8+sin(stack*1.8)*0.8);
  float slab=box(q,vec3(0.78,0.098,0.61))-0.045;
  slab=max(slab,abs(p.y)-1.30);
  // A carved aperture carries light through the otherwise solid stack.
  float aperture=length(q.xz)-0.30;
  slab=max(slab,-aperture);
  return vec2(slab,stack);
#endif
}
vec3 normalAt(vec3 p) {
  vec2 e=vec2(0.0025,0.0);
  return normalize(vec3(field(p+e.xyy).x-field(p-e.xyy).x,field(p+e.yxy).x-field(p-e.yxy).x,field(p+e.yyx).x-field(p-e.yyx).x));
}
vec4 scene(vec2 uv) {
  vec3 ro=vec3(0.0,0.0,4.7);
  vec3 rd=normalize(vec3(uv,-3.45));
  float t=0.0;
  vec2 hit=vec2(1.0);
  for(int i=0;i<72;i++) {
    hit=field(ro+rd*t);
    if(hit.x<0.003 || t>7.0) break;
    t+=hit.x;
  }
  if(t>7.0 || hit.x>0.012) return vec4(0.0);
  vec3 p=ro+rd*t;
  vec3 n=normalAt(p);
  vec3 key=normalize(vec3(-2.5,3.0,4.0));
  float diffuse=max(dot(n,key),0.0);
  float rim=pow(1.0-max(dot(n,-rd),0.0),2.7);
  float spec=pow(max(dot(reflect(-key,n),-rd),0.0),35.0);
  float ao=clamp(field(p+n*.17).x/.17,0.35,1.0);
  vec3 color;
#ifdef ORGANIC
  vec3 q=transform(p); q.xy *= rotate(-0.46);
  float a=atan(q.y,q.x);
  float inner=1.0-smoothstep(0.74,1.03,length(q.xy));
  float stripe=1.0-smoothstep(0.035,0.075,abs(sin(a*1.5+q.z*5.0-uTime*.22)));
  float enamel=smoothstep(-0.1,0.75,n.y*.65+n.z*.4);
  color=mix(vec3(.015,.07,.16),vec3(.08,.26,.43),enamel);
  color*=.32+diffuse*1.5;
  color+=vec3(.38,.66,.82)*spec*.9;
  color+=vec3(.12,.32,.48)*rim*.8;
  float ember=clamp(inner*.75+stripe*.70,0.0,1.0);
  color=mix(color,vec3(1.0,.23,.035)*(.42+diffuse*.6),ember);
  color+=vec3(1.0,.25,.025)*pow(inner,3.0)*.45;
#else
  color=vec3(.20,.52,.76)*(.22+diffuse*.90);
  color+=vec3(.48,.78,.94)*spec*.5+rim*vec3(.06,.20,.30);
  vec3 q=transform(p); q.xz *= rotate(.47);
  float aperture=1.0-smoothstep(.30,.42,length(q.xz));
  color=mix(color,vec3(1.0,.29,.055),aperture*.9);
#endif
  color*=ao;
  return vec4(color,1.0);
}
void main() {
  vec2 pixel=gl_FragCoord.xy;
  vec2 uv=(pixel*2.0-uResolution)/uResolution.y;
  uv*=1.78;
  float vignette=exp(-dot(uv,uv)*.45);
  vec3 bg=mix(vec3(.014,.042,.105),vec3(.027,.093,.195),vignette*.72);
#ifdef ORGANIC
  vec4 object=scene(uv);
  float halo=exp(-pow(length(uv)-.95,2.0)*8.0)*.022;
  bg+=vec3(.0,.24,.45)*halo;
  vec3 color=mix(bg,object.rgb,object.a);
#else
  float cell=max(7.0,uResolution.y/76.0);
  vec2 center=(floor(pixel/cell)+.5)*cell;
  vec2 cellUV=(center*2.0-uResolution)/uResolution.y*1.78;
  float sweep=mix(-1.6,1.6,fract(max(uTime-2.2,0.0)/9.0));
  if(uReduced>.5) sweep=.22;
  float pointerBand=length(uv-uPointer*vec2(1.78,-1.78));
  float reveal=1.0-smoothstep(.17,.34,abs(uv.x-sweep));
  reveal=max(reveal,(1.0-smoothstep(.22,.50,pointerBand))*.88);
  vec4 object=scene(mix(cellUV,uv,step(.55,reveal)));
  float brightness=dot(object.rgb,vec3(.299,.587,.114));
  float glyph=floor(clamp(brightness*13.0+2.0,0.0,15.0));
  vec2 local=fract(pixel/cell);
  float ink=texture2D(uGlyphs,vec2((glyph+local.x)/16.0,local.y)).r;
  vec3 characters=mix(vec3(.13,.38,.57),vec3(.50,.82,1.0),clamp(brightness*1.3,0.0,1.0))*ink;
  float edge=exp(-abs(uv.x-sweep)*65.0);
  vec3 solid=object.rgb+vec3(1.0,.30,.035)*edge*.95;
  vec3 material=mix(mix(bg,characters,ink),solid,reveal);
  vec3 color=mix(bg,material,object.a);
  color+=vec3(.16,.05,.008)*edge*object.a;
#endif
  // Fine, stationary film texture prevents gradients from looking synthetic.
  float grain=fract(sin(dot(pixel,vec2(12.9898,78.233)))*43758.5453)-.5;
  color+=grain*.008;
  gl_FragColor=vec4(color,1.0);
}
`;

export function createDirectionRenderer(
  canvas: HTMLCanvasElement,
  stage: HTMLElement,
  direction: HeroDirection,
  onState: (state: RenderState) => void,
): DirectionRenderer | null {
  const gl = canvas.getContext('webgl', { alpha: false, antialias: false, depth: false, powerPreference: 'low-power' });
  if (!gl) return null;
  const media = window.matchMedia('(prefers-reduced-motion: reduce)');
  let reduced = media.matches;
  let paused = false;
  let visible = true;
  let lost = false;
  let destroyed = false;
  let elapsed = reduced ? 8 : 0;
  let frame = 0;
  let lastTime = 0;
  let lastReport = -1;
  let program: WebGLProgram | null = null;
  let buffer: WebGLBuffer | null = null;
  let atlas: WebGLTexture | null = null;
  let uniforms: Record<string, WebGLUniformLocation | null> = {};
  const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };

  const report = (ready: boolean, force = false) => {
    if (destroyed) return;
    if (force || Math.abs(elapsed - lastReport) >= 0.12) {
      lastReport = elapsed;
      onState({ ready, reduced, progress: Math.min(elapsed / 8, 1) });
    }
  };
  const release = () => {
    if (program) gl.deleteProgram(program);
    if (buffer) gl.deleteBuffer(buffer);
    if (atlas) gl.deleteTexture(atlas);
    program = null; buffer = null; atlas = null;
  };
  const initialize = () => {
    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) throw new Error('Cannot create hero shader');
      gl.shaderSource(shader, source); gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        const message = gl.getShaderInfoLog(shader);
        gl.deleteShader(shader);
        throw new Error(message || 'Cannot compile hero shader');
      }
      return shader;
    };
    const shaders: WebGLShader[] = [];
    try {
      shaders.push(compile(gl.VERTEX_SHADER, vertexSource));
      shaders.push(compile(gl.FRAGMENT_SHADER, `${direction === 'organic' ? '#define ORGANIC\n' : ''}${fragmentSource}`));
      program = gl.createProgram();
      if (!program) throw new Error('Cannot create hero program');
      shaders.forEach(shader => gl.attachShader(program!, shader));
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error('Cannot link hero shader');
      gl.useProgram(program);
      buffer = gl.createBuffer();
      if (!buffer) throw new Error('Cannot allocate hero buffer');
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]), gl.STATIC_DRAW);
      const position = gl.getAttribLocation(program, 'aPosition');
      gl.enableVertexAttribArray(position); gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
      uniforms = Object.fromEntries(['uResolution','uPointer','uTime','uReduced','uGlyphs'].map(name => [name, gl.getUniformLocation(program!, name)]));
      const source = document.createElement('canvas');
      source.width = 512; source.height = 32;
      const context = source.getContext('2d');
      if (!context) throw new Error('Cannot create glyph atlas');
      context.fillStyle = '#000'; context.fillRect(0,0,512,32);
      context.fillStyle = '#fff'; context.font = 'bold 29px monospace';
      context.textAlign = 'center'; context.textBaseline = 'middle';
      ' .:;=+*ox%#@MW8$&'.split('').slice(0,16).forEach((char,index) => context.fillText(char,index*32+16,17));
      atlas = gl.createTexture();
      if (!atlas) throw new Error('Cannot allocate glyph texture');
      gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D,atlas);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,source);
      gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
      gl.uniform1i(uniforms.uGlyphs,0);
      return true;
    } catch {
      release();
      return false;
    } finally {
      shaders.forEach(shader => gl.deleteShader(shader));
    }
  };
  const draw = () => {
    if (!program || lost || destroyed) return;
    gl.viewport(0,0,canvas.width,canvas.height);
    gl.useProgram(program);
    gl.uniform2f(uniforms.uResolution,canvas.width,canvas.height);
    gl.uniform2f(uniforms.uPointer,pointer.x,pointer.y);
    gl.uniform1f(uniforms.uTime,elapsed);
    gl.uniform1f(uniforms.uReduced,reduced ? 1 : 0);
    gl.drawArrays(gl.TRIANGLES,0,6);
  };
  const running = () => !paused && !reduced && visible && !document.hidden && !lost && !destroyed && !!program;
  const tick = (now: number) => {
    frame = 0;
    if (!running()) { lastTime = 0; return; }
    const delta = lastTime ? Math.min((now-lastTime)/1000,.05) : 0;
    lastTime = now;
    elapsed += delta;
    pointer.x += (pointer.targetX-pointer.x)*.075;
    pointer.y += (pointer.targetY-pointer.y)*.075;
    draw();
    if (elapsed < 8.2) report(true);
    frame = requestAnimationFrame(tick);
  };
  const reconcile = () => {
    if (frame) cancelAnimationFrame(frame);
    frame = 0; lastTime = 0;
    if (running()) frame = requestAnimationFrame(tick);
  };
  const resize = () => {
    const bounds = stage.getBoundingClientRect();
    const max = bounds.width < 500 ? 480 : 760;
    const scale = Math.min(window.devicePixelRatio || 1,1.4,max/Math.max(bounds.width,1));
    canvas.width = Math.max(1,Math.round(bounds.width*scale));
    canvas.height = Math.max(1,Math.round(bounds.height*scale));
    draw();
  };
  const move = (event: PointerEvent) => {
    if (reduced || paused || event.pointerType === 'touch') return;
    const bounds = stage.getBoundingClientRect();
    pointer.targetX = (event.clientX-bounds.left)/bounds.width*2-1;
    pointer.targetY = (event.clientY-bounds.top)/bounds.height*2-1;
  };
  const leave = () => { pointer.targetX = 0; pointer.targetY = 0; };
  const preference = () => {
    reduced = media.matches;
    if (reduced) { elapsed = 8; pointer.x = 0; pointer.y = 0; }
    draw(); report(!!program && !lost,true); reconcile();
  };
  const contextLost = (event: Event) => {
    event.preventDefault(); lost = true; reconcile(); report(false,true);
  };
  const contextRestored = () => {
    lost = false;
    release();
    const ready = initialize();
    if (ready) resize();
    report(ready,true); reconcile();
  };
  if (!initialize()) return null;
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(stage);
  const observer = new IntersectionObserver(entries => {
    visible = entries.some(entry => entry.isIntersecting);
    reconcile();
  }, { threshold: 0.01 });
  observer.observe(stage);
  stage.addEventListener('pointermove',move);
  stage.addEventListener('pointerleave',leave);
  canvas.addEventListener('webglcontextlost',contextLost);
  canvas.addEventListener('webglcontextrestored',contextRestored);
  document.addEventListener('visibilitychange',reconcile);
  media.addEventListener('change',preference);
  resize(); report(true,true); reconcile();
  return {
    pause(value) { paused = value; reconcile(); },
    replay() { elapsed = reduced ? 8 : 0; lastTime = 0; draw(); report(!!program && !lost,true); reconcile(); },
    destroy() {
      destroyed = true;
      if (frame) cancelAnimationFrame(frame);
      resizeObserver.disconnect(); observer.disconnect();
      stage.removeEventListener('pointermove',move);
      stage.removeEventListener('pointerleave',leave);
      canvas.removeEventListener('webglcontextlost',contextLost);
      canvas.removeEventListener('webglcontextrestored',contextRestored);
      document.removeEventListener('visibilitychange',reconcile);
      media.removeEventListener('change',preference);
      release();
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    },
  };
}
