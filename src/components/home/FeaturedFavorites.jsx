import { Link } from 'react-router-dom'
import { homeFeaturedDrinks } from '../../data/products.js'
import { BodyText, Button, DisplayTitle, Eyebrow } from '../ui/index.js'
import FeaturedDrinkCard from './FeaturedDrinkCard.jsx'

const LEAD_IMAGE_SIZES = '(min-width: 1024px) 42vw, (min-width: 640px) 46vw, 92vw'
const COMPACT_IMAGE_SIZES = '(min-width: 1024px) 8.75rem, (min-width: 640px) 7.5rem, 31vw'

const MAX_FEATURED = 3

const INTRO =
  'A few plates and pours we keep coming back to — made at the counter and best enjoyed slowly at the table.'

export default function FeaturedFavorites() {
  const drinks = homeFeaturedDrinks.slice(0, MAX_FEATURED)

  if (!drinks.length) return null

  const [lead, ...rest] = drinks

  return (
    <section aria-labelledby="favorites-heading" className="featured-favorites band-edge bg-band-warm">
      <div className="content-shell section-py-tight lg:content-shell-wide">
        <header className="featured-favorites__intro">
          <div className="grid gap-5 md:gap-6 lg:grid-cols-12 lg:items-end lg:gap-x-10 xl:gap-x-12">
            <div className="lg:col-span-7">
              <Eyebrow className="featured-favorites__eyebrow text-ink-soft">Our favorites</Eyebrow>
              <DisplayTitle id="favorites-heading" as="h2" size="xl" className="mt-3 text-balance md:mt-4">
                Made to Be Savored.
              </DisplayTitle>
            </div>
            <BodyText large className="max-w-prose text-ink-soft lg:col-span-5 lg:pb-0.5">
              {INTRO}
            </BodyText>
          </div>
        </header>

        <div className="featured-favorites__layout">
          <div className="featured-favorites__lead">
            <FeaturedDrinkCard product={lead} layout="hero" index={0} imageSizes={LEAD_IMAGE_SIZES} />
          </div>

          {rest.length > 0 ? (
            <ul role="list" className="featured-favorites__stack list-none">
              {rest.map((product, offset) => (
                <li key={product.id}>
                  <FeaturedDrinkCard
                    product={product}
                    layout="compact"
                    index={offset + 1}
                    imageSizes={COMPACT_IMAGE_SIZES}
                  />
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <footer className="featured-favorites__footer flex flex-col gap-5 border-t border-line/70 md:flex-row md:items-center md:justify-between md:gap-6">
          <p className="text-body max-w-md text-ink-muted">
            Menu and prices are at the counter — tell us what you&apos;re in the mood for.
          </p>
          <Button
            as={Link}
            to={{ pathname: '/', hash: 'contact' }}
            variant="secondary"
            arrow
            className="tap-target shrink-0 self-start md:self-auto"
          >
            Visit us
          </Button>
        </footer>
      </div>
    </section>
  )
}
