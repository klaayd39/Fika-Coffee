import { useLayoutEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function navigationIsReload() {
  const [entry] = performance.getEntriesByType('navigation')
  if (entry && 'type' in entry && entry.type === 'reload') return true
  const legacy = performance.navigation
  return legacy?.type === legacy?.TYPE_RELOAD
}

/** On browser refresh, always land on the homepage (no hash or deep route). */
export default function RefreshHome() {
  const navigate = useNavigate()
  const { pathname, hash, search } = useLocation()

  useLayoutEffect(() => {
    if (!navigationIsReload()) return
    if (pathname === '/' && !hash && !search) return
    navigate({ pathname: '/', hash: '', search: '' }, { replace: true })
  }, [navigate, pathname, hash, search])
}
