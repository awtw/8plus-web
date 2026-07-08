/** Procedural blue mesh hand — animatable finger curl (ET index point). */

export type Vec2 = { x: number; y: number }

export type BlueMeshHand = {
  segments: Array<{ x1: number; y1: number; x2: number; y2: number; emphasis?: number }>
  indexTip: Vec2
  palm: Vec2
}

const DEG = Math.PI / 180

function rotAround(p: Vec2, origin: Vec2, deg: number): Vec2 {
  const r = deg * DEG
  const cos = Math.cos(r)
  const sin = Math.sin(r)
  const dx = p.x - origin.x
  const dy = p.y - origin.y
  return { x: origin.x + dx * cos - dy * sin, y: origin.y + dy * sin + dy * cos }
}

function chainFinger(
  origin: Vec2,
  baseDeg: number,
  lengths: readonly number[],
  bendPerJoint: readonly number[],
  curl: number,
  curlGain: number,
): Vec2[] {
  const pts: Vec2[] = [origin]
  let angle = baseDeg
  let cur = origin
  for (let i = 0; i < lengths.length; i++) {
    angle += bendPerJoint[i] + curl * curlGain * (i + 1) * 16
    const rad = angle * DEG
    cur = { x: cur.x + Math.cos(rad) * lengths[i], y: cur.y + Math.sin(rad) * lengths[i] }
    pts.push(cur)
  }
  return pts
}

function lateralPoints(centerline: Vec2[], halfWidth: number): [Vec2[], Vec2[]] {
  const left: Vec2[] = []
  const right: Vec2[] = []
  for (let i = 0; i < centerline.length; i++) {
    const p = centerline[i]
    const prev = centerline[Math.max(0, i - 1)]
    const next = centerline[Math.min(centerline.length - 1, i + 1)]
    const tx = next.x - prev.x
    const ty = next.y - prev.y
    const len = Math.hypot(tx, ty) || 1
    const nx = -ty / len
    const ny = tx / len
    const taper = 1 - i * 0.12
    const w = halfWidth * taper
    left.push({ x: p.x + nx * w, y: p.y + ny * w })
    right.push({ x: p.x - nx * w, y: p.y - ny * w })
  }
  return [left, right]
}

function pushPolyline(
  out: BlueMeshHand['segments'],
  pts: Vec2[],
  emphasis = 1,
) {
  for (let i = 0; i < pts.length - 1; i++) {
    out.push({
      x1: pts[i].x,
      y1: pts[i].y,
      x2: pts[i + 1].x,
      y2: pts[i + 1].y,
      emphasis,
    })
  }
}

function pushMeshRibbon(
  out: BlueMeshHand['segments'],
  centerline: Vec2[],
  halfWidth: number,
  emphasis = 1,
) {
  const [left, right] = lateralPoints(centerline, halfWidth)
  pushPolyline(out, left, emphasis)
  pushPolyline(out, right, emphasis)
  pushPolyline(out, centerline, emphasis * 0.85)

  for (let i = 0; i < centerline.length; i++) {
    out.push({
      x1: left[i].x,
      y1: left[i].y,
      x2: right[i].x,
      y2: right[i].y,
      emphasis: emphasis * 0.7,
    })
  }

  for (let i = 0; i < centerline.length - 1; i++) {
    out.push({ x1: left[i].x, y1: left[i].y, x2: left[i + 1].x, y2: left[i + 1].y, emphasis: emphasis * 0.55 })
    out.push({ x1: right[i].x, y1: right[i].y, x2: right[i + 1].x, y2: right[i + 1].y, emphasis: emphasis * 0.55 })
    out.push({ x1: left[i].x, y1: left[i].y, x2: right[i + 1].x, y2: right[i + 1].y, emphasis: emphasis * 0.35 })
    out.push({ x1: right[i].x, y1: right[i].y, x2: left[i + 1].x, y2: left[i + 1].y, emphasis: emphasis * 0.35 })
  }
}

export type BlueHandPose = {
  curl: number
  indexAim: number
  openSpread: number
}

export function getBlueHandPose(progress: number): BlueHandPose {
  const p = Math.min(1, Math.max(0, progress))
  const curl = p < 0.2 ? 0 : p < 0.62 ? (p - 0.2) / 0.42 : 1
  const openSpread = p < 0.18 ? 1 - p / 0.18 : 0
  const indexAim = p < 0.45 ? 0 : (p - 0.45) / 0.55
  return { curl: curl ** 0.85, indexAim, openSpread }
}

