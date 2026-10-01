import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function scrollToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0
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
    document.documentElement.classList.remove('nav-scroll-lock')

    if (!hash) {
      scrollToTop()
      return
    }

    if (scrollToHashTarget(hash)) return

    const frame = requestAnimationFrame(() => {
      if (!scrollToHashTarget(hash)) scrollToTop()
    })

    return () => cancelAnimationFrame(frame)
  }, [pathname, hash])

  return null
}
