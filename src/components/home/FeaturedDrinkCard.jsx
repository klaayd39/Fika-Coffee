import { cn } from '../../utils/cn.js'
import { coverImageClass, cropAspect, objectPositionStyle } from '../../utils/imageCrop.js'
import { formatPrice } from '../../data/products.js'
import Badge from '../ui/Badge.jsx'
import { BodyText, DisplayTitle } from '../ui/index.js'

function categoryBadgeVariant(category) {
  if (category === 'Matcha') return 'matcha'
  if (category === 'Food') return 'lamp'
  return 'espresso'
}

export default function FeaturedDrinkCard({
  product,
  layout = 'standard',
  index = 0,
  imageSizes,
  missingPrice = 'Ask at the counter',
  className,
}) {
  const price = formatPrice(product, missingPrice)
  const isHero = layout === 'hero'
  const isCompact = layout === 'compact'
  const initial = product.name?.[0] ?? ''
  const indexLabel = String(index + 1).padStart(2, '0')

  return (
    <article
      className={cn(
        'featured-favorite group',
        isHero && 'featured-favorite--hero',
        isCompact && 'featured-favorite--compact',
        className,
      )}
    >
      <div
        className={cn(
          'featured-favorite__frame relative overflow-hidden bg-surface-sunken',
          product.image
            ? (cropAspect[product.image.cropAspect] ?? cropAspect.productPortrait)
            : cropAspect.productPortrait,
          isHero && 'featured-favorite__frame--hero',
          isCompact && 'featured-favorite__frame--compact shrink-0',
        )}
      >
        {product.image ? (
          <picture className="block size-full">
            <source type="image/avif" srcSet={product.image.srcSetAvif} sizes={imageSizes} />
            <source type="image/webp" srcSet={product.image.srcSetWebp} sizes={imageSizes} />
            <img
              src={product.image.src}
              srcSet={product.image.srcSetJpg}
              sizes={imageSizes}
              width={product.image.width}
              height={product.image.height}
              alt={product.image.alt}
              loading="lazy"
              decoding="async"
              style={objectPositionStyle(product.image)}
              className={cn(coverImageClass, 'featured-favorite__image')}
            />
          </picture>
        ) : (
          <div className="flex size-full flex-col items-center justify-center gap-3 bg-espresso-100 px-6 text-center">
            <span aria-hidden="true" className="font-display text-6xl text-espresso-300/80 sm:text-7xl">
              {initial}
            </span>
            <span className="text-label text-2xs text-ink-muted">Photo coming soon</span>
          </div>
        )}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-espresso-950/25 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-within:opacity-100"
        />
      </div>

      <div className={cn('featured-favorite__copy', isCompact && 'featured-favorite__copy--compact')}>
        <div className="featured-favorite__meta">
          <span className="featured-favorite__index" aria-hidden="true">{indexLabel}</span>
          {product.category ? (
            <Badge variant={categoryBadgeVariant(product.category)} className="featured-favorite__category">
              {product.category}
            </Badge>
          ) : null}
        </div>

        <DisplayTitle
          as="h3"
          size="md"
          className={cn(
            'featured-favorite__title text-pretty leading-snug',
            isHero ? 'mt-4 lg:mt-5' : 'mt-3 featured-favorite__title--compact',
          )}
        >
          {product.name}
        </DisplayTitle>

        {product.description ? (
          <BodyText
            large={isHero}
            className={cn('featured-favorite__description text-ink-soft', isHero ? 'mt-3 lg:mt-4' : 'mt-2')}
          >
            {product.description}
          </BodyText>
        ) : null}

        <p className="featured-favorite__price text-body mt-2 tabular-nums text-ink sm:mt-3">
          <data value={product.price != null ? String(product.price) : undefined}>{price}</data>
        </p>
      </div>
    </article>
  )
}
