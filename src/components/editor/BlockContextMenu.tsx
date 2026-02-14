import { useEffect, useRef, useState } from 'react'
import { useEditor } from './EditorProvider'
import { BLOCK_TYPE_META } from './BlockLayoutPicker'
import { colors } from '../../theme/swiss'
import type { BlockData, BlockSlideData } from '../../data/types'

const COLOR_SWATCHES = [
  colors.textPrimary, colors.textSecondary, '#ffffff', '#1A1A2E', '#484848',
  '#2196F3', '#1565C0', '#4CAF50', '#FF9800', '#E91E63',
]

export default function BlockContextMenu() {
  const {
    blockContextMenu, closeBlockContextMenu,
    allSlides, getSlideDataOverride,
    updateBlockData, duplicateBlock, removeBlock,
  } = useEditor()
  const menuRef = useRef<HTMLDivElement>(null)

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

  const override = getSlideDataOverride(slideIndex)
  const original = allSlides[slideIndex]
  const slideData = override ?? original
  if (!slideData || slideData.type !== 'block-slide') return null
  const block = (slideData as BlockSlideData).blocks.find(b => b.id === blockId)
  if (!block) return null

  const data = block.data
  const meta = BLOCK_TYPE_META[data.type]
  const isTitleBody = data.type === 'title-body'
  const hasTextColor = data.type !== 'image' && data.type !== 'chart'

  const setProp = (prop: string, value: string | number | undefined) => {
    updateBlockData(slideIndex, blockId, { ...data, [prop]: value } as BlockData)
  }

  const menuW = 220
  const cx = Math.min(x, window.innerWidth - menuW - 12)
  const cy = Math.max(12, Math.min(y, window.innerHeight - 420))

  return (
    <div
      ref={menuRef}
      className="fixed z-[100] bg-white rounded-xl shadow-2xl border border-gray-200 select-none"
      style={{ left: cx, top: cy, width: menuW }}
      onContextMenu={(e) => e.preventDefault()}
    >
      {/* Header */}
      <div className="px-3 pt-2.5 pb-2 flex items-center gap-2">
        <span className={`w-6 h-6 rounded flex items-center justify-center text-sm ${meta.color}`}>{meta.icon}</span>
        <span className="text-[12px] font-medium text-gray-600">{meta.label}</span>
      </div>

      {/* Font size */}
      {isTitleBody && (
        <Section>
          <SectionLabel>字号</SectionLabel>
          <div className="space-y-1">
            <SizeStepper
              label="标题"
              value={(data as { titleSize?: number }).titleSize ?? 36}
              onChange={(v) => setProp('titleSize', v)}
              min={12} max={200} step={2}
            />
            <SizeStepper
              label="正文"
              value={(data as { bodySize?: number }).bodySize ?? 18}
              onChange={(v) => setProp('bodySize', v)}
              min={10} max={120} step={2}
            />
          </div>
        </Section>
      )}

      {/* Colors */}
      {hasTextColor && (
        <Section>
          <SectionLabel>颜色</SectionLabel>
          {isTitleBody && (
            <ColorPicker
              label="标题"
              value={(data as { titleColor?: string }).titleColor ?? colors.textPrimary}
              onChange={(v) => setProp('titleColor', v)}
            />
          )}
          <ColorPicker
            label={isTitleBody ? '正文' : '文本'}
            value={(data as { textColor?: string }).textColor ?? (isTitleBody ? colors.textSecondary : '#ffffff')}
            onChange={(v) => setProp('textColor', v)}
          />
        </Section>
      )}

      {/* Actions */}
      <div className="border-t border-gray-100 mx-2 my-1" />
      <div className="px-1 pb-1.5">
        <button
          onClick={() => { duplicateBlock(slideIndex, blockId); closeBlockContextMenu() }}
          className="w-full flex items-center gap-2 px-2.5 py-1.5 text-[13px] text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" />
            <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
          </svg>
          复制
        </button>
        <button
          onClick={() => { removeBlock(slideIndex, blockId); closeBlockContextMenu() }}
          className="w-full flex items-center gap-2 px-2.5 py-1.5 text-[13px] text-red-500 hover:bg-red-50 rounded-lg cursor-pointer transition-colors"
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

/* ── Shared sub-components ── */

function Section({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="border-t border-gray-100 mx-2 my-1" />
      <div className="px-3 py-1.5">{children}</div>
    </>
  )
}

function SectionLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-1.5 ${className ?? ''}`}>
      {children}
    </div>
  )
}

function SizeStepper({ label, value, onChange, min, max, step }: {
  label: string; value: number; onChange: (v: number) => void
  min: number; max: number; step: number
}) {
  return (
    <div className="flex items-center justify-between h-7">
      <span className="text-[11px] text-gray-500">{label}</span>
      <div className="flex items-center bg-gray-50 rounded-md">
        <button
          onClick={() => onChange(Math.max(min, value - step))}
          className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-700 cursor-pointer text-sm transition-colors"
        >
          -
        </button>
        <span className="text-[11px] font-mono text-gray-700 w-7 text-center border-x border-gray-200">{value}</span>
        <button
          onClick={() => onChange(Math.min(max, value + step))}
          className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-700 cursor-pointer text-sm transition-colors"
        >
          +
        </button>
      </div>
    </div>
  )
}

function ColorPicker({ label, value, onChange }: {
  label: string; value: string; onChange: (v: string) => void
}) {
  const [open, setOpen] = useState(false)

  return (
    <div>
      {/* Collapsed: label + current swatch */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full h-7 cursor-pointer group"
      >
        <span className="text-[11px] text-gray-500 group-hover:text-gray-700 transition-colors">{label}</span>
        <div className="flex items-center gap-1.5">
          <span
            className="w-5 h-5 rounded-md border border-gray-200 transition-shadow group-hover:shadow-sm"
            style={{ backgroundColor: value }}
          />
          <svg
            width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5"
            className={`text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`}
          >
            <path d="M2.5 3.5L5 6.5L7.5 3.5" />
          </svg>
        </div>
      </button>

      {/* Expanded: palette grid */}
      {open && (
        <div className="grid grid-cols-6 gap-[5px] mt-1.5 pb-0.5">
          {COLOR_SWATCHES.map((c) => (
            <button
              key={c}
              onClick={() => { onChange(c); setOpen(false) }}
              className="w-full aspect-square rounded-md cursor-pointer transition-all hover:scale-110"
              style={{
                backgroundColor: c,
                outline: value === c ? '2px solid #2196F3' : undefined,
                outlineOffset: value === c ? 1 : undefined,
                border: '1px solid rgba(0,0,0,0.08)',
              }}
            />
          ))}
          <label className="w-full aspect-square cursor-pointer">
            <input
              type="color"
              value={value}
              onChange={(e) => { onChange(e.target.value); setOpen(false) }}
              className="w-full h-full rounded-md border border-dashed border-gray-300 cursor-pointer p-0"
              style={{ appearance: 'none', WebkitAppearance: 'none' }}
            />
          </label>
        </div>
      )}
    </div>
  )
}
