import { galleryPhotos } from './gallery.js'

const lamp = galleryPhotos.find((photo) => photo.id === 'lamp')

/* Full-bleed mood band — copy sits in a bottom gradient so the photo stays open above. */
export const atmosphere = {
  headline: 'Come for the Coffee. Stay for the Atmosphere.',
  ctaLabel: 'View gallery',
  ctaTo: '/gallery',
  image: {
    alt: lamp.alt,
    width: lamp.width,
    height: lamp.height,
    src: lamp.src,
    srcSetAvif: lamp.srcSetAvif,
    srcSetWebp: lamp.srcSetWebp,
    srcSetJpg: lamp.srcSetJpg,
    sizes: '100vw',
    objectPosition: 'center 40%',
    cropAspect: 'galleryPortrait',
  },
}
