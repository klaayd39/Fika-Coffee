/* Crops from Fika’s own Facebook photos. No stock images.
   Widths stay at or below the crop’s native size so nothing is upscaled.
   objectPosition keeps cups, faces, signs, and food in frame under object-cover. */

function sources(slug, widths) {
  const set = (ext) => widths.map((w) => `/images/gallery/${slug}-${w}.${ext} ${w}w`).join(', ')
  const largest = widths[widths.length - 1]
  return {
    src: `/images/gallery/${slug}-${widths[0]}.jpg`,
    srcSetAvif: set('avif'),
    srcSetWebp: set('webp'),
    srcSetJpg: set('jpg'),
    fullAvif: `/images/gallery/${slug}-${largest}.avif`,
    full: `/images/gallery/${slug}-${largest}.webp`,
    fullJpg: `/images/gallery/${slug}-${largest}.jpg`,
  }
}

export const galleryCategories = [
  { id: 'coffee', label: 'Coffee' },
  { id: 'drinks', label: 'Drinks' },
  { id: 'food', label: 'Food' },
  { id: 'interior', label: 'Interior' },
  { id: 'people', label: 'People' },
  { id: 'exterior', label: 'Exterior' },
]

export const galleryPhotos = [
  {
    id: 'lamp',
    category: 'interior',
    alt: 'A glowing lamp on a stack of novels at Fika Coffee.',
    width: 1150,
    height: 1350,
    cropAspect: 'galleryPortrait',
    objectPosition: 'center 42%',
    ...sources('lamp', [640, 960, 1150]),
  },
  {
    id: 'matcha-pour',
    category: 'drinks',
    alt: 'Oat milk poured over sifted matcha at the Fika Coffee counter.',
    width: 1400,
    height: 778,
    cropAspect: 'galleryLandscape',
    objectPosition: 'center 55%',
    ...sources('matcha-pour', [640, 960, 1400]),
  },
  {
    id: 'sofa',
    category: 'people',
    alt: 'The hot pink sofa in the pink room at Fika Coffee, with a guest holding a Fika cup.',
    width: 860,
    height: 1160,
    cropAspect: 'galleryPortrait',
    objectPosition: 'center 38%',
    ...sources('sofa', [480, 860]),
  },
  {
    id: 'cookies',
    category: 'food',
    alt: 'Cookies in clear boxes, tied with black ribbon and a thank-you card.',
    width: 1400,
    height: 583,
    cropAspect: 'galleryWide',
    objectPosition: 'center 48%',
    ...sources('cookies', [640, 960, 1400]),
  },
  {
    id: 'pause-here',
    category: 'exterior',
    alt: 'The Pause Here sign and a wall lamp outside Fika Coffee.',
    width: 780,
    height: 1080,
    cropAspect: 'galleryPortrait',
    objectPosition: 'center 32%',
    ...sources('pause-here', [480, 780]),
  },
  {
    id: 'iced-cup',
    category: 'coffee',
    alt: 'An iced coffee in a clear Fika cup with a pink straw.',
    width: 820,
    height: 860,
    cropAspect: 'square',
    objectPosition: 'center 52%',
    ...sources('iced-cup', [480, 820]),
  },
  {
    id: 'window',
    category: 'exterior',
    alt: 'Pink metal window grille on the front of Fika Coffee.',
    width: 900,
    height: 700,
    cropAspect: 'galleryLandscape',
    objectPosition: 'center center',
    ...sources('window', [480, 720, 900]),
  },
]

export function galleryCategoryLabel(id) {
  return galleryCategories.find((category) => category.id === id)?.label ?? id
}

/** Default “All” view — category mix first, then alternating spreads. */
export const galleryEditorialOrder = [
  'sofa',
  'iced-cup',
  'lamp',
  'window',
  'pause-here',
  'matcha-pour',
  'cookies',
]

export function photosInEditorialOrder(photos, order = galleryEditorialOrder) {
  const byId = new Map(photos.map((photo) => [photo.id, photo]))
  const ordered = order.map((id) => byId.get(id)).filter(Boolean)
  const rest = photos.filter((photo) => !order.includes(photo.id))
  return [...ordered, ...rest]
}
