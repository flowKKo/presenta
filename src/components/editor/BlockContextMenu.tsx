import { useEffect, useRef } from 'react'
import { useEditor } from './EditorProvider'
import {
  BLOCK_TYPE_META, BLOCK_TYPES, VARIANT_OPTIONS,
  convertBlockType, applyVariant, getCurrentVariant,
} from './BlockLayoutPicker'
import type { BlockSlideData } from '../../data/types'

export default function BlockContextMenu() {
  const {
    blockContextMenu, closeBlockContextMenu,
    allSlides, getSlideDataOverride,
    updateBlockData, duplicateBlock, removeBlock,
  } = useEditor()
  const menuRef = useRef<HTMLDivElement>(null)

  // Close on click-outside or Escape
  useEffect(() => {
    if (!blockContextMenu) return
    const handleMouseDown = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        closeBlockContextMenu()
      }
    }
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeBlockContextMenu()
    }
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('keydown', handleKey)
    }
  }, [blockContextMenu, closeBlockContextMenu])

  if (!blockContextMenu) return null

  const { x, y, slideIndex, blockId } = blockContextMenu

  // Resolve block data
  const override = getSlideDataOverride(slideIndex)
  const original = allSlides[slideIndex]
  const slideData = override ?? original
  if (!slideData || slideData.type !== 'block-slide') return null
  const block = (slideData as BlockSlideData).blocks.find(b => b.id === blockId)
  if (!block) return null

  const data = block.data
  const variantConfig = VARIANT_OPTIONS[data.type]
  const currentVariant = getCurrentVariant(data)

  // Viewport clamping
  const menuWidth = 280
  const menuHeight = 320
  const clampedX = Math.min(x, window.innerWidth - menuWidth - 8)
  const clampedY = Math.min(y, window.innerHeight - menuHeight - 8)

  return (
    <div
      ref={menuRef}
      className="fixed z-[100] bg-white rounded-xl shadow-2xl border border-gray-200 py-2 select-none"
      style={{ left: clampedX, top: clampedY, width: menuWidth }}
      onContextMenu={(e) => e.preventDefault()}
    >
      {/* Type section */}
      <div className="px-3 pb-1">
        <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Block 类型</span>
        <div className="grid grid-cols-5 gap-1 mt-1.5">
          {BLOCK_TYPES.map((type) => {
            const meta = BLOCK_TYPE_META[type]
            const isActive = data.type === type
            return (
              <button
                key={type}
                onClick={() => {
                  if (type === data.type) return
                  updateBlockData(slideIndex, blockId, convertBlockType(data, type))
                  closeBlockContextMenu()
                }}
                className={`flex flex-col items-center gap-0.5 p-1.5 rounded-lg cursor-pointer transition-all ${
                  isActive
                    ? 'ring-2 ring-blue-400 bg-blue-50'
                    : 'hover:bg-gray-50'
                }`}
                title={meta.label}
              >
                <span className={`w-7 h-7 rounded flex items-center justify-center text-sm ${meta.color}`}>
                  {meta.icon}
                </span>
                <span className={`text-[9px] leading-tight ${isActive ? 'text-blue-700 font-medium' : 'text-gray-400'}`}>
                  {meta.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Variant section */}
      {variantConfig && (
        <div className="px-3 pt-1 pb-1">
          <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">样式</span>
          <div className="flex flex-wrap gap-1 mt-1.5">
            {variantConfig.options.map((opt) => {
              const isActive = currentVariant === opt.value
              return (
                <button
                  key={opt.value}
                  onClick={() => {
                    updateBlockData(slideIndex, blockId, applyVariant(data, opt.value))
                    closeBlockContextMenu()
                  }}
                  className={`px-2 py-1 text-[11px] rounded-md cursor-pointer transition-all ${
                    isActive
                      ? 'bg-blue-500 text-white font-medium'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {opt.label}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Divider */}
      <div className="mx-3 my-1.5 border-t border-gray-100" />

      {/* Actions */}
      <div className="px-1">
        <button
          onClick={() => {
            duplicateBlock(slideIndex, blockId)
            closeBlockContextMenu()
          }}
          className="w-full flex items-center gap-2 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" />
            <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
          </svg>
          复制
        </button>
        <button
          onClick={() => {
            removeBlock(slideIndex, blockId)
            closeBlockContextMenu()
          }}
          className="w-full flex items-center gap-2 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-lg cursor-pointer transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
          </svg>
          删除
        </button>
      </div>
    </div>
  )
}
