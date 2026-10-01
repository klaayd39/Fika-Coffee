import { useId } from 'react'
import { cn } from '../../utils/cn.js'

/* Clones its single input child so label, hint and error stay wired to one id. */
export default function Field({ label, hint, error, required = false, className, children }) {
  const id = useId()
  const hintId = `${id}-hint`
  const errorId = `${id}-error`
  const describedBy = cn(hint && hintId, error && errorId) || undefined

  const control =
    typeof children === 'function'
      ? children({ id, describedBy, invalid: Boolean(error) })
      : children

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {label && (
        <label htmlFor={id} className="text-label text-xs text-ink-soft">
          {label}
          {required && <span className="ml-1 text-ink-muted">*</span>}
        </label>
      )}

      {control}

      {hint && !error && (
        <p id={hintId} className="text-sm text-ink-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  )
}
