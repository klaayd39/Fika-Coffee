import { Link } from 'react-router-dom'
import { brand } from '../../data/brand.js'

/* The supplied shop mark. The link name carries “home”; the image is the wordmark. */
export default function Logo({ className }) {
  return (
    <Link
      to="/"
      aria-label={`${brand.name} — home`}
      className={`inline-flex ${className ?? ''}`}
    >
      <picture>
        <source type="image/avif" srcSet="/images/brand/logo.avif" />
        <source type="image/webp" srcSet="/images/brand/logo.webp" />
        <img
          src="/images/brand/logo.png"
          alt=""
          width={550}
          height={260}
          fetchPriority="low"
          decoding="async"
          className="h-10 w-auto transition-opacity duration-300 ease-out hover:opacity-85 md:h-11"
        />
      </picture>
    </Link>
  )
}
