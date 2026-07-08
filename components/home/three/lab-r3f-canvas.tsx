'use client'

import { Canvas } from '@react-three/fiber'
import type { ReactNode } from 'react'

type LabR3fCanvasProps = {
  children: ReactNode
  cameraZ?: number
}

export function LabR3fCanvas({ children, cameraZ = 3.4 }: LabR3fCanvasProps) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0.05, cameraZ], fov: 42, near: 0.1, far: 20 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ width: '100%', height: '100%', display: 'block' }}
    >
      <color attach="background" args={['#000000']} />
      <fog attach="fog" args={['#000000', 3.5, 8]} />
      <ambientLight intensity={0.3} />
      <directionalLight position={[2.5, 4, 3]} intensity={0.55} color="#f8fafc" />
      <directionalLight position={[-3, 1, -2]} intensity={0.15} color="#38bdf8" />
      {children}
    </Canvas>
  )
}
