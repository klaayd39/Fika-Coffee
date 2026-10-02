/** Scroll position while the mobile menu has `body { position: fixed }` locked. */
export function getEffectiveScrollY() {
  if (typeof window === 'undefined') return 0
  const { position, top } = document.body.style
  if (position === 'fixed' && top) {
    const locked = -Number.parseFloat(top)
    if (Number.isFinite(locked) && locked >= 0) return locked
  }
  return window.scrollY
}

/** Instant scroll that ignores `scroll-behavior: smooth` on the document. */
export function scrollInstant(top) {
  const root = document.documentElement
  const previous = root.style.scrollBehavior
  root.style.scrollBehavior = 'auto'
  window.scrollTo(0, top)
  root.style.scrollBehavior = previous
}
