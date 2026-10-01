import {
  aboutPageIntro,
  aboutPageLeadEyebrow,
  aboutPageLeadHeadline,
  aboutPageRightParagraphs,
  aboutPageRightTitle,
} from '../../data/about.js'
import { cn } from '../../utils/cn.js'
import { BodyText, DisplayTitle, Eyebrow } from '../ui/index.js'
import { EditorialCtaLink } from '../home/EditorialSplit.jsx'

const scrollLandmark =
  'scroll-mt-[calc(4.75rem+env(safe-area-inset-top,0px))] md:scroll-mt-28'

const props = [
  {
    id: 'whisk',
    src: '/images/about/props/matcha-whisk.png',
    alt: 'Bamboo whisk in a bowl of matcha, photographed from above.',
    className: 'flatlay-prop--whisk',
    width: 269,
    height: 301,
  },
  {
    id: 'matcha',
    src: '/images/about/props/iced-matcha.png',
    alt: 'Iced matcha in a cup, photographed from above.',
    className: 'flatlay-prop--matcha',
    width: 282,
    height: 291,
  },
  {
    id: 'beans',
    src: '/images/about/props/coffee-beans.png',
    alt: 'Roasted coffee beans arranged on a white surface.',
    className: 'flatlay-prop--beans',
    width: 238,
    height: 172,
  },
  {
    id: 'samyang',
    src: '/images/about/showcase-samyang-prop.png',
    alt: 'Samyang noodles with cream and katsu in a pink bowl, photographed from above.',
    className: 'flatlay-prop--samyang',
    width: 728,
    height: 728,
  },
]

export default function AboutShowcase({ embedded = false }) {
  const paragraphs = aboutPageRightParagraphs()

  return (
    <section
      id={embedded ? 'about' : undefined}
      aria-labelledby={embedded ? 'home-about-title' : undefined}
      aria-label={embedded ? undefined : 'About Fika Coffee'}
      className={cn('band-edge bg-white section-py-tight md:section-py-roomy', embedded && scrollLandmark)}
    >
      <div className="flatlay-stage content-shell-wide">
        {props.map((prop) => (
          <figure key={prop.id} className={cn('flatlay-prop', prop.className)}>
            <img
              src={prop.src}
              alt={prop.alt}
              width={prop.width}
              height={prop.height}
              decoding="async"
              loading={embedded ? 'lazy' : 'eager'}
            />
          </figure>
        ))}

        <header className="flatlay-stage__title">
          <DisplayTitle
            as={embedded ? 'h2' : 'h1'}
            id={embedded ? 'home-about-title' : undefined}
            size="page"
          >
            About
          </DisplayTitle>
          <span className="mx-auto mt-5 block h-px w-14 bg-line" aria-hidden="true" />
          <BodyText large className="mt-7 text-ink-soft">
            {aboutPageIntro}
          </BodyText>
        </header>

        <div className="flatlay-stage__lead max-w-xl">
          <Eyebrow className="text-ink-muted">{aboutPageLeadEyebrow}</Eyebrow>
          <DisplayTitle size="xl" className="mt-5 leading-[1.08]">
            {aboutPageLeadHeadline}
          </DisplayTitle>
        </div>

        <div className="flatlay-stage__copy max-w-lg lg:max-w-xl">
          <DisplayTitle size="md">{aboutPageRightTitle}</DisplayTitle>
          <div className="mt-7 space-y-5">
            {paragraphs.map((text) => (
              <BodyText key={text}>{text}</BodyText>
            ))}
          </div>
          <EditorialCtaLink to={embedded ? '#contact' : '/contact#visit'} className="mt-10">
            Visit us
          </EditorialCtaLink>
        </div>
      </div>
    </section>
  )
}
