'use client'

import { useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import {
  clonePositionAttribute,
  createScatteredPositions,
  createStylizedHandGeometry,
} from '@/lib/three/procedural-hand'
import { LabR3fCanvas } from './lab-r3f-canvas'

const WIREFRAME_COLOR = '#f8fafc'

function VertexScatterMesh({ progress }: { progress: number }) {
  const meshRef = useRef<THREE.Mesh>(null)

  const { geometry, target, scattered } = useMemo(() => {
    const geo = createStylizedHandGeometry('right')
    return {
      geometry: geo,
      target: clonePositionAttribute(geo),
      scattered: createScatteredPositions(geo, 2.2),
    }
  }, [])

  useFrame(() => {
    const mesh = meshRef.current
    if (!mesh) return

    const position = mesh.geometry.getAttribute('position') as THREE.BufferAttribute
    const eased = 1 - (1 - Math.min(1, Math.max(0, progress))) ** 3

    for (let i = 0; i < position.count; i++) {
      const i3 = i * 3
      position.array[i3] = THREE.MathUtils.lerp(scattered[i3], target[i3], eased)
      position.array[i3 + 1] = THREE.MathUtils.lerp(scattered[i3 + 1], target[i3 + 1], eased)
      position.array[i3 + 2] = THREE.MathUtils.lerp(scattered[i3 + 2], target[i3 + 2], eased)
    }

    position.needsUpdate = true
    mesh.rotation.y = THREE.MathUtils.lerp(-0.35, 0.08, eased)
    mesh.rotation.x = THREE.MathUtils.lerp(0.2, -0.12, eased)
  })

  useEffect(() => () => geometry.dispose(), [geometry])

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshBasicMaterial color={WIREFRAME_COLOR} wireframe transparent opacity={0.92} />
    </mesh>
  )
}

type HandVertexScatterSceneProps = {
  progress: number
}

export default function HandVertexScatterScene({ progress }: HandVertexScatterSceneProps) {
  return (
    <LabR3fCanvas>
      <VertexScatterMesh progress={progress} />
    </LabR3fCanvas>
  )
}
