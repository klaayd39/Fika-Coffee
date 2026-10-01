import AboutKnollBoard from '../components/about/AboutKnollBoard.jsx'
import AboutShowcase from '../components/about/AboutShowcase.jsx'
import EditorialSplit from '../components/home/EditorialSplit.jsx'
import Seo from '../components/seo/Seo.jsx'
import { spaceTeaserParagraphs } from '../data/about.js'
import { homeEditorialBands } from '../data/homeEditorial.js'
import { seoPages } from '../data/seo.js'

export default function AboutPage() {
  const spaceBand = homeEditorialBands[1]

  return (
    <main className="bg-canvas">
      <Seo {...seoPages.about} />
      <article>
        <AboutShowcase />
        <AboutKnollBoard />

        <EditorialSplit
          id="about-space"
          eyebrow={spaceBand.eyebrow}
          heading={spaceBand.heading}
          paragraphs={spaceTeaserParagraphs}
          ctaTo={spaceBand.ctaTo}
          ctaLabel={spaceBand.ctaLabel}
          image={spaceBand.image}
          reverse={false}
          className="band-edge bg-surface section-py-roomy"
        />
      </article>
    </main>
  )
}
