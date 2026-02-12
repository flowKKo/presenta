import { useEditor, type ActiveTool } from './EditorProvider'

const TOOLS: { id: ActiveTool; label: string; icon: string }[] = [
  { id: 'select', label: '选择', icon: '↖' },
  { id: 'text', label: '文本', icon: 'T' },
  { id: 'rect', label: '矩形', icon: '□' },
  { id: 'line', label: '线条', icon: '╱' },
]

const COLORS = ['#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6', '#EC4899', '#000000']

export default function EditorToolbar() {
  const { activeTool, setTool, activeColor, setActiveColor, undo, redo, canUndo, canRedo } = useEditor()

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

      {/* Color swatches */}
      {COLORS.map((color) => (
        <button
          key={color}
          onClick={() => setActiveColor(color)}
          className="w-6 h-6 rounded-full cursor-pointer transition-transform"
          style={{
            background: color,
            outline: activeColor === color ? `2px solid ${color}` : 'none',
            outlineOffset: 2,
            transform: activeColor === color ? 'scale(1.15)' : 'scale(1)',
          }}
        />
      ))}
    </div>
  )
}
