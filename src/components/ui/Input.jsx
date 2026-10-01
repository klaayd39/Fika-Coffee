import { cn } from '../../utils/cn.js'

/* Border and ring colours are kept out of the base so the invalid state
   replaces them instead of relying on stylesheet order. */
export const controlBase =
  'w-full border rounded-md bg-surface text-ink placeholder:text-ink-muted transition-[border-color,box-shadow] duration-200 focus:outline-none disabled:bg-surface-sunken disabled:text-ink-subtle'

export const controlRest =
  'border-line-strong hover:border-espresso-300 focus:border-espresso-500 focus:ring-2 focus:ring-espresso-100'

export const controlInvalid = 'border-danger focus:ring-2 focus:ring-danger-soft'

export function controlClasses(invalid) {
  return cn(controlBase, invalid ? controlInvalid : controlRest)
}

export default function Input({ invalid = false, className, ...props }) {
  return (
    <input
      aria-invalid={invalid || undefined}
      className={cn(controlClasses(invalid), 'h-11 px-4 text-sm', className)}
      {...props}
    />
  )
}
