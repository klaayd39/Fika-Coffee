import { Link } from 'react-router-dom'
import { hero } from '../../data/hero.js'
import { coverImageClass, cropAspect, objectPositionStyle } from '../../utils/imageCrop.js'
import { Button } from '../ui/index.js'
import OpenStatus from '../ui/OpenStatus.jsx'

/* Keep sizes identical to the hero preload in index.html. */
const HERO_SIZES_ATTR = hero.image.sizes

export default function Hero() {
  const { image } = hero

  return (
    <section
      aria-labelledby="hero-heading"
      className="hero-bleed relative w-full max-w-none"
    >
      <div className="hero-bleed__stage relative w-full max-md:mt-[calc(4.75rem+env(safe-area-inset-top,0px))] md:mt-0">
        <figure className={`hero-bleed__figure relative overflow-hidden ${cropAspect.hero}`}>
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
              className={`${coverImageClass} min-h-full min-w-full`}
            />
          </picture>
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-espresso-950/82 via-espresso-950/48 to-espresso-950/15 lg:via-espresso-950/32 lg:to-espresso-950/5"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-espresso-950/75 via-espresso-950/30 to-transparent md:from-espresso-950/35 md:via-espresso-950/10 md:to-transparent"
          />
        </figure>

        <div className="tone-inverse absolute inset-0 flex items-end pb-[max(3.5rem,env(safe-area-inset-bottom,0px))] pt-8 sm:pb-16 md:items-center md:pb-20 md:pt-0">
          <div className="content-shell w-full">
            <div className="hero-copy max-w-2xl md:max-w-3xl">
              <p className="text-eyebrow text-cream-200/90">{hero.eyebrow}</p>

              <h1
                id="hero-heading"
                className="text-hero-display mt-5 max-w-[16ch] text-balance text-cream-50 drop-shadow-[0_2px_24px_rgb(27_20_19/0.55)] sm:mt-6 sm:max-w-[17ch] md:max-w-[13ch]"
              >
                {hero.headline}
              </h1>

              <p className="text-body-lg mt-6 max-w-lg text-cream-200/95 sm:mt-7 md:max-w-xl">
                {hero.supporting}
              </p>

              <div className="hero-actions hero-actions--dock mt-10 sm:mt-11">
                <OpenStatus />

                <Button
                  as={Link}
                  to={{ pathname: '/', hash: 'contact' }}
                  variant="inverse"
                  size="lg"
                  pill
                  arrow
                  className="hero-actions__cta tap-target min-h-12 w-full px-8 text-sm sm:min-w-[11.75rem]"
                >
                  {hero.cta}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
