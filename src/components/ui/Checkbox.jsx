import { cn } from '../../utils/cn.js'

export default function Checkbox({ label, className, ...props }) {
  return (
    <label className={cn('flex cursor-pointer items-center gap-3 text-sm text-ink-soft', className)}>
      <input
        type="checkbox"
        className="size-5 shrink-0 appearance-none rounded-xs border border-line-strong bg-surface transition-colors duration-150 checked:border-primary checked:bg-primary focus-visible:ring-2 focus-visible:ring-espresso-100"
        {...props}
      />
      {label}
    </label>
  )
}
