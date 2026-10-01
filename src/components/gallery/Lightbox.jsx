import { useEffect, useRef } from 'react'
import { galleryCategoryLabel } from '../../data/gallery.js'
import { cn } from '../../utils/cn.js'

const controlClass =
  'tap-target text-sm font-normal text-cream-100 underline decoration-cream-100/40 underline-offset-4 transition-[color,text-decoration-color] duration-300 hover:text-cream-50 hover:decoration-cream-50 focus-visible:outline-offset-4'

export default function Lightbox({ photos, index, onClose, onStep }) {
  const dialogRef = useRef(null)
  const closeRef = useRef(null)
  const wasOpen = useRef(false)
  const photo = index == null ? null : photos[index]

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (index == null) {
      if (dialog.open) dialog.close()
      wasOpen.current = false
      return
    }

    if (!dialog.open) dialog.showModal()
    if (!wasOpen.current) closeRef.current?.focus()
    wasOpen.current = true
  }, [index])

  useEffect(() => {
    return () => {
      dialogRef.current?.close()
    }
  }, [])

  const label = photo ? galleryCategoryLabel(photo.category) : ''
  const position = photo ? `${index + 1} of ${photos.length}` : ''

  return (
    <dialog
      ref={dialogRef}
      className="gallery-dialog"
      aria-labelledby={photo ? 'gallery-lightbox-caption' : undefined}
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
      onKeyDown={(event) => {
        if (event.key === 'ArrowRight') {
          event.preventDefault()
          onStep(1)
        }
        if (event.key === 'ArrowLeft') {
          event.preventDefault()
          onStep(-1)
        }
      }}
    >
      {photo && (
        <div
          className="flex h-full items-center justify-center p-4 pt-[max(3.5rem,env(safe-area-inset-top,0px))] pb-[max(5.5rem,env(safe-area-inset-bottom,0px))] sm:p-8 sm:pb-8 sm:pt-8"
          onClick={(event) => {
            if (event.target === event.currentTarget) onClose()
          }}
        >
          <figure
            className="flex max-h-full w-full max-w-5xl flex-col items-start"
            key={photo.id}
          >
            <picture>
              <source type="image/avif" srcSet={photo.fullAvif} />
              <source type="image/webp" srcSet={photo.full} />
              <img
                src={photo.fullJpg}
                width={photo.width}
                height={photo.height}
                alt={photo.alt}
                decoding="async"
                className="max-h-[min(58dvh,52rem)] w-auto max-w-full object-contain sm:max-h-[min(78dvh,52rem)]"
              />
            </picture>
            <figcaption
              id="gallery-lightbox-caption"
              className="mt-4 max-w-xl text-left text-sm text-cream-100"
            >
              <span className="text-label text-2xs text-cream-200">{label}</span>
              <span className="mt-1 block text-base text-cream-50">{photo.alt}</span>
              <span className="mt-1 block text-cream-200" aria-live="polite">
                {position}
              </span>
            </figcaption>
          </figure>
        </div>
      )}

      <button
        ref={closeRef}
        type="button"
        className={cn(
          controlClass,
          'absolute right-4 top-[max(1rem,env(safe-area-inset-top,0px))] z-10 sm:right-8 sm:top-8',
        )}
        onClick={onClose}
      >
        Close
      </button>

      {photos.length > 1 ? (
        <div className="absolute inset-x-4 bottom-[max(1.5rem,env(safe-area-inset-bottom,0px))] z-10 flex items-center justify-between gap-4 sm:inset-x-8 sm:bottom-8">
          <button type="button" className={controlClass} onClick={() => onStep(-1)}>
            Previous
          </button>
          <button type="button" className={controlClass} onClick={() => onStep(1)}>
            Next
          </button>
        </div>
      ) : null}
    </dialog>
  )
}
