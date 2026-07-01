#!/usr/bin/env node
/**
 * Generate avatar layer assets from public/me/me_1.jpg & me_2.jpg
 *
 * Output per photo:
 *   public/me/layers/me_X_bg.jpg  — blurred background plate
 *   public/me/layers/me_X_fg.png  — foreground (transparent if rembg available)
 *
 * Usage: pnpm generate:avatar-layers
 */

import { mkdir, access } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const outDir = path.join(root, 'public/me/layers')
const sources = ['me_1', 'me_2']

async function fileExists(filePath) {
  try {
    await access(filePath)
    return true
  } catch {
    return false
  }
}

async function removeBackground(inputPath, outputPath) {
  try {
    const { removeBackground: removeBg } = await import('@imgly/background-removal-node')
    const input = await sharp(inputPath).rotate().png().toBuffer()
    const fgBlob = await removeBg(input, { output: { format: 'image/png' } })
    const fgBuffer = Buffer.from(await fgBlob.arrayBuffer())
    await sharp(fgBuffer).png().toFile(outputPath)
    return true
  } catch (error) {
    console.warn(`[avatar-layers] rembg skipped for ${path.basename(inputPath)}:`, error?.message ?? error)
    return false
  }
}

async function main() {
  await mkdir(outDir, { recursive: true })

  for (const id of sources) {
    const input = path.join(root, `public/me/${id}.jpg`)
    const bgOut = path.join(outDir, `${id}_bg.jpg`)
    const fgOut = path.join(outDir, `${id}_fg.png`)

    if (!(await fileExists(input))) {
      console.warn(`[avatar-layers] missing ${input}, skip`)
      continue
    }

    await sharp(input)
      .rotate()
      .resize(640, 640, { fit: 'cover', position: 'attention' })
      .blur(22)
      .modulate({ saturation: 1.05 })
      .jpeg({ quality: 82 })
      .toFile(bgOut)

    const cutout = await removeBackground(input, fgOut)
    if (!cutout) {
      await sharp(input)
        .rotate()
        .resize(640, 640, { fit: 'cover', position: 'attention' })
        .png()
        .toFile(fgOut)
      console.warn(`[avatar-layers] ${id}_fg.png copied without transparency`)
    }

    console.log(`[avatar-layers] wrote ${id}_bg.jpg + ${id}_fg.png`)
  }

  console.log('[avatar-layers] done')
}

main().catch((error) => {
  console.error('[avatar-layers] failed', error)
  process.exit(1)
})
