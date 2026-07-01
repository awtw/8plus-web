'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { useReducedMotion } from '@/components/motion/use-reduced-motion'

type MotionRevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
}

const ease = [0.16, 1, 0.3, 1] as const

export function MotionReveal({
  children,
  delay = 0,
  y = 24,
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
      transition={{ duration: 0.55, delay, ease }}
    >
      {children}
    </motion.div>
  )
}
