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

/** Flat-lay About showcase (home + /about). */
export const aboutShowcaseBody =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London, took a 1914 Cicero translation and scrambled it to make dummy text for Letraset's Body Type sheets. It has survived not only many decades, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised thanks to these sheets and more recently with desktop publishing software like Aldus PageMaker and Microsoft Word including versions of Lorem Ipsum."

/** Generated editorial still-life — props on the edges, open center for copy. */
export const aboutShowcaseBackground = {
  alt: '',
  width: 1920,
  height: 1080,
  src: '/images/about/showcase-bg-1280.jpg',
  srcSetAvif:
    '/images/about/showcase-bg-960.avif 960w, /images/about/showcase-bg-1280.avif 1280w, /images/about/showcase-bg-1920.avif 1920w',
  srcSetWebp:
    '/images/about/showcase-bg-960.webp 960w, /images/about/showcase-bg-1280.webp 1280w, /images/about/showcase-bg-1920.webp 1920w',
  srcSetJpg:
    '/images/about/showcase-bg-960.jpg 960w, /images/about/showcase-bg-1280.jpg 1280w, /images/about/showcase-bg-1920.jpg 1920w',
  sizes: '100vw',
  objectPosition: 'center center',
}

