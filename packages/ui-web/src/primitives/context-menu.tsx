import React, { createContext, useContext, useRef, useState, useCallback, useEffect, useId } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '../utils/cn'

interface ContextMenuContextValue {
  isOpen: boolean
  position: { x: number; y: number }
  open: (x: number, y: number) => void
  close: () => void
  menuId: string
}

const ContextMenuContext = createContext<ContextMenuContextValue | null>(null)

function useContextMenuContext() {
  const context = useContext(ContextMenuContext)
  if (!context) {
    throw new Error('ContextMenu compound components must be used within a ContextMenu')
  }
  return context
}

// --- ContextMenu ---

export interface ContextMenuProps {
  children: React.ReactNode
}

export function ContextMenu({ children }: ContextMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const menuId = useId()

  const open = useCallback((x: number, y: number) => {
    setPosition({ x, y })
    setIsOpen(true)
  }, [])

  const close = useCallback(() => {
    setIsOpen(false)
  }, [])

  return (
    <ContextMenuContext.Provider value={{ isOpen, position, open, close, menuId }}>
      {children}
    </ContextMenuContext.Provider>
  )
}

// --- ContextMenuTrigger ---

export interface ContextMenuTriggerProps {
  children: React.ReactNode
  className?: string
  asChild?: boolean
}

export function ContextMenuTrigger({ children, className, asChild }: ContextMenuTriggerProps) {
  const { open, menuId, isOpen } = useContextMenuContext()

  const handleContextMenu = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
      open(e.clientX, e.clientY)
    },
    [open]
  )

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, {
      onContextMenu: handleContextMenu,
      'aria-haspopup': 'menu',
      'aria-expanded': isOpen,
      'aria-controls': isOpen ? menuId : undefined,
    })
  }

  return (
    <div
      onContextMenu={handleContextMenu}
      className={className}
      aria-haspopup="menu"
      aria-expanded={isOpen}
      aria-controls={isOpen ? menuId : undefined}
    >
      {children}
    </div>
  )
}

// --- ContextMenuContent ---

export interface ContextMenuContentProps {
  children: React.ReactNode
  className?: string
}

export function ContextMenuContent({ children, className }: ContextMenuContentProps) {
  const { isOpen, position, close, menuId } = useContextMenuContext()
  const menuRef = useRef<HTMLDivElement>(null)

  // Dismiss on outside click
  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        close()
      }
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close()
      }
    }

    const handleScroll = () => {
      close()
    }

    // Block native right-click outside the menu while the menu is open so a
    // second context-menu gesture doesn't open the browser's menu underneath.
    const handleContextMenu = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        e.preventDefault()
        close()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)
    document.addEventListener('contextmenu', handleContextMenu)
    window.addEventListener('scroll', handleScroll, true)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
      document.removeEventListener('contextmenu', handleContextMenu)
      window.removeEventListener('scroll', handleScroll, true)
    }
  }, [isOpen, close])

  // Focus the menu when it opens for keyboard nav
  useEffect(() => {
    if (isOpen && menuRef.current) {
      menuRef.current.focus()
    }
  }, [isOpen])

  // Keyboard navigation within menu
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!menuRef.current) return
      const items = menuRef.current.querySelectorAll<HTMLElement>('[role="menuitem"]:not([aria-disabled="true"])')
      const currentIndex = Array.from(items).findIndex((item) => item === document.activeElement)

      switch (e.key) {
        case 'ArrowDown': {
          e.preventDefault()
          const nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0
          items[nextIndex]?.focus()
          break
        }
        case 'ArrowUp': {
          e.preventDefault()
          const prevIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1
          items[prevIndex]?.focus()
          break
        }
        case 'Home': {
          e.preventDefault()
          items[0]?.focus()
          break
        }
        case 'End': {
          e.preventDefault()
          items[items.length - 1]?.focus()
          break
        }
        case 'Escape': {
          close()
          break
        }
      }
    },
    [close]
  )

  if (!isOpen || typeof document === 'undefined') return null

  // Clamp position to viewport
  const style: React.CSSProperties = {
    position: 'fixed',
    top: position.y,
    left: position.x,
    zIndex: 50,
  }

  return createPortal(
    <>
      <div
        ref={menuRef}
        id={menuId}
        role="menu"
        aria-orientation="vertical"
        tabIndex={-1}
        style={style}
        onKeyDown={handleKeyDown}
        className={cn(
          'z-50 min-w-32 overflow-hidden rounded-xl p-1',
          'bg-surface/70 backdrop-blur-xl',
          'shadow-xl ring-1 ring-border/50',
          'outline-none focus:outline-none',
          'animate-in fade-in-0 zoom-in-95',
          className
        )}
      >
        {children}
      </div>
    </>,
    document.body
  )
}

// --- ContextMenuItem ---

export interface ContextMenuItemProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  disabled?: boolean
  destructive?: boolean
}

export function ContextMenuItem({
  children,
  className,
  onClick,
  disabled = false,
  destructive = false,
}: ContextMenuItemProps) {
  const { close } = useContextMenuContext()

  const handleClick = useCallback(() => {
    if (disabled) return
    onClick?.()
    close()
  }, [disabled, onClick, close])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        handleClick()
      }
    },
    [handleClick]
  )

  return (
    <button
      role="menuitem"
      type="button"
      tabIndex={-1}
      aria-disabled={disabled}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={cn(
        'group flex w-full items-center gap-2 cursor-pointer rounded-lg px-3 py-2 text-left text-sm/6 outline-none',
        'focus:bg-hover-primary focus:text-primary',
        'hover:bg-hover-primary hover:text-primary',
        destructive && 'text-red-600 dark:text-red-400 focus:bg-red-50 dark:focus:bg-red-950/30',
        !destructive && 'text-primary',
        disabled && 'opacity-50 cursor-default pointer-events-none',
        className
      )}
    >
      {children}
    </button>
  )
}

// --- ContextMenuSeparator ---

export interface ContextMenuSeparatorProps {
  className?: string
}

export function ContextMenuSeparator({ className }: ContextMenuSeparatorProps) {
  return (
    <div
      role="separator"
      className={cn('mx-3 my-1 h-px border-0 bg-border', className)}
    />
  )
}
