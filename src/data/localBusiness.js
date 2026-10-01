import { brand } from './brand.js'
import { addressLines, openingHours } from './contact.js'
import { menuSections } from './products.js'
import { ogImage, seoPages } from './seo.js'

/* Day names in the published hours card, written as schema.org URLs.
   Monday is absent here because that day was not published. */
const schemaDays = {
  'Tuesday – Friday': [
    'https://schema.org/Tuesday',
    'https://schema.org/Wednesday',
    'https://schema.org/Thursday',
    'https://schema.org/Friday',
  ],
  'Saturday – Sunday': ['https://schema.org/Saturday', 'https://schema.org/Sunday'],
}

const logo = {
  path: '/images/brand/logo.png',
  width: 550,
  height: 260,
}

function absolute(origin, path) {
  return new URL(path, origin).href
}

function menuItem(product, origin) {
  const item = {
    '@type': 'MenuItem',
    name: product.name,
    description: product.description,
  }
  if (product.price != null) {
    item.offers = {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: product.currency,
    }
  }
  if (product.image?.src) {
    item.image = absolute(origin, product.image.src)
  }
  return item
}

/* One CafeOrCoffeeShop graph for the whole site.
   URL-typed fields are included only when a real URL exists.
   Telephone is text, so the same placeholder shown on the contact page is used. */
export function buildLocalBusinessGraph(origin) {
  const address = brand.address
  const menuUrl = absolute(origin, seoPages.menu.path)
  const cafeId = `${origin}/#cafe`
  const menuId = `${menuUrl}#menu`

  const cafe = {
    '@type': 'CafeOrCoffeeShop',
    '@id': cafeId,
    name: brand.name,
    logo: {
      '@type': 'ImageObject',
      url: absolute(origin, logo.path),
      width: logo.width,
      height: logo.height,
    },
    image: {
      '@type': 'ImageObject',
      url: absolute(origin, ogImage.path),
      width: ogImage.width,
      height: ogImage.height,
      caption: ogImage.alt,
    },
    hasMenu: { '@id': menuId },
  }

  if (addressLines) {
    cafe.address = {
      '@type': 'PostalAddress',
      streetAddress: [address.street, address.barangay].filter(Boolean).join(', '),
      addressLocality: address.city,
      addressRegion: address.province,
      postalCode: address.postalCode,
      addressCountry: 'PH',
    }
  }

  if (brand.phone) cafe.telephone = brand.phone
  if (brand.website) cafe.url = brand.website

  const hours = openingHours
    .filter((row) => row.opensAt && row.closesAt && schemaDays[row.days])
    .map((row) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: schemaDays[row.days],
      opens: row.opensAt,
      closes: row.closesAt,
    }))
  if (hours.length) cafe.openingHoursSpecification = hours

  const sameAs = [brand.facebook, brand.instagram].filter(
    (url) => typeof url === 'string' && url.startsWith('http'),
  )
  if (sameAs.length) cafe.sameAs = sameAs

  const menu = {
    '@type': 'Menu',
    '@id': menuId,
    name: `${brand.name} menu`,
    url: menuUrl,
    description: seoPages.menu.description,
    hasMenuSection: menuSections.map((section) => ({
      '@type': 'MenuSection',
      name: section.label,
      hasMenuItem: section.products.map((product) => menuItem(product, origin)),
    })),
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [cafe, menu],
  }
}
