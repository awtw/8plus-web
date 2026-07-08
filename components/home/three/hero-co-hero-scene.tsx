'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { getCoHeroPhases, type CoHeroPhases } from '@/lib/three/co-hero-phases'
import {
  clonePositionAttribute,
  createCradleHandGeometry,
  createScatteredPositions,
} from '@/lib/three/cradle-hand'
import {
  createLogoWireframeLayers,
  LOGO_PALM_ANCHOR,
  type LogoWireframeLayer,
} from '@/lib/three/logo-wireframe'

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
  varying vec3 vPos;
  varying vec3 vNormal;

  void main() {
    float scanY = mix(uMinY - 0.12, uMaxY + 0.08, uProgress);
    float band = 0.07;
    float below = step(vPos.y, scanY);
    float inBand = smoothstep(scanY - band, scanY, vPos.y)
      * (1.0 - smoothstep(scanY, scanY + band * 0.35, vPos.y));
    if (below < 0.5) discard;
    float rim = pow(1.0 - abs(dot(normalize(vNormal), vec3(0.0, 0.0, 1.0))), 2.0);
    vec3 col = mix(vec3(0.97, 0.98, 1.0), vec3(0.22, 0.74, 0.97), inBand * 0.85 + rim * 0.1);
    float alpha = 0.32 + rim * 0.55 + inBand * 0.28;
    gl_FragColor = vec4(col, alpha);
  }
