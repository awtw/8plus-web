'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { useReducedMotion } from '@/components/motion/use-reduced-motion'
import { MOTION } from '@/lib/motion/tokens'

type MotionRevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
}

export function MotionReveal({
  children,
  delay = 0,
  y = MOTION.distance,
  className,
}: MotionRevealProps) {
  const reduced = useReducedMotion()

  if (reduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{ duration: MOTION.duration.slow, delay, ease: MOTION.ease.out }}
    >
      {children}
    </motion.div>
  )
}
