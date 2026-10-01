import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '../../utils/cn.js'
import { openingHours } from '../../data/contact.js'
import { getOpenStatus } from '../../utils/openStatus.js'

const shellBase =
  'tap-target open-status inline-flex w-full min-h-12 min-w-0 items-center gap-3 rounded-full border px-4 py-2 text-left transition-[border-color,background-color,box-shadow,transform] duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream-50 active:scale-[0.99]'

function toneClass(isOpen, tone) {
  if (tone === 'default') {
    return isOpen
      ? 'border-emerald-800/25 bg-emerald-50/90 text-ink hover:border-emerald-800/35'
      : 'border-espresso-950/12 bg-espresso-50/90 text-ink hover:border-espresso-950/22'
  }

  return isOpen
    ? 'border-emerald-200/35 bg-espresso-950/50 text-cream-50 shadow-[inset_0_1px_0_rgb(255_255_255/0.08),0_8px_24px_-16px_rgb(0_0_0/0.45)] backdrop-blur-md hover:border-emerald-200/50 hover:bg-espresso-950/58'
    : 'border-cream-50/22 bg-espresso-950/48 text-cream-50 shadow-[inset_0_1px_0_rgb(255_255_255/0.06)] backdrop-blur-md hover:border-cream-50/38 hover:bg-espresso-950/56'
}

export default function OpenStatus({ tone = 'inverse', className, linkToHours = true }) {
  const [status, setStatus] = useState(() => getOpenStatus(openingHours))

  useEffect(() => {
    const sync = () => setStatus(getOpenStatus(openingHours))
    sync()
    const id = window.setInterval(sync, 60_000)
    const onVisible = () => {
      if (document.visibilityState === 'visible') sync()
    }
    document.addEventListener('visibilitychange', onVisible)
    return () => {
      window.clearInterval(id)
      document.removeEventListener('visibilitychange', onVisible)
    }
  }, [])

  if (!status) return null

  const label = [status.label, status.detail].filter(Boolean).join('. ')
  const classNames = cn(shellBase, toneClass(status.isOpen, tone), className)
  const isInverse = tone === 'inverse' || tone !== 'default'
  const eyebrowClass = isInverse ? 'text-cream-100/55' : 'text-ink-muted'
  const detailClass = isInverse ? 'text-cream-100/80' : 'text-ink-soft'
  const body = (
    <>
      <span
        aria-hidden="true"
        className={cn(
          'relative flex size-[1.625rem] shrink-0 items-center justify-center rounded-full border',
          status.isOpen
            ? 'open-status-dot--live border-emerald-200/40 bg-emerald-400/25'
            : 'border-cream-100/20 bg-espresso-900/50',
        )}
      >
        <span
          className={cn(
            'size-2 rounded-full',
            status.isOpen ? 'bg-emerald-300' : 'bg-cream-200/50',
          )}
        />
      </span>

      <span className="min-w-0 flex-1">
        <span className={cn('text-2xs block font-medium uppercase tracking-[0.14em]', eyebrowClass)}>
          Hours
        </span>
        <span className="mt-0.5 block text-pretty leading-snug">
          <span className="font-medium tracking-[0.01em]">{status.label}</span>
          {status.detail ? (
            <span
              className={cn(
                'mt-0.5 block text-[0.8125rem] font-normal sm:text-sm',
                detailClass,
              )}
            >
              {status.detail}
            </span>
          ) : null}
        </span>
      </span>

    </>
  )

  if (linkToHours) {
    return (
      <Link
        to={{ pathname: '/', hash: 'contact' }}
        className={classNames}
        data-state={status.isOpen ? 'open' : 'closed'}
        aria-label={`${label}. View hours and location`}
      >
        {body}
      </Link>
    )
  }

  return (
    <p
      role="status"
      aria-live="polite"
      className={classNames}
      data-state={status.isOpen ? 'open' : 'closed'}
      aria-label={label}
    >
      {body}
    </p>
  )
}
