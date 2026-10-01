import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/* React Router does not always scroll to hash targets; html scroll-behavior handles motion. */
export default function ScrollToHash() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) return

    const id = decodeURIComponent(hash.slice(1))
    const target = document.getElementById(id)
    if (!target) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })
  }, [pathname, hash])

  return null
}
