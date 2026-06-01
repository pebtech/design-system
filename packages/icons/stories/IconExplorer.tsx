import * as React from 'react'
import type { IconProps } from '../src/types'
import {
  ArrowLeftOutline,
  CheckOutline,
  ChevronDownOutline,
  CloseOutline,
  SearchOutline,
} from '@pebtech/icons/outline'
import {
  ArrowLeftSolid,
  CheckSolid,
  ChevronDownSolid,
  CloseSolid,
  SearchSolid,
} from '@pebtech/icons/solid'
import solarCatalog from './solar-catalog.json'

type IconComponent = React.ForwardRefExoticComponent<IconProps & React.RefAttributes<SVGSVGElement>>

type CatalogEntry = { id: string; export: string }

type SolarVariant = keyof typeof solarCatalog

/** Lazy-load Solar SVGs from assets — avoids importing 1,200+ React components in Storybook. */
const solarSvgLoaders = import.meta.glob('../assets/icons/solar/*/*.svg', {
  query: '?raw',
  import: 'default',
}) as Record<string, () => Promise<string>>

function solarSvgKey(variant: string, id: string) {
  return `../assets/icons/solar/${variant}/${id}.svg`
}

const CURATED: Record<string, { label: string; icons: Record<string, IconComponent> }> = {
  'curated-outline': {
    label: 'Curated · Outline',
    icons: {
      ArrowLeftOutline,
      CheckOutline,
      ChevronDownOutline,
      CloseOutline,
      SearchOutline,
    },
  },
  'curated-solid': {
    label: 'Curated · Solid',
    icons: {
      ArrowLeftSolid,
      CheckSolid,
      ChevronDownSolid,
      CloseSolid,
      SearchSolid,
    },
  },
}

const SOLAR_VARIANTS = ['linear', 'outline', 'bold', 'broken', 'duotone'] as const satisfies readonly SolarVariant[]

const PAGE_SIZE = 72

function copyText(text: string) {
  void navigator.clipboard.writeText(text)
}

function SolarSvgTile({
  svg,
  size,
  color,
}: {
  svg: string
  size: number
  color: string
}) {
  const colored = React.useMemo(
    () => svg.replace(/currentColor/g, color).replace(/width="[^"]*"/, `width="${size}"`).replace(/height="[^"]*"/, `height="${size}"`),
    [svg, size, color],
  )
  return (
    <span
      className="inline-flex shrink-0 items-center justify-center [&>svg]:block"
      dangerouslySetInnerHTML={{ __html: colored }}
    />
  )
}

