import { useEffect, useRef, useState, useCallback } from 'react'
import { useEditor } from './EditorProvider'
import {
  BLOCK_TYPE_META, BLOCK_TYPES, VARIANT_OPTIONS,
  convertBlockType, applyVariant, getCurrentVariant,
} from './BlockLayoutPicker'
import type { BlockSlideData } from '../../data/types'

export default function BlockFloatingToolbar() {
  const {
    editMode, selection, allSlides, getSlideDataOverride,
    updateBlockData, duplicateBlock, removeBlock,
  } = useEditor()

  const toolbarRef = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState<{ x: number; y: number; flip: boolean } | null>(null)
  const [typeOpen, setTypeOpen] = useState(false)

  // Resolve selected block
  const isBlockSelected = editMode && selection?.type === 'block'
  const slideIndex = isBlockSelected ? selection.slideIndex : -1
  const blockId = isBlockSelected ? selection.blockId : ''

  const resolveBlock = useCallback(() => {
    if (!isBlockSelected) return null
    const override = getSlideDataOverride(slideIndex)
    const original = allSlides[slideIndex]
    const slideData = override ?? original
    if (!slideData || slideData.type !== 'block-slide') return null
    return (slideData as BlockSlideData).blocks.find(b => b.id === blockId) ?? null
  }, [isBlockSelected, slideIndex, blockId, getSlideDataOverride, allSlides])

  // Position the toolbar relative to the block DOM element
  useEffect(() => {
    if (!isBlockSelected) { setPos(null); return }

    const update = () => {
      const el = document.querySelector(`[data-block-id="${blockId}"]`) as HTMLElement | null
      if (!el) { setPos(null); return }
      const rect = el.getBoundingClientRect()
      const toolbarH = 40
      const gap = 8
      const flip = rect.top < toolbarH + gap + 60 // 60px for EditorToolbar
      const y = flip ? rect.bottom + gap : rect.top - toolbarH - gap
      const x = rect.left + rect.width / 2
      setPos({ x, y, flip })
    }

    update()

    // Re-compute on scroll/resize
    const slideContainer = document.querySelector('.slide-container') as HTMLElement | null
    const observer = slideContainer ? new ResizeObserver(update) : null
    if (observer && slideContainer) observer.observe(slideContainer)
    window.addEventListener('scroll', update, true)
    window.addEventListener('resize', update)

    return () => {
      observer?.disconnect()
      window.removeEventListener('scroll', update, true)
      window.removeEventListener('resize', update)
    }
  }, [isBlockSelected, blockId, selection])

  // Close type dropdown on click outside
  useEffect(() => {
    if (!typeOpen) return
    const handler = (e: MouseEvent) => {
      if (toolbarRef.current && !toolbarRef.current.contains(e.target as Node)) {
        setTypeOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [typeOpen])

  const block = resolveBlock()
  if (!pos || !block) return null

  const data = block.data
  const meta = BLOCK_TYPE_META[data.type]
  const variantConfig = VARIANT_OPTIONS[data.type]
  const currentVariant = getCurrentVariant(data)

  // Horizontal clamping
  const toolbarWidth = 500
  const halfW = toolbarWidth / 2
  const clampedX = Math.max(halfW + 8, Math.min(pos.x, window.innerWidth - halfW - 8))

  return (
    <div
      ref={toolbarRef}
      className="fixed z-[60] flex items-center gap-1 px-2 py-1 bg-white rounded-xl shadow-lg border border-gray-200"
      style={{
        left: clampedX,
        top: pos.y,
        transform: 'translateX(-50%)',
        height: 36,
        maxWidth: toolbarWidth,
      }}
    >
      {/* Type indicator + dropdown */}
      <div className="relative">
        <button
          onClick={() => setTypeOpen(!typeOpen)}
          className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs cursor-pointer transition-colors ${
            typeOpen ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50 text-gray-700'
          }`}
        >
          <span className={`w-5 h-5 rounded flex items-center justify-center text-xs ${meta.color}`}>
            {meta.icon}
          </span>
          <span className="font-medium whitespace-nowrap">{meta.label}</span>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" className="opacity-40">
            <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
          </svg>
        </button>

        {/* Type dropdown */}
        {typeOpen && (
          <div className="absolute left-0 top-full mt-1 bg-white rounded-xl shadow-xl border border-gray-200 p-2 z-[70]" style={{ width: 240 }}>
            <div className="grid grid-cols-5 gap-1">
              {BLOCK_TYPES.map((type) => {
                const m = BLOCK_TYPE_META[type]
                const isActive = data.type === type
                return (
                  <button
                    key={type}
                    onClick={() => {
                      if (type !== data.type) {
                        updateBlockData(slideIndex, blockId, convertBlockType(data, type))
                      }
                      setTypeOpen(false)
                    }}
                    className={`flex flex-col items-center gap-0.5 p-1.5 rounded-lg cursor-pointer transition-all ${
                      isActive ? 'ring-2 ring-blue-400 bg-blue-50' : 'hover:bg-gray-50'
                    }`}
                    title={m.label}
                  >
                    <span className={`w-6 h-6 rounded flex items-center justify-center text-xs ${m.color}`}>
                      {m.icon}
                    </span>
                    <span className={`text-[9px] leading-tight ${isActive ? 'text-blue-700 font-medium' : 'text-gray-400'}`}>
                      {m.label}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {/* Separator */}
      {variantConfig && <div className="w-px h-5 bg-gray-200 mx-0.5" />}

      {/* Variant pills */}
      {variantConfig && (
        <div className="flex items-center gap-0.5 overflow-x-auto no-scrollbar">
          {variantConfig.options.map((opt) => {
            const isActive = currentVariant === opt.value
            return (
              <button
                key={opt.value}
                onClick={() => updateBlockData(slideIndex, blockId, applyVariant(data, opt.value))}
                className={`px-1.5 py-0.5 text-[11px] rounded-md whitespace-nowrap cursor-pointer transition-all ${
                  isActive
                    ? 'bg-blue-500 text-white font-medium'
                    : 'text-gray-500 hover:bg-gray-100'
                }`}
              >
                {opt.label}
              </button>
            )
          })}
        </div>
      )}

      {/* Separator */}
      <div className="w-px h-5 bg-gray-200 mx-0.5" />

      {/* Action buttons */}
      <button
        onClick={() => duplicateBlock(slideIndex, blockId)}
        className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 cursor-pointer transition-colors"
        title="复制"
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="9" y="9" width="13" height="13" rx="2" />
          <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
        </svg>
      </button>
      <button
        onClick={() => removeBlock(slideIndex, blockId)}
        className="w-7 h-7 flex items-center justify-center rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600 cursor-pointer transition-colors"
        title="删除"
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="3 6 5 6 21 6" />
          <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
        </svg>
      </button>
    </div>
  )
}
