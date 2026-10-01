import { brand } from './brand.js'

const widths = [480, 720, 960]

/* Copy is limited to what the public page confirms.
   The origin story has not been published — see storyPlaceholder. */
export const about = {
  eyebrow: `Est. ${brand.established}`,
  heading: `${brand.sign}.`,
  story: null,
  storyPlaceholder: '[BUSINESS STORY NEEDED]',
  supporting: `A cafe on ${brand.address.street} in ${brand.address.city}. The wall says ${brand.sign}. We keep a table for ${brand.audienceName} late — often until midnight. ${brand.rituals[0].detail}`,
  ctaLabel: 'Read our story',
  ctaTo: '/about',
  image: {
    alt: `The “${brand.sign}” sign on the wall at Fika Coffee.`,
    width: 960,
    height: 1200,
    src: '/images/about/pause-here-720.jpg',
    srcSetAvif: widths.map((w) => `/images/about/pause-here-${w}.avif ${w}w`).join(', '),
    srcSetWebp: widths.map((w) => `/images/about/pause-here-${w}.webp ${w}w`).join(', '),
    srcSetJpg: widths.map((w) => `/images/about/pause-here-${w}.jpg ${w}w`).join(', '),
    sizes: '(min-width: 768px) 50vw, 100vw',
    caption: `The ${brand.sign} sign.`,
    cropAspect: 'galleryPortrait',
    objectPosition: 'center 30%',
  },
}

/** Homepage + teasers — scannable in a few seconds. */
export const storyTeaserParagraphs = [
  brand.tagline,
  `A café on ${brand.address.street} in ${brand.address.city}. The wall says ${brand.sign}.`,
  `We keep a table for ${brand.audienceName} late—often until midnight.`,
]

/** Full About page — lead with published story or placeholder, then facts. */
export function storyPageParagraphs() {
  if (about.story) return [about.story, ...storyTeaserParagraphs.slice(1)]
  return storyTeaserParagraphs
}

export const spaceTeaserParagraphs = [
  `${brand.sign} on ${brand.address.street}, ${brand.address.barangay}, ${brand.address.city}.`,
  'Matcha at the counter, slow corners, and the pink room when you want a brighter seat.',
  brand.rituals[0].detail,
]
