import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { scrollInstant } from '../../utils/scroll.js'

function unlockBodyScrollLock() {
  document.documentElement.classList.remove('nav-scroll-lock')
  const { style } = document.body
  style.position = ''
  style.top = ''
  style.left = ''
  style.right = ''
  style.width = ''
}

function hashId(hash) {
  return decodeURIComponent(hash.slice(1))
}

function headerOffset() {
  const header = document.querySelector('.site-header')
  return header ? header.getBoundingClientRect().height : 0
}

function scrollToHash(hash, behavior) {
  const target = document.getElementById(hashId(hash))
  if (!target) return false
  // One offset only. scroll-margin and scroll-padding would stack inside scrollIntoView.
  const top = Math.max(0, target.getBoundingClientRect().top + window.scrollY - headerOffset())
  if (behavior === 'auto') scrollInstant(top)
  else window.scrollTo({ top, left: 0, behavior: 'smooth' })
  return true
}

/** Jump to the top on a new page. Smooth-scroll once to in-page hash targets. */
export default function RouteScroll() {
  const { pathname, hash, key } = useLocation()

  useEffect(() => {
    unlockBodyScrollLock()

    let cancelled = false
    let started = false
    const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'

    const start = () => {
      if (cancelled || started) return
      if (!hash) {
        scrollInstant(0)
        started = true
        return
      }
      if (scrollToHash(hash, behavior)) started = true
    }

    // Wait until menu scroll-lock cleanup has restored the real scroll position.
    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(start)
    })
    const retries = [80, 200, 500].map((ms) => window.setTimeout(start, ms))

    return () => {
      cancelled = true
      cancelAnimationFrame(frame)
      retries.forEach((id) => window.clearTimeout(id))
    }
  }, [pathname, hash, key])

  return null
}
