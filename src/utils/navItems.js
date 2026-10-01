export function navItemTo(item) {
  if (item.hash) return { pathname: '/', hash: `#${item.hash}` }
  return item.to
}

export function navItemIsActive(item, location) {
  if (item.hash) {
    return location.pathname === '/' && location.hash === `#${item.hash}`
  }
  if (item.exactHome) {
    return location.pathname === '/' && !location.hash
  }
  return null
}

export function navItemPreloadPath(item) {
  if (item.hash) return '/'
  return item.to
}
