import { galleryPhotos } from './gallery.js'

const pauseHere = galleryPhotos.find((photo) => photo.id === 'pause-here')

export const locationSection = {
  eyebrow: 'Location',
  heading: 'Come Visit Us',
  directionsLabel: 'Get directions',
  image: {
    alt: pauseHere?.alt ?? 'The Pause Here sign outside Fika Coffee.',
    width: pauseHere?.width ?? 780,
    height: pauseHere?.height ?? 1080,
    src: pauseHere?.src ?? '/images/gallery/pause-here-480.jpg',
    srcSetAvif: pauseHere?.srcSetAvif,
    srcSetWebp: pauseHere?.srcSetWebp,
    srcSetJpg: pauseHere?.srcSetJpg,
    sizes: '(min-width: 768px) 50vw, 100vw',
    caption: 'The Pause Here sign out front.',
    cropAspect: 'galleryPortrait',
    objectPosition: 'center 28%',
  },
}
