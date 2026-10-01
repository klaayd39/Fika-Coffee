import { cn } from '../../utils/cn.js'
import { hoverArrow, hoverLinkUnderline, hoverTextCta } from '../../utils/motion.js'

const base =
  'inline-flex items-center justify-center gap-1.5 font-sans whitespace-nowrap disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-espresso-800'

const variants = {
  primary:
    'text-label rounded-sm border border-transparent bg-primary text-on-primary hover:bg-primary-hover',
  secondary: cn(
    'text-label tap-target inline-flex min-h-11 items-center rounded-none px-1 text-ink-muted hover:text-ink',
    hoverTextCta,
  ),
  secondaryInverse: cn(
    'text-label tap-target inline-flex min-h-11 items-center rounded-none px-1 text-cream-200/90 hover:text-cream-50',
    hoverTextCta,
  ),
  outline:
    'text-label rounded-sm border border-espresso-800/90 bg-transparent text-ink hover:bg-espresso-800 hover:text-cream-50',
  outlineInverse:
    'text-label rounded-sm border border-cream-100/50 bg-transparent text-cream-50 hover:border-cream-50 hover:bg-cream-50 hover:text-espresso-900',
  accent:
    'text-label rounded-sm border border-transparent bg-accent text-on-accent hover:bg-accent-hover',
  ghost:
    'rounded-sm px-2 py-1 text-sm font-normal text-ink-soft hover:text-ink',
  inverse:
    'text-label rounded-sm border border-transparent bg-cream-50 text-espresso-900 hover:bg-cream-200',
  link: cn('h-auto rounded-none px-0 font-medium text-ink', hoverLinkUnderline),
  text: 'tap-target inline-flex min-h-11 items-center rounded-none border-b border-transparent px-1 pb-1 font-normal text-ink-muted hover:border-espresso-800 hover:text-ink',
  textActive:
    'tap-target inline-flex min-h-11 items-center rounded-none border-b border-espresso-800 px-1 pb-1 font-normal text-ink',
}

const sizes = {
  sm: 'h-9 px-4 text-2xs',
  md: 'h-10 px-5 text-xs',
  lg: 'h-10 px-6 text-xs',
  icon: 'size-10 rounded-sm',
}

const plainVariants = new Set([
  'secondary',
  'secondaryInverse',
  'link',
  'text',
  'textActive',
])

export default function Button({
  as: Tag = 'button',
  variant = 'primary',
  size = 'md',
  pill = false,
  arrow = false,
  className,
  children,
  ...props
}) {
  const isNativeButton = Tag === 'button'
  const plain = plainVariants.has(variant)

  return (
    <Tag
      type={isNativeButton ? (props.type ?? 'button') : props.type}
      className={cn(
        base,
        variants[variant],
        plain ? 'h-auto py-0' : sizes[size],
        pill && !plain && 'rounded-full',
        arrow && 'group',
        className,
      )}
      {...props}
    >
      {children}
      {arrow ? (
        <span aria-hidden="true" className={hoverArrow}>
          →
        </span>
      ) : null}
    </Tag>
  )
}
