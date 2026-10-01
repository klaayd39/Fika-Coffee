import { Link } from 'react-router-dom'
import { hero } from '../../data/hero.js'
import { coverImageClass, cropAspect, objectPositionStyle } from '../../utils/imageCrop.js'
import { Button } from '../ui/index.js'

/* Keep sizes identical to the hero preload in index.html. */
const HERO_SIZES_ATTR = hero.image.sizes

export default function Hero() {
  const { image } = hero

  return (
    <section aria-labelledby="hero-heading" className="relative isolate">
      <figure className={`relative w-full overflow-hidden ${cropAspect.hero}`}>
        <picture className="absolute inset-0 block size-full">
          <source type="image/avif" srcSet={image.srcSetAvif} sizes={HERO_SIZES_ATTR} />
          <source type="image/webp" srcSet={image.srcSetWebp} sizes={HERO_SIZES_ATTR} />
          <img
            src={image.src}
            srcSet={image.srcSetJpg}
            sizes={HERO_SIZES_ATTR}
            width={image.width}
            height={image.height}
            alt={image.alt}
            fetchPriority="high"
            decoding="async"
            style={objectPositionStyle(image)}
            className={coverImageClass}
          />
        </picture>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-espresso-950/62 via-espresso-950/28 to-espresso-950/5 lg:via-espresso-950/18 lg:to-transparent"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-espresso-950/18 via-transparent to-transparent"
        />
      </figure>

      <div className="tone-inverse absolute inset-0 flex items-end pb-[max(3.5rem,env(safe-area-inset-bottom,0px))] pt-[max(6rem,calc(4.75rem+env(safe-area-inset-top,0px)))] sm:pb-16 sm:pt-28 md:items-center md:pb-20 md:pt-0">
        <div className="content-shell w-full">
          <div className="max-w-xl md:max-w-2xl">
            <p className="text-eyebrow text-cream-200/90">{hero.eyebrow}</p>

            <h1
              id="hero-heading"
              className="text-hero-display mt-4 max-w-[14ch] text-balance text-cream-50 drop-shadow-[0_2px_24px_rgb(27_20_19/0.55)] sm:mt-5 sm:max-w-[15ch] md:max-w-[12ch]"
            >
              {hero.headline}
            </h1>

            <p className="text-body-lg mt-5 max-w-md text-cream-200/95 md:mt-6">
              {hero.supporting}
            </p>

            <div className="mt-8 flex w-full max-w-sm flex-col gap-3 sm:mt-9 sm:max-w-none sm:flex-row sm:items-center">
              <Button as={Link} to="/menu" size="md" arrow className="tap-target w-full sm:w-auto">
                {hero.primaryCta}
              </Button>
              <Button
                as={Link}
                to="#contact"
                variant="secondaryInverse"
                arrow
                className="tap-target w-full sm:w-auto"
              >
                {hero.secondaryCta}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
