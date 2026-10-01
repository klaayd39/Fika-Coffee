import { cn } from '../../utils/cn.js'
import { coverImageClass, galleryCropFrame, objectPositionStyle } from '../../utils/imageCrop.js'

const SIZE_ATTR = {
  large: '(min-width: 1024px) 58vw, (min-width: 640px) 90vw, calc(100vw - 3rem)',
  small: '(min-width: 1024px) 28vw, (min-width: 640px) 45vw, calc(100vw - 3rem)',
  full: '(min-width: 1024px) 72rem, 100vw',
  duo: '(min-width: 1024px) 45vw, calc(100vw - 3rem)',
}

export default function GalleryPhotoTile({
  photo,
  span = 'small',
  onOpen,
  priority = false,
  className,
}) {
  const sizes = SIZE_ATTR[span] ?? SIZE_ATTR.small

  return (
    <button
      id={`gallery-${photo.id}`}
      type="button"
      aria-haspopup="dialog"
      aria-label={photo.alt}
      onClick={() => onOpen(photo.id)}
      className={cn(
        'block w-full text-left focus-visible:outline-offset-4',
        className,
      )}
    >
      <span
        className={cn(
          'relative block w-full overflow-hidden bg-espresso-100',
          galleryCropFrame(photo, span),
        )}
      >
        <picture className="block size-full">
          <source type="image/avif" srcSet={photo.srcSetAvif} sizes={sizes} />
          <source type="image/webp" srcSet={photo.srcSetWebp} sizes={sizes} />
          <img
            src={photo.src}
            srcSet={photo.srcSetJpg}
            sizes={sizes}
            width={photo.width}
            height={photo.height}
            alt={photo.alt}
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : 'auto'}
            decoding="async"
            style={objectPositionStyle(photo)}
            className={coverImageClass}
          />
        </picture>
      </span>
    </button>
  )
}
