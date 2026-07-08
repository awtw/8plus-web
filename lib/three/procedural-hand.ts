import * as THREE from 'three'
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js'

export type HandSide = 'right' | 'left'

function buildHandParts(side: HandSide): THREE.BufferGeometry[] {
  const parts: THREE.BufferGeometry[] = []

  const palm = new THREE.BoxGeometry(0.92, 0.18, 0.82)
  palm.translate(0, 0, 0.02)
  parts.push(palm)

  const wrist = new THREE.BoxGeometry(0.62, 0.14, 0.36)
  wrist.translate(0, -0.02, 0.58)
  parts.push(wrist)

  const fingers = [
    { x: -0.32, z: -0.42, len: 0.48 },
    { x: -0.1, z: -0.48, len: 0.64 },
    { x: 0.1, z: -0.46, len: 0.6 },
    { x: 0.3, z: -0.4, len: 0.48 },
  ]

  for (const finger of fingers) {
    const segment = new THREE.CapsuleGeometry(0.065, finger.len, 4, 10)
    segment.translate(finger.x, 0.05, finger.z - finger.len / 2)
    parts.push(segment)
  }

  const thumb = new THREE.CapsuleGeometry(0.07, 0.38, 4, 10)
  thumb.rotateZ(side === 'right' ? -0.7 : 0.7)
  thumb.rotateX(-0.2)
  thumb.translate(side === 'right' ? 0.52 : -0.52, -0.03, 0.06)
  parts.push(thumb)

  return parts
}

/** hand_line.png inspired reach pose — wrist down, fingers up. */
export function createHeroHandGeometry(side: HandSide = 'right'): THREE.BufferGeometry {
  const merged = mergeGeometries(buildHandParts(side))
  if (!merged) throw new Error('Failed to merge hand geometry')

  merged.computeVertexNormals()
  merged.center()
  merged.rotateX(-1.05)
  merged.rotateY(side === 'right' ? -0.22 : 0.22)
  merged.translate(0, -0.55, 0)

  if (side === 'left') {
    merged.scale(-1, 1, 1)
  }

  return merged
}

/** Low-poly stylized hand for lab prototypes. */
export function createStylizedHandGeometry(side: HandSide = 'right'): THREE.BufferGeometry {
  const merged = mergeGeometries(buildHandParts(side))
  if (!merged) throw new Error('Failed to merge hand geometry')

  merged.computeVertexNormals()
  merged.center()
  merged.rotateX(-0.15)

  if (side === 'left') {
    merged.scale(-1, 1, 1)
  }

  return merged
}

export function getHandBounds(geometry: THREE.BufferGeometry) {
  geometry.computeBoundingBox()
  const box = geometry.boundingBox ?? new THREE.Box3()
  return {
    minY: box.min.y,
    maxY: box.max.y,
    height: box.max.y - box.min.y,
  }
}

export function createScatteredPositions(
  geometry: THREE.BufferGeometry,
  spread = 2.4,
  seed = 42,
): Float32Array {
  const position = geometry.getAttribute('position')
  const scattered = new Float32Array(position.count * 3)
  let s = seed

  const rand = () => {
    s = (s * 16807 + 0) % 2147483647
    return (s - 1) / 2147483646
  }

  for (let i = 0; i < position.count; i++) {
    const angle = rand() * Math.PI * 2
    const radius = spread * (0.35 + rand() * 0.65)
    const y = (rand() - 0.5) * spread * 1.2
    scattered[i * 3] = Math.cos(angle) * radius
    scattered[i * 3 + 1] = y
    scattered[i * 3 + 2] = Math.sin(angle) * radius - 0.5
  }

  return scattered
}

export function clonePositionAttribute(geometry: THREE.BufferGeometry): Float32Array {
  const position = geometry.getAttribute('position')
  return new Float32Array(position.array)
}

/** Map global narrative progress (0–1) to phase weights. */
export function getHeroNarrativePhases(progress: number) {
  const p = Math.min(1, Math.max(0, progress))
  return {
    lidar: Math.min(1, p / 0.35),
    reach: p < 0.35 ? 0 : Math.min(1, (p - 0.35) / 0.17),
    handshake: p < 0.52 ? 0 : Math.min(1, (p - 0.52) / 0.48),
    logoStamp: p < 0.88 ? 0 : Math.min(1, (p - 0.88) / 0.12),
    label:
      p < 0.35 ? 'mesh' : p < 0.52 ? 'reach' : ('handshake' as 'mesh' | 'reach' | 'handshake'),
  }
}
