import { useEffect } from 'react'
import { brand } from '../../data/brand.js'
import { ogImage } from '../../data/seo.js'

/* Sets document title, meta description, canonical, Open Graph, and Twitter tags.
   Do not remove or bypass on public pages — crawlers and shares depend on it. */

function absoluteUrl(path) {
  return new URL(path, window.location.origin).href
}

function upsertMeta(attr, key, content) {
  const selector = `meta[${attr}="${key}"]`
  const existing = [...document.head.querySelectorAll(selector)]
  if (!content) {
    existing.forEach((el) => el.remove())
    return
  }
  const el = existing[0] ?? document.createElement('meta')
  if (!existing[0]) {
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  existing.slice(1).forEach((extra) => extra.remove())
  el.dataset.seo = ''
  el.setAttribute('content', content)
}

function upsertCanonical(href) {
  const existing = [...document.head.querySelectorAll('link[rel="canonical"]')]
  if (!href) {
    existing.forEach((el) => el.remove())
    return
  }
  const el = existing[0] ?? document.createElement('link')
  if (!existing[0]) {
    el.rel = 'canonical'
    document.head.appendChild(el)
  }
  existing.slice(1).forEach((extra) => extra.remove())
  el.dataset.seo = ''
  el.href = href
}

export default function Seo({
  title,
  description,
  path,
  image = ogImage.path,
  imageAlt = ogImage.alt,
  imageWidth = ogImage.width,
  imageHeight = ogImage.height,
  type = 'website',
  index = true,
}) {
  useEffect(() => {
    const url = absoluteUrl(path)
    const imageUrl = absoluteUrl(image)

    document.title = title
    upsertMeta('name', 'description', description)
    upsertCanonical(index ? url : null)
    upsertMeta('name', 'robots', index ? null : 'noindex')

    upsertMeta('property', 'og:title', title)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:image', imageUrl)
    upsertMeta('property', 'og:image:alt', imageAlt)
    upsertMeta('property', 'og:image:width', String(imageWidth))
    upsertMeta('property', 'og:image:height', String(imageHeight))
    upsertMeta('property', 'og:url', url)
    upsertMeta('property', 'og:type', type)
    upsertMeta('property', 'og:site_name', brand.name)
    upsertMeta('property', 'og:locale', 'en_PH')

    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', title)
    upsertMeta('name', 'twitter:description', description)
    upsertMeta('name', 'twitter:image', imageUrl)
    upsertMeta('name', 'twitter:image:alt', imageAlt)

    return () => {
      document.title = brand.name
      document.head.querySelectorAll('[data-seo]').forEach((el) => el.remove())
    }
  }, [title, description, path, image, imageAlt, imageWidth, imageHeight, type, index])

  return null
}
