import { writeFileSync, mkdirSync } from 'fs'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const outDir = resolve(__dirname, '../dist/css')

mkdirSync(outDir, { recursive: true })

// Import the built token objects
const { lightTokens, darkTokens, fontFamily, fontFeatureSettings } = await import(
  resolve(__dirname, '../dist/index.mjs')
)

function generateThemeBlock() {
  return `@theme {
  /* Fonts */
  --font-sans: ${fontFamily.sans};
  --font-sans--font-feature-settings: ${fontFeatureSettings.sans};

  /* Text Colors */
  --color-primary: var(--text-primary);
  --color-secondary: var(--text-secondary);
  --color-tertiary: var(--text-tertiary);
  --color-quaternary: var(--text-quaternary);
  --color-white: var(--text-white);
  --color-black: var(--text-black);
  --color-page: var(--text-page);
  --color-muted: var(--text-muted);
  --color-inverse: var(--text-inverse);
  --color-link: var(--text-link);
  --color-error: var(--text-error);
  --color-success: var(--text-success);
  --color-warning: var(--text-warning);
  --color-info: var(--text-info);
  --color-pending: var(--text-pending);
  --color-disabled: var(--text-disabled);
  --color-brand: var(--text-brand);
  --color-brandAlt: var(--text-brandAlt);

  /* Background Colors */
  --color-surface: var(--bg-surface);
  --color-body: var(--bg-body);
  --color-bodySecondary: var(--bg-bodySecondary);
  --color-formPage: var(--bg-formPage);
  --color-overlay: var(--bg-overlay);
  --color-canvas: var(--bg-inverse);
  --color-sidebar: var(--bg-sidebar);
  --color-sidebarSecondary: var(--bg-sidebarSecondary);
  --color-quaternaryBg: var(--bg-quaternary);
  --color-tableHeader: var(--bg-tableHeader);
  --color-tableBg: var(--bg-primary);
  --color-whiteBg: var(--bg-primary);
  --color-brandBg: var(--bg-brand);
  --color-errorBg: var(--bg-error);
  --color-successBg: var(--bg-success);
  --color-warningBg: var(--bg-warning);
  --color-infoBg: var(--bg-info);
  --color-pendingBg: var(--bg-pending);

  /* Border Colors */
  --color-border: var(--border-primary);
  --color-border-secondary: var(--border-secondary);
  --color-border-focus: var(--border-focus);
  --color-border-error: var(--border-error);
  --color-border-success: var(--border-success);
  --color-border-warning: var(--border-warning);
  --color-border-info: var(--border-info);
  --color-border-pending: var(--border-pending);
  --color-border-brand: var(--border-brand);

  /* Hover Colors */
  --color-hover-primary: var(--hover-primary);
  --color-hover-secondary: var(--hover-secondary);
  --color-hover-tertiary: var(--hover-tertiary);
  --color-hover-white: var(--hover-white);
  --color-hover-surface: var(--hover-surface);
  --color-hover-surface-active: var(--hover-surface-active);
  --color-hover-black: var(--hover-black);
  --color-hover-page: var(--hover-page);
  --color-hover-muted: var(--hover-muted);
  --color-hover-inverse: var(--hover-inverse);
  --color-hover-link: var(--hover-link);
  --color-hover-error: var(--hover-error);
  --color-hover-success: var(--hover-success);
  --color-hover-disabled: var(--hover-disabled);
  --color-hover-brand: var(--hover-brand);

  /* Focus Colors */
  --color-focus-primary: var(--focus-primary);
  --color-focus-secondary: var(--focus-secondary);
  --color-focus-error: var(--focus-error);
  --color-focus-success: var(--focus-success);
  --color-focus-warning: var(--focus-warning);
  --color-focus-info: var(--focus-info);
  --color-focus-pending: var(--focus-pending);

  /* Input Colors */
  --color-input: var(--input);
  --color-input-hover: var(--input-hover);
  --color-input-active: var(--input-active);
  --color-input-focus: var(--input-focus);
  --color-input-error: var(--input-error);
  --color-input-success: var(--input-success);
  --color-input-warning: var(--input-warning);
  --color-input-info: var(--input-info);
  --color-input-pending: var(--input-pending);
  --color-input-disabled: var(--input-disabled);
}`
}

function generateModeBlock(tokens, selector) {
  const t = tokens
  const lines = []

  if (selector === '.dark') {
    lines.push(`${selector} {`)
    lines.push('  color-scheme: dark;')
  } else {
    lines.push(`${selector} {`)
  }

  // Text
  for (const [key, value] of Object.entries(t.text)) {
    const cssKey = key === 'brandAlt' ? 'brandAlt' : key
    lines.push(`  --text-${cssKey}: ${value};`)
  }

  lines.push('')

  // Background
  for (const [key, value] of Object.entries(t.bg)) {
    const cssKey = key === 'bodySecondary' ? 'bodySecondary' : key === 'formPage' ? 'formPage' : key === 'tableHeader' ? 'tableHeader' : key === 'surfaceActive' ? 'surface-active' : key === 'sidebarSecondary' ? 'sidebarSecondary' : key
    if (value !== undefined) {
      lines.push(`  --bg-${cssKey}: ${value};`)
    }
  }

  lines.push('')

  // Border
  for (const [key, value] of Object.entries(t.border)) {
    lines.push(`  --border-${key}: ${value};`)
  }

  lines.push('')

  // Hover
  for (const [key, value] of Object.entries(t.hover)) {
    const cssKey = key === 'surfaceActive' ? 'surface-active' : key
    lines.push(`  --hover-${cssKey}: ${value};`)
  }

  lines.push('')

  // Focus
  for (const [key, value] of Object.entries(t.focus)) {
    lines.push(`  --focus-${key}: ${value};`)
  }

  lines.push('')

  // Input
  for (const [key, value] of Object.entries(t.input)) {
    const cssKey = key === 'default' ? '' : `-${key}`
    lines.push(`  --input${cssKey}: ${value};`)
  }

  lines.push('}')
  return lines.join('\n')
}

const css = [
  '/* Auto-generated by @eniolayo/tokens — do not edit manually */',
  '@import "tailwindcss";',
  '',
  '@custom-variant dark (&:where(.dark, .dark *));',
  '',
  generateThemeBlock(),
  '',
  '/* Light Mode */',
  generateModeBlock(lightTokens, ':root'),
  '',
  '/* Dark Mode */',
  generateModeBlock(darkTokens, '.dark'),
  '',
].join('\n')

const tokensCssPath = resolve(outDir, 'tokens.css')
writeFileSync(tokensCssPath, css)
console.log(`Generated ${tokensCssPath}`)

const uiWebStyles = resolve(__dirname, '../../ui-web/src/styles/tailwind.css')
writeFileSync(uiWebStyles, css)
console.log(`Generated ${uiWebStyles}`)
