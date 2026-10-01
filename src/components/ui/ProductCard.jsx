import { Link } from 'react-router-dom'
import { cn } from '../../utils/cn.js'
import { formatPrice } from '../../data/products.js'
import { coverImageClass, cropAspect, objectPositionStyle } from '../../utils/imageCrop.js'
import { BodyText, DisplayTitle } from './Type.jsx'
import { hoverArrow, hoverTextCta } from '../../utils/motion.js'

const IMAGE_SIZES = '(min-width: 1024px) 30vw, (min-width: 640px) 45vw, calc(100vw - 3rem)'

export function ProductMenuLink({ to = '/menu', className }) {
  return (
    <Link
      to={to}
      className={cn(
        'group text-action tap-target inline-flex min-h-11 items-center text-ink-muted focus-visible:outline-offset-4',
        hoverTextCta,
        className,
      )}
    >
      View menu{' '}
      <span aria-hidden="true" className={hoverArrow}>
        →
      </span>
    </Link>
  )
}

function ProductImage({ product, sizes, linked, to }) {
  const aspectClass =
    cropAspect[product.image?.cropAspect] ?? cropAspect.productPortrait

  const frame = (
    <div className={cn('relative overflow-hidden bg-surface-sunken', aspectClass)}>
      {product.image ? (
        <picture className="block size-full">
          <source type="image/avif" srcSet={product.image.srcSetAvif} sizes={sizes} />
          <source type="image/webp" srcSet={product.image.srcSetWebp} sizes={sizes} />
          <img
            src={product.image.src}
            srcSet={product.image.srcSetJpg}
            sizes={sizes}
            width={product.image.width}
            height={product.image.height}
            alt={product.image.alt}
            loading="lazy"
            decoding="async"
            style={objectPositionStyle(product.image)}
            className={coverImageClass}
          />
        </picture>
      ) : (
        <div className="flex size-full items-center justify-center bg-espresso-100">
          <span aria-hidden="true" className="font-display text-5xl text-espresso-300/80 sm:text-6xl">
            {product.name[0]}
          </span>
        </div>
      )}
    </div>
  )

  if (linked && to) {
    return (
      <Link
        to={to}
        className="group block focus-visible:outline-offset-4"
        aria-label={`${product.name} on the menu`}
      >
        {frame}
      </Link>
    )
  }

  return <div className="group">{frame}</div>
}

export default function ProductCard({
  product,
  to = null,
  missingPrice = 'See menu',
  imageSizes = IMAGE_SIZES,
  className,
}) {
  const price = formatPrice(product, missingPrice)
  const showLink = Boolean(to)

  return (
    <article className={cn('flex h-full flex-col', className)}>
      <ProductImage product={product} sizes={imageSizes} linked={showLink} to={to} />

      <div className="mt-6 flex flex-1 flex-col">
        <DisplayTitle as="h3" size="md" className="leading-snug">
          {product.name}
        </DisplayTitle>
        <BodyText className="mt-3">{product.description}</BodyText>
        <p className="mt-4 text-base font-normal tabular-nums text-ink">
          {product.price == null ? (
            price
          ) : (
            <data value={String(product.price)}>{price}</data>
          )}
        </p>
        {showLink ? <ProductMenuLink to={to} className="mt-4" /> : null}
      </div>
    </article>
  )
}
