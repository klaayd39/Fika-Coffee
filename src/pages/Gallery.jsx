import { useEffect, useMemo, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { buildEditorialSpreads } from '../components/gallery/editorialSpreads.js'
import GalleryEditorialGrid from '../components/gallery/GalleryEditorialGrid.jsx'
import Lightbox from '../components/gallery/Lightbox.jsx'
import Seo from '../components/seo/Seo.jsx'
import { BodyText, Button, DisplayTitle } from '../components/ui/index.js'
import { brand } from '../data/brand.js'
import {
  galleryCategories,
  galleryCategoryLabel,
  galleryPhotos,
  photosInEditorialOrder,
} from '../data/gallery.js'
import { seoPages } from '../data/seo.js'

const filters = [{ id: 'all', label: 'All' }, ...galleryCategories]

export default function Gallery() {
  const [searchParams, setSearchParams] = useSearchParams()
  const requested = searchParams.get('category')
  const activeId = galleryCategories.some((category) => category.id === requested) ? requested : 'all'
  const photoId = searchParams.get('photo')
  const filtered = galleryPhotos.filter(
    (photo) => activeId === 'all' || photo.category === activeId,
  )
  const visible = useMemo(
    () => (activeId === 'all' ? photosInEditorialOrder(filtered) : filtered),
    [activeId, filtered],
  )
  const spreads = useMemo(() => buildEditorialSpreads(visible), [visible])
  const openIndex = visible.findIndex((photo) => photo.id === photoId)
  const lastPhoto = useRef(photoId)

  useEffect(() => {
    if (photoId) lastPhoto.current = photoId
  }, [photoId])

  useEffect(() => {
    if (photoId || !lastPhoto.current) return
    const id = lastPhoto.current
    const timer = window.setTimeout(() => {
      document.getElementById(`gallery-${id}`)?.focus()
    }, 0)
    return () => window.clearTimeout(timer)
  }, [photoId])

  const countLabel = `${visible.length} ${visible.length === 1 ? 'photo' : 'photos'}`
  const status =
    activeId === 'all' ? countLabel : `${countLabel} in ${galleryCategoryLabel(activeId)}`

  useEffect(() => {
    if (requested && !galleryCategories.some((category) => category.id === requested)) {
      setSearchParams({}, { replace: true })
    }
  }, [requested, setSearchParams])

  function selectCategory(id) {
    const next = new URLSearchParams()
    if (id !== 'all') next.set('category', id)
    setSearchParams(next, { replace: true })
  }

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
    if (visible.length < 2 || openIndex < 0) return
    const nextIndex = (openIndex + delta + visible.length) % visible.length
    const next = new URLSearchParams(searchParams)
    next.set('photo', visible[nextIndex].id)
    setSearchParams(next, { replace: true })
  }

  return (
    <main className="bg-canvas">
      <Seo {...seoPages.gallery} />
      <div className="content-shell pt-16 pb-10 md:pt-28 md:pb-14">
        <header className="max-w-prose">
          <DisplayTitle as="h1" size="page">
            Gallery
          </DisplayTitle>
          <BodyText large className="mt-6 max-w-prose">
            Coffee, matcha at the counter, cookies to take home, guests in the pink room, and the
            shop on {brand.address.street}.
          </BodyText>
        </header>

        <div
          role="group"
          aria-label="Filter gallery by category"
          className="mt-14 flex flex-wrap gap-x-6 gap-y-3 md:mt-16"
        >
          {filters.map((filter) => {
            const selected = filter.id === activeId
            return (
              <Button
                key={filter.id}
                variant={selected ? 'textActive' : 'text'}
                aria-pressed={selected}
                onClick={() => selectCategory(filter.id)}
              >
                {filter.label}
              </Button>
            )
          })}
        </div>

        <p className="mt-5 text-sm text-ink-muted" aria-live="polite">
          {status}
        </p>
      </div>

      <div className="band-edge bg-band-warm pb-24 pt-12 md:pb-40 md:pt-20">
        <div className="content-shell-wide">
          {visible.length ? (
            <GalleryEditorialGrid spreads={spreads} onOpen={openPhoto} />
          ) : (
            <p className="text-ink-soft">No photos in this category yet.</p>
          )}
        </div>
      </div>

      <Lightbox
        photos={visible}
        index={openIndex >= 0 ? openIndex : null}
        onClose={closePhoto}
        onStep={step}
      />
    </main>
  )
}
