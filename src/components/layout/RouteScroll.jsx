import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function scrollToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0
}

function unlockBodyScrollLock() {
  document.documentElement.classList.remove('nav-scroll-lock')
  document.body.style.position = ''
  document.body.style.top = ''
  document.body.style.left = ''
  document.body.style.right = ''
  document.body.style.width = ''
}

function scrollToHashTarget(hash) {
  const id = decodeURIComponent(hash.slice(1))
  const target = document.getElementById(id)
  if (!target) return false

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })
  return true
}

/** Scroll to top on route change; hash links scroll to in-page targets after paint. */
export default function RouteScroll() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    unlockBodyScrollLock()

    if (!hash) {
      scrollToTop()
      return
    }

    let cancelled = false
    const attempt = () => {
      if (cancelled) return
      scrollToHashTarget(hash)
    }

    attempt()
    const frame = requestAnimationFrame(attempt)
    const timers = [50, 150, 400].map((ms) => window.setTimeout(attempt, ms))

    return () => {
      cancelled = true
      cancelAnimationFrame(frame)
      timers.forEach((id) => window.clearTimeout(id))
    }
  }, [pathname, hash])

  return null
}
