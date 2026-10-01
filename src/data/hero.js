import { brand } from './brand.js'

const widths = [480, 768]

export const hero = {
  eyebrow: `${brand.name} · ${brand.address.city}`,
  headline: brand.tagline,
  supporting:
    'Take a moment to pause here and say yes to good matcha and more time offline!',
  primaryCta: 'View our menu',
  secondaryCta: 'Visit Us',
  image: {
    alt: 'Fika Coffee in Malaybalay City: the pink storefront, warm lamps inside, and the Pause Here sign.',
    width: 768,
    height: 1024,
    src: '/images/hero/editorial-768.jpg',
    srcSetAvif: widths.map((w) => `/images/hero/editorial-${w}.avif ${w}w`).join(', '),
    srcSetWebp: widths.map((w) => `/images/hero/editorial-${w}.webp ${w}w`).join(', '),
    srcSetJpg: widths.map((w) => `/images/hero/editorial-${w}.jpg ${w}w`).join(', '),
    sizes: '100vw',
    objectPosition: 'center 36%',
  },
}
