/** Section ids on the homepage, in document order (top → bottom). */
export const HOME_SECTION_IDS = ['gallery', 'about', 'contact']

const HOME_TOP_THRESHOLD_PX = 56
const MARKER_BELOW_HEADER_PX = 32

function headerHeightPx() {
  const probe = document.createElement('div')
  probe.style.position = 'absolute'
  probe.style.visibility = 'hidden'
  probe.style.pointerEvents = 'none'
  probe.style.height = 'var(--header-height)'
  document.documentElement.append(probe)
  const height = probe.getBoundingClientRect().height
  probe.remove()
  return height
}

/** Viewport Y (px) used as the “current section” line, just under the fixed header. */
export function homeSpyMarkerLine() {
  return headerHeightPx() + MARKER_BELOW_HEADER_PX
}

/** True while the hero image still fills the fixed header strip (not favorites/light bands). */
export function isHomeHeroBehindNav() {
  if (typeof window === 'undefined') return false

  const hero = document.querySelector('.hero-bleed')
  if (!hero) return false

  const navBottom = headerHeightPx()
  const { top, bottom } = hero.getBoundingClientRect()
  // Require the hero to extend through most of the nav height — avoids cream links on cream bands.
  return top < navBottom * 0.35 && bottom > navBottom * 0.72
}

export function getHomeSpyHash() {
  if (typeof window === 'undefined') return ''

  if (window.scrollY < HOME_TOP_THRESHOLD_PX) return ''

  const line = homeSpyMarkerLine()
  let current = ''

  for (const id of HOME_SECTION_IDS) {
    const el = document.getElementById(id)
    if (!el) continue
    const top = el.getBoundingClientRect().top
    // Use the section’s layout top only — scroll-margin is for scrollIntoView, not spy.
    if (top <= line) current = id
  }

  return current
}
