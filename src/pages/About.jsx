import Seo from '../components/seo/Seo.jsx'
import { DisplayTitle, Eyebrow } from '../components/ui/index.js'
import EditorialSplit from '../components/home/EditorialSplit.jsx'
import { about, spaceTeaserParagraphs, storyPageParagraphs } from '../data/about.js'
import { homeEditorialBands } from '../data/homeEditorial.js'
import { seoPages } from '../data/seo.js'

export default function AboutPage() {
  const storyBand = homeEditorialBands[0]
  const spaceBand = homeEditorialBands[1]

  return (
    <main className="bg-canvas">
      <Seo {...seoPages.about} />
      <article>
        <header className="content-shell pt-16 pb-8 md:pt-28 md:pb-12">
          <Eyebrow>{about.eyebrow}</Eyebrow>
          <DisplayTitle as="h1" size="page" className="mt-5">
            About
          </DisplayTitle>
        </header>

        <EditorialSplit
          id="about-story"
          eyebrow={storyBand.eyebrow}
          heading={storyBand.heading}
          paragraphs={storyPageParagraphs()}
          image={storyBand.image}
          reverse={false}
          className="band-edge bg-band-warm"
          fetchPriority="high"
        />

        <EditorialSplit
          id="about-space"
          eyebrow={spaceBand.eyebrow}
          heading={spaceBand.heading}
          paragraphs={spaceTeaserParagraphs}
          ctaTo={spaceBand.ctaTo}
          ctaLabel={spaceBand.ctaLabel}
          image={spaceBand.image}
          reverse
          className="band-edge bg-surface"
        />
      </article>
    </main>
  )
}
