import { useCallback, useEffect, useRef, useState } from 'react'
import { cn } from '../../utils/cn.js'
import { coverImageClass, objectPositionStyle } from '../../utils/imageCrop.js'

const SWIPE_THRESHOLD_PX = 48

function wrapIndex(index, length) {
  if (!length) return 0
  return ((index % length) + length) % length
}

function offsetFor(index, active, length) {
  let diff = index - active
  if (diff > length / 2) diff -= length
  if (diff < -length / 2) diff += length
  return diff
}

export default function GalleryCoverflow({ photos, activeIndex, onActiveChange, onOpenPhoto }) {
  const stageRef = useRef(null)
  const dragRef = useRef(null)
  const suppressClickRef = useRef(false)
  const [dragOffset, setDragOffset] = useState(0)

  const go = useCallback(
    (delta) => {
      if (!photos.length) return
      onActiveChange(wrapIndex(activeIndex + delta, photos.length))
    },
    [activeIndex, onActiveChange, photos.length],
  )

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'ArrowRight') {
        event.preventDefault()
        go(1)
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        go(-1)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [go])

  function onPointerDown(event) {
    if (event.pointerType === 'mouse' && event.button !== 0) return
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      moved: false,
    }
    stageRef.current?.setPointerCapture(event.pointerId)
  }

  function onPointerMove(event) {
    const drag = dragRef.current
    if (!drag || drag.pointerId !== event.pointerId) return
    const delta = event.clientX - drag.startX
    if (Math.abs(delta) > 8) drag.moved = true
    setDragOffset(delta)
  }

  function onPointerUp(event) {
    const drag = dragRef.current
    if (!drag || drag.pointerId !== event.pointerId) return
    stageRef.current?.releasePointerCapture(event.pointerId)
    const delta = event.clientX - drag.startX
    setDragOffset(0)

    if (drag.moved) {
      suppressClickRef.current = true
      window.setTimeout(() => {
        suppressClickRef.current = false
      }, 320)
      if (delta <= -SWIPE_THRESHOLD_PX) go(1)
      else if (delta >= SWIPE_THRESHOLD_PX) go(-1)
    }

    dragRef.current = null
  }

  function onSlideClick(index, offset) {
    if (suppressClickRef.current) return
    if (offset === 0) {
      onOpenPhoto(photos[index].id)
      return
    }
    onActiveChange(index)
  }

  if (!photos.length) return null

  return (
    <div className="gallery-coverflow">
      <div
        ref={stageRef}
        className="gallery-coverflow__stage"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        aria-roledescription="carousel"
        aria-label="Gallery photos. Swipe or use arrow keys to browse."
        style={{ '--drag': `${dragOffset}px` }}
      >
        <ul className="gallery-coverflow__track">
          {photos.map((photo, index) => {
            const offset = offsetFor(index, activeIndex, photos.length)
            if (Math.abs(offset) > 2) return null

            const isCenter = offset === 0
            const sizes = isCenter
              ? '(min-width: 768px) 22rem, 78vw'
              : '(min-width: 768px) 14rem, 52vw'

            return (
              <li
                key={photo.id}
                className={cn(
                  'gallery-coverflow__slide',
                  isCenter && 'gallery-coverflow__slide--center',
                )}
                data-offset={offset}
                style={{ zIndex: 20 - Math.abs(offset) }}
              >
                <button
                  type="button"
                  id={`gallery-${photo.id}`}
                  aria-label={photo.alt}
                  aria-current={isCenter ? 'true' : undefined}
                  onClick={() => onSlideClick(index, offset)}
                  className={cn(
                    'gallery-coverflow__frame overflow-hidden bg-espresso-900/40 shadow-[0_24px_48px_-28px_rgb(0_0_0/0.65)]',
                    isCenter ? 'gallery-coverflow__frame--hero aspect-[3/4]' : 'aspect-square',
                  )}
                >
                  <picture className="block size-full">
                    <source type="image/avif" srcSet={photo.srcSetAvif} sizes={sizes} />
                    <source type="image/webp" srcSet={photo.srcSetWebp} sizes={sizes} />
                    <img
                      src={photo.src}
                      srcSet={photo.srcSetJpg}
                      sizes={sizes}
                      width={photo.width}
                      height={photo.height}
                      alt={photo.alt}
                      decoding="async"
                      draggable={false}
                      style={objectPositionStyle(photo)}
                      className={coverImageClass}
                    />
                  </picture>
                </button>
              </li>
            )
          })}
        </ul>
      </div>

      <p className="gallery-coverflow__hint text-center text-sm text-cream-200/75">
        Swipe or use arrow keys · Tap the center photo to enlarge
      </p>
    </div>
  )
}
