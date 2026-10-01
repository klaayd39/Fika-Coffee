import { Link } from 'react-router-dom'
import { cn } from '../../utils/cn.js'
import { objectPositionStyle } from '../../utils/imageCrop.js'

export default function FlatLayTile({ item, className }) {
  const { image, label, href } = item

  return (
    <Link
      to={href}
      className={cn(
        'group flex h-full min-h-0 flex-col focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-espresso-800',
        className,
      )}
    >
      <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden bg-white p-3 md:p-4">
        <picture className="block size-full">
          <source type="image/avif" srcSet={image.srcSetAvif} sizes={image.sizes} />
          <source type="image/webp" srcSet={image.srcSetWebp} sizes={image.sizes} />
          <img
            src={image.src}
            srcSet={image.srcSetJpg}
            sizes={image.sizes}
            width={image.width}
            height={image.height}
            alt={image.alt}
            loading="lazy"
            decoding="async"
            style={objectPositionStyle(image)}
            className="flatlay-overhead transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        </picture>
      </div>
      <span className="text-label px-2 py-3 text-center text-ink-muted transition-colors duration-300 group-hover:text-ink">
        {label}
      </span>
    </Link>
  )
}
