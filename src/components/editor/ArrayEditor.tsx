import type { ReactNode } from 'react'

interface ArrayEditorProps<T> {
  items: T[]
  onChange: (items: T[]) => void
  renderRow: (item: T, index: number, update: (item: T) => void) => ReactNode
  createDefault: () => T
  minItems?: number
  label?: string
}

export default function ArrayEditor<T>({
  items,
  onChange,
  renderRow,
  createDefault,
  minItems = 1,
  label,
}: ArrayEditorProps<T>) {
  const updateItem = (index: number, item: T) => {
    const next = [...items]
    next[index] = item
    onChange(next)
  }

  const removeItem = (index: number) => {
    if (items.length <= minItems) return
    onChange(items.filter((_, i) => i !== index))
  }

  const moveItem = (index: number, dir: -1 | 1) => {
    const target = index + dir
    if (target < 0 || target >= items.length) return
    const next = [...items]
    ;[next[index], next[target]] = [next[target], next[index]]
    onChange(next)
  }

  return (
    <div className="space-y-2">
      {label && <div className="text-xs font-medium text-gray-500 uppercase">{label}</div>}
      {items.map((item, i) => (
        <div key={i} className="flex items-start gap-1 group">
          <div className="flex-1 space-y-1">
            {renderRow(item, i, (updated) => updateItem(i, updated))}
          </div>
          <div className="flex flex-col gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => moveItem(i, -1)}
              className="w-5 h-5 text-[10px] rounded bg-gray-100 hover:bg-gray-200 cursor-pointer flex items-center justify-center"
              disabled={i === 0}
            >
              ↑
            </button>
            <button
              onClick={() => moveItem(i, 1)}
              className="w-5 h-5 text-[10px] rounded bg-gray-100 hover:bg-gray-200 cursor-pointer flex items-center justify-center"
              disabled={i === items.length - 1}
            >
              ↓
            </button>
            <button
              onClick={() => removeItem(i)}
              className="w-5 h-5 text-[10px] rounded bg-red-50 hover:bg-red-100 text-red-500 cursor-pointer flex items-center justify-center"
              disabled={items.length <= minItems}
            >
              ×
            </button>
          </div>
        </div>
      ))}
      <button
        onClick={() => onChange([...items, createDefault()])}
        className="w-full py-1.5 text-xs text-blue-600 bg-blue-50 hover:bg-blue-100 rounded cursor-pointer transition-colors"
      >
        + 添加
      </button>
    </div>
  )
}
