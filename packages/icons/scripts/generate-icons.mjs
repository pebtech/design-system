import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises'
import { join, basename, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { transform } from '@svgr/core'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const SVGS_DIR = join(ROOT, 'svgs')
const GENERATED_DIR = join(ROOT, 'src', 'generated')
const SRC_DIR = join(ROOT, 'src')

function toPascalCase(str) {
  return str
    .replace(/\.svg$/, '')
    .split(/[-_]+/)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join('')
}

/**
 * Use @svgr/core to convert SVG markup into JSX children (handling all the
 * attribute-to-JSX-prop conversions). Returns `{ viewBox, jsxBody }` —
 * a hand-cleaned JSX fragment ready to drop inside an <svg>.
 */
async function svgToJsx(svgContent) {
  const raw = await transform(svgContent, {
    plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'],
    icon: true,
    typescript: true,
    ref: false,
    titleProp: false,
    memo: false,
    expandProps: false,
    dimensions: false,
    jsxRuntime: 'classic',
    svgoConfig: {
      plugins: [
        { name: 'preset-default' },
        { name: 'removeScriptElement' },
        {
          name: 'removeAttrs',
          params: {
            attrs: ['onload', 'onerror', 'onclick', 'onmouseover', 'onfocus', 'onblur'],
          },
        },
        { name: 'removeElementsByAttr', params: { id: 'script' } },
      ],
    },
  })

  const viewBoxMatch = raw.match(/viewBox="([^"]*)"/)
  const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 24 24'

  const childrenMatch = raw.match(/<svg[^>]*>([\s\S]*)<\/svg>/)
  const jsxBody = childrenMatch
    ? childrenMatch[1]
        .trim()
        .replace(/ stroke="currentColor"/g, '')
        .replace(/ fill="currentColor"/g, '')
        .replace(/ fill="none"/g, '')
        .replace(/ strokeWidth={[^}]*}/g, '')
    : ''

  return { viewBox, jsxBody }
}

/**
 * Strip whitespace / declarations / outer <svg> so the body becomes a clean
 * string suitable for `react-native-svg`'s SvgXml.
 */
function extractSvgBody(svgContent) {
  const normalized = svgContent
    .replace(/<\?xml[^>]*\?>/g, '')
    .replace(/<!DOCTYPE[^>]*>/g, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/\s+/g, ' ')
    .replace(/>\s+</g, '><')
    .trim()

  const match = normalized.match(/<svg[^>]*>([\s\S]*)<\/svg>/)
  const body = match ? match[1].trim() : normalized

  return body
    .replace(/\s*stroke="currentColor"/g, '')
    .replace(/\s*fill="currentColor"/g, '')
    .replace(/\s*fill="none"/g, '')
    .replace(/\s*stroke-width="[^"]*"/g, '')
}

/**
 * Heuristic to detect whether a JSX body is exactly one root element. If it
 * is, we skip the surrounding `<>...</>` so we don't emit a useless
 * `jsx(Fragment, {children: ...})` call (saves ~15 bytes minified per icon).
 */
function isSingleRootJsx(jsxBody) {
  const trimmed = jsxBody.trim()
  if (!trimmed.startsWith('<')) return false
  let depth = 0
  let i = 0
  while (i < trimmed.length) {
    if (trimmed[i] === '<') {
      const selfClosingEnd = trimmed.indexOf('/>', i)
      const closeTagEnd = trimmed.indexOf('>', i)
      if (trimmed[i + 1] === '/') {
        depth--
        i = closeTagEnd + 1
        if (depth === 0) return i === trimmed.length
      } else if (selfClosingEnd !== -1 && selfClosingEnd < closeTagEnd) {
        i = selfClosingEnd + 2
        if (depth === 0) return i === trimmed.length
      } else {
        depth++
        i = closeTagEnd + 1
      }
    } else {
      i++
    }
  }
  return false
}

/**
 * Minimal per-icon web module. All the <svg> machinery lives in the shared
 * `createIcon` factory chunk; this file only ships its viewBox + path JSX.
 */
