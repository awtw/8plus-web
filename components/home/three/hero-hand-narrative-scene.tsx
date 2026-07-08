'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import {
  createHeroHandGeometry,
  getHandBounds,
  getHeroNarrativePhases,
} from '@/lib/three/procedural-hand'

const vertexShader = /* glsl */ `
  varying vec3 vPos;
  varying vec3 vNormal;
  void main() {
    vPos = position;
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = /* glsl */ `
  uniform float uProgress;
  uniform float uMinY;
  uniform float uMaxY;
  uniform vec3 uColor;
  uniform vec3 uAccent;
  varying vec3 vPos;
  varying vec3 vNormal;

  void main() {
    float scanY = mix(uMinY - 0.15, uMaxY + 0.05, uProgress);
    float band = 0.06;
    float below = step(vPos.y, scanY);
    float inBand = smoothstep(scanY - band, scanY, vPos.y)
      * (1.0 - smoothstep(scanY, scanY + band * 0.35, vPos.y));
    if (below < 0.5) discard;
    float rim = pow(1.0 - abs(dot(normalize(vNormal), vec3(0.0, 0.0, 1.0))), 2.0);
    vec3 col = mix(uColor, uAccent, inBand * 0.85 + rim * 0.12);
    float alpha = 0.35 + rim * 0.55 + inBand * 0.25;
    gl_FragColor = vec4(col, alpha);
  }