`

function useScanBounds(handGeo: THREE.BufferGeometry, logoLayers: LogoWireframeLayer[]) {
  return useMemo(() => {
    const box = new THREE.Box3()
    handGeo.computeBoundingBox()
    if (handGeo.boundingBox) box.copy(handGeo.boundingBox)
    for (const layer of logoLayers) {
      const pos = layer.position.clone().add(LOGO_PALM_ANCHOR)
      box.expandByPoint(pos.clone().add(new THREE.Vector3(0.2, 0.2, 0.1)))
      box.expandByPoint(pos.clone().sub(new THREE.Vector3(0.2, 0.2, 0.1)))
    }
    return { minY: box.min.y, maxY: box.max.y }
  }, [handGeo, logoLayers])
}

function CradleHandMesh({
  phases,
  bounds,
}: {
  phases: CoHeroPhases
  bounds: { minY: number; maxY: number }
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const uniformsRef = useRef({
    uProgress: { value: 0 },
    uMinY: { value: bounds.minY },
    uMaxY: { value: bounds.maxY },
  })

  const { geometry, target, scattered } = useMemo(() => {
    const geo = createCradleHandGeometry()
    return {
      geometry: geo,
      target: clonePositionAttribute(geo),
      scattered: createScatteredPositions(geo, 1.8, 7),
    }
  }, [])

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: uniformsRef.current,
        vertexShader,
        fragmentShader,
        transparent: true,
        depthWrite: false,
        side: THREE.DoubleSide,
      }),
    [],
  )

  useFrame(() => {
    const mesh = meshRef.current
    if (!mesh) return

    const scatterEase = 1 - (1 - phases.scatter) ** 2
    const position = mesh.geometry.getAttribute('position') as THREE.BufferAttribute

    for (let i = 0; i < position.count; i++) {
      const i3 = i * 3
      const tx = THREE.MathUtils.lerp(scattered[i3], target[i3], scatterEase)
      const ty = THREE.MathUtils.lerp(scattered[i3 + 1], target[i3 + 1], scatterEase)
      const tz = THREE.MathUtils.lerp(scattered[i3 + 2], target[i3 + 2], scatterEase)
      position.array[i3] = tx
      position.array[i3 + 1] = ty
      position.array[i3 + 2] = tz
    }
    position.needsUpdate = true

    uniformsRef.current.uProgress.value = phases.lidar
    uniformsRef.current.uMinY.value = bounds.minY
    uniformsRef.current.uMaxY.value = bounds.maxY

    const gripRot = phases.grip * 0.06
    mesh.rotation.x = gripRot
  })

  useEffect(
    () => () => {
      geometry.dispose()
      material.dispose()
    },
    [geometry, material],
  )

  return (
    <mesh ref={meshRef} geometry={geometry} material={material}>
      <lineSegments>
        <edgesGeometry args={[geometry, 12]} />
        <lineBasicMaterial color="#7dd3fc" transparent opacity={0.16} />
      </lineSegments>
    </mesh>
  )
}

function LogoWireframeGroup({ phases }: { phases: CoHeroPhases }) {
  const groupRef = useRef<THREE.Group>(null)
  const layers = useMemo(() => createLogoWireframeLayers(), [])

  useFrame(() => {
    const group = groupRef.current
    if (!group) return

    const scatterEase = 1 - (1 - phases.scatter) ** 2
    const snapEase = 1 - (1 - phases.snap) ** 3
    const gripEase = phases.grip

    group.children.forEach((child, index) => {
      const layer = layers[index]
      if (!layer) return

      const ox = THREE.MathUtils.lerp(layer.scatterOffset.x, 0, scatterEase)
      const oy = THREE.MathUtils.lerp(layer.scatterOffset.y, 0, scatterEase)
      const oz = THREE.MathUtils.lerp(layer.scatterOffset.z, 0, scatterEase)

      const snapOffset = (1 - snapEase) * 0.08
      child.position.set(
        layer.position.x + ox + (layer.id === 'circle-sm' ? -snapOffset : snapOffset * 0.5),
        layer.position.y + oy + snapOffset * 0.3,
        layer.position.z + oz,
      )

      const visible = phases.lidar > 0.02 || phases.scatter < 1
      child.visible = visible
      const mat = (child as THREE.Mesh).material as THREE.MeshBasicMaterial
      if (mat) {
        const scanCutoff = phases.lidar < 1 ? 0.35 + phases.lidar * 0.65 : 1
        mat.opacity = 0.2 + scanCutoff * 0.75
        mat.wireframe = true
      }
    })

    group.position.set(
      LOGO_PALM_ANCHOR.x,
      LOGO_PALM_ANCHOR.y - gripEase * 0.04,
      LOGO_PALM_ANCHOR.z,
    )
    group.scale.setScalar(0.92 + snapEase * 0.08 - gripEase * 0.02)
  })

  useEffect(
    () => () => {
      layers.forEach((l) => l.geometry.dispose())
    },
    [layers],
  )

  return (
    <group ref={groupRef}>
      {layers.map((layer) => (
        <mesh key={layer.id} geometry={layer.geometry}>
          <meshBasicMaterial color="#f8fafc" wireframe transparent opacity={0.85} />
        </mesh>
      ))}
    </group>
  )
}

function CoHeroStage({ progress }: { progress: number }) {
  const phases = getCoHeroPhases(progress)
  const handGeo = useMemo(() => createCradleHandGeometry(), [])
  const logoLayers = useMemo(() => createLogoWireframeLayers(), [])
  const bounds = useScanBounds(handGeo, logoLayers)

  return (
    <group position={[0, -0.08, 0]} rotation={[0, 0.12, 0]}>
      <CradleHandMesh phases={phases} bounds={bounds} />
      <LogoWireframeGroup phases={phases} />
    </group>
  )
}

type HeroCoHeroSceneProps = {
  progress: number
}

export default function HeroCoHeroScene({ progress }: HeroCoHeroSceneProps) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0.15, 3.35], fov: 44, near: 0.1, far: 20 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ width: '100%', height: '100%', display: 'block' }}
    >
      <color attach="background" args={['#000000']} />
      <fog attach="fog" args={['#000000', 3.2, 8.5]} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[2, 4, 3]} intensity={0.5} color="#f8fafc" />
      <gridHelper args={[6, 24, '#1e293b', '#0f172a']} position={[0, -1.05, 0]} />
      <CoHeroStage progress={progress} />
    </Canvas>
  )
}
