/** Instant scroll that ignores `scroll-behavior: smooth` on the document. */
export function scrollInstant(top) {
  const root = document.documentElement
  const previous = root.style.scrollBehavior
  root.style.scrollBehavior = 'auto'
  window.scrollTo(0, top)
  root.style.scrollBehavior = previous
}
