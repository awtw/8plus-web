'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const POINT_COUNT = 1600
const NEIGHBOR_DIST = 0.13
const MAX_NEIGHBORS = 5

type Sample = {
  x: number
  y: number
  z: number
}

function insideHead(sample: Sample) {
  const nx = sample.x / 0.54
  const ny = sample.y / 0.76
  const nz = sample.z / 0.5
  return nx * nx + ny * ny + nz * nz <= 1
}

function inEyeSocket(sample: Sample) {
  const left =
    ((sample.x + 0.19) / 0.13) ** 2 +
    ((sample.y - 0.11) / 0.09) ** 2 +
    ((sample.z - 0.1) / 0.11) ** 2
  const right =
    ((sample.x - 0.19) / 0.13) ** 2 +
    ((sample.y - 0.11) / 0.09) ** 2 +
    ((sample.z - 0.1) / 0.11) ** 2
  return left < 1 || right < 1
}

function noseWeight(sample: Sample) {
  const bridge = Math.exp(-((sample.x / 0.05) ** 2 + ((sample.y + 0.02) / 0.2) ** 2))
  const tip = Math.exp(-((sample.x / 0.07) ** 2 + ((sample.y + 0.28) / 0.08) ** 2))
  return bridge * 0.55 + tip * 1.4
}

function mouthWeight(sample: Sample) {
  return Math.exp(-((sample.x / 0.2) ** 2 + ((sample.y + 0.34) / 0.05) ** 2))
}

function cheekboneWeight(sample: Sample) {
  const left = Math.exp(-(((sample.x + 0.28) / 0.12) ** 2 + ((sample.y + 0.02) / 0.16) ** 2))
  const right = Math.exp(-(((sample.x - 0.28) / 0.12) ** 2 + ((sample.y + 0.02) / 0.16) ** 2))
  return left + right
}

function generateFaceSamples() {
  const samples: Sample[] = []
  let guard = 0

  while (samples.length < POINT_COUNT && guard < POINT_COUNT * 50) {
    guard += 1
    const candidate = {
      x: (Math.random() - 0.5) * 1.12,
      y: (Math.random() - 0.5) * 1.55,
      z: (Math.random() - 0.5) * 1,
    }

    if (!insideHead(candidate) || inEyeSocket(candidate)) {
      continue
    }

    const featureBias = noseWeight(candidate) + mouthWeight(candidate) + cheekboneWeight(candidate) * 0.35
    const edge = Math.sqrt(candidate.x ** 2 + candidate.y ** 2)
    const keepChance = 0.3 + featureBias * 0.45 + (edge > 0.4 ? 0.24 : 0)
    if (Math.random() > keepChance) {
      continue
    }

    const zBump = noseWeight(candidate) * 0.09
    samples.push({
      x: candidate.x,
      y: candidate.y,
      z: candidate.z + zBump,
    })
  }

  return samples.map((sample) => new THREE.Vector3(sample.x, sample.y, sample.z))
}

function buildNeighborPairs(points: THREE.Vector3[]) {
  const pairs: Array<[number, number]> = []

  for (let i = 0; i < points.length; i += 1) {
    const neighbors: Array<{ index: number; distance: number }> = []

    for (let j = 0; j < points.length; j += 1) {
      if (i === j) continue
      const distance = points[i].distanceTo(points[j])
      if (distance <= NEIGHBOR_DIST) {
        neighbors.push({ index: j, distance })
      }
    }

    neighbors
      .sort((a, b) => a.distance - b.distance)
      .slice(0, MAX_NEIGHBORS)
      .forEach((neighbor) => {
        if (neighbor.index > i) {
          pairs.push([i, neighbor.index])
        }
      })
  }

  return pairs
}

function writeLinePositions(
  pairs: Array<[number, number]>,
  positions: THREE.Vector3[],
  target: Float32Array,
) {
  pairs.forEach(([a, b], index) => {
    const offset = index * 6
    const pointA = positions[a]
    const pointB = positions[b]
    target[offset] = pointA.x
    target[offset + 1] = pointA.y
    target[offset + 2] = pointA.z
    target[offset + 3] = pointB.x
    target[offset + 4] = pointB.y
    target[offset + 5] = pointB.z
  })
}

