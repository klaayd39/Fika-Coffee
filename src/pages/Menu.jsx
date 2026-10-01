import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import Seo from '../components/seo/Seo.jsx'
import { BodyText, Button, DisplayTitle, ProductCard } from '../components/ui/index.js'
import { menuSections } from '../data/products.js'
import { seoPages } from '../data/seo.js'

const filters = [{ id: 'all', label: 'All' }, ...menuSections]

export default function Menu() {
  const [searchParams, setSearchParams] = useSearchParams()
  const requested = searchParams.get('category')
  const activeId = menuSections.some((section) => section.id === requested) ? requested : 'all'
  const activeLabel = menuSections.find((section) => section.id === activeId)?.label
  const visibleCount = menuSections
    .filter((section) => activeId === 'all' || section.id === activeId)
    .reduce((sum, section) => sum + section.products.length, 0)

  useEffect(() => {
    if (requested && !menuSections.some((section) => section.id === requested)) {
      setSearchParams({}, { replace: true })
    }
  }, [requested, setSearchParams])

  function selectCategory(id) {
    if (id === 'all') setSearchParams({}, { replace: true })
    else setSearchParams({ category: id }, { replace: true })
  }

  const status =
    activeId === 'all'
      ? `${visibleCount} items`
      : `${visibleCount} ${visibleCount === 1 ? 'item' : 'items'} in ${activeLabel}`

  return (
    <div className="bg-canvas">
      <Seo {...seoPages.menu} />
      <div className="content-shell page-top pb-10 md:pb-14">
        <header className="max-w-prose">
          <DisplayTitle as="h1" size="page">
            Menu
          </DisplayTitle>
          <BodyText large className="mt-6 max-w-md">
            Coffee from the drinks menu, matcha finished with oat milk, and a cookie box to take
            home. A peso price is shown only when it was readable.
          </BodyText>
        </header>

        <div
          role="group"
          aria-label="Filter menu by category"
          className="mt-10 flex flex-wrap gap-x-4 gap-y-3 md:mt-16 md:gap-x-5"
        >
          {filters.map((filter) => {
            const selected = filter.id === activeId
            return (
              <Button
                key={filter.id}
                variant={selected ? 'textActive' : 'text'}
                aria-pressed={selected}
                onClick={() => selectCategory(filter.id)}
              >
                {filter.label}
              </Button>
            )
          })}
        </div>

        <p className="mt-5 text-sm text-ink-muted" aria-live="polite">
          {status}
        </p>
      </div>

      <div className="band-edge bg-surface pb-16 pt-10 md:pb-40 md:pt-16">
        <div className="content-shell-wide">
          <div className="flex flex-col gap-24 md:gap-32">
            {menuSections.map((section) => {
              const shown = activeId === 'all' || section.id === activeId
              return (
                <section
                  key={section.id}
                  id={section.id}
                  hidden={!shown}
                  aria-labelledby={`${section.id}-heading`}
                  className="scroll-mt-[calc(4.75rem+env(safe-area-inset-top,0px))] md:scroll-mt-24"
                >
                  <h2
                    id={`${section.id}-heading`}
                    className="text-display-md"
                  >
                    {section.label}
                  </h2>
                  <ul className="mt-10 grid list-none grid-cols-1 gap-y-16 sm:grid-cols-2 sm:gap-x-12 sm:gap-y-20 lg:mt-12 lg:gap-x-16 lg:gap-y-24">
                    {section.products.map((product) => (
                      <li key={product.id} id={product.id}>
                        <ProductCard product={product} />
                      </li>
                    ))}
                  </ul>
                </section>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
