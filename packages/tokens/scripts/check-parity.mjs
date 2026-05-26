import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const css = readFileSync(resolve(__dirname, '../dist/css/tokens.css'), 'utf8')

function extract(selector) {
  const re = new RegExp(`${selector.replace('.', '\\.')}\\s*\\{([\\s\\S]*?)\\}`)
  const m = css.match(re)
  if (!m) return new Set()
  return new Set(
    Array.from(m[1].matchAll(/(--[a-zA-Z-]+)\s*:/g)).map((x) => x[1]),
  )
}

const root = extract(':root')
const dark = extract('.dark')
const onlyInRoot = [...root].filter((k) => !dark.has(k))
const onlyInDark = [...dark].filter((k) => !root.has(k))

if (onlyInRoot.length || onlyInDark.length) {
  console.error('Token parity mismatch')
  console.error('Only in :root:', onlyInRoot)
  console.error('Only in .dark:', onlyInDark)
  process.exit(1)
}

console.log('Token parity OK')
