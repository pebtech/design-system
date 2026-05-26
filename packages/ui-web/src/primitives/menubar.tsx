import React, { createContext, useContext, useRef, useState, useCallback, useEffect, useId } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '../utils/cn'

// --- Menubar Context ---

interface MenubarContextValue {
  openMenuId: string | null
  setOpenMenuId: (id: string | null) => void
  isAnyOpen: boolean
}

const MenubarContext = createContext<MenubarContextValue | null>(null)

function useMenubarContext() {
  const context = useContext(MenubarContext)
  if (!context) {
    throw new Error('Menubar compound components must be used within a Menubar')
  }
  return context
}

// --- MenubarMenu Context ---

interface MenubarMenuContextValue {
  menuId: string
  triggerId: string
  isOpen: boolean
  open: () => void
  close: () => void
  triggerRef: React.RefObject<HTMLButtonElement | null>
}

const MenubarMenuContext = createContext<MenubarMenuContextValue | null>(null)

function useMenubarMenuContext() {
  const context = useContext(MenubarMenuContext)
  if (!context) {
    throw new Error('MenubarMenu compound components must be used within a MenubarMenu')
  }
  return context
}

// --- Menubar ---

export interface MenubarProps {
  children: React.ReactNode
  className?: string
}

export function Menubar({ children, className }: MenubarProps) {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null)
  const barRef = useRef<HTMLDivElement>(null)

  // Keyboard navigation between top-level triggers
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!barRef.current) return
      const triggers = barRef.current.querySelectorAll<HTMLButtonElement>('[role="menuitem"][data-menubar-trigger]')
      const currentIndex = Array.from(triggers).findIndex((t) => t === document.activeElement)

      switch (e.key) {
        case 'ArrowRight': {
          e.preventDefault()
          const nextIndex = currentIndex < triggers.length - 1 ? currentIndex + 1 : 0
          triggers[nextIndex]?.focus()
          // If a menu is already open, switch to the new menu
          if (openMenuId) {
            const nextId = triggers[nextIndex]?.getAttribute('data-menu-id')
            if (nextId) setOpenMenuId(nextId)
          }
          break
        }
        case 'ArrowLeft': {
          e.preventDefault()
          const prevIndex = currentIndex > 0 ? currentIndex - 1 : triggers.length - 1
          triggers[prevIndex]?.focus()
          if (openMenuId) {
            const prevId = triggers[prevIndex]?.getAttribute('data-menu-id')
            if (prevId) setOpenMenuId(prevId)
          }
          break
        }
        case 'Escape': {
          setOpenMenuId(null)
          break
        }
      }
    },
    [openMenuId, setOpenMenuId]
  )

  return (
    <MenubarContext.Provider value={{ openMenuId, setOpenMenuId, isAnyOpen: openMenuId !== null }}>
      <div
        ref={barRef}
        role="menubar"
        onKeyDown={handleKeyDown}
        className={cn(
          'flex items-center gap-1 rounded-lg border border-border bg-surface p-1 shadow-sm',
          className
        )}
      >
        {children}
      </div>
    </MenubarContext.Provider>
  )
}

// --- MenubarMenu ---

export interface MenubarMenuProps {
  children: React.ReactNode
}

export function MenubarMenu({ children }: MenubarMenuProps) {
  const menuId = useId()
  const triggerId = useId()
  const triggerRef = useRef<HTMLButtonElement>(null)
  const { openMenuId, setOpenMenuId } = useMenubarContext()

  const isOpen = openMenuId === menuId
  const open = useCallback(() => setOpenMenuId(menuId), [menuId, setOpenMenuId])
  const close = useCallback(() => setOpenMenuId(null), [setOpenMenuId])

  return (
    <MenubarMenuContext.Provider value={{ menuId, triggerId, isOpen, open, close, triggerRef }}>
      <div className="relative">
        {children}
      </div>
    </MenubarMenuContext.Provider>
  )
}

// --- MenubarTrigger ---

export interface MenubarTriggerProps {
  children: React.ReactNode
  className?: string
}

