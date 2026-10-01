import { useMemo, useState } from 'react'
import GalleryCoverflow from '../gallery/GalleryCoverflow.jsx'
import Lightbox from '../gallery/Lightbox.jsx'
import { brand } from '../../data/brand.js'
import { galleryPhotos, photosInEditorialOrder } from '../../data/gallery.js'
import { DisplayTitle, Eyebrow } from '../ui/index.js'

export default function HomeGallerySection() {
  const photos = useMemo(() => photosInEditorialOrder(galleryPhotos), [])
  const [activeIndex, setActiveIndex] = useState(0)
  const [lightboxIndex, setLightboxIndex] = useState(null)

  function openPhoto(id) {
    const index = photos.findIndex((photo) => photo.id === id)
    if (index >= 0) setLightboxIndex(index)
  }

  function closePhoto() {
    setLightboxIndex(null)
  }

  function step(delta) {
    if (lightboxIndex == null || photos.length < 2) return
    setLightboxIndex((lightboxIndex + delta + photos.length) % photos.length)
  }

  return (
    <section
      id="gallery"
      aria-labelledby="home-gallery-heading"
      className="scroll-mt-header band-edge tone-inverse bg-espresso-950 text-cream-50 md:scroll-mt-28"
    >
      <div className="content-shell pb-4 pt-10 text-center md:pb-6 md:pt-14">
        <Eyebrow className="text-cream-200/75">Gallery</Eyebrow>
        <DisplayTitle id="home-gallery-heading" as="h2" size="xl" className="mt-4 text-balance text-cream-50">
          Moments at Our Café
        </DisplayTitle>
        {brand.facebook ? (
          <p className="mt-6 md:mt-8">
            <a
              href={brand.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-label inline-flex min-h-11 items-center rounded-full border border-cream-100/35 bg-espresso-900/50 px-6 py-2 text-cream-100 transition-colors duration-300 hover:border-cream-100/60 hover:bg-espresso-900/80"
            >
              Share your moment
              <span className="sr-only"> on Facebook (opens in a new tab)</span>
            </a>
          </p>
        ) : null}
      </div>

      <GalleryCoverflow
        photos={photos}
        activeIndex={activeIndex}
        onActiveChange={setActiveIndex}
        onOpenPhoto={openPhoto}
      />

      <Lightbox
        photos={photos}
        index={lightboxIndex}
        onClose={closePhoto}
        onStep={step}
      />
    </section>
  )
}
