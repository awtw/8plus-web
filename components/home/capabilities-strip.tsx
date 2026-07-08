'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import type { Icon } from '@phosphor-icons/react'

type Capability = {
  title: string
  description: string
  icon: Icon
}

type CapabilitiesStripProps = {
  items: Capability[]
  pricingEyebrow: string
  pricingName: string
  pricingDescription: string
  pricingHref: string
  pricingCta: string
}

export function CapabilitiesStrip({
  items,
  pricingEyebrow,
  pricingName,
  pricingDescription,
  pricingHref,
  pricingCta,
}: CapabilitiesStripProps) {
  return (
    <section className="home-band">
      <div className="section-shell">
        <div className="grid gap-3 lg:grid-cols-4">
          {items.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.title}
                className="faceid-panel h-full"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--lumina-glass-border)] bg-[color:var(--accent-soft)] text-[color:var(--accent)]">
                  <Icon className="h-4 w-4" weight="bold" />
                </div>
                <h3 className="mt-4 text-base font-semibold tracking-[-0.03em]">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-[color:var(--fg-2)]">{item.description}</p>
              </motion.div>
            )
          })}

          <motion.div
            className="faceid-panel faceid-panel-accent h-full flex flex-col justify-between"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-[color:var(--muted)]">{pricingEyebrow}</p>
              <h3 className="mt-2 text-base font-semibold">{pricingName}</h3>
              <p className="mt-2 text-sm leading-7 text-[color:var(--fg-2)]">{pricingDescription}</p>
            </div>
            <Link href={pricingHref} className="faceid-cta-secondary mt-5 inline-flex w-full justify-center">
              {pricingCta}
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
