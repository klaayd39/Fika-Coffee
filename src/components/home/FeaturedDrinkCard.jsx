import { cn } from '../../utils/cn.js'
import { coverImageClass, cropAspect, objectPositionStyle } from '../../utils/imageCrop.js'
import { formatPrice } from '../../data/products.js'
import { BodyText, DisplayTitle } from '../ui/index.js'

export default function FeaturedDrinkCard({
  product,
  layout = 'standard',
  imageSizes,
  missingPrice = 'Ask in store',
  className,
}) {
  const price = formatPrice(product, missingPrice)
  const isHero = layout === 'hero'

  return (
    <article className={cn('flex h-full flex-col', className)}>
      <div
        className={cn(
          'featured-favorite__frame relative overflow-hidden bg-surface-sunken',
          product.image
            ? (cropAspect[product.image.cropAspect] ?? cropAspect.productPortrait)
            : cropAspect.productPortrait,
          isHero && product.image && 'lg:max-h-[32rem]',
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
              className={coverImageClass}
            />
          </picture>
        ) : (
          <div className="flex size-full flex-col items-center justify-center gap-3 bg-espresso-100 px-6 text-center">
            <span aria-hidden="true" className="font-display text-6xl text-espresso-300/80 sm:text-7xl">
              {product.name[0]}
            </span>
            <span className="text-label text-2xs text-ink-muted">Photo coming soon</span>
          </div>
        )}
      </div>

      <div
        className={cn(
          'featured-favorite__copy flex flex-1 flex-col',
          isHero ? 'mt-5 sm:mt-6 lg:mt-10' : 'mt-5 sm:mt-6 lg:mt-8',
        )}
      >
        <DisplayTitle as="h3" size="md" className="max-w-xl text-pretty leading-snug lg:leading-tight">
          {product.name}
        </DisplayTitle>
        <BodyText large className="mt-3 max-w-md lg:mt-4">
          {product.description}
        </BodyText>
        {product.price != null ? (
          <p className="text-body mt-3 tabular-nums text-ink lg:mt-5">
            <data value={String(product.price)}>{price}</data>
          </p>
        ) : null}
      </div>
    </article>
  )
}