export function MenubarTrigger({ children, className }: MenubarTriggerProps) {
  const { menuId, triggerId, isOpen, open, close, triggerRef } = useMenubarMenuContext()
  const { isAnyOpen, setOpenMenuId } = useMenubarContext()

  const handleClick = useCallback(() => {
    if (isOpen) {
      close()
    } else {
      open()
    }
  }, [isOpen, open, close])

  const handleMouseEnter = useCallback(() => {
    // If another menu is already open, switch to this one on hover
    if (isAnyOpen && !isOpen) {
      setOpenMenuId(menuId)
    }
  }, [isAnyOpen, isOpen, menuId, setOpenMenuId])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        open()
      }
    },
    [open]
  )

  return (
    <button
      ref={triggerRef}
      id={triggerId}
      role="menuitem"
      type="button"
      data-menubar-trigger
      data-menu-id={menuId}
      aria-haspopup="menu"
      aria-expanded={isOpen}
      aria-controls={isOpen ? menuId : undefined}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onKeyDown={handleKeyDown}
      className={cn(
        'flex items-center gap-1 rounded-md px-3 py-1.5 text-sm font-medium outline-none cursor-pointer',
        'text-primary hover:bg-hover-primary focus-visible:bg-hover-primary',
        isOpen && 'bg-hover-primary',
        className
      )}
    >
      {children}
    </button>
  )
}

// --- MenubarContent ---

export interface MenubarContentProps {
  children: React.ReactNode
  className?: string
  align?: 'start' | 'center' | 'end'
}

export function MenubarContent({ children, className, align = 'start' }: MenubarContentProps) {
  const { isOpen, close, menuId, triggerId, triggerRef } = useMenubarMenuContext()
  const contentRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ top: 0, left: 0 })

  // Position the dropdown below the trigger
  useEffect(() => {
    if (!isOpen || !triggerRef.current) return
    const rect = triggerRef.current.getBoundingClientRect()

    let left = rect.left
    if (align === 'center') {
      left = rect.left + rect.width / 2
    } else if (align === 'end') {
      left = rect.right
    }

    setPosition({ top: rect.bottom + 4, left })
  }, [isOpen, align, triggerRef])

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (e: MouseEvent) => {
      if (
        contentRef.current &&
        !contentRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        close()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen, close, triggerRef])

  // Focus first item on open
  useEffect(() => {
    if (isOpen && contentRef.current) {
      const firstItem = contentRef.current.querySelector<HTMLElement>('[role="menuitem"]:not([data-menubar-trigger])')
      firstItem?.focus()
    }
  }, [isOpen])

  // Keyboard nav within the dropdown
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!contentRef.current) return
      const items = contentRef.current.querySelectorAll<HTMLElement>('[role="menuitem"]:not([aria-disabled="true"])')
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
        case 'Escape': {
          close()
          triggerRef.current?.focus()
          break
        }
      }
    },
    [close, triggerRef]
  )

  if (!isOpen || typeof document === 'undefined') return null

  const alignTransform =
    align === 'center' ? 'translateX(-50%)' : align === 'end' ? 'translateX(-100%)' : undefined

  return createPortal(
    <>
      <div
        ref={contentRef}
        id={menuId}
        role="menu"
        aria-labelledby={triggerId}
        aria-orientation="vertical"
        tabIndex={-1}
        onKeyDown={handleKeyDown}
        style={{
          position: 'fixed',
          top: position.top,
          left: position.left,
          zIndex: 50,
          transform: alignTransform,
        }}
        className={cn(
          'min-w-48 overflow-hidden rounded-xl p-1',
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

// --- MenubarItem ---

export interface MenubarItemProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  disabled?: boolean
}

export function MenubarItem({ children, className, onClick, disabled = false }: MenubarItemProps) {
  const { close } = useMenubarMenuContext()

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
        'text-primary',
        'focus:bg-hover-primary focus:text-primary',
        'hover:bg-hover-primary hover:text-primary',
        disabled && 'opacity-50 cursor-default pointer-events-none',
        className
      )}
    >
      {children}
    </button>
  )
}

// --- MenubarSeparator ---

export interface MenubarSeparatorProps {
  className?: string
}

export function MenubarSeparator({ className }: MenubarSeparatorProps) {
  return (
    <div
      role="separator"
      className={cn('mx-3 my-1 h-px border-0 bg-border', className)}
    />
  )
}
