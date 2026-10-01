import { cn } from '../../utils/cn.js'

export function Eyebrow({ className, ...props }) {
  return <p className={cn('text-eyebrow', className)} {...props} />
}

const displaySize = {
  page: 'text-page-title',
  xl: 'text-display-xl',
  lg: 'text-display-lg',
  md: 'text-display-md',
}

export function DisplayTitle({ as: Tag = 'h2', size = 'lg', className, ...props }) {
  return <Tag className={cn(displaySize[size] ?? displaySize.lg, className)} {...props} />
}

export function BodyText({ as: Tag = 'p', large = false, className, ...props }) {
  return <Tag className={cn(large ? 'text-body-lg' : 'text-body', className)} {...props} />
}
