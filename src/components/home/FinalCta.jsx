import { Link } from 'react-router-dom'
import { finalCta } from '../../data/finalCta.js'
import { BodyText, Button, DisplayTitle } from '../ui/index.js'

export default function FinalCta() {
  const { heading, supporting, ctaLabel, ctaTo } = finalCta

  return (
    <section
      aria-labelledby="final-cta-heading"
      className="band-edge bg-band-cream"
    >
      <div className="content-shell py-14 md:py-28 lg:py-32">
        <div className="max-w-prose md:max-w-xl">
          <DisplayTitle id="final-cta-heading" size="lg" className="leading-[1.1]">
            {heading}
          </DisplayTitle>
          <BodyText large className="mt-6">
            {supporting}
          </BodyText>
          <div className="mt-10">
            <Button as={Link} to={ctaTo} variant="secondary" arrow className="tap-target">
              {ctaLabel}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
