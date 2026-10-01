import { cn } from '../../utils/cn.js'
import { homeEditorialBands } from '../../data/homeEditorial.js'
import EditorialSplit from './EditorialSplit.jsx'

export default function About() {
  return (
    <>
      {homeEditorialBands.map((band) => (
        <EditorialSplit
          key={band.id}
          id={band.id}
          eyebrow={band.eyebrow}
          heading={band.heading}
          paragraphs={band.paragraphs}
          ctaTo={band.ctaTo}
          ctaLabel={band.ctaLabel}
          image={band.image}
          reverse={band.reverse}
          className={cn('band-edge', band.surface)}
        />
      ))}
    </>
  )
}
