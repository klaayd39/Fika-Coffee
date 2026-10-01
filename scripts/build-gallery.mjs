import { mkdir, readFile, copyFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const assetsDir =
  process.env.GALLERY_ASSETS ??
  path.join(process.env.HOME ?? '', '.cursor/projects/Users-klaayd09-Documents-Fika/assets')
const sourcesDir = path.join(__dirname, 'gallery-sources')
const outDir = path.join(root, 'public/images/gallery')
const manifest = JSON.parse(await readFile(path.join(__dirname, 'gallery-manifest.json'), 'utf8'))

const WIDTH_STEPS = [480, 640, 768, 960, 1024, 1150, 1400]

function widthsFor(nativeWidth) {
  const allowed = WIDTH_STEPS.filter((w) => w <= nativeWidth)
  if (!allowed.length) return [nativeWidth]
  if (allowed.length === 1) return allowed
  return allowed.slice(-3)
}

function cropAspectFor(width, height) {
  const ratio = width / height
  if (ratio >= 1.85) return 'galleryWide'
  if (ratio >= 1.15) return 'galleryLandscape'
  if (ratio >= 0.95 && ratio <= 1.05) return 'square'
  return 'galleryPortrait'
}

await mkdir(sourcesDir, { recursive: true })
await mkdir(outDir, { recursive: true })

const generated = []

for (const entry of manifest) {
  const input = path.join(assetsDir, entry.source)
  const sourceCopy = path.join(sourcesDir, `${entry.slug}.jpg`)
  await copyFile(input, sourceCopy)

  const meta = await sharp(input).metadata()
  const width = meta.width ?? 768
  const height = meta.height ?? 1024
  const widths = widthsFor(width)

  for (const w of widths) {
    const resized = sharp(input).rotate().resize({ width: w, withoutEnlargement: true })
    await resized.clone().jpeg({ quality: 86, mozjpeg: true }).toFile(path.join(outDir, `${entry.slug}-${w}.jpg`))
    await resized.clone().webp({ quality: 84 }).toFile(path.join(outDir, `${entry.slug}-${w}.webp`))
    await resized.clone().avif({ quality: 52 }).toFile(path.join(outDir, `${entry.slug}-${w}.avif`))
  }

  generated.push({
    id: entry.slug,
    category: entry.category,
    alt: entry.alt,
    width,
    height,
    cropAspect: cropAspectFor(width, height),
    objectPosition: entry.objectPosition ?? 'center center',
    widths,
  })
}

console.log(JSON.stringify(generated, null, 2))
