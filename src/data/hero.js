import { brand } from './brand.js'

const widths = [480, 768, 1280, 1920]

export const hero = {
  eyebrow: `${brand.name} · ${brand.address.city}`,
  headline: brand.tagline,
  supporting:
    'Take a moment to pause here and say yes to good matcha and more time offline!',
  cta: 'Visit Us',
  image: {
    alt: 'Fika Coffee in Malaybalay City: Pause Here on the wall, the pink mirror nook, and matcha at the counter.',
    width: 1920,
    height: 1268,
    src: '/images/hero/editorial-1920.jpg',
    srcSetAvif: widths.map((w) => `/images/hero/editorial-${w}.avif ${w}w`).join(', '),
    srcSetWebp: widths.map((w) => `/images/hero/editorial-${w}.webp ${w}w`).join(', '),
    srcSetJpg: widths.map((w) => `/images/hero/editorial-${w}.jpg ${w}w`).join(', '),
    sizes: '100vw',
    objectPosition: '62% 42%',
  },
}
