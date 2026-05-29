#!/usr/bin/env node
import { readdir, readFile, writeFile, mkdir, access, rm } from 'node:fs/promises'
import { join, basename, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const SOLAR_ASSETS = join(ROOT, 'assets', 'icons', 'solar')
const SRC_DIR = join(ROOT, 'src')
const OUT_DIR = join(SRC_DIR, 'solar')
const STORIES_DIR = join(ROOT, 'stories')

const VARIANTS = ['linear', 'outline', 'bold', 'broken', 'duotone']

/**
 * SVG → JSX attribute mapping. Solar SVGs are well-formed and self-closing,
 * so a regex pass suffices — `@svgr/core` is too slow for 7,400 files.
 */
const ATTR_MAP = {
  'stroke-width': 'strokeWidth',
  'stroke-linecap': 'strokeLinecap',
  'stroke-linejoin': 'strokeLinejoin',
  'stroke-dasharray': 'strokeDasharray',
  'stroke-dashoffset': 'strokeDashoffset',
  'stroke-miterlimit': 'strokeMiterlimit',
  'stroke-opacity': 'strokeOpacity',
  'fill-rule': 'fillRule',
  'clip-rule': 'clipRule',
  'clip-path': 'clipPath',
  'fill-opacity': 'fillOpacity',
  'stop-color': 'stopColor',
  'stop-opacity': 'stopOpacity',
  'xlink:href': 'xlinkHref',
}

function toPascalCase(name) {
  const pascal = name
    .replace(/\.svg$/, '')
    .split(/[-_]+/)
    .map((s) => (s ? s[0].toUpperCase() + s.slice(1) : ''))
    .join('')
  // JavaScript identifiers can't start with a digit (e.g. `4k-linear` → `4kLinear`).
  // Prefix with `Solar` so it becomes `Solar4kLinear`.
  return /^\d/.test(pascal) ? `Solar${pascal}` : pascal
}

function toJsxAttrs(s) {
  let out = s
  for (const [k, v] of Object.entries(ATTR_MAP)) {
    out = out.replaceAll(`${k}=`, `${v}=`)
  }
  return out
}

/**
 * Extract viewBox + body from a Solar SVG. The body is everything between
 * `<svg ...>` and `</svg>`, with attribute names converted to JSX form.
 */
function parseSvg(content) {
  const normalized = content.replace(/<\?xml[^>]*\?>/g, '').replace(/<!--[\s\S]*?-->/g, '').trim()
  const viewBoxMatch = normalized.match(/\sviewBox="([^"]*)"/)
  const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 24 24'
  const bodyMatch = normalized.match(/<svg[^>]*>([\s\S]*)<\/svg>/)
  const rawBody = bodyMatch ? bodyMatch[1] : ''
  return { viewBox, rawBody: rawBody.trim(), jsxBody: toJsxAttrs(rawBody.trim()) }
}

async function exists(p) {
  try {
    await access(p)
    return true
  } catch {
    return false
  }
}

async function processVariant(variant) {
  const dir = join(SOLAR_ASSETS, variant)
  if (!(await exists(dir))) return null
  const files = (await readdir(dir)).filter((f) => f.endsWith('.svg')).sort()
  if (files.length === 0) return null

  const webExports = []
  const nativeExports = []
  const catalog = []

  for (const file of files) {
    const content = await readFile(join(dir, file), 'utf-8')
    const { viewBox, rawBody, jsxBody } = parseSvg(content)
    const name = basename(file, '.svg')
    const componentName = toPascalCase(name)

    // mode=2 ("as-is") — Solar bodies bake their own fill/stroke + opacity.
    webExports.push(
      `export const ${componentName} = /*#__PURE__*/ createIcon('${viewBox}', 2, <>${jsxBody}</>, '${componentName}')`,
    )
    nativeExports.push(
      `export const ${componentName} = /*#__PURE__*/ createIcon('${viewBox}', 2, ${JSON.stringify(rawBody)}, '${componentName}')`,
    )
    catalog.push({ id: name, export: componentName })
  }

  const webFile = `import { createIcon } from '../icon'\n\n${webExports.join('\n')}\n`
  const nativeFile = `import { createIcon } from '../icon.native'\n\n${nativeExports.join('\n')}\n`

  await writeFile(join(OUT_DIR, `${variant}.tsx`), webFile, 'utf-8')
  await writeFile(join(OUT_DIR, `${variant}.native.tsx`), nativeFile, 'utf-8')

  return { variant, count: files.length, catalog }
}

