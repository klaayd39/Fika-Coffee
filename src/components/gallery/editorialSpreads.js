/** Alternating editorial spreads: large + two small, then two small + large. */

export function buildEditorialSpreads(photos) {
  if (!photos.length) return []

  const spreads = []
  let index = 0
  let largeFirst = true

  while (index < photos.length) {
    const remaining = photos.length - index

    if (remaining === 1) {
      spreads.push({ type: 'full', photos: [photos[index]] })
      break
    }

    if (remaining === 2) {
      spreads.push({ type: 'duo', photos: photos.slice(index, index + 2) })
      break
    }

    spreads.push({
      type: largeFirst ? 'large-start' : 'large-end',
      photos: photos.slice(index, index + 3),
    })
    index += 3
    largeFirst = !largeFirst
  }

  return spreads
}
