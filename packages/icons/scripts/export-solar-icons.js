#!/usr/bin/env node
/**
 * Export every icon (all variants) from `@iconify-json/solar` into standalone
 * SVG files on disk. Runs entirely offline against the locally installed
 * package — no network calls.
 *
 * Output: <icons-package>/assets/icons/solar/<variant>/<icon-name>.svg
 *
 * Variants are detected from each icon's name suffix and grouped into:
 *   - linear/
 *   - outline/
 *   - bold/
 *   - broken/
 *   - duotone/   (covers both `bold-duotone` and `line-duotone`)
 *   - other/     (anything that doesn't match — empty in practice)
 *
 * Usage:
 *   pnpm --filter @pebtech/icons run export:solar-icons
 *   # or
 *   node packages/icons/scripts/export-solar-icons.js
 */
'use strict'

const fs = require('node:fs')
const path = require('node:path')

const iconSet = require('@iconify-json/solar/icons.json')

const PACKAGE_ROOT = path.resolve(__dirname, '..')
const OUTPUT_ROOT = path.join(PACKAGE_ROOT, 'assets', 'icons', 'solar')

/**
 * Order matters: longer suffixes are checked first so `home-bold-duotone`
 * isn't misclassified as `bold`.
 */
const VARIANT_RULES = [
  { suffix: '-bold-duotone', folder: 'duotone' },
  { suffix: '-line-duotone', folder: 'duotone' },
  { suffix: '-linear', folder: 'linear' },
  { suffix: '-outline', folder: 'outline' },
  { suffix: '-broken', folder: 'broken' },
  { suffix: '-bold', folder: 'bold' },
]

function detectVariantFolder(iconName) {
  for (const { suffix, folder } of VARIANT_RULES) {
    if (iconName.endsWith(suffix)) return folder
  }
  return 'other'
}

/**
 * Strip characters that are unsafe in any common filesystem (Windows is
 * the strictest). Iconify icon names are already safe (lowercase ASCII +
 * dashes + digits), but be defensive in case the set ever changes.
 */
function safeFileName(name) {
  return name
    .replace(/[<>:"/\\|?*\x00-\x1f]/g, '-')
    .replace(/\.+$/g, '')
    .trim()
}

function buildSvg(icon, defaults) {
  const width = icon.width ?? defaults.width ?? 24
  const height = icon.height ?? defaults.height ?? 24
  const left = icon.left ?? defaults.left ?? 0
  const top = icon.top ?? defaults.top ?? 0

  const viewBox = `${left} ${top} ${width} ${height}`

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="${viewBox}" fill="currentColor">${icon.body}</svg>\n`
}

function main() {
  const { prefix, icons, ...defaults } = iconSet

  if (!icons || typeof icons !== 'object') {
    throw new Error('Could not load icons from @iconify-json/solar')
  }

  fs.mkdirSync(OUTPUT_ROOT, { recursive: true })

  const counts = {}
  let total = 0

  for (const [name, icon] of Object.entries(icons)) {
    if (!icon || typeof icon.body !== 'string') continue

    const folder = detectVariantFolder(name)
    const dir = path.join(OUTPUT_ROOT, folder)
    fs.mkdirSync(dir, { recursive: true })

    const file = path.join(dir, `${safeFileName(name)}.svg`)
    fs.writeFileSync(file, buildSvg(icon, defaults))

    counts[folder] = (counts[folder] ?? 0) + 1
    total += 1
  }

  const sortedCounts = Object.entries(counts).sort(([, a], [, b]) => b - a)
  const rows = sortedCounts.map(([folder, n]) => `  ${folder.padEnd(8)} ${n}`).join('\n')

  process.stdout.write(
    `\nExported ${total} ${prefix} icons\n` +
      `Output:   ${OUTPUT_ROOT}\n` +
      `By style:\n${rows}\n\n`,
  )
}

try {
  main()
} catch (err) {
  console.error(err)
  process.exit(1)
}
