export function navItemTo(item) {
  if (item.hash) return { pathname: '/', hash: `#${item.hash}` }
  return item.to
}

/** NavLink’s default matcher treats every `/#section` link as active on `/`. */
export function navLinkIsActive(item, location) {
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
