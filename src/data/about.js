import { brand } from './brand.js'
import { galleryPhotos } from './gallery.js'
import { products } from './products.js'

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

/** About page hero — layout inspired by editorial café pages; copy stays on-brand. */
export const aboutPageIntro = `${brand.name} on ${brand.address.street} in ${brand.address.city}. ${brand.tagline}`

export const aboutPageLeadEyebrow = `Est. ${brand.established}`

export const aboutPageLeadHeadline =
  'A café environment unlike any other in Malaybalay City.'

export const aboutPageRightTitle = 'The perfect place to take your fika.'

export function aboutPageRightParagraphs() {
  return [...storyPageParagraphs(), spaceTeaserParagraphs[1]]
}

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

const knollCategoryHref = {
  Coffee: '/menu?category=coffee',
  Matcha: '/menu?category=matcha',
  Treats: '/menu?category=treats',
  Drinks: '/menu?category=matcha',
}

function knollFromProduct(product) {
  if (!product?.image) return null
  return {
    id: product.id,
    label: product.name,
    href: knollCategoryHref[product.category] ?? '/menu',
    image: {
      ...product.image,
      sizes: '(min-width: 768px) 22vw, 45vw',
      objectPosition: 'center 20%',
    },
  }
}

const matchaPour = galleryPhotos.find((photo) => photo.id === 'matcha-pour')

/** Knolled overhead tiles — strict grid, top-down crops (flat-lay UI). */
export const aboutKnollItems = [
  knollFromProduct(products.find((p) => p.id === 'matcha-oat-latte')),
  knollFromProduct(products.find((p) => p.id === 'biscoff-oat-latte')),
  knollFromProduct(products.find((p) => p.id === 'cookie-box')),
  matchaPour
    ? {
        id: 'matcha-pour',
        label: 'Matcha at the counter',
        href: '/menu?category=matcha',
        image: {
          alt: matchaPour.alt,
          width: matchaPour.width,
          height: matchaPour.height,
          src: matchaPour.src,
          srcSetAvif: matchaPour.srcSetAvif,
          srcSetWebp: matchaPour.srcSetWebp,
          srcSetJpg: matchaPour.srcSetJpg,
          sizes: '(min-width: 768px) 22vw, 45vw',
          objectPosition: 'center 35%',
        },
      }
    : null,
].filter(Boolean)

export const aboutKnollHeading = 'Knolled at the counter'
export const aboutKnollIntro =
  'Overhead flat lay — matcha, coffee, and treats aligned the way we plate them at Fika.'
