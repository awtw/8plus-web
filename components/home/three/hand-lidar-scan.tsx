'use client'

import { useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { createStylizedHandGeometry, getHandBounds } from '@/lib/three/procedural-hand'
import { LabR3fCanvas } from './lab-r3f-canvas'

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

function LidarScanMesh({ progress }: { progress: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const uniformsRef = useRef({
    uProgress: { value: 0 },
    uMinY: { value: -1 },
    uMaxY: { value: 1 },
    uColor: { value: new THREE.Color('#f8fafc') },
    uAccent: { value: new THREE.Color('#38bdf8') },
  })

  const { geometry, edgesGeometry, bounds } = useMemo(() => {
    const geo = createStylizedHandGeometry('right')
    const bounds = getHandBounds(geo)
    return {
      geometry: geo,
      edgesGeometry: new THREE.EdgesGeometry(geo, 12),
      bounds,
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
      meshRef.current.rotation.y = -0.12 + progress * 0.18
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
        <lineBasicMaterial color="#7dd3fc" transparent opacity={0.22} />
      </lineSegments>
    </group>
  )
}

type HandLidarScanSceneProps = {
  progress: number
}

export default function HandLidarScanScene({ progress }: HandLidarScanSceneProps) {
  return (
    <LabR3fCanvas>
      <LidarScanMesh progress={progress} />
    </LabR3fCanvas>
  )
}
