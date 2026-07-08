'use client'

import { useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import {
  createHalftoneHandGeometry,
  createHandshakeRig,
  getHandshakePhases,
  type HandRigPart,
} from '@/lib/three/handshake-rig'
import { LabR3fCanvas } from './lab-r3f-canvas'

const WIREFRAME = '#f8fafc'
const HALFTONE = '#f8fafc'

const halftoneVertex = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vViewPos;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vViewPos = mv.xyz;
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * mv;
  }
`

const halftoneFragment = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vViewPos;
  uniform float uDotScale;

  void main() {
    float light = dot(normalize(vNormal), normalize(vec3(0.2, 0.85, 0.45))) * 0.5 + 0.5;
    vec2 cell = gl_FragCoord.xy / uDotScale;
    vec2 grid = fract(cell) - 0.5;
    float dist = length(grid);
    float radius = mix(0.12, 0.42, light);
    if (dist > radius) discard;
    gl_FragColor = vec4(0.97, 0.98, 1.0, 0.92);
  }
`

function RigPartMesh({
  part,
  curl,
  material,
}: {
  part: HandRigPart
  curl: number
  material: THREE.Material
}) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(() => {
    const g = groupRef.current
    if (!g || part.curlMax === undefined) return
    const c = curl * part.curlMax
    if (part.curlAxis === 'z') {
      g.rotation.z = part.rotation[2] + c
    } else {
      g.rotation.x = part.rotation[0] + c
    }
  })

  return (
    <group
      ref={groupRef}
      position={part.position}
      rotation={part.rotation}
    >
      <mesh geometry={part.geometry} material={material} />
    </group>
  )
}

function WireframeGripHand({ progress }: { progress: number }) {
  const rootRef = useRef<THREE.Group>(null)
  const rig = useMemo(() => createHandshakeRig('right'), [])
  const wireMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: WIREFRAME,
        wireframe: true,
        transparent: true,
        opacity: 0.92,
      }),
    [],
  )

  const phases = getHandshakePhases(progress)
  const curlEase = 1 - (1 - phases.curl) ** 2.4

  useFrame(() => {
    const root = rootRef.current
    if (!root) return
    const approach = 1 - (1 - phases.approach) ** 2

    root.position.set(
      THREE.MathUtils.lerp(1.55, 0.36, approach),
      THREE.MathUtils.lerp(-0.05, 0.02, approach),
      THREE.MathUtils.lerp(0.2, -0.02, approach),
    )
    root.rotation.set(
      THREE.MathUtils.lerp(-0.18, -0.08, approach),
      THREE.MathUtils.lerp(-0.42, -0.14, approach),
      THREE.MathUtils.lerp(0.1, 0.04, curlEase),
    )
  })

  useEffect(
    () => () => {
      wireMat.dispose()
      rig.palm.geometry.dispose()
      rig.wrist.geometry.dispose()
      rig.fingers.forEach((f) => f.geometry.dispose())
      rig.thumb.geometry.dispose()
    },
    [rig, wireMat],
  )

  return (
    <group ref={rootRef}>
      <mesh geometry={rig.palm.geometry} material={wireMat} position={rig.palm.position} />
      <mesh geometry={rig.wrist.geometry} material={wireMat} position={rig.wrist.position} />
      {rig.fingers.map((finger, i) => (
        <RigPartMesh key={i} part={finger} curl={curlEase} material={wireMat} />
      ))}
      <RigPartMesh part={rig.thumb} curl={curlEase} material={wireMat} />
    </group>
  )
}

function HalftoneStaticHand() {
  const geometry = useMemo(() => createHalftoneHandGeometry('left'), [])
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: { uDotScale: { value: 5.5 } },
        vertexShader: halftoneVertex,
        fragmentShader: halftoneFragment,
        transparent: true,
        depthWrite: true,
        side: THREE.DoubleSide,
      }),
    [],
  )
  const groupRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.position.set(-0.34, 0.02, -0.02)
      groupRef.current.rotation.set(-0.08, 0.14, -0.03)
    }
  })

  useEffect(
    () => () => {
      geometry.dispose()
      material.dispose()
    },
    [geometry, material],
  )

  return (
    <group ref={groupRef}>
      <mesh geometry={geometry} material={material} />
    </group>
  )
}

function HudRings() {
  const ringRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = Math.sin(clock.elapsedTime * 0.15) * 0.02
    }
  })

  return (
    <group ref={ringRef} position={[0, -0.55, -0.4]}>
      {[1.2, 1.45, 1.7].map((r, i) => (
        <mesh key={r} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[r, 0.004, 8, 96, Math.PI * 0.55]} />
          <meshBasicMaterial color="#f8fafc" transparent opacity={0.12 - i * 0.025} />
        </mesh>
      ))}
    </group>
  )
}

function HandshakeStage({ progress }: { progress: number }) {
  const meet = getHandshakePhases(progress).curl
  const glowRef = useRef<THREE.Mesh>(null)

  useFrame(() => {
    if (!glowRef.current) return
    const s = 0.1 + meet * 0.32
    glowRef.current.scale.setScalar(s)
    const mat = glowRef.current.material as THREE.MeshBasicMaterial
    mat.opacity = meet * 0.38
  })

  return (
    <>
      <HalftoneStaticHand />
      <WireframeGripHand progress={progress} />
      <HudRings />
      <mesh ref={glowRef} position={[0, 0.02, -0.05]}>
        <sphereGeometry args={[0.55, 20, 20]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0} depthWrite={false} />
      </mesh>
    </>
  )
}

type HeroHandshakeSceneProps = {
  progress: number
}

export default function HeroHandshakeScene({ progress }: HeroHandshakeSceneProps) {
  return (
    <LabR3fCanvas cameraZ={3.85}>
      <HandshakeStage progress={progress} />
    </LabR3fCanvas>
  )
}