`

function CameraRig({ reach, handshake }: { reach: number; handshake: number }) {
  const { camera } = useThree()
  useFrame(() => {
    const z = THREE.MathUtils.lerp(3.6, 3.05, reach) - handshake * 0.25
    const y = THREE.MathUtils.lerp(0.05, 0.18, reach)
    camera.position.set(0, y, z)
    camera.lookAt(0, THREE.MathUtils.lerp(-0.1, 0.05, handshake), 0)
    camera.updateProjectionMatrix()
  })
  return null
}

function LidarHand({ progress }: { progress: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const uniformsRef = useRef({
    uProgress: { value: 0 },
    uMinY: { value: -1 },
    uMaxY: { value: 1 },
    uColor: { value: new THREE.Color('#f8fafc') },
    uAccent: { value: new THREE.Color('#38bdf8') },
  })

  const { geometry, edgesGeometry, bounds } = useMemo(() => {
    const geo = createHeroHandGeometry('right')
    return {
      geometry: geo,
      edgesGeometry: new THREE.EdgesGeometry(geo, 10),
      bounds: getHandBounds(geo),
    }
  }, [])

  const material = useMemo(() => {
    uniformsRef.current.uMinY.value = bounds.minY
    uniformsRef.current.uMaxY.value = bounds.maxY
    return new THREE.ShaderMaterial({
      uniforms: uniformsRef.current,
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
    })
  }, [bounds.maxY, bounds.minY])

  useFrame(() => {
    uniformsRef.current.uProgress.value = progress
    if (meshRef.current) {
      meshRef.current.rotation.y = -0.08 + progress * 0.12
    }
  })

  useEffect(
    () => () => {
      geometry.dispose()
      edgesGeometry.dispose()
      material.dispose()
    },
    [geometry, edgesGeometry, material],
  )

  return (
    <group>
      <mesh ref={meshRef} geometry={geometry} material={material} />
      <lineSegments geometry={edgesGeometry}>
        <lineBasicMaterial color="#7dd3fc" transparent opacity={0.2} />
      </lineSegments>
    </group>
  )
}

function WireframeReachHand({ reach }: { reach: number }) {
  const groupRef = useRef<THREE.Group>(null)
  const geometry = useMemo(() => createHeroHandGeometry('right'), [])

  useFrame(() => {
    if (!groupRef.current) return
    groupRef.current.rotation.x = THREE.MathUtils.lerp(-0.05, -0.22, reach)
    groupRef.current.position.z = THREE.MathUtils.lerp(0, -0.35, reach)
    groupRef.current.position.y = THREE.MathUtils.lerp(0, 0.12, reach)
  })

  useEffect(() => () => geometry.dispose(), [geometry])

  return (
    <group ref={groupRef}>
      <mesh geometry={geometry}>
        <meshBasicMaterial color="#f8fafc" wireframe transparent opacity={0.88} />
      </mesh>
    </group>
  )
}

function HandshakePair({ progress }: { progress: number }) {
  const rightRef = useRef<THREE.Group>(null)
  const leftRef = useRef<THREE.Group>(null)
  const glowRef = useRef<THREE.Mesh>(null)

  const { rightGeo, leftGeo } = useMemo(
    () => ({
      rightGeo: createHeroHandGeometry('right'),
      leftGeo: createHeroHandGeometry('left'),
    }),
    [],
  )

  useFrame(() => {
    const eased = 1 - (1 - progress) ** 2.2
    const meet = Math.min(1, Math.max(0, (progress - 0.35) / 0.65))

    if (rightRef.current) {
      rightRef.current.position.set(
        THREE.MathUtils.lerp(0.95, 0.38, eased),
        THREE.MathUtils.lerp(-0.2, -0.05, eased),
        THREE.MathUtils.lerp(0.1, -0.08, eased),
      )
      rightRef.current.rotation.set(
        THREE.MathUtils.lerp(-0.12, -0.04, eased),
        THREE.MathUtils.lerp(-0.35, -0.1, eased),
        THREE.MathUtils.lerp(0.08, 0.03, meet),
      )
    }

    if (leftRef.current) {
      leftRef.current.position.set(
        THREE.MathUtils.lerp(-0.95, -0.38, eased),
        THREE.MathUtils.lerp(-0.2, -0.05, eased),
        THREE.MathUtils.lerp(0.1, -0.08, eased),
      )
      leftRef.current.rotation.set(
        THREE.MathUtils.lerp(-0.12, -0.04, eased),
        THREE.MathUtils.lerp(0.35, 0.1, eased),
        THREE.MathUtils.lerp(-0.08, -0.03, meet),
      )
    }

    if (glowRef.current) {
      glowRef.current.scale.setScalar(0.12 + meet * 0.28)
      const mat = glowRef.current.material as THREE.MeshBasicMaterial
      mat.opacity = meet * 0.42
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
          <meshBasicMaterial color="#f8fafc" wireframe transparent opacity={0.9} />
        </mesh>
      </group>
      <group ref={leftRef}>
        <mesh geometry={leftGeo}>
          <meshBasicMaterial color="#f8fafc" wireframe transparent opacity={0.9} />
        </mesh>
      </group>
      <mesh ref={glowRef} position={[0, 0, -0.02]}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0} depthWrite={false} />
      </mesh>
    </group>
  )
}

function NarrativeStage({ progress }: { progress: number }) {
  const phases = getHeroNarrativePhases(progress)
  const showLidar = phases.handshake < 0.08
  const showReachWire = phases.lidar >= 1 && phases.handshake < 0.08
  const showHandshake = phases.handshake > 0

  return (
    <>
      <CameraRig reach={phases.reach} handshake={phases.handshake} />
      {showLidar ? <LidarHand progress={phases.lidar} /> : null}
      {showReachWire ? <WireframeReachHand reach={phases.reach} /> : null}
      {showHandshake ? <HandshakePair progress={phases.handshake} /> : null}
    </>
  )
}

type HeroHandNarrativeSceneProps = {
  progress: number
}

export default function HeroHandNarrativeScene({ progress }: HeroHandNarrativeSceneProps) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0.05, 3.6], fov: 42, near: 0.1, far: 20 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ width: '100%', height: '100%', display: 'block' }}
    >
      <color attach="background" args={['#000000']} />
      <fog attach="fog" args={['#000000', 3.5, 9]} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[2.5, 4, 3]} intensity={0.55} color="#f8fafc" />
      <NarrativeStage progress={progress} />
    </Canvas>
  )
}
