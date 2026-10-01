import { Link } from 'react-router-dom'
import { brand } from '../../data/brand.js'
import { cn } from '../../utils/cn.js'

const LOGO_BOXED = {
  avif: '/images/brand/logo.avif',
  webp: '/images/brand/logo.webp',
  png: '/images/brand/logo.png',
}

const LOGO_CLEAR = {
  avif: '/images/brand/logo-transparent.avif',
  webp: '/images/brand/logo-transparent.webp',
  png: '/images/brand/logo-transparent.png',
}

/* Boxed mark on light chrome; transparent lilac on dark hero nav. */
export default function Logo({ className, variant = 'default' }) {
  const inverse = variant === 'inverse'
  const sources = inverse ? LOGO_CLEAR : LOGO_BOXED

  return (
    <Link
      to="/"
      aria-label={`${brand.name} — home`}
      className={cn(
        'site-logo tap-target inline-flex items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-transparent',
        inverse ? 'site-logo--inverse' : 'site-logo--boxed',
        className,
      )}
    >
      <picture className="block leading-none">
        <source type="image/avif" srcSet={sources.avif} />
        <source type="image/webp" srcSet={sources.webp} />
        <img
          src={sources.png}
          alt=""
          width={550}
          height={260}
          fetchPriority="low"
          decoding="async"
          className="site-logo__img"
        />
      </picture>
    </Link>
  )
}
