'use client'

import dynamic from 'next/dynamic'
import { Suspense, useCallback, useEffect, useId, useState } from 'react'
import { useReducedMotion } from '@/components/motion/use-reduced-motion'

const HandVertexScatterScene = dynamic(() => import('./hand-vertex-scatter'), { ssr: false })
const HandLidarScanScene = dynamic(() => import('./hand-lidar-scan'), { ssr: false })
const HandHandshakeMorphScene = dynamic(() => import('./hand-handshake-morph'), { ssr: false })

export type Phase4PrototypeId = 'vertex-scatter' | 'lidar-scan' | 'handshake-morph'

type Phase4PrototypeMeta = {
  id: Phase4PrototypeId
  code: string
  nameZh: string
  name: string
  blurb: string
}

export const PHASE4_PROTOTYPES: Phase4PrototypeMeta[] = [
  {
    id: 'vertex-scatter',
    code: '#02',
    nameZh: '頂點洪流成形',
    name: 'Vertex Scatter Mesh',
    blurb: '頂點從雲收斂為線框手 — Ch1 Mesh',
  },
  {
    id: 'lidar-scan',
    code: '#05',
    nameZh: '雷射掃描顯影',
    name: 'LiDAR Scan Reveal',
    blurb: '掃描線自下而上顯影 — 工程掃描感',
  },
  {
    id: 'handshake-morph',
    code: '#13',
    nameZh: '握手形變',
    name: 'Handshake Morph',
    blurb: '雙手由分離到交握 — Ch3 Signature',
  },
]

function SceneForId({ id, progress }: { id: Phase4PrototypeId; progress: number }) {
  switch (id) {
    case 'vertex-scatter':
      return <HandVertexScatterScene progress={progress} />
    case 'lidar-scan':
      return <HandLidarScanScene progress={progress} />
    case 'handshake-morph':
      return <HandHandshakeMorphScene progress={progress} />
  }
}

type Phase4LabPanelProps = {
  meta: Phase4PrototypeMeta
  sharedProgress: number | null
  onProgressChange?: (value: number) => void
}

export function Phase4LabPanel({ meta, sharedProgress, onProgressChange }: Phase4LabPanelProps) {
  const sliderId = useId()
  const reducedMotion = useReducedMotion()
  const [localProgress, setLocalProgress] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)

  const progress = sharedProgress ?? localProgress

  const setProgress = useCallback(
    (value: number) => {
      if (onProgressChange) {
        onProgressChange(value)
      } else {
        setLocalProgress(value)
      }
    },
    [onProgressChange],
  )

  useEffect(() => {
    if (reducedMotion || sharedProgress !== null) {
      setAutoPlay(false)
      return
    }
    if (!autoPlay) return

    let frame = 0
    let raf = 0
    const tick = () => {
      frame += 0.0055
      const wave = (Math.sin(frame) + 1) / 2
      setProgress(wave)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [autoPlay, reducedMotion, setProgress, sharedProgress])

  return (
    <article className="aw-lab-phase4-panel">
      <header className="aw-lab-phase4-panel-head">
        <span className="aw-lab-phase4-code">{meta.code}</span>
        <h3 className="aw-lab-phase4-name">{meta.nameZh}</h3>
        <p className="aw-lab-phase4-sub">{meta.name}</p>
      </header>

      <div className="aw-lab-phase4-canvas" aria-label={`${meta.nameZh} 預覽`}>
        {reducedMotion ? (
          <div className="aw-lab-phase4-fallback">
            <p className="aw-lab-phase4-fallback-tag">REDUCED MOTION</p>
            <p className="aw-lab-phase4-fallback-text">靜態線框手預覽 · {meta.nameZh}</p>
          </div>
        ) : (
          <Suspense fallback={<div className="aw-lab-phase4-fallback">載入 WebGL…</div>}>
            <SceneForId id={meta.id} progress={progress} />
          </Suspense>
        )}
      </div>

      <p className="aw-lab-phase4-blurb">{meta.blurb}</p>

      <label className="aw-lab-phase4-slider-wrap" htmlFor={sliderId}>
        <span className="aw-lab-phase4-slider-label">Progress</span>
        <input
          id={sliderId}
          type="range"
          min={0}
          max={100}
          value={Math.round(progress * 100)}
          className="aw-lab-phase4-slider"
          onChange={(e) => {
            setAutoPlay(false)
            setProgress(Number(e.target.value) / 100)
          }}
        />
        <span className="aw-lab-phase4-slider-value">{Math.round(progress * 100)}%</span>
      </label>
    </article>
  )
}
