import { HOME_SECTION_IDS } from './homeSectionSpy.js'

export function navItemTo(item) {
  if (item.hash) return { pathname: '/', hash: `#${item.hash}` }
  return item.to
}

/** Scroll spy state, with URL hash fallback for in-page section links. */
export function resolveHomeNavSpy(location, homeSpyHash) {
  if (location.pathname !== '/') return null
  if (homeSpyHash) return homeSpyHash
  if (typeof window !== 'undefined' && window.scrollY < 56) return ''
  const id = location.hash ? decodeURIComponent(location.hash.slice(1)) : ''
  return HOME_SECTION_IDS.includes(id) ? id : ''
}

/** NavLink’s default matcher treats every `/#section` link as active on `/`. */
export function navLinkIsActive(item, location, homeSpyHash = null) {
  if (location.pathname === '/' && homeSpyHash !== null) {
    if (item.exactHome) return homeSpyHash === ''
    if (item.hash) return homeSpyHash === item.hash
    return false
  }
  return Boolean(navItemIsActive(item, location))
}

export function navItemIsActive(item, location) {
  if (item.hash === 'about') {
    return (
      (location.pathname === '/' && location.hash === `#${item.hash}`) ||
      location.pathname === '/about'
    )
  }
  if (item.hash === 'gallery') {
    return (
      (location.pathname === '/' && location.hash === `#${item.hash}`) ||
      location.pathname === '/gallery'
    )
  }
  if (item.hash === 'contact') {
    return (
      (location.pathname === '/' && location.hash === `#${item.hash}`) ||
      location.pathname === '/contact'
    )
  }
  if (item.hash) {
    return location.pathname === '/' && location.hash === `#${item.hash}`
  }
  if (item.exactHome) {
    return location.pathname === '/' && !location.hash
  }
  return null
}

export function navItemPreloadPath(item) {
  if (item.hash === 'gallery') return '/gallery'
  if (item.hash === 'about') return '/about'
  if (item.hash) return '/'
  return item.to
}
