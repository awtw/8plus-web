'use client'

import { useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { createStylizedHandGeometry } from '@/lib/three/procedural-hand'
import { LabR3fCanvas } from './lab-r3f-canvas'

const WIREFRAME_COLOR = '#f8fafc'
const ACCENT_COLOR = '#38bdf8'

function HandPair({ progress }: { progress: number }) {
  const rightRef = useRef<THREE.Group>(null)
  const leftRef = useRef<THREE.Group>(null)
  const glowRef = useRef<THREE.Mesh>(null)

  const { rightGeo, leftGeo } = useMemo(
    () => ({
      rightGeo: createStylizedHandGeometry('right'),
      leftGeo: createStylizedHandGeometry('left'),
    }),
    [],
  )

  useFrame(() => {
    const eased = 1 - (1 - Math.min(1, Math.max(0, progress))) ** 2.2
    const meet = Math.min(1, Math.max(0, (progress - 0.35) / 0.65))

    if (rightRef.current) {
      rightRef.current.position.set(
        THREE.MathUtils.lerp(1.35, 0.42, eased),
        THREE.MathUtils.lerp(-0.08, 0, eased),
        THREE.MathUtils.lerp(0.15, -0.05, eased),
      )
      rightRef.current.rotation.set(
        THREE.MathUtils.lerp(-0.25, -0.05, eased),
        THREE.MathUtils.lerp(-0.55, -0.12, eased),
        THREE.MathUtils.lerp(0.15, 0.05, meet),
      )
    }

    if (leftRef.current) {
      leftRef.current.position.set(
        THREE.MathUtils.lerp(-1.35, -0.42, eased),
        THREE.MathUtils.lerp(-0.08, 0, eased),
        THREE.MathUtils.lerp(0.15, -0.05, eased),
      )
      leftRef.current.rotation.set(
        THREE.MathUtils.lerp(-0.25, -0.05, eased),
        THREE.MathUtils.lerp(0.55, 0.12, eased),
        THREE.MathUtils.lerp(-0.15, -0.05, meet),
      )
    }

    if (glowRef.current) {
      const scale = 0.15 + meet * 0.35
      glowRef.current.scale.setScalar(scale)
      const mat = glowRef.current.material as THREE.MeshBasicMaterial
      mat.opacity = meet * 0.45
    }
  })

  useEffect(
    () => () => {
      rightGeo.dispose()
      leftGeo.dispose()
    },
    [rightGeo, leftGeo],
  )

  return (
    <group>
      <group ref={rightRef}>
        <mesh geometry={rightGeo}>
          <meshBasicMaterial color={WIREFRAME_COLOR} wireframe transparent opacity={0.9} />
        </mesh>
      </group>
      <group ref={leftRef}>
        <mesh geometry={leftGeo}>
          <meshBasicMaterial color={WIREFRAME_COLOR} wireframe transparent opacity={0.9} />
        </mesh>
      </group>
      <mesh ref={glowRef} position={[0, 0, -0.02]}>
        <sphereGeometry args={[0.55, 16, 16]} />
        <meshBasicMaterial color={ACCENT_COLOR} transparent opacity={0} depthWrite={false} />
      </mesh>
    </group>
  )
}

type HandHandshakeMorphSceneProps = {
  progress: number
}

export default function HandHandshakeMorphScene({ progress }: HandHandshakeMorphSceneProps) {
  return (
    <LabR3fCanvas cameraZ={4.2}>
      <HandPair progress={progress} />
    </LabR3fCanvas>
  )
}