async function writeSolarCatalog(catalog) {
  await mkdir(STORIES_DIR, { recursive: true })
  await writeFile(join(STORIES_DIR, 'solar-catalog.json'), JSON.stringify(catalog), 'utf-8')
}

async function writeStubs() {
  await mkdir(OUT_DIR, { recursive: true })
  const stub = '// Solar icons not generated. Run `pnpm run export:solar-icons && pnpm run generate:solar`.\nexport {}\n'
  await writeFile(join(SRC_DIR, 'solar.ts'), stub, 'utf-8')
  await writeFile(join(SRC_DIR, 'solar.native.ts'), stub, 'utf-8')
  await writeFile(join(OUT_DIR, 'names.ts'), 'export type SolarIconName = never\nexport type SolarIconVariant = never\n', 'utf-8')
  await writeSolarCatalog({})
}

async function main() {
  if (!(await exists(SOLAR_ASSETS))) {
    console.log(
      '[solar] No assets/icons/solar/ found — emitting empty stubs. Run `pnpm run export:solar-icons` to populate.',
    )
    await writeStubs()
    return
  }

  await rm(OUT_DIR, { recursive: true, force: true })
  await mkdir(OUT_DIR, { recursive: true })

  const results = []
  for (const variant of VARIANTS) {
    const r = await processVariant(variant)
    if (r) results.push(r)
  }

  if (results.length === 0) {
    console.log('[solar] assets/icons/solar/ exists but has no SVG files in known variant folders.')
    await writeStubs()
    return
  }

  // Top-level barrels — re-export every variant module under its variant
  // suffix so consumers can do `import { Home2Linear } from '@eniolayo/icons/solar'`
  // and IDE autocomplete shows the full catalog.
  const topBarrelLines = results.map((r) => `export * from './solar/${r.variant}'`)
  const topBarrelNativeLines = results.map((r) => `export * from './solar/${r.variant}.native'`)
  await writeFile(join(SRC_DIR, 'solar.ts'), topBarrelLines.join('\n') + '\n', 'utf-8')
  await writeFile(join(SRC_DIR, 'solar.native.ts'), topBarrelNativeLines.join('\n') + '\n', 'utf-8')

  // Storybook / docs catalog — compact manifest for the icon explorer UI.
  const catalogByVariant = Object.fromEntries(results.map((r) => [r.variant, r.catalog]))
  await writeSolarCatalog(catalogByVariant)

  // Typed name unions — useful for any name-based API a consumer might build
  // on top of these icons (e.g. <DynamicSolar name="home-2" variant="linear" />).
  const namesByVariant = Object.fromEntries(results.map((r) => [r.variant, r.catalog.map((c) => c.id)]))
  const allNames = [...new Set(results.flatMap((r) => r.catalog.map((c) => c.id)))].sort()
  const typesContent =
    `export type SolarIconVariant = ${results.map((r) => `'${r.variant}'`).join(' | ')}\n\n` +
    `export type SolarIconName = ${allNames.map((n) => `'${n}'`).join(' | ')}\n\n` +
    Object.entries(namesByVariant)
      .map(
        ([v, ns]) =>
          `export type Solar${v[0].toUpperCase() + v.slice(1)}IconName = ${ns.map((n) => `'${n}'`).join(' | ')}`,
      )
      .join('\n\n') + '\n'
  await writeFile(join(OUT_DIR, 'names.ts'), typesContent, 'utf-8')

  const total = results.reduce((s, r) => s + r.count, 0)
  const breakdown = results.map((r) => `${r.variant}=${r.count}`).join(', ')
  console.log(`[solar] Generated ${total} icons across ${results.length} variants (${breakdown}).`)
  console.log(
    `[solar] Import via: \`import { ... } from '@eniolayo/icons/solar'\` or \`'@eniolayo/icons/solar/<variant>'\`.`,
  )
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
