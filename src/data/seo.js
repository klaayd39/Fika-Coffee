import { brand } from './brand.js'

const { name, address, sign } = brand

/* One share image for every page: a real lamp still life from the shop.
   1200×630, JPEG, so Open Graph crawlers can read it. */
export const ogImage = {
  path: '/images/og/fika.jpg',
  width: 1200,
  height: 630,
  alt: `A glowing lamp on a stack of novels at ${name} in ${address.city}.`,
}

/* Canonical and Open Graph URLs are built from the current origin at runtime.
   brand.website is still null, so these strings stay path-only.

   Every public route must render <Seo {...seoPages.*} /> (or equivalent props).
   Layout always includes LocalBusinessJsonLd; public/sitemap.xml and robots.txt
   must stay aligned with App routes. Visual refactors must not drop these. */
export const seoPages = {
  home: {
    title: `${name} · Cafe in ${address.city}`,
    description: `${name} is a cafe on ${address.street} in ${address.city}, ${address.province}. Pause here for coffee, matcha, and a table that stays open late.`,
    path: '/',
  },
  menu: {
    title: `Menu · ${name} in ${address.city}`,
    description: `Coffee, matcha, and treats at ${name} on ${address.street}. A peso price is shown only when it was listed on the shop menu.`,
    path: '/menu',
  },
  about: {
    title: `About · ${name} in ${address.city}`,
    description: `${name} is a cafe on ${address.street}, ${address.barangay}, ${address.city}. The wall says ${sign}.`,
    path: '/about',
  },
  gallery: {
    title: `Gallery · ${name} in ${address.city}`,
    description: `Photos from ${name} in ${address.city}: coffee, matcha, cookies, the pink room, and the ${sign} sign.`,
    path: '/gallery',
  },
  contact: {
    title: `Visit ${name} · ${address.street}, ${address.city}`,
    description: `Find ${name} on ${address.street}, ${address.barangay}, ${address.city}. Open Tuesday to Sunday, often until midnight.`,
    path: '/contact',
  },
}
