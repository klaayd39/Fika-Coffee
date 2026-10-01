import { useEffect, useState } from 'react'
import { cn } from '../../utils/cn.js'
import { openingHours } from '../../data/contact.js'
import { getOpenStatus } from '../../utils/openStatus.js'

const tones = {
  inverse: 'border-cream-50/30 bg-espresso-950/35 text-cream-50 backdrop-blur-sm',
  default: 'border-espresso-950/15 bg-transparent text-ink',
}

export default function OpenStatus({ tone = 'inverse', className }) {
  const [status, setStatus] = useState(() => getOpenStatus(openingHours))

  useEffect(() => {
    const id = window.setInterval(() => setStatus(getOpenStatus(openingHours)), 60_000)
    return () => window.clearInterval(id)
  }, [])

  if (!status) return null

  return (
    <p
      className={cn(
        'inline-flex items-center gap-2.5 rounded-full border px-4 py-2 text-sm',
        tones[tone] ?? tones.inverse,
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn('size-2 rounded-full bg-current', !status.isOpen && 'opacity-40')}
      />
      <span className="font-medium">{status.label}</span>
      {status.detail ? <span className="opacity-80">· {status.detail}</span> : null}
    </p>
  )
}