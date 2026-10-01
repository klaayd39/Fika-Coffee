import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { navItems } from '../../data/navigation.js'
import { preloadPage } from '../../routes.js'
import { cn } from '../../utils/cn.js'
import { Button } from '../ui/index.js'
import Logo from './Logo.jsx'

const desktopLinkClass =
  'inline-flex h-10 items-center font-sans text-[0.9375rem] font-normal text-ink-soft underline decoration-transparent underline-offset-[0.35em] transition-[color,text-decoration-color] duration-300 ease-out hover:text-ink hover:decoration-espresso-300/80 [&.active]:text-ink [&.active]:decoration-espresso-800/70'

const mobileLinkClass =
  'tap-target flex min-h-12 items-center font-sans text-lg font-normal text-ink-soft transition-colors duration-300 ease-out hover:text-ink [&.active]:text-ink'

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
  }, [location.pathname])

  useEffect(() => {
    if (!open) return

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

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    panelRef.current?.querySelector('a, button')?.focus()

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      desktop.removeEventListener('change', onBreakpoint)
      document.body.style.overflow = previousOverflow
    }
  }, [open])

  const chrome = scrolled || open

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-[background-color,border-color] duration-300 ease-out',
        chrome ? 'border-b border-line/80 bg-canvas/95' : 'border-b border-transparent bg-canvas/80',
      )}
    >
      <a
        href="#main"
        className="sr-only rounded-md focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[60] focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-on-primary"
      >
        Skip to content
      </a>

      <nav
        aria-label="Primary"
        className="content-shell flex h-[4.75rem] items-center justify-between gap-8 md:h-20"
      >
        <Logo />

        <div className="hidden items-center gap-10 lg:gap-12 md:flex">
          <ul className="flex items-center gap-7 lg:gap-9">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.end}
                  className={desktopLinkClass}
                  onPointerEnter={() => preloadPage(item.to)}
                  onFocus={() => preloadPage(item.to)}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <Button
            as={Link}
            to="/contact#visit"
            variant="secondary"
            arrow
            onPointerEnter={() => preloadPage('/contact')}
            onFocus={() => preloadPage('/contact')}
          >
            Visit us
          </Button>
        </div>

        <button
          ref={buttonRef}
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
          className="tap-target inline-flex size-12 items-center justify-center text-ink transition-opacity duration-300 ease-out hover:opacity-70 md:hidden"
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

      <div
        id="mobile-menu"
        ref={panelRef}
        inert={!open}
        aria-hidden={!open}
        className={cn(
          'grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-out md:hidden',
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
        )}
      >
        <div className="min-h-0 overflow-hidden">
          <nav aria-label="Mobile" className="border-t border-line/80 px-gutter py-6">
            <ul className="flex flex-col gap-1">
              {[navItems.find((item) => item.to === '/menu'), ...navItems.filter((item) => item.to !== '/menu')]
                .filter(Boolean)
                .map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.end}
                    onClick={() => setOpen(false)}
                    onPointerEnter={() => preloadPage(item.to)}
                    onFocus={() => preloadPage(item.to)}
                    className={cn(mobileLinkClass, item.to === '/menu' && 'text-ink')}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
              <li className="pt-4">
                <Button
                  as={Link}
                  to="/contact#visit"
                  variant="secondary"
                  arrow
                  className="tap-target"
                  onClick={() => setOpen(false)}
                  onPointerEnter={() => preloadPage('/contact')}
                  onFocus={() => preloadPage('/contact')}
                >
                  Visit us
                </Button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}
