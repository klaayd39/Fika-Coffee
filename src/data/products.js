/* Product copy is taken from the public Fika drinks menu photo and from
   drinks/food visible in the shop posts. Prices are only filled when the
   peso amount was readable on that menu. Everything else stays null. */

const productCrop = {
  'matcha-oat-latte': { cropAspect: 'productPortrait', objectPosition: 'center 48%' },
  'biscoff-oat-latte': { cropAspect: 'productPortrait', objectPosition: 'center 58%' },
  'cookie-box': { cropAspect: 'productSquare', objectPosition: 'center center' },
  'samyang-cheese-chicken': { cropAspect: 'productPortrait', objectPosition: 'center 42%' },
  'creamy-cheese-chicken-fillet': { cropAspect: 'productPortrait', objectPosition: 'center 45%' },
}

function image(slug, alt) {
  const widths = [480, 800]
  const crop = productCrop[slug] ?? {
    cropAspect: 'productPortrait',
    objectPosition: 'center center',
  }
  return {
    alt,
    width: 800,
    height: 1000,
    src: `/images/products/${slug}-800.jpg`,
    srcSetAvif: widths.map((w) => `/images/products/${slug}-${w}.avif ${w}w`).join(', '),
    srcSetWebp: widths.map((w) => `/images/products/${slug}-${w}.webp ${w}w`).join(', '),
    srcSetJpg: widths.map((w) => `/images/products/${slug}-${w}.jpg ${w}w`).join(', '),
    ...crop,
  }
}

export const products = [
  {
    id: 'matcha-oat-latte',
    name: 'Matcha oat latte',
    category: 'Matcha',
    description: 'Sifted at the counter and finished with oat milk.',
    price: null,
    currency: 'PHP',
    featured: true,
    image: image(
      'matcha-oat-latte',
      'Iced matcha oat latte in a clear glass with creamy oat milk at Fika Coffee.',
    ),
  },
  {
    id: 'americano',
    name: 'Americano',
    category: 'Coffee',
    description: 'The first coffee on the drinks menu.',
    price: null,
    currency: 'PHP',
    featured: false,
    image: null,
  },
  {
    id: 'biscoff-oat-latte',
    name: 'Biscoff oat latte',
    category: 'Coffee',
    description: 'Oat latte with Biscoff, from the drinks menu.',
    price: 95,
    currency: 'PHP',
    featured: true,
    image: image('biscoff-oat-latte', 'Iced drink in a Fika cup with a pink straw.'),
  },
  {
    id: 'spanish-oat-latte',
    name: 'Spanish oat latte',
    category: 'Coffee',
    description: 'Spanish oat latte, listed on the drinks menu.',
    price: null,
    currency: 'PHP',
    featured: false,
    image: null,
  },
  {
    id: 'egg-coffee',
    name: 'Egg coffee',
    category: 'Coffee',
    description: 'On the coffee list at Fika.',
    price: null,
    currency: 'PHP',
    featured: false,
    image: null,
  },
  {
    id: 'samyang-cheese-chicken',
    name: 'Samyang with cheese and chicken fillet',
    category: 'Food',
    description: 'Spicy Samyang noodles with creamy cheese and crispy chicken fillet.',
    price: null,
    currency: 'PHP',
    featured: true,
    image: image(
      'samyang-cheese-chicken',
      'Samyang noodles with cheese sauce and breaded chicken fillet in a pink bowl at Fika Coffee.',
    ),
  },
  {
    id: 'creamy-cheese-chicken-fillet',
    name: 'Creamy cheese chicken fillet',
    category: 'Food',
    description: 'Golden fried chicken fillet finished with rich creamy cheese sauce.',
    price: null,
    currency: 'PHP',
    featured: true,
    image: image(
      'creamy-cheese-chicken-fillet',
      'Creamy cheese chicken fillet with golden crispy strips on a pink plate at Fika Coffee.',
    ),
  },
  {
    id: 'cookie-box',
    name: 'Cookie box',
    category: 'Treats',
    description: 'Packed to take home, tied with a thank-you card.',
    price: null,
    currency: 'PHP',
    featured: true,
    image: image(
      'cookie-box',
      'Cookie in a clear gift box with a ribbon and thank-you card at Fika Coffee.',
    ),
  },
]

export const featuredProducts = products.filter((product) => product.featured)

/** Homepage favorites band — order and count fixed for editorial layout (3 items). */
const HOME_FEATURED_DRINK_IDS = [
  'matcha-oat-latte',
  'samyang-cheese-chicken',
  'creamy-cheese-chicken-fillet',
]

export const homeFeaturedDrinks = HOME_FEATURED_DRINK_IDS.map((id) =>
  products.find((product) => product.id === id),
).filter(Boolean)

/* Coffee is a heading on the drinks menu. Matcha and Treats are items the
   shop actually shows. Food and pastries are not sections here — no confirmed
   menu exists for them. */
export const menuSections = [
  { id: 'coffee', label: 'Coffee' },
  { id: 'matcha', label: 'Matcha' },
  { id: 'treats', label: 'Treats' },
  { id: 'food', label: 'Food' },
].map((section) => ({
  ...section,
  products: products.filter((product) => product.category === section.label),
}))

export function formatPrice(product, missingLabel = 'Ask in store') {
  if (product.price == null) return missingLabel
  const symbol = product.currency === 'PHP' ? '₱' : ''
  return `${symbol}${product.price}`
}
