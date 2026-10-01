import { cn } from '../../utils/cn.js'
import { hoverArrow, hoverTextCta } from '../../utils/motion.js'
import { brand } from '../../data/brand.js'
import {
  addressLines,
  contactCopy,
  contactPlaceholders,
  mapsUrl,
  openingHours,
} from '../../data/contact.js'
import { locationSection } from '../../data/location.js'
import { coverImageClass, cropAspect, objectPositionStyle } from '../../utils/imageCrop.js'
import { BodyText, DisplayTitle, Eyebrow } from '../ui/index.js'

function DirectionsLink({ className }) {
  if (!mapsUrl) return null

  return (
    <a
      href={mapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'group text-action tap-target inline-flex min-h-11 items-center text-ink-muted hover:text-ink focus-visible:outline-offset-4',
        hoverTextCta,
        className,
      )}
    >
      {locationSection.directionsLabel}{' '}
      <span aria-hidden="true" className={hoverArrow}>
        →
      </span>
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  )
}

export default function LocationSection({ id = 'location', className, imageFirst = false }) {
  const { eyebrow, heading, image } = locationSection
  const headingId = `${id}-heading`

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn('scroll-mt-24 section-py-tight md:scroll-mt-28 md:section-py-roomy', className)}
    >
      <div
        className={cn(
          'md:grid md:grid-cols-2 md:items-stretch md:gap-12 lg:gap-20',
          imageFirst && 'md:[&>figure]:order-1 md:[&>div]:order-2',
        )}
      >
        <div
          className={cn(
            'flex max-w-lg flex-col justify-center px-gutter md:py-8',
            imageFirst
              ? 'md:inset-content-end md:pl-12 lg:pl-20'
              : 'md:inset-content-start md:pr-12 lg:pr-20',
          )}
        >
          <Eyebrow className="text-ink-muted">{eyebrow}</Eyebrow>
          <DisplayTitle id={headingId} size="lg" className="mt-5">
            {heading}
          </DisplayTitle>

          <div className="mt-8 space-y-8">
            <div>
              <p className="text-eyebrow">Address</p>
              {addressLines ? (
                <address className="text-body-lg mt-3 font-normal text-ink not-italic">
                  {addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              ) : (
                <p className="mt-3 text-base text-ink">{contactPlaceholders.address}</p>
              )}
            </div>

            <div>
              <p className="text-eyebrow">Opening hours</p>
              <ul className="text-body-lg mt-3 space-y-2 font-normal text-ink">
                {openingHours.map((row) => (
                  <li key={row.days} className="flex flex-col gap-0.5 sm:flex-row sm:flex-wrap sm:gap-x-3">
                    <span className="text-ink-soft sm:min-w-[9.5rem]">{row.days}</span>
                    {row.opens ? (
                      <span>
                        <time dateTime={row.opensAt ?? undefined}>{row.opens}</time>
                        {' – '}
                        <time dateTime={row.closesAt ?? undefined}>{row.closes}</time>
                      </span>
                    ) : (
                      <span className="text-ink-muted">{contactCopy.hours}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <DirectionsLink className="mt-10" />
        </div>

        <figure className="mt-12 md:mt-0">
          <div
            className={cn(
              'overflow-hidden bg-espresso-100 md:min-h-full',
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
                loading="lazy"
                decoding="async"
                style={objectPositionStyle(image)}
                className={cn(coverImageClass, 'md:min-h-[26rem] lg:min-h-[32rem]')}
              />
            </picture>
          </div>
          {image.caption ? (
            <figcaption className="px-gutter pt-3 text-sm text-ink-muted md:px-10">
              {image.caption}
            </figcaption>
          ) : null}
          <p className="sr-only">
            Directions open a Google Maps search for this address. A precise map pin has not been
            published.
          </p>
        </figure>
      </div>
    </section>
  )
}
