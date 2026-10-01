import { mkdir, readFile, copyFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const assetsDir =
  process.env.PRODUCT_ASSETS ??
  path.join(process.env.HOME ?? '', '.cursor/projects/Users-klaayd09-Documents-Fika/assets')
const sourcesDir = path.join(__dirname, 'product-sources')
const outDir = path.join(root, 'public/images/products')
const manifest = JSON.parse(await readFile(path.join(__dirname, 'products-manifest.json'), 'utf8'))

const WIDTHS = [480, 800]
const TARGET_WIDTH = 800
const TARGET_HEIGHT = 1000

await mkdir(sourcesDir, { recursive: true })
await mkdir(outDir, { recursive: true })

for (const entry of manifest) {
  const input = path.join(assetsDir, entry.source)
  const sourceCopy = path.join(sourcesDir, `${entry.slug}.jpg`)
  await copyFile(input, sourceCopy)

  const base = sharp(input).rotate().resize({
    width: TARGET_WIDTH,
    height: TARGET_HEIGHT,
    fit: 'cover',
    position: 'centre',
  })

  for (const w of WIDTHS) {
    const h = Math.round((TARGET_HEIGHT / TARGET_WIDTH) * w)
    const resized = base.clone().resize({ width: w, height: h, withoutEnlargement: true })
    await resized.clone().jpeg({ quality: 86, mozjpeg: true }).toFile(path.join(outDir, `${entry.slug}-${w}.jpg`))
    await resized.clone().webp({ quality: 84 }).toFile(path.join(outDir, `${entry.slug}-${w}.webp`))
    await resized.clone().avif({ quality: 52 }).toFile(path.join(outDir, `${entry.slug}-${w}.avif`))
  }

  console.log(`Built ${entry.slug} → ${WIDTHS.map((w) => `${w}w`).join(', ')}`)
}
