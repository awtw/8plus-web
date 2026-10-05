type Point = { x: number; y: number; z: number };
type Particle = Point & { sx: number; sy: number; sz: number; size: number; phase: number; orange: boolean; ambient: boolean };
export type NeuralField = { pause: (value: boolean) => void; replay: () => void; destroy: () => void };
const TAU = Math.PI * 2;
const clamp = (value: number) => Math.min(1, Math.max(0, value));

/** Bounded, deterministic point cloud; no per-frame React work or all-pairs search. */
export function createNeuralField(canvas: HTMLCanvasElement, stage: HTMLElement, onReady: (ready: boolean) => void, onReduced: (value: boolean) => void): NeuralField | null {
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  const context = ctx;
  let seed = 8241;
  const random = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
  const particles: Particle[] = [];
  let small = stage.clientWidth < 450;
  function add(x: number, y: number, z: number, orange = false, ambient = false) {
    const angle = random() * TAU;
    const radius = 200 + random() * 240;
    particles.push({ x, y, z, orange, ambient, sx: Math.cos(angle) * radius, sy: Math.sin(angle) * radius * .8, sz: (random() - .5) * 420, size: .45 + random() * 1.05, phase: random() * TAU });
  }
  function sphere(cx: number, cy: number, radius: number, count: number) {
    for (let i = 0; i < count; i++) {
      const angle = random() * TAU;
      const depth = (random() - .5) * 2;
      // Dense silhouettes retain the mark, with a volumetric interior.
      const ring = i % 3 === 0;
      const r = radius * (ring ? .9 + random() * .1 : Math.sqrt(1 - depth * depth));
      add(cx + Math.cos(angle) * r, cy + Math.sin(angle) * r, ring ? (random() - .5) * 20 : depth * radius * .65);
    }
  }
  function populate() {
    seed = 8241;
    particles.length = 0;
    sphere(-79.2, -92.4, 79.2, small ? 310 : 650);
    sphere(88, 61.6, 123.2, small ? 560 : 1100);
    for (let i = 0; i < (small ? 260 : 470); i++) {
      const t = random();
      add((53 - 32 * t + 15 * random() - 50) * 4.4, (9 + 82 * t - 50) * 4.4, 28 + random() * 22, true);
    }
    for (let i = 0; i < (small ? 75 : 140); i++) add((random() - .5) * 620, (random() - .5) * 540, (random() - .5) * 220, false, true);
  }
  populate();
  let elapsed = 0;
  let previous = 0;
  let frame = 0;
  let paused = false;
  let visible = true;
  let destroyed = false;
  let contextLost = false;
  let ready = false;
  let width = 640;
  let height = 580;
  let pointerX = 0;
  let pointerY = 0;
  let pointerActive = false;
  let easedX = 0;
  let easedY = 0;
  let pointerStrength = 0;
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  let reduced = media.matches;
  function project(point: Point, yaw: number): Point {
    const x = point.x * Math.cos(yaw) + point.z * Math.sin(yaw);
    const z = point.z * Math.cos(yaw) - point.x * Math.sin(yaw);
    const perspective = 1100 / (1100 - z);
    return { x: 320 + x * perspective, y: 290 + point.y * perspective, z };
  }
  function draw() {
    if (contextLost || !width || destroyed) return;
    const time = reduced ? 6 : elapsed;
    const progress = reduced ? 1 : clamp(time / 2.8);
    const assemble = 1 - Math.pow(1 - progress, 4);
    const yaw = reduced ? 0 : Math.sin(time * .18) * .095 + easedX * .00013;
    context.clearRect(0, 0, width, height);
    context.save();
    context.scale(width / 640, width / 640);
    const halo = context.createRadialGradient(350, 285, 10, 350, 285, 270);
    halo.addColorStop(0, "rgba(76,147,255,.12)");
    halo.addColorStop(1, "rgba(76,147,255,0)");
    context.fillStyle = halo;
    context.fillRect(0, 0, 640, 580);
    // Three continuous data paths, each with one travelling packet.
    for (let orbit = 0; orbit < 3; orbit++) {
      const rotation = [-.48, .67, -1.02][orbit];
      const path = (t: number) => {
        const x = Math.cos(t) * (277 - orbit * 17);
        const y = Math.sin(t) * (99 + orbit * 25);
        return { x: 320 + x * Math.cos(rotation) - y * Math.sin(rotation), y: 290 + x * Math.sin(rotation) + y * Math.cos(rotation) };
      };
      context.beginPath();
      for (let k = 0; k <= 100; k++) { const p = path(k / 100 * TAU); if (k === 0) context.moveTo(p.x, p.y); else context.lineTo(p.x, p.y); }
      context.strokeStyle = `rgba(137,186,255,${.1 * assemble})`;
      context.lineWidth = .65;
      context.stroke();
      const packet = time * (.14 + orbit * .04) + orbit * 2.1;
      for (let j = 0; j < 18; j++) {
        const p = path(packet - j * .014);
        context.fillStyle = `rgba(${orbit === 1 ? "255,184,131" : "188,222,255"},${(1 - j / 18) * .7 * assemble})`;
        context.beginPath(); context.arc(p.x, p.y, j === 0 ? 2 : .8, 0, TAU); context.fill();
      }
    }
    const nodes: { x: number; y: number; alpha: number }[] = [];
    particles.forEach((p, index) => {
      const local = p.ambient ? 1 : assemble;
      const drift = reduced ? 0 : Math.sin(time * .48 + p.phase) * (p.ambient ? 7 : 1.5);
      const position = project({ x: p.sx * (1 - local) + p.x * local, y: p.sy * (1 - local) + p.y * local + drift, z: p.sz * (1 - local) + p.z * local }, yaw);
      const dx = position.x - (320 + easedX);
      const dy = position.y - (290 + easedY);
      const distance = Math.sqrt(dx * dx + dy * dy);
      const influence = reduced ? 0 : clamp(1 - distance / 115) * pointerStrength;
      position.x += dx * influence * .14;
      position.y += dy * influence * .14;
      const front = clamp((position.z + 95) / 190);
      const alpha = p.ambient ? .12 + .13 * front : (.28 + front * .62) * (.35 + assemble * .65);
      context.fillStyle = `rgba(${p.orange ? "255,173,113" : front > .65 ? "222,241,255" : "116,177,255"},${Math.min(1, alpha + influence * .35)})`;
      context.beginPath();
      context.arc(position.x, position.y, p.size * (p.orange ? 1.05 : .85) * (.7 + front * .5) + influence * .5, 0, TAU);
      context.fill();
      if (!p.ambient && !p.orange && index % 28 === 0) nodes.push({ x: position.x, y: position.y, alpha: influence });
      if (!p.ambient && index % 113 === 0) {
        context.fillStyle = `rgba(${p.orange ? "255,164,105" : "162,207,255"},${alpha * .06})`;
        context.beginPath(); context.arc(position.x, position.y, 5, 0, TAU); context.fill();
      }
    });
    // Fixed adjacent samples keep connection work linear and visually restrained.
    nodes.forEach((p, index) => {
      const next = nodes[(index + 1) % nodes.length];
      const distance = Math.hypot(next.x - p.x, next.y - p.y);
      if (distance > 100) return;
      context.strokeStyle = `rgba(165,208,255,${(.065 + p.alpha * .35) * assemble})`;
      context.lineWidth = .6;
      context.beginPath(); context.moveTo(p.x, p.y); context.lineTo(next.x, next.y); context.stroke();
    });
    context.restore();
    if (!ready) { ready = true; onReady(true); }
  }
  const canAnimate = () => !destroyed && !contextLost && !paused && !reduced && visible && !document.hidden;
  function tick(now: number) {
    frame = 0;
    if (!canAnimate()) { previous = 0; return; }
    const delta = previous ? Math.min((now - previous) / 1000, .05) : 0;
    previous = now;
    elapsed += delta;
    const smoothing = 1 - Math.exp(-delta * 6);
    easedX += ((pointerActive ? pointerX : 0) - easedX) * smoothing;
    easedY += ((pointerActive ? pointerY : 0) - easedY) * smoothing;
    pointerStrength += ((pointerActive ? 1 : 0) - pointerStrength) * smoothing;
    draw();
    frame = requestAnimationFrame(tick);
  }
  function sync() {
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    previous = 0;
    if (canAnimate()) frame = requestAnimationFrame(tick);
  }
  function resize() {
    width = stage.clientWidth;
    height = width * 580 / 640;
    if (!width || contextLost) return;
    if (small !== (width < 450)) { small = width < 450; populate(); }
    const dpr = Math.min(window.devicePixelRatio || 1, small ? 1.5 : 2);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    draw();
  }
  function loseContext(event: Event) {
    event.preventDefault();
    contextLost = true;
    ready = false;
    onReady(false);
    sync();
  }
  function restoreContext() { contextLost = false; resize(); sync(); }
  function motionChange() { reduced = media.matches; onReduced(reduced); draw(); sync(); }
  function move(event: PointerEvent) {
    const bounds = stage.getBoundingClientRect();
    pointerX = (event.clientX - bounds.left) / bounds.width * 640 - 320;
    pointerY = (event.clientY - bounds.top) / bounds.height * 580 - 290;
    pointerActive = true;
  }
  function leave() { pointerActive = false; }
  function release(event: PointerEvent) { if (event.pointerType !== "mouse") leave(); }
  const resizeObserver = new ResizeObserver(resize);
  const intersectionObserver = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }, { threshold: .05 });
  canvas.addEventListener("contextlost", loseContext);
  canvas.addEventListener("contextrestored", restoreContext);
  resizeObserver.observe(stage);
  intersectionObserver.observe(stage);
  stage.addEventListener("pointermove", move);
  stage.addEventListener("pointerdown", move);
  stage.addEventListener("pointerleave", leave);
  stage.addEventListener("pointerup", release);
  stage.addEventListener("pointercancel", leave);
  media.addEventListener("change", motionChange);
  document.addEventListener("visibilitychange", sync);
  onReduced(reduced);
  resize();
  sync();
  return {
    pause(value) { paused = value; sync(); },
    replay() { if (reduced) return; elapsed = 0; paused = false; draw(); sync(); },
    destroy() {
      destroyed = true;
      if (frame) cancelAnimationFrame(frame);
      canvas.removeEventListener("contextlost", loseContext);
      canvas.removeEventListener("contextrestored", restoreContext);
      resizeObserver.disconnect(); intersectionObserver.disconnect();
      stage.removeEventListener("pointermove", move); stage.removeEventListener("pointerdown", move);
      stage.removeEventListener("pointerleave", leave); stage.removeEventListener("pointerup", release); stage.removeEventListener("pointercancel", leave);
      media.removeEventListener("change", motionChange); document.removeEventListener("visibilitychange", sync);
    },
  };
}
