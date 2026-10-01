import { cn } from './cn.js'

/** Tailwind aspect classes for editorial crops (always paired with object-cover). */
export const cropAspect = {
  portrait: 'aspect-[4/5]',
  square: 'aspect-square',
  landscape: 'aspect-[16/10]',
  wide: 'aspect-[3/2]',
  cinematic: 'aspect-[21/9] sm:aspect-[16/10] md:aspect-[21/9]',
  hero:
    'aspect-[4/5] w-full min-h-[100dvh] md:aspect-[3/2] md:min-h-[min(72vh,40rem)] lg:min-h-[min(85vh,52rem)]',
  productPortrait: 'aspect-[4/5]',
  productSquare: 'aspect-square',
  galleryPortrait: 'aspect-[4/5]',
  galleryLandscape: 'aspect-[16/10]',
  galleryWide: 'aspect-[21/9]',
  galleryDuo: 'aspect-[4/5] sm:aspect-[3/2]',
}

export function objectPositionStyle(image) {
  const pos = image?.objectPosition
  return pos ? { objectPosition: pos } : undefined
}

export function cropFrameClass(aspectKey, extra) {
  return cn(cropAspect[aspectKey] ?? cropAspect.portrait, extra)
}

/** Gallery frame from photo metadata and tile span. */
export function galleryCropFrame(photo, span) {
  if (photo?.cropAspect && cropAspect[photo.cropAspect]) {
    return cropAspect[photo.cropAspect]
  }
  const landscape = photo.width / photo.height > 1.15
  if (span === 'full') return landscape ? cropAspect.galleryWide : cropAspect.galleryPortrait
  if (span === 'large') return landscape ? cropAspect.galleryLandscape : cropAspect.galleryPortrait
  if (span === 'duo') return cropAspect.galleryDuo
  return landscape ? cropAspect.wide : cropAspect.galleryPortrait
}

export const coverImageClass = 'size-full object-cover'