/** Local space — palm near (360, 430), facing right */
export function buildBlueMeshHand(pose: BlueHandPose): BlueMeshHand {
  const segments: BlueMeshHand['segments'] = []
  const palm: Vec2 = { x: 360, y: 430 }
  const spread = pose.openSpread * 14

  const fingers = [
    {
      name: 'pinky',
      origin: { x: palm.x - 42, y: palm.y + 54 },
      base: -118 - spread,
      lens: [34, 28, 22, 16],
      bends: [-8, -6, -4, -2],
      width: 9,
      curlGain: 1.05,
    },
    {
      name: 'ring',
      origin: { x: palm.x - 18, y: palm.y + 22 },
      base: -96 - spread * 0.7,
      lens: [38, 30, 24, 17],
      bends: [-6, -5, -3, -2],
      width: 10,
      curlGain: 1,
    },
    {
      name: 'middle',
      origin: { x: palm.x + 8, y: palm.y - 4 },
      base: -78 - spread * 0.45,
      lens: [42, 34, 26, 18],
      bends: [-5, -4, -3, -2],
      width: 11,
      curlGain: 0.95,
    },
    {
      name: 'index',
      origin: { x: palm.x + 36, y: palm.y - 28 },
      base: -58 + pose.indexAim * 8 - spread * 0.2,
      lens: [44, 36, 28, 20],
      bends: [-4, -3, -2, -1],
      width: 10,
      curlGain: 0.08,
    },
    {
      name: 'thumb',
      origin: { x: palm.x - 58, y: palm.y + 8 },
      base: 128 + spread * 0.5,
      lens: [32, 26, 20],
      bends: [6, 5, 4],
      width: 9,
      curlGain: 0.9,
    },
  ] as const

  let indexTip = palm

  for (const f of fingers) {
    const center = chainFinger(f.origin, f.base, f.lens, f.bends, pose.curl, f.curlGain)
    if (f.name === 'index') {
      indexTip = center[center.length - 1]
      if (pose.indexAim > 0) {
        const tip = center[center.length - 1]
        const extended = {
          x: tip.x + Math.cos(f.base * DEG) * pose.indexAim * 22,
          y: tip.y + Math.sin(f.base * DEG) * pose.indexAim * 22,
        }
        center.push(extended)
        indexTip = extended
      }
    }
    pushMeshRibbon(segments, center, f.width, f.name === 'index' ? 1.15 : 1)
  }

  // Palm mesh
  const palmRing = [
    { x: palm.x - 70, y: palm.y + 36 },
    { x: palm.x - 52, y: palm.y - 18 },
    { x: palm.x + 18, y: palm.y - 42 },
    { x: palm.x + 58, y: palm.y + 8 },
    { x: palm.x + 24, y: palm.y + 52 },
    { x: palm.x - 38, y: palm.y + 62 },
  ]
  pushPolyline(segments, [...palmRing, palmRing[0]], 0.9)
  for (let i = 0; i < palmRing.length; i++) {
    segments.push({
      x1: palm.x,
      y1: palm.y,
      x2: palmRing[i].x,
      y2: palmRing[i].y,
      emphasis: 0.45,
    })
  }

  // Wrist stub
  const wrist = chainFinger(
    { x: palm.x - 88, y: palm.y + 48 },
    168,
    [36, 28],
    [0, 0],
    pose.curl * 0.2,
    0.3,
  )
  pushMeshRibbon(segments, wrist, 12, 0.75)
  segments.push({ x1: wrist[0].x, y1: wrist[0].y, x2: palm.x - 62, y2: palm.y + 44, emphasis: 0.6 })

  return { segments, indexTip, palm }
}

export function transformHand(
  hand: BlueMeshHand,
  tx: number,
  ty: number,
  rotDeg: number,
  pivot: Vec2,
): BlueMeshHand {
  const map = (p: Vec2) => rotAround({ x: p.x + tx, y: p.y + ty }, pivot, rotDeg)
  return {
    palm: map(hand.palm),
    indexTip: map(hand.indexTip),
    segments: hand.segments.map((s) => ({
      x1: map({ x: s.x1, y: s.y1 }).x,
      y1: map({ x: s.x1, y: s.y1 }).y,
      x2: map({ x: s.x2, y: s.y2 }).x,
      y2: map({ x: s.x2, y: s.y2 }).y,
      emphasis: s.emphasis,
    })),
  }
}
