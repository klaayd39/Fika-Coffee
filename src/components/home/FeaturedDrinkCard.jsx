import { Link } from 'react-router-dom'
import { cn } from '../../utils/cn.js'
import { coverImageClass, cropAspect, objectPositionStyle } from '../../utils/imageCrop.js'
import { formatPrice } from '../../data/products.js'
import { BodyText, DisplayTitle } from '../ui/index.js'
import { ProductMenuLink } from '../ui/ProductCard.jsx'

const CATEGORY_MENU = {
  Coffee: 'coffee',
  Matcha: 'matcha',
  Treats: 'treats',
}

function menuHref(product) {
  const category = CATEGORY_MENU[product.category]
  return category ? `/menu?category=${category}` : '/menu'
}

export default function FeaturedDrinkCard({
  product,
  layout = 'standard',
  imageSizes,
  missingPrice = 'See menu',
  className,
}) {
  const to = menuHref(product)
  const price = formatPrice(product, missingPrice)
  const isHero = layout === 'hero'
  const isSide = layout === 'side'

  return (
    <article className={cn('flex h-full flex-col', className)}>
      <Link
        to={to}
        className="group block focus-visible:outline-offset-4"
        aria-label={`${product.name} on the menu`}
      >
        <div
          className={cn(
            'relative overflow-hidden bg-surface-sunken',
            product.image
              ? (cropAspect[product.image.cropAspect] ?? cropAspect.productPortrait)
              : cropAspect.productPortrait,
            isHero && product.image && 'lg:min-h-[36rem]',
            isSide &&
              product.image &&
              'min-h-[min(72vw,22rem)] sm:min-h-[min(65vw,24rem)] lg:min-h-0',
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
      </Link>

      <div className={cn('flex flex-1 flex-col', isHero ? 'mt-8 lg:mt-10' : 'mt-7 lg:mt-8')}>
        <DisplayTitle as="h3" size="md" className="leading-tight">
          {product.name}
        </DisplayTitle>
        <BodyText large className="mt-4 max-w-md">
          {product.description}
        </BodyText>
        <p className="text-body mt-5 tabular-nums text-ink">
          {product.price == null ? (
            price
          ) : (
            <data value={String(product.price)}>{price}</data>
          )}
        </p>
        <ProductMenuLink to={to} className="mt-4" />
      </div>
    </article>
  )
}
