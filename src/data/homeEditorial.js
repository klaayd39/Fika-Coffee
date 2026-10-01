import { about, spaceTeaserParagraphs, storyTeaserParagraphs } from './about.js'
import { brand } from './brand.js'
import { galleryPhotos } from './gallery.js'

const editorialSizes = '(min-width: 768px) 50vw, 100vw'

function fromGallery(photo, caption) {
  return {
    alt: photo.alt,
    width: photo.width,
    height: photo.height,
    src: photo.src,
    srcSetAvif: photo.srcSetAvif,
    srcSetWebp: photo.srcSetWebp,
    srcSetJpg: photo.srcSetJpg,
    sizes: editorialSizes,
    caption,
    cropAspect: photo.cropAspect,
    objectPosition: photo.objectPosition,
  }
}

const sofa = galleryPhotos.find((photo) => photo.id === 'sofa')

export const homeEditorialBands = [
  {
    id: 'our-story',
    reverse: false,
    surface: 'bg-surface',
    eyebrow: 'Our story',
    heading: 'A Space Made for Coffee & Conversation.',
    paragraphs: storyTeaserParagraphs,
    image: {
      ...about.image,
      sizes: editorialSizes,
    },
  },
  {
    id: 'the-space',
    reverse: true,
    surface: 'bg-canvas',
    eyebrow: 'The café',
    heading: `${brand.sign}, on ${brand.address.street}.`,
    paragraphs: spaceTeaserParagraphs,
    ctaLabel: 'Visit us',
    ctaTo: '#contact',
    image: sofa
      ? fromGallery(sofa, 'The pink room at Fika Coffee.')
      : about.image,
  },
]
