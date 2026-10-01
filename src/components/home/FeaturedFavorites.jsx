import { cn } from '../../utils/cn.js'
import { homeFeaturedDrinks } from '../../data/products.js'
import { DisplayTitle, Eyebrow } from '../ui/index.js'
import FeaturedDrinkCard from './FeaturedDrinkCard.jsx'

const LEAD_IMAGE_SIZES = '(min-width: 1024px) 42vw, (min-width: 640px) 18rem, 15.25rem'
const SIDE_IMAGE_SIZES = '(min-width: 1024px) 32vw, (min-width: 640px) 17rem, 15.25rem'

/* The grid layout is designed for one lead card plus two side cards. */
const MAX_FEATURED = 3

export default function FeaturedFavorites() {
  const drinks = homeFeaturedDrinks.slice(0, MAX_FEATURED)

  if (!drinks.length) return null

  return (
    <section aria-labelledby="favorites-heading" className="band-edge bg-band-warm">
      <div className="content-shell section-py-tight pb-8 md:pb-16 lg:pb-20">
        <div className="max-w-prose lg:max-w-2xl">
          <Eyebrow className="text-ink-muted">Our favorites</Eyebrow>
          <DisplayTitle id="favorites-heading" as="h2" size="xl" className="mt-5">
            Made to Be Savored.
          </DisplayTitle>
        </div>
      </div>

      <div className="content-shell pb-10 md:pb-20 lg:content-shell-wide lg:pb-32">
        <ul
          role="list"
          className="featured-favorites__grid grid list-none grid-cols-1 gap-8 sm:gap-10 lg:grid-cols-12 lg:gap-x-12 lg:gap-y-16 xl:gap-x-16"
        >
          {drinks.map((product, index) => {
            const isLead = index === 0
            return (
              <li
                key={product.id}
                className={cn(isLead ? 'lg:col-span-7 lg:row-span-2' : 'lg:col-span-5')}
              >
                <FeaturedDrinkCard
                  product={product}
                  layout={isLead ? 'hero' : 'side'}
                  imageSizes={isLead ? LEAD_IMAGE_SIZES : SIDE_IMAGE_SIZES}
                />
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
