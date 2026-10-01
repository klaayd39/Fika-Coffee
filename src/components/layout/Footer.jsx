import { Link } from 'react-router-dom'
import { brand } from '../../data/brand.js'
import { addressLines } from '../../data/contact.js'
import { navItems } from '../../data/navigation.js'
import Logo from './Logo.jsx'

const year = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="tone-inverse border-t border-espresso-800 bg-espresso-950 text-cream-100">
      <div className="content-shell py-16 md:py-20">
        <div className="max-w-xl">
          <Logo />
          <p className="text-display-md mt-6 leading-snug text-cream-50">{brand.tagline}</p>
          <p className="text-body mt-3 text-cream-200/90">
            {brand.name} — a café on {brand.address.street}, {brand.address.city}.
          </p>
        </div>

        <nav aria-label="Footer" className="mt-12">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {navItems.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="text-cream-200 transition-colors hover:text-cream-50 focus-visible:outline-offset-4"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-10 max-w-xl space-y-10 text-sm leading-relaxed text-cream-200">
          {addressLines ? (
            <div>
              <p className="text-eyebrow text-espresso-300">Address</p>
              <address className="mt-3 not-italic">
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
            <ul className="mt-3 space-y-1.5">
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
            <p className="mt-2 text-cream-300">Monday — hours not published</p>
          </div>
        </div>

        {brand.facebook ? (
          <p className="mt-10 text-sm">
            <a
              href={brand.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cream-200 transition-colors hover:text-cream-50 focus-visible:outline-offset-4"
            >
              Facebook
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </p>
        ) : null}

        <p className="mt-12 text-xs text-espresso-300">
          © {year} {brand.name}
        </p>
      </div>
    </footer>
  )
}
