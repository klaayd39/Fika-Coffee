import { atmosphere } from '../../data/atmosphere.js'
import { DisplayTitle } from '../ui/index.js'
import { EditorialCtaLink } from './EditorialSplit.jsx'

export default function AtmosphereBand() {
  const { image, headline, ctaLabel, ctaTo } = atmosphere

  return (
    <section
      id="gallery"
      aria-labelledby="atmosphere-heading"
      className="scroll-mt-[calc(4.75rem+env(safe-area-inset-top,0px))] band-edge relative isolate bg-espresso-950 md:scroll-mt-28"
    >
      <figure className="relative aspect-[4/5] min-h-[min(85svh,28rem)] w-full overflow-hidden sm:aspect-[16/10] sm:min-h-[30rem] lg:min-h-[min(75vh,42rem)]">
        <picture className="absolute inset-0 block size-full">
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
            style={{ objectPosition: image.objectPosition }}
            className="size-full object-cover"
          />
        </picture>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-espresso-950/78 sm:h-40"
        />
      </figure>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 px-gutter pb-10 pt-16 sm:pb-12 md:pb-14 lg:pb-16">
        <div className="pointer-events-auto content-shell max-w-prose">
          <div className="max-w-md sm:max-w-lg">
            <DisplayTitle
              id="atmosphere-heading"
              size="lg"
              className="leading-[1.12] text-cream-50"
            >
              {headline}
            </DisplayTitle>
            {ctaTo && ctaLabel ? (
              <EditorialCtaLink
                to={ctaTo}
                className="mt-6 text-cream-200/90 hover:text-cream-50"
              >
                {ctaLabel}
              </EditorialCtaLink>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}
