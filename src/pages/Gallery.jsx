import { useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import GalleryCoverflow from '../components/gallery/GalleryCoverflow.jsx'
import Lightbox from '../components/gallery/Lightbox.jsx'
import Seo from '../components/seo/Seo.jsx'
import { brand } from '../data/brand.js'
import { galleryPhotos, photosInEditorialOrder } from '../data/gallery.js'
import { seoPages } from '../data/seo.js'

export default function Gallery() {
  const [searchParams, setSearchParams] = useSearchParams()
  const photoId = searchParams.get('photo')
  const photos = useMemo(() => photosInEditorialOrder(galleryPhotos), [])
  const [activeIndex, setActiveIndex] = useState(0)
  const lastPhoto = useRef(photoId)

  const openIndex = photos.findIndex((photo) => photo.id === photoId)

  useEffect(() => {
    if (photoId) lastPhoto.current = photoId
  }, [photoId])

  useEffect(() => {
    if (!photoId) return
    const index = photos.findIndex((photo) => photo.id === photoId)
    if (index >= 0) setActiveIndex(index)
  }, [photoId, photos])

  useEffect(() => {
    if (photoId || !lastPhoto.current) return
    const id = lastPhoto.current
    const timer = window.setTimeout(() => {
      document.getElementById(`gallery-${id}`)?.focus()
    }, 0)
    return () => window.clearTimeout(timer)
  }, [photoId])

  useEffect(() => {
    if (!searchParams.get('category')) return
    const next = new URLSearchParams(searchParams)
    next.delete('category')
    setSearchParams(next, { replace: true })
  }, [searchParams, setSearchParams])

  function openPhoto(id) {
    const next = new URLSearchParams(searchParams)
    next.set('photo', id)
    setSearchParams(next)
  }

  function closePhoto() {
    const next = new URLSearchParams(searchParams)
    next.delete('photo')
    setSearchParams(next, { replace: true })
  }

  function step(delta) {
    if (photos.length < 2 || openIndex < 0) return
    const nextIndex = (openIndex + delta + photos.length) % photos.length
    const next = new URLSearchParams(searchParams)
    next.set('photo', photos[nextIndex].id)
    setSearchParams(next, { replace: true })
  }

  return (
    <div className="tone-inverse min-h-dvh bg-espresso-950 text-cream-50">
      <Seo {...seoPages.gallery} />

      <div data-reveal className="page-top content-shell pb-6 pt-2 text-center md:pb-8">
        <h1 className="text-display-xl text-balance text-cream-50">Moments at Our Café</h1>
        {brand.facebook ? (
          <p className="mt-8">
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
        index={openIndex >= 0 ? openIndex : null}
        onClose={closePhoto}
        onStep={step}
      />
    </div>
  )
}
