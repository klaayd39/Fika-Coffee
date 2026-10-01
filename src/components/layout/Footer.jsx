import { Link } from 'react-router-dom'
import { brand } from '../../data/brand.js'
import { addressLines } from '../../data/contact.js'
import { navItems } from '../../data/navigation.js'
import { navItemTo } from '../../utils/navItems.js'
import Logo from './Logo.jsx'

const year = new Date().getFullYear()

const footerLinkClass =
  'text-cream-200 transition-colors hover:text-cream-50 focus-visible:outline-offset-4'

export default function Footer() {
  return (
    <footer className="tone-inverse border-t border-espresso-800 bg-espresso-950 text-cream-100">
      <div className="content-shell py-10 md:py-12">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
          <div className="max-w-xs">
            <Logo className="[&_img]:h-8 [&_img]:md:h-9" />
            <p className="text-body mt-3 text-cream-200/90">{brand.tagline}</p>
          </div>

          <nav aria-label="Footer" className="sm:pt-1">
            <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link to={navItemTo(item)} className={footerLinkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-8 grid max-w-2xl gap-6 text-sm leading-snug text-cream-200 sm:grid-cols-2 sm:gap-x-10 md:mt-9">
          {addressLines ? (
            <div>
              <p className="text-eyebrow text-espresso-300">Address</p>
              <address className="mt-2 not-italic">
                {addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
            </div>
          ) : null}

          <div>
            <p className="text-eyebrow text-espresso-300">Opening hours</p>
            <ul className="mt-2 space-y-1">
              {brand.hours.map((row) => (
                <li key={row.days}>
                  <span className="text-cream-100">{row.days}</span>
                  <span className="text-cream-300">
                    {' '}
                    {row.opens} – {row.closes}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-1.5 text-xs text-cream-300">Monday — hours not published</p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-espresso-800/80 pt-6 text-xs text-espresso-300 sm:flex-row sm:items-center sm:justify-between">
          {brand.facebook ? (
            <a
              href={brand.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-sm ${footerLinkClass}`}
            >
              Facebook
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          ) : (
            <span />
          )}
          <p>
            © {year} {brand.name}
          </p>
        </div>
      </div>
    </footer>
  )
}
