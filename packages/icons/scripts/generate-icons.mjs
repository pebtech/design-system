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
 * Use @svgr/core to convert SVG markup into JSX children (properly handling
 * all SVG attribute-to-JSX-prop conversions). We then extract the inner
 * children and viewBox from the generated component code and wrap them in
 * our own component template that uses IconProps, forwardRef, etc.
 */
async function svgToJsxChildren(svgContent) {
  // Let SVGR do the heavy lifting of SVG → JSX conversion
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
        {
          name: 'removeElementsByAttr',
          params: { id: 'script' },
        },
      ],
    },
  })

  // Extract the viewBox from the generated <svg> tag
  const viewBoxMatch = raw.match(/viewBox="([^"]*)"/)
  const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 24 24'

  // Extract the children from inside the generated <svg>...</svg>
  const childrenMatch = raw.match(/<svg[^>]*>([\s\S]*)<\/svg>/)
  const children = childrenMatch ? childrenMatch[1].trim() : ''

  return { viewBox, children }
}

function buildComponentCode(componentName, jsxChildren, viewBox, variant) {
  const isOutline = variant === 'outline'

  const extraProps = isOutline
    ? 'stroke={color} fill="none" strokeWidth={strokeWidth}'
    : 'fill={color}'

  const strokeDefault = isOutline ? ', strokeWidth = 1.5' : ''

  return `import * as React from 'react'
import type { IconProps } from '../../types'

const ${componentName} = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = 24, color = 'currentColor'${strokeDefault}, className, title, ...rest }, ref) => (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="${viewBox}"
      width={size}
      height={size}
      ${extraProps}
      className={className}
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : undefined}
      focusable="false"
      {...rest}
    >
      {title && <title>{title}</title>}
      ${jsxChildren}
    </svg>
  ),
)

${componentName}.displayName = '${componentName}'

export default ${componentName}
`
}

async function processVariant(variant) {
  const svgDir = join(SVGS_DIR, variant)
  const outDir = join(GENERATED_DIR, variant)

  await mkdir(outDir, { recursive: true })

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

    const { viewBox, children } = await svgToJsxChildren(svgContent)

    // Strip SVGR-generated stroke/fill/strokeWidth from children since we
    // set them on the outer <svg> via props
    const cleanedChildren = children
      .replace(/ stroke="currentColor"/g, '')
      .replace(/ fill="currentColor"/g, '')
      .replace(/ fill="none"/g, '')
      .replace(/ strokeWidth={[^}]*}/g, '')

    const code = buildComponentCode(componentName, cleanedChildren, viewBox, variant)
    const outFile = join(outDir, `${name}.tsx`)
    await writeFile(outFile, code, 'utf-8')

    exports.push({ name: componentName, file: name })
  }

  return exports
}

function generateBarrel(exports, variant) {
  return (
    exports
      .map((e) => `export { default as ${e.name} } from './generated/${variant}/${e.file}'`)
      .join('\n') + '\n'
  )
}

async function main() {
  await mkdir(join(GENERATED_DIR, 'outline'), { recursive: true })
  await mkdir(join(GENERATED_DIR, 'solid'), { recursive: true })

  const [outlineExports, solidExports] = await Promise.all([
    processVariant('outline'),
    processVariant('solid'),
  ])

  const outlineBarrel = generateBarrel(outlineExports, 'outline')
  const solidBarrel = generateBarrel(solidExports, 'solid')

  await writeFile(join(SRC_DIR, 'outline.ts'), outlineBarrel, 'utf-8')
  await writeFile(join(SRC_DIR, 'solid.ts'), solidBarrel, 'utf-8')

  const indexContent = `export * from './outline'
export * from './solid'
export type { IconProps } from './types'
`

  await writeFile(join(SRC_DIR, 'index.ts'), indexContent, 'utf-8')

  const total = outlineExports.length + solidExports.length
  console.log(
    `Generated ${total} icons (${outlineExports.length} outline, ${solidExports.length} solid)`,
  )
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