function buildWebIcon(componentName, viewBox, jsxBody, variant) {
  const outlineFlag = variant === 'outline' ? 1 : 0
  const body = isSingleRootJsx(jsxBody) ? jsxBody.trim() : `<>${jsxBody}</>`
  return `import { createIcon } from '../../icon'

export default createIcon('${viewBox}', ${outlineFlag}, ${body}, '${componentName}')
`
}

/**
 * Minimal per-icon native module. All the SvgXml + memoization lives in the
 * shared `createIcon` factory chunk; this file only ships its viewBox + body
 * string.
 */
function buildNativeIcon(componentName, viewBox, svgBody, variant) {
  const outlineFlag = variant === 'outline' ? 1 : 0
  return `import { createIcon } from '../../icon.native'

export default createIcon('${viewBox}', ${outlineFlag}, ${JSON.stringify(svgBody)}, '${componentName}')
`
}

async function processVariant(variant) {
  const svgDir = join(SVGS_DIR, variant)
  const webOutDir = join(GENERATED_DIR, variant)
  const nativeOutDir = join(GENERATED_DIR, `${variant}-native`)

  await mkdir(webOutDir, { recursive: true })
  await mkdir(nativeOutDir, { recursive: true })

  let files
  try {
    files = (await readdir(svgDir)).filter((f) => f.endsWith('.svg')).sort()
  } catch {
    files = []
  }

  const exports = []

  for (const file of files) {
    const svgContent = await readFile(join(svgDir, file), 'utf-8')
    const name = basename(file, '.svg')
    const componentName = toPascalCase(name) + (variant === 'outline' ? 'Outline' : 'Solid')

    const { viewBox, jsxBody } = await svgToJsx(svgContent)
    const svgBody = extractSvgBody(svgContent)

    await writeFile(
      join(webOutDir, `${name}.tsx`),
      buildWebIcon(componentName, viewBox, jsxBody, variant),
      'utf-8',
    )
    await writeFile(
      join(nativeOutDir, `${name}.tsx`),
      buildNativeIcon(componentName, viewBox, svgBody, variant),
      'utf-8',
    )

    exports.push({ name: componentName, file: name })
  }

  return exports
}

function generateBarrel(exports, variant, target) {
  const dir = target === 'native' ? `${variant}-native` : variant
  return (
    exports
      .map((e) => `export { default as ${e.name} } from './generated/${dir}/${e.file}'`)
      .join('\n') + '\n'
  )
}

async function main() {
  await mkdir(join(GENERATED_DIR, 'outline'), { recursive: true })
  await mkdir(join(GENERATED_DIR, 'solid'), { recursive: true })
  await mkdir(join(GENERATED_DIR, 'outline-native'), { recursive: true })
  await mkdir(join(GENERATED_DIR, 'solid-native'), { recursive: true })

  const [outlineExports, solidExports] = await Promise.all([
    processVariant('outline'),
    processVariant('solid'),
  ])

  await writeFile(
    join(SRC_DIR, 'outline.ts'),
    generateBarrel(outlineExports, 'outline', 'web'),
    'utf-8',
  )
  await writeFile(
    join(SRC_DIR, 'solid.ts'),
    generateBarrel(solidExports, 'solid', 'web'),
    'utf-8',
  )
  await writeFile(
    join(SRC_DIR, 'outline.native.ts'),
    generateBarrel(outlineExports, 'outline', 'native'),
    'utf-8',
  )
  await writeFile(
    join(SRC_DIR, 'solid.native.ts'),
    generateBarrel(solidExports, 'solid', 'native'),
    'utf-8',
  )

  await writeFile(
    join(SRC_DIR, 'index.ts'),
    `export * from './outline'\nexport * from './solid'\nexport type { IconProps } from './types'\n`,
    'utf-8',
  )
  await writeFile(
    join(SRC_DIR, 'index.native.ts'),
    `export * from './outline.native'\nexport * from './solid.native'\nexport type { IconProps } from './types.native'\n`,
    'utf-8',
  )

  const total = outlineExports.length + solidExports.length
  console.log(
    `Generated ${total * 2} icon components — ${total} web + ${total} native ` +
      `(${outlineExports.length} outline / ${solidExports.length} solid per platform)`,
  )
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
