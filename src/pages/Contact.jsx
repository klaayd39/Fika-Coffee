import Seo from '../components/seo/Seo.jsx'
import LocationSection from '../components/location/LocationSection.jsx'
import { BodyText, DisplayTitle } from '../components/ui/index.js'
import { brand } from '../data/brand.js'
import { contactCopy } from '../data/contact.js'
import { seoPages } from '../data/seo.js'

export default function Contact() {
  return (
    <main className="bg-canvas">
      <Seo {...seoPages.contact} />
      <div className="content-shell pt-16 md:pt-24">
        <h1 className="sr-only">Contact {brand.name}</h1>
      </div>

      <LocationSection id="visit" className="band-edge bg-surface pt-4 md:pt-0" />

      <section
        aria-labelledby="reach-heading"
        className="band-edge bg-canvas pb-24 pt-14 md:pb-32 md:pt-20"
      >
        <div className="content-shell">
          <DisplayTitle id="reach-heading" size="md">
            More ways to reach us
          </DisplayTitle>

          <dl className="mt-10 max-w-2xl space-y-8">
            <Detail term="Phone">{brand.phone ?? contactCopy.phone}</Detail>
            <Detail term="Facebook">
              {brand.facebook ? (
                <a
                  href={brand.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-line-strong/80 underline-offset-4 transition-[color,text-decoration-color] duration-300 ease-out hover:decoration-espresso-800"
                >
                  {brand.name} on Facebook
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ) : (
                contactCopy.facebook
              )}
            </Detail>
            <Detail term="Instagram">
              {brand.instagram ? (
                <a
                  href={brand.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-line-strong/80 underline-offset-4 transition-[color,text-decoration-color] duration-300 ease-out hover:decoration-espresso-800"
                >
                  {brand.name} on Instagram
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ) : (
                contactCopy.instagram
              )}
            </Detail>
            <Detail term="Website">
              {brand.website ? (
                <a
                  href={brand.website}
                  className="underline decoration-line-strong/80 underline-offset-4 transition-[color,text-decoration-color] duration-300 ease-out hover:decoration-espresso-800"
                >
                  {brand.website}
                </a>
              ) : (
                contactCopy.website
              )}
            </Detail>
          </dl>

          <BodyText className="mt-8 max-w-prose text-sm">{brand.rituals[0].detail}</BodyText>
        </div>
      </section>
    </main>
  )
}

function Detail({ term, children }) {
  return (
    <div className="grid gap-2 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-8">
      <dt className="text-eyebrow">{term}</dt>
      <dd className="text-body font-normal text-ink">{children}</dd>
    </div>
  )
}
