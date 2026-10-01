import { Link } from 'react-router-dom'
import { cn } from '../../utils/cn.js'
import { homeFeaturedDrinks } from '../../data/products.js'
import { Button, DisplayTitle, Eyebrow } from '../ui/index.js'
import FeaturedDrinkCard from './FeaturedDrinkCard.jsx'

const LEAD_IMAGE_SIZES = '(min-width: 1024px) 58vw, (min-width: 640px) 90vw, 100vw'
const SIDE_IMAGE_SIZES = '(min-width: 1024px) 42vw, (min-width: 640px) 90vw, 100vw'

export default function FeaturedFavorites() {
  return (
    <section aria-labelledby="favorites-heading" className="band-edge bg-band-warm">
      <div className="content-shell section-py-tight pb-10 md:pb-16 lg:pb-20">
        <div className="max-w-prose lg:max-w-2xl">
          <Eyebrow className="text-ink-muted">Our favorites</Eyebrow>
          <DisplayTitle id="favorites-heading" as="h2" size="xl" className="mt-5">
            Made to Be Savored.
          </DisplayTitle>
          <div className="mt-8 lg:hidden">
            <Button as={Link} to="/menu" variant="secondary" arrow className="tap-target">
              View our menu
            </Button>
          </div>
        </div>
      </div>

      {homeFeaturedDrinks.length ? (
        <div className="content-shell-wide pb-14 md:pb-24 lg:pb-32">
          <ul className="grid list-none grid-cols-1 gap-10 sm:gap-12 lg:grid-cols-12 lg:gap-x-12 lg:gap-y-20 xl:gap-x-16">
            {homeFeaturedDrinks.map((product, index) => {
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

          <div className="mt-14 lg:mt-28">
            <Button as={Link} to="/menu" variant="secondary" arrow className="tap-target">
              View full menu
            </Button>
          </div>
        </div>
      ) : null}
    </section>
  )
}
