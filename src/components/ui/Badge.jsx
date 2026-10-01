import { cn } from '../../utils/cn.js'

const variants = {
  lilac: 'text-lilac-700',
  cerise: 'text-blush-700',
  matcha: 'text-matcha-700',
  lamp: 'text-lamp-700',
  espresso: 'text-ink',
  outline: 'text-ink-soft',
}

export default function Badge({ variant = 'lilac', className, ...props }) {
  return (
    <span
      className={cn(
        'text-label inline-flex items-center gap-1.5 text-2xs',
        variants[variant],
        className,
      )}
      {...props}
    />
  )
}
