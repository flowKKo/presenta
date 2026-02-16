import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import ResizeHandles from '../editor/ResizeHandles'
import type { ContentBlock } from '../../data/types'

interface BlockWrapperProps {
  block: ContentBlock
  isSelected: boolean
  editMode: boolean
  onSelect: () => void
  onUpdate: (bounds: { x: number; y: number; width: number; height: number }) => void
  onUpdateQuiet: (bounds: { x: number; y: number; width: number; height: number }) => void
  onDragStart: () => void
  onContextMenu?: (e: React.MouseEvent) => void
  spotlightRevealed?: boolean
  children: ReactNode
}

export default function BlockWrapper({
  block,
  isSelected,
  editMode,
  onSelect,
  onUpdate,
  onUpdateQuiet,
  onDragStart,
  onContextMenu: onContextMenuProp,
  spotlightRevealed = true,
  children,
}: BlockWrapperProps) {
  const bounds = { x: block.x, y: block.y, width: block.width, height: block.height }
  const dragRef = useRef<{ startMouse: { x: number; y: number }; startBounds: typeof bounds; containerRect: DOMRect } | null>(null)

  // Use refs for stable handler references to avoid listener leaks
  const onUpdateQuietRef = useRef(onUpdateQuiet)
  onUpdateQuietRef.current = onUpdateQuiet

  const handleClick = useCallback((e: React.MouseEvent) => {
    if (!editMode) return
    e.stopPropagation()
    onSelect()
  }, [editMode, onSelect])

  // Stable handlers via refs — never change identity
  const handlePointerMove = useRef((e: PointerEvent) => {
    if (!dragRef.current) return
    const { startMouse, startBounds, containerRect } = dragRef.current
    const dx = ((e.clientX - startMouse.x) / containerRect.width) * 100
    const dy = ((e.clientY - startMouse.y) / containerRect.height) * 100
    onUpdateQuietRef.current({
      ...startBounds,
      x: startBounds.x + dx,
      y: startBounds.y + dy,
    })
  }).current

  const handlePointerUp = useRef((e: PointerEvent) => {
    dragRef.current = null
    try { (e.target as HTMLElement).releasePointerCapture(e.pointerId) } catch {}
    document.removeEventListener('pointermove', handlePointerMove)
    document.removeEventListener('pointerup', handlePointerUp)
    document.removeEventListener('pointercancel', handlePointerUp)
  }).current

  // Cleanup on unmount — release any dangling listeners
  useEffect(() => {
    return () => {
      document.removeEventListener('pointermove', handlePointerMove)
      document.removeEventListener('pointerup', handlePointerUp)
      document.removeEventListener('pointercancel', handlePointerUp)
    }
  }, [handlePointerMove, handlePointerUp])

  const handleDragStart = useCallback((e: React.PointerEvent) => {
    if (!editMode || !isSelected) return
    if ((e.target as HTMLElement).closest('[data-resize-handle]')) return
    if ((e.target as HTMLElement).closest('[data-editable-text]')) return
    e.preventDefault()
    onDragStart()
    const container = (e.currentTarget as HTMLElement).parentElement!
    dragRef.current = {
      startMouse: { x: e.clientX, y: e.clientY },
      startBounds: { ...bounds },
      containerRect: container.getBoundingClientRect(),
    }
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
    document.addEventListener('pointermove', handlePointerMove)
    document.addEventListener('pointerup', handlePointerUp)
    document.addEventListener('pointercancel', handlePointerUp)
  }, [editMode, isSelected, bounds, onDragStart, handlePointerMove, handlePointerUp])

  const handleResize = useCallback((newBounds: { x: number; y: number; width: number; height: number }) => {
    onUpdateQuiet(newBounds)
  }, [onUpdateQuiet])

  // Only enable transition after first render to avoid flash on mount
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true))
    return () => { cancelAnimationFrame(raf); setMounted(false) }
  }, [])

  if (!editMode) {
    return (
      <div
        className="absolute overflow-hidden flex flex-col"
        style={{
          left: `${bounds.x}%`,
          top: `${bounds.y}%`,
          width: `${bounds.width}%`,
          height: `${bounds.height}%`,
          filter: spotlightRevealed ? 'none' : 'blur(4px)',
          opacity: spotlightRevealed ? 1 : 0.1,
          transition: mounted ? 'filter 0.4s ease, opacity 0.4s ease' : 'none',
        }}
      >
        {children}
      </div>
    )
  }

  return (
    <>
      <div
        className="absolute overflow-hidden flex flex-col"
        data-block-id={block.id}
        style={{
          left: `${bounds.x}%`,
          top: `${bounds.y}%`,
          width: `${bounds.width}%`,
          height: `${bounds.height}%`,
          border: isSelected
            ? '2px dashed #42A5F5'
            : '1px dotted rgba(0,0,0,0.15)',
          cursor: isSelected ? 'move' : 'pointer',
          boxSizing: 'border-box',
          zIndex: isSelected ? 20 : 10,
        }}
        onClick={handleClick}
        onPointerDown={handleDragStart}
        onContextMenu={(e) => {
          if (!editMode) return
          e.preventDefault()
          e.stopPropagation()
          onContextMenuProp?.(e)
        }}
      >
        {children}
      </div>

      {isSelected && (
        <ResizeHandles
          constraint="free"
          bounds={bounds}
          onResize={handleResize}
          onResizeStart={onDragStart}
          color="#42A5F5"
        />
      )}
    </>
  )
}
