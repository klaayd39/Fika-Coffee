import { cn } from '../../utils/cn.js'
import { controlClasses } from './Input.jsx'

export default function Select({ invalid = false, className, children, ...props }) {
  return (
    <div className="relative">
      <select
        aria-invalid={invalid || undefined}
        className={cn(controlClasses(invalid), 'h-11 appearance-none pr-11 pl-4 text-sm', className)}
        {...props}
      >
        {children}
      </select>
      <svg
        aria-hidden="true"
        viewBox="0 0 12 8"
        className="pointer-events-none absolute top-1/2 right-4 w-3 -translate-y-1/2 text-ink-muted"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      >
        <path d="M1 1.5 6 6.5l5-5" />
      </svg>
    </div>
  )
}
