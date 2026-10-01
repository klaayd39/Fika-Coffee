import { aboutKnollHeading, aboutKnollIntro, aboutKnollItems } from '../../data/about.js'
import { BodyText, DisplayTitle, Eyebrow } from '../ui/index.js'
import FlatLayTile from './FlatLayTile.jsx'

export default function AboutKnollBoard() {
  if (!aboutKnollItems.length) return null

  return (
    <section
      aria-labelledby="about-knoll-heading"
      className="band-edge overflow-x-clip border-t border-line bg-white section-py-tight"
    >
      <div className="content-shell-wide">
        <div className="max-w-prose md:max-w-xl">
          <Eyebrow className="text-ink-muted">Flat lay</Eyebrow>
          <DisplayTitle id="about-knoll-heading" size="md" className="mt-4">
            {aboutKnollHeading}
          </DisplayTitle>
          <BodyText className="mt-5">{aboutKnollIntro}</BodyText>
        </div>

        <ul
          className="flatlay-knoll mt-10 list-none p-0 sm:mt-12 md:mt-16"
          aria-label="Menu in overhead flat lay"
        >
          {aboutKnollItems.map((item) => (
            <li key={item.id}>
              <FlatLayTile item={item} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
