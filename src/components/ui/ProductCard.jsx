import { cn } from '../../utils/cn.js'
import { formatPrice } from '../../data/products.js'
import { coverImageClass, cropAspect, objectPositionStyle } from '../../utils/imageCrop.js'
import { BodyText, DisplayTitle } from './Type.jsx'

const IMAGE_SIZES = '(min-width: 1024px) 30vw, (min-width: 640px) 45vw, calc(100vw - 3rem)'

function ProductImage({ product, sizes }) {
  const aspectClass =
    cropAspect[product.image?.cropAspect] ?? cropAspect.productPortrait

  return (
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
}

export default function ProductCard({
  product,
  missingPrice = 'Ask in store',
  imageSizes = IMAGE_SIZES,
  className,
}) {
  const price = formatPrice(product, missingPrice)

  return (
    <article className={cn('flex h-full flex-col', className)}>
      <ProductImage product={product} sizes={imageSizes} />

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
      </div>
    </article>
  )
}
