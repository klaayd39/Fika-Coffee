import { cn } from '../../utils/cn.js'
import { Eyebrow } from './Type.jsx'

const variants = {
  surface: 'bg-surface border border-line shadow-sm',
  raised: 'bg-surface border border-line shadow-md',
  sunken: 'bg-surface-sunken border border-line',
  blush: 'bg-surface-blush border border-line',
  inverse: 'tone-inverse bg-espresso-900 border border-line text-ink',
  outline: 'border border-line-strong',
  /* Thick white frame from the polaroid collages. */
  polaroid: 'bg-white border border-cream-300 shadow-md p-3 pb-10',
}

const paddings = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
}

const radii = {
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
  arch: 'rounded-arch',
}

export default function Card({
  as: Tag = 'div',
  variant = 'surface',
  padding = 'md',
  radius = 'lg',
  className,
  ...props
}) {
  return (
    <Tag
      className={cn(
        'relative',
        variants[variant],
        variant === 'polaroid' ? '' : paddings[padding],
        radii[radius],
        className,
      )}
      {...props}
    />
  )
}

/** @deprecated Prefer `Eyebrow` on public pages — cards are for /design-system only. */
export function CardEyebrow(props) {
  return <Eyebrow {...props} />
}

export function CardTitle({ as: Tag = 'h3', className, ...props }) {
  return <Tag className={cn('font-display text-xl text-ink', className)} {...props} />
}

export function CardText({ className, ...props }) {
  return <p className={cn('text-sm text-ink-soft', className)} {...props} />
}

export function CardFooter({ className, ...props }) {
  return (
    <div className={cn('mt-6 flex items-center gap-3 border-t border-line pt-4', className)} {...props} />
  )
}
