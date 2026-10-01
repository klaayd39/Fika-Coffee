import { about, storyTeaserParagraphs } from './about.js'

const editorialSizes = '(min-width: 768px) 50vw, 100vw'

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
]
