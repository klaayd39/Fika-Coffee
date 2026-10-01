import { cn } from '../../utils/cn.js'
import GalleryPhotoTile from './GalleryPhotoTile.jsx'

function SpreadLargeStart({ photos, onOpen, startIndex }) {
  const [large, top, bottom] = photos

  return (
    <div className="grid gap-8 sm:gap-8 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-0">
      <div className="lg:col-span-7">
        <GalleryPhotoTile
          photo={large}
          span="large"
          onOpen={onOpen}
          priority={startIndex < 2}
        />
      </div>
      <div className="flex flex-col gap-6 sm:gap-8 lg:col-span-5 lg:justify-between">
        <GalleryPhotoTile
          photo={top}
          span="small"
          onOpen={onOpen}
          priority={startIndex + 1 < 2}
        />
        <GalleryPhotoTile
          photo={bottom}
          span="small"
          onOpen={onOpen}
          priority={startIndex + 2 < 2}
        />
      </div>
    </div>
  )
}

function SpreadLargeEnd({ photos, onOpen, startIndex }) {
  const [top, bottom, large] = photos

  return (
    <div className="grid gap-8 sm:gap-8 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-0">
      <div className="order-2 flex flex-col gap-6 sm:gap-8 lg:order-1 lg:col-span-5 lg:justify-between">
        <GalleryPhotoTile
          photo={top}
          span="small"
          onOpen={onOpen}
          priority={startIndex < 2}
        />
        <GalleryPhotoTile
          photo={bottom}
          span="small"
          onOpen={onOpen}
          priority={startIndex + 1 < 2}
        />
      </div>
      <div className="order-1 lg:order-2 lg:col-span-7">
        <GalleryPhotoTile
          photo={large}
          span="large"
          onOpen={onOpen}
          priority={startIndex + 2 < 2}
        />
      </div>
    </div>
  )
}

function SpreadFull({ photos, onOpen, startIndex }) {
  return (
    <div className="bleed-full">
      <GalleryPhotoTile
        photo={photos[0]}
        span="full"
        onOpen={onOpen}
        priority={startIndex < 2}
      />
    </div>
  )
}

function SpreadDuo({ photos, onOpen, startIndex }) {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-8">
      {photos.map((photo, i) => (
        <GalleryPhotoTile
          key={photo.id}
          photo={photo}
          span="duo"
          onOpen={onOpen}
          priority={startIndex + i < 2}
        />
      ))}
    </div>
  )
}

export default function GalleryEditorialGrid({ spreads, onOpen, className }) {
  let tileIndex = 0

  return (
    <div className={cn('flex flex-col gap-16 md:gap-20 lg:gap-24', className)}>
      {spreads.map((spread) => {
        const startIndex = tileIndex
        const props = { photos: spread.photos, onOpen, startIndex }
        tileIndex += spread.photos.length

        const key = spread.photos.map((p) => p.id).join('-')

        switch (spread.type) {
          case 'large-start':
            return <SpreadLargeStart key={key} {...props} />
          case 'large-end':
            return <SpreadLargeEnd key={key} {...props} />
          case 'full':
            return <SpreadFull key={key} {...props} />
          case 'duo':
            return <SpreadDuo key={key} {...props} />
          default:
            return null
        }
      })}
    </div>
  )
}
