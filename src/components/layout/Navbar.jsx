import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, useLocation } from 'react-router-dom'
import { navItems } from '../../data/navigation.js'
import { preloadPage } from '../../routes.js'
import { cn } from '../../utils/cn.js'
import { getHomeSpyHash, isHomeHeroBehindNav } from '../../utils/homeSectionSpy.js'
import {
  navItemPreloadPath,
  navItemTo,
  navLinkIsActive,
  resolveHomeNavSpy,
} from '../../utils/navItems.js'
import Logo from './Logo.jsx'

const desktopLinkBase =
  'inline-flex h-10 items-center font-sans text-[0.9375rem] font-normal underline decoration-transparent underline-offset-[0.35em] transition-[color,text-decoration-color,text-shadow] duration-300 ease-out'

const desktopLinkDefault =
  `${desktopLinkBase} text-ink hover:text-espresso-950 hover:decoration-espresso-300/80 [&.active]:text-espresso-950 [&.active]:decoration-espresso-800/80`

const desktopLinkInverse =
  `${desktopLinkBase} text-cream-100 shadow-[0_1px_3px_rgb(27_20_19/0.65)] hover:text-cream-50 hover:decoration-cream-200/70 [&.active]:text-cream-50 [&.active]:decoration-cream-100/85 [&.active]:shadow-[0_1px_4px_rgb(27_20_19/0.75)]`

