import { Link } from 'react-router-dom'
import { cn } from '../../utils/cn.js'
import { coverImageClass, cropAspect, objectPositionStyle } from '../../utils/imageCrop.js'
import { hoverArrow, hoverTextCta } from '../../utils/motion.js'
import { BodyText, DisplayTitle, Eyebrow } from '../ui/index.js'

export function EditorialCtaLink({ to, children, className }) {
  return (
    <Link
      to={to}
      className={cn(
        'group text-action tap-target inline-flex min-h-11 items-center text-ink-muted hover:text-ink focus-visible:outline-offset-4',
        hoverTextCta,
        className,
      )}
    >
      {children}{' '}
      <span aria-hidden="true" className={hoverArrow}>
        →
      </span>
    </Link>
  )
}

export default function EditorialSplit({
  id,
  eyebrow,
  heading,
  paragraph,
  paragraphs,
  ctaTo,
  ctaLabel,
  image,
  reverse = false,
  className,
  fetchPriority,
}) {
  const body =
    paragraphs?.length ? paragraphs : paragraph != null ? [paragraph] : []
  const headingId = id ? `${id}-heading` : undefined

  return (
    <section aria-labelledby={headingId} className={cn('section-py-roomy md:section-py-grand', className)}>
      <div className="md:grid md:grid-cols-2 md:items-center md:gap-16 lg:gap-24">
        <figure className={cn(reverse ? 'md:order-2' : 'md:order-1')}>
          <div
            className={cn(
              'overflow-hidden bg-espresso-100',
              cropAspect[image.cropAspect] ?? cropAspect.galleryPortrait,
            )}
          >
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
                loading={fetchPriority ? 'eager' : 'lazy'}
                decoding="async"
                fetchPriority={fetchPriority}
                style={objectPositionStyle(image)}
                className={cn(coverImageClass, 'min-h-[min(75vw,20rem)] sm:min-h-[24rem] lg:min-h-[32rem]')}
              />
            </picture>
          </div>
          {image.caption ? (
            <figcaption
              className={cn(
                'px-gutter pt-4 text-sm text-ink-muted',
                reverse ? 'md:pl-10 md:text-right lg:pl-16' : 'md:px-10',
              )}
            >
              {image.caption}
            </figcaption>
          ) : null}
        </figure>

        <div
          className={cn(
            'max-w-lg',
            reverse ? 'md:order-1' : 'md:order-2',
            reverse
              ? 'px-gutter pt-8 md:py-8 md:inset-content-start md:pr-16 lg:pr-24'
              : 'px-gutter pt-8 md:py-8 md:inset-content-end md:pl-16 lg:pl-24',
          )}
        >
          <Eyebrow className="text-ink-muted">{eyebrow}</Eyebrow>
          <DisplayTitle id={headingId} size="lg" className="mt-5">
            {heading}
          </DisplayTitle>
          <div className="mt-8 space-y-5">
            {body.map((text, index) => (
              <BodyText key={index}>{text}</BodyText>
            ))}
          </div>
          {ctaTo && ctaLabel ? (
            <EditorialCtaLink to={ctaTo} className="mt-10">
              {ctaLabel}
            </EditorialCtaLink>
          ) : null}
        </div>
      </div>
    </section>
  )
}
