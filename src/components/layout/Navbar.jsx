import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { navItems } from '../../data/navigation.js'
import { preloadPage } from '../../routes.js'
import { cn } from '../../utils/cn.js'
import { navItemPreloadPath, navItemTo, navLinkIsActive } from '../../utils/navItems.js'
import Logo from './Logo.jsx'

const desktopLinkClass =
  'inline-flex h-10 items-center font-sans text-[0.9375rem] font-normal text-ink-soft underline decoration-transparent underline-offset-[0.35em] transition-[color,text-decoration-color] duration-300 ease-out hover:text-ink hover:decoration-espresso-300/80 [&.active]:text-ink [&.active]:decoration-espresso-800/70'

const mobileLinkClass =
  'tap-target flex min-h-12 items-center font-sans text-lg font-normal text-ink-soft transition-colors duration-300 ease-out hover:text-ink [&.active]:text-ink'

const headerOffset = 'calc(4.75rem + env(safe-area-inset-top, 0px))'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const buttonRef = useRef(null)
  const panelRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname, location.hash, location.key])

  useEffect(() => {
    if (!open) {
      document.documentElement.classList.remove('nav-scroll-lock')
      return
    }

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

    panelRef.current?.focus()

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      desktop.removeEventListener('change', onBreakpoint)
      document.documentElement.classList.remove('nav-scroll-lock')
    }
  }, [open])

  useEffect(() => {
    return () => {
      document.documentElement.classList.remove('nav-scroll-lock')
    }
  }, [])

  const chrome = scrolled || open

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-[60] pt-[env(safe-area-inset-top,0px)] transition-[background-color,border-color,backdrop-filter] duration-300 ease-out',
        chrome
          ? 'border-b border-line/80 bg-canvas/95 backdrop-blur-md supports-[backdrop-filter]:bg-canvas/90'
          : 'border-b border-transparent bg-canvas/80 backdrop-blur-sm supports-[backdrop-filter]:bg-canvas/75',
      )}
    >
      <a
        href="#main"
        className="sr-only rounded-md focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[70] focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-on-primary"
      >
        Skip to content
      </a>

      <nav
        aria-label="Primary"
        className="content-shell relative flex h-[4.75rem] w-full min-w-0 items-center gap-3 md:h-20 md:gap-8"
      >
        <Logo className="shrink-0" />

        <ul className="hidden items-center gap-7 md:ml-auto md:flex lg:gap-9">
          {navItems.map((item) => (
            <li key={item.label}>
              <Link
                to={navItemTo(item)}
                aria-current={navLinkIsActive(item, location) ? 'page' : undefined}
                className={cn(desktopLinkClass, navLinkIsActive(item, location) && 'active')}
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
          className="tap-target -mr-2 ml-auto inline-flex size-12 shrink-0 items-center justify-center text-ink transition-opacity duration-300 ease-out hover:opacity-70 md:hidden"
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

      {open ? (
        <>
          <button
            type="button"
            tabIndex={-1}
            aria-hidden="true"
            className="fixed inset-0 z-[55] bg-espresso-950/25 md:hidden"
            style={{ top: headerOffset }}
            onClick={() => setOpen(false)}
          />
          <div
            id="mobile-menu"
            ref={panelRef}
            tabIndex={-1}
            className="fixed inset-x-0 z-[58] max-h-[calc(100dvh-4.75rem-env(safe-area-inset-top,0px))] overflow-y-auto overscroll-contain border-b border-line/80 bg-canvas shadow-[0_18px_40px_-24px_rgb(27_20_19/0.35)] md:hidden"
            style={{ top: headerOffset }}
          >
            <nav
              aria-label="Mobile"
              className="content-shell py-6 pb-[max(1.5rem,env(safe-area-inset-bottom,0px))]"
            >
              <ul className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={navItemTo(item)}
                      aria-current={navLinkIsActive(item, location) ? 'page' : undefined}
                      onClick={() => setOpen(false)}
                      onPointerEnter={() => preloadPage(navItemPreloadPath(item))}
                      onFocus={() => preloadPage(navItemPreloadPath(item))}
                      className={cn(
                        mobileLinkClass,
                        navLinkIsActive(item, location) && 'active',
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </>
      ) : null}
    </header>
  )
}
