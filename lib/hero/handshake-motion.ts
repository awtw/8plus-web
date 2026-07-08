/** Progress 0–1 → handshake motion weights (SVG path A). */

export type HandshakeMotion = {
  approach: number
  curl: number
  wireX: number
  wireY: number
  wireRotate: number
  finger1: number
  finger2: number
  finger3: number
  finger4: number
  thumb: number
  glow: number
}

function easeOut(t: number) {
  return 1 - (1 - t) ** 2.4
}

export function getHandshakeMotion(progress: number): HandshakeMotion {
  const p = Math.min(1, Math.max(0, progress))

  let approach = 0
  let curl = 0

  if (p < 0.22) {
    approach = easeOut(p / 0.22)
  } else if (p < 0.58) {
    approach = 1
    curl = easeOut((p - 0.22) / 0.36)
  } else {
    approach = 1
    curl = easeOut(0.4 + ((p - 0.58) / 0.42) * 0.6)
  }

  return {
    approach,
    curl,
    wireX: 118 - approach * 118,
    wireY: 8 - approach * 8,
    wireRotate: 14 - approach * 14,
    finger1: curl * 22,
    finger2: curl * 28,
    finger3: curl * 26,
    finger4: curl * 20,
    thumb: curl * -18,
    glow: Math.min(1, curl * 1.15),
  }
}
