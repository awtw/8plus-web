export type SignalState = { ready: boolean; reduced: boolean; progress: number };
export type SignalRenderer = { pause(value: boolean): void; replay(): void; destroy(): void };

const FORMATION_DURATION = 4.5;
const LINE_COUNT = 18;
const SAMPLES = 90;
const smooth = (value: number) => { const t = Math.max(0, Math.min(1, value)); return t * t * (3 - 2 * t); };

/** A small, deterministic field: no particle simulation or external animation loop. */
export function createSignalRenderer(canvas: HTMLCanvasElement, stage: HTMLElement, onState: (state: SignalState) => void): SignalRenderer | null {
  const context = canvas.getContext("2d", { alpha: true });
  if (!context) return null;
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  let reduced = media.matches;
  let elapsed = reduced ? FORMATION_DURATION : 0;
  let width = 1, height = 1, ratio = 1, frame = 0, previous = 0, reported = -1;
  let paused = false, visible = true, lost = false, destroyed = false;
  const pointer = { x: -1000, y: -1000, targetX: -1000, targetY: -1000, strength: 0, targetStrength: 0 };
  const report = () => {
    const progress = Math.min(1, elapsed / FORMATION_DURATION);
    const rounded = Math.floor(progress * 30);
    if (rounded !== reported) { reported = rounded; onState({ ready: !lost, reduced, progress }); }
  };
  const point = (line: number, t: number) => {
    const lane = (line - (LINE_COUNT - 1) / 2) / (LINE_COUNT - 1);
    const formed = smooth(elapsed / FORMATION_DURATION);
    const mobile = width < 700;
    const x = (-0.12 + t * 1.24) * width;
    // A broad diagonal ribbon bends across the full composition, clear of the copy.
    const arch = Math.sin(t * Math.PI) * (mobile ? 0.19 : 0.24);
    const ordered = (mobile ? 0.60 : 0.33) + t * 0.34 - arch + lane * (0.14 + Math.sin(t * Math.PI) * 0.12);
    const scattered = ordered + Math.sin(t * Math.PI * 1.7 + line * 0.47) * 0.18 + lane * 0.22;
    let y = (scattered * (1 - formed) + ordered * formed) * height;
    y += Math.sin(t * 7 + elapsed * 0.24 + line * 0.11) * (mobile ? 4 : 7) * formed;
    const dx = x - pointer.x, dy = y - pointer.y;
    const influence = Math.exp(-(dx * dx + dy * dy) / (2 * 115 * 115)) * pointer.strength;
    y += Math.sin(t * Math.PI) * influence * (dy < 0 ? -1 : 1) * 24;
    return { x, y };
  };
  const draw = () => {
    if (destroyed || lost) return;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    context.clearRect(0, 0, width, height);
    const fade = context.createLinearGradient(0, 0, width, 0);
    fade.addColorStop(0, "rgba(137,177,239,0.10)");
    fade.addColorStop(0.3, "rgba(148,192,249,0.68)");
    fade.addColorStop(0.65, "rgba(190,215,255,0.44)");
    fade.addColorStop(1, "rgba(132,174,241,0.12)");
    for (let line = 0; line < LINE_COUNT; line++) {
      context.beginPath();
      for (let step = 0; step <= SAMPLES; step++) {
        const p = point(line, step / SAMPLES);
        if (step === 0) context.moveTo(p.x, p.y); else context.lineTo(p.x, p.y);
      }
      context.strokeStyle = fade;
      context.lineWidth = line % 5 === 0 ? 1.15 : 0.7;
      context.globalAlpha = line % 5 === 0 ? 0.95 : 0.57;
      context.stroke();
    }
    // One warm signal travels the same route; its tail is drawn as short continuous strokes.
    const travel = reduced ? 0.67 : elapsed < FORMATION_DURATION ? 0.05 + smooth(elapsed / FORMATION_DURATION) * 0.62 : ((elapsed - FORMATION_DURATION) * 0.045 + 0.67) % 1.35;
    const tail = 0.19;
    context.globalAlpha = 1;
    for (let step = 0; step < 46; step++) {
      const from = travel - tail + step / 46 * tail;
      const to = from + tail / 46 + 0.001;
      if (from < 0 || to > 1) continue;
      const a = point(8, from), b = point(8, to);
      context.beginPath(); context.moveTo(a.x, a.y); context.lineTo(b.x, b.y);
      context.strokeStyle = `rgba(255,${Math.round(118 + step * 1.7)},${Math.round(52 + step * 1.7)},${0.08 + step / 46 * 0.92})`;
      context.lineWidth = 2; context.stroke();
    }
  };
  const running = () => !paused && !reduced && visible && !document.hidden && !lost && !destroyed;
  const tick = (time: number) => {
    frame = 0;
    if (!running()) { previous = 0; return; }
    elapsed += previous ? Math.min((time - previous) / 1000, 0.05) : 0;
    previous = time;
    pointer.x += (pointer.targetX - pointer.x) * 0.1;
    pointer.y += (pointer.targetY - pointer.y) * 0.1;
    pointer.strength += (pointer.targetStrength - pointer.strength) * 0.08;
    draw(); report(); frame = requestAnimationFrame(tick);
  };
  const reconcile = () => {
    cancelAnimationFrame(frame); frame = 0; previous = 0;
    if (running()) frame = requestAnimationFrame(tick);
  };
  const resize = () => {
    const bounds = stage.getBoundingClientRect();
    width = Math.max(1, bounds.width); height = Math.max(1, bounds.height);
    ratio = Math.min(window.devicePixelRatio || 1, 1.75, 2400 / width);
    canvas.width = Math.round(width * ratio); canvas.height = Math.round(height * ratio); draw();
  };
  const move = (event: PointerEvent) => {
    if (paused || reduced || event.pointerType === "touch") return;
    const bounds = stage.getBoundingClientRect();
    pointer.targetX = event.clientX - bounds.left; pointer.targetY = event.clientY - bounds.top; pointer.targetStrength = 1;
  };
  const leave = () => { pointer.targetStrength = 0; };
  const preference = () => {
    reduced = media.matches;
    if (reduced) { elapsed = FORMATION_DURATION; pointer.strength = 0; pointer.targetStrength = 0; }
    reported = -1; draw(); report(); reconcile();
  };
  const contextLost = (event: Event) => { event.preventDefault(); lost = true; reported = -1; report(); reconcile(); };
  const contextRestored = () => { lost = false; reported = -1; resize(); report(); reconcile(); };
  const resizeObserver = new ResizeObserver(resize);
  const intersection = new IntersectionObserver(entries => { visible = entries.some(entry => entry.isIntersecting); reconcile(); }, { threshold: 0.01 });
  resizeObserver.observe(stage); intersection.observe(stage);
  stage.addEventListener("pointermove", move); stage.addEventListener("pointerleave", leave);
  canvas.addEventListener("contextlost", contextLost); canvas.addEventListener("contextrestored", contextRestored);
  media.addEventListener("change", preference); document.addEventListener("visibilitychange", reconcile);
  resize(); report(); reconcile();
  return {
    pause(value) { paused = value; reconcile(); },
    replay() { elapsed = reduced ? FORMATION_DURATION : 0; previous = 0; pointer.strength = 0; pointer.targetStrength = 0; reported = -1; draw(); report(); reconcile(); },
    destroy() {
      destroyed = true; cancelAnimationFrame(frame); resizeObserver.disconnect(); intersection.disconnect();
      stage.removeEventListener("pointermove", move); stage.removeEventListener("pointerleave", leave);
      canvas.removeEventListener("contextlost", contextLost); canvas.removeEventListener("contextrestored", contextRestored);
      media.removeEventListener("change", preference); document.removeEventListener("visibilitychange", reconcile);
    },
  };
}
