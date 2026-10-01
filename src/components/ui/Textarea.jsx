import { cn } from '../../utils/cn.js'
import { controlClasses } from './Input.jsx'

export default function Textarea({ invalid = false, rows = 4, className, ...props }) {
  return (
    <textarea
      rows={rows}
      aria-invalid={invalid || undefined}
      className={cn(controlClasses(invalid), 'resize-y px-4 py-3 text-sm', className)}
      {...props}
    />
  )
}