export function FaceIdVisual() {
  const hostRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return

    const scene = new THREE.Scene()
    scene.background = new THREE.Color('#000000')

    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 20)
    camera.position.set(0, 0.05, 2.28)

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance',
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor('#000000', 1)
    host.appendChild(renderer.domElement)

    const root = new THREE.Group()
    scene.add(root)

    const basePoints = generateFaceSamples()
    const livePoints = basePoints.map((point) => point.clone())
    const neighborPairs = buildNeighborPairs(basePoints)

    const pointPositions = new Float32Array(livePoints.length * 3)
    livePoints.forEach((point, index) => {
      pointPositions[index * 3] = point.x
      pointPositions[index * 3 + 1] = point.y
      pointPositions[index * 3 + 2] = point.z
    })

    const pointGeometry = new THREE.BufferGeometry()
    pointGeometry.setAttribute('position', new THREE.BufferAttribute(pointPositions, 3))

    const pointMaterial = new THREE.PointsMaterial({
      color: new THREE.Color('#7dd3fc'),
      size: 0.02,
      transparent: true,
      opacity: 0.98,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    })

    const points = new THREE.Points(pointGeometry, pointMaterial)
    root.add(points)

    const linePositions = new Float32Array(neighborPairs.length * 6)
    writeLinePositions(neighborPairs, livePoints, linePositions)

    const lineGeometry = new THREE.BufferGeometry()
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3))

    const lineMaterial = new THREE.LineBasicMaterial({
      color: new THREE.Color('#d946ef'),
      transparent: true,
      opacity: 0.38,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    const lines = new THREE.LineSegments(lineGeometry, lineMaterial)
    root.add(lines)

    const glowGeometry = new THREE.BufferGeometry()
    glowGeometry.setAttribute('position', new THREE.BufferAttribute(pointPositions.slice(), 3))
    const glowMaterial = new THREE.PointsMaterial({
      color: new THREE.Color('#22d3ee'),
      size: 0.055,
      transparent: true,
      opacity: 0.14,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    })
    const glow = new THREE.Points(glowGeometry, glowMaterial)
    root.add(glow)

    root.rotation.x = -0.03

    const resize = () => {
      const width = host.clientWidth
      const height = host.clientHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height, false)
    }

    resize()
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(host)

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const pointAttr = pointGeometry.getAttribute('position') as THREE.BufferAttribute
    const glowAttr = glowGeometry.getAttribute('position') as THREE.BufferAttribute
    const lineAttr = lineGeometry.getAttribute('position') as THREE.BufferAttribute
    const clock = new THREE.Clock()
    let frameId = 0

    const animate = () => {
      const elapsed = clock.getElapsedTime()

      if (!reducedMotion) {
        root.rotation.y = Math.sin(elapsed * 0.24) * 0.28
        root.rotation.x = -0.03 + Math.sin(elapsed * 0.33) * 0.025

        for (let i = 0; i < basePoints.length; i += 1) {
          const ox = basePoints[i].x
          const oy = basePoints[i].y
          const oz = basePoints[i].z
          const jitter = 0.0055
          const px = ox + Math.sin(elapsed * 2.2 + i * 0.17) * jitter
          const py = oy + Math.cos(elapsed * 1.9 + i * 0.13) * jitter
          const pz = oz + Math.sin(elapsed * 2.5 + i * 0.11) * jitter

          livePoints[i].set(px, py, pz)
          pointAttr.setXYZ(i, px, py, pz)
          glowAttr.setXYZ(i, px, py, pz)
        }

        writeLinePositions(neighborPairs, livePoints, linePositions)
        lineAttr.array = linePositions
        lineAttr.needsUpdate = true
        pointAttr.needsUpdate = true
        glowAttr.needsUpdate = true

        lineMaterial.opacity = 0.3 + Math.sin(elapsed * 1.7) * 0.1
        pointMaterial.size = 0.019 + Math.sin(elapsed * 2.1) * 0.002
      }

      renderer.render(scene, camera)
      frameId = window.requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.cancelAnimationFrame(frameId)
      resizeObserver.disconnect()
      pointGeometry.dispose()
      lineGeometry.dispose()
      glowGeometry.dispose()
      pointMaterial.dispose()
      lineMaterial.dispose()
      glowMaterial.dispose()
      renderer.dispose()
      if (renderer.domElement.parentElement === host) {
        host.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div className="plexus-face-visual" aria-hidden>
      <div ref={hostRef} className="plexus-face-canvas-host" />
    </div>
  )
}