const mobileLinkClass =
  'tap-target flex min-h-12 items-center font-sans text-lg font-normal text-ink transition-colors duration-300 ease-out hover:text-espresso-950 [&.active]:font-medium [&.active]:text-espresso-950'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [homeSpyHash, setHomeSpyHash] = useState('')
  const [navOverHero, setNavOverHero] = useState(false)
  const location = useLocation()
  const buttonRef = useRef(null)
  const panelRef = useRef(null)

  useEffect(() => {
    let frame = 0

    const syncScroll = () => {
      setScrolled(window.scrollY > 8)
      if (location.pathname === '/') {
        setHomeSpyHash(getHomeSpyHash())
        setNavOverHero(isHomeHeroBehindNav())
      } else {
        setHomeSpyHash('')
        setNavOverHero(false)
      }
    }

    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(syncScroll)
    }

    syncScroll()
    const resyncTimers = [120, 400, 900].map((ms) => window.setTimeout(syncScroll, ms))
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      resyncTimers.forEach((id) => window.clearTimeout(id))
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [location.pathname, location.hash, location.key])

  const homeNavSpy = resolveHomeNavSpy(location, homeSpyHash)
  const onInverseBand = homeNavSpy === 'gallery'
  const navInverse = location.pathname === '/' && navOverHero && !onInverseBand && !open

  useEffect(() => {
    setOpen(false)
  }, [location.pathname, location.hash, location.key])

  useEffect(() => {
    if (!open) {
      document.documentElement.classList.remove('nav-scroll-lock')
      return
    }

    const scrollY = window.scrollY

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }
    const desktop = window.matchMedia('(min-width: 768px)')
    const onBreakpoint = (event) => {
      if (event.matches) setOpen(false)
    }

    window.addEventListener('keydown', onKeyDown)
    desktop.addEventListener('change', onBreakpoint)
    document.documentElement.classList.add('nav-scroll-lock')
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY}px`
    document.body.style.left = '0'
    document.body.style.right = '0'
    document.body.style.width = '100%'

    panelRef.current?.focus()

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      desktop.removeEventListener('change', onBreakpoint)
      document.documentElement.classList.remove('nav-scroll-lock')
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.left = ''
      document.body.style.right = ''
      document.body.style.width = ''
      window.scrollTo({ top: scrollY, left: 0, behavior: 'auto' })
    }
  }, [open])

  useEffect(() => {
    return () => {
      document.documentElement.classList.remove('nav-scroll-lock')
    }
  }, [])

  const chrome = scrolled || open || onInverseBand
  const menuOpenOnMobile = open

  const mobileMenu =
    menuOpenOnMobile && typeof document !== 'undefined'
      ? createPortal(
          <>
            <button
              type="button"
              tabIndex={-1}
              aria-hidden="true"
              className="site-header__backdrop md:hidden"
              onClick={() => setOpen(false)}
            />
            <div
              id="mobile-menu"
              ref={panelRef}
              tabIndex={-1}
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
              className="site-header__menu-panel md:hidden"
            >
              <nav
                aria-label="Mobile"
                className="content-shell site-header__menu-nav py-5 pb-[max(1.25rem,env(safe-area-inset-bottom,0px))]"
              >
                <ul className="flex flex-col gap-0.5">
                  {navItems.map((item) => (
                    <li key={item.label}>
                      <Link
                        to={navItemTo(item)}
                        aria-current={
                          navLinkIsActive(item, location, homeNavSpy) ? 'page' : undefined
                        }
                        onClick={() => setOpen(false)}
                        onPointerEnter={() => preloadPage(navItemPreloadPath(item))}
                        onFocus={() => preloadPage(navItemPreloadPath(item))}
                        className={cn(
                          mobileLinkClass,
                          navLinkIsActive(item, location, homeNavSpy) && 'active',
                        )}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </>,
          document.body,
        )
      : null

  return (
    <>
    <header
      className={cn(
        'site-header fixed inset-x-0 top-0 z-[60] pt-[env(safe-area-inset-top,0px)] transition-[background-color,border-color,backdrop-filter,box-shadow] duration-300 ease-out',
        menuOpenOnMobile &&
          'border-b border-line/80 bg-canvas shadow-[0_1px_0_rgb(27_20_19/0.04)] backdrop-blur-none',
        !menuOpenOnMobile &&
          navInverse &&
          'border-b border-cream-50/15 bg-espresso-950/55 shadow-[0_1px_0_rgb(0_0_0/0.25)] backdrop-blur-md supports-[backdrop-filter]:bg-espresso-950/48',
        !menuOpenOnMobile &&
          !navInverse &&
          (onInverseBand
            ? 'border-b border-line/80 bg-canvas shadow-[0_1px_0_rgb(27_20_19/0.04)]'
            : chrome
              ? 'border-b border-line/80 bg-canvas/95 backdrop-blur-md supports-[backdrop-filter]:bg-canvas/90'
              : 'border-b border-transparent bg-canvas/80 backdrop-blur-sm supports-[backdrop-filter]:bg-canvas/75'),
      )}
    >
      <a
        href="#main"
        className="sr-only rounded-md focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[70] focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-on-primary"
      >
        Skip to content
      </a>

      <nav aria-label="Primary" className="content-shell site-header__inner relative z-[1]">
        <Logo
          className="shrink-0"
          variant={navInverse && !menuOpenOnMobile ? 'inverse' : 'default'}
        />

        <ul className="site-header__links">
          {navItems.map((item) => (
            <li key={item.label}>
              <Link
                to={navItemTo(item)}
                aria-current={navLinkIsActive(item, location, homeNavSpy) ? 'page' : undefined}
                className={cn(
                  navInverse ? desktopLinkInverse : desktopLinkDefault,
                  navLinkIsActive(item, location, homeNavSpy) && 'active',
                )}
                onPointerEnter={() => preloadPage(navItemPreloadPath(item))}
                onFocus={() => preloadPage(navItemPreloadPath(item))}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          ref={buttonRef}
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
          className={cn(
            'site-header__menu-button tap-target relative z-[2] -mr-2 ml-auto inline-flex size-12 shrink-0 items-center justify-center transition-opacity duration-300 ease-out hover:opacity-70',
            navInverse && !menuOpenOnMobile
              ? 'text-cream-50 shadow-[0_1px_3px_rgb(27_20_19/0.65)]'
              : 'text-ink',
          )}
        >
          <span aria-hidden="true" className="relative block h-3.5 w-6">
            <span
              className={cn(
                'absolute left-0 h-px w-6 bg-current transition-[transform,opacity] duration-300 ease-out',
                open ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0',
              )}
            />
            <span
              className={cn(
                'absolute left-0 top-1/2 h-px w-6 -translate-y-1/2 bg-current transition-opacity duration-300 ease-out',
                open ? 'opacity-0' : 'opacity-100',
              )}
            />
            <span
              className={cn(
                'absolute left-0 h-px w-6 bg-current transition-[transform,opacity] duration-300 ease-out',
                open ? 'bottom-1/2 translate-y-1/2 -rotate-45' : 'bottom-0',
              )}
            />
          </span>
        </button>
      </nav>
    </header>
    {mobileMenu}
    </>
  )
}
