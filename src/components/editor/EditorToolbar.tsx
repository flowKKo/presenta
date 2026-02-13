import { useState, useRef, useEffect } from 'react'
import { useEditor, type ActiveTool } from './EditorProvider'

const TOOLS: { id: ActiveTool; label: string; icon: string }[] = [
  { id: 'select', label: '选择', icon: '↖' },
  { id: 'text', label: '文本', icon: 'T' },
  { id: 'rect', label: '矩形', icon: '□' },
  { id: 'line', label: '线条', icon: '╱' },
]

const COLORS = ['#000000', '#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6', '#EC4899']

export default function EditorToolbar() {
  const { activeTool, setTool, activeColor, setActiveColor, undo, redo, canUndo, canRedo } = useEditor()
  const [showPalette, setShowPalette] = useState(false)
  const paletteRef = useRef<HTMLDivElement>(null)

  // Close palette on outside click
  useEffect(() => {
    if (!showPalette) return
    const handler = (e: MouseEvent) => {
      if (paletteRef.current && !paletteRef.current.contains(e.target as Node)) {
        setShowPalette(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [showPalette])

  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 px-3 py-2 rounded-xl bg-white shadow-lg border border-gray-200">
      {/* Undo / Redo */}
      <button
        onClick={undo}
        disabled={!canUndo}
        className="w-9 h-9 flex items-center justify-center rounded-lg text-sm cursor-pointer transition-colors disabled:opacity-30 disabled:cursor-default"
        style={{ color: '#666' }}
        title="撤销 (Ctrl+Z)"
      >
        ↩
      </button>
      <button
        onClick={redo}
        disabled={!canRedo}
        className="w-9 h-9 flex items-center justify-center rounded-lg text-sm cursor-pointer transition-colors disabled:opacity-30 disabled:cursor-default"
        style={{ color: '#666' }}
        title="重做 (Ctrl+Shift+Z)"
      >
        ↪
      </button>

      {/* Separator */}
      <div className="w-px h-6 bg-gray-200 mx-1" />

      {/* Tool buttons */}
      {TOOLS.map((tool) => (
        <button
          key={tool.id}
          onClick={() => setTool(tool.id)}
          className="w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium cursor-pointer transition-colors"
          style={{
            background: activeTool === tool.id ? '#E3F2FD' : 'transparent',
            color: activeTool === tool.id ? '#1565C0' : '#666',
          }}
          title={tool.label}
        >
          {tool.icon}
        </button>
      ))}

      {/* Separator */}
      <div className="w-px h-6 bg-gray-200 mx-1" />

      {/* Color trigger — shows current color, click to toggle palette */}
      <div ref={paletteRef} className="relative">
        <button
          onClick={() => setShowPalette((s) => !s)}
          className="w-9 h-9 flex items-center justify-center rounded-lg cursor-pointer transition-colors"
          style={{ background: showPalette ? '#F3F4F6' : 'transparent' }}
          title="颜色"
        >
          <span
            className="w-6 h-6 rounded-full"
            style={{ background: activeColor, boxShadow: '0 0 0 1.5px rgba(0,0,0,0.12)' }}
          />
        </button>

        {/* Dropdown palette */}
        {showPalette && (
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 p-2 rounded-xl bg-white shadow-lg border border-gray-200 flex items-center gap-1.5">
            {COLORS.map((color) => {
              const isActive = activeColor === color
              return (
                <button
                  key={color}
                  onClick={() => { setActiveColor(color); setShowPalette(false) }}
                  className="w-7 h-7 rounded-full cursor-pointer transition-all flex items-center justify-center shrink-0"
                  style={{
                    background: color,
                    boxShadow: isActive
                      ? `0 0 0 2px white, 0 0 0 3.5px ${color}`
                      : 'inset 0 0 0 1px rgba(0,0,0,0.1)',
                  }}
                  title={color}
                >
                  {isActive && (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke={color === '#000000' || color === '#8B5CF6' ? 'white' : 'white'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2.5 6l2.5 2.5 4.5-5" />
                    </svg>
                  )}
                </button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