export function IconExplorer() {
  const [collection, setCollection] = React.useState<string>('curated-outline')
  const [solarVariant, setSolarVariant] = React.useState<SolarVariant>('linear')
  const [query, setQuery] = React.useState('')
  const [page, setPage] = React.useState(0)
  const [size, setSize] = React.useState(24)
  const [color, setColor] = React.useState('currentColor')
  const [strokeWidth, setStrokeWidth] = React.useState(1.5)
  const [copied, setCopied] = React.useState<string | null>(null)
  const [solarSvgs, setSolarSvgs] = React.useState<Record<string, string>>({})
  const [solarLoading, setSolarLoading] = React.useState(false)
  const [solarError, setSolarError] = React.useState<string | null>(null)

  const isSolar = collection === 'solar'

  React.useEffect(() => {
    setPage(0)
  }, [collection, solarVariant, query])

  const solarEntries = React.useMemo(() => {
    if (!isSolar) return [] as CatalogEntry[]
    const list = (solarCatalog[solarVariant] ?? []) as CatalogEntry[]
    const q = query.trim().toLowerCase()
    if (!q) return list
    return list.filter((e) => e.id.includes(q) || e.export.toLowerCase().includes(q))
  }, [isSolar, solarVariant, query])

  const totalPages = Math.max(1, Math.ceil(solarEntries.length / PAGE_SIZE))
  const safePage = Math.min(page, totalPages - 1)

  const solarPageEntries = React.useMemo(
    () => solarEntries.slice(safePage * PAGE_SIZE, safePage * PAGE_SIZE + PAGE_SIZE),
    [solarEntries, safePage],
  )

  // Load only the current page of Solar SVGs (72 max), not the whole variant module.
  React.useEffect(() => {
    if (!isSolar) {
      setSolarSvgs({})
      setSolarError(null)
      return
    }

    let cancelled = false

    async function loadPage() {
      setSolarLoading(true)
      setSolarError(null)

      const pageEntries = solarEntries.slice(safePage * PAGE_SIZE, safePage * PAGE_SIZE + PAGE_SIZE)

      try {
        const entries = await Promise.all(
          pageEntries.map(async (entry) => {
            const key = solarSvgKey(solarVariant, entry.id)
            const loader = solarSvgLoaders[key]
            if (!loader) {
              throw new Error(`Missing SVG asset: ${key}. Run pnpm --filter @pebtech/icons run export:solar-icons`)
            }
            const svg = await loader()
            return [entry.export, svg] as const
          }),
        )

        if (cancelled) return
        setSolarSvgs(Object.fromEntries(entries))
      } catch (err) {
        if (cancelled) return
        setSolarSvgs({})
        setSolarError(err instanceof Error ? err.message : 'Failed to load Solar icons')
      } finally {
        if (!cancelled) setSolarLoading(false)
      }
    }

    void loadPage()

    return () => {
      cancelled = true
    }
  }, [isSolar, solarVariant, safePage, query, solarEntries])

  const curated = !isSolar ? CURATED[collection] : null

  const curatedEntries = React.useMemo(() => {
    if (!curated) return [] as { id: string; export: string; Icon: IconComponent }[]
    const q = query.trim().toLowerCase()
    return Object.entries(curated.icons)
      .filter(([name]) => !q || name.toLowerCase().includes(q))
      .map(([exportName, Icon]) => ({
        id: exportName.replace(/Outline$|Solid$/, '').replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, ''),
        export: exportName,
        Icon,
      }))
  }, [curated, query])

  const curatedTotalPages = Math.max(1, Math.ceil(curatedEntries.length / PAGE_SIZE))
  const curatedSafePage = Math.min(page, curatedTotalPages - 1)
  const curatedSlice = curatedEntries.slice(
    curatedSafePage * PAGE_SIZE,
    curatedSafePage * PAGE_SIZE + PAGE_SIZE,
  )

  const entries = isSolar ? solarEntries : curatedEntries
  const activeTotalPages = isSolar ? totalPages : curatedTotalPages
  const activeSafePage = isSolar ? safePage : curatedSafePage

  const handleCopy = (exportName: string, importPath: string) => {
    const snippet = `import { ${exportName} } from '${importPath}'`
    copyText(snippet)
    setCopied(exportName)
    window.setTimeout(() => setCopied(null), 2000)
  }

  const catalogEmpty = isSolar && (solarCatalog[solarVariant] as CatalogEntry[] | undefined)?.length === 0

  return (
    <div className="w-full max-w-6xl space-y-6 text-left">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold text-primary">Icon explorer</h1>
        <p className="text-sm text-secondary max-w-2xl">
          Browse curated and Solar icons. Click any tile to copy its import statement. Solar previews load
          SVG assets per page so Storybook stays responsive.
        </p>
      </header>

      <div className="flex flex-wrap gap-3 items-end">
        <label className="flex flex-col gap-1 text-xs font-medium text-secondary">
          Collection
          <select
            className="rounded-lg border border-border bg-surface px-3 py-2 text-sm text-primary min-w-[12rem]"
            value={collection}
            onChange={(e) => setCollection(e.target.value)}
          >
            {Object.entries(CURATED).map(([key, { label }]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
            <option value="solar">Solar (7,404)</option>
          </select>
        </label>

        {isSolar && (
          <label className="flex flex-col gap-1 text-xs font-medium text-secondary">
            Solar variant
            <select
              className="rounded-lg border border-border bg-surface px-3 py-2 text-sm text-primary"
              value={solarVariant}
              onChange={(e) => setSolarVariant(e.target.value as SolarVariant)}
            >
              {SOLAR_VARIANTS.map((v) => (
                <option key={v} value={v}>
                  {v} ({(solarCatalog[v] as CatalogEntry[] | undefined)?.length ?? 0})
                </option>
              ))}
            </select>
          </label>
        )}

        <label className="flex flex-col gap-1 text-xs font-medium text-secondary flex-1 min-w-[12rem]">
          Search
          <input
            type="search"
            placeholder="Filter by name…"
            className="rounded-lg border border-border bg-surface px-3 py-2 text-sm text-primary w-full"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>

        <label className="flex flex-col gap-1 text-xs font-medium text-secondary">
          Size
          <input
            type="number"
            min={12}
            max={64}
            className="rounded-lg border border-border bg-surface px-3 py-2 text-sm text-primary w-20"
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
          />
        </label>

        <label className="flex flex-col gap-1 text-xs font-medium text-secondary">
          Color
          <input
            type="text"
            className="rounded-lg border border-border bg-surface px-3 py-2 text-sm text-primary w-28"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </label>

        {!isSolar && (
          <label className="flex flex-col gap-1 text-xs font-medium text-secondary">
            Stroke
            <input
              type="number"
              min={1}
              max={3}
              step={0.25}
              className="rounded-lg border border-border bg-surface px-3 py-2 text-sm text-primary w-20"
              value={strokeWidth}
              onChange={(e) => setStrokeWidth(Number(e.target.value))}
            />
          </label>
        )}
      </div>

      <p className="text-xs text-tertiary">
        {entries.length} icon{entries.length === 1 ? '' : 's'}
        {entries.length > PAGE_SIZE && ` · page ${activeSafePage + 1} of ${activeTotalPages}`}
        {copied && (
          <span className="ml-2 text-green-600 dark:text-green-400">Copied {copied}</span>
        )}
      </p>

      {catalogEmpty && (
        <p className="text-sm text-amber-600 dark:text-amber-400">
          Solar catalog is empty. Run{' '}
          <code className="rounded bg-tertiary px-1">pnpm --filter @pebtech/icons run export:solar-icons</code>{' '}
          then <code className="rounded bg-tertiary px-1">pnpm --filter @pebtech/icons run generate:solar</code>.
        </p>
      )}

      {solarError && isSolar && (
        <p className="text-sm text-red-600 dark:text-red-400">{solarError}</p>
      )}

      {solarLoading && isSolar && (
        <p className="text-sm text-secondary">Loading page {activeSafePage + 1}…</p>
      )}

      <ul className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-9 gap-2">
        {isSolar
          ? solarPageEntries.map((entry) => {
              const svg = solarSvgs[entry.export]
              const importPath = `@pebtech/icons/solar/${solarVariant}`
              return (
                <li key={entry.export}>
                  <button
                    type="button"
                    title={entry.export}
                    disabled={solarLoading && !svg}
                    onClick={() => handleCopy(entry.export, importPath)}
                    className="flex w-full flex-col items-center gap-2 rounded-lg border border-border bg-surface p-3 hover:bg-hover-primary hover:border-border-secondary transition-colors disabled:opacity-40"
                  >
                    {svg ? (
                      <SolarSvgTile svg={svg} size={size} color={color} />
                    ) : (
                      <span className="size-6 animate-pulse rounded bg-tertiary" />
                    )}
                    <span className="text-[10px] leading-tight text-tertiary truncate w-full text-center">
                      {entry.id.replace(/-(linear|outline|bold|broken|duotone|line-duotone|bold-duotone)$/, '')}
                    </span>
                  </button>
                </li>
              )
            })
          : curatedSlice.map(({ export: exportName, Icon }) => {
              const importPath =
                collection === 'curated-solid' ? '@pebtech/icons/solid' : '@pebtech/icons/outline'
              return (
                <li key={exportName}>
                  <button
                    type="button"
                    title={exportName}
                    onClick={() => handleCopy(exportName, importPath)}
                    className="flex w-full flex-col items-center gap-2 rounded-lg border border-border bg-surface p-3 hover:bg-hover-primary hover:border-border-secondary transition-colors"
                  >
                    <Icon size={size} color={color} strokeWidth={strokeWidth} />
                    <span className="text-[10px] leading-tight text-tertiary truncate w-full text-center">
                      {exportName.replace(/Outline$|Solid$/, '')}
                    </span>
                  </button>
                </li>
              )
            })}
      </ul>

      {entries.length > PAGE_SIZE && (
        <div className="flex items-center justify-center gap-2">
          <button
            type="button"
            disabled={activeSafePage === 0}
            className="rounded-lg border border-border px-3 py-1.5 text-sm disabled:opacity-40"
            onClick={() => setPage((p) => Math.max(0, p - 1))}
          >
            Previous
          </button>
          <span className="text-sm text-secondary">
            {activeSafePage + 1} / {activeTotalPages}
          </span>
          <button
            type="button"
            disabled={activeSafePage >= activeTotalPages - 1}
            className="rounded-lg border border-border px-3 py-1.5 text-sm disabled:opacity-40"
            onClick={() => setPage((p) => Math.min(activeTotalPages - 1, p + 1))}
          >
            Next
          </button>
        </div>
      )}

      {entries.length === 0 && !solarLoading && !catalogEmpty && (
        <p className="text-sm text-secondary">No icons match your search.</p>
      )}
    </div>
  )
}
