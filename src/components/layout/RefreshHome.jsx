import { useLayoutEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

function navigationIsReload() {
  const [entry] = performance.getEntriesByType('navigation')
  if (entry && 'type' in entry && entry.type === 'reload') return true
  const legacy = performance.navigation
  return legacy?.type === legacy?.TYPE_RELOAD
}

/** On browser refresh only, land on `/` (no hash or deep route). Runs once per load. */
export default function RefreshHome() {
  const navigate = useNavigate()
  const handledRef = useRef(false)

  useLayoutEffect(() => {
    if (handledRef.current) return
    handledRef.current = true

    if (!navigationIsReload()) return

    const { pathname, hash, search } = window.location
    if (pathname === '/' && !hash && !search) return

    navigate({ pathname: '/', hash: '', search: '' }, { replace: true })
  }, [navigate])
}
