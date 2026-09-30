import { ArrowUpRight } from '@phosphor-icons/react'

const GITHUB_URL = 'https://github.com/awtw'

type Props = {
  label: string
  lead: string
  action: string
}

/**
 * Deliberately minimal: the site's primary conversion is the Cal.com calendar.
 * No email / LINE here on purpose (see docs/SHARE_HUBS.md). GitHub only.
 */
export function BookingChannels({ label, lead, action }: Props) {
  return (
    <div className="booking-channels">
      <p className="scroll-eyebrow">{label}</p>
      <p className="booking-channels-lead">{lead}</p>
      <a
        className="booking-channel"
        href={GITHUB_URL}
        target="_blank"
        rel="noreferrer"
        aria-label={`${action}: github.com/awtw`}
      >
        <span className="booking-channel-key">GITHUB</span>
        <span className="booking-channel-value">github.com/awtw</span>
        <span className="booking-channel-action">
          {action}
          <ArrowUpRight className="h-4 w-4" weight="bold" />
        </span>
      </a>
    </div>
  )
}
