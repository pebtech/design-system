# @pebtech/hooks

Shared React hooks for PEB applications. Zero runtime dependencies beyond React.

## Install

```ini
@pebtech:registry=https://npm.pkg.github.com
```

```bash
pnpm add @pebtech/hooks
pnpm add react  # peer: ^18 || ^19
```

## Usage

```tsx
import {
  useDebounce,
  useLocalStorage,
  useMediaQuery,
  useClickOutside,
  useIntersectionObserver,
} from '@pebtech/hooks'

const debouncedQuery = useDebounce(search, 300)
const [theme, setTheme] = useLocalStorage('theme', 'light')
const isMobile = useMediaQuery('(max-width: 768px)')
```

| Hook | Description |
|------|-------------|
| `useDebounce(value, delay)` | Debounced value |
| `useLocalStorage(key, initial)` | Persisted state |
| `useMediaQuery(query)` | Media query match |
| `useClickOutside(ref, callback)` | Outside click handler |
| `useIntersectionObserver(options?)` | `{ ref, isIntersecting }` |

## Developing this package

```bash
pnpm --filter @pebtech/hooks run build
pnpm --filter @pebtech/hooks run test
```

See [repository README](../../README.md#monorepo-development).
