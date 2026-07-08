import * as THREE from 'three'
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js'
import type { HandSide } from '@/lib/three/procedural-hand'

export type HandRigPart = {
  geometry: THREE.BufferGeometry
  position: [number, number, number]
  rotation: [number, number, number]
  curlAxis?: 'x' | 'z'
  curlMax?: number
}

export type HandRigDefinition = {
  palm: HandRigPart
  wrist: HandRigPart
  fingers: HandRigPart[]
  thumb: HandRigPart
}

function fingerPart(x: number, z: number, len: number, curlMax: number): HandRigPart {
  const geo = new THREE.CapsuleGeometry(0.065, len, 4, 10)
  return {
    geometry: geo,
    position: [x, 0.05, z - len / 2],
    rotation: [0, 0, 0],
    curlAxis: 'x',
    curlMax,
  }
}

export function createHandshakeRig(side: HandSide): HandRigDefinition {
  const palmGeo = new THREE.BoxGeometry(0.92, 0.18, 0.82)
  palmGeo.translate(0, 0, 0.02)

  const wristGeo = new THREE.BoxGeometry(0.62, 0.14, 0.36)
  wristGeo.translate(0, -0.02, 0.58)

  const thumbGeo = new THREE.CapsuleGeometry(0.07, 0.38, 4, 10)
  const thumbSide = side === 'right' ? 1 : -1

  return {
    palm: {
      geometry: palmGeo,
      position: [0, 0, 0],
      rotation: [0, 0, 0],
    },
    wrist: {
      geometry: wristGeo,
      position: [0, 0, 0],
      rotation: [0, 0, 0],
    },
    fingers: [
      fingerPart(-0.32, -0.42, 0.48, 1.15),
      fingerPart(-0.1, -0.48, 0.64, 1.25),
      fingerPart(0.1, -0.46, 0.6, 1.2),
      fingerPart(0.32, -0.4, 0.48, 1.05),
    ],
    thumb: {
      geometry: thumbGeo,
      position: [thumbSide * 0.52, -0.03, 0.06],
      rotation: [-0.2, 0, thumbSide * -0.7],
      curlAxis: 'z',
      curlMax: thumbSide * -1.1,
    },
  }
}

/** Merged mesh for halftone left hand (static silhouette). */
export function createHalftoneHandGeometry(side: HandSide): THREE.BufferGeometry {
  const rig = createHandshakeRig(side)
  const parts = [
    rig.palm.geometry,
    rig.wrist.geometry,
    ...rig.fingers.map((f) => {
      const g = f.geometry.clone()
      g.translate(f.position[0], f.position[1], f.position[2])
      return g
    }),
  ]
  const thumb = rig.thumb.geometry.clone()
  thumb.translate(rig.thumb.position[0], rig.thumb.position[1], rig.thumb.position[2])
  thumb.rotateZ(rig.thumb.rotation[2])
  thumb.rotateX(rig.thumb.rotation[0])
  parts.push(thumb)

  const merged = mergeGeometries(parts)
  if (!merged) throw new Error('Failed to merge halftone hand')

  merged.computeVertexNormals()
  merged.center()
  merged.rotateX(-0.12)
  if (side === 'left') merged.scale(-1, 1, 1)

  return merged
}

export function getHandshakePhases(progress: number) {
  const p = Math.min(1, Math.max(0, progress))
  if (p < 0.22) {
    return { approach: p / 0.22, curl: 0 }
  }
  if (p < 0.58) {
    return { approach: 1, curl: (p - 0.22) / 0.36 }
  }
  return { approach: 1, curl: Math.min(1, 0.4 + ((p - 0.58) / 0.42) * 0.6) }
}
