import { ArrowUpRight } from '@phosphor-icons/react'
import { getLineAddFriendUrl, getLineBasicId } from '@/lib/line'

type Props = {
  label: string
  lead: string
  lineAction: string
}

export function BookingChannels({ label, lead, lineAction }: Props) {
  const channels = [
    { key: 'LINE', value: getLineBasicId(), action: lineAction, href: getLineAddFriendUrl(), external: true },
  ]
  return (
    <div className="booking-channels">
      <p className="scroll-eyebrow">{label}</p>
      <p className="booking-channels-lead">{lead}</p>
      <ul className="booking-channel-list">
        {channels.map((c) => (
          <li key={c.key}>
            <a
              className="booking-channel"
              href={c.href}
              {...(c.external ? { target: '_blank', rel: 'noreferrer' } : {})}
              aria-label={`${c.action}: ${c.value}`}
            >
              <span className="booking-channel-key">{c.key}</span>
              <span className="booking-channel-value">{c.value}</span>
              <span className="booking-channel-action">
                {c.action}
                <ArrowUpRight className="h-4 w-4" weight="bold" />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
